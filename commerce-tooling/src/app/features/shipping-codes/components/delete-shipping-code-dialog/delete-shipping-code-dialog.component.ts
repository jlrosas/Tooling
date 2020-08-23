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
import { CalculationCodesService } from "../../../../rest/services/calculation-codes.service";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
	templateUrl: "./delete-shipping-code-dialog.component.html",
	styleUrls: ["./delete-shipping-code-dialog.component.scss"]
})
export class DeleteShippingCodeDialogComponent implements OnInit {
	deleteShippingCodeForm: FormGroup;
	shippingCodeName: string;
	shippingCodeId: number;
	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private calculationCodesService: CalculationCodesService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<DeleteShippingCodeDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.shippingCodeName = data.shippingCodeName;
		this.shippingCodeId = data.shippingCodeId;
	}

	ngOnInit() {
		this.deleteShippingCodeForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	deleteShippingCode() {
		this.alertService.clear();
		if (!this.processing) {
			this.processing = true;
			this.calculationCodesService.deleteCalculationCodeByIdResponse(this.shippingCodeId).subscribe(response => {
				this.translateService.get("SHIPPING_CODES.SHIPPING_CODE_DELETED_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
				this.processing = false;
				this.dialogRef.close({ shippingCodeDeleted: true });
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
