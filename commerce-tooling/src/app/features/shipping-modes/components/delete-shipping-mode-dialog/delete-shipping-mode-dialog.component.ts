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
import { ShippingModesService } from "../../../../rest/services/shipping-modes.service";
import { StoreDefaultsService } from "../../../../rest/services/store-defaults.service";

@Component({
	templateUrl: "./delete-shipping-mode-dialog.component.html",
	styleUrls: ["./delete-shipping-mode-dialog.component.scss"]
})
export class DeleteShippingModeDialogComponent implements OnInit {
	deleteShippingModeForm: FormGroup;
	shippingMode: string;
	id: number;
	storeId: number;
	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private shippingModesService: ShippingModesService,
			private storeDefaultsService: StoreDefaultsService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<DeleteShippingModeDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.shippingMode = data.shippingMode;
		this.id = data.id;
		this.storeId = data.storeId;
	}

	ngOnInit() {
		this.deleteShippingModeForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	deleteShippingMode() {
		if (!this.processing) {
			this.alertService.clear();
			this.processing = true;
			this.storeDefaultsService.getStoreDefaultById({id: this.storeId}).subscribe(data => {
				if (this.id === data.shipModeId) {
					const args: StoreDefaultsService.UpdateStoreDefaultByIdParams = {
						id:  this.storeId,
						StoreDefault: {
							shipModeId: null
						}
					};
					this.storeDefaultsService.updateStoreDefaultById(args).subscribe(response => {
						this.triggerDelete();
					},
					errorResponse => {
						this.processing = false;
						if (errorResponse.error = errorResponse.error.errors) {
							errorResponse.error.errors.forEach(error => {
								this.alertService.error({message: error.errorMessage});
							});
						} else {
							console.log(errorResponse);
						}
					});
				} else {
					this.triggerDelete();
				}
			}, error => {
				this.processing = false;
				console.log(error);
			});
		}
	}

	private triggerDelete() {
		this.shippingModesService.deleteShippingModeById(this.id).subscribe(response => {
			this.translateService.get("SHIPPING_MODES.SHIPPING_MODE_DELETED_MESSAGE").subscribe((message: string) => {
				this.alertService.success({message});
			});
			this.processing = false;
			this.dialogRef.close({ shippingModeDeleted: true });
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
