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

@Component({
	templateUrl: "./approval-dialog.component.html",
	styleUrls: ["./approval-dialog.component.scss"]
})
export class ApprovalDialogComponent implements OnInit {
	form: FormGroup;
	comments: string;
	actionString: string;
	approvalId: string;
	titleTextKey: string;

	private approveTitleTextKeys = {
		"10001": "APPROVALS.APPROVE_RFQ_RESPONSE",
		"10002": "APPROVALS.APPROVE_ORDER",
		"10003": "APPROVALS.APPROVE_CONTRACT",
		"10004": "APPROVALS.APPROVE_USER_REGISTRATION",
		"10005": "APPROVALS.APPROVE_ORGANIZATION_REGISTRATION",
		"10006": "APPROVALS.APPROVE_RESELLER_USER_REGISTRATION"
	};
	private rejectTitleTextKeys = {
		"10001": "APPROVALS.REJECT_RFQ_RESPONSE",
		"10002": "APPROVALS.REJECT_ORDER",
		"10003": "APPROVALS.REJECT_CONTRACT",
		"10004": "APPROVALS.REJECT_USER_REGISTRATION",
		"10005": "APPROVALS.REJECT_ORGANIZATION_REGISTRATION",
		"10006": "APPROVALS.REJECT_RESELLER_USER_REGISTRATION"
	};

	constructor(
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<ApprovalDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.actionString = data.action;
		this.approvalId = data.id;
		if (data.action === "Approve") {
			this.titleTextKey = this.approveTitleTextKeys[data.flowTypeId] ? this.approveTitleTextKeys[data.flowTypeId] : "APPROVALS.APPROVE";
		} else {
			this.titleTextKey = this.rejectTitleTextKeys[data.flowTypeId] ? this.rejectTitleTextKeys[data.flowTypeId] : "APPROVALS.REJECT";
		}
	}

	ngOnInit() {
		this.form = this.fb.group({
			comments: [this.comments, []]
		});
	}

	action() {
		this.dialogRef.close(this.form.value);
	}

	close() {
		this.dialogRef.close();
	}
}
