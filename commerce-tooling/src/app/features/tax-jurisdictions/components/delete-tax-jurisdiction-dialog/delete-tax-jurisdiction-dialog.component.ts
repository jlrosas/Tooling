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
	templateUrl: "./delete-tax-jurisdiction-dialog.component.html",
	styleUrls: ["./delete-tax-jurisdiction-dialog.component.scss"]
})
export class DeleteTaxJurisdictionDialogComponent implements OnInit {
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
			private dialogRef: MatDialogRef<DeleteTaxJurisdictionDialogComponent>,
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
						},
						error => {
							this.processing = false;
						});
					} else {
						this.handleDeleteSuccess();
					}
				},
				error => {
					this.processing = false;
				});
			},
			error => {
				this.processing = false;
			});
		}
	}

	private handleDeleteSuccess() {
		this.translateService.get("TAX_JURISDICTIONS.TAX_JURISDICTIONS_DELETED_MESSAGE").subscribe((message: string) => {
			this.alertService.success({message});
		});
		this.processing = false;
		this.dialogRef.close({ jurisdictionDeleted: true });
	}
}
