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
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper } from "@angular/material/stepper";
import { JobMainService } from "../../services/job-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./edit-job.component.html",
	styleUrls: ["./edit-job.component.scss"]
})
export class EditJobComponent implements OnInit, OnDestroy {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	applicationType: string = null;
	onApplicationTypeChangeSubscription: Subscription = null;

	constructor(private router: Router,
			private route: ActivatedRoute,
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

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("SCHEDULER.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.jobMainService.clearData();
		this.router.navigate(["scheduler", "scheduled-job-list"]);
	}

	save() {
		if (!this.jobMainService.processing) {
			this.alertService.clear();
			let valid = true;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl && !step.stepControl.valid) {
					valid = false;
				}
			});
			if (valid) {
				this.jobMainService.newVersionJob(this.route.snapshot.params.id).subscribe(response => {
					this.jobMainService.clearData();
					this.router.navigate(["scheduler/scheduled-job-list"]);
					this.translateService.get("SCHEDULER.JOB_SAVED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
				});
			} else {
				this.translateService.get("SCHEDULER.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
