/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatStepper } from "@angular/material/stepper";
import { ContractMainService } from "../../services/contract-main.service";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { ApiErrorService } from "../../../../services/api-error.service";

@Component({
	templateUrl: "./create-contract.component.html",
	styleUrls: ["./create-contract.component.scss"]
})
export class CreateContractComponent implements OnInit {
	@ViewChild("stepper") stepper: MatStepper;

	accountId: string;
	storeId: string;

	constructor(private router: Router,
		private route: ActivatedRoute,
		private contractMainService: ContractMainService,
		private alertService: AlertService,
		private apiErrorService: ApiErrorService,
		private translateService: TranslateService) { }

	ngOnInit() {
		this.accountId = this.route.snapshot.params.accountId;
		this.storeId = this.route.snapshot.params.storeId;
	}

	cancel() {
		this.alertService.clear();
		this.contractMainService.clearData();
		this.router.navigate(["/contracts/contract-list", {accountId: this.accountId, storeId: this.storeId}]);
	}

	submit() {
		if (!this.contractMainService.processing) {
			this.alertService.clear();
			let completedMandatorySteps = 0;
			let valid = true;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl) {
					stepControl.markAllAsTouched();
					if (!stepControl.valid) {
						valid = false;
					}
				}
				if (!step.optional && step.completed) {
					completedMandatorySteps++;
				}
			});
			if (valid && completedMandatorySteps >= 0) {
				this.contractMainService.createContract().subscribe(response => {
					this.contractMainService.clearData();
					this.router.navigate(["contracts", "contract-list", {accountId: this.accountId, storeId: this.storeId}]);
					this.translateService.get("CONTRACTS.CONTRACT_CREATED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
				},
				createErrorResponse => {
					this.apiErrorService.handleError(createErrorResponse, errorResponse => {
						if (errorResponse.error && errorResponse.error.errors) {
							errorResponse.error.errors.forEach((error: { errorMessage: any; errorKey: any; }) => {
								if (error.errorKey === "_ERR_DUPLICATED_CONTRACT_NAME") {
									this.translateService.get("CONTRACTS.DUPLICATE_CONTRACT").subscribe((message: string) => {
										this.alertService.error({message});
									});
								} else {
									this.alertService.error({message: error.errorMessage});
								}
							});
						} else {
							console.log(errorResponse);
						}
					});
				});
			} else if (!valid) {
				this.translateService.get("CONTRACTS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			} else {
				this.translateService.get("CONTRACTS.NOT_COMPLETE_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
