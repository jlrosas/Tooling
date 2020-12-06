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
import { MessageTypeMainService } from "../../services/message-type-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./create-message-type.component.html",
	styleUrls: ["./create-message-type.component.scss"]
})
export class CreateMessageTypeComponent {
	@ViewChild("stepper") stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private messageTypeMainService: MessageTypeMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	cancel() {
		this.alertService.clear();
		this.messageTypeMainService.clearData();
		this.router.navigate(["message-types", "message-type-list", {paramId: this.route.snapshot.params.paramId}]);
	}

	submit() {
		if (!this.messageTypeMainService.processing) {
			this.alertService.clear();
			let completedMandatorySteps = 0;
			let valid = true;
			let errors = null;
			let pending = false;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl) {
					stepControl.markAllAsTouched();
					if (!stepControl.valid) {
						valid = false;
						errors = stepControl.errors;
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
					this.messageTypeMainService.createMessageType().subscribe(response => {
						this.messageTypeMainService.clearData();
						this.router.navigate(["message-types", "message-type-list", {paramId: this.route.snapshot.params.paramId}]);
						this.translateService.get("MESSAGE_TYPES.MESSAGE_TYPE_CREATED_MESSAGE").subscribe((message: string) => {
							this.alertService.success({message});
						});
					});
				} else if (!valid) {
					if (errors && errors.duplicateProfile) {
						this.translateService.get("MESSAGE_TYPES.DUPLICATE_PROFILE").subscribe((message: string) => {
							this.alertService.error({message, clear: true});
						});
					} else {
						this.translateService.get("MESSAGE_TYPES.INPUT_ERROR").subscribe((message: string) => {
							this.alertService.error({message, clear: true});
						});
					}
				} else {
					this.translateService.get("MESSAGE_TYPES.NOT_COMPLETE_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
