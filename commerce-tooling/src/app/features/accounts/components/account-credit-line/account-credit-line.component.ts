/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { isUndefined } from "util";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { AddressesService } from "../../../../rest/services/addresses.service";
import { PaymentMethodsService } from "../../../../rest/services/payment-methods.service";
import { AccountMainService } from "../../services/account-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./account-credit-line.component.html",
	styleUrls: ["./account-credit-line.component.scss"],
	selector: "hc-account-credit-line"
})
export class AccountCreditLineComponent implements OnInit, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	creditLineForm: FormGroup | any;
	accountNumber: FormControl;
	description: FormControl;
	address: FormControl;

	addressList: Array<any> = [];

	@ViewChild("accountNumberInput", {static: false}) accountNumberInput: ElementRef<HTMLInputElement>;

	constructor(private route: ActivatedRoute,
			private router: Router,
			private translateService: TranslateService,
			private accountMainService: AccountMainService,
			private addressesService: AddressesService,
			private paymentMethodsService: PaymentMethodsService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.accountMainService.loadCurrentAccount(this.route.snapshot.params.id).subscribe(response => {
				this.loadAddresses();
			});
			this.accountMainService.loadCurrentPaymentMethods(Number(this.route.snapshot.params.storeId),
					this.route.snapshot.params.id).subscribe(response => {
				this.setValues();
			});
		} else {
			if (!this.accountMainService.creditLinePaymentMethod) {
				this.accountMainService.creditLinePaymentMethod = {};
				this.paymentMethodsService.getPaymentMethods({
					storeId: Number(this.route.snapshot.params.storeId),
					name: "LineOfCredit"
				}).subscribe(result => {
					let lineOfCreditId = null;
					if (result.items.length === 1) {
						lineOfCreditId = result.items[0].id;
					}
					this.accountMainService.creditLinePaymentMethod.paymentMethodId = lineOfCreditId;
				});
			}
			this.setValues();
			this.loadAddresses();
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.creditLineForm;
		setTimeout(() => {
			this.accountNumberInput.nativeElement.focus();
		}, 250);
	}

	next() {
		this.creditLineForm.markAllAsTouched();
		this.alertService.clear();
		if (this.creditLineForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("ACCOUNTS.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	triggerSave() {
		this.creditLineForm.markAllAsTouched();
		this.save.emit(null);
	}

	selectAddress(address: any) {
		if (address) {
			this.accountMainService.creditLinePaymentMethod.billingAddressNickName = address.nickName;
			this.accountMainService.creditLinePaymentMethod.billingAddressOrganizationId = address.memberId;
		}
	}

	clearAddress($event) {
		this.address.setValue(null);
		this.accountMainService.creditLinePaymentMethod.billingAddressNickName = null;
		this.accountMainService.creditLinePaymentMethod.billingAddressOrganizationId = null;
		$event.stopPropagation();
	}

	validateAccountNumber() {
		if (this.accountMainService.creditLinePaymentMethod) {
			this.accountMainService.creditLinePaymentMethod.accountNumber = this.accountNumber.value;
		}
	}

	validateDescription () {
		if (this.accountMainService.creditLinePaymentMethod) {
			this.accountMainService.creditLinePaymentMethod.description = this.description.value;
		}
	}

	private setValues() {
		if (this.accountMainService.creditLinePaymentMethod) {
			this.accountNumber.setValue(this.accountMainService.creditLinePaymentMethod.accountNumber || "");
			this.description.setValue(this.accountMainService.creditLinePaymentMethod.description || "");
			this.setSelectedAddress();
		}
	}

	private createFormControls() {
		this.accountNumber = new FormControl("", accountNumber => {
			const creditLinePaymentMethod = this.accountMainService.creditLinePaymentMethod;
			let errors = null;
			if (accountNumber.value === "" && creditLinePaymentMethod && creditLinePaymentMethod.description) {
				errors = {
					required: true
				};
			}
			return errors;
		});
		this.description = new FormControl("", description => {
			const creditLinePaymentMethod = this.accountMainService.creditLinePaymentMethod;
			let errors = null;
			if (description.value === "" && creditLinePaymentMethod && creditLinePaymentMethod.accountNumber) {
				errors = {
					required: true
				};
			}
			return errors;
		});
		this.address = new FormControl("");
	}

	private createForm() {
		this.creditLineForm = new FormGroup({
			accountNumber: this.accountNumber,
			description: this.description,
			address: this.address
		});
	}

	private loadAddresses() {
		const { customerOrganizationId } = this.accountMainService.accountData;
		if (customerOrganizationId) {
			this.addressesService.AddressesGetAddresses({
				memberId: customerOrganizationId
			}).subscribe(response => {
				this.addressList = response.items.filter(
					address => address.addressType === "B" || address.addressType === "SB"
				).map(address => {
					let addressString = "";
					if (address.nickName) {
						addressString += address.nickName + ": ";
					}
					if (address.address1) {
						addressString += address.address1;
					}
					if (address.city) {
						addressString += ", " + address.city;
					}
					if (address.state) {
						addressString += ", " + address.state;
					}
					if (address.zipCode) {
						addressString += ", " + address.zipCode;
					}
					if (address.country) {
						addressString += ", " + address.country;
					}
					const addressOption = {
						...address,
						"content": addressString
					};
					return addressOption;
				});
				this.setSelectedAddress();
			}, error => {
				console.log(error);
			});
		}
	}

	private setSelectedAddress() {
		if (this.addressList && this.accountMainService.creditLinePaymentMethod) {
			const nickName = this.accountMainService.creditLinePaymentMethod.billingAddressNickName;
			if (nickName) {
				for (let i = 0; i < this.addressList.length; i++) {
					const addressOption = this.addressList[i];
					if (addressOption.nickName === nickName) {
						this.address.setValue(addressOption);
						break;
					}
				}
			}
		}
	}
}
