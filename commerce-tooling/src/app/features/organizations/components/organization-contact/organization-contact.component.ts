/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { OrganizationMainService } from "../../services/organization-main.service";
import { CountriesService } from "../../../../rest/services/countries.service";
import { StatesService } from "../../../../rest/services/states.service";
import { LanguageService } from "../../../../services/language.service";
import { AlertService } from "../../../../services/alert.service";
import { MatStep, MatStepper } from "@angular/material";
import { HcValidators } from "../../../../shared/validators";

@Component({
	templateUrl: "./organization-contact.component.html",
	styleUrls: ["./organization-contact.component.scss"],
	selector: "hc-organization-contact"
})
export class OrganizationContactComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	contactForm: any;
	administratorFirstName: FormControl;
	administratorLastName: FormControl;
	email1: FormControl;
	address1: FormControl;
	address2: FormControl;
	city: FormControl;
	state: FormControl;
	country: FormControl;
	zipCode: FormControl;

	stateIsOptional = false;
	filteredCountryList: Array<any> = [];
	filteredStateList: Array<any> = [];

	@ViewChild("firstNameInput", {static: false}) firstNameInput: ElementRef<HTMLInputElement>;

	private countryList: Array<any> = [];
	private stateList: Array<any> = [];
	private onLanguageChangeSubscription: Subscription = null;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private organizationMainService: OrganizationMainService,
			private countriesService: CountriesService,
			private statesService: StatesService,
			private languageService: LanguageService,
			private translateService: TranslateService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.organizationMainService.loadCurrentOrganization(this.route.snapshot.params.id).subscribe(
				response => {
					this.setValues();
				}
			);
		} else {
			if (this.organizationMainService.organizationData != null) {
				const organizationData = this.organizationMainService.organizationData;
				this.administratorFirstName.setValue(organizationData.administratorFirstName ? organizationData.administratorFirstName : "");
				this.administratorLastName.setValue(organizationData.administratorLastName ? organizationData.administratorLastName : "");
				this.email1.setValue(organizationData.address.email1 ? organizationData.address.email1 : "");
				this.address1.setValue(organizationData.address.address1 ? organizationData.address.address1 : "");
				this.address2.setValue(organizationData.address.address2 ? organizationData.address.address2 : "");
				this.city.setValue(organizationData.address.city ? organizationData.address.city : "");
				this.zipCode.setValue(organizationData.address.zipCode ? organizationData.address.zipCode : "");
			} else {
				this.organizationMainService.organizationData = {
					"address": {}
				};
			}
		}
		this.initCountryList();
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.initCountryList();
		});
	}

	ngAfterViewInit() {
		this.step.stepControl = this.contactForm;
		setTimeout(() => {
			this.firstNameInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	next() {
		this.contactForm.markAllAsTouched();
		if (this.contactForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("ORGANIZATIONS.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message, clear: true});
			});
		}
	}

	triggerSave() {
		this.save.emit(null);
	}

	validateAdministratorFirstName() {
		this.organizationMainService.organizationData.administratorFirstName = this.administratorFirstName.value;
	}

	validateAdministratorLastName() {
		this.organizationMainService.organizationData.administratorLastName = this.administratorLastName.value;
	}

	validateEmail() {
		this.organizationMainService.organizationData.address.email1 = this.email1.value;
	}

	validateAddress1() {
		this.organizationMainService.organizationData.address.address1 = this.address1.value;
	}

	validateAddress2() {
		this.organizationMainService.organizationData.address.address2 = this.address2.value;
	}

	validateCity() {
		this.organizationMainService.organizationData.address.city = this.city.value;
	}

	validateZipCode() {
		this.organizationMainService.organizationData.address.zipCode = this.zipCode.value;
	}

	validateCountry() {
		this.organizationMainService.organizationData.address.country = null;
		if (this.country.value !== "") {
			const searchText = this.country.value.toLowerCase();
			this.filteredCountryList = this.countryList.filter(element => {
				return element.name.toLowerCase().includes(searchText);
			});
			if (this.filteredCountryList.length === 1) {
				const country = this.filteredCountryList[0];
				if (country.name === this.country.value) {
					this.selectCountry(country);
				}
			}
		}
	}

	selectCountry(country: any) {
		const countryCode = country != null ? country.countryAbbr : null;
		this.organizationMainService.organizationData.address.country = countryCode;
		this.country.setValue(country ? country.name : "");
		this.state.setValue("");
		this.initStateList();
	}

	validateState() {
		if (this.stateList.length > 0) {
			this.organizationMainService.organizationData.address.state = null;
			if (this.state.value !== "") {
				const searchText = this.state.value.toLowerCase();
				this.filteredStateList = this.stateList.filter(element => {
					return element.name.toLowerCase().includes(searchText);
				});
				if (this.filteredStateList.length === 1) {
					const state = this.filteredStateList[0];
					if (state.name === this.state.value) {
						this.selectState(state);
					}
				}
			}
		} else {
			this.organizationMainService.organizationData.address.state = this.state.value;
		}
	}

	selectState(state: any) {
		const stateCode = state != null ? state.stateAbbr : null;
		this.organizationMainService.organizationData.address.state = stateCode;
		this.state.setValue(state ? state.name : "");
	}

	private setValues() {
		const organizationData = this.organizationMainService.organizationData;
		this.administratorFirstName.setValue(organizationData.administratorFirstName ? organizationData.administratorFirstName : "");
		this.administratorLastName.setValue(organizationData.administratorLastName ? organizationData.administratorLastName : "");
		this.email1.setValue(organizationData.address.email1);
		this.address1.setValue(organizationData.address.address1 ? organizationData.address.address1 : "");
		this.address2.setValue(organizationData.address.address2 ? organizationData.address.address2 : "");
		this.city.setValue(organizationData.address.city ? organizationData.address.city : "");
		this.zipCode.setValue(organizationData.address.zipCode ? organizationData.address.zipCode : "");
		this.initCountryList();
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.initCountryList();
		});
	}

	private createFormControls() {
		this.administratorFirstName = new FormControl("", HcValidators.required);
		this.administratorLastName = new FormControl("", HcValidators.required);
		this.email1 = new FormControl("", [
			Validators.required,
			Validators.email
		]);
		this.address1 = new FormControl("", HcValidators.required);
		this.address2 = new FormControl("");
		this.city = new FormControl("", HcValidators.required);
		this.country = new FormControl("", [
			Validators.required,
			country => {
				let errors = null;
				const value = country.value;
				if (value !== "" && this.countryList.length > 0) {
					let found = false;
					for (let i = 0; i < this.countryList.length; i++) {
						const countryOption = this.countryList[i];
						if (countryOption.name === value) {
							found = true;
							break;
						}
					}
					if (!found) {
						errors = {
							invalidCountry: true
						};
					}
				}
				return errors;
			}
		]);
		this.state = new FormControl("", [
			state => {
				const value = state.value;
				let errors = null;
				if (value === "" && !this.stateIsOptional) {
					errors = {
						required: true
					};
				}
				return errors;
			},
			state => {
				let errors = null;
				const value = state.value;
				if (value !== "" && this.stateList.length > 0) {
					let found = false;
					for (let i = 0; i < this.stateList.length; i++) {
						const stateOption = this.stateList[i];
						if (stateOption.name === value) {
							found = true;
							break;
						}
					}
					if (!found) {
						errors = {
							invalidState: true
						};
					}
				}
				return errors;
			}
		]);
		this.zipCode = new FormControl("", HcValidators.required);
	}

	private createForm() {
		this.contactForm = new FormGroup({
			administratorFirstName: this.administratorFirstName,
			administratorLastName: this.administratorLastName,
			email1: this.email1,
			address1: this.address1,
			address2: this.address2,
			city: this.city,
			country: this.country,
			state: this.state,
			zipCode: this.zipCode
		});
	}

	private initCountryList() {
		this.countriesService.getCountries({
			languageId: LanguageService.languageId,
			sort: "name"
		}).subscribe(response => {
			this.countryList = response.items ? response.items.sort((a, b) => a.name.localeCompare(b.name)) : [];
			const countryCode = this.organizationMainService.organizationData.address.country;
			if (countryCode) {
				for (let i = 0; i < this.countryList.length; i++) {
					const country = this.countryList[i];
					if (country.countryAbbr === countryCode || country.name === countryCode) {
						this.selectCountry(country);
						break;
					}
					if (country.name === this.country.value) {
						this.selectCountry(country);
						break;
					}
				}
			}
		});
	}

	private initStateList() {
		const countryCode = this.organizationMainService.organizationData.address.country;
		this.stateList = [];
		this.filteredStateList = [];
		if (countryCode != null && countryCode !== "") {
			this.statesService.getStates({
				countryAbbr: countryCode,
				languageId: LanguageService.languageId
			}).subscribe(response => {
				this.stateList = response.items;
				if (this.stateList.length === 0) {
					this.stateIsOptional = true;
					this.state.setValue(this.organizationMainService.organizationData.address.state ?
							this.organizationMainService.organizationData.address.state : "");
				} else {
					this.stateIsOptional = false;
					const stateCode = this.organizationMainService.organizationData.address.state;
					if (stateCode) {
						for (let i = 0; i < this.stateList.length; i++) {
							const state = this.stateList[i];
							if (state.stateAbbr === stateCode || state.name === stateCode) {
								this.selectState(state);
								break;
							}
							if (state.name === this.state.value) {
								this.selectState(state);
								break;
							}
						}
					}
				}
			});
		}
	}
}
