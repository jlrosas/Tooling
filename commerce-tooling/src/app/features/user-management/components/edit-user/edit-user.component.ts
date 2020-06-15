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
import { Router } from "@angular/router";
import { UserMainService } from "../../services/user-main.service";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper } from "@angular/material/stepper";

@Component({
	templateUrl: "./edit-user.component.html",
	styleUrls: ["./edit-user.component.scss"]
})
export class EditUserComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	constructor(private router: Router,
			private userMainService: UserMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("USER_MANAGEMENT.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.userMainService.clearData();
		this.router.navigate(["/users"]);
	}

	save() {
		if (!this.userMainService.processing) {
			this.alertService.clear();
			let valid = true;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl && !step.stepControl.valid) {
					valid = false;
				}
			});
			if (valid) {
				this.userMainService.updateUser().subscribe(response => {
					this.userMainService.clearData();
					this.router.navigate(["/users"]);
					this.translateService.get("USER_MANAGEMENT.USER_SAVED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
				},
				errorResponse => {
					if (errorResponse.error && errorResponse.error.errors) {
						errorResponse.error.errors.forEach((error: { errorMessage: string; }) => {
							this.alertService.error({message: error.errorMessage});
						});
					} else {
						console.log(errorResponse);
					}
				});
			} else {
				this.translateService.get("USER_MANAGEMENT.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
