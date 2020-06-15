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
import { Router, ActivatedRoute } from "@angular/router";
import { MessageMainService } from "../../services/message-main.service";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper } from "@angular/material/stepper";

@Component({
	templateUrl: "./resend-message.component.html",
	styleUrls: ["./resend-message.component.scss"]
})
export class ResendMessageComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private messageMainService: MessageMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	cancel() {
		this.alertService.clear();
		this.messageMainService.clearData();
		this.router.navigate(["/messages", {archived: this.route.snapshot.params.archived}]);
	}

	submit() {
		if (!this.messageMainService.processing) {
			this.alertService.clear();
			let completedSteps = 0;
			let valid = true;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl && !step.stepControl.valid) {
					valid = false;
				}
				if (step.completed) {
					completedSteps++;
				}
			});
			if (valid && completedSteps >= 1) {
				this.messageMainService.resendMessage().subscribe(response => {
					this.messageMainService.clearData();
					this.router.navigate(["/messages", {archived: this.route.snapshot.params.archived}]);
					this.translateService.get("MESSAGES.MESSAGE_SENT_MESSAGE").subscribe((message: string) => {
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
				this.translateService.get("MESSAGES.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			} else {
				this.translateService.get("MESSAGES.NOT_COMPLETE_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
