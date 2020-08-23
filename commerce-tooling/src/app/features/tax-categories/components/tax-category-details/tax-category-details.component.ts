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
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, Validators, FormControl, ValidationErrors } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Subject, Subscription, Observable, Observer } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { MatSelect } from "@angular/material/select";
import { TaxCategoryMainService } from "../../services/tax-category-main.service";
import { TaxCategoriesService } from "../../../../rest/services/tax-categories.service";
import { AlertService } from "../../../../services/alert.service";
import { HcValidators } from "../../../../shared/validators";

@Component({
	templateUrl: "./tax-category-details.component.html",
	styleUrls: ["./tax-category-details.component.scss"],
	selector: "hc-tax-category-details"
})
export class TaxCategoryDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: FormGroup | any;
	taxType: FormControl;
	name: FormControl;
	includeInDisplayPrice: FormControl;

	taxTypes = [
		{
			value: -3,
			textKey: "TAX_CATEGORIES.TAX_TYPE_SALES"
		},
		{
			value: -4,
			textKey: "TAX_CATEGORIES.TAX_TYPE_SHIPPING"
		}
	];

	@ViewChild("taxTypeSelect", {static: false}) taxTypeSelect: MatSelect;
	@ViewChild("nameInput", {static: false}) nameInput: ElementRef<HTMLInputElement>;

	private statusChangesSubscription: Subscription = null;
	private getTaxCategoriesSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private matchingTaxCategory$: Subject<any> = new Subject<any>();

	constructor(
			private router: Router,
			private route: ActivatedRoute,
			private taxCategoryMainService: TaxCategoryMainService,
			private taxCategoriesService: TaxCategoriesService,
			private translateService: TranslateService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.taxCategoryMainService.loadCurrentTaxCategory(Number(this.route.snapshot.params.id)).subscribe(response => {
				this.setValues();
			});
		} else {
			this.setValues();
		}
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getTaxCategories(searchString);
		});
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
		setTimeout(() => {
			if (this.mode === "create") {
				this.nameInput.nativeElement.focus();
			} else {
				this.taxTypeSelect.focus();
			}
		}, 250);
	}

	ngOnDestroy() {
		if (this.statusChangesSubscription) {
			this.statusChangesSubscription.unsubscribe();
			this.statusChangesSubscription = null;
		}
	}

	next() {
		if (this.statusChangesSubscription) {
			this.statusChangesSubscription.unsubscribe();
			this.statusChangesSubscription = null;
		}
		this.detailsForm.markAllAsTouched();
		this.alertService.clear();
		if (this.detailsForm.pending) {
			this.statusChangesSubscription = this.detailsForm.statusChanges.subscribe(statusChange => {
				this.statusChangesSubscription.unsubscribe();
				this.next();
			});
		} else if (this.detailsForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("TAX_CATEGORIES.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	triggerSave() {
		this.detailsForm.markAllAsTouched();
		this.save.emit(null);
	}

	selectTaxType(taxType) {
		this.taxCategoryMainService.taxCategoryData.taxTypeId = taxType.value;
	}

	validateName() {
		this.taxCategoryMainService.taxCategoryData.name = this.name.value;
	}

	validateIncludeInDisplayPrice(e: any) {
		this.taxCategoryMainService.taxCategoryData.displayUsage = e.checked ? 1 : 0;
	}

	private getTaxCategories(searchString) {
		if (this.getTaxCategoriesSubscription != null) {
			this.getTaxCategoriesSubscription.unsubscribe();
			this.getTaxCategoriesSubscription = null;
		}
		this.getTaxCategoriesSubscription = this.taxCategoriesService.getTaxCategories({
			name: searchString.trim(),
			storeId: Number(this.route.snapshot.params.storeId)
		}).subscribe((body: any) => {
			this.getTaxCategoriesSubscription.unsubscribe();
			this.getTaxCategoriesSubscription = null;
			this.matchingTaxCategory$.next(body.items.length > 0 ? body.items[0] : null);
		});
	}

	private setValues() {
		if (this.taxCategoryMainService.taxCategoryData == null) {
			this.taxCategoryMainService.taxCategoryData = {
				storeId: Number(this.route.snapshot.params.storeId),
				displayUsage: 0
			};
		} else {
			const taxCategoryData = this.taxCategoryMainService.taxCategoryData;
			this.name.setValue(taxCategoryData.name ? taxCategoryData.name : null);
			if (taxCategoryData.taxTypeId) {
				for (let i = 0; i < this.taxTypes.length; i++) {
					if (this.taxTypes[i].value === taxCategoryData.taxTypeId) {
						this.taxType.setValue(this.taxTypes[i]);
						break;
					}
				}
			}
			this.includeInDisplayPrice.setValue(taxCategoryData.displayUsage === 1 ? true : false);
		}
	}

	private createFormControls() {
		if (this.mode === "edit") {
			this.taxType = new FormControl({value: null, disabled: true});
		} else {
			this.taxType = new FormControl(null, Validators.required);
		}
		this.name = new FormControl("", HcValidators.required, control => {
			return new Observable<ValidationErrors | null>((observer: Observer<ValidationErrors | null>) => {
				if (!control.value) {
					observer.next(null);
					observer.complete();
				} else {
					this.matchingTaxCategory$.subscribe((matchingTaxCategory: any) => {
						let errors = null;
						if (matchingTaxCategory) {
							const currentTaxCategoryId = this.taxCategoryMainService.currentTaxCategoryId;
							const id = matchingTaxCategory.id;
							const name = matchingTaxCategory.name;
							if (name === control.value.trim() && currentTaxCategoryId !== id) {
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
		this.includeInDisplayPrice = new FormControl(false);
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			taxType: this.taxType,
			name: this.name,
			includeInDisplayPrice: this.includeInDisplayPrice
		});
	}

	private updateFormControlEnablement() {
		if (this.mode === "create") {
			this.taxType.enable();
		} else {
			this.taxType.disable();
		}
	}
}
