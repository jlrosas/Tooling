/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { JobsService } from "../../../../rest/services/jobs.service";

@Component({
	templateUrl: "./cancel-job-dialog.component.html",
	styleUrls: ["./cancel-job-dialog.component.scss"]
})
export class CancelJobDialogComponent implements OnInit {
	cancelJobForm: FormGroup;
	jobName: string;
	jobId: string;
	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private jobsService: JobsService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<CancelJobDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.jobName = data.command;
		this.jobId = data.jobId;
	}

	ngOnInit() {
		this.cancelJobForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	cancelJob() {
		if (!this.processing) {
			this.processing = true;
			this.alertService.clear();
			this.jobsService.JobDelete(this.jobId).subscribe(response => {
				this.translateService.get("SCHEDULER.JOB_CANCELED_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
				this.processing = false;
				this.dialogRef.close({ jobCancelled: true });
			},
			errorResponse => {
				this.processing = false;
			});
		}
	}

}
