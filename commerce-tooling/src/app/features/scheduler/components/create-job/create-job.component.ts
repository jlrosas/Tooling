/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { MatStepper } from "@angular/material/stepper";
import { TranslateService } from "@ngx-translate/core";
import { JobMainService } from "../../services/job-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./create-job.component.html",
	styleUrls: ["./create-job.component.scss"]
})
export class CreateJobComponent implements OnInit, OnDestroy {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	applicationType: string = null;
	onApplicationTypeChangeSubscription: Subscription = null;

	constructor(private router: Router,
		private jobMainService: JobMainService,
		private alertService: AlertService,
		private translateService: TranslateService) { }

	ngOnInit() {
		this.onApplicationTypeChangeSubscription = this.jobMainService.onApplicationTypeChange.subscribe(() => {
			this.applicationType = this.jobMainService.jobData.applicationType;
		});
	}

	ngOnDestroy() {
		if (this.onApplicationTypeChangeSubscription) {
			this.onApplicationTypeChangeSubscription.unsubscribe();
		}
	}

	cancel() {
		this.alertService.clear();
		this.jobMainService.clearData();
		this.router.navigate(["scheduler", "scheduled-job-list"]);
	}

	submit() {
		if (!this.jobMainService.processing) {
			this.alertService.clear();
			let completedSteps = 0;
			let valid = true;
			let stepsToComplete = 1;
			if (this.applicationType === "broadcast") {
				stepsToComplete = 0;
			}
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
			if (valid && completedSteps >= stepsToComplete) {
				this.jobMainService.createJob().subscribe(response => {
					this.jobMainService.clearData();
					this.router.navigate(["scheduler", "scheduled-job-list"]);
					this.translateService.get("SCHEDULER.JOB_CREATED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
				},
				errorResponse => {
					if (errorResponse.error && errorResponse.error.errors) {
						errorResponse.error.errors.forEach(error => {
							this.alertService.error({message: error.errorMessage});
						});
					} else {
						console.log(errorResponse);
					}
				});
			} else if (!valid) {
				this.translateService.get("SCHEDULER.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			} else {
				this.translateService.get("SCHEDULER.NOT_COMPLETE_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
