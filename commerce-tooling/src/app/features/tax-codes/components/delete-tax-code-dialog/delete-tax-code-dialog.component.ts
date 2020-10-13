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
import { CalculationCodesService } from "../../../../rest/services/calculation-codes.service";

@Component({
	templateUrl: "./delete-tax-code-dialog.component.html",
	styleUrls: ["./delete-tax-code-dialog.component.scss"]
})
export class DeleteTaxCodeDialogComponent implements OnInit {
	deleteTaxCodeForm: FormGroup;
	taxCodeName: string;
	taxCodeId: number;
	isDefaultSalesTaxCode: boolean;
	isDefaultShippingTaxCode: boolean;
	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private calculationCodesService: CalculationCodesService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<DeleteTaxCodeDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.taxCodeName = data.name;
		this.taxCodeId = data.id;
		this.isDefaultSalesTaxCode = data.isDefaultSalesTaxCode;
		this.isDefaultShippingTaxCode = data.isDefaultShippingTaxCode;
	}

	ngOnInit() {
		this.deleteTaxCodeForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	deleteTaxCode() {
		this.alertService.clear();
		this.processing = true;
		this.calculationCodesService.deleteCalculationCodeByIdResponse(this.taxCodeId).subscribe(response => {
			this.translateService.get("TAX_CODES.TAX_CODES_DELETED_MESSAGE").subscribe((message: string) => {
				this.alertService.success({message});
			});
			this.processing = false;
			this.dialogRef.close({ taxCodeDeleted: true });
		});
	}
}
