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
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { MatSelect } from "@angular/material/select";
import { TaxCategoryMainService } from "../../services/tax-category-main.service";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "../../../../services/language.service";
import { LanguageDescriptionsService } from "../../../../rest/services/language-descriptions.service";

@Component({
	selector: "hc-tax-category-display-name",
	templateUrl: "./tax-category-display-name.component.html",
	styleUrls: ["./tax-category-display-name.component.scss"]
})
export class TaxCategoryDisplayNameComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	descriptionForm: FormGroup | any;
	language: FormControl;
	displayName: FormControl;

	languageList: Array<any> = [];
	descriptions: Array<any> = [];

	@ViewChild("languageSelect") languageSelect: MatSelect;

	private onLanguageChangeSubscription: Subscription = null;

	constructor(private route: ActivatedRoute,
			private translateService: TranslateService,
			private taxCategoryMainService: TaxCategoryMainService,
			private languageService: LanguageService,
			private languageDescriptionsService: LanguageDescriptionsService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.taxCategoryMainService.loadCurrentTaxCategoryDescriptions(Number(this.route.snapshot.params.id)).subscribe(response => {
				this.setValues();
			});
		} else {
			this.setValues();
		}
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.initLanguageList();
		});
		this.initLanguageList();
	}

	ngAfterViewInit() {
		this.step.stepControl = this.descriptionForm;
		setTimeout(() => {
			this.languageSelect.focus();
		}, 250);
	}

	ngOnDestroy() {
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	next() {
		this.descriptionForm.markAllAsTouched();
		this.alertService.clear();
		if (this.descriptionForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("TAX_CATEGORIES.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	triggerSave() {
		this.descriptionForm.markAllAsTouched();
		this.save.emit(null);
	}

	selectLanguage(language: any) {
		this.displayName.enable();
		this.displayName.setValue("");
		for (let i = 0; i < this.descriptions.length; i++) {
			const description = this.descriptions[i];
			if (description.languageId === language.descriptionLanguageId) {
				this.displayName.setValue(description.description);
				break;
			}
		}
	}

	validateDisplayName() {
		const language = this.language.value;
		if (this.displayName.value) {
			let found = false;
			for (let i = 0; i < this.descriptions.length; i++) {
				const description = this.descriptions[i];
				if (description.languageId === language.descriptionLanguageId) {
					found = true;
					description.description = this.displayName.value;
					break;
				}
			}
			if (!found) {
				this.descriptions.push({
					languageId: language.descriptionLanguageId,
					description: this.displayName.value,
					languageDescription: language.description
				});
			}
		} else {
			for (let i = 0; i < this.descriptions.length; i++) {
				const description = this.descriptions[i];
				if (description.languageId === language.descriptionLanguageId) {
					this.descriptions.splice(i, 1);
					break;
				}
			}
		}
	}

	removeDescription(description: any) {
		const index = this.descriptions.indexOf(description);
		if (index >= 0) {
			this.descriptions.splice(index, 1);
			const language = this.language.value;
			if (language && description.languageId === language.descriptionLanguageId) {
				this.displayName.setValue("");
			}
		}
	}

	private setValues() {
		if (this.taxCategoryMainService.descriptions == null) {
			this.taxCategoryMainService.descriptions = [];
		}
		this.descriptions = this.taxCategoryMainService.descriptions;
		if (this.descriptions.length > 0) {
			this.displayName.setValue(this.descriptions[0].description);
			this.displayName.enable();
		}
		this.populateDescriptionLanguages();
	}

	private createFormControls() {
		this.language = new FormControl(null);
		this.displayName = new FormControl({value: "", disabled: true});
	}

	private createForm() {
		this.descriptionForm = new FormGroup({
			language: this.language,
			displayName: this.displayName
		});
	}

	private initLanguageList() {
		this.languageDescriptionsService.getLanguageDescriptions({
			languageId: LanguageService.languageId,
			sort: "description"
		}).subscribe((body: any) => {
			const oldLanguage = this.language.value;
			this.languageList = body.items;
			if (oldLanguage !== null) {
				for (let i = 0; i < this.languageList.length; i++) {
					const language = this.languageList[i];
					if (oldLanguage.descriptionLanguageId === language.descriptionLanguageId) {
						this.language.setValue(language);
						break;
					}
				}
			}
			this.populateDescriptionLanguages();
		});
	}

	private populateDescriptionLanguages() {
		if (this.descriptions.length > 0 && this.languageList.length > 0) {
			this.descriptions.forEach(description => {
				for (let i = 0; i < this.languageList.length; i++) {
					const language = this.languageList[i];
					if (description.languageId === language.descriptionLanguageId) {
						description.languageDescription = language.description;
						if (this.language.value == null) {
							this.language.setValue(language);
						}
						break;
					}
				}
			});
		}
	}
}
