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
import { ShippingModeMainService } from "../../services/shipping-mode-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./edit-shipping-mode.component.html",
	styleUrls: ["./edit-shipping-mode.component.scss"]
})
export class EditShippingModeComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private shippingModeMainService: ShippingModeMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			this.alertService.clear();
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("SHIPPING_MODES.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.shippingModeMainService.clearData();
		this.router.navigate(["shipping-modes/shipping-mode-list", {storeId: this.route.snapshot.params.storeId}]);
	}

	save() {
		if (!this.shippingModeMainService.processing) {
			this.alertService.clear();
			let valid = true;
			let pending = false;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl) {
					if (!stepControl.valid) {
						valid = false;
					}
					if (stepControl.pending) {
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
					this.shippingModeMainService.updateShippingMode().subscribe(response => {
						this.shippingModeMainService.clearData();
						this.router.navigate(["shipping-modes/shipping-mode-list", {storeId: this.route.snapshot.params.storeId}]);
						this.translateService.get("SHIPPING_MODES.SHIPPING_MODE_SAVED_MESSAGE").subscribe((message: string) => {
							this.alertService.success({message});
						});
					});
				} else {
					this.translateService.get("SHIPPING_MODES.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
