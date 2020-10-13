/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AlertService } from "../../../../services/alert.service";
import { ApiErrorService } from "../../../../services/api-error.service";
import { TranslateService } from "@ngx-translate/core";
import { UserAccountPoliciesService } from "../../../../rest/services/user-account-policies.service";
import { PasswordPoliciesService } from "../../../../rest/services/password-policies.service";
import { UserAccountLockoutPoliciesService } from "../../../../rest/services/user-account-lockout-policies.service";

@Component({
	templateUrl: "./delete-security-policy-dialog.component.html",
	styleUrls: ["./delete-security-policy-dialog.component.scss"]
})
export class DeleteSecurityPolicyDialogComponent implements OnInit {
	deleteSecurityPolicyForm: FormGroup;
	securityPolicyName: string;
	userAccountPolicyId: number;
	processing = false;

	constructor(private alertService: AlertService,
			private apiErrorService: ApiErrorService,
			private translateService: TranslateService,
			private userAccountPoliciesService: UserAccountPoliciesService,
			private passwordPoliciesService: PasswordPoliciesService,
			private userAccountLockoutPoliciesService: UserAccountLockoutPoliciesService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<DeleteSecurityPolicyDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.securityPolicyName = data.name;
		this.userAccountPolicyId = data.id;
	}

	ngOnInit() {
		this.deleteSecurityPolicyForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	deleteSecurityPolicy() {
		this.alertService.clear();
		if (!this.processing) {
			this.processing = true;
			this.userAccountPoliciesService.getUserAccountPolicyById({
				id: this.userAccountPolicyId
			}).subscribe(body => {
				const passwordPolicyId = body.passwordPolicyId;
				const userAccountLockoutPolicyId = body.userAccountLockoutPolicyId;
				this.userAccountPoliciesService.deleteUserAccountPolicyByIdResponse(this.userAccountPolicyId).subscribe(result => {
					this.userAccountPoliciesService.getUserAccountPolicies({
						passwordPolicyId
					}).subscribe(userAccountPoliciesBody => {
						if (userAccountPoliciesBody.items.length === 0) {
							this.passwordPoliciesService.deletePasswordPolicyById(passwordPolicyId).subscribe(deletePasswordPolicyResult => {
							});
						}
					});
					this.userAccountPoliciesService.getUserAccountPolicies({
						userAccountLockoutPolicyId
					}).subscribe(userAccountPoliciesBody => {
						if (userAccountPoliciesBody.items.length === 0) {
							this.userAccountLockoutPoliciesService.deleteUserAccountLockoutPolicyById(userAccountLockoutPolicyId)
									.subscribe(deleteUserAccountLockoutPolicyResult => {
							});
						}
					});
					this.translateService.get("SECURITY_POLICIES.SECURITY_POLICY_DELETED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
					this.processing = false;
					this.dialogRef.close({ securityPolicyDeleted: true });
				},
				deleteErrorResponse => {
					this.processing = false;
					this.apiErrorService.handleError(deleteErrorResponse, errorResponse => {
						if (errorResponse.error && errorResponse.error.errors) {
							errorResponse.error.errors.forEach(error => {
								this.alertService.error({message: error.errorMessage});
							});
						} else if (errorResponse.status === 405) {
							this.translateService.get("SECURITY_POLICIES.SECURITY_POLICY_DELETE_NOT_ALLOWED").subscribe((message: string) => {
								this.alertService.error({message});
							});
							this.dialogRef.close();
						} else {
							console.log(errorResponse);
						}
					});
				});
			},
			errorResponse => {
				this.processing = false;
			});
		}
	}
}
