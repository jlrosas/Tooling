/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component,  OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { MatStep } from "@angular/material/stepper";
import { MatCheckbox } from "@angular/material/checkbox";
import { FormGroup, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../../services/alert.service";
import { ContractMainService } from "../../services/contract-main.service";

@Component({
	templateUrl: "./contract-payment-billing.component.html",
	styleUrls: ["./contract-payment-billing.component.scss"],
	selector: "hc-contract-payment-billing"
})
export class ContractPaymentBillingComponent implements OnInit, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	paymentBillingForm: FormGroup | any;
	allowPersonalBillingAddress: FormControl;
	allowParentOrganizationBillingAddress: FormControl;
	allowAccountOrganizationBillingAddress: FormControl;

	@ViewChild("allowPersonalBillingAddressCheck", {static: false}) allowPersonalBillingAddressCheck: MatCheckbox;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private contractMainService: ContractMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	ngOnInit() {
		this.createFormElement();
		this.createForm();
		if (this.mode === "edit") {
			this.contractMainService.loadCurrentContract(this.route.snapshot.params.id).subscribe(
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
		if (this.contractMainService.contractData) {
			this.contractMainService.contractData.allowPersonalBillingAddress = $event.checked;
		}
	}

	changeAllowParentOrganizationBillingAddress($event) {
		if (this.contractMainService.contractData) {
			this.contractMainService.contractData.allowParentOrganizationBillingAddress = $event.checked;
		}
	}

	changeAllowAccountOrganizationBillingAddress($event) {
		if (this.contractMainService.contractData) {
			this.contractMainService.contractData.allowAccountOrganizationBillingAddress = $event.checked;
		}
	}

	triggerSave() {
		this.save.emit(null);
	}

	private setValues() {
		const contractData = this.contractMainService.contractData;
		if (contractData) {
			this.allowPersonalBillingAddress.setValue(contractData.allowPersonalBillingAddress ? true : false);
			this.allowParentOrganizationBillingAddress.setValue(contractData.allowParentOrganizationBillingAddress ? true : false);
			this.allowAccountOrganizationBillingAddress.setValue(contractData.allowAccountOrganizationBillingAddress ? true : false);
		} else {
			this.contractMainService.contractData = {
				accountId: Number(this.route.snapshot.params.accountId)
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
