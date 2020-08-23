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
import { ShippingModeMainService } from "../../services/shipping-mode-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./create-shipping-mode.component.html",
	styleUrls: ["./create-shipping-mode.component.scss"]
})
export class CreateShippingModeComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private shippingModeMainService: ShippingModeMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	cancel() {
		this.alertService.clear();
		this.shippingModeMainService.clearData();
		this.router.navigate(["shipping-modes", "shipping-mode-list", {storeId: this.route.snapshot.params.storeId}]);
	}

	submit() {
		if (!this.shippingModeMainService.processing) {
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
					this.shippingModeMainService.createShippingMode().subscribe(name => {
						this.shippingModeMainService.clearData();
						this.router.navigate(["shipping-modes", "shipping-mode-list", {storeId: this.route.snapshot.params.storeId}]);
						this.translateService.get("SHIPPING_MODES.SHIPPING_MODE_CREATED_MESSAGE", {name: name}).subscribe((message: string) => {
							this.alertService.success({message});
						});
					},
					errorResponse => {
						if (errorResponse.error && errorResponse.error.errors) {
							errorResponse.error.errors.forEach((error: { message: any; }) => {
								this.alertService.error({message: error.message});
							});
						} else {
							console.log(errorResponse);
						}
					});
				} else if (!valid) {
					this.translateService.get("SHIPPING_MODES.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				} else {
					this.translateService.get("SHIPPING_MODES.NOT_COMPLETE_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
