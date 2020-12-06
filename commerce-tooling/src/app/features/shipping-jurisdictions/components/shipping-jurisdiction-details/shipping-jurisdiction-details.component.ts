/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { MatStep } from "@angular/material/stepper";
import { FormGroup, FormControl, Validators, ValidationErrors } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subject, Subscription, Observable, Observer } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ShippingJurisdictionMainService } from "../../services/shipping-jurisdiction-main.service";
import { JurisdictionsService } from "../../../../rest/services/jurisdictions.service";
import { CountriesService } from "../../../../rest/services/countries.service";
import { StatesService } from "../../../../rest/services/states.service";
import { LanguageService } from "../../../../services/language.service";
import { AlertService } from "../../../../services/alert.service";
import { HcValidators } from "../../../../shared/validators";

@Component({
	selector: "hc-shipping-jurisdiction-details",
	templateUrl: "./shipping-jurisdiction-details.component.html",
	styleUrls: ["./shipping-jurisdiction-details.component.scss"]
})
export class ShippingJurisdictionDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: FormGroup | any;

	name: FormControl;
	country: FormControl;
	state: FormControl;
	city: FormControl;
	zipcodeStart: FormControl;
	zipcodeEnd: FormControl;

	filteredCountryList: Array<any> = [];
	filteredStateList: Array<any> = [];

	@ViewChild("nameInput") nameInput: ElementRef<HTMLInputElement>;
	private countryList: Array<any> = [];
	private stateList: Array<any> = [];
	private onLanguageChangeSubscription: Subscription = null;
	private getShippingJurisdictionsSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private matchingShippingJurisdiction$: Subject<any> = new Subject<any>();

	constructor(private route: ActivatedRoute,
			private shippingJurisdictionMainService: ShippingJurisdictionMainService,
			private jurisdictionsService: JurisdictionsService,
			private countriesService: CountriesService,
			private statesService: StatesService,
			private languageService: LanguageService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.shippingJurisdictionMainService.loadCurrentShippingJurisdiction(Number(this.route.snapshot.params.id))
					.subscribe(response => {
				this.setValues();
			});
		} else {
			this.setValues();
		}
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getShippingJurisdictions(searchString);
		});
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
		setTimeout(() => {
			this.nameInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	triggerSave() {
		this.detailsForm.markAllAsTouched();
		this.save.emit(null);
	}

	validateName() {
		this.shippingJurisdictionMainService.shippingJurisdictionData.code = this.name.value;
	}

	validateCity() {
		this.shippingJurisdictionMainService.shippingJurisdictionData.city = this.city.value;
	}

	validateZipcodeStart() {
		this.shippingJurisdictionMainService.shippingJurisdictionData.zipcodeStart = this.zipcodeStart.value;
	}

	validateZipcodeEnd() {
		this.shippingJurisdictionMainService.shippingJurisdictionData.zipcodeEnd = this.zipcodeEnd.value;
	}

	validateCountry() {
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
		} else {
			this.filteredCountryList = this.countryList;
		}
	}

	selectCountry(country: any) {
		const countryName = country != null ? country.name : null;
		this.shippingJurisdictionMainService.shippingJurisdictionData.country = countryName;
		const countryCode = country != null ? country.countryAbbr : null;
		this.shippingJurisdictionMainService.shippingJurisdictionData.countryAbbreviation = countryCode;
		this.country.setValue(country ? country.name : "");
		this.state.setValue("");
		this.shippingJurisdictionMainService.shippingJurisdictionData.state = null;
		this.shippingJurisdictionMainService.shippingJurisdictionData.stateAbbreviation = null;
		this.initStateList();
	}

	validateState() {
		if (this.stateList.length > 0) {
			this.shippingJurisdictionMainService.shippingJurisdictionData.state = null;
			this.shippingJurisdictionMainService.shippingJurisdictionData.stateAbbreviation = null;
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
			} else {
				this.filteredStateList = this.stateList;
			}
		} else {
			this.shippingJurisdictionMainService.shippingJurisdictionData.state = this.state.value;
			this.shippingJurisdictionMainService.shippingJurisdictionData.stateAbbreviation = null;
		}
	}

	selectState(state: any) {
		const stateName = state != null ? state.name : null;
		const stateAbbreviation = state != null ? state.stateAbbr : null;
		this.shippingJurisdictionMainService.shippingJurisdictionData.state = stateName;
		this.shippingJurisdictionMainService.shippingJurisdictionData.stateAbbreviation = stateAbbreviation;
		this.state.setValue(state ? state.name : "");
	}

	private getShippingJurisdictions(searchString) {
		if (this.getShippingJurisdictionsSubscription != null) {
			this.getShippingJurisdictionsSubscription.unsubscribe();
			this.getShippingJurisdictionsSubscription = null;
		}
		this.getShippingJurisdictionsSubscription = this.jurisdictionsService.getJurisdictions({
			code: searchString.trim(),
			storeId: Number(this.route.snapshot.params.storeId),
			subclass: 1
		}).subscribe((body: any) => {
			this.getShippingJurisdictionsSubscription.unsubscribe();
			this.getShippingJurisdictionsSubscription = null;
			this.matchingShippingJurisdiction$.next(body.items.length > 0 ? body.items[0] : null);
		});
	}

	private createFormControls() {
		this.name = new FormControl("", HcValidators.required, control => {
			return new Observable<ValidationErrors | null>((observer: Observer<ValidationErrors | null>) => {
				if (!control.value) {
					observer.next(null);
					observer.complete();
				} else {
					this.matchingShippingJurisdiction$.subscribe((matchingShippingJurisdiction: any) => {
						let errors = null;
						if (matchingShippingJurisdiction) {
							const currentShippingJurisdictionId = this.shippingJurisdictionMainService.currentShippingJurisdictionId;
							const id = matchingShippingJurisdiction.id;
							const name = matchingShippingJurisdiction.code;
							if (name === control.value.trim() && currentShippingJurisdictionId !== id) {
								errors = {
									duplicateName: true
								};
							}
						}
						observer.next(errors);
						observer.complete();
					});
					this.searchString.next(this.name.value);
				}
			});
		});
		this.country = new FormControl("", [
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
		this.city = new FormControl("");
		this.zipcodeStart = new FormControl("");
		this.zipcodeEnd = new FormControl("");
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			name: this.name,
			country: this.country,
			state: this.state,
			city: this.city,
			zipcodeStart: this.zipcodeStart,
			zipcodeEnd: this.zipcodeEnd
		});
	}

	private setValues() {
		const shippingJurisdictionData = this.shippingJurisdictionMainService.shippingJurisdictionData;
		if (shippingJurisdictionData) {
			this.name.setValue(shippingJurisdictionData.code ? shippingJurisdictionData.code : "");
			this.country.setValue(shippingJurisdictionData.country ? shippingJurisdictionData.country : "");
			this.state.setValue(shippingJurisdictionData.state ? shippingJurisdictionData.state : "");
			this.city.setValue(shippingJurisdictionData.city ? shippingJurisdictionData.city : "");
			this.zipcodeStart.setValue(shippingJurisdictionData.zipcodeStart ? shippingJurisdictionData.zipcodeStart : "");
			this.zipcodeEnd.setValue(shippingJurisdictionData.zipcodeEnd ? shippingJurisdictionData.zipcodeEnd : "");
		} else {
			// create mode
			this.shippingJurisdictionMainService.shippingJurisdictionData = { storeId : Number(this.route.snapshot.params.storeId) };
		}
		this.initCountryList();
		this.initStateList();
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.initCountryList();
			this.initStateList();
		});
	}

	private initCountryList() {
		this.countriesService.getCountries({
			languageId: LanguageService.languageId,
			sort: "name"
		}).subscribe(response => {
			this.countryList = response.items ? response.items.sort((a, b) => a.name.localeCompare(b.name)) : [];
			const countryCode = this.shippingJurisdictionMainService.shippingJurisdictionData.countryAbbreviation;
			if (countryCode) {
				for (let i = 0; i < this.countryList.length; i++) {
					const country = this.countryList[i];
					if (country.countryAbbr === countryCode) {
						this.shippingJurisdictionMainService.shippingJurisdictionData.country = country.name;
						this.country.setValue(country.name);
						break;
					}
				}
			} else {
				this.filteredCountryList = this.countryList;
			}
		});
	}

	private initStateList() {
		const countryCode = this.shippingJurisdictionMainService.shippingJurisdictionData.countryAbbreviation;
		this.stateList = [];
		this.filteredStateList = [];
		if (countryCode != null && countryCode !== "") {
			this.statesService.getStates({
				countryAbbr: countryCode,
				languageId: LanguageService.languageId
			}).subscribe(response => {
				this.stateList = response.items;
				if (this.stateList.length === 0) {
					this.state.setValue(this.shippingJurisdictionMainService.shippingJurisdictionData.state ?
						this.shippingJurisdictionMainService.shippingJurisdictionData.state : "");
				} else {
					const stateCode = this.shippingJurisdictionMainService.shippingJurisdictionData.stateAbbreviation;
					if (stateCode) {
						for (let i = 0; i < this.stateList.length; i++) {
							const state = this.stateList[i];
							if (state.stateAbbr === stateCode) {
								this.shippingJurisdictionMainService.shippingJurisdictionData.state = state.name;
								this.state.setValue(state.name);
								break;
							}
						}
					} else {
						this.filteredStateList = this.stateList;
					}
				}
			});
		}
	}
}
