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
import { HttpResponse } from "@angular/common/http";
import { JurisdictionsService } from "../../../rest/services/jurisdictions.service";
import { JurisdictionGroupsService } from "../../../rest/services/jurisdiction-groups.service";
import { JurisdictionGroupRelationshipsService } from "../../../rest/services/jurisdiction-group-relationships.service";

@Injectable({
	providedIn: "root"
})
export class ShippingJurisdictionMainService {
	shippingJurisdictionData: any = null;
	processing = false;
	currentShippingJurisdictionId: any = null;

	private currentShippingJurisdiction: any = null;
	private currentShippingJurisdictionGroup: any = null;

	constructor(
			private jurisdictionsService: JurisdictionsService,
			private jurisdictionGroupsService: JurisdictionGroupsService,
			private jurisdictionGroupRelationshipsService: JurisdictionGroupRelationshipsService) { }

	clearData() {
		this.shippingJurisdictionData = null;
		this.currentShippingJurisdiction = null;
		this.currentShippingJurisdictionId = null;
		this.currentShippingJurisdictionGroup = null;
	}

	createShippingJurisdiction(): Observable<string> {
		this.processing = true;
		return new Observable<string>((observer: Observer<string>) => {
			const data = this.shippingJurisdictionData;
			const createJurisdictionArgs: any = {
				subclass: 1,
				storeId: data.storeId,
				code: data.code
			};
			if (data.country) {
				createJurisdictionArgs.country = data.country;
			}
			if (data.countryAbbreviation) {
				createJurisdictionArgs.countryAbbreviation = data.countryAbbreviation;
			}
			if (data.state) {
				createJurisdictionArgs.state = this.shippingJurisdictionData.state;
			}
			if (data.stateAbbreviation) {
				createJurisdictionArgs.stateAbbreviation = data.stateAbbreviation;
			}
			if (data.city) {
				createJurisdictionArgs.city = data.city;
			}
			if (data.zipcodeStart) {
				createJurisdictionArgs.zipcodeStart = data.zipcodeStart;
			}
			if (data.zipcodeEnd) {
				createJurisdictionArgs.zipcodeEnd = data.zipcodeEnd;
			}
			const createJurisdictionGroupArgs: any = {
				subclass: 1,
				storeId: data.storeId,
				code: data.code
			};
			const requests = [
				this.jurisdictionsService.createJurisdictionResponse(createJurisdictionArgs),
				this.jurisdictionGroupsService.createJurisdictionGroupResponse(createJurisdictionGroupArgs)
			];
			forkJoin(requests).subscribe(responseList => {
				const jurisdictionPaths: Array<string> = responseList[0].headers.get("location").split("/");
				const jurisdictionId: number = Number(jurisdictionPaths[jurisdictionPaths.length - 1]);
				const jurisdictionGroupPaths: Array<string> = responseList[1].headers.get("location").split("/");
				const jurisdictionGroupId: number = Number(jurisdictionGroupPaths[jurisdictionGroupPaths.length - 1]);
				this.jurisdictionGroupRelationshipsService.createJurisdictionGroupRelationship({
					jurisdictionGroupId: jurisdictionGroupId,
					jurisdictionId: jurisdictionId,
					subclass: 1
				}).subscribe(relationshipResponse => {
					observer.next(data.code);
					observer.complete();
					this.processing = false;
				},
				error => {
					observer.error(error);
					observer.complete();
					this.processing = false;
				});
			},
			error => {
				observer.error(error);
				observer.complete();
				this.processing = false;
			});
		});
	}

	updateShippingJurisdiction(): Observable<void> {
		this.processing = true;
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentShippingJurisdictionId != null && this.currentShippingJurisdiction != null) {
				const data = this.shippingJurisdictionData;
				const updateJurisdictionArgs: JurisdictionsService.UpdateJurisdictionByIdParams = {
					id: this.currentShippingJurisdictionId,
					Jurisdiction: {}
				};
				if (data.code !== this.currentShippingJurisdiction.code) {
					updateJurisdictionArgs.Jurisdiction.code = data.code;
				}
				if (data.country !== this.currentShippingJurisdiction.country) {
					updateJurisdictionArgs.Jurisdiction.country = data.country;
				}
				if (data.countryAbbreviation !== this.currentShippingJurisdiction.countryAbbreviation) {
					updateJurisdictionArgs.Jurisdiction.countryAbbreviation = data.countryAbbreviation;
				}
				if (data.state !== this.currentShippingJurisdiction.state) {
					updateJurisdictionArgs.Jurisdiction.state = data.state;
				}
				if (data.stateAbbreviation !== this.currentShippingJurisdiction.stateAbbreviation) {
					updateJurisdictionArgs.Jurisdiction.stateAbbreviation = data.stateAbbreviation;
				}
				if (data.city !== this.currentShippingJurisdiction.city) {
					updateJurisdictionArgs.Jurisdiction.city = data.city;
				}
				if (data.zipcodeStart !== this.currentShippingJurisdiction.zipcodeStart) {
					updateJurisdictionArgs.Jurisdiction.zipcodeStart = data.zipcodeStart;
				}
				if (data.zipcodeEnd !== this.currentShippingJurisdiction.zipcodeEnd) {
					updateJurisdictionArgs.Jurisdiction.zipcodeEnd = data.zipcodeEnd;
				}
				const requests = [this.jurisdictionsService.updateJurisdictionByIdResponse(updateJurisdictionArgs)];
				if (this.currentShippingJurisdictionGroup) {
					const updateJurisdictionGroupArgs: JurisdictionGroupsService.UpdateJurisdictionGroupByIdParams = {
						id: this.currentShippingJurisdictionGroup.id,
						JurisdictionGroup: {}
					};
					if (data.code !== this.currentShippingJurisdictionGroup.code) {
						updateJurisdictionGroupArgs.JurisdictionGroup.code = data.code;
					}
					requests.push(this.jurisdictionGroupsService.updateJurisdictionGroupByIdResponse(updateJurisdictionGroupArgs));
					forkJoin(requests).subscribe(responseList => {
						observer.next(undefined);
						observer.complete();
						this.processing = false;
					},
					error => {
						observer.error(error);
						observer.complete();
						this.processing = false;
					});
				} else {
					const createJurisdictionGroupArgs: any = {
						subclass: 1,
						storeId: data.storeId,
						code: data.code
					};
					requests.push(this.jurisdictionGroupsService.createJurisdictionGroupResponse(createJurisdictionGroupArgs));
					forkJoin(requests).subscribe(responseList => {
						const jurisdictionGroupPaths: Array<string> = responseList[1].headers.get("location").split("/");
						const jurisdictionGroupId: number = Number(jurisdictionGroupPaths[jurisdictionGroupPaths.length - 1]);
						this.jurisdictionGroupRelationshipsService.createJurisdictionGroupRelationship({
							jurisdictionGroupId: jurisdictionGroupId,
							jurisdictionId: this.currentShippingJurisdictionId,
							subclass: 1
						}).subscribe(relationshipResponse => {
							observer.next(undefined);
							observer.complete();
							this.processing = false;
						},
						error => {
							observer.error(error);
							observer.complete();
							this.processing = false;
						});
					},
					error => {
						observer.error(error);
						observer.complete();
						this.processing = false;
					});
				}
			} else {
				observer.next(undefined);
				observer.complete();
				this.processing = false;
			}
		});
	}

	loadCurrentShippingJurisdiction(id: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentShippingJurisdiction != null && this.currentShippingJurisdiction.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentShippingJurisdictionId) {
					this.clearData();
					this.currentShippingJurisdictionId = id;
				}
				const requests = [
					this.jurisdictionsService.getJurisdictionById({id}),
					this.jurisdictionGroupRelationshipsService.getJurisdictionGroupRelationships({jurisdictionId: id})
				];
				forkJoin(requests).subscribe(responseList => {
					const jurisdiction: any = responseList[0];
					this.currentShippingJurisdiction = jurisdiction;
					this.shippingJurisdictionData = {
						id: jurisdiction.id,
						storeId: jurisdiction.storeId,
						code: jurisdiction.code,
						country: jurisdiction.country,
						countryAbbreviation: jurisdiction.countryAbbreviation,
						state: jurisdiction.state,
						stateAbbreviation: jurisdiction.stateAbbreviation,
						city: jurisdiction.city,
						zipcodeStart: jurisdiction.zipcodeStart,
						zipcodeEnd: jurisdiction.zipcodeEnd
					};
					const relationships: any = responseList[1];
					if (relationships.items.length > 0) {
						const jurisdictionGroupId = relationships.items[0].jurisdictionGroupId;
						this.jurisdictionGroupsService.getJurisdictionGroupById({id: jurisdictionGroupId}).subscribe(body => {
							this.currentShippingJurisdictionGroup = body;
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
}
