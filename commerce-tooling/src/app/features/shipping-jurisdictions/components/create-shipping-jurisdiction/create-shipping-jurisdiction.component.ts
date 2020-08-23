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
import { ShippingJurisdictionMainService } from "../../services/shipping-jurisdiction-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./create-shipping-jurisdiction.component.html",
	styleUrls: ["./create-shipping-jurisdiction.component.scss"]
})
export class CreateShippingJurisdictionComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private shippingJurisdictionMainService: ShippingJurisdictionMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	cancel() {
		this.alertService.clear();
		this.shippingJurisdictionMainService.clearData();
		this.router.navigate(["shipping-jurisdictions", "shipping-jurisdiction-list", {storeId: this.route.snapshot.params.storeId}]);
	}

	submit() {
		if (!this.shippingJurisdictionMainService.processing) {
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
					this.shippingJurisdictionMainService.createShippingJurisdiction().subscribe(name => {
						this.shippingJurisdictionMainService.clearData();
						this.router.navigate(["shipping-jurisdictions", "shipping-jurisdiction-list", {storeId: this.route.snapshot.params.storeId}]);
						this.translateService.get("SHIPPING_JURISDICTIONS.SHIPPING_JURISDICTION_CREATED_MESSAGE", {name}).
								subscribe((message: string) => {
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
					this.translateService.get("SHIPPING_JURISDICTIONS.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				} else {
					this.translateService.get("SHIPPING_JURISDICTIONS.NOT_COMPLETE_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
