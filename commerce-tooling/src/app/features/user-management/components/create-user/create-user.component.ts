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
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { UserMainService } from "../../services/user-main.service";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper } from "@angular/material/stepper";

@Component({
	templateUrl: "./create-user.component.html",
	styleUrls: ["./create-user.component.scss"]
})
export class CreateUserComponent implements OnInit, OnDestroy {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	isRegisteredCustomer: boolean = null;
	onIsRegisteredCustomerSubscription: Subscription = null;

	constructor(private router: Router,
			private userMainService: UserMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	ngOnInit() {
		this.onIsRegisteredCustomerSubscription = this.userMainService.onIsRegisteredCustomerChange.subscribe(() => {
			this.isRegisteredCustomer = this.userMainService.userData.isRegisteredCustomer;
		});
	}

	ngOnDestroy() {
		if (this.onIsRegisteredCustomerSubscription) {
			this.onIsRegisteredCustomerSubscription.unsubscribe();
		}
	}

	cancel() {
		this.alertService.clear();
		this.userMainService.clearData();
		this.router.navigate(["/users"]);
	}

	submit() {
		if (!this.userMainService.processing) {
			this.alertService.clear();
			let completedSteps = 0;
			let valid = true;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl) {
					stepControl.markAllAsTouched();
					if (!stepControl.valid) {
						valid = false;
					}
				}
				if (step.completed) {
					completedSteps++;
				}
			});
			if (valid && completedSteps >= 1) {
				this.userMainService.createUser().subscribe(name => {
					this.userMainService.clearData();
					this.router.navigate(["/users"]);
					this.translateService.get("USER_MANAGEMENT.USER_CREATED_MESSAGE", { name }).subscribe((message: string) => {
						this.alertService.success({message});
					});
				});
			} else if (!valid) {
				this.translateService.get("USER_MANAGEMENT.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			} else {
				this.translateService.get("USER_MANAGEMENT.NOT_COMPLETE_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
