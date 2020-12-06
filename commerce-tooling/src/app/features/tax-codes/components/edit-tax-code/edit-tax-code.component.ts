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
import { TaxCodeMainService } from "../../services/tax-code-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./edit-tax-code.component.html",
	styleUrls: ["./edit-tax-code.component.scss"]
})
export class EditTaxCodeComponent {
	@ViewChild("stepper") stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private taxCodeMainService: TaxCodeMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			this.alertService.clear();
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("TAX_CODES.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.taxCodeMainService.clearData();
		this.router.navigate(["tax-codes/tax-code-list", {storeId: this.route.snapshot.params.storeId}]);
	}

	save() {
		if (!this.taxCodeMainService.processing) {
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
					this.taxCodeMainService.updateTaxCode().subscribe(response => {
						this.taxCodeMainService.clearData();
						this.router.navigate(["tax-codes/tax-code-list", {storeId: this.route.snapshot.params.storeId}]);
						this.translateService.get("TAX_CODES.TAX_CODE_SAVED_MESSAGE").subscribe((message: string) => {
							this.alertService.success({message});
						});
					});
				} else {
					this.translateService.get("TAX_CODES.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
