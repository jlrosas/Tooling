/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, Input, OnChanges } from "@angular/core";
import { Subscription } from "rxjs";
import { LanguageService } from "../../../../services/language.service";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { CountriesService } from "../../../../rest/services/countries.service";
import { StatesService } from "../../../../rest/services/states.service";
import { UsersService } from "../../../../rest/services/users.service";

@Component({
	templateUrl: "./organization-approval-summary.component.html",
	styleUrls: ["./organization-approval-summary.component.scss"],
	selector: "hc-organization-approval-summary"
})
export class OrganizationApprovalSummaryComponent implements OnInit, OnDestroy, OnChanges {
	@Input() organizationId: any;

	organizationName: string;
	organizationAddress1: string;
	organizationAddress2: string;
	organizationCity: string;
	organizationZipCode: string;
	organizationCountryCode: string;
	organizationCountry: string;
	organizationStateCode: string;
	organizationState: string;
	organizationParent: string;
	userId: string;

	private onLanguageChangeSubscription: Subscription = null;

	constructor(private languageService: LanguageService,
			private organizationsService: OrganizationsService,
			private countriesService: CountriesService,
			private statesService: StatesService,
			private usersService: UsersService) { }

	ngOnInit() {
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.loadTranslatables();
		});
	}

	ngOnChanges(changes) {
		if (changes.organizationId.currentValue !== "" && changes.organizationId.currentValue !== undefined) {
			this.organizationsService.OrganizationsFindByOrganizationId(this.organizationId).subscribe(
				organization => {
					this.organizationName = organization.organizationName;
					this.organizationParent = organization.parentOrganizationName;
					if (organization.address) {
						this.organizationAddress1 = organization.address.address1;
						this.organizationAddress2 = organization.address.address2;
						this.organizationCity = organization.address.city;
						this.organizationStateCode = organization.address.state;
						this.organizationCountryCode = organization.address.country;
						this.organizationZipCode = organization.address.zipCode;
						this.loadOrganizationCountryName();
						this.loadOrganizationStateName();
					}
					this.usersService.UsersGetManageableUsers({
						parentOrganizationId: organization.id,
						limit: 1
					}).subscribe(
						response => {
							if (response.items.length > 0 && response.count === 1) {
								this.userId = response.items[0].id;
							}
						},
						error => {
							console.log(error);
						}
					);
				},
				error => {
					console.log(error);
				}
			);
		}
	}

	ngOnDestroy() {
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	private loadTranslatables() {
		this.loadOrganizationCountryName();
		this.loadOrganizationStateName();
	}

	private loadOrganizationCountryName() {
		if (this.organizationCountryCode) {
			this.countriesService.getCountries({
				languageId: LanguageService.languageId,
				countryAbbr: this.organizationCountryCode
			}).subscribe(
				response => {
					for (let i = 0; i < response.items.length; i++) {
						const country = response.items[i];
						this.organizationCountry = country.name;
					}
				},
				error => {
					console.log(error);
				}
			);
		}
	}

	private loadOrganizationStateName() {
		if (this.organizationCountryCode && this.organizationStateCode) {
			this.statesService.getStates({
				languageId: LanguageService.languageId,
				countryAbbr: this.organizationCountryCode,
				stateAbbr: this.organizationStateCode
			}).subscribe(
				response => {
					for (let i = 0; i < response.items.length; i++) {
						const state = response.items[i];
						this.organizationState = state.name;
					}
				},
				error => {
					console.log(error);
				}
			);
		}
	}
}
