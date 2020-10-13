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
import { SecurityPoliciesMainService } from "../../services/security-policies-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./edit-security-policy.component.html",
	styleUrls: ["./edit-security-policy.component.scss"]
})
export class EditSecurityPoliciesComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private securityPoliciesMainService: SecurityPoliciesMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			this.alertService.clear();
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("SECURITY_POLICIES.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.securityPoliciesMainService.clearData();
		this.router.navigate(["security-policies", "security-policy-list"]);
	}

	save() {
		if (!this.securityPoliciesMainService.processing) {
			this.alertService.clear();
			let valid = true;
			let pending = false;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl) {
					if (!step.stepControl.valid) {
						valid = false;
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
					this.securityPoliciesMainService.updateUserAccountPolicy().subscribe(response => {
						this.securityPoliciesMainService.clearData();
						this.router.navigate(["security-policies", "security-policy-list"]);
						this.translateService.get("SECURITY_POLICIES.SECURITY_POLICY_SAVED_MESSAGE").subscribe((message: string) => {
							this.alertService.success({message});
						});
					});
				} else {
					this.translateService.get("SECURITY_POLICIES.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
