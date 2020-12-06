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
import { Router } from "@angular/router";
import { MemberGroupMainService } from "../../services/member-group-main.service";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper } from "@angular/material/stepper";

@Component({
	templateUrl: "./edit-member-group.component.html",
	styleUrls: ["./edit-member-group.component.scss"]
})
export class EditMemberGroupComponent implements OnInit, OnDestroy {
	@ViewChild("stepper") stepper: MatStepper;

	usage: string;
	onUsageChangeSubscription: Subscription = null;

	constructor(private router: Router,
			private memberGroupMainService: MemberGroupMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("USER_MANAGEMENT.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.memberGroupMainService.clearData();
		this.router.navigate(["member-groups"]);
	}

	save() {
		if (!this.memberGroupMainService.processing) {
			this.alertService.clear();
			let valid = true;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl && !step.stepControl.valid) {
					valid = false;
				}
			});
			if (valid) {
				this.memberGroupMainService.updateMemberGroup().subscribe(response => {
					this.memberGroupMainService.clearData();
					this.router.navigate(["/member-groups"]);
					this.translateService.get("MEMBER_GROUPS.MEMBER_GROUP_SAVED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
				});
			} else {
				this.translateService.get("MEMBER_GROUPS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
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

}
