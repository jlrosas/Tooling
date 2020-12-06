/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import { MatStep } from "@angular/material/stepper";
import { MatCheckbox } from "@angular/material/checkbox";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AccountMainService } from "../../services/account-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	selector: "hc-account-payment-billing",
	templateUrl: "./account-payment-billing.component.html",
	styleUrls: ["./account-payment-billing.component.scss"]
})
export class AccountAndPaymentBillingComponent implements OnInit, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	paymentBillingForm: FormGroup | any;
	allowPersonalBillingAddress: FormControl;
	allowParentOrganizationBillingAddress: FormControl;
	allowAccountOrganizationBillingAddress: FormControl;

	@ViewChild("allowPersonalBillingAddressCheck") allowPersonalBillingAddressCheck: MatCheckbox;

	constructor(private route: ActivatedRoute,
			private router: Router,
			private translateService: TranslateService,
			private accountMainService: AccountMainService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormElement();
		this.createForm();
		if (this.mode === "edit") {
			this.accountMainService.loadCurrentAccount(this.route.snapshot.params.id).subscribe(
				response => {
					this.setValues();
				}
			);
		} else {
			this.setValues();
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.paymentBillingForm;
		setTimeout(() => {
			this.allowPersonalBillingAddressCheck.focus();
		}, 250);
	}

	changeAllowPersonalBillingAddress($event) {
		if (this.accountMainService.accountData) {
			this.accountMainService.accountData.allowPersonalBillingAddress = $event.checked;
		}
	}

	changeAllowParentOrganizationBillingAddress($event) {
		if (this.accountMainService.accountData) {
			this.accountMainService.accountData.allowParentOrganizationBillingAddress = $event.checked;
		}
	}

	changeAllowAccountOrganizationBillingAddress($event) {
		if (this.accountMainService.accountData) {
			this.accountMainService.accountData.allowAccountOrganizationBillingAddress = $event.checked;
		}
	}

	triggerSave() {
		this.paymentBillingForm.markAllAsTouched();
		this.save.emit(null);
	}

	private setValues() {
		const accountData = this.accountMainService.accountData;
		if (accountData) {
			this.allowPersonalBillingAddress.setValue(accountData.allowPersonalBillingAddress ? true : false);
			this.allowParentOrganizationBillingAddress.setValue(accountData.allowParentOrganizationBillingAddress ? true : false);
			this.allowAccountOrganizationBillingAddress.setValue(accountData.allowAccountOrganizationBillingAddress ? true : false);
		} else {
			this.accountMainService.accountData = {
				storeId: Number(this.route.snapshot.params.storeId)
			};
		}
	}

	private createFormElement() {
		this.allowPersonalBillingAddress = new FormControl(false);
		this.allowParentOrganizationBillingAddress = new FormControl(false);
		this.allowAccountOrganizationBillingAddress = new FormControl(false);
	}

	private createForm() {
		this.paymentBillingForm = new FormGroup({
			allowPersonalBillingAddress: this.allowPersonalBillingAddress,
			allowParentOrganizationBillingAddress: this.allowParentOrganizationBillingAddress,
			allowAccountOrganizationBillingAddress: this.allowAccountOrganizationBillingAddress
		});
	}

}
