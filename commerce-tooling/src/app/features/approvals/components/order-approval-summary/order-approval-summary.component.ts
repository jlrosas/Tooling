/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnChanges, OnDestroy, Input } from "@angular/core";
import { LanguageService } from "../../../../services/language.service";
import { UsersService } from "../../../../rest/services/users.service";
import { OrdersService } from "../../../../rest/services/orders.service";
import { OrderItemsService } from "../../../../rest/services/order-items.service";
import { AddressesService } from "../../../../rest/services/addresses.service";
import { OrganizationNameService } from "../../../../services/organization-name.service";
import { CurrencyService } from "../../../../services/currency.service";
import { Subject, Subscription, Observable, forkJoin } from "rxjs";

import { DataSource } from "@angular/cdk/table";

@Component({
	templateUrl: "./order-approval-summary.component.html",
	styleUrls: ["./order-approval-summary.component.scss"],
	selector: "hc-order-approval-summary"
})
export class OrderApprovalSummaryComponent implements OnInit, OnDestroy, OnChanges {
	@Input() orderId: any;

	displayedColumns: string[] = ["name", "sku", "quantity", "contractName", "price", "discount", "total"];
	displayedColumnsForShipping: string[] = ["name", "sku", "contractName", "shipDate", "trackingId", "shipMethod", "address"];
	model = new ItemDataSource();

	lastUpdated: string;
	organizationName: string;
	adjustment: number;
	discount: number;
	totalShippingCharge: number;
	tax: number;
	currency: string;
	total: number;
	estimatedShipDate: string;
	billingAddress: string = null;
	paymentMethod: string;
	paymentAmount: string;
	accountId: string;
	billingAddress2: string;
	buyerFirstName: string;
	buyerMiddleName: string;
	buyerLastName: string;
	buyerPhoneNumber: string;
	buyerEmail: string;
	buyerEmployeeId: string;

	private onLanguageChangeSubscription: Subscription = null;

	constructor(private languageService: LanguageService,
			private ordersService: OrdersService,
			private orderItemsService: OrderItemsService,
			private organizationNameService: OrganizationNameService,
			private addressesService: AddressesService,
			private usersService: UsersService,
			private currencyService: CurrencyService) { }

	ngOnInit() {
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.loadOrderData();
		});
	}

	ngOnChanges(changes) {
		if (changes.orderId.currentValue !== "" && changes.orderId.currentValue !== undefined) {
			this.loadOrderData();
		}
	}

	loadOrderData() {
		this.ordersService.getOrderById(this.orderId).subscribe(order => {
			const decimalPlaces = this.currencyService.getCurrencyDecimalPlaces(order.currency);
			this.lastUpdated = order.updatedDateTime;
			this.adjustment = order.displayAdjustment === null ? null : order.displayAdjustment.toFixed(decimalPlaces);
			this.discount = order.discount === null ? null : order.discount.toFixed(decimalPlaces);
			this.totalShippingCharge = order.totalShippingCharge === null ? null : order.totalShippingCharge.toFixed(decimalPlaces);
			this.tax = order.totalTax === null ? null : order.totalTax.toFixed(decimalPlaces);
			this.currency = order.currency;
			this.total = order.total === null ? null : order.total.toFixed(decimalPlaces);
			this.estimatedShipDate = order.estimatedShipDate;
			if (order.paymentInstructions && order.paymentInstructions.length > 0) {
				const paymentInstruction = order.paymentInstructions[0];
				this.paymentMethod = paymentInstruction.paymentMethod;
				this.paymentAmount = paymentInstruction.amount === null ? null : paymentInstruction.amount.toFixed(decimalPlaces);
				if (paymentInstruction.protocolData) {
					this.billingAddress2 = this.constructBillingAddress(paymentInstruction.protocolData);
					this.accountId = paymentInstruction.protocolData.account;
				}
			}
			this.organizationNameService.getOrganizationName(order.organizationId).subscribe(organizationName => {
				this.organizationName = organizationName;
			});
			if (order.addressId) {
				this.addressesService.AddressesFindByAddressId({id: order.addressId}).subscribe(address => {
					this.billingAddress = this.constructAddress(address);
				});
			}
			if (order.userId) {
				this.usersService.UsersFindByUserId(order.userId).subscribe(user => {
					this.buyerFirstName = user.address.firstName;
					this.buyerMiddleName = user.address.middleName;
					this.buyerLastName = user.address.lastName;
					this.buyerPhoneNumber = user.address.phone1;
					this.buyerEmail = user.address.email1;
					this.buyerEmployeeId = user.employeeId;
				});
			}
			this.ordersService.getOrderItemsByOrderId(this.orderId).subscribe(orderItems => {
				const orderItemRequests = [];
				for (let index = 0; index < orderItems.items.length; index++) {
					const item = orderItems.items[index];
					orderItemRequests.push(this.orderItemsService.getOrderItemById(item.id));
				}
				forkJoin(orderItemRequests).subscribe(response => {
					const uniqueAddressIds = new Set();
					const data: Item[] = [];
					for (let index = 0; index < response.length; index++) {
						const element: any = response[index];
						const item: Item = {
							name: element.catalogEntryName,
							sku: element.partNumber,
							quantity: element.quantity,
							price: element.price === null ? null : element.price.toFixed(decimalPlaces),
							contractId: element.contractId,
							contractName: element.contractDescription,
							discount: element.displayAdjustment === null ? null : element.displayAdjustment.toFixed(decimalPlaces),
							total: element.totalProduct === null ? null : element.totalProduct.toFixed(decimalPlaces),
							shipDate: element.shippedDateTime,
							shipMethod: element.shippingModeDescription,
							trackingId: element.shipmentTrackingIds.join(", "),
							addressId: element.addressId,
							address: ""
						};
						data.push(item);
						if (element.addressId) {
							uniqueAddressIds.add(element.addressId);
						}
					}
					this.model.setData(data);
					uniqueAddressIds.forEach((addressId: string) => {
						this.addressesService.AddressesFindByAddressId({id: addressId}).subscribe(address => {
							const addressString = this.constructAddress(address);
							data.forEach(item => {
								if (item.addressId === addressId) {
									item.address = addressString;
								}
							});
						});
					});
				});
			});
		});
	}

	constructAddress(address: any) {
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
		return addressString;
	}

	constructBillingAddress(address: any) {
		let addressString = "";
		if (address.billto_address1) {
			addressString += address.billto_address1;
		}
		if (address.billto_city) {
			addressString += ", " + address.billto_city;
		}
		if (address.billto_stateprovince) {
			addressString += ", " + address.billto_stateprovince;
		}
		if (address.billto_zipcode) {
			addressString += ", " + address.billto_zipcode;
		}
		if (address.billto_country) {
			addressString += ", " + address.billto_country;
		}
		if (address.billto_phone_number) {
			addressString += ", " + address.billto_phone_number;
		}
		return addressString;
	}

	ngOnDestroy() {
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}
}

interface Item {
	name: string;
	sku: string;
	quantity: number;
	contractId: string;
	contractName: string;
	price: number;
	discount: number;
	total: number;
	shipDate: number;
	trackingId: string;
	shipMethod: string;
	addressId: string;
	address: string;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class ItemDataSource extends DataSource<Item> {
	private items$: Subject<Item[]> = new Subject<Item[]>();

	setData(items: Item[]) {
		this.items$.next(items);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<Item[]> {
		return this.items$.asObservable();
	}

	disconnect() {}
}

