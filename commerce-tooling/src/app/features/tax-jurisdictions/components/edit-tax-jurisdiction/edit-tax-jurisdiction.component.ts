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
import { TaxJurisdictionMainService } from "../../services/tax-jurisdiction-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./edit-tax-jurisdiction.component.html",
	styleUrls: ["./edit-tax-jurisdiction.component.scss"]
})
export class EditTaxJurisdictionComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private taxJurisdictionMainService: TaxJurisdictionMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			this.alertService.clear();
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("TAX_JURISDICTIONS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.taxJurisdictionMainService.clearData();
		this.router.navigate(["tax-jurisdictions/tax-jurisdiction-list", {storeId: this.route.snapshot.params.storeId}]);
	}

	save() {
		if (!this.taxJurisdictionMainService.processing) {
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
					this.taxJurisdictionMainService.updateTaxJurisdiction().subscribe(response => {
						this.taxJurisdictionMainService.clearData();
						this.router.navigate(["tax-jurisdictions/tax-jurisdiction-list", {storeId: this.route.snapshot.params.storeId}]);
						this.translateService.get("TAX_JURISDICTIONS.TAX_JURISDICTION_SAVED_MESSAGE").subscribe((message: string) => {
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
				} else {
					this.translateService.get("TAX_JURISDICTIONS.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
