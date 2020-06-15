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
import { TranslateService } from "@ngx-translate/core";
import { UserMainService } from "../../services/user-main.service";
import { CountriesService } from "../../../../rest/services/countries.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { StatesService } from "../../../../rest/services/states.service";
import { LanguageService } from "../../../../services/language.service";
import { AlertService } from "../../../../services/alert.service";
import { HcValidators } from "../../../../shared/validators";
import { MatStep, MatStepper } from "@angular/material";

@Component({
	templateUrl: "./user-contact.component.html",
	styleUrls: ["./user-contact.component.scss"],
	selector: "hc-user-contact"
})
export class UserContactComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	contactForm: any;
	personTitle: FormControl;
	firstName: FormControl;
	lastName: FormControl;
	address1: FormControl;
	address2: FormControl;
	city: FormControl;
	state: FormControl;
	country: FormControl;
	zipCode: FormControl;

	stateIsOptional = false;
	filteredCountryList: Array<any> = [];
	filteredStateList: Array<any> = [];

	@ViewChild("titleInput", {static: false}) titleInput: ElementRef<HTMLInputElement>;

	private countryList: Array<any> = [];
	private stateList: Array<any> = [];
	private onLanguageChangeSubscription: Subscription = null;

	constructor(private router: Router,
		private route: ActivatedRoute,
		private userMainService: UserMainService,
		private countriesService: CountriesService,
		private statesService: StatesService,
		private languageService: LanguageService,
		private alertService: AlertService,
		private translateService: TranslateService ) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.userMainService.loadCurrentUser(this.route.snapshot.params.id).subscribe(
				response => {
					this.setValues();
				}
			);
		} else {
			if (this.userMainService.userData != null) {
				const userData = this.userMainService.userData;
				this.personTitle.setValue(userData.address.personTitle ? userData.address.personTitle : "");
				this.firstName.setValue(userData.address.firstName ? userData.address.firstName : "");
				this.lastName.setValue(userData.address.lastName ? userData.address.lastName : "");
				this.address1.setValue(userData.address.address1 ? userData.address.address1 : "");
				this.address2.setValue(userData.address.address2 ? userData.address.address2 : "");
				this.city.setValue(userData.address.city ? userData.address.city : "");
				this.zipCode.setValue(userData.address.zipCode ? userData.address.zipCode : "");
			} else {
				this.userMainService.userData = {
					"address": {}
				};
			}
			this.initCountryList();
			this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
				this.initCountryList();
			});
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.contactForm;
		setTimeout(() => {
			this.titleInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	next() {
		this.contactForm.markAllAsTouched();
		this.alertService.clear();
		if (this.contactForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("USER_MANAGEMENT.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	triggerSave() {
		this.contactForm.markAllAsTouched();
		this.save.emit(null);
	}

	validatePersonTitle() {
		this.userMainService.userData.address.personTitle = this.personTitle.value;
	}

	validateFirstName() {
		this.userMainService.userData.address.firstName = this.firstName.value;
	}

	validateLastName() {
		this.userMainService.userData.address.lastName = this.lastName.value;
	}

	validateAddress1() {
		this.userMainService.userData.address.address1 = this.address1.value;
	}

	validateAddress2() {
		this.userMainService.userData.address.address2 = this.address2.value;
	}

	validateCity() {
		this.userMainService.userData.address.city = this.city.value;
	}

	validateZipCode() {
		this.userMainService.userData.address.zipCode = this.zipCode.value;
	}

	validateCountry() {
		this.userMainService.userData.address.country = null;
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
		this.userMainService.userData.address.country = countryCode;
		this.country.setValue(country ? country.name : "");
		this.state.setValue("");
		this.initStateList();
	}

	validateState() {
		if (this.stateList.length > 0) {
			this.userMainService.userData.address.state = null;
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
			this.userMainService.userData.address.state = this.state.value;
		}
	}

	selectState(state: any) {
		const stateCode = state != null ? state.stateAbbr : null;
		this.userMainService.userData.address.state = stateCode;
		this.state.setValue(state ? state.name : "");
	}

	private createFormControls() {
		this.personTitle = new FormControl("");
		this.firstName = new FormControl("");
		this.lastName = new FormControl("", HcValidators.required);
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
			personTitle: this.personTitle,
			firstName: this.firstName,
			lastName: this.lastName,
			address1: this.address1,
			address2: this.address2,
			city: this.city,
			country: this.country,
			state: this.state,
			zipCode: this.zipCode
		});
	}

	private setValues() {
		const userData = this.userMainService.userData;
		this.personTitle.setValue(userData.address.personTitle ? userData.address.personTitle : "");
		this.firstName.setValue(userData.address.firstName ? userData.address.firstName : "");
		this.lastName.setValue(userData.address.lastName ? userData.address.lastName : "");
		this.address1.setValue(userData.address.address1 ? userData.address.address1 : "");
		this.address2.setValue(userData.address.address2 ? userData.address.address2 : "");
		this.city.setValue(userData.address.city ? userData.address.city : "");
		this.zipCode.setValue(userData.address.zipCode ? userData.address.zipCode : "");
		this.initCountryList();
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.initCountryList();
		});
	}

	private initCountryList() {
		this.countriesService.getCountries({
			languageId: LanguageService.languageId
		}).subscribe(
			response => {
				this.countryList = response.items;
				const countryCode = this.userMainService.userData.address.country;
				if (countryCode) {
					for (let i = 0; i < this.countryList.length; i++) {
						const country = this.countryList[i];
						if (country.countryAbbr === countryCode) {
							this.selectCountry(country);
							break;
						} else if (country.name === this.country.value) {
							this.selectCountry(country);
							break;
						}
					}
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	private initStateList() {
		const countryCode = this.userMainService.userData.address.country;
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
					this.state.setValue(this.userMainService.userData.address.state ? this.userMainService.userData.address.state : "");
				} else {
					this.stateIsOptional = false;
					const stateCode = this.userMainService.userData.address.state;
					if (stateCode) {
						for (let i = 0; i < this.stateList.length; i++) {
							const state = this.stateList[i];
							if (state.stateAbbr === stateCode) {
								this.selectState(state);
								break;
							} else if (state.name === this.state.value) {
								this.selectState(state);
								break;
							}
						}
					}
				}
			},
			error => {
				console.log(error);
			});
		}
	}
}
