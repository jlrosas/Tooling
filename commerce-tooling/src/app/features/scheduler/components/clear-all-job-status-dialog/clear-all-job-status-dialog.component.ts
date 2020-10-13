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
	templateUrl: "./clear-all-job-status-dialog.component.html",
	styleUrls: ["./clear-all-job-status-dialog.component.scss"]
})
export class ClearAllJobStatusDialogComponent implements OnInit {
	clearJobForm: FormGroup;
	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private jobsStatusesService: JobsStatusesService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<ClearAllJobStatusDialogComponent>) {
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

	clearAllJobStatus() {
		if (!this.processing) {
			this.processing = true;
			this.alertService.clear();
			const endDate = new Date();
			// Delete job status records up to 1 year ahead, to get
			// rid of all previously completed job run job status records
			const endDateString =
				(endDate.getFullYear() + 1) + "-" +
				(endDate.getMonth() + 1) + "-" +
				endDate.getDate() + "T" +
				endDate.getHours() + ":" +
				endDate.getMinutes() + ":" +
				endDate.getSeconds();
			const args: JobsStatusesService.JobStatusesDeleteParams = {
				ContentType: "application/json",
				storeId: 0,
				endTime: endDateString
			};
			this.jobsStatusesService.JobStatusesDelete(args).subscribe(response => {
				this.processing = false;
				this.translateService.get("SCHEDULER.ALL_JOB_STATUS_REMOVED_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
				this.dialogRef.close({ jobStatusAllCleared: true });
			},
			errorResponse => {
				this.processing = false;
			});
		}
	}

}
