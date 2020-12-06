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
import { MessageTypeMainService } from "../../services/message-type-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./edit-message-type.component.html",
	styleUrls: ["./edit-message-type.component.scss"]
})
export class EditMessageTypeComponent {
	@ViewChild("stepper") stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private messageTypeMainService: MessageTypeMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			this.alertService.clear();
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl) {
				 const valid = previousStepControl.valid;
				 const pending = previousStepControl.pending;
				 if (pending) {
					const statusChangesSubscription = previousStepControl.statusChanges.subscribe(statusChange => {
						statusChangesSubscription.unsubscribe();
						this.handleSelectionChange($event);
					});
				} else if (!valid) {
					const errors = previousStepControl.errors;
					if (errors && errors.duplicateProfile) {
						this.translateService.get("MESSAGE_TYPES.DUPLICATE_PROFILE").subscribe((message: string) => {
							this.alertService.error({message, clear: true});
						});
					} else {
						this.translateService.get("MESSAGE_TYPES.INPUT_ERROR").subscribe((message: string) => {
							this.alertService.error({message, clear: true});
						});
					}
				}
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.messageTypeMainService.clearData();
		this.router.navigate(["message-types/message-type-list", {paramId: this.route.snapshot.params.paramId}]);
	}

	save() {
		if (!this.messageTypeMainService.processing) {
			this.alertService.clear();
			let valid = true;
			let errors = null;
			let pending = false;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl) {
					if (!stepControl.valid) {
						valid = false;
						errors = stepControl.errors;
					}
					if (step.stepControl.pending) {
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
					this.messageTypeMainService.updateMessageType().subscribe(response => {
						this.messageTypeMainService.clearData();
						this.router.navigate(["message-types/message-type-list", {paramId: this.route.snapshot.params.paramId}]);
						this.translateService.get("MESSAGE_TYPES.MESSAGE_TYPE_SAVED_MESSAGE").subscribe((message: string) => {
							this.alertService.success({message});
						});
					});
				} else {
					if (errors && errors.duplicateProfile) {
						this.translateService.get("MESSAGE_TYPES.DUPLICATE_PROFILE").subscribe((message: string) => {
							this.alertService.error({message, clear: true});
						});
					} else {
						this.translateService.get("MESSAGE_TYPES.INPUT_ERROR").subscribe((message: string) => {
							this.alertService.error({message, clear: true});
						});
					}
				}
			}
		}
	}
}
