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
import { TaxCategoriesService } from "../../../../rest/services/tax-categories.service";

@Component({
	templateUrl: "./delete-tax-category-dialog.component.html",
	styleUrls: ["./delete-tax-category-dialog.component.scss"]
})
export class DeleteTaxCategoryDialogComponent implements OnInit {
	deleteTaxCategoryForm: FormGroup;
	taxCategoryName: string;
	taxCategoryId: number;
	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private taxCategoriesService: TaxCategoriesService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<DeleteTaxCategoryDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.taxCategoryName = data.name;
		this.taxCategoryId = data.id;
	}

	ngOnInit() {
		this.deleteTaxCategoryForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	deleteTaxCategory() {
		if (!this.processing) {
			this.alertService.clear();
			this.processing = true;
			this.taxCategoriesService.deleteTaxCategoryByIdResponse(this.taxCategoryId).subscribe(response => {
				this.translateService.get("TAX_CATEGORIES.TAX_CATEGORIES_DELETED_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
				this.processing = false;
				this.dialogRef.close({ taxCategoryDeleted: true });
			},
			errorResponse => {
				this.processing = false;
			});
		}
	}

}
