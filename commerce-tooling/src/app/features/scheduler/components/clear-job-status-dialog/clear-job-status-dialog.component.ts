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
import { JobsStatusesService } from "../../../../rest/services/jobs-statuses.service";

@Component({
	templateUrl: "./clear-job-status-dialog.component.html",
	styleUrls: ["./clear-job-status-dialog.component.scss"]
})
export class ClearJobStatusDialogComponent implements OnInit {
	clearJobForm: FormGroup;
	jobName: string;
	jobId: string;
	jobEndDate: string;
	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private jobsStatusesService: JobsStatusesService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<ClearJobStatusDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.jobName = data.command;
		this.jobId = data.jobId;
		this.jobEndDate = data.end;
	}

	ngOnInit() {
		this.clearJobForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	clearJobStatus() {
		if (!this.processing) {
			this.processing = true;
			this.alertService.clear();
			const endDate = new Date(this.jobEndDate);
			// Delete job status records with this job ID and 1 second ahead, to get
			// rid of selected job status record
			const endDateString =
				endDate.getFullYear() + "-" +
				(endDate.getMonth() + 1) + "-" +
				endDate.getDate() + "T" +
				endDate.getHours() + ":" +
				endDate.getMinutes() + ":" +
				(endDate.getSeconds() + 1);
			const args: JobsStatusesService.JobStatusesByJobIdDeleteParams = {
				ContentType: "application/json",
				storeId: 0,
				id: this.jobId,
				endTime: endDateString
			};
			this.jobsStatusesService.JobStatusesByJobIdDelete(args).subscribe(response => {
				this.processing = false;
				this.translateService.get("SCHEDULER.JOB_STATUS_REMOVED_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
				this.dialogRef.close({ jobStatusCleared: true });
			},
			errorResponse => {
				this.processing = false;
				if (errorResponse.error && errorResponse.error.errors) {
					errorResponse.error.errors.forEach(error => {
						this.alertService.error({message: error.errorMessage});
					});
				} else {
					console.log(errorResponse);
				}
			});
		}
	}

}
