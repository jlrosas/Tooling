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
import { ContractsService } from "../../../rest/services/contracts.service";

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
export class ContractMainService {
	contractData: any = null;
	buyers: Array<any> = null;
	shippingAddresses: Array<any> = null;
	shippingCharges: Array<any> = null;
	shippingMethods: Array<any> = null;
	paymentMethods: Array<PaymentMethod> = null;
	currentContractId: string = null;
	processing = false;

	private currentContract: any = null;
	private currentBuyers: Array<any> = null;
	private currentShippingAddresses: Array<any> = null;
	private currentShippingCharges: Array<any> = null;
	private currentShippingMethods: Array<any> = null;
	private currentPaymentMethods: Array<any> = null;

	constructor(private contractsService: ContractsService) { }

	clearData() {
		this.contractData = null;
		this.buyers = null;
		this.shippingAddresses = null;
		this.shippingCharges = null;
		this.shippingMethods = null;
		this.paymentMethods = null;
		this.currentContractId = null;
		this.currentContract = null;
		this.currentBuyers = null;
		this.currentShippingAddresses = null;
		this.currentShippingCharges = null;
		this.currentShippingMethods = null;
		this.currentPaymentMethods = null;
	}

	createContract(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			this.contractsService.createContractResponse(this.buildCreateContractBody()).subscribe(
				response => {
					const paths: Array<string> = response.headers.get("location").split("/");
					const id: string = paths[paths.length - 1];
					const requests = this.getCreateBuyerRequests(id)
							.concat(this.getCreateShippingAddressRequests(id))
							.concat(this.getCreateShippingChargeRequests(id))
							.concat(this.getCreateShippingMethodRequests(id))
							.concat(this.getCreatePaymentMethodRequests(id));
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
							}
						);
					}
				},
				error => {
					console.log(error);
					observer.error(error);
					observer.complete();
					this.processing = false;
				}
			);
		});
	}

	updateContract(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			const updateContractRequest = this.getUpdateContractRequest();
			const requests = (updateContractRequest === null ? [] : [updateContractRequest])
					.concat(this.getUpdateBuyerRequests())
					.concat(this.getUpdateShippingAddressRequests())
					.concat(this.getUpdateShippingChargeRequests())
					.concat(this.getUpdateShippingMethodRequests())
					.concat(this.getUpdatePaymentMethodRequests());
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

	loadCurrentContract(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentContract != null && this.currentContract.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentContractId) {
					this.clearData();
					this.currentContractId = id;
				}
				this.contractsService.getContractById(id).subscribe(
					(body: any) => {
						this.currentContract = body;
						this.contractData = {
							accountId: body.accountId,
							name: body.name,
							description: body.description,
							longDescription: body.longDescription,
							comment: body.comment,
							startDate: body.startDate,
							endDate: body.endDate,
							baseContractId: body.baseContractId,
							baseContractName: body.baseContractName,
							allowAccountCreditLine: body.allowAccountCreditLine,
							allowPersonalBillingAddress: body.allowPersonalBillingAddress,
							allowParentOrganizationBillingAddress: body.allowParentOrganizationBillingAddress,
							allowAccountOrganizationBillingAddress: body.allowAccountOrganizationBillingAddress,
							allowPersonalShippingAddress: body.allowPersonalShippingAddress,
							allowParentOrganizationShippingAddress: body.allowParentOrganizationShippingAddress,
							allowAccountOrganizationShippingAddress: body.allowAccountOrganizationShippingAddress,
							priceRuleId: body.priceRuleId,
							catalogFilterId: body.catalogFilterId,
							orderApprovalMinimumValue: body.orderApprovalMinimumValue,
							orderApprovalCurrency: body.orderApprovalCurrency
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

	loadCurrentBuyers(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (id === this.currentContractId && this.currentBuyers !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentContractId) {
					this.clearData();
					this.currentContractId = id;
				}
				this.contractsService.getContractBuyers({
					contractId: id
				}).subscribe(
					body => {
						this.currentBuyers = body.items;
						this.buyers = [];
						body.items.forEach(element => {
							this.buyers.push({
								memberId: element.memberId,
								memberType: element.memberType
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

	loadCurrentShippingAddresses(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (id === this.currentContractId && this.currentShippingAddresses !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentContractId) {
					this.clearData();
					this.currentContractId = id;
				}
				this.contractsService.getContractShippingAddresses({
					contractId: id
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
			if (id === this.currentContractId && this.currentShippingCharges !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentContractId) {
					this.clearData();
					this.currentContractId = id;
				}
				this.contractsService.getContractShippingCharges({
					contractId: id
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
			if (id === this.currentContractId && this.currentShippingMethods !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentContractId) {
					this.clearData();
					this.currentContractId = id;
				}
				this.contractsService.getContractShippingMethods({
					contractId: id
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
			if (id === this.currentContractId && this.currentPaymentMethods !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentContractId) {
					this.clearData();
					this.currentContractId = id;
				}
				this.contractsService.getContractPaymentMethods({
					contractId: id
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
						this.paymentMethods.push(paymentMethod);
					});
					observer.next(undefined);
					observer.complete();
				},
				error => {
					console.log(error);
					observer.next(error);
					observer.complete();
				});
			}
		});
	}

	private buildCreateContractBody(): any {
		const contract = this.contractData;
		const newContract: any = {
			accountId: contract.accountId
		};
		if (contract.name) {
			newContract.name = contract.name;
		}
		if (contract.description) {
			newContract.description = contract.description;
		}
		if (contract.longDescription) {
			newContract.longDescription = contract.longDescription;
		}
		if (contract.comment) {
			newContract.comment = contract.comment;
		}
		if (contract.startDate) {
			newContract.startDate = (new Date(contract.startDate)).toISOString();
		}
		if (contract.endDate) {
			newContract.endDate = (new Date(contract.endDate)).toISOString();
		}
		if (contract.baseContractId) {
			newContract.baseContractId = contract.baseContractId;
		}
		if (contract.allowAccountCreditLine !== undefined) {
			newContract.allowAccountCreditLine = contract.allowAccountCreditLine;
		}
		if (contract.allowPersonalBillingAddress !== undefined) {
			newContract.allowPersonalBillingAddress = contract.allowPersonalBillingAddress;
		}
		if (contract.allowParentOrganizationBillingAddress !== undefined) {
			newContract.allowParentOrganizationBillingAddress = contract.allowParentOrganizationBillingAddress;
		}
		if (contract.allowAccountOrganizationBillingAddress !== undefined) {
			newContract.allowAccountOrganizationBillingAddress = contract.allowAccountOrganizationBillingAddress;
		}
		if (contract.allowPersonalShippingAddress !== undefined) {
			newContract.allowPersonalShippingAddress = contract.allowPersonalShippingAddress;
		}
		if (contract.allowParentOrganizationShippingAddress !== undefined) {
			newContract.allowParentOrganizationShippingAddress = contract.allowParentOrganizationShippingAddress;
		}
		if (contract.allowAccountOrganizationShippingAddress !== undefined) {
			newContract.allowAccountOrganizationShippingAddress = contract.allowAccountOrganizationShippingAddress;
		}
		if (contract.priceRuleId) {
			newContract.priceRuleId = contract.priceRuleId;
		}
		if (contract.catalogFilterId) {
			newContract.catalogFilterId = contract.catalogFilterId;
		}
		if (contract.orderApprovalMinimumValue && contract.orderApprovalCurrency) {
			newContract.orderApprovalMinimumValue = contract.orderApprovalMinimumValue;
			newContract.orderApprovalCurrency = contract.orderApprovalCurrency;
		}
		return newContract;
	}

	private getCreateBuyerRequests(id: string): Array<Observable<any>> {
		const requests = [];
		const buyers = this.buyers;
		this.buyers = null;
		if (buyers != null) {
			buyers.forEach(buyer => {
				requests.push(this.contractsService.createContractBuyerResponse({
					contractId: id,
					body: {
						memberId: buyer.memberId
					}
				}));
			});
		}
		return requests;
	}

	private getCreateShippingAddressRequests(id: string): Array<Observable<any>> {
		const requests = [];
		const shippingAddresses = this.shippingAddresses;
		this.shippingAddresses = null;
		if (shippingAddresses != null) {
			shippingAddresses.forEach(shippingAddress => {
				requests.push(this.contractsService.createContractShippingAddressResponse({
					contractId: id,
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
				requests.push(this.contractsService.createContractShippingChargeResponse({
					contractId: id,
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
				requests.push(this.contractsService.createContractShippingMethodResponse({
					contractId: id,
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
		const paymentMethods = this.paymentMethods;
		if (paymentMethods != null) {
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
				requests.push(this.contractsService.createContractPaymentMethodResponse({
					contractId: id,
					body: body
				}));
			});
		}
		return requests;
	}

	private getUpdateContractRequest(): Observable<any> {
		let request: Observable<any> = null;
		if (this.currentContract != null && this.contractData != null) {
			const body: any = {
			};
			if (this.contractData.description !== this.currentContract.description) {
				body.description = this.contractData.description;
			}
			if (this.contractData.longDescription !== this.currentContract.longDescription) {
				body.longDescription = this.contractData.longDescription;
			}
			if (this.contractData.comment !== this.currentContract.comment) {
				body.comment = this.contractData.comment;
			}
			if (this.contractData.startDate !== this.currentContract.startDate) {
				if (this.contractData.startDate === null) {
					body.startDate = "";
				} else {
					body.startDate = (new Date(this.contractData.startDate)).toISOString();
				}
			}
			if (this.contractData.endDate !== this.currentContract.endDate) {
				if (this.contractData.endDate === null) {
					body.endDate = "";
				} else {
					body.endDate = (new Date(this.contractData.endDate)).toISOString();
				}
			}
			if (this.contractData.baseContractId !== this.currentContract.baseContractId) {
				if (this.contractData.baseContractId === null) {
					body.baseContractId = "";
				} else {
					body.baseContractId = this.contractData.baseContractId;
				}
			}
			if (this.contractData.allowAccountCreditLine !== this.currentContract.allowAccountCreditLine) {
				body.allowAccountCreditLine = this.contractData.allowAccountCreditLine;
			}
			if (this.contractData.allowPersonalBillingAddress !== this.currentContract.allowPersonalBillingAddress) {
				body.allowPersonalBillingAddress = this.contractData.allowPersonalBillingAddress;
			}
			if (this.contractData.allowParentOrganizationBillingAddress !== this.currentContract.allowParentOrganizationBillingAddress) {
				body.allowParentOrganizationBillingAddress = this.contractData.allowParentOrganizationBillingAddress;
			}
			if (this.contractData.allowAccountOrganizationBillingAddress !== this.currentContract.allowAccountOrganizationBillingAddress) {
				body.allowAccountOrganizationBillingAddress = this.contractData.allowAccountOrganizationBillingAddress;
			}
			if (this.contractData.allowPersonalShippingAddress !== this.currentContract.allowPersonalShippingAddress) {
				body.allowPersonalShippingAddress = this.contractData.allowPersonalShippingAddress;
			}
			if (this.contractData.allowParentOrganizationShippingAddress !== this.currentContract.allowParentOrganizationShippingAddress) {
				body.allowParentOrganizationShippingAddress = this.contractData.allowParentOrganizationShippingAddress;
			}
			if (this.contractData.allowAccountOrganizationShippingAddress !== this.currentContract.allowAccountOrganizationShippingAddress) {
				body.allowAccountOrganizationShippingAddress = this.contractData.allowAccountOrganizationShippingAddress;
			}
			if (this.contractData.priceRuleId !== this.currentContract.priceRuleId) {
				if (this.contractData.priceRuleId === null) {
					body.priceRuleId = "";
				} else {
					body.priceRuleId = this.contractData.priceRuleId;
				}
			}
			if (this.contractData.catalogFilterId !== this.currentContract.catalogFilterId) {
				if (this.contractData.catalogFilterId === null) {
					body.catalogFilterId = "";
				} else {
					body.catalogFilterId = this.contractData.catalogFilterId;
				}
			}
			if (this.contractData.orderApprovalMinimumValue !== this.currentContract.orderApprovalMinimumValue) {
				if (this.contractData.orderApprovalMinimumValue === null) {
					body.orderApprovalMinimumValue = "";
				} else {
					body.orderApprovalMinimumValue = this.contractData.orderApprovalMinimumValue;
				}
			}
			if (this.contractData.orderApprovalCurrency !== this.currentContract.orderApprovalCurrency) {
				body.orderApprovalCurrency = this.contractData.orderApprovalCurrency;
			}
			request = this.contractsService.updateContractResponse({
				id: this.currentContractId,
				body: body
			});
		}
		return request;
	}

	private getUpdateBuyerRequests(): Array<Observable<any>> {
		const requests: Array<Observable<any>> = [];
		if (this.currentBuyers != null) {
			this.currentBuyers.forEach(currentBuyer => {
				let found = false;
				if (this.buyers != null) {
					this.buyers.forEach(buyer => {
						if (buyer.memberId === currentBuyer.memberId) {
							found = true;
						}
					});
				}
				if (!found) {
					requests.push(this.contractsService.deleteContractBuyerResponse({
						contractId: this.currentContractId,
						id: currentBuyer.id
					}));
				}
			});
		}
		if (this.buyers != null) {
			this.buyers.forEach(buyer => {
				let found = false;
				if (this.currentBuyers != null) {
					this.currentBuyers.forEach(currentBuyer => {
						if (currentBuyer.memberId === buyer.memberId) {
							found = true;
						}
					});
				}
				if (!found) {
					requests.push(this.contractsService.createContractBuyerResponse({
						contractId: this.currentContractId,
						body: {
							memberId: buyer.memberId
						}
					}));
				}
			});
		}
		return requests;
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
					requests.push(this.contractsService.deleteContractShippingAddressResponse({
						contractId: this.currentContractId,
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
					requests.push(this.contractsService.createContractShippingAddressResponse({
						contractId: this.currentContractId,
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
					requests.push(this.contractsService.deleteContractShippingChargeResponse({
						contractId: this.currentContractId,
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
					requests.push(this.contractsService.createContractShippingChargeResponse({
						contractId: this.currentContractId,
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
					requests.push(this.contractsService.deleteContractShippingMethodResponse({
						contractId: this.currentContractId,
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
					requests.push(this.contractsService.createContractShippingMethodResponse({
						contractId: this.currentContractId,
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
		const paymentMethods = this.paymentMethods;
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
					requests.push(this.contractsService.deleteContractPaymentMethodResponse({
						contractId: this.currentContractId,
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
								requests.push(this.contractsService.updateContractPaymentMethodResponse({
									contractId: this.currentContractId,
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
					requests.push(this.contractsService.createContractPaymentMethodResponse({
						contractId: this.currentContractId,
						body: body
					}));
				}
			});
		}
		return requests;
	}
}
