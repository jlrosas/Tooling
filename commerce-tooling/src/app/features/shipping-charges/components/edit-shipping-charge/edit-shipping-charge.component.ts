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
import { ShippingChargeMainService } from "../../services/shipping-charge-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./edit-shipping-charge.component.html",
	styleUrls: ["./edit-shipping-charge.component.scss"]
})
export class EditShippingChargeComponent {
	@ViewChild("stepper") stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private shippingChargeMainService: ShippingChargeMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("SHIPPING_CHARGES.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.shippingChargeMainService.clearData();
		this.router.navigate(["shipping-charges", "shipping-charge-list", {
			storeId: this.route.snapshot.params.storeId,
			shippingCodeId: this.route.snapshot.params.shippingCodeId
		}]);
	}

	save() {
		if (!this.shippingChargeMainService.processing) {
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
					this.shippingChargeMainService.updateShippingCharge().subscribe(response => {
						this.shippingChargeMainService.clearData();
						this.router.navigate(["shipping-charges", "shipping-charge-list", {
							storeId: this.route.snapshot.params.storeId,
							shippingCodeId: this.route.snapshot.params.shippingCodeId
						}]);
						this.translateService.get("SHIPPING_CHARGES.SHIPPING_CHARGE_SAVED_MESSAGE").subscribe((message: string) => {
							this.alertService.success({message});
						});
					});
				} else {
					this.translateService.get("SHIPPING_CHARGES.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
