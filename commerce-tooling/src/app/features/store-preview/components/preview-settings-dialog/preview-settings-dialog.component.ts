/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { SegmentService } from "../../../../rest/services/segment.service";

@Component({
	templateUrl: "./preview-settings-dialog.component.html",
	styleUrls: ["./preview-settings-dialog.component.scss"]
})
export class PreviewSettingsDialogComponent implements OnInit {
	previewSettingsForm: FormGroup;
	storeURL: FormControl;
	previewDate: FormControl;
	previewTime: FormControl;
	isTimeElapsing: FormControl;

	customerSegmentList: any[];
	selectedCustomerSegmentList = [];
	showSetting = true;
	private selectedCustomerSegmentIds = new Set();

	constructor(private segmentService: SegmentService,
			private dialogRef: MatDialogRef<PreviewSettingsDialogComponent>,
			@Inject(MAT_DIALOG_DATA) private data: any,
			private datePipe: DatePipe) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		this.storeURL.setValue(this.data.storeURL);
		this.isTimeElapsing.setValue(this.data.isTimeInPreviewElapsing);
		this.populatePreviewDate();
		this.getCustomerSegmentList();
	}

	populatePreviewDate() {
		if (this.data.startDateTime) {
			const date = this.data.startDateTime;
			this.previewDate.setValue(date);
			this.previewTime.setValue(((date.getHours() <= 9) ? "0" : "") + date.getHours() +
						":" + ((date.getMinutes() <= 9) ? "0" : "") + date.getMinutes());
		}
	}

	getCustomerSegmentList(): void {
		const getCustomerSegmentParams: SegmentService.GetCustomerSegmentsParams = {
			storeId: this.data.urlTokens.storeId,
			q: "all"
		};
		this.segmentService.getCustomerSegments(getCustomerSegmentParams).subscribe(result => {
			this.customerSegmentList = result.MemberGroup;
			this.populateSelectedCustomerSegmentList();
		});
	}

	populateSelectedCustomerSegmentList() {
		this.selectedCustomerSegmentList = [];
		const customerSegmentIds = this.data.viewAsCustomerSegmentIds;
		if (customerSegmentIds) {
			const customerSegmentIdList = customerSegmentIds.includes(",") ? customerSegmentIds.split(",") : [ customerSegmentIds ];
			for (const id of customerSegmentIdList) {
				this.selectedCustomerSegmentIds.add(id);
			}
			for (const customerSegment of this.customerSegmentList) {
				if (this.selectedCustomerSegmentIds.has(customerSegment.id)) {
					customerSegment.isChecked = true;
					this.selectedCustomerSegmentList.push(customerSegment);
				} else {
					customerSegment.isChecked = false;
				}
			}
		}
	}

	cancel(): void {
		this.dialogRef.close();
	}

	changeCustomerSegment(customerSegment: any, $event) {
		if ($event.checked) {
			this.selectedCustomerSegmentIds.add(customerSegment.id);
			customerSegment.isChecked = true;
		} else {
			this.selectedCustomerSegmentIds.delete(customerSegment.id);
			customerSegment.isChecked = false;
		}
		this.selectedCustomerSegmentList = [];
		for (const segment of this.customerSegmentList) {
			if (this.selectedCustomerSegmentIds.has(segment.id)) {
				this.selectedCustomerSegmentList.push(segment);
			}
		}
	}

	applySettings() {
		this.data.storeURL = this.storeURL.value;
		if (this.previewDate.value) {
			const date = this.previewDate.value;
			if (this.previewTime.value && this.previewTime.value.includes(":")) {
				const timeArray = this.previewTime.value.split(":");
				const hour = parseInt(timeArray[0], 10);
				const minute = parseInt(timeArray[1], 10);
				date.setHours(hour, minute, 0);
			}
			this.data.startDateTime = date;
		} else {
			this.data.startDateTime = null;
		}
		this.data.isTimeInPreviewElapsing = this.isTimeElapsing.value;
		let customerSegmentIds = "";
		for (const customerSegment of this.selectedCustomerSegmentList) {
			if (customerSegmentIds) {
				customerSegmentIds += ",";
			}
			customerSegmentIds += customerSegment.id;
		}
		this.data.viewAsCustomerSegmentIds = customerSegmentIds;
		this.dialogRef.close(this.data);
	}

	private createFormControls() {
		this.storeURL = new FormControl("");
		this.previewDate = new FormControl("");
		this.previewTime = new FormControl("");
		this.isTimeElapsing = new FormControl(false);
	}

	private createForm() {
		this.previewSettingsForm = new FormGroup({
			storeURL: this.storeURL,
			previewDate: this.previewDate,
			previewTime: this.previewTime,
			isTimeElapsing: this.isTimeElapsing
		});
	}
}
