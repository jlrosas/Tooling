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
import { TaxCategoriesService } from "../../../rest/services/tax-categories.service";
import { TaxCategoryDescriptionsService } from "../../../rest/services/tax-category-descriptions.service";
import { CalculationRulesService } from "../../../rest/services/calculation-rules.service";
import { CalculationCodesService } from "../../../rest/services/calculation-codes.service";
import { CalculationRuleScalesService } from "../../../rest/services/calculation-rule-scales.service";
import { TaxJurisdictionCalculationRulesService } from "../../../rest/services/tax-jurisdiction-calculation-rules.service";
import { CalculationRangesService } from "../../../rest/services/calculation-ranges.service";
import { CalculationRangeDetailsService } from "../../../rest/services/calculation-range-details.service";
import { CalculationScalesService } from "../../../rest/services/calculation-scales.service";
import { JurisdictionGroupsService } from "../../../rest/services/jurisdiction-groups.service";
import { FulfillmentCentersService } from "../../../rest/services/fulfillment-centers.service";

export interface TaxRate {
	jurisdictionGroupId?: number;
	jurisdictionGroupCode?: string;
	fulfillmentCenterId?: number;
	fulfillmentCenterName?: string;
	rate?: number;
	precedence?: number;
	calculationRuleIds?: Array<number>;
	calculationScaleIds?: Array<number>;
	calculationRangeIds?: Array<number>;
}

@Injectable({
	providedIn: "root"
})
export class TaxCategoryMainService {
	taxCategoryData: any = null;
	descriptions: Array<any> = null;
	taxCodes: Array<any> = null;
	taxRates: Array<TaxRate> = null;

	processing = false;
	currentTaxCategoryId: number = null;

	private currentTaxCategory: any = null;
	private currentDescriptions: Array<any> = null;
	private currentCalculationRules: Array<any> = null;
	private currentCalculationRuleScales: Array<any> = null;
	private currentTaxJurisdictionCalculationRules: Array<any> = null;
	private currentCalculationRanges: Array<any> = null;
	private currentCalculationRangeDetails: Array<any> = null;

	constructor(
			private taxCategoriesService: TaxCategoriesService,
			private taxCategoryDescriptionService: TaxCategoryDescriptionsService,
			private calculationRulesService: CalculationRulesService,
			private calculationCodesService: CalculationCodesService,
			private calculationRuleScalesService: CalculationRuleScalesService,
			private taxJurisdictionCalculationRulesService: TaxJurisdictionCalculationRulesService,
			private calculationRangesService: CalculationRangesService,
			private calculationRangeDetailsService: CalculationRangeDetailsService,
			private calculationScalesService: CalculationScalesService,
			private jurisdictionGroupsService: JurisdictionGroupsService,
			private fulfillmentCentersService: FulfillmentCentersService) { }

	clearData() {
		this.taxCategoryData = null;
		this.descriptions = null;
		this.taxCodes = null;
		this.taxRates = null;
		this.currentTaxCategoryId = null;
		this.currentDescriptions = null;
		this.currentCalculationRules = null;
		this.currentCalculationRuleScales = null;
		this.currentTaxJurisdictionCalculationRules = null;
		this.currentCalculationRanges = null;
		this.currentCalculationRangeDetails = null;
	}

	createTaxCategory(): Observable<string> {
		this.processing = true;
		return new Observable<string>((observer: Observer<string>) => {
			const args: any = {
				storeId: this.taxCategoryData.storeId,
				taxTypeId: this.taxCategoryData.taxTypeId,
				name: this.taxCategoryData.name,
				displayUsage: (this.taxCategoryData.taxTypeId === -3) ? this.taxCategoryData.displayUsage : 0,
				calculationSequence: 0,
				displaySequence: 0
			};
			this.taxCategoriesService.createTaxCategoryResponse(args).subscribe(response => {
				const paths: Array<string> = response.headers.get("location").split("/");
				this.currentTaxCategoryId = Number(paths[paths.length - 1]);
				const descriptionRequests = this.getCreateTaxCategoryDescriptionRequests();
				const calculationRuleRequests = this.getCreateCalculationRuleRequests();
				const calculationScaleRequests = this.getCreateCalculationScaleRequests();
				let requests = descriptionRequests.requests.concat(calculationRuleRequests.requests)
						.concat(calculationScaleRequests.requests);
				let sources = descriptionRequests.sources.concat(calculationRuleRequests.sources)
						.concat(calculationScaleRequests.sources);
				if (requests.length === 0) {
					observer.next(args.name);
					observer.complete();
					this.processing = false;
				} else {
					forkJoin(requests).subscribe(responseList => {
						this.handleCreateResponses(responseList, sources);
						const calculationRuleScaleRequests = this.getCreateCalculationRuleScaleRequests();
						const taxJurisdictionCalculationRequests = this.getCreateTaxJurisdictionCalculationRequests();
						const calculationRangeRequests = this.getCreateCalculationRangeRequests();
						requests = calculationRuleScaleRequests.requests.concat(taxJurisdictionCalculationRequests.requests)
								.concat(calculationRangeRequests.requests);
						sources = calculationRuleScaleRequests.sources.concat(taxJurisdictionCalculationRequests.sources)
								.concat(calculationRangeRequests.sources);
						if (requests.length > 0) {
							forkJoin(requests).subscribe(responseList2 => {
								this.handleCreateResponses(responseList2, sources);
								requests = this.getCreateCalculationRangeDetailRequests().requests;
								if (requests.length > 0) {
									forkJoin(requests).subscribe(responseList3 => {
										observer.next(args.name);
										observer.complete();
										this.processing = false;
									},
									error => {
										observer.error(error);
										observer.complete();
										this.processing = false;
									});
								} else {
									observer.next(args.name);
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
							observer.next(args.name);
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
			}, error => {
				observer.error(error);
				observer.complete();
				this.processing = false;
			});
		});
	}

	loadCurrentTaxCategory(id: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentTaxCategory != null && this.currentTaxCategoryId === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentTaxCategoryId) {
					this.clearData();
					this.currentTaxCategoryId = id;
				}
				this.taxCategoriesService.getTaxCategoryById({id}).subscribe((item: any) => {
					this.currentTaxCategory = item;
					this.taxCategoryData = {
						id: item.id,
						storeId: item.storeId,
						taxTypeId: item.taxTypeId,
						name: item.name,
						displayUsage: item.displayUsage
					};
					observer.next(undefined);
					observer.complete();
				},
				error => {
					observer.error(error);
					observer.complete();
				});
			}
		});
	}

	loadCurrentTaxCategoryDescriptions(id: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentTaxCategoryId === id && this.descriptions != null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentTaxCategoryId) {
					this.clearData();
					this.currentTaxCategoryId = id;
				}
				this.taxCategoryDescriptionService.getTaxCategoryDescriptions({
					taxCategoryId: id
				}).subscribe((body: any) => {
					this.currentDescriptions = body.items;
					this.descriptions = [];
					body.items.forEach(element => {
						const description = {
							taxCategoryId: element.taxCategoryId,
							languageId: element.languageId,
							description: element.description
						};
						this.descriptions.push(description);
					});
					observer.next(undefined);
					observer.complete();
				},
				error => {
					observer.error(error);
					observer.complete();
				});
			}
		});
	}

	loadCurrentTaxCodes(id: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentTaxCategoryId === id && this.taxCodes != null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentTaxCategoryId) {
					this.clearData();
					this.currentTaxCategoryId = id;
				}
				this.calculationRulesService.getCalculationRules({
					taxCategoryId: id
				}).subscribe((body: any) => {
					this.currentCalculationRules = body.items;
					this.taxCodes = [];
					const calculationCodeIds: Array<number> = [];
					body.items.forEach(element => {
						const calculationCodeId = element.calculationCodeId;
						if (calculationCodeIds.indexOf(calculationCodeId) < 0) {
							calculationCodeIds.push(calculationCodeId);
							const taxCode = {
								id: calculationCodeId
							};
							this.taxCodes.push(taxCode);
						}
					});
					if (calculationCodeIds.length > 0) {
						this.calculationCodesService.getCalculationCodes({
							id: calculationCodeIds
						}).subscribe((calculationCodeResponse: any) => {
							calculationCodeResponse.items.forEach(calculationCode => {
								this.taxCodes.forEach(taxCode => {
									if (taxCode.id === calculationCode.id) {
										taxCode.calculationCode = calculationCode.calculationCode;
									}
								});
							});
							observer.next(undefined);
							observer.complete();
						}, error => {
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

	loadCurrentTaxRates(id: number, storeOwnerId: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentTaxCategoryId === id && this.taxRates != null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentTaxCategoryId) {
					this.clearData();
					this.currentTaxCategoryId = id;
				}
				this.loadCurrentTaxCodes(id).subscribe(response => {
					const calculationRuleIds: Array<number> = [];
					this.currentCalculationRules.forEach(calculationRule => {
						calculationRuleIds.push(calculationRule.id);
					});
					if (calculationRuleIds.length > 0) {
						let requests = [
							this.calculationRuleScalesService.getCalculationRuleScales({
								calculationRuleId: calculationRuleIds
							}),
							this.taxJurisdictionCalculationRulesService.getTaxJurisdictionCalculationRules({
								calculationRuleId: calculationRuleIds
							})
						];
						forkJoin(requests).subscribe(responseList => {
							this.currentCalculationRuleScales = responseList[0].items;
							const calculationScaleIds: Array<number> = [];
							this.currentCalculationRuleScales.forEach(calculationRuleScale => {
								calculationScaleIds.push(calculationRuleScale.calculationScaleId);
								this.currentCalculationRules.forEach(calculationRule => {
									if (calculationRuleScale.calculationRuleId === calculationRule.id) {
										calculationRule.calculationScaleId = calculationRuleScale.calculationScaleId;
									}
								});
							});
							this.currentTaxJurisdictionCalculationRules = responseList[1].items;
							const jurisdictionGroupIds: Array<number> = [];
							const fulfillmentCenterIds: Array<number> = [];
							this.currentTaxJurisdictionCalculationRules.forEach(taxJurisdictionCalculationRule => {
								if (taxJurisdictionCalculationRule.jurisdictionGroupId) {
									if (jurisdictionGroupIds.indexOf(taxJurisdictionCalculationRule.jurisdictionGroupId) < 0) {
										jurisdictionGroupIds.push(taxJurisdictionCalculationRule.jurisdictionGroupId);
									}
								}
								if (taxJurisdictionCalculationRule.fulfillmentCenterId) {
									if (fulfillmentCenterIds.indexOf(taxJurisdictionCalculationRule.fulfillmentCenterId) < 0) {
										fulfillmentCenterIds.push(taxJurisdictionCalculationRule.fulfillmentCenterId);
									}
								}
								this.currentCalculationRules.forEach(calculationRule => {
									if (taxJurisdictionCalculationRule.calculationRuleId === calculationRule.id) {
										calculationRule.jurisdictionGroupId = taxJurisdictionCalculationRule.jurisdictionGroupId;
										calculationRule.fulfillmentCenterId = taxJurisdictionCalculationRule.fulfillmentCenterId;
										calculationRule.precedence = taxJurisdictionCalculationRule.precedence;
									}
								});
							});
							requests = [];
							if (calculationScaleIds.length > 0) {
								requests.push(this.calculationRangesService.getCalculationRanges({
									calculationScaleId: calculationScaleIds
								}));
							}
							if (jurisdictionGroupIds.length > 0) {
								requests.push(this.jurisdictionGroupsService.getJurisdictionGroups({
									id: jurisdictionGroupIds
								}));
							}
							if (fulfillmentCenterIds.length > 0) {
								requests.push(this.fulfillmentCentersService.getFulfillmentCenters({
									id: fulfillmentCenterIds,
									memberId: storeOwnerId
								}));
							}
							if (requests.length > 0) {
								forkJoin(requests).subscribe(responseList2 => {
									if (fulfillmentCenterIds.length > 0) {
										const response2: any = responseList2.pop();
										response2.items.forEach(fulfillmentCenter => {
											this.currentCalculationRules.forEach(calculationRule => {
												if (fulfillmentCenter.id === calculationRule.fulfillmentCenterId) {
													calculationRule.fulfillmentCenterName = fulfillmentCenter.name;
												}
											});
										});
									}
									if (jurisdictionGroupIds.length > 0) {
										const response2: any = responseList2.pop();
										response2.items.forEach(jurisdictionGroup => {
											this.currentCalculationRules.forEach(calculationRule => {
												if (jurisdictionGroup.id === calculationRule.jurisdictionGroupId) {
													calculationRule.jurisdictionGroupCode = jurisdictionGroup.code;
												}
											});
										});
									}
									if (calculationScaleIds.length > 0) {
										const calculationRangeIds: Array<number> = [];
										const response2: any = responseList2.pop();
										response2.items.forEach(calculationRange => {
											this.currentCalculationRules.forEach(calculationRule => {
												calculationRangeIds.push(calculationRange.id);
												if (calculationRange.calculationScaleId === calculationRule.calculationScaleId) {
													calculationRule.calculationRangeId = calculationRange.id;
												}
											});
										});
										this.calculationRangeDetailsService.getCalculationRangeDetails({
											calculationRangeId: calculationRangeIds
										}).subscribe(calculationRangeDetailsResponse => {
											calculationRangeDetailsResponse.items.forEach(calculationRangeDetail => {
												this.currentCalculationRules.forEach(calculationRule => {
													if (calculationRangeDetail.calculationRangeId === calculationRule.calculationRangeId) {
														calculationRule.calculationRangeDetailId = calculationRangeDetail.id;
														calculationRule.rate = calculationRangeDetail.value;
													}
												});
											});
											this.populateTaxRates();
											observer.next(undefined);
											observer.complete();
										},
										error => {
											observer.error(error);
											observer.complete();
										});
									} else {
										this.populateTaxRates();
										observer.next(undefined);
										observer.complete();
									}
								});
							} else {
								this.populateTaxRates();
								observer.next(undefined);
								observer.complete();
							}
						},
						error => {
							observer.error(error);
							observer.complete();
						});
					} else {
						this.populateTaxRates();
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

	updateTaxCategory(storeOwnerId: string): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			this.loadCurrentTaxRatesForUpdate(storeOwnerId).subscribe(loadResponse => {
				const updateTaxCategoryRequest = this.getUpdateTaxCategoryRequest();
				const updateDescriptionsRequests = this.getUpdateTaxCategoryDescriptionRequests();
				const updateCalculationRuleRequests = this.getUpdateCalculationRuleRequests();
				let sources = updateTaxCategoryRequest.requests.concat(updateDescriptionsRequests.sources)
						.concat(updateCalculationRuleRequests.sources);
				let requests = updateTaxCategoryRequest.requests.concat(updateDescriptionsRequests.requests)
						.concat(updateCalculationRuleRequests.requests);
				if (requests.length === 0) {
					observer.next(undefined);
					observer.complete();
					this.processing = false;
				} else {
					forkJoin(requests).subscribe(responseList => {
						this.handleCreateResponses(responseList, sources);
						const calculationRuleScaleRequests = this.getCreateCalculationRuleScaleRequests();
						const taxJurisdictionCalculationRequests = this.getCreateTaxJurisdictionCalculationRequests();
						const calculationRangeRequests = this.getCreateCalculationRangeRequests();
						requests = calculationRuleScaleRequests.requests.concat(taxJurisdictionCalculationRequests.requests)
								.concat(calculationRangeRequests.requests);
						sources = calculationRuleScaleRequests.sources.concat(taxJurisdictionCalculationRequests.sources)
								.concat(calculationRangeRequests.sources);
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
						this.processing = false;
					},
					error => {
						observer.error(error);
						observer.complete();
						this.processing = false;
					});
				}
			});
		});
	}

	private loadCurrentTaxRatesForUpdate(storeOwnerId: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.taxRates !== null || this.currentCalculationRules === null) {
				observer.next(undefined);
				observer.complete();
			} else {
				this.loadCurrentTaxRates(this.currentTaxCategoryId, storeOwnerId).subscribe(response => {
					observer.next(undefined);
					observer.complete();
				},
				error => {
					observer.error(error);
					observer.complete();
				});
			}
		});
	}

	private getCreateTaxCategoryDescriptionRequests(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		const descriptions = this.descriptions;
		this.descriptions = null;
		if (descriptions != null) {
			descriptions.forEach(description => {
				const args: any = {
					taxCategoryId: this.currentTaxCategoryId,
					languageId: description.languageId
				};
				if (description.description) {
					args.description = description.description;
				}
				sources.push(description);
				requests.push(this.taxCategoryDescriptionService.createTaxCategoryDescriptionResponse(args));
			});
		}
		return { sources, requests };
	}

	private getCreateCalculationRuleRequests(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.taxCodes != null) {
			this.taxCodes.forEach(taxCode => {
				const calculationCodeId = taxCode.id;
				if (this.taxRates != null) {
					this.taxRates.forEach(taxRate => {
						sources.push(taxRate);
						requests.push(this.calculationRulesService.createCalculationRuleResponse({
							combination: 2,
							sequence: 0,
							flags: 1,
							taxCategoryId: this.currentTaxCategoryId,
							calculationCodeId: calculationCodeId,
							calculationMethodId: this.taxCategoryData.taxTypeId === -3 ? -47 : -67,
							calculationRuleQualifyMethodId: this.taxCategoryData.taxTypeId === -3 ? -46 : -66
						}));
					});
				}
			});
		}
		return { sources, requests };
	}

	private getCreateCalculationScaleRequests(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.taxCodes != null) {
			this.taxCodes.forEach(taxCode => {
				if (this.taxRates != null) {
					this.taxRates.forEach(taxRate => {
						sources.push(taxRate);
						requests.push(this.calculationScalesService.createCalculationScaleResponse({
							storeId: this.taxCategoryData.storeId,
							calculationUsageId: this.taxCategoryData.taxTypeId,
							scaleLookupMethod: this.taxCategoryData.taxTypeId === -3 ? -53 : -73
						}));
					});
				}
			});
		}
		return { sources, requests };
	}

	private getCreateCalculationRuleScaleRequests(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.taxRates != null) {
			this.taxRates.forEach(taxRate => {
				const calculationRuleIds = taxRate.calculationRuleIds ? taxRate.calculationRuleIds : [];
				const calculationScaleIds = taxRate.calculationScaleIds ? taxRate.calculationScaleIds : [];
				for (let i = 0; i < calculationRuleIds.length && i < calculationScaleIds.length; i++) {
					sources.push(taxRate);
					requests.push(this.calculationRuleScalesService.createCalculationRuleScaleResponse({
						calculationScaleId: calculationScaleIds[i],
						calculationRuleId: calculationRuleIds[i]
					}));
				}
			});
		}
		return { sources, requests };
	}

	private getCreateTaxJurisdictionCalculationRequests(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.taxRates != null) {
			this.taxRates.forEach(taxRate => {
				const precedence = taxRate.precedence ? taxRate.precedence : 0;
				const jurisdictionGroupId = taxRate.jurisdictionGroupId ? taxRate.jurisdictionGroupId : null;
				const fulfillmentCenterId = taxRate.fulfillmentCenterId ? taxRate.fulfillmentCenterId : null;
				const calculationRuleIds = taxRate.calculationRuleIds ? taxRate.calculationRuleIds : [];
				calculationRuleIds.forEach(calculationRuleId => {
					sources.push(taxRate);
					requests.push(this.taxJurisdictionCalculationRulesService.createTaxJurisdictionCalculationRuleResponse({
						precedence: precedence,
						calculationRuleId: calculationRuleId,
						jurisdictionGroupId: jurisdictionGroupId,
						fulfillmentCenterId: fulfillmentCenterId
					}));
				});
			});
		}
		return { sources, requests };
	}

	private getCreateCalculationRangeRequests(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.taxRates != null) {
			this.taxRates.forEach(taxRate => {
				if (taxRate.calculationScaleIds) {
					taxRate.calculationScaleIds.forEach(calculationScaleId => {
						sources.push(taxRate);
						requests.push(this.calculationRangesService.createCalculationRangeResponse({
							cumulative: 0,
							rangeStart: 0,
							calculationMethodId: this.taxCategoryData.taxTypeId === -3 ? -59 : -77,
							calculationScaleId: calculationScaleId
						}));
					});
				}
			});
		}
		return { sources, requests };
	}

	private getCreateCalculationRangeDetailRequests(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.taxRates != null) {
			this.taxRates.forEach(taxRate => {
				if (taxRate.calculationRangeIds) {
					taxRate.calculationRangeIds.forEach(calculationRangeId => {
						sources.push(taxRate);
						requests.push(this.calculationRangeDetailsService.createCalculationRangeDetailResponse({
							calculationRangeId: calculationRangeId,
							value: taxRate.rate
						}));
					});
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
						if (source.calculationRuleIds) {
							source.calculationRuleIds.push(calculationRuleId);
						} else {
							source.calculationRuleIds = [ calculationRuleId ];
						}
					} else if (resourceType === "calculation-scales") {
						const calculationScaleId = Number(paths[paths.length - 1]);
						if (source.calculationScaleIds) {
							source.calculationScaleIds.push(calculationScaleId);
						} else {
							source.calculationScaleIds = [ calculationScaleId ];
						}
					} else if (resourceType === "calculation-ranges") {
						const calculationRangeId = Number(paths[paths.length - 1]);
						if (source.calculationRangeIds) {
							source.calculationRangeIds.push(calculationRangeId);
						} else {
							source.calculationRangeIds = [ calculationRangeId ];
						}
					}
				}
			}
		}
	}

	private populateTaxRates() {
		this.taxRates = [];
		this.currentCalculationRules.forEach(calculationRule => {
			let found = false;
			for (let i = 0; i < this.taxRates.length; i++) {
				const taxRate = this.taxRates[i];
				if (taxRate.jurisdictionGroupId === calculationRule.jurisdictionGroupId &&
					taxRate.fulfillmentCenterId === calculationRule.fulfillmentCenterId) {
					found = true;
				}
			}
			if (!found) {
				this.taxRates.push({
					jurisdictionGroupId: calculationRule.jurisdictionGroupId ? calculationRule.jurisdictionGroupId : null,
					jurisdictionGroupCode: calculationRule.jurisdictionGroupCode ? calculationRule.jurisdictionGroupCode : null,
					fulfillmentCenterId: calculationRule.fulfillmentCenterId ? calculationRule.fulfillmentCenterId : null,
					fulfillmentCenterName: calculationRule.fulfillmentCenterName ? calculationRule.fulfillmentCenterName : null,
					rate: calculationRule.rate ? calculationRule.rate : 0.0,
					precedence: calculationRule.precedence ? calculationRule.precedence : null
				});
			}
		});
	}

	private getUpdateTaxCategoryRequest(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.currentTaxCategoryId != null && this.currentTaxCategory != null && (
				this.currentTaxCategory.name !== this.taxCategoryData.name ||
				this.currentTaxCategory.displayUsage !== this.taxCategoryData.displayUsage)) {
			const args: TaxCategoriesService.UpdateTaxCategoryByIdParams = {
				id: this.currentTaxCategoryId,
				TaxCategory: {
				}
			};
			if (this.currentTaxCategory.name !== this.taxCategoryData.name) {
				args.TaxCategory.name = this.taxCategoryData.name;
			}
			if (this.currentTaxCategory.displayUsage !== this.taxCategoryData.displayUsage) {
				args.TaxCategory.displayUsage = this.taxCategoryData.displayUsage;
			}
			sources.push(this.taxCategoryData);
			requests.push(this.taxCategoriesService.updateTaxCategoryByIdResponse(args));
		}
		return { sources, requests };
	}

	private getUpdateTaxCategoryDescriptionRequests(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.currentDescriptions != null) {
			this.currentDescriptions.forEach(currentDescription => {
				let found = false;
				if (this.descriptions != null) {
					this.descriptions.forEach(description => {
						if (description.languageId === currentDescription.languageId) {
							found = true;
							if (description.description !== currentDescription.description) {
								const updateArgs: TaxCategoryDescriptionsService.UpdateTaxCategoryDescriptionByIdParams = {
									languageId: currentDescription.languageId,
									taxCategoryId: currentDescription.taxCategoryId,
									TaxCategoryDescription: { }
								};
								if (description.description !== currentDescription.description) {
									updateArgs.TaxCategoryDescription.description = description.description;
								}
								sources.push(description);
								requests.push(this.taxCategoryDescriptionService.updateTaxCategoryDescriptionByIdResponse(updateArgs));
							}
						}
					});
				}
				if (!found) {
					sources.push(null);
					requests.push(this.taxCategoryDescriptionService.deleteTaxCategoryDescriptionByIdResponse({
						taxCategoryId: this.currentTaxCategoryId,
						languageId: currentDescription.languageId
					}));
				}
			});
		}
		if (this.descriptions != null) {
			this.descriptions.forEach(description => {
				let found = false;
				if (this.currentDescriptions != null) {
					this.currentDescriptions.forEach(currentDescription => {
						if (description.languageId === currentDescription.languageId) {
							found = true;
						}
					});
				}
				if (!found) {
					const createArgs: any = {
						taxCategoryId: this.currentTaxCategoryId,
						languageId: description.languageId
					};
					if (description.description) {
						createArgs.description = description.description;
					}
					sources.push(description);
					requests.push(this.taxCategoryDescriptionService.createTaxCategoryDescriptionResponse(createArgs));
				}
			});
		}
		return { sources, requests };
	}

	private getUpdateCalculationRuleRequests(): { sources: Array<any>, requests: Array<Observable<any>> } {
		const sources = [];
		const requests = [];
		if (this.currentCalculationRules != null) {
			this.currentCalculationRules.forEach(currentCalculationRule => {
				let found = false;
				if (this.taxCodes != null && this.taxRates != null) {
					this.taxCodes.forEach(taxCode => {
						if (taxCode.id === currentCalculationRule.calculationCodeId) {
							for (let i = 0; i < this.taxRates.length; i++) {
								const taxRate = this.taxRates[i];
								if (taxRate.jurisdictionGroupId === currentCalculationRule.jurisdictionGroupId &&
									taxRate.fulfillmentCenterId === currentCalculationRule.fulfillmentCenterId) {
									found = true;
									if (taxRate.rate !== currentCalculationRule.rate) {
										if (currentCalculationRule.calculationRangeDetailId) {
											sources.push(taxRate);
											requests.push(this.calculationRangeDetailsService.updateCalculationRangeDetailByIdResponse({
												id: currentCalculationRule.calculationRangeDetailId,
												CalculationRangeDetail: {
													value: taxRate.rate
												}
											}));
										}
									}
									break;
								}
							}
						}
					});
				}
				if (!found) {
					sources.push(null);
					requests.push(this.calculationRulesService.deleteCalculationRuleByIdResponse(currentCalculationRule.id));
					sources.push(null);
					if (currentCalculationRule.calculationScaleId) {
						requests.push(this.calculationScalesService.deleteCalculationScaleByIdResponse(currentCalculationRule.calculationScaleId));
					}
				}
			});
		}
		if (this.taxCodes != null && this.taxRates != null) {
			this.taxCodes.forEach(taxCode => {
				this.taxRates.forEach(taxRate => {
					let found = false;
					if (this.currentCalculationRules != null) {
						this.currentCalculationRules.forEach(currentCalculationRule => {
							if (taxCode.id === currentCalculationRule.calculationCodeId &&
								taxRate.jurisdictionGroupId === currentCalculationRule.jurisdictionGroupId &&
								taxRate.fulfillmentCenterId === currentCalculationRule.fulfillmentCenterId) {
								found = true;
							}
						});
					}
					if (!found) {
						sources.push(taxRate);
						requests.push(this.calculationRulesService.createCalculationRuleResponse({
							combination: 2,
							sequence: 0,
							flags: 1,
							taxCategoryId: this.currentTaxCategoryId,
							calculationCodeId: taxCode.id,
							calculationMethodId: this.taxCategoryData.taxTypeId === -3 ? -47 : -67,
							calculationRuleQualifyMethodId: this.taxCategoryData.taxTypeId === -3 ? -46 : -66
						}));
						sources.push(taxRate);
						requests.push(this.calculationScalesService.createCalculationScaleResponse({
							storeId: this.taxCategoryData.storeId,
							calculationUsageId: this.taxCategoryData.taxTypeId,
							scaleLookupMethod: this.taxCategoryData.taxTypeId === -3 ? -53 : -73
						}));
					}
				});
			});
		}
		return { sources, requests };
	}
}
