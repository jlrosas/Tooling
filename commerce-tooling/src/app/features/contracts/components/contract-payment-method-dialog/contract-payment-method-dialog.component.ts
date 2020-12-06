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
import { Component, OnInit, Inject, Input, ViewChild, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl, Validators, Form } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../../services/alert.service";
import { HcValidators } from "../../../../shared/validators";

@Component({
	templateUrl: "./contract-payment-method-dialog.component.html",
	styleUrls: ["./contract-payment-method-dialog.component.scss"]
})
export class ContractPaymentMethodDialogComponent implements OnInit, AfterViewInit {
	paymentMethodForm: FormGroup;
	paymentMethod: FormControl;
	description: FormControl;
	creditCardNumber: FormControl;
	expiryMonth: FormControl;
	expiryYear: FormControl;
	address: FormControl;

	showCreditCardFields = false;
	data = null;
	availablePaymentMethods = [];
	availableAddresses = [];
	yearList = [];
	monthList = [];
	creditCardBrands = {
		"AMEX": "Amex",
		"Master Card": "MasterCard",
		"VISA": "VISA"
	};

	showCheckFields = false;
	checkingAccountNumber: FormControl;
	checkRoutingNumber: FormControl;

	@ViewChild("paymentMethodSelect") paymentMethodSelect: MatSelect;

	constructor(
		private translateService: TranslateService,
		private alertService: AlertService,
		private dialogRef: MatDialogRef<ContractPaymentMethodDialogComponent>,
		@Inject(MAT_DIALOG_DATA) data) {
			this.data = data;
		}

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		this.monthList = Array.from({ length: 12 }, (v, k) => ((k >= 9) ? "" : "0") + (k + 1));
		this.yearList = Array.from({ length: 10 }, (v, k) => (k + new Date().getFullYear()).toString());
		if (this.data) {
			this.availablePaymentMethods = this.data.availablePaymentMethods;
			this.availableAddresses = this.data.availableAddresses;
			if (this.data && this.data.paymentMethod) {
				this.description.setValue(this.data.paymentMethod.description);
				this.creditCardNumber.setValue(this.data.paymentMethod.accountNumber || "");
				this.expiryMonth.setValue(this.data.paymentMethod.expiryMonth || "");
				this.expiryYear.setValue(this.data.paymentMethod.expiryYear || "");
				this.checkingAccountNumber.setValue(this.data.paymentMethod.accountNumber || "");
				this.checkRoutingNumber.setValue(this.data.paymentMethod.checkRoutingNumber || "");
			}
			this.setSelectedPaymentMethod();
			this.setSelectedAddress();
		}
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.paymentMethodSelect.focused = true;
		}, 250);
	}

	save() {
		this.paymentMethodForm.markAllAsTouched();
		this.alertService.clear();
		if (this.paymentMethodForm.valid) {
			const paymentMethod = this.data.paymentMethod ? this.data.paymentMethod : {};
			paymentMethod.paymentMethodId = this.paymentMethod.value.id;
			paymentMethod.paymentMethodDescription = this.paymentMethod.value.description;
			paymentMethod.description = this.description.value;
			if (this.showCreditCardFields) {
				paymentMethod.creditCardBrand = this.creditCardBrands[this.paymentMethod.value.name];
				paymentMethod.accountNumber = this.creditCardNumber.value;
				paymentMethod.expiryMonth = this.expiryMonth.value;
				paymentMethod.expiryYear = this.expiryYear.value;
			} else {
				paymentMethod.creditCardBrand = null;
				if (!this.showCheckFields) {
					paymentMethod.accountNumber = null;
				}
				paymentMethod.expiryMonth = null;
				paymentMethod.expiryYear = null;
			}
			if (this.showCheckFields) {
				paymentMethod.accountNumber = this.checkingAccountNumber.value;
				paymentMethod.checkRoutingNumber = this.checkRoutingNumber.value;
			} else {
				if (!this.showCreditCardFields) {
					paymentMethod.accountNumber = null;
				}
				paymentMethod.checkRoutingNumber = null;
			}
			if (this.address.value) {
				paymentMethod.billingAddressNickName = this.address.value.nickName;
				paymentMethod.billingAddressOrganizationId = this.address.value.memberId;
				paymentMethod.billingAddressString = this.address.value.content;
			} else {
				paymentMethod.billingAddressNickName = null;
				paymentMethod.billingAddressOrganizationId = null;
				paymentMethod.billingAddressString = null;
			}
			this.dialogRef.close(paymentMethod);
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

	selectPaymentMethod(paymentMethod) {
		if (this.creditCardBrands[paymentMethod.name]) {
			this.showCreditCardFields = true;
			this.creditCardNumber.enable();
			this.expiryMonth.enable();
			this.expiryYear.enable();
		} else {
			this.showCreditCardFields = false;
			this.creditCardNumber.disable();
			this.expiryMonth.disable();
			this.expiryYear.disable();
		}
		if (paymentMethod.name && paymentMethod.name.toLowerCase() === "check") {
			this.showCheckFields = true;
			this.checkingAccountNumber.enable();
			this.checkRoutingNumber.enable();
		} else {
			this.showCheckFields = false;
			this.checkingAccountNumber.disable();
			this.checkRoutingNumber.disable();
		}
	}

	clearAddress($event) {
		this.address.setValue(null);
		$event.stopPropagation();
	}

	private createFormControls() {
		this.paymentMethod = new FormControl("", Validators.required);
		this.description = new FormControl("", [HcValidators.required, control => {
			let errors = null;
			if (control.value && this.data.otherDescriptions.includes(control.value)) {
				errors = {
					duplicate: true
				};
			}
			return errors;
		}]);
		this.address = new FormControl();
		this.creditCardNumber = new FormControl("", control => {
			let errors = null;
			if (this.showCreditCardFields && !control.value) {
				errors = {
					required: true
				};
			}
			return errors;
		});
		this.expiryMonth = new FormControl("", control => {
			let errors = null;
			if (this.showCreditCardFields && !control.value) {
				errors = {
					required: true
				};
			}
			return errors;
		});
		this.expiryYear = new FormControl("", control => {
			let errors = null;
			if (this.showCreditCardFields && !control.value) {
				errors = {
					required: true
				};
			}
			return errors;
		});
		this.checkingAccountNumber = new FormControl("", control => {
			let errors = null;
			if (this.showCheckFields && control.value && control.value.trim() === "") {
				errors = {
					required: true
				};
			}
			return errors;
		});
		this.checkRoutingNumber = new FormControl("", control => {
			let errors = null;
			if (this.showCheckFields && control.value && control.value.trim() === "") {
				errors = {
					required: true
				};
			}
			return errors;
		});
	}

	private createForm() {
		this.paymentMethodForm = new FormGroup({
			paymentMethod: this.paymentMethod,
			description: this.description,
			address: this.address,
			creditCardNumber: this.creditCardNumber,
			expiryMonth: this.expiryMonth,
			expiryYear: this.expiryYear,
			checkingAccountNumber: this.checkingAccountNumber,
			checkRoutingNumber: this.checkRoutingNumber
		});
	}

	private setSelectedPaymentMethod() {
		if (this.data.paymentMethod) {
			const paymentMethodId = this.data.paymentMethod.paymentMethodId;
			if (paymentMethodId) {
				for (let i = 0; i < this.availablePaymentMethods.length; i++) {
					const paymentMethodOption = this.availablePaymentMethods[i];
					if (paymentMethodOption.id === paymentMethodId) {
						this.paymentMethod.setValue(paymentMethodOption);
						if (this.creditCardBrands[paymentMethodOption.name]) {
							this.showCreditCardFields = true;
							this.creditCardNumber.enable();
							this.expiryMonth.enable();
							this.expiryYear.enable();
						} else {
							this.creditCardNumber.disable();
							this.expiryMonth.disable();
							this.expiryYear.disable();
						}
						if (this.availablePaymentMethods[i].name &&
							this.availablePaymentMethods[i].name.toLowerCase() === "check") {
							this.showCheckFields = true;
							this.checkingAccountNumber.enable();
							this.checkRoutingNumber.enable();
						} else {
							this.checkingAccountNumber.disable();
							this.checkRoutingNumber.disable();
						}
						break;
					}
				}
			}
		}
	}

	private setSelectedAddress() {
		if (this.data.paymentMethod) {
			const nickName = this.data.paymentMethod.billingAddressNickName;
			if (nickName) {
				for (let i = 0; i < this.availableAddresses.length; i++) {
					const addressOption = this.availableAddresses[i];
					if (addressOption.nickName === nickName) {
						this.address.setValue(addressOption);
						break;
					}
				}
			}
		}
	}
}
