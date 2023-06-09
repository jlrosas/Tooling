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
import { AccountsService } from "../../../../rest/services/accounts.service";
import { ApiErrorService } from "../../../../services/api-error.service";

@Component({
	templateUrl: "./delete-account-dialog.component.html",
	styleUrls: ["./delete-account-dialog.component.scss"]
})
export class DeleteAccountDialogComponent implements OnInit {
	deleteAccountForm: FormGroup;
	accountName: string;
	accountId: string;
	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private accountsService: AccountsService,
			private apiErrorService: ApiErrorService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.accountName = data.name;
		this.accountId = data.id;
	}

	ngOnInit() {
		this.deleteAccountForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	deleteAccount() {
		this.alertService.clear();
		this.processing = true;
		this.accountsService.deleteAccount(this.accountId).subscribe(response => {
			this.translateService.get("ACCOUNTS.ACCOUNTS_DELETED_MESSAGE").subscribe((message: string) => {
				this.alertService.success({message});
			});
			this.processing = false;
			this.dialogRef.close({ accountDeleted: true });
		},
		deleteErrorResponse => {
			this.processing = false;
			this.apiErrorService.handleError(deleteErrorResponse, errorResponse => {
				if (errorResponse.error && errorResponse.error.errors) {
					errorResponse.error.errors.forEach((error: { errorMessage: any; errorKey: any; }) => {
						if (error.errorKey === "_ERR_ACCOUNT_CMD_EXEC") {
							this.translateService.get("ACCOUNTS.ACTIVE_CONTRACTS_ERROR").subscribe((message: string) => {
								this.alertService.error({message});
							});
						} else {
							this.alertService.error({message: error.errorMessage});
						}
					});
				} else {
					console.log(errorResponse);
				}
			});
		});
	}
}
