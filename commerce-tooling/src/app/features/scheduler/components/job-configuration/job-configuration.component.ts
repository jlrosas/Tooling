/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { AlertService } from "../../../../services/alert.service";
import { JobMainService } from "../../services/job-main.service";

@Component({
	templateUrl: "./job-configuration.component.html",
	styleUrls: ["./job-configuration.component.scss"],
	selector: "hc-job-configuration"
})
export class JobConfigurationComponent implements OnInit, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	configurationForm: any;
	associatedUserFormControl: FormControl;
	allowedHostFormControl: FormControl;
	intervalFormControl: FormControl;
	attemptsFormControl: FormControl;
	retrySecondsFormControl: FormControl;
	priorityFormControl: FormControl;

	applicationType = null;
	attempts = null;

	priorityList: Array<any> = [
		{
			value: 1
		},
		{
			value: 2
		},
		{
			value: 3
		},
		{
			value: 4
		},
		{
			value: 5
		},
		{
			value: 6
		},
		{
			value: 7
		},
		{
			value: 8
		},
		{
			value: 9
		},
		{
			value: 10
		}
	];

	@ViewChild("associatedUserInput") associatedUserInput: ElementRef<HTMLInputElement>;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private translateService: TranslateService,
			private alertService: AlertService,
			private jobMainService: JobMainService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();

		if (this.mode === "edit") {
			this.setValues();
		} else {
			if (this.jobMainService.jobData !== null) {
				const jobData = this.jobMainService.jobData;
				this.associatedUserFormControl.setValue(jobData.userId);
				this.allowedHostFormControl.setValue(jobData.host);
				this.intervalFormControl.setValue(jobData.interval);
				this.attemptsFormControl.setValue(jobData.retryAttempts);
				this.retrySecondsFormControl.setValue(jobData.retryDelay);
				if (jobData.sequence) {
					this.priorityFormControl.setValue(jobData.sequence);
				} else {
					this.priorityFormControl.setValue(this.priorityList[4].value);
					this.selectPriority(this.priorityList[4].value);
				}
				if (jobData.applicationType) {
					this.applicationType = jobData.applicationType;
				}
			} else {
				this.priorityFormControl.setValue(this.priorityList[4].value);
				this.selectPriority(this.priorityList[4].value);
			}
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.configurationForm;
		setTimeout(() => {
			this.associatedUserInput.nativeElement.focus();
		}, 250);
	}

	triggerSave() {
		this.configurationForm.markAllAsTouched();
		this.alertService.clear();
		if (this.configurationForm.valid) {
			this.save.emit(null);
		} else {
			this.translateService.get("SCHEDULER.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message, clear: true});
			});
		}
	}

	validateAssociatedUser() {
		this.jobMainService.jobData.associatedUser = this.associatedUserFormControl.value;
	}

	validateAllowedHost() {
		this.jobMainService.jobData.host = this.allowedHostFormControl.value;
	}

	validateInterval() {
		this.jobMainService.jobData.interval = this.intervalFormControl.value;
	}

	validateAttempts() {
		this.jobMainService.jobData.retryAttempts = this.attemptsFormControl.value;
		if (this.attemptsFormControl.value) {
			this.attempts = this.attemptsFormControl.value;
		} else {
			this.attempts = null;
		}
	}

	validateRetrySeconds() {
		this.jobMainService.jobData.retryDelay = this.retrySecondsFormControl.value;
	}

	selectPriority(priority: number) {
		this.jobMainService.jobData.priority = priority;
	}

	private createFormControls() {
		this.associatedUserFormControl = new FormControl("");
		this.allowedHostFormControl = new FormControl("");
		this.intervalFormControl = new FormControl("");
		this.attemptsFormControl = new FormControl("");
		this.retrySecondsFormControl = new FormControl("");
		this.priorityFormControl = new FormControl("");
	}

	private createForm() {
		this.configurationForm = new FormGroup({
			associatedUserFormControl: this.associatedUserFormControl,
			allowedHostFormControl: this.allowedHostFormControl,
			intervalFormControl: this.intervalFormControl,
			attemptsFormControl: this.attemptsFormControl,
			retrySecondsFormControl: this.retrySecondsFormControl,
			priorityFormControl: this.priorityFormControl
		});
	}

	private setValues() {
		const jobData = this.jobMainService.jobData;
		if (jobData.applicationType) {
			this.applicationType = jobData.applicationType;
		}
		this.associatedUserFormControl.setValue(jobData.userId);
		this.allowedHostFormControl.setValue(jobData.host);
		this.intervalFormControl.setValue(jobData.interval);
		this.attemptsFormControl.setValue(jobData.retryAttempts);
		this.attempts = jobData.retryAttempts;
		this.retrySecondsFormControl.setValue(jobData.retryDelay);
		this.priorityFormControl.setValue(jobData.priority);
	}
}
