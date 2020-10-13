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
import { SecurityPoliciesMainService } from "../../services/security-policies-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./create-security-policy.component.html",
	styleUrls: ["./create-security-policy.component.scss"]
})
export class CreateSecurityPoliciesComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private securityPoliciesMainService: SecurityPoliciesMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	cancel() {
		this.alertService.clear();
		this.securityPoliciesMainService.clearData();
		this.router.navigate(["security-policies", "security-policy-list"]);
	}

	submit() {
		if (!this.securityPoliciesMainService.processing) {
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
					this.securityPoliciesMainService.createUserAccountPolicy().subscribe(response => {
						this.securityPoliciesMainService.clearData();
						this.router.navigate(["security-policies", "security-policy-list"]);
						this.translateService.get("SECURITY_POLICIES.SECURITY_POLICY_CREATED_MESSAGE").subscribe((message: string) => {
							this.alertService.success({message});
						});
					});
				} else if (!valid) {
					this.translateService.get("SECURITY_POLICIES.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				} else {
					this.translateService.get("SECURITY_POLICIES.NOT_COMPLETE_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
