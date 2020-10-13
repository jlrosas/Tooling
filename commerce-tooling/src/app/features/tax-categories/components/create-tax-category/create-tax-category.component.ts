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
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MatStepper } from "@angular/material/stepper";
import { TranslateService } from "@ngx-translate/core";
import { TaxCategoryMainService } from "../../services/tax-category-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./create-tax-category.component.html",
	styleUrls: ["./create-tax-category.component.scss"]
})
export class CreateTaxCategoryComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private taxCategoryMainService: TaxCategoryMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	cancel() {
		this.alertService.clear();
		this.taxCategoryMainService.clearData();
		this.router.navigate(["tax-categories", "tax-category-list", {storeId: this.route.snapshot.params.storeId}]);
	}

	submit() {
		if (!this.taxCategoryMainService.processing) {
			this.alertService.clear();
			let completedMandatorySteps = 0;
			let valid = true;
			let pending = false;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl) {
					stepControl.markAllAsTouched();
					if (!stepControl.valid) {
						valid = false;
					}
					if (stepControl.pending) {
						pending = true;
						const statusChangesSubscription = stepControl.statusChanges.subscribe(statusChange => {
							statusChangesSubscription.unsubscribe();
							this.submit();
						});
					}
				}
				if (!step.optional && step.completed) {
					completedMandatorySteps++;
				}
			});
			if (!pending) {
				if (valid && completedMandatorySteps >= 2) {
					if (!this.taxCategoryMainService.taxCodes || this.taxCategoryMainService.taxCodes.length === 0) {
						this.translateService.get("TAX_CATEGORIES.NO_TAX_CODES_ERROR").subscribe((message: string) => {
							this.alertService.error({message, clear: true});
						});
					} else if (!this.taxCategoryMainService.taxRates || this.taxCategoryMainService.taxRates.length === 0) {
						this.translateService.get("TAX_CATEGORIES.NO_TAX_RATES_ERROR").subscribe((message: string) => {
							this.alertService.error({message, clear: true});
						});
					} else {
						this.taxCategoryMainService.createTaxCategory().subscribe(name => {
							this.taxCategoryMainService.clearData();
							this.router.navigate(["tax-categories", "tax-category-list", {storeId: this.route.snapshot.params.storeId}]);
							this.translateService.get("TAX_CATEGORIES.TAX_CATEGORY_CREATED_MESSAGE", {name}).subscribe((message: string) => {
								this.alertService.success({message});
							});
						});
					}
				} else if (!valid) {
					this.translateService.get("TAX_CATEGORIES.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				} else {
					this.translateService.get("TAX_CATEGORIES.NOT_COMPLETE_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
