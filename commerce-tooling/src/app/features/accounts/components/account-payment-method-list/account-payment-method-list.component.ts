/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, Observable, Subscription } from "rxjs";
import { MatDialog } from "@angular/material";
import { DataSource } from "@angular/cdk/table";
import { AccountMainService, PaymentMethod } from "../../services/account-main.service";
import { AccountPaymentMethodDialogComponent } from "../account-payment-method-dialog/account-payment-method-dialog.component";
import { PaymentMethodsService } from "../../../../rest/services/payment-methods.service";
import { AddressesService } from "../../../../rest/services/addresses.service";
import { LanguageService } from "../../../../services/language.service";

@Component({
	selector: "hc-account-payment-method-list",
	templateUrl: "./account-payment-method-list.component.html",
	styleUrls: ["./account-payment-method-list.component.scss"]
})
export class AccountPaymentMethodListComponent implements AfterViewInit, OnDestroy {
	@Input() mode: String;

	displayedColumns: string[] = ["paymentMethodName", "paymentMethodDescription", "billingAddress", "actions"];

	model = new PaymentMethodDataSource();

	private availablePaymentMethods = null;
	private availableAddresses = null;
	private onLanguageChangeSubscription: Subscription = null;

	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};

	constructor(private route: ActivatedRoute,
		private accountMainService: AccountMainService,
		private paymentMethodsService: PaymentMethodsService,
		private addressesService: AddressesService,
		private languageService: LanguageService,
		private dialog: MatDialog) { }

	ngAfterViewInit() {
		if (this.mode === "edit") {
			this.accountMainService.loadCurrentPaymentMethods(Number(this.route.snapshot.params.storeId),
					this.route.snapshot.params.id).subscribe(response => {
				this.populateAddresses();
				this.populatePaymentMethods();
				this.model.setData(this.accountMainService.paymentMethods);
			});
		} else {
			if (this.accountMainService.paymentMethods === null) {
				this.accountMainService.paymentMethods = [];
			}
			this.model.setData(this.accountMainService.paymentMethods);
		}
		this.loadAddresses();
		this.loadAvailablePaymentMethods();
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.loadAvailablePaymentMethods();
		});
	}

	ngOnDestroy() {
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	createPaymentMethod() {
		if (this.availablePaymentMethods && this.availableAddresses) {
			const dialogRef = this.dialog.open(AccountPaymentMethodDialogComponent, {
				...this.dialogConfig,
				data: {
					availablePaymentMethods: this.availablePaymentMethods,
					availableAddresses: this.availableAddresses,
					otherDescriptions: this.accountMainService.paymentMethods ?
							this.accountMainService.paymentMethods.map(row => row.description) : []
				}
			});
			dialogRef.afterClosed().subscribe((paymentMethod: PaymentMethod) => {
				if (paymentMethod) {
					this.accountMainService.paymentMethods.push(paymentMethod);
					this.model.setData(this.accountMainService.paymentMethods);
				}
			});
		}
	}

	editPaymentMethod(paymentMethod: PaymentMethod) {
		if (this.availablePaymentMethods && this.availableAddresses) {
			const dialogRef = this.dialog.open(AccountPaymentMethodDialogComponent, {
				...this.dialogConfig,
				data: {
					paymentMethod,
					availablePaymentMethods: this.availablePaymentMethods,
					availableAddresses: this.availableAddresses,
					otherDescriptions: this.accountMainService.paymentMethods ?
							this.accountMainService.paymentMethods.map(row =>
							row.description !== paymentMethod.description ? row.description : null) : []
				}
			});
			dialogRef.afterClosed().subscribe((modifiedPaymentMethod: PaymentMethod) => {
				if (modifiedPaymentMethod) {
					this.model.setData(this.accountMainService.paymentMethods);
				}
			});
		}
	}

	deletePaymentMethod(id) {
		this.accountMainService.paymentMethods.splice(id, 1);
		this.model.setData(this.accountMainService.paymentMethods);
	}

	private loadAvailablePaymentMethods() {
		this.paymentMethodsService.getPaymentMethods({
			storeId: Number(this.route.snapshot.params.storeId),
			sort: "description",
			languageId: LanguageService.languageId
		}).subscribe(response => {
			this.availablePaymentMethods = response.items;
			this.populatePaymentMethods();
			this.model.setData(this.accountMainService.paymentMethods);
		});
	}

	private populatePaymentMethods() {
		const paymentMethods = this.accountMainService.paymentMethods;
		if (paymentMethods && this.availablePaymentMethods) {
			paymentMethods.forEach(paymentMethod => {
				for (let i = 0; i < this.availablePaymentMethods.length; i++) {
					if (paymentMethod.paymentMethodId === this.availablePaymentMethods[i].id) {
						paymentMethod.paymentMethodDescription = this.availablePaymentMethods[i].description;
						break;
					}
				}
			});
		}
	}

	private loadAddresses() {
		const { customerOrganizationId } = this.accountMainService.accountData;
		if (customerOrganizationId) {
			this.addressesService.AddressesGetAddresses({
				memberId: customerOrganizationId
			}).subscribe(response => {
				this.availableAddresses = response.items.filter(
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
				this.populateAddresses();
				this.model.setData(this.accountMainService.paymentMethods);
			}, error => {
				console.log(error);
			});
		}
	}

	private populateAddresses() {
		const paymentMethods = this.accountMainService.paymentMethods;
		if (paymentMethods && this.availableAddresses) {
			paymentMethods.forEach(paymentMethod => {
				if (paymentMethod.billingAddressNickName) {
					for (let i = 0; i < this.availableAddresses.length; i++) {
						if (paymentMethod.billingAddressNickName === this.availableAddresses[i].nickName) {
							paymentMethod.billingAddressString = this.availableAddresses[i].content;
							break;
						}
					}
				}
			});
		}
	}
}

/**
 * Data source to provide data to be rendered in the table.
 */
class PaymentMethodDataSource extends DataSource<PaymentMethod> {
	private paymentMethods$: Subject<PaymentMethod[]> = new Subject<PaymentMethod[]>();

	setData(paymentMethod: PaymentMethod[]) {
		this.paymentMethods$.next(paymentMethod);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<PaymentMethod[]> {
		return this.paymentMethods$.asObservable();
	}

	disconnect() {}
}
