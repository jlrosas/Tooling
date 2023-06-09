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
export class TaxJurisdictionMainService {
	taxJurisdictionData: any = null;
	processing = false;
	currentTaxJurisdictionId: any = null;

	private currentTaxJurisdiction: any = null;
	private currentTaxJurisdictionGroup: any = null;

	constructor(
		private jurisdictionsService: JurisdictionsService,
		private jurisdictionGroupsService: JurisdictionGroupsService,
		private jurisdictionGroupRelationshipsService: JurisdictionGroupRelationshipsService) { }

	clearData() {
		this.taxJurisdictionData = null;
		this.currentTaxJurisdictionId = null;
		this.currentTaxJurisdiction = null;
		this.currentTaxJurisdictionGroup = null;
	}

	createTaxJurisdiction(): Observable<string> {
		this.processing = true;
		return new Observable<undefined>((observer: Observer<string>) => {
			const data = this.taxJurisdictionData;
			const createJurisdictionArgs: any = {
				subclass: 2,
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
				createJurisdictionArgs.state = this.taxJurisdictionData.state;
			}
			if (data.stateAbbreviation) {
				createJurisdictionArgs.stateAbbreviation = data.stateAbbreviation;
			}
			const createJurisdictionGroupArgs: any = {
				subclass: 2,
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
					jurisdictionGroupId,
					jurisdictionId,
					subclass: 2
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

	updateTaxJurisdiction(): Observable<void> {
		this.processing = true;
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentTaxJurisdictionId != null && this.currentTaxJurisdiction != null) {
				const data = this.taxJurisdictionData;
				const updateJurisdictionArgs: JurisdictionsService.UpdateJurisdictionByIdParams = {
					id: this.currentTaxJurisdictionId,
					Jurisdiction: {}
				};
				if (data.code !== this.currentTaxJurisdiction.code) {
					updateJurisdictionArgs.Jurisdiction.code = data.code;
				}
				if (data.country !== this.currentTaxJurisdiction.country) {
					updateJurisdictionArgs.Jurisdiction.country = data.country;
				}
				if (data.countryAbbreviation !== this.currentTaxJurisdiction.countryAbbreviation) {
					updateJurisdictionArgs.Jurisdiction.countryAbbreviation = data.countryAbbreviation;
				}
				if (data.state !== this.currentTaxJurisdiction.state) {
					updateJurisdictionArgs.Jurisdiction.state = data.state;
				}
				if (data.stateAbbreviation !== this.currentTaxJurisdiction.stateAbbreviation) {
					updateJurisdictionArgs.Jurisdiction.stateAbbreviation = data.stateAbbreviation;
				}
				const requests = [this.jurisdictionsService.updateJurisdictionByIdResponse(updateJurisdictionArgs)];
				if (this.currentTaxJurisdictionGroup) {
					const updateJurisdictionGroupArgs: JurisdictionGroupsService.UpdateJurisdictionGroupByIdParams = {
						id: this.currentTaxJurisdictionGroup.id,
						JurisdictionGroup: {}
					};
					if (data.code !== this.currentTaxJurisdictionGroup.code) {
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
						subclass: 2,
						storeId: data.storeId,
						code: data.code
					};
					requests.push(this.jurisdictionGroupsService.createJurisdictionGroupResponse(createJurisdictionGroupArgs));
					forkJoin(requests).subscribe(responseList => {
						const jurisdictionGroupPaths: Array<string> = responseList[1].headers.get("location").split("/");
						const jurisdictionGroupId: number = Number(jurisdictionGroupPaths[jurisdictionGroupPaths.length - 1]);
						this.jurisdictionGroupRelationshipsService.createJurisdictionGroupRelationship({
							jurisdictionGroupId,
							jurisdictionId: this.currentTaxJurisdictionId,
							subclass: 2
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

	loadCurrentTaxJurisdiction(id: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentTaxJurisdiction != null && this.currentTaxJurisdiction.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentTaxJurisdictionId) {
					this.clearData();
					this.currentTaxJurisdictionId = id;
				}
				const requests = [
					this.jurisdictionsService.getJurisdictionById({id}),
					this.jurisdictionGroupRelationshipsService.getJurisdictionGroupRelationships({jurisdictionId: id})
				];
				forkJoin(requests).subscribe(responseList => {
					const jurisdiction: any = responseList[0];
					this.currentTaxJurisdiction = jurisdiction;
					this.taxJurisdictionData = {
						id: jurisdiction.id,
						storeId: jurisdiction.storeId,
						code: jurisdiction.code,
						country: jurisdiction.country,
						countryAbbreviation: jurisdiction.countryAbbreviation,
						state: jurisdiction.state,
						stateAbbreviation: jurisdiction.stateAbbreviation
					};
					const relationships: any = responseList[1];
					if (relationships.items.length > 0) {
						const jurisdictionGroupId = relationships.items[0].jurisdictionGroupId;
						this.jurisdictionGroupsService.getJurisdictionGroupById({id: jurisdictionGroupId}).subscribe(body => {
							this.currentTaxJurisdictionGroup = body;
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
