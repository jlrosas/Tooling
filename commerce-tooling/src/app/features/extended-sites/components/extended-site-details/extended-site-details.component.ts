/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { TranslateService } from "@ngx-translate/core";
import { ExtendedSiteMainService } from "../../services/extended-site-main.service";
import { AlertService } from "../../../../services/alert.service";
import { LanguageService } from "../../../../services/language.service";
import { LanguageDescriptionsService } from "../../../../rest/services/language-descriptions.service";
import { CurrencyDescriptionsService } from "../../../../rest/services/currency-descriptions.service";
import { Subscription } from "rxjs";
import { HcValidators } from "../../../../shared/validators";

@Component({
	templateUrl: "./extended-site-details.component.html",
	styleUrls: ["./extended-site-details.component.scss"],
	selector: "hc-extended-site-details"
})
export class ExtendedSiteDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;

	detailsForm: any;
	storeIdentifier: FormControl;
	storeName: FormControl;
	description: FormControl;
	email: FormControl;
	defaultCurrency: FormControl;
	defaultLanguage: FormControl;

	currencyList: Array<any> = [];
	languageList: Array<any> = [];
	isLinear = true;

	@ViewChild("storeIdentifierInput", {static: false}) storeIdentifierInput: ElementRef<HTMLInputElement>;

	private onLanguageChangeSubscription: Subscription = null;

	constructor(private router: Router,
			private translateService: TranslateService,
			private languageService: LanguageService,
			private extendedSiteMainService: ExtendedSiteMainService,
			private currencyDescriptionsService: CurrencyDescriptionsService,
			private languageDescriptionsService: LanguageDescriptionsService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.extendedSiteMainService.extendedSiteData !== null) {
			const extendedSiteData = this.extendedSiteMainService.extendedSiteData;
			this.storeIdentifier.setValue(extendedSiteData.identifier);
			this.storeName.setValue(extendedSiteData.name);
			this.description.setValue(extendedSiteData.description);
			this.email.setValue(extendedSiteData.email);
		} else {
			this.extendedSiteMainService.extendedSiteData = {
			};
		}
		this.initCurrencyList();
		this.initLanguageList();
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.initCurrencyList();
			this.initLanguageList();
		});
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
		setTimeout(() => {
			this.storeIdentifierInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	next() {
		this.detailsForm.markAllAsTouched();
		this.alertService.clear();
		if (this.detailsForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("EXTENDED_SITES.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message, clear: true});
			});
		}
	}

	validateStoreIdentifier() {
		this.extendedSiteMainService.extendedSiteData.identifier = this.storeIdentifier.value;
	}

	validateStoreName() {
		this.extendedSiteMainService.extendedSiteData.name = this.storeName.value;
	}

	validateDescription() {
		this.extendedSiteMainService.extendedSiteData.description = this.description.value;
	}

	validateEmail() {
		if (this.email.value === "" || this.email.valid) {
			this.extendedSiteMainService.extendedSiteData.email = this.email.value;
		}
	}

	selectDefaultCurrency(currency: any) {
		this.extendedSiteMainService.extendedSiteData.defaultCurrency = currency.code;
	}

	selectDefaultLanguage(language: any) {
		this.extendedSiteMainService.extendedSiteData.defaultLanguageId = language.id;
	}

	private createFormControls() {
		this.storeIdentifier = new FormControl("", HcValidators.required);
		this.storeName = new FormControl("", HcValidators.required);
		this.description = new FormControl("", HcValidators.required);
		this.email = new FormControl("", [ Validators.required, Validators.email ]);
		this.defaultLanguage = new FormControl(null, Validators.required);
		this.defaultCurrency = new FormControl(null, Validators.required);
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			storeIdentifier : this.storeIdentifier,
			storeName : this.storeName,
			description: this.description,
			email: this.email,
			defaultLanguage: this.defaultLanguage,
			defaultCurrency: this.defaultCurrency
		});
	}

	private initCurrencyList() {
		this.currencyDescriptionsService.getCurrencyDescriptions({
			languageId: LanguageService.languageId
		}).subscribe((body: any) => {
			const newCurrencyList = [];
			body.items.forEach(currency => {
				newCurrencyList.push({
					code: currency.code,
					displayName: currency.description
				});
			});
			this.currencyList = newCurrencyList;
		});
	}

	private initLanguageList() {
		this.languageDescriptionsService.getLanguageDescriptions({
			languageId: LanguageService.languageId
		}).subscribe((body: any) => {
			const newLanguageList = [];
			body.items.forEach(language => {
				newLanguageList.push({
					id: language.descriptionLanguageId,
					displayName: language.description
				});
			});
			this.languageList = newLanguageList;
		});
	}
}
