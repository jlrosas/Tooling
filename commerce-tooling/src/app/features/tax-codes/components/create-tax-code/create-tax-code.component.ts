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
import { MatStepper } from "@angular/material/stepper";
import { TranslateService } from "@ngx-translate/core";
import { TaxCodeMainService } from "../../services/tax-code-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./create-tax-code.component.html",
	styleUrls: ["./create-tax-code.component.scss"]
})
export class CreateTaxCodeComponent {
	@ViewChild("stepper") stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private taxCodeMainService: TaxCodeMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	cancel() {
		this.alertService.clear();
		this.taxCodeMainService.clearData();
		this.router.navigate(["tax-codes", "tax-code-list", {storeId: this.route.snapshot.params.storeId}]);
	}

	submit() {
		if (!this.taxCodeMainService.processing) {
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
				if (valid && completedMandatorySteps >= 0) {
					this.taxCodeMainService.createTaxCode().subscribe(name => {
						this.taxCodeMainService.clearData();
						this.router.navigate(["tax-codes", "tax-code-list", {storeId: this.route.snapshot.params.storeId}]);
						name = name.replace(/[\<]/g, "&lt").replace(/[\>]/g, "&gt");
						this.translateService.get("TAX_CODES.TAX_CODE_CREATED_MESSAGE", { name }).subscribe((message: string) => {
							this.alertService.success({message});
						});
					});
				} else if (!valid) {
					this.translateService.get("TAX_CODES.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				} else {
					this.translateService.get("TAX_CODES.NOT_COMPLETE_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
