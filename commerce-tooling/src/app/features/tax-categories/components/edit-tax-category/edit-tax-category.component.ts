/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper } from "@angular/material/stepper";
import { TaxCategoryMainService } from "../../services/tax-category-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./edit-tax-category.component.html",
	styleUrls: ["./edit-tax-category.component.scss"]
})
export class EditTaxCategoryComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private taxCategoryMainService: TaxCategoryMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			this.alertService.clear();
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("TAX_CATEGORIES.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.taxCategoryMainService.clearData();
		this.router.navigate(["tax-categories/tax-category-list", {storeId: this.route.snapshot.params.storeId}]);
	}

	save() {
		if (!this.taxCategoryMainService.processing) {
			this.alertService.clear();
			let valid = true;
			let pending = false;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl) {
					if (!step.stepControl.valid) {
						valid = false;
					}
					if (step.stepControl.pending) {
						pending = true;
						const statusChangesSubscription = stepControl.statusChanges.subscribe(statusChange => {
							statusChangesSubscription.unsubscribe();
							this.save();
						});
					}
				}
			});
			if (!pending) {
				if (valid) {
					if (this.taxCategoryMainService.taxCodes && this.taxCategoryMainService.taxCodes.length === 0) {
						this.translateService.get("TAX_CATEGORIES.NO_TAX_CODES_ERROR").subscribe((message: string) => {
							this.alertService.error({message, clear: true});
						});
					} else if (this.taxCategoryMainService.taxRates && this.taxCategoryMainService.taxRates.length === 0) {
						this.translateService.get("TAX_CATEGORIES.NO_TAX_RATES_ERROR").subscribe((message: string) => {
							this.alertService.error({message, clear: true});
						});
					} else {
						this.taxCategoryMainService.updateTaxCategory(this.route.snapshot.params.storeOwnerId).subscribe(response => {
							this.taxCategoryMainService.clearData();
							this.router.navigate(["tax-categories/tax-category-list", {storeId: this.route.snapshot.params.storeId}]);
							this.translateService.get("TAX_CATEGORIES.TAX_CATEGORY_SAVED_MESSAGE").subscribe((message: string) => {
								this.alertService.success({message});
							});
						},
						errorResponse => {
							if (errorResponse.error && errorResponse.error.errors) {
								errorResponse.error.errors.forEach((error: { message: string; }) => {
									this.alertService.error({message: error.message});
								});
							} else {
								console.log(errorResponse);
							}
						});
					}
				} else {
					this.translateService.get("TAX_CATEGORIES.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
