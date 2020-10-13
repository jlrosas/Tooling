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
import { ExtendedSiteMainService } from "../../services/extended-site-main.service";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper } from "@angular/material/stepper";
import { ApiErrorService } from "../../../../services/api-error.service";

@Component({
	templateUrl: "./create-extended-site.component.html",
	styleUrls: ["./create-extended-site.component.scss"]
})
export class CreateExtendedSiteComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private extendedSiteMainService: ExtendedSiteMainService,
			private alertService: AlertService,
			private apiErrorService: ApiErrorService,
			private translateService: TranslateService) { }

	cancel() {
		this.alertService.clear();
		this.extendedSiteMainService.clearData();
		this.router.navigate(["extended-sites"]);
	}

	submit() {
		if (!this.extendedSiteMainService.processing) {
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
				const hubStoreId = Number(this.route.snapshot.params.storeId);
				this.extendedSiteMainService.createExtendedSite(hubStoreId).subscribe(response => {
					this.extendedSiteMainService.clearData();
					this.router.navigate(["extended-sites"]);
					this.translateService.get("EXTENDED_SITES.STORE_CREATED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
				},
				createErrorResponse => {
					this.apiErrorService.handleError(createErrorResponse, errorResponse => {
						if (errorResponse.error && errorResponse.error.errors) {
							errorResponse.error.errors.forEach(error => {
								if (error.errorKey === "_ERR_CONTRACT_SYS_GENERIC") {
									this.translateService.get("EXTENDED_SITES.DUPLICATE_EXTENDED_SITE").subscribe((message: string) => {
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
				this.translateService.get("EXTENDED_SITES.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			} else {
				this.translateService.get("EXTENDED_SITES.NOT_COMPLETE_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
