/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { MAT_DIALOG_DATA, MatDialogRef, MatSelect } from "@angular/material";
import { Component, OnInit, Inject, Input, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl, Validators, Form } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../../services/alert.service";
import { HcValidators } from "../../../../shared/validators";
import { CurrencyService } from "../../../../services/currency.service";

@Component({
	templateUrl: "./shipping-charge-range-dialog.component.html",
	styleUrls: ["./shipping-charge-range-dialog.component.scss"]
})
export class ShippingChargeRangeDialogComponent implements OnInit, AfterViewInit {
	rangeForm: FormGroup;
	rangeStart: FormControl;
	charge: FormControl;
	data = null;
	mode = null;
	chargeType = null;
	currency = null;

	@ViewChild("rangeStartInput", {static: false}) rangeStartInput: ElementRef<HTMLInputElement>;
	@ViewChild("chargeInput", {static: false}) chargeInput: ElementRef<HTMLInputElement>;

	constructor(
			private translateService: TranslateService,
			private alertService: AlertService,
			private currencyService: CurrencyService,
			private dialogRef: MatDialogRef<ShippingChargeRangeDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.data = data;
	}

	ngOnInit() {
		if (this.data) {
			this.mode = this.data.mode;
			this.chargeType = this.data.chargeType;
			this.currency = this.data.currency;
			this.createFormControls();
			this.createForm();
			if (this.data && this.data.range) {
				this.rangeStart.setValue(this.data.range.rangeStart.toString());
				if (this.data.range.rangeStart === 0) {
					this.rangeStart.disable();
				}
				const formattedCharge = this.data.range.value.toFixed(this.currencyService.getCurrencyDecimalPlaces(this.currency));
				this.charge.setValue(formattedCharge);
			} else if (this.data.currentRanges.length === 0) {
				this.rangeStart.setValue("0");
				this.rangeStart.disable();
			}
		}
	}

	ngAfterViewInit() {
		setTimeout(() => {
			if (this.rangeStart.enabled) {
				this.rangeStartInput.nativeElement.focus();
			} else {
				this.chargeInput.nativeElement.focus();
			}
		}, 250);
	}

	save() {
		this.rangeForm.markAllAsTouched();
		this.alertService.clear();
		if (this.rangeForm.valid) {
			const range = this.data.range ? this.data.range : {};
			range.value = Number(this.charge.value.trim());
			range.rangeStart = Number(this.rangeStart.value.trim());
			if (this.mode === "create") {
				this.data.currentRanges.push(range);
			}
			this.dialogRef.close(range);
		} else {
			this.rangeForm.markAllAsTouched();
			this.translateService.get("SHIPPING_MODES.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	cancel() {
		this.alertService.clear();
		this.dialogRef.close();
	}

	clearAddress($event) {
		$event.stopPropagation();
	}

	private createFormControls() {
		this.rangeStart = new FormControl("", [
			HcValidators.required,
			control => {
				const currentRanges = this.data.currentRanges;
				let errors = null;
				const trimmedValue: string = control.value.toString().trim();
				if (trimmedValue !== "") {
					const numericValue = Number(trimmedValue);
					if (currentRanges.length > 0) {
						currentRanges.forEach(element => {
							if (element !== this.data.range && element.rangeStart === numericValue) {
								errors = {
									duplicate: true
								};
							}
						});
					}
					if (isNaN(numericValue) || numericValue < 0 ||
							(this.chargeType === "byQuantity" && !Number.isInteger(numericValue))) {
						errors = {
							invalidRangeStart: true
						};
					}
				}
				return errors;
			}
		]);
		this.charge = new FormControl("", [
			HcValidators.required,
			control => {
				let errors = null;
				const trimmedValue: string = control.value.toString().trim();
				const numericValue = Number(trimmedValue);
				if (trimmedValue !== "" && (isNaN(numericValue) || numericValue < 0)) {
					errors = {
						invalidCharge: true
					};
				}
				return errors;
			}
		]);
	}

	private createForm() {
		this.rangeForm = new FormGroup({
			rangeStart: this.rangeStart,
			charge: this.charge,
		});
	}
}
