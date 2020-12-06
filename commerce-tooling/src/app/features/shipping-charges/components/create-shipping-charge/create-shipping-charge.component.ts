/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatStepper } from "@angular/material/stepper";
import { TranslateService } from "@ngx-translate/core";
import { ShippingChargeMainService } from "../../services/shipping-charge-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./create-shipping-charge.component.html",
	styleUrls: ["./create-shipping-charge.component.scss"]
})
export class CreateShippingChargeComponent implements OnInit {
	@ViewChild("stepper") stepper: MatStepper;

	shippingCodeId: string;
	storeId: string;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private shippingChargeMainService: ShippingChargeMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	ngOnInit() {
		this.shippingCodeId = this.route.snapshot.params.shippingCodeId;
		this.storeId = this.route.snapshot.params.storeId;
	}

	cancel() {
		this.alertService.clear();
		this.shippingChargeMainService.clearData();
		this.router.navigate(["shipping-charges", "shipping-charge-list", {
			storeId: this.storeId,
			shippingCodeId: this.shippingCodeId
		}]);
	}

	submit() {
		if (!this.shippingChargeMainService.processing) {
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
				if (valid && completedMandatorySteps >= 1) {
					if (!this.shippingChargeMainService.ranges || this.shippingChargeMainService.ranges.length === 0) {
						this.translateService.get("SHIPPING_CHARGES.NO_RANGES_ERROR").subscribe((message: string) => {
							this.alertService.error({message, clear: true});
						});
					} else {
						this.shippingChargeMainService.createShippingCharge().subscribe(name => {
							this.shippingChargeMainService.clearData();
							this.router.navigate(["shipping-charges", "shipping-charge-list", {
								storeId: this.storeId,
								shippingCodeId: this.shippingCodeId
							}]);
							this.translateService.get("SHIPPING_CHARGES.SHIPPING_CHARGE_CREATED_MESSAGE", {name})
									.subscribe((message: string) => {
								this.alertService.success({message});
							});
						});
					}
				} else if (!valid) {
					this.translateService.get("SHIPPING_CHARGES.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				} else {
					this.translateService.get("SHIPPING_CHARGES.NOT_COMPLETE_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
