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
import { ExtendedSitesService } from "../../../../rest/services/extended-sites.service";

@Component({
	templateUrl: "./delete-extended-site-dialog.component.html",
	styleUrls: ["./delete-extended-site-dialog.component.scss"]
})
export class DeleteExtendedSiteDialogComponent implements OnInit {
	deleteExtendedSiteForm: FormGroup;
	extendedSiteName: string;
	extendedSiteId: string;
	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private extendedSitesService: ExtendedSitesService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<DeleteExtendedSiteDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.extendedSiteName = data.name;
		this.extendedSiteId = data.id;
	}

	ngOnInit() {
		this.deleteExtendedSiteForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	deleteExtendedSite() {
		if (!this.processing) {
			this.alertService.clear();
			this.processing = true;
			this.extendedSitesService.deleteExtendedSiteResponse(this.extendedSiteId).subscribe(response => {
				this.translateService.get("EXTENDED_SITES.STORE_DELETED_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
				this.processing = false;
				this.dialogRef.close({ extendedSiteDeleted: true });
			},
			errorResponse => {
				this.processing = false;
			});
		}
	}

}
