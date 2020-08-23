/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Injectable } from "@angular/core";
import { Observable, Observer, forkJoin } from "rxjs";
import { AccountsService } from "../../../rest/services/accounts.service";
import { PaymentMethodsService } from "../../../rest/services/payment-methods.service";

export interface PurchaseOrder {
	id?: string;
	purchaseOrderNumber: string;
	spendingLimitValue?: number;
	spendingLimitCurrency?: string;
}
export interface PaymentMethod {
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

@Injectable({
	providedIn: "root"
})
export class AccountMainService {
	accountData: any = null;
	shippingAddresses: Array<any> = null;
	shippingCharges: Array<any> = null;
	shippingMethods: Array<any> = null;
	paymentMethods: Array<PaymentMethod> = null;
	creditLinePaymentMethod: any = null;
	purchaseOrders: Array<PurchaseOrder> = null;
	currentAccountId: string = null;
	processing = false;

	private currentAccount: any = null;
	private currentShippingAddresses: Array<any> = null;
	private currentShippingCharges: Array<any> = null;
	private currentShippingMethods: Array<any> = null;
	private currentPaymentMethods: Array<any> = null;
	private currentPurchaseOrders: Array<any> = null;

	constructor(private accountsService: AccountsService,
			private paymentMethodsService: PaymentMethodsService) { }

	clearData() {
		this.accountData = null;
		this.shippingAddresses = null;
		this.shippingCharges = null;
		this.shippingMethods = null;
		this.paymentMethods = null;
		this.creditLinePaymentMethod = null;
		this.purchaseOrders = null;
		this.currentAccountId = null;
		this.currentAccount = null;
		this.currentShippingAddresses = null;
		this.currentShippingCharges = null;
		this.currentShippingMethods = null;
		this.currentPaymentMethods = null;
		this.currentPurchaseOrders = null;
	}

	createAccount(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			this.accountsService.createAccountResponse(this.buildCreateAccountBody()).subscribe(
				response => {
					const paths: Array<string> = response.headers.get("location").split("/");
					const id: string = paths[paths.length - 1];
					const requests = this.getCreateShippingAddressRequests(id)
							.concat(this.getCreateShippingChargeRequests(id))
							.concat(this.getCreateShippingMethodRequests(id))
							.concat(this.getCreatePaymentMethodRequests(id))
							.concat(this.getCreatePurchaseOrderRequests(id));
					if (requests.length === 0) {
						observer.next(undefined);
						observer.complete();
						this.processing = false;
					} else {
						forkJoin(requests).subscribe(
							responseList => {
								observer.next(responseList);
								observer.complete();
								this.processing = false;
							},
							error => {
								observer.error(error);
								observer.complete();
								this.processing = false;
							}
						);
					}
				},
				error => {
					observer.error(error);
					observer.complete();
					this.processing = false;
				}
			);
		});
	}

	updateAccount(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			const updateAccountRequest = this.getUpdateAccountRequest();
			const requests = (updateAccountRequest === null ? [] : [updateAccountRequest])
					.concat(this.getUpdateShippingAddressRequests())
					.concat(this.getUpdateShippingChargeRequests())
					.concat(this.getUpdateShippingMethodRequests())
					.concat(this.getUpdatePaymentMethodRequests())
					.concat(this.getUpdatePurchaseOrderRequests());
			if (requests.length === 0) {
				observer.next(undefined);
				observer.complete();
				this.processing = false;
			} else {
				forkJoin(requests).subscribe(
					responseList => {
						observer.next(responseList);
						observer.complete();
						this.processing = false;
					},
					error => {
						observer.error(error);
						this.processing = false;
					}
				);
			}
		});
	}

	loadCurrentAccount(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentAccount != null && this.currentAccount.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentAccountId) {
					this.clearData();
					this.currentAccountId = id;
				}
				this.accountsService.getAccountById(id).subscribe(
					(body: any) => {
						this.currentAccount = body;
						this.accountData = {
							storeId: body.storeId,
							comment: body.comment,
							customerOrganizationId: body.customerOrganizationId,
							customerOrganizationName: body.customerOrganizationName,
							customerUserId: body.customerUserId,
							customerUserName: body.customerUserName,
							customerContactInformation: body.customerContactInformation,
							allowDefaultContract: body.allowDefaultContract,
							baseContractAccount: body.baseContractAccount,
							mustSpecifyPurchaseOrderNumber: body.mustSpecifyPurchaseOrderNumber,
							checkPurchaseOrderNumberUniqueness: body.checkPurchaseOrderNumberUniqueness,
							allowPersonalBillingAddress: body.allowPersonalBillingAddress,
							allowParentOrganizationBillingAddress: body.allowParentOrganizationBillingAddress,
							allowAccountOrganizationBillingAddress: body.allowAccountOrganizationBillingAddress,
							allowPersonalShippingAddress: body.allowPersonalShippingAddress,
							allowParentOrganizationShippingAddress: body.allowParentOrganizationShippingAddress,
							allowAccountOrganizationShippingAddress: body.allowAccountOrganizationShippingAddress
						};
						observer.next(undefined);
						observer.complete();
					},
					error => {
						observer.error(error);
						observer.complete();
					}
				);
			}
		});
	}

	loadCurrentShippingAddresses(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (id === this.currentAccountId && this.currentShippingAddresses !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentAccountId) {
					this.clearData();
					this.currentAccountId = id;
				}
				this.accountsService.getAccountShippingAddresses({
					accountId: id
				}).subscribe(
					body => {
						this.currentShippingAddresses = body.items;
						this.shippingAddresses = [];
						body.items.forEach(element => {
							this.shippingAddresses.push({
								shippingAddressNickName: element.shippingAddressNickName,
								shippingAddressOrganizationId: element.shippingAddressOrganizationId
							});
						});
						observer.next(undefined);
						observer.complete();
					},
					error => {
						console.log(error);
						observer.next(error);
						observer.complete();
					}
				);
			}
		});
	}

	loadCurrentShippingCharges(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (id === this.currentAccountId && this.currentShippingCharges !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentAccountId) {
					this.clearData();
					this.currentAccountId = id;
				}
				this.accountsService.getAccountShippingCharges({
					accountId: id
				}).subscribe(
					body => {
						this.currentShippingCharges = body.items;
						this.shippingCharges = [];
						body.items.forEach(element => {
							this.shippingCharges.push({
								shippingChargeId: element.shippingChargeId
							});
						});
						observer.next(undefined);
						observer.complete();
					},
					error => {
						console.log(error);
						observer.next(error);
						observer.complete();
					}
				);
			}
		});
	}

	loadCurrentShippingMethods(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (id === this.currentAccountId && this.currentShippingMethods !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentAccountId) {
					this.clearData();
					this.currentAccountId = id;
				}
				this.accountsService.getAccountShippingMethods({
					accountId: id
				}).subscribe(
					body => {
						this.currentShippingMethods = body.items;
						this.shippingMethods = [];
						body.items.forEach(element => {
							this.shippingMethods.push({
								shippingMethodId: element.shippingMethodId
							});
						});
						observer.next(undefined);
						observer.complete();
					},
					error => {
						console.log(error);
						observer.next(error);
						observer.complete();
					}
				);
			}
		});
	}

	loadCurrentPaymentMethods(storeId: number, id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (id === this.currentAccountId && this.currentPaymentMethods !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentAccountId) {
					this.clearData();
					this.currentAccountId = id;
				}
				this.paymentMethodsService.getPaymentMethods({
					storeId: storeId,
					name: "LineOfCredit"
				}).subscribe(result => {
					let lineOfCreditId = null;
					if (result.items.length === 1) {
						lineOfCreditId = result.items[0].id;
					}
					this.accountsService.getAccountPaymentMethods({
						accountId: id
					}).subscribe(body => {
						this.currentPaymentMethods = body.items;
						this.paymentMethods = [];
						body.items.forEach(element => {
							const paymentMethod = {
								id: element.id,
								paymentMethodId: element.paymentMethodId,
								description: element.description,
								billingAddressNickName: element.billingAddressNickName,
								billingAddressOrganizationId: element.billingAddressOrganizationId,
								creditCardBrand: element.creditCardBrand,
								accountNumber: element.accountNumber,
								expiryMonth: element.expiryMonth,
								expiryYear: element.expiryYear,
								checkRoutingNumber: element.checkRoutingNumber
							};
							if (paymentMethod.paymentMethodId === lineOfCreditId) {
								this.creditLinePaymentMethod = paymentMethod;
							} else {
								this.paymentMethods.push(paymentMethod);
							}
						});
						if (!this.creditLinePaymentMethod) {
							this.creditLinePaymentMethod = {
								paymentMethodId: lineOfCreditId
							};
						}
						observer.next(undefined);
						observer.complete();
					},
					error => {
						console.log(error);
						observer.next(error);
						observer.complete();
					});
				},
				error => {
					console.log(error);
					observer.next(error);
					observer.complete();
				});
			}
		});
	}

	loadCurrentPurchaseOrders(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (id === this.currentAccountId && this.currentPurchaseOrders !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentAccountId) {
					this.clearData();
					this.currentAccountId = id;
				}
				this.accountsService.getAccountPurchaseOrders({
					accountId: id
				}).subscribe(
					body => {
						this.currentPurchaseOrders = body.items;
						this.purchaseOrders = [];
						body.items.forEach(element => {
							this.purchaseOrders.push({
								id: element.id,
								purchaseOrderNumber: element.purchaseOrderNumber,
								spendingLimitValue: element.spendingLimitValue,
								spendingLimitCurrency: element.spendingLimitCurrency
							});
						});
						observer.next(undefined);
						observer.complete();
					},
					error => {
						console.log(error);
						observer.next(error);
						observer.complete();
					}
				);
			}
		});
	}

	private buildCreateAccountBody(): any {
		const account = this.accountData;
		const newAccount: any = {
			storeId: account.storeId
		};
		if (account.comment) {
			newAccount.comment = account.comment;
		}
		if (account.customerOrganizationId) {
			newAccount.customerOrganizationId = account.customerOrganizationId;
		}
		if (account.customerUserId) {
			newAccount.customerUserId = account.customerUserId;
		}
		if (account.customerContactInformation) {
			newAccount.customerContactInformation = account.customerContactInformation;
		}
		if (account.allowDefaultContract !== undefined) {
			newAccount.allowDefaultContract = account.allowDefaultContract;
		}
		if (account.baseContractAccount !== undefined) {
			newAccount.baseContractAccount = account.baseContractAccount;
		}
		if (account.mustSpecifyPurchaseOrderNumber !== undefined) {
			newAccount.mustSpecifyPurchaseOrderNumber = account.mustSpecifyPurchaseOrderNumber;
			if (account.checkPurchaseOrderNumberUniqueness !== undefined && newAccount.mustSpecifyPurchaseOrderNumber) {
				newAccount.checkPurchaseOrderNumberUniqueness = account.checkPurchaseOrderNumberUniqueness;
			}
		}
		if (account.allowPersonalBillingAddress !== undefined) {
			newAccount.allowPersonalBillingAddress = account.allowPersonalBillingAddress;
		}
		if (account.allowParentOrganizationBillingAddress !== undefined) {
			newAccount.allowParentOrganizationBillingAddress = account.allowParentOrganizationBillingAddress;
		}
		if (account.allowAccountOrganizationBillingAddress !== undefined) {
			newAccount.allowAccountOrganizationBillingAddress = account.allowAccountOrganizationBillingAddress;
		}
		if (account.allowPersonalShippingAddress !== undefined) {
			newAccount.allowPersonalShippingAddress = account.allowPersonalShippingAddress;
		}
		if (account.allowParentOrganizationShippingAddress !== undefined) {
			newAccount.allowParentOrganizationShippingAddress = account.allowParentOrganizationShippingAddress;
		}
		if (account.allowAccountOrganizationShippingAddress !== undefined) {
			newAccount.allowAccountOrganizationShippingAddress = account.allowAccountOrganizationShippingAddress;
		}
		return newAccount;
	}

	private getCreateShippingAddressRequests(id: string): Array<Observable<any>> {
		const requests = [];
		const shippingAddresses = this.shippingAddresses;
		this.shippingAddresses = null;
		if (shippingAddresses != null) {
			shippingAddresses.forEach(shippingAddress => {
				requests.push(this.accountsService.createAccountShippingAddressResponse({
					accountId: id,
					body: {
						shippingAddressNickName: shippingAddress.shippingAddressNickName,
						shippingAddressOrganizationId: shippingAddress.shippingAddressOrganizationId
					}
				}));
			});
		}
		return requests;
	}

	private getCreateShippingChargeRequests(id: string): Array<Observable<any>> {
		const requests = [];
		const shippingCharges = this.shippingCharges;
		this.shippingCharges = null;
		if (shippingCharges != null) {
			shippingCharges.forEach(shippingCharge => {
				requests.push(this.accountsService.createAccountShippingChargeResponse({
					accountId: id,
					body: {
						shippingChargeId: shippingCharge.shippingChargeId
					}
				}));
			});
		}
		return requests;
	}

	private getCreateShippingMethodRequests(id: string): Array<Observable<any>> {
		const requests = [];
		const shippingMethods = this.shippingMethods;
		this.shippingMethods = null;
		if (shippingMethods != null) {
			shippingMethods.forEach(shippingMethod => {
				requests.push(this.accountsService.createAccountShippingMethodResponse({
					accountId: id,
					body: {
						shippingMethodId: shippingMethod.shippingMethodId
					}
				}));
			});
		}
		return requests;
	}

	private getCreatePaymentMethodRequests(id: string): Array<Observable<any>> {
		const requests = [];
		let paymentMethods = [];
		if (this.paymentMethods != null) {
			paymentMethods = [...this.paymentMethods];
			this.paymentMethods = null;
		}
		if (this.creditLinePaymentMethod && this.creditLinePaymentMethod.accountNumber && this.creditLinePaymentMethod.description) {
			paymentMethods.push(this.creditLinePaymentMethod);
			this.creditLinePaymentMethod = null;
		}
		paymentMethods.forEach(paymentMethod => {
			const body: any = {
				paymentMethodId: paymentMethod.paymentMethodId,
				description: paymentMethod.description
			};
			if (paymentMethod.billingAddressNickName) {
				body.billingAddressNickName = paymentMethod.billingAddressNickName;
			}
			if (paymentMethod.billingAddressOrganizationId) {
				body.billingAddressOrganizationId = paymentMethod.billingAddressOrganizationId;
			}
			if (paymentMethod.creditCardBrand) {
				body.creditCardBrand = paymentMethod.creditCardBrand;
			}
			if (paymentMethod.accountNumber) {
				body.accountNumber = paymentMethod.accountNumber;
			}
			if (paymentMethod.expiryMonth) {
				body.expiryMonth = paymentMethod.expiryMonth;
			}
			if (paymentMethod.expiryYear) {
				body.expiryYear = paymentMethod.expiryYear;
			}
			if (paymentMethod.checkRoutingNumber) {
				body.checkRoutingNumber = paymentMethod.checkRoutingNumber;
			}
			requests.push(this.accountsService.createAccountPaymentMethodResponse({
				accountId: id,
				body: body
			}));
		});
		return requests;
	}

	private getCreatePurchaseOrderRequests(id: string): Array<Observable<any>> {
		const requests = [];
		const purchaseOrders = this.purchaseOrders;
		this.purchaseOrders = null;
		if (purchaseOrders != null) {
			purchaseOrders.forEach(purchaseOrder => {
				const body: any = {
					purchaseOrderNumber: purchaseOrder.purchaseOrderNumber
				};
				if (purchaseOrder.spendingLimitValue !== undefined && purchaseOrder.spendingLimitValue !== null) {
					body.spendingLimitValue = purchaseOrder.spendingLimitValue;
					body.spendingLimitCurrency = purchaseOrder.spendingLimitCurrency;
				}
				requests.push(this.accountsService.createAccountPurchaseOrderResponse({
					accountId: id,
					body: body
				}));
			});
		}
		return requests;
	}

	private getUpdateAccountRequest(): Observable<any> {
		let request: Observable<any> = null;
		if (this.currentAccount != null && this.accountData != null && (
				this.accountData.comment !== this.currentAccount.comment ||
				this.accountData.customerUserId !== this.currentAccount.customerUserId ||
				this.accountData.customerContactInformation !== this.currentAccount.customerContactInformation ||
				this.accountData.allowDefaultContract !== this.currentAccount.allowDefaultContract ||
				this.accountData.mustSpecifyPurchaseOrderNumber !== this.currentAccount.mustSpecifyPurchaseOrderNumber ||
				this.accountData.checkPurchaseOrderNumberUniqueness !== this.currentAccount.checkPurchaseOrderNumberUniqueness ||
				this.accountData.allowPersonalBillingAddress !== this.currentAccount.allowPersonalBillingAddress ||
				this.accountData.allowParentOrganizationBillingAddress !== this.currentAccount.allowParentOrganizationBillingAddress ||
				this.accountData.allowAccountOrganizationBillingAddress !== this.currentAccount.allowAccountOrganizationBillingAddress ||
				this.accountData.allowPersonalShippingAddress !== this.currentAccount.allowPersonalShippingAddress ||
				this.accountData.allowParentOrganizationShippingAddress !== this.currentAccount.allowParentOrganizationShippingAddress ||
				this.accountData.allowAccountOrganizationShippingAddress !== this.currentAccount.allowAccountOrganizationShippingAddress)) {
			const body: any = {
			};
			if (this.accountData.comment !== this.currentAccount.comment) {
				body.comment = this.accountData.comment;
			}
			if (this.accountData.customerUserId !== this.currentAccount.customerUserId) {
				if (this.accountData.customerUserId === null) {
					body.customerUserId = "";
				} else {
					body.customerUserId = this.accountData.customerUserId;
				}
			}
			if (this.accountData.customerContactInformation !== this.currentAccount.customerContactInformation) {
				body.customerContactInformation = this.accountData.customerContactInformation;
			}
			if (this.accountData.allowDefaultContract !== this.currentAccount.allowDefaultContract) {
				body.allowDefaultContract = this.accountData.allowDefaultContract;
			}
			if (this.accountData.mustSpecifyPurchaseOrderNumber !== this.currentAccount.mustSpecifyPurchaseOrderNumber) {
				body.mustSpecifyPurchaseOrderNumber = this.accountData.mustSpecifyPurchaseOrderNumber;
			}
			if (this.accountData.checkPurchaseOrderNumberUniqueness !== this.currentAccount.checkPurchaseOrderNumberUniqueness) {
				body.checkPurchaseOrderNumberUniqueness = this.accountData.checkPurchaseOrderNumberUniqueness;
			}
			if (this.accountData.customerContactInformation !== this.currentAccount.customerContactInformation) {
				body.customerContactInformation = this.accountData.customerContactInformation;
			}
			if (this.accountData.allowPersonalBillingAddress !== this.currentAccount.allowPersonalBillingAddress) {
				body.allowPersonalBillingAddress = this.accountData.allowPersonalBillingAddress;
			}
			if (this.accountData.allowParentOrganizationBillingAddress !== this.currentAccount.allowParentOrganizationBillingAddress) {
				body.allowParentOrganizationBillingAddress = this.accountData.allowParentOrganizationBillingAddress;
			}
			if (this.accountData.allowAccountOrganizationBillingAddress !== this.currentAccount.allowAccountOrganizationBillingAddress) {
				body.allowAccountOrganizationBillingAddress = this.accountData.allowAccountOrganizationBillingAddress;
			}
			if (this.accountData.allowPersonalShippingAddress !== this.currentAccount.allowPersonalShippingAddress) {
				body.allowPersonalShippingAddress = this.accountData.allowPersonalShippingAddress;
			}
			if (this.accountData.allowParentOrganizationShippingAddress !== this.currentAccount.allowParentOrganizationShippingAddress) {
				body.allowParentOrganizationShippingAddress = this.accountData.allowParentOrganizationShippingAddress;
			}
			if (this.accountData.allowAccountOrganizationShippingAddress !== this.currentAccount.allowAccountOrganizationShippingAddress) {
				body.allowAccountOrganizationShippingAddress = this.accountData.allowAccountOrganizationShippingAddress;
			}
			request = this.accountsService.updateAccountResponse({
				id: this.currentAccountId,
				body: body
			});
		}
		return request;
	}

	private getUpdateShippingAddressRequests(): Array<Observable<any>> {
		const requests: Array<Observable<any>> = [];
		if (this.currentShippingAddresses != null) {
			this.currentShippingAddresses.forEach(currentShippingAddress => {
				let found = false;
				if (this.shippingAddresses != null) {
					this.shippingAddresses.forEach(shippingAddress => {
						if (shippingAddress.shippingAddressNickName === currentShippingAddress.shippingAddressNickName &&
								shippingAddress.shippingAddressOrganizationId === currentShippingAddress.shippingAddressOrganizationId) {
							found = true;
						}
					});
				}
				if (!found) {
					requests.push(this.accountsService.deleteAccountShippingAddressResponse({
						accountId: this.currentAccountId,
						id: currentShippingAddress.id
					}));
				}
			});
		}
		if (this.shippingAddresses != null) {
			this.shippingAddresses.forEach(shippingAddress => {
				let found = false;
				if (this.currentShippingAddresses != null) {
					this.currentShippingAddresses.forEach(currentShippingAddress => {
						if (currentShippingAddress.shippingAddressNickName === shippingAddress.shippingAddressNickName &&
								currentShippingAddress.shippingAddressOrganizationId === shippingAddress.shippingAddressOrganizationId) {
							found = true;
						}
					});
				}
				if (!found) {
					requests.push(this.accountsService.createAccountShippingAddressResponse({
						accountId: this.currentAccountId,
						body: {
							shippingAddressNickName: shippingAddress.shippingAddressNickName,
							shippingAddressOrganizationId: shippingAddress.shippingAddressOrganizationId
						}
					}));
				}
			});
		}
		return requests;
	}

	private getUpdateShippingChargeRequests(): Array<Observable<any>> {
		const requests: Array<Observable<any>> = [];
		if (this.currentShippingCharges != null) {
			this.currentShippingCharges.forEach(currentShippingCharge => {
				let found = false;
				if (this.shippingCharges != null) {
					this.shippingCharges.forEach(shippingCharge => {
						if (shippingCharge.shippingChargeId === currentShippingCharge.shippingChargeId) {
							found = true;
						}
					});
				}
				if (!found) {
					requests.push(this.accountsService.deleteAccountShippingChargeResponse({
						accountId: this.currentAccountId,
						id: currentShippingCharge.id
					}));
				}
			});
		}
		if (this.shippingCharges != null) {
			this.shippingCharges.forEach(shippingCharge => {
				let found = false;
				if (this.currentShippingCharges != null) {
					this.currentShippingCharges.forEach(currentShippingCharge => {
						if (currentShippingCharge.shippingChargeId === shippingCharge.shippingChargeId) {
							found = true;
						}
					});
				}
				if (!found) {
					requests.push(this.accountsService.createAccountShippingChargeResponse({
						accountId: this.currentAccountId,
						body: {
							shippingChargeId: shippingCharge.shippingChargeId
						}
					}));
				}
			});
		}
		return requests;
	}

	private getUpdateShippingMethodRequests(): Array<Observable<any>> {
		const requests: Array<Observable<any>> = [];
		if (this.currentShippingMethods != null) {
			this.currentShippingMethods.forEach(currentShippingMethod => {
				let found = false;
				if (this.shippingMethods != null) {
					this.shippingMethods.forEach(shippingMethod => {
						if (shippingMethod.shippingMethodId === currentShippingMethod.shippingMethodId) {
							found = true;
						}
					});
				}
				if (!found) {
					requests.push(this.accountsService.deleteAccountShippingMethodResponse({
						accountId: this.currentAccountId,
						id: currentShippingMethod.id
					}));
				}
			});
		}
		if (this.shippingMethods != null) {
			this.shippingMethods.forEach(shippingMethod => {
				let found = false;
				if (this.currentShippingMethods != null) {
					this.currentShippingMethods.forEach(currentShippingMethod => {
						if (currentShippingMethod.shippingMethodId === shippingMethod.shippingMethodId) {
							found = true;
						}
					});
				}
				if (!found) {
					requests.push(this.accountsService.createAccountShippingMethodResponse({
						accountId: this.currentAccountId,
						body: {
							shippingMethodId: shippingMethod.shippingMethodId
						}
					}));
				}
			});
		}
		return requests;
	}

	private getUpdatePaymentMethodRequests(): Array<Observable<any>> {
		const requests: Array<Observable<any>> = [];
		let paymentMethods = [];
		if (this.paymentMethods != null) {
			paymentMethods = [...this.paymentMethods];
		}
		if (this.creditLinePaymentMethod && this.creditLinePaymentMethod.accountNumber && this.creditLinePaymentMethod.description) {
			paymentMethods.push(this.creditLinePaymentMethod);
		}
		if (this.currentPaymentMethods != null) {
			this.currentPaymentMethods.forEach(currentPaymentMethod => {
				let found = false;
				if (paymentMethods != null) {
					paymentMethods.forEach(paymentMethod => {
						if (paymentMethod.id === currentPaymentMethod.id) {
							found = true;
						}
					});
				}
				if (!found) {
					requests.push(this.accountsService.deleteAccountPaymentMethodResponse({
						accountId: this.currentAccountId,
						id: currentPaymentMethod.id
					}));
				}
			});
		}
		if (paymentMethods != null) {
			paymentMethods.forEach(paymentMethod => {
				let found = false;
				if (this.currentPaymentMethods != null) {
					this.currentPaymentMethods.forEach(currentPaymentMethod => {
						if (currentPaymentMethod.id === paymentMethod.id) {
							found = true;
							if (currentPaymentMethod.paymentMethodId !== paymentMethod.paymentMethodId ||
									currentPaymentMethod.description !== paymentMethod.description ||
									currentPaymentMethod.billingAddressNickName !== paymentMethod.billingAddressNickName ||
									currentPaymentMethod.billingAddressOrganizationId !== paymentMethod.billingAddressOrganizationId ||
									currentPaymentMethod.creditCardBrand !== paymentMethod.creditCardBrand ||
									currentPaymentMethod.accountNumber !== paymentMethod.accountNumber ||
									currentPaymentMethod.expiryMonth !== paymentMethod.expiryMonth ||
									currentPaymentMethod.expiryYear !== paymentMethod.expiryYear ||
									currentPaymentMethod.checkRoutingNumber !== paymentMethod.checkRoutingNumber) {
								const body: any = {
								};
								if (currentPaymentMethod.paymentMethodId !== paymentMethod.paymentMethodId) {
									body.paymentMethodId = paymentMethod.paymentMethodId;
								}
								if (currentPaymentMethod.description !== paymentMethod.description) {
									body.description = paymentMethod.description;
								}
								if (currentPaymentMethod.billingAddressNickName !== paymentMethod.billingAddressNickName ||
										currentPaymentMethod.billingAddressOrganizationId !== paymentMethod.billingAddressOrganizationId) {
									if (paymentMethod.billingAddressNickName === null) {
										body.billingAddressNickName = "";
										body.billingAddressOrganizationId = null;
									} else {
										body.billingAddressNickName = paymentMethod.billingAddressNickName;
										body.billingAddressOrganizationId = paymentMethod.billingAddressOrganizationId;
									}
								}
								if (currentPaymentMethod.creditCardBrand !== paymentMethod.creditCardBrand) {
									if (paymentMethod.creditCardBrand === null) {
										body.creditCardBrand = "";
									} else {
										body.creditCardBrand = paymentMethod.creditCardBrand;
									}
								}
								if (currentPaymentMethod.accountNumber !== paymentMethod.accountNumber) {
									if (paymentMethod.accountNumber === null) {
										body.accountNumber = "";
									} else {
										body.accountNumber = paymentMethod.accountNumber;
									}
								}
								if (currentPaymentMethod.expiryMonth !== paymentMethod.expiryMonth) {
									if (paymentMethod.expiryMonth === null) {
										body.expiryMonth = "";
									} else {
										body.expiryMonth = paymentMethod.expiryMonth;
									}
								}
								if (currentPaymentMethod.expiryYear !== paymentMethod.expiryYear) {
									if (paymentMethod.expiryYear === null) {
										body.expiryYear = "";
									} else {
										body.expiryYear = paymentMethod.expiryYear;
									}
								}
								if (currentPaymentMethod.checkRoutingNumber !== paymentMethod.checkRoutingNumber) {
									if (paymentMethod.checkRoutingNumber === null) {
										body.checkRoutingNumber = "";
									} else {
										body.checkRoutingNumber = paymentMethod.checkRoutingNumber;
									}
								}
								requests.push(this.accountsService.updateAccountPaymentMethodResponse({
									accountId: this.currentAccountId,
									id: paymentMethod.id,
									body: body
								}));
							}
						}
					});
				}
				if (!found) {
					const body: any = {
						paymentMethodId: paymentMethod.paymentMethodId,
						description: paymentMethod.description
					};
					if (paymentMethod.billingAddressNickName) {
						body.billingAddressNickName = paymentMethod.billingAddressNickName;
					}
					if (paymentMethod.billingAddressOrganizationId) {
						body.billingAddressOrganizationId = paymentMethod.billingAddressOrganizationId;
					}
					if (paymentMethod.creditCardBrand) {
						body.creditCardBrand = paymentMethod.creditCardBrand;
					}
					if (paymentMethod.accountNumber) {
						body.accountNumber = paymentMethod.accountNumber;
					}
					if (paymentMethod.expiryMonth) {
						body.expiryMonth = paymentMethod.expiryMonth;
					}
					if (paymentMethod.expiryYear) {
						body.expiryYear = paymentMethod.expiryYear;
					}
					if (paymentMethod.checkRoutingNumber) {
						body.checkRoutingNumber = paymentMethod.checkRoutingNumber;
					}
					requests.push(this.accountsService.createAccountPaymentMethodResponse({
						accountId: this.currentAccountId,
						body: body
					}));
				}
			});
		}
		return requests;
	}

	private getUpdatePurchaseOrderRequests(): Array<Observable<any>> {
		const requests: Array<Observable<any>> = [];
		if (this.currentPurchaseOrders != null) {
			this.currentPurchaseOrders.forEach(currentPurchaseOrder => {
				let found = false;
				if (this.purchaseOrders != null) {
					this.purchaseOrders.forEach(purchaseOrder => {
						if (purchaseOrder.id === currentPurchaseOrder.id) {
							found = true;
						}
					});
				}
				if (!found) {
					requests.push(this.accountsService.deleteAccountPurchaseOrderResponse({
						accountId: this.currentAccountId,
						id: currentPurchaseOrder.id
					}));
				}
			});
		}
		if (this.purchaseOrders != null) {
			this.purchaseOrders.forEach(purchaseOrder => {
				let found = false;
				if (this.currentPurchaseOrders != null) {
					this.currentPurchaseOrders.forEach(currentPurchaseOrder => {
						if (currentPurchaseOrder.id === purchaseOrder.id) {
							found = true;
							if (currentPurchaseOrder.purchaseOrderNumber !== purchaseOrder.purchaseOrderNumber ||
									currentPurchaseOrder.spendingLimitValue !== purchaseOrder.spendingLimitValue ||
									currentPurchaseOrder.spendingLimitCurrency !== purchaseOrder.spendingLimitCurrency) {
								const body: any = {
								};
								if (currentPurchaseOrder.purchaseOrderNumber !== purchaseOrder.purchaseOrderNumber) {
									body.purchaseOrderNumber = purchaseOrder.purchaseOrderNumber;
								}
								if (currentPurchaseOrder.spendingLimitValue !== purchaseOrder.spendingLimitValue ||
										currentPurchaseOrder.spendingLimitCurrency !== purchaseOrder.spendingLimitCurrency) {
									if (purchaseOrder.spendingLimitValue === null) {
										body.spendingLimitValue = -1;
										body.spendingLimitCurrency = null;
									} else {
										body.spendingLimitValue = purchaseOrder.spendingLimitValue;
										body.spendingLimitCurrency = purchaseOrder.spendingLimitCurrency;
									}
								}
								requests.push(this.accountsService.updateAccountPurchaseOrderResponse({
									accountId: this.currentAccountId,
									id: purchaseOrder.id,
									body: body
								}));
							}
						}
					});
				}
				if (!found) {
					const body: any = {
						purchaseOrderNumber: purchaseOrder.purchaseOrderNumber
					};
					if (purchaseOrder.spendingLimitValue !== undefined && purchaseOrder.spendingLimitValue !== null) {
						body.spendingLimitValue = purchaseOrder.spendingLimitValue;
						body.spendingLimitCurrency = purchaseOrder.spendingLimitCurrency;
					}
					requests.push(this.accountsService.createAccountPurchaseOrderResponse({
						accountId: this.currentAccountId,
						body: body
					}));
				}
			});
		}
		return requests;
	}
}
