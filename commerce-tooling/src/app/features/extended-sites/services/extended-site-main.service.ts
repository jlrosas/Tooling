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
import { ExtendedSitesService } from "../../../rest/services/extended-sites.service";

@Injectable({
	providedIn: "root"
})
export class ExtendedSiteMainService {
	extendedSiteData: any = null;
	processing = false;

	constructor(private extendedSitesService: ExtendedSitesService) { }

	clearData() {
		this.extendedSiteData = null;
		this.processing = false;
	}

	createExtendedSite(storeId): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			const body = this.buildCreateExtendedSiteBody(storeId);
			this.extendedSitesService.createExtendedSiteResponse(body).subscribe(
				response => {
					const paths: Array<string> = response.headers.get("location").split("/");
					const id: string = paths[paths.length - 1];
					observer.next(undefined);
					observer.complete();
					this.processing = false;
				},
				error => {
					observer.error(error);
					observer.complete();
					this.processing = false;
				}
			);
		});
	}

	private buildCreateExtendedSiteBody(storeId): any {
		const extendedSite = this.extendedSiteData;
		const newExtendedSite: any = {
			hubStoreId: storeId
		};
		if (extendedSite.identifier) {
			newExtendedSite.identifier = extendedSite.identifier;
		}
		if (extendedSite.name) {
			newExtendedSite.name = extendedSite.name;
		}
		if (extendedSite.description) {
			newExtendedSite.description = extendedSite.description;
		}
		if (extendedSite.defaultCurrency) {
			newExtendedSite.defaultCurrency = extendedSite.defaultCurrency;
		}
		if (extendedSite.defaultLanguageId) {
			newExtendedSite.defaultLanguageId = extendedSite.defaultLanguageId;
		}
		if (extendedSite.email) {
			newExtendedSite.email = extendedSite.email;
		}
		if (extendedSite.organizationId) {
			newExtendedSite.organizationId = extendedSite.organizationId;
		}
		if (extendedSite.sharedOwnerOrganizationId) {
			newExtendedSite.sharedOwnerOrganizationId = extendedSite.sharedOwnerOrganizationId;
		}
		if (extendedSite.catalogAssetStoreId) {
			newExtendedSite.catalogAssetStoreId = extendedSite.catalogAssetStoreId;
		}
		if (extendedSite.storefrontAssetStoreId) {
			newExtendedSite.storefrontAssetStoreId = extendedSite.storefrontAssetStoreId;
		}
		return newExtendedSite;
	}
}
