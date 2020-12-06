/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Component, OnInit, Inject, Input, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../../services/alert.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { CurrencyService } from "../../../../services/currency.service";
import { HcValidators } from "../../../../shared/validators";

@Component({
	templateUrl: "./account-purchase-order-dialog.component.html",
	styleUrls: ["./account-purchase-order-dialog.component.scss"]
})
export class AccountPurchaseOrderDialogComponent implements OnInit, AfterViewInit {
	purchaseOrderForm: FormGroup;
	purchaseOrderNumber: FormControl;
	spendingLimitValue: FormControl;
	spendingLimitCurrency: FormControl;
	data = null;
	currencies = [];

	@ViewChild("purchaseOrderNumberInput") purchaseOrderNumberInput: ElementRef<HTMLInputElement>;

	constructor(private translateService: TranslateService,
			private alertService: AlertService,
			private onlineStoresService: OnlineStoresService,
			private currencyService: CurrencyService,
			private dialogRef: MatDialogRef<AccountPurchaseOrderDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.data = data;
	}

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.data) {
			if (this.data.purchaseOrder) {
				this.purchaseOrderNumber.setValue(this.data.purchaseOrder.purchaseOrderNumber);
				const spendingLimitValue = this.data.purchaseOrder.spendingLimitValue;
				if (spendingLimitValue !== null && spendingLimitValue !== undefined) {
					const spendingLimitCurrency = this.data.purchaseOrder.spendingLimitCurrency;
					this.spendingLimitValue.setValue(spendingLimitValue.toFixed(this.currencyService.getCurrencyDecimalPlaces(spendingLimitCurrency)));
					this.spendingLimitCurrency.setValue(spendingLimitCurrency);
				}
			}
			this.onlineStoresService.getOnlineStoreCurrencies(this.data.storeId).subscribe(response => {
				this.currencies = response.currencies;
				if (!this.spendingLimitCurrency.value) {
					this.spendingLimitCurrency.setValue(response.defaultCurrency);
				}
				if (this.currencies && this.currencies.length === 0) {
					this.onlineStoresService.getOnlineStoreCurrencies(0).subscribe(store0 => {
						this.currencies = store0.currencies;
					});
				}
			});
		}
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.purchaseOrderNumberInput.nativeElement.focus();
		}, 250);
	}

	save() {
		this.alertService.clear();
		this.purchaseOrderForm.markAllAsTouched();
		if (this.purchaseOrderForm.valid) {
			const purchaseOrder = this.data.purchaseOrder ? this.data.purchaseOrder : {};
			purchaseOrder.purchaseOrderNumber = this.purchaseOrderNumber.value;
			const value = this.spendingLimitValue.value;
			if (value && value > 0) {
				purchaseOrder.spendingLimitValue = Number(this.spendingLimitValue.value);
				purchaseOrder.spendingLimitCurrency = this.spendingLimitCurrency.value;
			} else {
				purchaseOrder.spendingLimitValue = null;
				purchaseOrder.spendingLimitCurrency = null;
			}
			this.dialogRef.close(purchaseOrder);
		} else {
			this.translateService.get("ACCOUNTS.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	cancel() {
		this.alertService.clear();
		this.dialogRef.close();
	}

	private createFormControls() {
		this.purchaseOrderNumber = new FormControl("", [HcValidators.required, control => {
			let errors = null;
			if (control.value && this.data.otherPurchaseOrderNumbers.includes(control.value)) {
				errors = {
					duplicate: true
				};
			}
			return errors;
		}]);
		this.spendingLimitValue = new FormControl("", spendingLimitValue => {
			let errors = null;
			if (spendingLimitValue.value !== "" && spendingLimitValue.value !== null &&
				(isNaN(spendingLimitValue.value) || Number(spendingLimitValue.value) <= 0)) {
				errors = {
					invalidSpendingLimitValue: true
				};
			}
			return errors;
		});
		this.spendingLimitCurrency = new FormControl("", spendingLimitCurrency => {
			const spendingLimitValue = this.spendingLimitValue.value;
			let errors = null;
			if (this.spendingLimitValue.value && !spendingLimitCurrency.value) {
				errors = {
					required: true
				};
			}
			return errors;
		});
	}

	private createForm() {
		this.purchaseOrderForm = new FormGroup({
			purchaseOrderNumber: this.purchaseOrderNumber,
			spendingLimitValue: this.spendingLimitValue,
			spendingLimitCurrency: this.spendingLimitCurrency
		});
	}
}
