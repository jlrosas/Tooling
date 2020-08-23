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
import { ShippingJurisdictionMainService } from "../../services/shipping-jurisdiction-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./edit-shipping-jurisdiction.component.html",
	styleUrls: ["./edit-shipping-jurisdiction.component.scss"]
})
export class EditShippingJurisdictionComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private shippingJurisdictionMainService: ShippingJurisdictionMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			this.alertService.clear();
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("SHIPPING_JURISDICTIONS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.shippingJurisdictionMainService.clearData();
		this.router.navigate(["shipping-jurisdictions/shipping-jurisdiction-list", {storeId: this.route.snapshot.params.storeId}]);
	}

	save() {
		if (!this.shippingJurisdictionMainService.processing) {
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
					this.shippingJurisdictionMainService.updateShippingJurisdiction().subscribe(response => {
						this.shippingJurisdictionMainService.clearData();
						this.router.navigate(["shipping-jurisdictions/shipping-jurisdiction-list", {storeId: this.route.snapshot.params.storeId}]);
						this.translateService.get("SHIPPING_JURISDICTIONS.SHIPPING_JURISDICTION_SAVED_MESSAGE").subscribe((message: string) => {
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
					this.translateService.get("SHIPPING_JURISDICTIONS.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
