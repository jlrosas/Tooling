/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ContractsService } from "../../../../rest/services/contracts.service";
import { AccountsService } from "../../../../rest/services/accounts.service";
import { OrganizationNameService } from "../../../../services/organization-name.service";
import { MemberGroupsService } from "../../../../rest/services/member-groups.service";
import { CatalogFiltersService } from "../../../../rest/services/catalog-filters.service";
import { PriceRulesService } from "../../../../rest/services/price-rules.service";
import { PaymentMethodsService } from "../../../../rest/services/payment-methods.service";
import { LanguageService } from "../../../../services/language.service";
import { AddressesService } from "../../../../rest/services/addresses.service";
import { Subject, Observable, Subscription } from "rxjs";
import { DataSource } from "@angular/cdk/table";
import { ShippingMethodsService } from "../../../../rest/services/shipping-methods.service";
import { ShippingChargesService } from "../../../../rest/services/shipping-charges.service";
import { StoreNameService } from "../../../../services/store-name.service";
import { CurrencyService } from "../../../../services/currency.service";

@Component({
	templateUrl: "./contract-approval-summary.component.html",
	styleUrls: ["./contract-approval-summary.component.scss"],
	selector: "hc-contract-approval-summary"

})
export class ContractApprovalSummaryComponent implements OnInit, OnDestroy {
	@Input() contractId: any;

	name: string;
	description: string;
	comment: string;
	statusTextKey: string;
	startDate: string;
	endDate: string;
	accountName: string;
	accountId: string;
	referencedContract: string;
	storeId: string = null;
	baseContract: string;
	customerOrganizationId: string;
	allowPersonalBillingAddress: boolean;
	allowParentOrganizationBillingAddress: boolean;
	allowAccountOrganizationBillingAddress: boolean;
	allowPersonalShippingAddress: boolean;
	allowParentOrganizationShippingAddress: boolean;
	allowAccountOrganizationShippingAddress: boolean;
	orderApprovalMinimumValue: number;
	orderApprovalCurrency: string;

	buyers: Array<any> = null;
	selectedOrganizations: Array<any> = [];
	selectedMemberGroups: Array<any> = [];

	catalogFilter: string;
	priceRule: string;

	shippingMethods: Array<any> = [];
	shippingCharges: Array<any> = [];
	shippingAddresses: Array<any> = [];

	paymentModel = new PaymentMethodDataSource();
	paymentDisplayedColumns: string[] =
			["paymentMethodName", "paymentMethodDescription", "accountNumber", "expiry", "routingNumber", "billingAddress"];

	paymentMethods: Array<any> = [];

	private availablePaymentMethods: any = null;
	private availableAddresses: any = null;
	private availableShippingMethods: any = null;
	private availableShippingCharges: any = null;

	private statusTextKeys = {
		"draft": "CONTRACTS.STATUS_DRAFT",
		"submitted": "CONTRACTS.STATUS_SUBMITTED",
		"approved": "CONTRACTS.STATUS_APPROVED",
		"active": "CONTRACTS.STATUS_ACTIVE",
		"rejected": "CONTRACTS.STATUS_REJECTED",
		"canceled": "CONTRACTS.STATUS_CANCELED",
		"closed": "CONTRACTS.STATUS_CLOSED",
		"suspended": "CONTRACTS.STATUS_SUSPENDED",
		"deploying": "CONTRACTS.STATUS_DEPLOYING",
		"deployFailed": "CONTRACTS.STATUS_DEPLOY_FAILED"
	};
	private statusTextIndices = Object.keys(this.statusTextKeys);
	private onLanguageChangeSubscription: Subscription = null;

	constructor(private contractsService: ContractsService,
			private translateService: TranslateService,
			private accountsService: AccountsService,
			private storeNameService: StoreNameService,
			private organizationNameService: OrganizationNameService,
			private memberGroupsService: MemberGroupsService,
			private catalogFiltersService: CatalogFiltersService,
			private priceRulesService: PriceRulesService,
			private paymentMethodsService: PaymentMethodsService,
			private languageService: LanguageService,
			private addressesService: AddressesService,
			private shippingMethodsService: ShippingMethodsService,
			private shippingChargesService: ShippingChargesService,
			private currencyService: CurrencyService) { }

	ngOnInit() {
		this.contractsService.getContractById(this.contractId).subscribe(contract => {
			this.accountId = contract.accountId;
			this.name = contract.name;
			this.description = contract.description;
			this.comment = contract.comment;
			this.statusTextKey = this.statusTextKeys[contract.status] ? this.statusTextKeys[contract.status] : contract.status;
			this.startDate = (!contract.startDate) ? null : (new Date(contract.startDate)).toLocaleString();
			this.endDate = (!contract.endDate) ? null : (new Date(contract.endDate)).toLocaleString();
			this.accountId = contract.accountId;
			this.baseContract = contract.baseContractName;
			this.allowPersonalBillingAddress = contract.allowPersonalBillingAddress ? true : false;
			this.allowParentOrganizationBillingAddress = contract.allowParentOrganizationBillingAddress ? true : false;
			this.allowAccountOrganizationBillingAddress = contract.allowAccountOrganizationBillingAddress ? true : false;
			this.allowPersonalShippingAddress = contract.allowPersonalShippingAddress ? true : false;
			this.allowParentOrganizationShippingAddress = contract.allowParentOrganizationShippingAddress ? true : false;
			this.allowAccountOrganizationShippingAddress = contract.allowAccountOrganizationShippingAddress ? true : false;
			if (contract.orderApprovalMinimumValue) {
				this.orderApprovalMinimumValue = contract.orderApprovalMinimumValue.toFixed(
						this.currencyService.getCurrencyDecimalPlaces(contract.orderApprovalCurrency));
				this.orderApprovalCurrency = contract.orderApprovalCurrency;
			}
			this.accountsService.getAccountById(this.accountId).subscribe(account => {
				this.storeId = account.storeId;
				this.customerOrganizationId = account.customerOrganizationId;
				this.accountName = account.customerOrganizationName;
				if (contract.catalogFilterId) {
					this.catalogFiltersService.getCatalogFilterById({
						id: contract.catalogFilterId,
						storeId: account.storeId
					}).subscribe(catalogFilter => {
						this.catalogFilter = catalogFilter.description;
					});
				}
				this.loadAvailableAddresses();
				this.loadAvailablePaymentMethods();
				this.loadAvailableShippingCharges();
				this.loadAvailableShippingMethods();
			});
			if (contract.priceRuleId) {
				this.priceRulesService.getPriceRuleById(contract.priceRuleId).subscribe(priceRule => {
					this.priceRule = priceRule.name;
					this.storeNameService.getStoreName(priceRule.storeId.toString()).subscribe(storeName => {
						this.priceRule += " - " + storeName;
					});
				});
			}
			this.contractsService.getContractBuyers({
				contractId: this.contractId
			}).subscribe(body => {
				this.buyers = body.items;
				this.populateBuyers();
			});
			this.contractsService.getContractPaymentMethods({
				contractId: this.contractId
			}).subscribe(body => {
				this.paymentMethods = body.items;
				this.populatePaymentMethods();
			});
			this.contractsService.getContractShippingMethods({
				contractId: this.contractId
			}).subscribe(body => {
				this.shippingMethods = body.items;
				this.populateShippingMethods();
			});
			this.contractsService.getContractShippingCharges({
				contractId: this.contractId
			}).subscribe(body => {
				this.shippingCharges = body.items;
				this.populateShippingCharges();
			});
			this.contractsService.getContractShippingAddresses({
				contractId: this.contractId
			}).subscribe(body => {
				this.shippingAddresses = body.items;
				this.populateShippingAddresses();
			});
		});
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.loadAvailablePaymentMethods();
			this.loadAvailableShippingCharges();
			this.loadAvailableShippingMethods();
		});
	}

	ngOnDestroy() {
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	private loadAvailableAddresses() {
		this.addressesService.AddressesGetAddresses({
			memberId: this.customerOrganizationId
		}).subscribe(response => {
			this.availableAddresses = {};
			response.items.forEach(address => {
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
				this.availableAddresses[address.nickName] = addressString;
			});
			this.populateShippingAddresses();
			this.populatePaymentMethods();
		});
	}

	private loadAvailablePaymentMethods() {
		if (this.storeId != null) {
			this.paymentMethodsService.getPaymentMethods({
				storeId: Number(this.storeId),
				languageId: LanguageService.languageId
			}).subscribe(response => {
				this.availablePaymentMethods = {};
				response.items.forEach(paymentMethod => {
					this.availablePaymentMethods[paymentMethod.id] = paymentMethod;
				});
				this.populatePaymentMethods();
			});
		}
	}

	private populatePaymentMethods() {
		if (this.paymentMethods !== null && this.availablePaymentMethods !== null && this.availableAddresses !== null) {
			this.paymentMethods.forEach(paymentMethod => {
				if (this.availablePaymentMethods[paymentMethod.paymentMethodId]) {
					paymentMethod.paymentMethodDescription = this.availablePaymentMethods[paymentMethod.paymentMethodId].description;
				}
				if (paymentMethod.billingAddressNickName && this.availableAddresses[paymentMethod.billingAddressNickName]) {
					paymentMethod.billingAddressString = this.availableAddresses[paymentMethod.billingAddressNickName];
				}
			});
			this.paymentModel.setData(this.paymentMethods);
		}
	}

	private loadAvailableShippingCharges() {
		if (this.storeId != null) {
			this.shippingChargesService.getShippingCharges({
				storeId: Number(this.storeId),
				sort: "description",
				languageId: LanguageService.languageId
			}).subscribe(response => {
				this.availableShippingCharges = {};
				response.items.forEach(shippingCharge => {
					this.availableShippingCharges[shippingCharge.id] = shippingCharge;
				});
				this.populateShippingCharges();
			});
		}
	}

	private populateShippingCharges() {
		if (this.shippingCharges != null && this.availableShippingCharges != null) {
			this.shippingCharges.forEach(shippingCharge => {
				if (this.availableShippingCharges[shippingCharge.shippingChargeId]) {
					shippingCharge.description = this.availableShippingCharges[shippingCharge.shippingChargeId].description;
				}
			});
		}
	}

	private loadAvailableShippingMethods() {
		if (this.storeId != null) {
			this.shippingMethodsService.getShippingMethods({
				storeId: Number(this.storeId),
				sort: "description",
				languageId: LanguageService.languageId
			}).subscribe(response => {
				this.availableShippingMethods = {};
				response.items.forEach(shippingMethod => {
					this.availableShippingMethods[shippingMethod.id] = shippingMethod;
				});
				this.populateShippingMethods();
			});
		}
	}

	private populateShippingMethods() {
		if (this.shippingMethods != null && this.availableShippingMethods != null) {
			this.shippingMethods.forEach(shippingMethod => {
				if (this.availableShippingMethods[shippingMethod.shippingMethodId]) {
					shippingMethod.description = this.availableShippingMethods[shippingMethod.shippingMethodId].description;
				}
			});
		}
	}

	private populateShippingAddresses() {
		if (this.shippingAddresses !== null && this.availableAddresses !== null) {
			this.shippingAddresses.forEach(shippingAddress => {
				if (this.availableAddresses[shippingAddress.shippingAddressNickName]) {
					shippingAddress.addressString = this.availableAddresses[shippingAddress.shippingAddressNickName];
				}
			});
		}
	}

	private populateBuyers() {
		const selectedOrganizations = [];
		const selectedMemberGroups = [];
		this.buyers.forEach(buyer => {
			if (buyer.memberType === "organization") {
				selectedOrganizations.push(buyer);
				if (!buyer.organizationName) {
					this.organizationNameService.getOrganizationName(buyer.memberId).subscribe(organizationName => {
						buyer.organizationName = organizationName;
					});
				}
			} else if (buyer.memberType === "memberGroup") {
				selectedMemberGroups.push(buyer);
				if (!buyer.memberGroupName) {
					this.memberGroupsService.getMemberGroup({
						id: buyer.memberId
					}).subscribe(memberGroup => {
						buyer.memberGroupName = memberGroup.name;
						const organizationId = memberGroup.ownerId;
						this.organizationNameService.getOrganizationName(organizationId).subscribe(organizationName => {
							buyer.organizationName = organizationName;
						});
					});
				}
			}
		});
		this.selectedOrganizations = selectedOrganizations;
		this.selectedMemberGroups = selectedMemberGroups;
	}

	private populatePaymentOptions() {
		this.paymentMethods.forEach(paymentMethod => {
			for (let i = 0; i < this.availablePaymentMethods.length; i++) {
				if (paymentMethod.paymentMethodId === this.availablePaymentMethods[i].id) {
					paymentMethod.paymentMethodDescription = this.availablePaymentMethods[i].description;
					break;
				}
			}
			if (paymentMethod.billingAddressNickName && this.availableAddresses[paymentMethod.billingAddressNickName]) {
				paymentMethod.billingAddressString = this.availableAddresses[paymentMethod.billingAddressNickName];
			}
		});
		this.paymentModel.setData(this.paymentMethods);
	}
}

interface PaymentMethod {
	id?: string;
	paymentMethodId: string;
	paymentMethodDescription?: string;
	description: string;
	billingAddressNickName?: string;
	billingAddressOrganizationId?: string;
	billingAddressString?: string;
	creditCardBrand?: string;
	accountNumber?: string;
	expiryMonth?: string;
	expiryYear?: string;
	checkRoutingNumber?: string;
}

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
