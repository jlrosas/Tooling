/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { AlertService } from "../../../../services/alert.service";
import { Subscription } from "rxjs";
import { JobMainService } from "../../services/job-main.service";

@Component({
	templateUrl: "./job-schedule.component.html",
	styleUrls: ["./job-schedule.component.scss"],
	selector: "hc-job-schedule"
})
export class JobScheduleComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: any;
	startTimeFormControl: FormControl;
	startDatePicker: FormControl;
	policyFormControl: FormControl;

	isLinear = true;

	applicationType = null;
	startDate = null;
	startTime = null;
	fixedTime = 0;
	policy = null;

	policyList: Array<any> = [
		{
			name: "SCHEDULER.RUN_ONCE",
			value: 0
		},
		{
			name: "SCHEDULER.RECOVER_RUNS",
			value: 1
		}
	];

	constructor(private translateService: TranslateService,
			private jobMainService: JobMainService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.setValues();
		} else {
			if (this.jobMainService.jobData === null) {
				this.jobMainService.jobData = {
					storeId: 0
				};
			}
			const jobData = this.jobMainService.jobData;

			// Set start date and time to previously selected, or todays date
			let startDate = null;
			if (jobData.startDate) {
				startDate = new Date(jobData.startDate);
			} else {
				startDate = new Date();
			}
			const startDateLocaleDate = new Date(startDate.toLocaleString());
			this.startDatePicker.setValue(startDateLocaleDate);
			this.selectStartDate(startDateLocaleDate.toLocaleString());

			// Start time
			if (jobData.startTime) {
				this.startTimeFormControl.setValue(jobData.startTime);
			} else {
				// Start time
				let hours: any = startDateLocaleDate.getHours();
				if (hours < 10) {
					hours = "0" + hours;
				}
				let minutes: any = startDateLocaleDate.getMinutes();
				if (minutes < 10) {
					minutes = "0" + minutes;
				}
				const startTime = hours + ":" + minutes;
				this.startTimeFormControl.setValue(startTime);
				this.validateStartTime();
			}

			// Set job policy
			if (jobData.sequence === 0) {
				this.policyFormControl.setValue(this.policyList[0]);
				this.policy = 0;
			} else if (jobData.sequence === 1) {
				this.policyFormControl.setValue(this.policyList[1]);
				this.policy = 1;
			} else {
				this.policyFormControl.setValue(this.policyList[0]);
				this.policy = 0;
				jobData.sequence = 0;
			}

			// Set application type
			if (jobData.applicationType) {
				this.applicationType = jobData.applicationType;
			}

			// Fixed time
			if (jobData.fixedTime) {
				this.fixedTime = jobData.fixedTime;
			}
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
	}

	ngOnDestroy() {
	}

	next() {
		this.detailsForm.markAllAsTouched();
		this.alertService.clear();
		if (this.detailsForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("SCHEDULER.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message, clear: true});
			});
		}
	}

	triggerSave() {
		this.detailsForm.markAllAsTouched();
		this.alertService.clear();
		if (this.detailsForm.valid) {
			this.save.emit(null);
		} else {
			this.translateService.get("SCHEDULER.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message, clear: true});
			});
		}
	}

	selectStartDate(startDate: string) {
		this.startDate = startDate;
		this.jobMainService.jobData.preferredStartDateTime = this.startDate;
	}

	validateStartTime() {
		this.jobMainService.jobData.startTime = this.startTimeFormControl.value;
	}

	validateFixedTime(e: any) {
		if (e.checked) {
			this.fixedTime = 1;
		} else {
			this.fixedTime = 0;
		}
		this.jobMainService.jobData.fixedTime = this.fixedTime;
	}

	selectPolicy(policy: any) {
		this.policy = policy.value;
		this.jobMainService.jobData.sequence = this.policy;
	}

	private createFormControls() {
		this.startTimeFormControl = new FormControl("");
		this.startDatePicker = new FormControl("");
		this.policyFormControl = new FormControl("");
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			startTimeFormControl: this.startTimeFormControl,
			startDatePicker: this.startDatePicker,
			policyFormControl: this.policyFormControl
		});
	}

	private setValues() {

		const jobData = this.jobMainService.jobData;

		// Start date
		if (jobData.startDate) {
			this.startDatePicker.setValue(jobData.startDate);

			const startDate = new Date(jobData.startDate);
			const startDateLocaleDate = new Date(startDate.toLocaleString());

			// Start time
			let hours: any = startDateLocaleDate.getHours();
			if (hours < 10) {
				hours = "0" + hours;
			}
			let minutes: any = startDateLocaleDate.getMinutes();
			if (minutes < 10) {
				minutes = "0" + minutes;
			}
			const startTime = hours + ":" + minutes;
			this.startTimeFormControl.setValue(startTime);
		}

		// Job policy
		if (jobData.sequence === 0) {
			this.policyFormControl.setValue(this.policyList[0]);
			this.policy = 0;
		} else if (jobData.sequence === 1) {
			this.policyFormControl.setValue(this.policyList[1]);
			this.policy = 1;
		} else {
			this.policyFormControl.setValue(this.policyList[0]);
			this.policy = 0;
			jobData.sequence = 0;
		}

		// Set application type
		if (jobData.applicationType) {
			this.applicationType = jobData.applicationType;
		}

		// Fixed time
		if (jobData.fixedTime) {
			this.fixedTime = jobData.fixedTime;
		}
	}
}
