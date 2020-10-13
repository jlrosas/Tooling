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
import { ShippingCodeMainService } from "../../services/shipping-code-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./create-shipping-code.component.html",
	styleUrls: ["./create-shipping-code.component.scss"]
})
export class CreateShippingCodeComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private shippingCodeMainService: ShippingCodeMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	cancel() {
		this.alertService.clear();
		this.shippingCodeMainService.clearData();
		this.router.navigate(["shipping-codes", "shipping-code-list", {storeId: this.route.snapshot.params.storeId}]);
	}

	submit() {
		if (!this.shippingCodeMainService.processing) {
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
					this.shippingCodeMainService.createShippingCode().subscribe(name => {
						this.shippingCodeMainService.clearData();
						this.router.navigate(["shipping-codes", "shipping-code-list", {storeId: this.route.snapshot.params.storeId}]);
						this.translateService.get("SHIPPING_CODES.SHIPPING_CODE_CREATED_MESSAGE", {name}).subscribe((message: string) => {
							this.alertService.success({message});
						});
					});
				} else if (!valid) {
					this.translateService.get("SHIPPING_CODES.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				} else {
					this.translateService.get("SHIPPING_CODES.NOT_COMPLETE_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
