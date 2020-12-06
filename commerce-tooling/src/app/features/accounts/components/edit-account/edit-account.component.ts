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
import { AccountMainService } from "../../services/account-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./edit-account.component.html",
	styleUrls: ["./edit-account.component.scss"]
})
export class EditAccountComponent {
	@ViewChild("stepper") stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private accountMainService: AccountMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("ACCOUNTS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.accountMainService.clearData();
		this.router.navigate(["accounts/account-list", {storeId: this.route.snapshot.params.storeId}]);
	}

	save() {
		if (!this.accountMainService.processing) {
			this.alertService.clear();
			let valid = true;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl && !step.stepControl.valid) {
					valid = false;
				}
			});
			if (valid) {
				this.accountMainService.updateAccount().subscribe(response => {
					this.accountMainService.clearData();
					this.router.navigate(["accounts/account-list", {storeId: this.route.snapshot.params.storeId}]);
					this.translateService.get("ACCOUNTS.ACCOUNT_SAVED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
				});
			} else {
				this.translateService.get("ACCOUNTS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
