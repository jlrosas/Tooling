/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper } from "@angular/material/stepper";
import { ContractMainService } from "../../services/contract-main.service";

@Component({
	templateUrl: "./edit-contract.component.html",
	styleUrls: ["./edit-contract.component.scss"]
})
export class EditContractComponent implements OnInit {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	accountId: string;
	storeId: string;

	constructor(private router: Router,
		private route: ActivatedRoute,
		private contractMainService: ContractMainService,
		private alertService: AlertService,
		private translateService: TranslateService) { }

	ngOnInit() {
		this.accountId = this.route.snapshot.params.accountId;
		this.storeId = this.route.snapshot.params.storeId;
	}

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("CONTRACTS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.contractMainService.clearData();
		this.router.navigate(["/contracts/contract-list", {accountId: this.accountId, storeId: this.storeId}]);
	}

	save() {
		if (!this.contractMainService.processing) {
			this.alertService.clear();
			let valid = true;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl && !step.stepControl.valid) {
					valid = false;
				}
			});
			if (valid) {
				this.contractMainService.updateContract().subscribe(response => {
					this.contractMainService.clearData();
					this.router.navigate(["/contracts/contract-list", {accountId: this.accountId, storeId: this.storeId}]);
					this.translateService.get("CONTRACTS.CONTRACT_SAVED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
				},
				errorResponse => {
					if (errorResponse.error && errorResponse.error.errors) {
						errorResponse.error.errors.forEach((error: { errorMessage: string; }) => {
							this.alertService.error({message: error.errorMessage});
						});
					} else {
						console.log(errorResponse);
					}
				});
			} else {
				this.translateService.get("CONTRACTS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
