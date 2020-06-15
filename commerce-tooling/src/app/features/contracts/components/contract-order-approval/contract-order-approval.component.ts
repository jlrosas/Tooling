/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component,  OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatStep } from "@angular/material";
import { MatCheckbox } from "@angular/material/checkbox";
import { ContractMainService } from "../../services/contract-main.service";
import { CurrencyService } from "../../../../services/currency.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";

@Component({
	templateUrl: "./contract-order-approval.component.html",
	styleUrls: ["./contract-order-approval.component.scss"],
	selector: "hc-contract-order-approval"
})
export class ContractOrderApprovalComponent implements OnInit, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	orderApprovalForm: any;
	orderApprovalRequired: FormControl;
	orderApprovalMinimumValue: FormControl;
	orderApprovalCurrency: FormControl;

	currencies: Array<string> = [];

	@ViewChild("orderApprovalRequiredCheck", {static: false}) orderApprovalRequiredCheck: MatCheckbox;

	private defaultCurrency: string = null;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private contractMainService: ContractMainService,
			private currencyService: CurrencyService,
			private onlineStoresService: OnlineStoresService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.contractMainService.loadCurrentContract(this.route.snapshot.params.id).subscribe(
				response => {
					this.setValues();
					this.loadCurrencies();
				}
			);
		} else {
			this.setValues();
			this.loadCurrencies();
		}
		this.loadCurrencies();
	}

	ngAfterViewInit() {
		this.step.stepControl = this.orderApprovalForm;
		setTimeout(() => {
			this.orderApprovalRequiredCheck.focus();
		}, 250);
	}

	triggerSave() {
		this.orderApprovalForm.markAllAsTouched();
		this.save.emit(null);
	}

	changeOrderApprovalRequired($event) {
		if ($event.checked) {
			this.orderApprovalMinimumValue.enable();
			this.orderApprovalCurrency.enable();
		} else {
			this.contractMainService.contractData.orderApprovalMinimumValue = null;
			this.contractMainService.contractData.orderApprovalCurrency = null;
			this.orderApprovalMinimumValue.reset();
			this.orderApprovalMinimumValue.disable();
			this.orderApprovalCurrency.setValue(this.defaultCurrency);
			this.orderApprovalCurrency.disable();
		}
	}

	validateOrderApprovalMinimumValue() {
		const contractData = this.contractMainService.contractData;
		if (this.orderApprovalMinimumValue.value !== "") {
			contractData.orderApprovalMinimumValue = Number(this.orderApprovalMinimumValue.value);
			contractData.orderApprovalCurrency = this.orderApprovalCurrency.value;
		} else {
			contractData.orderApprovalMinimumValue = null;
			contractData.orderApprovalCurrency = null;
		}
	}

	selectOrderApprovalCurrency(currency) {
		if (this.contractMainService.contractData.orderApprovalMinimumValue) {
			this.contractMainService.contractData.orderApprovalCurrency = currency;
		}
	}

	private createFormControls() {
		this.orderApprovalRequired = new FormControl(false);
		this.orderApprovalMinimumValue = new FormControl({value: "", disabled: true}, [
			orderApprovalMinimumValue => {
				let errors = null;
				if (orderApprovalMinimumValue.value !== "" && orderApprovalMinimumValue.value !== null &&
				(isNaN(orderApprovalMinimumValue.value) || Number(orderApprovalMinimumValue.value) < 0)) {
					errors = {
						invalidMinimumValue: true
					};
				}
				return errors;
			},
			orderApprovalMinimumValue => {
				let errors = null;
				if (this.orderApprovalRequired &&
					(orderApprovalMinimumValue.value === "" || orderApprovalMinimumValue.value === null)) {
					errors = {
						required: true
					};
				}
				return errors;
			}
		]);
		this.orderApprovalCurrency = new FormControl({value: "", disabled: true});
	}

	private createForm() {
		this.orderApprovalForm = new FormGroup({
			orderApprovalRequired: this.orderApprovalRequired,
			orderApprovalMinimumValue: this.orderApprovalMinimumValue,
			orderApprovalCurrency: this.orderApprovalCurrency
		});
	}

	private loadCurrencies() {
		this.onlineStoresService.getOnlineStoreCurrencies(this.route.snapshot.params.storeId).subscribe(response => {
			this.currencies = response.currencies;
			if (response.defaultCurrency) {
				this.defaultCurrency = response.defaultCurrency;
			}
			if (!this.orderApprovalCurrency.value && this.defaultCurrency) {
				this.orderApprovalCurrency.setValue(this.defaultCurrency);
			}
			if (this.currencies.length === 0) {
				this.onlineStoresService.getOnlineStoreCurrencies(0).subscribe(store0 => {
					this.currencies = store0.currencies;
				});
			}
		});
	}

	private setValues() {
		if (this.contractMainService.contractData !== null) {
			const contractData = this.contractMainService.contractData;
			if (contractData.orderApprovalMinimumValue !== null && contractData.orderApprovalMinimumValue >= 0) {
				this.orderApprovalRequired.setValue(true);
				this.orderApprovalMinimumValue.setValue(contractData.orderApprovalMinimumValue.toFixed(
						this.currencyService.getCurrencyDecimalPlaces(contractData.orderApprovalCurrency)));
				this.orderApprovalCurrency.setValue(contractData.orderApprovalCurrency);
				this.orderApprovalMinimumValue.enable();
				this.orderApprovalCurrency.enable();
			} else {
				this.orderApprovalRequired.setValue(false);
				this.orderApprovalMinimumValue.disable();
				this.orderApprovalCurrency.disable();
			}
		} else {
			this.contractMainService.contractData = {
				accountId: this.route.snapshot.params.accountId
			};
		}
	}
}
