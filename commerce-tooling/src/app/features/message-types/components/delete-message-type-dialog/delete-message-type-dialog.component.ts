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
import { ProfilesService } from "../../../../rest/services/profiles.service";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
	templateUrl: "./delete-message-type-dialog.component.html",
	styleUrls: ["./delete-message-type-dialog.component.scss"]
})
export class DeleteMessageTypeDialogComponent implements OnInit {
	deleteMessageTypeForm: FormGroup;
	messageTypeName: string;
	profileId: number;
	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private profilesService: ProfilesService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<DeleteMessageTypeDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.messageTypeName = data.messageTypeName;
		this.profileId = data.profileId;
	}

	ngOnInit() {
		this.deleteMessageTypeForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	deleteMessageType() {
		this.alertService.clear();
		if (!this.processing) {
			this.processing = true;
			this.profilesService.deleteProfileByIdResponse(this.profileId).subscribe(response => {
				this.translateService.get("MESSAGE_TYPES.MESSAGE_TYPE_DELETED_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
				this.processing = false;
				this.dialogRef.close({ messageTypeDeleted: true });
			},
			errorResponse => {
				this.processing = false;
			});
		}
	}
}
