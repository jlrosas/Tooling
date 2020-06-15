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
import { AccountMainService } from "../../services/account-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./create-account.component.html",
	styleUrls: ["./create-account.component.scss"]
})
export class CreatAccountComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private accountMainService: AccountMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	cancel() {
		this.alertService.clear();
		this.accountMainService.clearData();
		this.router.navigate(["accounts", "account-list", {storeId: this.route.snapshot.params.storeId}]);
	}

	submit() {
		if (!this.accountMainService.processing) {
			this.alertService.clear();
			let completedMandatorySteps = 0;
			let valid = true;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl) {
					stepControl.markAllAsTouched();
					if (!stepControl.valid) {
						valid = false;
					}
				}
				if (!step.optional && step.completed) {
					completedMandatorySteps++;
				}
			});
			if (valid && completedMandatorySteps >= 0) {
				this.accountMainService.createAccount().subscribe(response => {
					this.accountMainService.clearData();
					this.router.navigate(["accounts", "account-list", {storeId: this.route.snapshot.params.storeId}]);
					this.translateService.get("ACCOUNTS.ACCOUNT_CREATED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
				},
				errorResponse => {
					if (errorResponse.error && errorResponse.error.errors) {
						errorResponse.error.errors.forEach((error: { errorMessage: any; }) => {
							this.alertService.error({message: error.errorMessage});
						});
					} else {
						console.log(errorResponse);
					}
				});
			} else if (!valid) {
				this.translateService.get("ACCOUNTS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			} else {
				this.translateService.get("ACCOUNTS.NOT_COMPLETE_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
