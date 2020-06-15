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
import { MemberGroupsService } from "../../../../rest/services/member-groups.service";

@Component({
	templateUrl: "./delete-member-group-dialog.component.html",
	styleUrls: ["./delete-member-group-dialog.component.scss"]
})
export class DeleteMemberGroupDialogComponent implements OnInit {
	deleteMemberGroupForm: FormGroup;
	titleTextKey: string;
	memberGroupName: string;
	memberGroupId: string;
	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private memberGroupsService: MemberGroupsService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<DeleteMemberGroupDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.memberGroupName = data.name;
		this.memberGroupId = data.id;
	}

	ngOnInit() {
		this.deleteMemberGroupForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	deleteMemberGroup() {
		if (!this.processing) {
			this.alertService.clear();
			this.processing = true;
			this.memberGroupsService.deleteMemberGroupResponse({
				id: this.memberGroupId
			}).subscribe(response => {
				this.translateService.get("MEMBER_GROUPS.MEMBER_GROUPS_DELETED_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
				this.processing = false;
				this.dialogRef.close({ memberGroupDeleted: true });
			},
			errorResponse => {
				this.processing = false;
				if (errorResponse.error && errorResponse.error.errors) {
					errorResponse.error.errors.forEach(error => {
						this.alertService.error({message: error.message});
					});
				} else {
					console.log(errorResponse);
				}
			});
		}
	}
}
