/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatStep, MatCheckbox } from "@angular/material";
import { FormGroup, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { AccountMainService } from "../../services/account-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./account-purchase-order.component.html",
	styleUrls: ["./account-purchase-order.component.scss"],
	selector: "hc-account-purchase-order"
})
export class AccountPurchaseOrderComponent implements OnInit, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	purchaseOrderForm: FormGroup | any;
	organization: FormControl;

	mustSpecifyPurchaseOrderNumber: FormControl;
	checkPurchaseOrderNumberUniqueness: FormControl;

	@ViewChild("mustSpecifyPurchaseOrderNumberCheck") mustSpecifyPurchaseOrderNumberCheck: MatCheckbox;

	constructor(private route: ActivatedRoute,
			private router: Router,
			private translateService: TranslateService,
			private accountMainService: AccountMainService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
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
		this.step.stepControl = this.purchaseOrderForm;
		setTimeout(() => {
			this.mustSpecifyPurchaseOrderNumberCheck.focus();
		}, 250);
	}

	changeMustSpecifyPurchaseOrderNumber($event) {
		this.accountMainService.accountData.mustSpecifyPurchaseOrderNumber = $event.checked;
	}

	changeCheckPurchaseOrderNumberUniqueness($event) {
		this.accountMainService.accountData.checkPurchaseOrderNumberUniqueness = $event.checked;
	}

	triggerSave() {
		this.save.emit(null);
	}

	private setValues() {
		if (this.accountMainService.accountData != null) {
			const accountData = this.accountMainService.accountData;
			this.mustSpecifyPurchaseOrderNumber.setValue(accountData.mustSpecifyPurchaseOrderNumber ? true : false);
			this.checkPurchaseOrderNumberUniqueness.setValue(accountData.checkPurchaseOrderNumberUniqueness ? true : false);
		} else {
			this.accountMainService.accountData = {
				storeId: Number(this.route.snapshot.params.storeId)
			};
		}
	}

	private createFormControls() {
		this.mustSpecifyPurchaseOrderNumber = new FormControl(false);
		this.checkPurchaseOrderNumberUniqueness = new FormControl(false);
	}

	private createForm() {
		this.purchaseOrderForm = new FormGroup({
			mustSpecifyPurchaseOrderNumber : this.mustSpecifyPurchaseOrderNumber,
			checkPurchaseOrderNumberUniqueness: this.checkPurchaseOrderNumberUniqueness
		});
	}
}
