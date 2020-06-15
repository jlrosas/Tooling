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
import { Observable, Observer, Subject, Subscription } from "rxjs";
import { OrganizationsService } from "../rest/services/organizations.service";

@Injectable()
export class OrganizationNameService {
	private organizationNames: { [key: string]: string } = {};
	private organizationNameSet: { [key: string]: Subject<string> } = {};
	private getOrganizationSubscriptions: { [key: string]: Subscription } = {};

	constructor(private organizationsService: OrganizationsService) { }

	getOrganizationName(organizationId: string): Observable<string> {
		return new Observable((observer: Observer<string>) => {
			if (this.organizationNames[organizationId] != null) {
				observer.next(this.organizationNames[organizationId]);
				observer.complete();
			} else {
				this.loadOrganizationName(organizationId);
				const organizationNameSetSubscription = this.organizationNameSet[organizationId].subscribe(organizationName => {
					observer.next(organizationName);
					observer.complete();
					organizationNameSetSubscription.unsubscribe();
				});
			}
		});
	}

	private loadOrganizationName(organizationId: string): void {
		if (!this.getOrganizationSubscriptions[organizationId]) {
			if (!this.organizationNameSet[organizationId]) {
				this.organizationNameSet[organizationId] = new Subject();
			}
			this.getOrganizationSubscriptions[organizationId] = this.organizationsService.
					OrganizationsFindByOrganizationId(organizationId).subscribe(
				organization => {
					this.organizationNames[organizationId] = organization.organizationName;
					this.getOrganizationSubscriptions[organizationId] = null;
					delete this.getOrganizationSubscriptions[organizationId];
					this.organizationNameSet[organizationId].next(organization.organizationName);
					this.organizationNameSet[organizationId] = null;
					delete this.organizationNameSet[organizationId];
				}
			);
		}
	}
}
