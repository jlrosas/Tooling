/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Injectable } from "@angular/core";
import { Observable, Observer, forkJoin } from "rxjs";
import { CalculationScalesService } from "../../../rest/services/calculation-scales.service";
import { CalculationRulesService } from "../../../rest/services/calculation-rules.service";
import { CalculationRuleScalesService } from "../../../rest/services/calculation-rule-scales.service";
import { CalculationRangesService } from "../../../rest/services/calculation-ranges.service";
import { ShippingJurisdictionCalculationRulesService } from "../../../rest/services/shipping-jurisdiction-calculation-rules.service";
import { CalculationRangeDetailsService } from "../../../rest/services/calculation-range-details.service";
import { ShippingModesService } from "../../../rest/services/shipping-modes.service";
import { JurisdictionGroupsService } from "../../../rest/services/jurisdiction-groups.service";
import { FulfillmentCentersService } from "../../../rest/services/fulfillment-centers.service";

export interface ShippingCharge {
	shippingCodeId?: number;
	storeId?: number;
	calculationRuleId?: number;
	startDate?: string;
	endDate?: string;
	sequence?: number;
	calculationScaleId?: number;
	scaleCode?: string;
	scaleDescription?: string;
	unitOfMeasure?: string;
	currency?: string;
	scaleLookupMethod?: number;
}

export interface ShippingChargeFulfillmentOption {
	shippingJurisdictionCalculationRuleId?: number;
	calculationRuleId?: number;
	fulfillmentCenterId?: number;
	fulfillmentCenterName?: string;
	jurisdictionGroupId?: number;
	jurisdictionGroupCode?: string;
	shippingModeId?: number;
	shippingModeCarrier?: string;
	shippingModeService?: string;
	precedence?: number;
}

export interface ShippingChargeRange {
	calculationRangeId?: number;
	calculationRangeDetailId?: number;
	rangeStart?: number;
	value?: number;
}

@Injectable({
	providedIn: "root"
})
export class ShippingChargeMainService {
	shippingChargeData: ShippingCharge = null;
	fulfillmentOptions: Array<ShippingChargeFulfillmentOption> = null;
	ranges: Array<ShippingChargeRange> = null;
	processing = false;
	currentCalculationRuleId: number = null;
	currentCalculationScaleId: number = null;

	private currentCalculationRule: any = null;
	private currentCalculationRuleScale: any = null;
	private currentCalculationScale: any = null;
	private currentCalculationRanges: Array<any> = null;
	private currentShippingJurisdictionCalculationRules: Array<any> = null;

	constructor(private calculationRulesService: CalculationRulesService,
			private calculationRangesService: CalculationRangesService,
			private calculationScalesService: CalculationScalesService,
			private calculationRuleScalesService: CalculationRuleScalesService,
			private shippingJurisdictionCalculationRulesService: ShippingJurisdictionCalculationRulesService,
			private calculationRangeDetailsService: CalculationRangeDetailsService,
			private shippingModesService: ShippingModesService,
			private fulfillmentCentersService: FulfillmentCentersService,
			private jurisdictionGroupsService: JurisdictionGroupsService) { }

	clearData() {
		this.shippingChargeData = null;
		this.fulfillmentOptions = null;
		this.ranges = null;
		this.currentCalculationRuleId = null;
		this.currentCalculationScaleId = null;
		this.currentCalculationRule = null;
		this.currentCalculationRuleScale = null;
		this.currentCalculationScale = null;
		this.currentCalculationRanges = null;
		this.currentShippingJurisdictionCalculationRules = null;
	}

	createShippingCharge(): Observable<string> {
		this.processing = true;
		return new Observable<string>((observer: Observer<string>) => {
			const createCalculationScaleArgs: any = {
				storeId: this.shippingChargeData.storeId,
				scaleCode: this.shippingChargeData.scaleCode,
				scaleLookupMethod: this.shippingChargeData.scaleLookupMethod,
				calculationUsageId: -2
			};
			if (this.shippingChargeData.unitOfMeasure) {
				createCalculationScaleArgs.unitOfMeasure = this.shippingChargeData.unitOfMeasure;
			}
			if (this.shippingChargeData.scaleDescription) {
				createCalculationScaleArgs.scaleDescription = this.shippingChargeData.scaleDescription;
			}
			const createCalculationRuleArgs: any = {
				calculationCodeId: this.shippingChargeData.shippingCodeId,
				startDate: this.shippingChargeData.startDate,
				endDate: this.shippingChargeData.endDate,
				calculationMethodId: -27,
				calculationRuleQualifyMethodId: -26,
				combination: 2,
				sequence: 0
			};
			if (this.fulfillmentOptions && this.fulfillmentOptions.length > 0) {
				createCalculationRuleArgs.flags = 1;
			} else {
				createCalculationRuleArgs.flags = 0;
			}
			let requests = [
				this.calculationScalesService.createCalculationScaleResponse(createCalculationScaleArgs),
				this.calculationRulesService.createCalculationRuleResponse(createCalculationRuleArgs)
			];
			let sources = [
				this.shippingChargeData,
				this.shippingChargeData
			];
			forkJoin(requests).subscribe(responseList => {
				this.handleCreateResponses(responseList, sources);
				const calculationRuleScaleRequest = this.getCreateCalculationRuleScaleRequest();
				const shippingJurisdictionCalculationRuleRequests = this.getCreateShippingJurisdictionCalculationRuleRequests();
				const calculationRangeRequests = this.getCreateCalculationRangeRequests();
				requests = calculationRuleScaleRequest.requests
						.concat(shippingJurisdictionCalculationRuleRequests.requests)
						.concat(calculationRangeRequests.requests);
				sources = calculationRuleScaleRequest.sources
						.concat(shippingJurisdictionCalculationRuleRequests.sources)
						.concat(calculationRangeRequests.sources);
				forkJoin(requests).subscribe(responseList2 => {
					this.handleCreateResponses(responseList2, sources);
					requests = this.getCreateCalculationRangeDetailRequests().requests;
					if (requests.length > 0) {
						forkJoin(requests).subscribe(responseList3 => {
							observer.next(createCalculationScaleArgs.scaleCode);
							observer.complete();
							this.processing = false;
						},
						error => {
							observer.error(error);
							observer.complete();
							this.processing = false;
						});
					} else {
						observer.next(createCalculationScaleArgs.scaleCode);
						observer.complete();
						this.processing = false;
					}
				},
				error => {
					observer.error(error);
					observer.complete();
					this.processing = false;
				});
			}, error => {
				observer.error(error);
				observer.complete();
				this.processing = false;
			});
		});
	}

	loadCurrentShippingCharge(id: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentCalculationRule !== null && this.currentCalculationRule.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentCalculationRuleId) {
					this.clearData();
					this.currentCalculationRuleId = id;
				}
				const requests = [
					this.calculationRulesService.getCalculationRuleById({id}),
					this.calculationRuleScalesService.getCalculationRuleScales({
						calculationRuleId: [id]
					})
				];
				forkJoin(requests).subscribe((responseList: Array<any>) => {
					this.currentCalculationRule = responseList[0];
					this.currentCalculationRuleId = responseList[0].id;
					this.shippingChargeData = {
						startDate: this.currentCalculationRule.startDate,
						endDate: this.currentCalculationRule.endDate
					};
					if (responseList[1].items.length > 0) {
						this.currentCalculationRuleScale = responseList[1].items[0];
						this.currentCalculationScaleId = responseList[1].items[0].calculationScaleId;
						this.calculationScalesService.getCalculationScaleById({
							id: this.currentCalculationScaleId
						}).subscribe((body: any) => {
							this.currentCalculationScale = body;
							this.shippingChargeData.scaleCode = body.scaleCode;
							this.shippingChargeData.scaleDescription = body.scaleDescription;
							this.shippingChargeData.scaleLookupMethod = body.scaleLookupMethod;
							this.shippingChargeData.unitOfMeasure = body.unitOfMeasure;
							observer.next(undefined);
							observer.complete();
						},
						error => {
							observer.error(error);
							observer.complete();
						});
					} else {
						observer.next(undefined);
						observer.complete();
					}
				},
				error => {
					observer.error(error);
					observer.complete();
				});
			}
		});
	}

	loadCurrentFulfillmentOptions(id: number, storeId: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentCalculationRuleId === id && this.fulfillmentOptions != null) {
				observer.next(undefined);
				observer.complete();
			} else {
				this.loadCurrentShippingCharge(id).subscribe(response => {
					this.shippingJurisdictionCalculationRulesService.getShippingJurisdictionCalculationRules({
						calculationRuleId: id
					}).subscribe((body: any) => {
						this.currentShippingJurisdictionCalculationRules = body.items;
						const fulfillmentCenterIds: Array<number> = [];
						const jurisdictionGroupIds: Array<number> = [];
						const shippingModeIds: Array<number> = [];
						this.fulfillmentOptions = [];
						body.items.forEach(element => {
							this.fulfillmentOptions.push({
								shippingJurisdictionCalculationRuleId: element.id,
								fulfillmentCenterId: element.fulfillmentCenterId,
								jurisdictionGroupId: element.jurisdictionGroupId,
								shippingModeId: element.shippingModeId,
								precedence: element.precedence,
								calculationRuleId: element.calculationRuleId
							});
							if (element.fulfillmentCenterId) {
								if (fulfillmentCenterIds.indexOf(element.fulfillmentCenterId) < 0) {
									fulfillmentCenterIds.push(element.fulfillmentCenterId);
								}
							}
							if (element.jurisdictionGroupId) {
								if (jurisdictionGroupIds.indexOf(element.jurisdictionGroupId) < 0) {
									jurisdictionGroupIds.push(element.jurisdictionGroupId);
								}
							}
							if (element.shippingModeId) {
								if (shippingModeIds.indexOf(element.shippingModeId) < 0) {
									shippingModeIds.push(element.shippingModeId);
								}
							}
						});
						const requests = [];
						if (fulfillmentCenterIds.length > 0) {
							requests.push(this.fulfillmentCentersService.getFulfillmentCenters({
								id: fulfillmentCenterIds,
								storeId
							}));
						}
						if (jurisdictionGroupIds.length > 0) {
							requests.push(this.jurisdictionGroupsService.getJurisdictionGroups({
								id: jurisdictionGroupIds
							}));
						}
						if (shippingModeIds.length > 0) {
							requests.push(this.shippingModesService.getShippingModes({
								id: shippingModeIds,
								storeId
							}));
						}
						if (requests.length > 0) {
							forkJoin(requests).subscribe(responseList2 => {
								if (shippingModeIds.length > 0) {
									const response2: any = responseList2.pop();
									response2.items.forEach(shippingMode => {
										this.fulfillmentOptions.forEach(fulfillmentOption => {
											if (shippingMode.id === fulfillmentOption.shippingModeId) {
												fulfillmentOption.shippingModeService = shippingMode.shippingCode;
												fulfillmentOption.shippingModeCarrier = shippingMode.carrier;
											}
										});
									});
								}
								if (jurisdictionGroupIds.length > 0) {
									const response2: any = responseList2.pop();
									response2.items.forEach(jurisdictionGroup => {
										this.fulfillmentOptions.forEach(fulfillmentOption => {
											if (jurisdictionGroup.id === fulfillmentOption.jurisdictionGroupId) {
												fulfillmentOption.jurisdictionGroupCode = jurisdictionGroup.code;
											}
										});
									});
								}
								if (fulfillmentCenterIds.length > 0) {
									const response2: any = responseList2.pop();
									response2.items.forEach(fulfillmentCenter => {
										this.fulfillmentOptions.forEach(fulfillmentOption => {
											if (fulfillmentCenter.id === fulfillmentOption.fulfillmentCenterId) {
												fulfillmentOption.fulfillmentCenterName = fulfillmentCenter.name;
											}
										});
									});
								}
								observer.next(undefined);
								observer.complete();
							},
							error => {
								observer.error(error);
								observer.complete();
							});
						} else {
							observer.next(undefined);
							observer.complete();
						}
					},
					error => {
						observer.error(error);
						observer.complete();
					});
				},
				error => {
					observer.error(error);
					observer.complete();
				});
			}
		});
	}

	loadCurrentRanges(id: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentCalculationRuleId === id && this.ranges != null) {
				observer.next(undefined);
				observer.complete();
			} else {
				this.loadCurrentShippingCharge(id).subscribe(response => {
					this.calculationRangesService.getCalculationRanges({
						calculationScaleId: [ this.currentCalculationScaleId ],
						sort: "rangeStart"
					}).subscribe(body => {
						this.currentCalculationRanges = body.items;
						const calculationRangeIds: Array<number> = [];
						this.ranges = [];
						body.items.forEach(calculationRange => {
							calculationRangeIds.push(calculationRange.id);
							this.ranges.push({
								calculationRangeId: calculationRange.id,
								rangeStart: calculationRange.rangeStart,
								value: 0
							});
						});
						if (calculationRangeIds.length > 0) {
							this.calculationRangeDetailsService.getCalculationRangeDetails({
								calculationRangeId: calculationRangeIds
							}).subscribe(body2 => {
								body2.items.forEach(calculationRangeDetail => {
									this.ranges.forEach(range => {
										if (range.calculationRangeId === calculationRangeDetail.calculationRangeId) {
											range.calculationRangeDetailId = calculationRangeDetail.id;
											range.value = calculationRangeDetail.value;
										}
										this.shippingChargeData.currency = calculationRangeDetail.currency;
									});
									this.currentCalculationRanges.forEach(calculationRange => {
										if (calculationRangeDetail.calculationRangeId === calculationRange.id) {
											calculationRange.calculationRangeDetail = calculationRangeDetail;
										}
									});
								});
								observer.next(undefined);
								observer.complete();
							},
							error => {
								observer.error(error);
								observer.complete();
							});
						} else {
							observer.next(undefined);
							observer.complete();
						}
					});
				},
				error => {
					observer.error(error);
					observer.complete();
				});
			}
		});
	}

	updateShippingCharge(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			const updateCalculationRuleRequest = this.getUpdateCalculationRuleRequest();
			const updateCalculationScaleRequest = this.getUpdateCalculationScaleRequest();
			const updateCalculationRangeRequests = this.getUpdateCalculationRangeRequests();
			const updateShippingJurisdictionCalculationRuleRequests = this.getUpdateShippingJurisdictionCalculationRuleRequests();
			let requests = updateCalculationRuleRequest.requests
					.concat(updateCalculationScaleRequest.requests)
					.concat(updateCalculationRangeRequests.requests)
					.concat(updateShippingJurisdictionCalculationRuleRequests.requests);
			let sources = updateCalculationRuleRequest.sources
					.concat(updateCalculationScaleRequest.sources)
					.concat(updateCalculationRangeRequests.sources)
					.concat(updateShippingJurisdictionCalculationRuleRequests.sources);
			if (requests.length === 0) {
				observer.next([]);
				observer.complete();
				this.processing = false;
			} else {
				forkJoin(requests).subscribe(responseList => {
					this.handleCreateResponses(responseList, sources);
					const calculationRuleScaleRequest = this.getCreateCalculationRuleScaleRequest();
					const shippingJurisdictionCalculationRuleRequests = this.getCreateShippingJurisdictionCalculationRuleRequests();
					const calculationRangeRequests = this.getCreateCalculationRangeRequests();
					const calculationRangeDetailRequests = this.getCreateCalculationRangeDetailRequests();
					requests = calculationRuleScaleRequest.requests
							.concat(shippingJurisdictionCalculationRuleRequests.requests)
							.concat(calculationRangeRequests.requests)
							.concat(calculationRangeDetailRequests.requests);
					sources = calculationRuleScaleRequest.sources
							.concat(shippingJurisdictionCalculationRuleRequests.sources)
							.concat(calculationRangeRequests.sources)
							.concat(calculationRangeDetailRequests.sources);
					if (requests.length > 0) {
						forkJoin(requests).subscribe(responseList2 => {
							this.handleCreateResponses(responseList2, sources);
							requests = this.getCreateCalculationRangeDetailRequests().requests;
							if (requests.length > 0) {
								forkJoin(requests).subscribe(responseList3 => {
									observer.next(responseList.concat(responseList2).concat(responseList3));
									observer.complete();
									this.processing = false;
								},
								error => {
									observer.error(error);
									observer.complete();
									this.processing = false;
								});
							} else {
								observer.next(responseList.concat(responseList2));
								observer.complete();
								this.processing = false;
							}
						},
						error => {
							observer.error(error);
							observer.complete();
							this.processing = false;
						});
					} else {
						observer.next(responseList);
						observer.complete();
						this.processing = false;
					}
				},
				error => {
					observer.error(error);
					observer.complete();
					this.processing = false;
				});
			}
		});
	}

	private getCreateCalculationRuleScaleRequest(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.currentCalculationRuleScale === null && this.currentCalculationScaleId !== null && this.currentCalculationRuleId !== null) {
			sources.push(this.shippingChargeData);
			requests.push(this.calculationRuleScalesService.createCalculationRuleScaleResponse({
				calculationScaleId: this.currentCalculationScaleId,
				calculationRuleId: this.currentCalculationRuleId
			}));
		}
		return { sources, requests };
	}

	private getCreateShippingJurisdictionCalculationRuleRequests(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.fulfillmentOptions != null) {
			this.fulfillmentOptions.forEach(fulfillmentOption => {
				if (!fulfillmentOption.shippingJurisdictionCalculationRuleId) {
					const precedence = fulfillmentOption.precedence ? fulfillmentOption.precedence : 0;
					const calculationRuleId = this.currentCalculationRuleId;
					const jurisdictionGroupId = fulfillmentOption.jurisdictionGroupId ? fulfillmentOption.jurisdictionGroupId : null;
					const fulfillmentCenterId = fulfillmentOption.fulfillmentCenterId ? fulfillmentOption.fulfillmentCenterId : null;
					const shippingModeId = fulfillmentOption.shippingModeId ? fulfillmentOption.shippingModeId : null;
					sources.push(fulfillmentOption);
					requests.push(this.shippingJurisdictionCalculationRulesService.createShippingJurisdictionCalculationRuleResponse({
						precedence,
						calculationRuleId,
						jurisdictionGroupId,
						fulfillmentCenterId,
						shippingModeId
					}));
				}
			});
		}
		return { sources, requests };
	}

	private getCreateCalculationRangeRequests(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.ranges != null && this.currentCalculationScaleId != null) {
			const calculationMethodId = this.shippingChargeData.unitOfMeasure ? -34 : -33;
			this.ranges.forEach(range => {
				if (!range.calculationRangeId) {
					sources.push(range);
					requests.push(this.calculationRangesService.createCalculationRangeResponse({
						cumulative: 0,
						rangeStart: range.rangeStart,
						calculationMethodId,
						calculationScaleId: this.currentCalculationScaleId
					}));
				}
			});
		}
		return { sources, requests };
	}

	private getCreateCalculationRangeDetailRequests(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.ranges != null) {
			this.ranges.forEach(range => {
				if (range.calculationRangeId && !range.calculationRangeDetailId) {
					sources.push(range);
					requests.push(this.calculationRangeDetailsService.createCalculationRangeDetailResponse({
						calculationRangeId: range.calculationRangeId,
						value: range.value,
						currency: this.shippingChargeData.currency
					}));
				}
			});
		}
		return { sources, requests };
	}

	private handleCreateResponses(responseList, sources) {
		for (let i = 0; i < responseList.length; i++) {
			const source = sources[i];
			const response = responseList[i];
			if (source && response && response.headers && response.headers.get("location")) {
				const paths: Array<string> = response.headers.get("location").split("/");
				if (paths.length > 1) {
					const resourceType = paths[paths.length - 2];
					if (resourceType === "calculation-rules") {
						const calculationRuleId = Number(paths[paths.length - 1]);
						source.calculationRuleId = calculationRuleId;
						this.currentCalculationRuleId = calculationRuleId;
					} else if (resourceType === "calculation-scales") {
						const calculationScaleId = Number(paths[paths.length - 1]);
						source.calculationScaleId = calculationScaleId;
						this.currentCalculationScaleId = calculationScaleId;
					} else if (resourceType === "calculation-ranges") {
						const calculationRangeId = Number(paths[paths.length - 1]);
						source.calculationRangeId = calculationRangeId;
					} else if (resourceType === "calculation-range-details") {
						const calculationRangeDetailId = Number(paths[paths.length - 1]);
						source.calculationRangeDetailId = calculationRangeDetailId;
					} else if (resourceType === "shipping-jurisdiction-calculation-rules") {
						const shippingJurisdictionCalculationRuleId = Number(paths[paths.length - 1]);
						source.shippingJurisdictionCalculationRuleId = shippingJurisdictionCalculationRuleId;
					}
				}
			}
		}
	}

	private getUpdateCalculationRuleRequest(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.currentCalculationRuleId != null && this.currentCalculationRule != null && (
				this.currentCalculationRule.startDate !== this.shippingChargeData.startDate ||
				this.currentCalculationRule.endDate !== this.shippingChargeData.endDate)) {
			const args: CalculationRulesService.UpdateCalculationRuleByIdParams = {
				id: this.currentCalculationRuleId,
				CalculationRule: {
				}
			};
			if (this.currentCalculationRule.startDate !== this.shippingChargeData.startDate) {
				args.CalculationRule.startDate = this.shippingChargeData.startDate;
			}
			if (this.currentCalculationRule.endDate !== this.shippingChargeData.endDate) {
				args.CalculationRule.endDate = this.shippingChargeData.endDate;
			}
			sources.push(this.shippingChargeData);
			requests.push(this.calculationRulesService.updateCalculationRuleByIdResponse(args));
		}
		return { sources, requests };
	}

	private getUpdateCalculationScaleRequest(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.currentCalculationScaleId != null && this.currentCalculationScale != null && (
				this.currentCalculationScale.scaleCode !== this.shippingChargeData.scaleCode ||
				this.currentCalculationScale.scaleDescription !== this.shippingChargeData.scaleDescription ||
				this.currentCalculationScale.unitOfMeasure !== this.shippingChargeData.unitOfMeasure ||
				this.currentCalculationScale.scaleLookupMethod !== this.shippingChargeData.scaleLookupMethod)) {
			const args: CalculationScalesService.UpdateCalculationScaleByIdParams = {
				id: this.currentCalculationScaleId,
				CalculationScale: {
				}
			};
			if (this.currentCalculationScale.scaleCode !== this.shippingChargeData.scaleCode) {
				args.CalculationScale.scaleCode = this.shippingChargeData.scaleCode;
			}
			if (this.currentCalculationScale.scaleDescription !== this.shippingChargeData.scaleDescription) {
				args.CalculationScale.scaleDescription = this.shippingChargeData.scaleDescription;
			}
			if (this.currentCalculationScale.unitOfMeasure !== this.shippingChargeData.unitOfMeasure) {
				args.CalculationScale.unitOfMeasure = this.shippingChargeData.unitOfMeasure;
			}
			if (this.currentCalculationScale.scaleLookupMethod !== this.shippingChargeData.scaleLookupMethod) {
				args.CalculationScale.scaleLookupMethod = this.shippingChargeData.scaleLookupMethod;
			}
			sources.push(this.shippingChargeData);
			requests.push(this.calculationScalesService.updateCalculationScaleByIdResponse(args));
		} else if (this.currentCalculationScaleId == null && this.shippingChargeData != null) {
			const createCalculationScaleArgs: any = {
				storeId: this.shippingChargeData.storeId,
				scaleCode: this.shippingChargeData.scaleCode,
				scaleLookupMethod: this.shippingChargeData.scaleLookupMethod,
				calculationUsageId: -2
			};
			if (this.shippingChargeData.unitOfMeasure) {
				createCalculationScaleArgs.unitOfMeasure = this.shippingChargeData.unitOfMeasure;
			}
			if (this.shippingChargeData.scaleDescription) {
				createCalculationScaleArgs.scaleDescription = this.shippingChargeData.scaleDescription;
			}
			sources.push(this.shippingChargeData);
			requests.push(this.calculationScalesService.createCalculationScaleResponse(createCalculationScaleArgs));
		}
		return { sources, requests };
	}

	private getUpdateShippingJurisdictionCalculationRuleRequests(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.currentShippingJurisdictionCalculationRules != null) {
			this.currentShippingJurisdictionCalculationRules.forEach(currentShippingJurisdictionCalculationRule => {
				let found = false;
				if (this.fulfillmentOptions != null) {
					for (let i = 0; i < this.fulfillmentOptions.length; i++) {
						const fulfillmentOption = this.fulfillmentOptions[i];
						if (fulfillmentOption.calculationRuleId === currentShippingJurisdictionCalculationRule.calculationRuleId &&
								fulfillmentOption.jurisdictionGroupId === currentShippingJurisdictionCalculationRule.jurisdictionGroupId &&
								fulfillmentOption.fulfillmentCenterId === currentShippingJurisdictionCalculationRule.fulfillmentCenterId &&
								fulfillmentOption.shippingModeId === currentShippingJurisdictionCalculationRule.shippingModeId) {
							found = true;
							if (fulfillmentOption.precedence !== currentShippingJurisdictionCalculationRule.precedence) {
								sources.push(fulfillmentOption);
								requests.push(this.shippingJurisdictionCalculationRulesService.updateShippingJurisdictionCalculationRuleByIdResponse({
									id: currentShippingJurisdictionCalculationRule.id,
									ShippingJurisdictionCalculationRule: {
										precedence: fulfillmentOption.precedence
									}
								}));
							}
							break;
						}
					}
				}
				if (!found) {
					sources.push(null);
					requests.push(this.shippingJurisdictionCalculationRulesService
							.deleteShippingJurisdictionCalculationRuleByIdResponse(currentShippingJurisdictionCalculationRule.id));
				}
			});
		}
		if (this.fulfillmentOptions) {
			this.fulfillmentOptions.forEach(fulfillmentOption => {
				let found = false;
				if (this.currentShippingJurisdictionCalculationRules != null) {
					for (let i = 0; i < this.currentShippingJurisdictionCalculationRules.length; i++) {
						const currentShippingJurisdictionCalculationRule = this.currentShippingJurisdictionCalculationRules[i];
						if (fulfillmentOption.calculationRuleId === currentShippingJurisdictionCalculationRule.calculationRuleId &&
								fulfillmentOption.jurisdictionGroupId === currentShippingJurisdictionCalculationRule.jurisdictionGroupId &&
								fulfillmentOption.fulfillmentCenterId === currentShippingJurisdictionCalculationRule.fulfillmentCenterId &&
								fulfillmentOption.shippingModeId === currentShippingJurisdictionCalculationRule.shippingModeId) {
							found = true;
							break;
						}
					}
				}
				if (!found) {
					sources.push(fulfillmentOption);
					const precedence = fulfillmentOption.precedence ? fulfillmentOption.precedence : 0;
					const calculationRuleId = this.currentCalculationRuleId;
					const jurisdictionGroupId = fulfillmentOption.jurisdictionGroupId ? fulfillmentOption.jurisdictionGroupId : null;
					const fulfillmentCenterId = fulfillmentOption.fulfillmentCenterId ? fulfillmentOption.fulfillmentCenterId : null;
					const shippingModeId = fulfillmentOption.shippingModeId ? fulfillmentOption.shippingModeId : null;
					sources.push(fulfillmentOption);
					requests.push(this.shippingJurisdictionCalculationRulesService.createShippingJurisdictionCalculationRuleResponse({
						precedence,
						calculationRuleId,
						jurisdictionGroupId,
						fulfillmentCenterId,
						shippingModeId
					}));
				}
			});
		}
		return { sources, requests };
	}

	private getUpdateCalculationRangeRequests(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		const calculationMethodId = this.shippingChargeData.unitOfMeasure ? -34 : -33;
		if (this.currentCalculationRanges != null) {
			this.currentCalculationRanges.forEach(currentCalculationRange => {
				let found = false;
				if (this.ranges != null) {
					for (let i = 0; i < this.ranges.length; i++) {
						const range = this.ranges[i];
						if (range.calculationRangeId === currentCalculationRange.id) {
							found = true;
							if (range.rangeStart !== currentCalculationRange.rangeStart ||
									calculationMethodId !== currentCalculationRange.calculationMethodId) {
								const args: CalculationRangesService.UpdateCalculationRangeByIdParams = {
									id: currentCalculationRange.id,
									CalculationRange: {}
								};
								if (range.rangeStart !== currentCalculationRange.rangeStart) {
									args.CalculationRange.rangeStart = range.rangeStart;
								}
								if (calculationMethodId !== currentCalculationRange.calculationMethodId) {
									args.CalculationRange.calculationMethodId = calculationMethodId;
								}
								sources.push(range);
								requests.push(this.calculationRangesService.updateCalculationRangeByIdResponse(args));
							}
							if (currentCalculationRange.calculationRangeDetail) {
								if (this.shippingChargeData.currency !== currentCalculationRange.calculationRangeDetail.currency ||
										range.value !== currentCalculationRange.calculationRangeDetail.value) {
									const args: CalculationRangeDetailsService.UpdateCalculationRangeDetailByIdParams = {
										id: currentCalculationRange.calculationRangeDetail.id,
										CalculationRangeDetail: {}
									};
									if (this.shippingChargeData.currency !== currentCalculationRange.calculationRangeDetail.currency) {
										args.CalculationRangeDetail.currency = this.shippingChargeData.currency;
									}
									if (range.value !== currentCalculationRange.calculationRangeDetail.value) {
										args.CalculationRangeDetail.value = range.value;
									}
									sources.push(range);
									requests.push(this.calculationRangeDetailsService.updateCalculationRangeDetailByIdResponse(args));
								}
							} else {
								sources.push(range);
								requests.push(this.calculationRangeDetailsService.createCalculationRangeDetailResponse({
									calculationRangeId: currentCalculationRange.id,
									value: range.value,
									currency: this.shippingChargeData.currency
								}));
							}
							break;
						}
					}
				}
				if (!found) {
					sources.push(null);
					requests.push(this.calculationRangesService.deleteCalculationRangeByIdResponse(currentCalculationRange.id));
				}
			});
		}
		if (this.ranges) {
			this.ranges.forEach(range => {
				let found = false;
				if (this.currentCalculationRanges != null) {
					for (let i = 0; i < this.currentCalculationRanges.length; i++) {
						const currentCalculationRange = this.currentCalculationRanges[i];
						if (range.calculationRangeId === currentCalculationRange.id) {
							found = true;
							break;
						}
					}
				}
				if (!found) {
					sources.push(range);
					requests.push(this.calculationRangesService.createCalculationRangeResponse({
						cumulative: 0,
						rangeStart: range.rangeStart,
						calculationMethodId,
						calculationScaleId: this.currentCalculationScaleId
					}));
				}
			});
		}
		return { sources, requests };
	}
}
