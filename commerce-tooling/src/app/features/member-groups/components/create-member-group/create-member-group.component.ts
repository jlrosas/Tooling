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
import { Subscription } from "rxjs";
import { MemberGroupMainService } from "../../services/member-group-main.service";
import { Router } from "@angular/router";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper } from "@angular/material/stepper";

@Component({
	templateUrl: "./create-member-group.component.html",
	styleUrls: ["./create-member-group.component.scss"]
})
export class CreateMemberGroupComponent implements OnInit, OnDestroy {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	usage: string = null;
	onUsageChangeSubscription: Subscription = null;

	constructor(private router: Router,
			private translateService: TranslateService,
			private memberGroupMainService: MemberGroupMainService,
			private alertService: AlertService) { }

	cancel() {
		this.alertService.clear();
		this.memberGroupMainService.clearData();
		this.router.navigate(["member-groups"]);
	}

	ngOnInit() {
		this.onUsageChangeSubscription = this.memberGroupMainService.onUsageChange.subscribe(() => {
			this.usage = this.memberGroupMainService.memberGroupData.usage;
		});
	}

	ngOnDestroy() {
		if (this.onUsageChangeSubscription) {
			this.onUsageChangeSubscription.unsubscribe();
		}
	}

	submit() {
		if (!this.memberGroupMainService.processing) {
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
			if (valid && completedSteps >= 0) {
				this.memberGroupMainService.createMemberGroup().subscribe(
					response => {
						this.memberGroupMainService.clearData();
						this.router.navigate(["/member-groups"]);
						this.translateService.get("MEMBER_GROUPS.MEMBER_GROUP_CREATED_MESSAGE").subscribe((message: string) => {
							this.alertService.success({message});
						});
					},
					errorResponse => {
						if (errorResponse.error && errorResponse.error.errors) {
							errorResponse.error.errors.forEach(error => {
								this.alertService.error({message: error.message});
							});
						} else {
							console.log(errorResponse);
						}
					}
				);
			} else if (!valid) {
				this.translateService.get("MEMBER_GROUPS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			} else {
				this.translateService.get("MEMBER_GROUPS.NOT_COMPLETE_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
