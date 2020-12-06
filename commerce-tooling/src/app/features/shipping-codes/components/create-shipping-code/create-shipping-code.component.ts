/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatStepper } from "@angular/material/stepper";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { ShippingCodeMainService } from "../../services/shipping-code-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./create-shipping-code.component.html",
	styleUrls: ["./create-shipping-code.component.scss"]
})
export class CreateShippingCodeComponent implements OnInit, OnDestroy {
	onSelectProductsOrCategoriesSubscription: Subscription = null;
	productsOrCategories = null;
	selectedStep = 0;
	@ViewChild("stepper") stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private shippingCodeMainService: ShippingCodeMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	ngOnInit() {
		this.onSelectProductsOrCategoriesSubscription = this.shippingCodeMainService.onSelectProductsOrCategories.subscribe(() => {
			this.productsOrCategories = this.shippingCodeMainService.shippingCodeData.productsOrCategories;
		});
		this.productsOrCategories = this.shippingCodeMainService.shippingCodeData ?
				this.shippingCodeMainService.shippingCodeData.productsOrCategories : null;
		if (this.route.snapshot.params.step && this.productsOrCategories) {
			this.selectedStep = Number(this.route.snapshot.params.step);
		}
	}

	ngOnDestroy() {
		if (this.onSelectProductsOrCategoriesSubscription) {
			this.onSelectProductsOrCategoriesSubscription.unsubscribe();
		}
	}

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
					const {
						shippingCodeData: {productsOrCategories},
						selectedCategories,
						selectedProducts
					} = this.shippingCodeMainService;
					const isSelectionAvailableToSave = selectedCategories?.length > 0 || selectedProducts?.length > 0;
					const allowSave = productsOrCategories === "specificProducts" ? isSelectionAvailableToSave : true;
					if (allowSave) {
						this.shippingCodeMainService.createShippingCode().subscribe(name => {
							this.shippingCodeMainService.clearData();
							this.router.navigate(["shipping-codes", "shipping-code-list", {storeId: this.route.snapshot.params.storeId}]);
							this.translateService.get("SHIPPING_CODES.SHIPPING_CODE_CREATED_MESSAGE", {name}).subscribe((message: string) => {
								this.alertService.success({message});
							});
						});
					} else {
						this.translateService.get("SHIPPING_CODES.CATEGORY_OR_PRODUCT_NOT_SELECTED").subscribe((message: string) => {
							this.alertService.error({message, clear: true});
						});
					}
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
