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
import { OrganizationMainService } from "../../services/organization-main.service";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper } from "@angular/material/stepper";

@Component({
	templateUrl: "./edit-organization.component.html",
	styleUrls: ["./edit-organization.component.scss"]
})
export class EditOrganizationComponent {
	@ViewChild("stepper") stepper: MatStepper;

	constructor(private router: Router,
			private organizationMainService: OrganizationMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("ORGANIZATIONS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.organizationMainService.clearData();
		this.router.navigate(["organizations"]);
	}

	save() {
		if (!this.organizationMainService.processing) {
			this.alertService.clear();
			let valid = true;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl && !step.stepControl.valid) {
					valid = false;
				}
			});
			if (valid) {
				this.organizationMainService.updateOrganization().subscribe(response => {
					this.organizationMainService.clearData();
					this.router.navigate(["organizations"]);
					this.translateService.get("ORGANIZATIONS.ORGANIZATION_SAVED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
				});
			} else {
				this.translateService.get("ORGANIZATIONS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
