/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { MatStep } from "@angular/material/stepper";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AccountMainService } from "../../services/account-main.service";
import { AlertService } from "../../../../services/alert.service";
import { AddressesService } from "../../../../rest/services/addresses.service";
import { ShippingMethodsService } from "../../../../rest/services/shipping-methods.service";
import { ShippingChargesService } from "../../../../rest/services/shipping-charges.service";
import { LanguageService } from "../../../../services/language.service";

@Component({
	selector: "hc-account-shipping",
	templateUrl: "./account-shipping.component.html",
	styleUrls: ["./account-shipping.component.scss"]
})
export class AccountShippingComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	shippingForm: FormGroup | any;
	shippingMethodSearch: FormControl;
	shippingChargeSearch: FormControl;
	shippingAddressSearch: FormControl;
	allowPersonalShippingAddress: FormControl;
	allowParentOrganizationShippingAddress: FormControl;
	allowAccountOrganizationShippingAddress: FormControl;

	availableShippingMethods = [];
	filteredAvailableShippingMethods = [];
	shippingMethods = [];

	availableShippingCharges = [];
	filteredAvailableShippingCharges = [];
	shippingCharges = [];

	availableShippingAddresses = [];
	filteredAvailableShippingAddresses = [];
	shippingAddresses = [];

	@ViewChild("shippingMethodSearchInput") shippingMethodSearchInput: ElementRef<HTMLInputElement>;

	private onLanguageChangeSubscription: Subscription = null;

	constructor(private route: ActivatedRoute,
			private accountMainService: AccountMainService,
			private addressesService: AddressesService,
			private shippingMethodsService: ShippingMethodsService,
			private shippingChargesService: ShippingChargesService,
			private languageService: LanguageService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();

		if (this.mode === "edit") {
			this.accountMainService.loadCurrentAccount(this.route.snapshot.params.id).subscribe(response => {
				this.setValues();
				this.loadAvailableShippingAddresses();
			});
			this.accountMainService.loadCurrentShippingMethods(this.route.snapshot.params.id).subscribe(response => {
				this.shippingMethods = this.accountMainService.shippingMethods;
				this.populateShippingMethods();
			});
			this.accountMainService.loadCurrentShippingCharges(this.route.snapshot.params.id).subscribe(response => {
				this.shippingCharges = this.accountMainService.shippingCharges;
				this.populateShippingCharges();
			});
			this.accountMainService.loadCurrentShippingAddresses(this.route.snapshot.params.id).subscribe(response => {
				this.shippingAddresses = this.accountMainService.shippingAddresses;
			});
		} else {
			this.setValues();
			if (this.accountMainService.shippingMethods === null) {
				this.accountMainService.shippingMethods = [];
			}
			this.shippingMethods = this.accountMainService.shippingMethods;
			if (this.accountMainService.shippingCharges === null) {
				this.accountMainService.shippingCharges = [];
			}
			this.shippingCharges = this.accountMainService.shippingCharges;
			if (this.accountMainService.shippingAddresses === null) {
				this.accountMainService.shippingAddresses = [];
			}
			this.shippingAddresses = this.accountMainService.shippingAddresses;
			this.loadAvailableShippingAddresses();
		}
		this.loadAvailableShippingMethods();
		this.loadAvailableShippingCharges();
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.loadAvailableShippingMethods();
			this.loadAvailableShippingCharges();
		});
	}

	ngAfterViewInit() {
		this.step.stepControl = this.shippingForm;
		setTimeout(() => {
			this.shippingMethodSearchInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	loadAvailableShippingMethods() {
		this.shippingMethodsService.getShippingMethods({
			storeId: Number(this.route.snapshot.params.storeId),
			sort: "description",
			languageId: LanguageService.languageId
		}).subscribe(response => {
			this.availableShippingMethods = response.items;
			this.populateShippingMethods();
			this.searchShippingMethods(this.shippingMethodSearch.value);
		});
	}

	loadAvailableShippingCharges() {
		this.shippingChargesService.getShippingCharges({
			storeId: Number(this.route.snapshot.params.storeId),
			sort: "description",
			languageId: LanguageService.languageId
		}).subscribe(response => {
			this.availableShippingCharges = response.items;
			this.populateShippingCharges();
			this.searchShippingCharges(this.shippingChargeSearch.value);
		});
	}

	loadAvailableShippingAddresses() {
		const { customerOrganizationId } = this.accountMainService.accountData;
		if (customerOrganizationId) {
			this.addressesService.AddressesGetAddresses({
				memberId: customerOrganizationId
			}).subscribe(response => {
				this.availableShippingAddresses = response.items.filter(
					address => address.addressType !== "B"
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
					return {
						...address,
						"content": addressString
					};
				});
				this.searchShippingAddresses(this.shippingAddressSearch.value);
			});
		}
	}

	changeAllowPersonalShippingAddress($event) {
		if (this.accountMainService.accountData) {
			this.accountMainService.accountData.allowPersonalShippingAddress = $event.checked;
		}
	}

	changeAllowParentOrganizationShippingAddress($event) {
		if (this.accountMainService.accountData) {
			this.accountMainService.accountData.allowParentOrganizationShippingAddress = $event.checked;
		}
	}

	changeAllowAccountOrganizationShippingAddress($event) {
		if (this.accountMainService.accountData) {
			this.accountMainService.accountData.allowAccountOrganizationShippingAddress = $event.checked;
		}
	}

	triggerSave() {
		this.shippingForm.markAllAsTouched();
		this.save.emit(null);
	}

	searchShippingMethods(value) {
		if (value) {
			const filterValue = value.toLowerCase();
			const newList = this.availableShippingMethods.filter(
				shippingMethod => shippingMethod.description.toLowerCase().indexOf(filterValue) >= 0
			);
			this.filteredAvailableShippingMethods = newList;
		} else {
			this.filteredAvailableShippingMethods = this.availableShippingMethods;
		}
	}

	clearShippingMethodSearch() {
		this.shippingMethodSearch.setValue("");
		this.searchShippingMethods("");
	}

	isSelectedShippingMethod(shippingMethod) {
		let selected = false;
		if (this.shippingMethods) {
			for (let i = 0; i < this.shippingMethods.length; i++) {
				if (shippingMethod.id === this.shippingMethods[i].shippingMethodId) {
					selected = true;
					break;
				}
			}
		}
		return selected;
	}

	removeShippingMethod(shippingMethod) {
		const index = this.shippingMethods.indexOf(shippingMethod);
		this.shippingMethods.splice(index, 1);
	}

	onChangeShippingMethod(shippingMethod, $event) {
		let index = -1;
		for (let i = 0; i < this.shippingMethods.length; i++) {
			if (shippingMethod.id === this.shippingMethods[i].shippingMethodId) {
				index = i;
				break;
			}
		}
		if ($event.checked) {
			if (index === -1) {
				this.shippingMethods.push({
					shippingMethodId: shippingMethod.id,
					description: shippingMethod.description
				});
			}
		} else {
			if (index >= 0) {
				this.shippingMethods.splice(index, 1);
			}
		}
	}

	searchShippingCharges(value) {
		if (value) {
			const filterValue = value.toLowerCase();
			const newList = this.availableShippingCharges.filter(
				shippingCharge => shippingCharge.description.toLowerCase().indexOf(filterValue) >= 0
			);
			this.filteredAvailableShippingCharges = newList;
		} else {
			this.filteredAvailableShippingCharges = this.availableShippingCharges;
		}
	}

	clearShippingChargeSearch() {
		this.shippingChargeSearch.setValue("");
		this.searchShippingCharges("");
	}

	isSelectedShippingCharge(shippingCharge) {
		let selected = false;
		if (this.shippingCharges) {
			for (let i = 0; i < this.shippingCharges.length; i++) {
				if (shippingCharge.id === this.shippingCharges[i].shippingChargeId) {
					selected = true;
					break;
				}
			}
		}
		return selected;
	}

	removeShippingCharge(shippingCharge) {
		const index = this.shippingCharges.indexOf(shippingCharge);
		this.shippingCharges.splice(index, 1);
	}

	onChangeShippingCharge(shippingCharge, $event) {
		let index = -1;
		for (let i = 0; i < this.shippingCharges.length; i++) {
			if (shippingCharge.id === this.shippingCharges[i].shippingChargeId) {
				index = i;
				break;
			}
		}
		if ($event.checked) {
			if (index === -1) {
				this.shippingCharges.push({
					shippingChargeId: shippingCharge.id,
					description: shippingCharge.description
				});
			}
		} else {
			if (index >= 0) {
				this.shippingCharges.splice(index, 1);
			}
		}
	}

	searchShippingAddresses(value) {
		if (value) {
			const filterValue = value.toLowerCase();
			const newList = this.availableShippingAddresses.filter(
				shippingAddress => shippingAddress.content.toLowerCase().indexOf(filterValue) >= 0
			);
			this.filteredAvailableShippingAddresses = newList;
		} else {
			this.filteredAvailableShippingAddresses = this.availableShippingAddresses;
		}
	}

	clearShippingAddressSearch() {
		this.shippingAddressSearch.setValue("");
		this.searchShippingAddresses("");
	}

	isSelectedShippingAddress(shippingAddress) {
		let selected = false;
		if (this.shippingAddresses) {
			for (let i = 0; i < this.shippingAddresses.length; i++) {
				if (shippingAddress.nickName === this.shippingAddresses[i].shippingAddressNickName) {
					selected = true;
					break;
				}
			}
		}
		return selected;
	}

	removeShippingAddress(shippingAddress) {
		const index = this.shippingAddresses.indexOf(shippingAddress);
		this.shippingAddresses.splice(index, 1);
	}

	onChangeShippingAddress(shippingAddress, $event) {
		let index = -1;
		for (let i = 0; i < this.shippingAddresses.length; i++) {
			if (shippingAddress.nickName === this.shippingAddresses[i].shippingAddressNickName) {
				index = i;
				break;
			}
		}
		if ($event.checked) {
			if (index === -1) {
				this.shippingAddresses.push({
					shippingAddressNickName: shippingAddress.nickName,
					shippingAddressOrganizationId: shippingAddress.memberId
				});
			}
		} else {
			if (index >= 0) {
				this.shippingAddresses.splice(index, 1);
			}
		}
	}

	private setValues() {
		const accountData = this.accountMainService.accountData;
		if (accountData) {
			this.allowPersonalShippingAddress.setValue(accountData.allowPersonalShippingAddress ? true : false);
			this.allowParentOrganizationShippingAddress.setValue(accountData.allowParentOrganizationShippingAddress ? true : false);
			this.allowAccountOrganizationShippingAddress.setValue(accountData.allowAccountOrganizationShippingAddress ? true : false);
		} else {
			this.accountMainService.accountData = {
				storeId: Number(this.route.snapshot.params.storeId)
			};
		}
	}

	private createFormControls() {
		this.shippingMethodSearch = new FormControl("");
		this.shippingChargeSearch = new FormControl("");
		this.shippingAddressSearch = new FormControl("");
		this.allowPersonalShippingAddress = new FormControl(false);
		this.allowParentOrganizationShippingAddress = new FormControl(false);
		this.allowAccountOrganizationShippingAddress = new FormControl(false);
	}

	private createForm() {
		this.shippingForm = new FormGroup({
			shippingMethodSearch: this.shippingMethodSearch,
			shippingChargeSearch: this.shippingChargeSearch,
			shippingAddressSearch: this.shippingAddressSearch,
			allowPersonalShippingAddress: this.allowPersonalShippingAddress,
			allowParentOrganizationShippingAddress: this.allowParentOrganizationShippingAddress,
			allowAccountOrganizationShippingAddress: this.allowAccountOrganizationShippingAddress
		});
	}

	private populateShippingMethods() {
		if (this.shippingMethods != null && this.availableShippingMethods != null) {
			this.shippingMethods.forEach(shippingMethod => {
				for (let i = 0; i < this.availableShippingMethods.length; i++) {
					if (shippingMethod.shippingMethodId === this.availableShippingMethods[i].id) {
						shippingMethod.description = this.availableShippingMethods[i].description;
						break;
					}
				}
			});
		}
	}

	private populateShippingCharges() {
		if (this.shippingCharges != null && this.availableShippingCharges != null) {
			this.shippingCharges.forEach(shippingCharge => {
				for (let i = 0; i < this.availableShippingCharges.length; i++) {
					if (shippingCharge.shippingChargeId === this.availableShippingCharges[i].id) {
						shippingCharge.description = this.availableShippingCharges[i].description;
						break;
					}
				}
			});
		}
	}
}
