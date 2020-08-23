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
import { TaxJurisdictionMainService } from "../../services/tax-jurisdiction-main.service";
import { JurisdictionsService } from "../../../../rest/services/jurisdictions.service";
import { CountriesService } from "../../../../rest/services/countries.service";
import { StatesService } from "../../../../rest/services/states.service";
import { LanguageService } from "../../../../services/language.service";
import { AlertService } from "../../../../services/alert.service";
import { HcValidators } from "../../../../shared/validators";

@Component({
	selector: "hc-tax-jurisdiction-details",
	templateUrl: "./tax-jurisdiction-details.component.html",
	styleUrls: ["./tax-jurisdiction-details.component.scss"]
})
export class TaxJurisdictionDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: FormGroup | any;

	name: FormControl;
	country: FormControl;
	state: FormControl;
	filteredCountryList: Array<any> = [];
	filteredStateList: Array<any> = [];

	@ViewChild("nameInput", {static: false}) nameInput: ElementRef<HTMLInputElement>;
	private countryList: Array<any> = [];
	private stateList: Array<any> = [];
	private onLanguageChangeSubscription: Subscription = null;
	private getTaxJurisdictionsSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private matchingTaxJurisdiction$: Subject<any> = new Subject<any>();

	constructor(private route: ActivatedRoute,
			private taxJurisdictionMainService: TaxJurisdictionMainService,
			private jurisdictionsService: JurisdictionsService,
			private countriesService: CountriesService,
			private statesService: StatesService,
			private languageService: LanguageService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.taxJurisdictionMainService.loadCurrentTaxJurisdiction(Number(this.route.snapshot.params.id)).subscribe(response => {
				this.setValues();
			});
		} else {
			this.setValues();
		}
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getTaxJurisdictions(searchString);
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
		this.taxJurisdictionMainService.taxJurisdictionData.code = this.name.value;
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
		this.taxJurisdictionMainService.taxJurisdictionData.country = countryName;
		const countryCode = country != null ? country.countryAbbr : null;
		this.taxJurisdictionMainService.taxJurisdictionData.countryAbbreviation = countryCode;
		this.country.setValue(country ? country.name : "");
		this.state.setValue("");
		this.taxJurisdictionMainService.taxJurisdictionData.state = null;
		this.taxJurisdictionMainService.taxJurisdictionData.stateAbbreviation = null;
		this.initStateList();
	}

	validateState() {
		if (this.stateList.length > 0) {
			this.taxJurisdictionMainService.taxJurisdictionData.state = null;
			this.taxJurisdictionMainService.taxJurisdictionData.stateAbbreviation = null;
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
			this.taxJurisdictionMainService.taxJurisdictionData.state = this.state.value;
			this.taxJurisdictionMainService.taxJurisdictionData.stateAbbreviation = null;
		}
	}

	selectState(state: any) {
		const stateName = state != null ? state.name : null;
		const stateAbbreviation = state != null ? state.stateAbbr : null;
		this.taxJurisdictionMainService.taxJurisdictionData.state = stateName;
		this.taxJurisdictionMainService.taxJurisdictionData.stateAbbreviation = stateAbbreviation;
		this.state.setValue(state ? state.name : "");
	}

	private getTaxJurisdictions(searchString) {
		if (this.getTaxJurisdictionsSubscription != null) {
			this.getTaxJurisdictionsSubscription.unsubscribe();
			this.getTaxJurisdictionsSubscription = null;
		}
		this.getTaxJurisdictionsSubscription = this.jurisdictionsService.getJurisdictions({
			code: searchString.trim(),
			storeId: Number(this.route.snapshot.params.storeId),
			subclass: 2
		}).subscribe((body: any) => {
			this.getTaxJurisdictionsSubscription.unsubscribe();
			this.getTaxJurisdictionsSubscription = null;
			this.matchingTaxJurisdiction$.next(body.items.length > 0 ? body.items[0] : null);
		});
	}

	private createFormControls() {
		this.name = new FormControl("", HcValidators.required, control => {
			return new Observable<ValidationErrors | null>((observer: Observer<ValidationErrors | null>) => {
				if (!control.value) {
					observer.next(null);
					observer.complete();
				} else {
					this.matchingTaxJurisdiction$.subscribe((matchingTaxJurisdiction: any) => {
						let errors = null;
						if (matchingTaxJurisdiction) {
							const currentTaxJurisdictionId = this.taxJurisdictionMainService.currentTaxJurisdictionId;
							const id = matchingTaxJurisdiction.id;
							const name = matchingTaxJurisdiction.code;
							if (name === control.value.trim() && currentTaxJurisdictionId !== id) {
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
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			name: this.name,
			country: this.country,
			state: this.state
		});
	}

	private setValues() {
		const taxJurisdictionData = this.taxJurisdictionMainService.taxJurisdictionData;
		if (taxJurisdictionData) {
			this.name.setValue(taxJurisdictionData.code ? taxJurisdictionData.code : "");
			this.country.setValue(taxJurisdictionData.country ? taxJurisdictionData.country : "");
			this.state.setValue(taxJurisdictionData.state ? taxJurisdictionData.state : "");
		} else {
			// create mode
			this.taxJurisdictionMainService.taxJurisdictionData = { storeId : Number(this.route.snapshot.params.storeId) };
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
			languageId: LanguageService.languageId
		}).subscribe(
			response => {
				this.countryList = response.items;
				const countryCode = this.taxJurisdictionMainService.taxJurisdictionData.countryAbbreviation;
				if (countryCode) {
					for (let i = 0; i < this.countryList.length; i++) {
						const country = this.countryList[i];
						if (country.countryAbbr === countryCode) {
							this.taxJurisdictionMainService.taxJurisdictionData.country = country.name;
							this.country.setValue(country.name);
							break;
						}
					}
				} else {
					this.filteredCountryList = this.countryList;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	private initStateList() {
		const countryCode = this.taxJurisdictionMainService.taxJurisdictionData.countryAbbreviation;
		this.stateList = [];
		this.filteredStateList = [];
		if (countryCode != null && countryCode !== "") {
			this.statesService.getStates({
				countryAbbr: countryCode,
				languageId: LanguageService.languageId
			}).subscribe(response => {
				this.stateList = response.items;
				if (this.stateList.length === 0) {
					this.state.setValue(this.taxJurisdictionMainService.taxJurisdictionData.state ?
						this.taxJurisdictionMainService.taxJurisdictionData.state : "");
				} else {
					const stateCode = this.taxJurisdictionMainService.taxJurisdictionData.stateAbbreviation;
					if (stateCode) {
						for (let i = 0; i < this.stateList.length; i++) {
							const state = this.stateList[i];
							if (state.stateAbbr === stateCode) {
								this.taxJurisdictionMainService.taxJurisdictionData.state = state.name;
								this.state.setValue(state.name);
								break;
							}
						}
					} else {
						this.filteredStateList = this.stateList;
					}
				}
			},
			error => {
				console.log(error);
			});
		}
	}
}
