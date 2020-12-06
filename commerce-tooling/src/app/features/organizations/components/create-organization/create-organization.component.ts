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
import { ApiErrorService } from "../../../../services/api-error.service";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper } from "@angular/material/stepper";

@Component({
	templateUrl: "./create-organization.component.html",
	styleUrls: ["./create-organization.component.scss"]
})
export class CreateOrganizationComponent {
	@ViewChild("stepper") stepper: MatStepper;

	constructor(private router: Router,
			private organizationMainService: OrganizationMainService,
			private alertService: AlertService,
			private apiErrorService: ApiErrorService,
			private translateService: TranslateService) { }

	cancel() {
		this.alertService.clear();
		this.organizationMainService.clearData();
		this.router.navigate(["organizations"]);
	}

	submit() {
		if (!this.organizationMainService.processing) {
			this.alertService.clear();
			let completedSteps = 0;
			let valid = true;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl) {
					stepControl.markAllAsTouched();
					if (!stepControl.valid) {
						valid = false;
					}
				}
				if (step.completed) {
					completedSteps++;
				}
			});
			if (valid && completedSteps >= 1) {
				this.organizationMainService.createOrganization().subscribe(response => {
					this.organizationMainService.clearData();
					this.router.navigate(["organizations"]);
					this.translateService.get("ORGANIZATIONS.ORGANIZATION_CREATED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
				},
				createErrorResponse => {
					this.apiErrorService.handleError(createErrorResponse, errorResponse => {
						if (errorResponse.error && errorResponse.error.errors) {
							errorResponse.error.errors.forEach((error: { errorMessage: any; errorKey: any; }) => {
								if (error.errorKey === "_ERR_RDN_ALREADY_EXIST") {
									this.translateService.get("ORGANIZATIONS.DUPLICATE_ORGANIZATION").subscribe((message: string) => {
										this.alertService.error({message});
									});
								} else {
									this.alertService.error({message: error.errorMessage});
								}
							});
						} else {
							console.log(errorResponse);
						}
					});
				});
			} else if (!valid) {
				this.translateService.get("ORGANIZATIONS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			} else {
				this.translateService.get("ORGANIZATIONS.NOT_COMPLETE_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
