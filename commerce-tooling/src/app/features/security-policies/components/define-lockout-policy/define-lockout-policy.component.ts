/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { MatStep } from "@angular/material/stepper";
import { SecurityPoliciesMainService } from "../../services/security-policies-main.service";

@Component({
	templateUrl: "./define-lockout-policy.component.html",
	styleUrls: ["./define-lockout-policy.component.scss"],
	selector: "hc-define-lockout-policy"
})
export class DefineLockoutPolicyComponent implements OnInit, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Input() lockoutThreshold: FormControl;
	@Input() waitTime: FormControl;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	lockoutPolicyForm: FormGroup | any;
	securityPolicyName: FormControl;

	@ViewChild("lockoutThresholdInput") lockoutThresholdInput: ElementRef<HTMLInputElement>;

	constructor(
			private router: Router,
			private route: ActivatedRoute,
			private securityPoliciesMainService: SecurityPoliciesMainService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.securityPoliciesMainService.loadCurrentUserAccountLockoutPolicy(Number(this.route.snapshot.params.id)).subscribe(
				response => {
					this.setValues();
					this.step.ngOnChanges();
				}
			);
		} else {
			this.setValues();
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.lockoutPolicyForm;
		setTimeout(() => {
			this.lockoutThresholdInput.nativeElement.focus();
		}, 250);
	}

	triggerSave() {
		this.lockoutPolicyForm.markAllAsTouched();
		this.save.emit(null);
	}

	validateLockoutThreshold() {
		this.securityPoliciesMainService.userAccountLockoutPolicyData.lockoutThreshold = this.lockoutThreshold.value;
	}

	validateWaitTime() {
		this.securityPoliciesMainService.userAccountLockoutPolicyData.waitTime = this.waitTime.value;
	}

	private setValues() {
		if (this.securityPoliciesMainService.userAccountLockoutPolicyData === null) {
			this.securityPoliciesMainService.userAccountLockoutPolicyData = {
				lockoutThreshold: 6,
				waitTime: 10
			};
		}
		const userAccountLockoutPolicyData = this.securityPoliciesMainService.userAccountLockoutPolicyData;
		this.lockoutThreshold.setValue(userAccountLockoutPolicyData.lockoutThreshold);
		this.waitTime.setValue(userAccountLockoutPolicyData.waitTime);
	}

	private createFormControls() {
		this.lockoutThreshold = new FormControl(null, lockoutThreshold => {
			let errors = null;
			if (lockoutThreshold.value !== "" && lockoutThreshold.value !== null &&
					isNaN(lockoutThreshold.value)) {
				errors = {
					invalidLockoutThreshold: true
				};
			}
			return errors;
		});

		this.waitTime = new FormControl(null, waitTime => {
			let errors = null;
			if (waitTime.value !== "" && waitTime.value !== null && isNaN(waitTime.value)) {
				errors = {
					invalidWaitTime: true
				};
			}
			return errors;
		});
	}

	private createForm() {
		this.lockoutPolicyForm = new FormGroup({
			lockoutThreshold: this.lockoutThreshold,
			waitTime: this.waitTime
		});
	}
}
