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
import { forkJoin } from "rxjs";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { JurisdictionsService } from "../../../../rest/services/jurisdictions.service";
import { JurisdictionGroupsService } from "../../../../rest/services/jurisdiction-groups.service";
import { JurisdictionGroupRelationshipsService } from "../../../../rest/services/jurisdiction-group-relationships.service";

@Component({
	templateUrl: "./delete-shipping-jurisdiction-dialog.component.html",
	styleUrls: ["./delete-shipping-jurisdiction-dialog.component.scss"]
})
export class DeleteShippingJurisdictionDialogComponent implements OnInit {
	deleteJurisdictionForm: FormGroup;
	jurisdiction: string;
	id: number;
	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private jurisdictionsService: JurisdictionsService,
			private jurisdictionGroupsService: JurisdictionGroupsService,
			private jurisdictionGroupRelationshipsService: JurisdictionGroupRelationshipsService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<DeleteShippingJurisdictionDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.jurisdiction = data.jurisdiction;
		this.id = data.id;
	}

	ngOnInit() {
		this.deleteJurisdictionForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	deleteJurisdiction() {
		if (!this.processing) {
			this.alertService.clear();
			this.processing = true;
			this.jurisdictionGroupRelationshipsService.getJurisdictionGroupRelationships({jurisdictionId: this.id}).subscribe(response => {
				this.jurisdictionsService.deleteJurisdictionByIdResponse(this.id).subscribe(deleteResponse => {
					if (response.items.length > 0) {
						const groupId = response.items[0].jurisdictionGroupId;
						this.jurisdictionGroupsService.deleteJurisdictionGroupByIdResponse(groupId).subscribe(deleteResponse2 => {
							this.handleDeleteSuccess();
						}, this.handleDeleteError);
					} else {
						this.handleDeleteSuccess();
					}
				}, this.handleDeleteError);
			},
			error => {
				this.processing = false;
				console.log(error);
			});
		}
	}

	private handleDeleteSuccess() {
		this.translateService.get("SHIPPING_JURISDICTIONS.SHIPPING_JURISDICTIONS_DELETED_MESSAGE").subscribe((message: string) => {
			this.alertService.success({message});
		});
		this.processing = false;
		this.dialogRef.close({ jurisdictionDeleted: true });
	}

	private handleDeleteError(errorResponse) {
		this.processing = false;
		if (errorResponse.error && errorResponse.error.errors) {
			errorResponse.error.errors.forEach(error => {
				this.alertService.error({message: error.message});
			});
		} else {
			console.log(errorResponse);
		}
	}
}
