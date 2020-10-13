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
import { ShippingModesService } from "../../../rest/services/shipping-modes.service";
import { ShippingModeDescriptionsService } from "../../../rest/services/shipping-mode-descriptions.service";

@Injectable({
	providedIn: "root"
})
export class ShippingModeMainService {
	shippingModeData: any = null;
	shippingModeDescriptions: Array<any> = null;
	currentShippingModeId: any = null;
	processing = false;

	private currentShippingMode: any = null;
	private currentShippingModeDescriptions: Array<any> = null;

	constructor(
			private shippingModesService: ShippingModesService,
			private shippingModeDescriptionService: ShippingModeDescriptionsService) { }

	clearData() {
		this.shippingModeData = null;
		this.shippingModeDescriptions = null;
		this.currentShippingModeId = null;
		this.currentShippingMode = null;
		this.currentShippingModeDescriptions = null;
	}

	createShippingMode(): Observable<string> {
		this.processing = true;
		return new Observable<string>((observer: Observer<string>) => {
			const args: any = {
				storeId: this.shippingModeData.storeId,
				carrier: this.shippingModeData.carrier,
				shippingCode: this.shippingModeData.service
			};
			if (this.shippingModeData.trackingURL) {
				args.trackingURL = this.shippingModeData.trackingURL;
			}
			this.shippingModesService.createShippingModeResponse(args).subscribe(response => {
				const paths: Array<string> = response.headers.get("location").split("/");
				this.currentShippingModeId = paths[paths.length - 1];

				const requests = this.getCreateShippingModeDescriptionRequests();
				if (requests.length === 0) {
					observer.next(args.shippingCode);
					observer.complete();
					this.processing = false;
				} else {
					forkJoin(requests).subscribe(responseList => {
						observer.next(args.shippingCode);
						observer.complete();
						this.processing = false;
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

	loadCurrentShippingMode(id: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentShippingMode != null && this.currentShippingModeId === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentShippingModeId) {
					this.clearData();
					this.currentShippingModeId = id;
				}
				const args: ShippingModesService.GetShippingModeByIdParams = {
					id
				};
				this.shippingModesService.getShippingModeById(args).subscribe(
					(item: any) => {
						this.currentShippingMode = item;
						this.shippingModeData = {
							id: item.id,
							carrier: item.carrier,
							service: item.shippingCode,
							trackingURL: item.trackingURL
						};
						observer.next(undefined);
						observer.complete();
					},
					error => {
						observer.error(error);
						observer.complete();
					}
				);
			}
		});
	}

	loadCurrentShippingModeDescriptions(id: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentShippingModeId === id && this.shippingModeDescriptions != null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentShippingModeId) {
					this.clearData();
					this.currentShippingModeId = id;
				}
				const args: ShippingModeDescriptionsService.GetShippingModeDescriptionsParams = {
					shippingModeId: [id]
				};
				this.shippingModeDescriptionService.getShippingModeDescriptions(args).subscribe((body: any) => {
					this.currentShippingModeDescriptions = body.items;
					this.shippingModeDescriptions = [];
					body.items.forEach(element => {
						const description = {
							shippingModeId: element.shippingModeId,
							languageId: element.languageId,
							description: element.description,
							field1: element.field1,
							field2: element.field2
						};
						this.shippingModeDescriptions.push(description);
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

	updateShippingMode(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			const updateShippingModeRequest = this.getUpdateShippingModeRequest();
			const requests = (updateShippingModeRequest === null ? [] : [updateShippingModeRequest])
					.concat(this.getUpdateShippingModeDescriptionRequests());
			if (requests.length === 0) {
				observer.next(undefined);
				observer.complete();
				this.processing = false;
			} else {
				forkJoin(requests).subscribe(responseList => {
					observer.next(responseList);
					observer.complete();
					this.processing = false;
				},
				error => {
					observer.error(error);
					this.processing = false;
				});
			}
		});
	}

	private getCreateShippingModeDescriptionRequests(): Array<Observable<any>> {
		const requests = [];
		const shippingModeDescriptions = this.shippingModeDescriptions;
		this.shippingModeDescriptions = null;
		if (shippingModeDescriptions != null) {
			shippingModeDescriptions.forEach(shippingModeDescription => {
				const args: any = {
					shippingModeId: this.currentShippingModeId,
					languageId: shippingModeDescription.languageId
				};
				if (shippingModeDescription.description) {
					args.description = shippingModeDescription.description;
				}
				if (shippingModeDescription.field1) {
					args.field1 = shippingModeDescription.field1;
				}
				if (shippingModeDescription.field2) {
					args.field2 = shippingModeDescription.field2;
				}
				requests.push(this.shippingModeDescriptionService.createShippingModeDescriptionResponse(args));
			});
		}
		return requests;
	}

	private getUpdateShippingModeRequest():  Observable<any> {
		let request: Observable<any> = null;
		if (this.currentShippingModeId != null && this.currentShippingMode != null &&
				this.currentShippingMode.trackingURL !== this.shippingModeData.trackingURL) {
			const args: ShippingModesService.UpdateShippingModeByIdParams = {
				id: this.currentShippingModeId,
				ShippingMode: {
					trackingURL: this.shippingModeData.trackingURL
				}
			};
			request = this.shippingModesService.updateShippingModeByIdResponse(args);
		}
		return request;
	}

	private getUpdateShippingModeDescriptionRequests(): Array<Observable<any>> {
		const requests: Array<Observable<any>> = [];
		if (this.currentShippingModeDescriptions != null) {
			this.currentShippingModeDescriptions.forEach(currentShippingModeDescription => {
				let found = false;
				if (this.shippingModeDescriptions != null) {
					this.shippingModeDescriptions.forEach(shippingModeDescription => {
						if (shippingModeDescription.languageId === currentShippingModeDescription.languageId) {
							found = true;
							if (shippingModeDescription.description !== currentShippingModeDescription.description ||
								shippingModeDescription.field1 !== currentShippingModeDescription.field1 ||
								shippingModeDescription.field2 !== currentShippingModeDescription.field2) {
								const updateArgs: ShippingModeDescriptionsService.UpdateShippingModeDescriptionByIdParams = {
									languageId: currentShippingModeDescription.languageId,
									shippingModeId: currentShippingModeDescription.shippingModeId,
									ShippingModeDescription: { }
								};
								if (shippingModeDescription.description !== currentShippingModeDescription.description) {
									updateArgs.ShippingModeDescription.description = shippingModeDescription.description;
								}
								if (shippingModeDescription.field1 !== currentShippingModeDescription.field1) {
									updateArgs.ShippingModeDescription.field1 = shippingModeDescription.field1;
								}
								if (shippingModeDescription.field2 !== currentShippingModeDescription.field2) {
									updateArgs.ShippingModeDescription.field2 = shippingModeDescription.field2;
								}
								requests.push(this.shippingModeDescriptionService.updateShippingModeDescriptionByIdResponse(updateArgs));
							}
						}
					});
				}
				if (!found) {
					requests.push(this.shippingModeDescriptionService.deleteShippingModeDescriptionByIdResponse({
						shippingModeId: this.currentShippingModeId,
						languageId: currentShippingModeDescription.languageId
					}));
				}
			});
		}
		if (this.shippingModeDescriptions != null) {
			this.shippingModeDescriptions.forEach(shippingModeDescription => {
				let found = false;
				if (this.currentShippingModeDescriptions != null) {
					this.currentShippingModeDescriptions.forEach(currentShippingModeDescription => {
						if (shippingModeDescription.languageId === currentShippingModeDescription.languageId) {
							found = true;
						}
					});
				}
				if (!found) {
					const createArgs: any = {
						shippingModeId: this.currentShippingModeId,
						languageId: shippingModeDescription.languageId
					};
					if (shippingModeDescription.description) {
						createArgs.description = shippingModeDescription.description;
					}
					if (shippingModeDescription.field1) {
						createArgs.field1 = shippingModeDescription.field1;
					}
					if (shippingModeDescription.field2) {
						createArgs.field2 = shippingModeDescription.field2;
					}
					requests.push(this.shippingModeDescriptionService.createShippingModeDescriptionResponse(createArgs));
				}
			});
		}
		return requests;
	}
}
