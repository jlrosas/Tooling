/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, Subscription, Observable, Observer } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormGroup, Validators, FormControl, ValidationErrors } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { UserMainService } from "../../services/user-main.service";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { UserAccountPolicyDescriptionsService } from "../../../../rest/services/user-account-policy-descriptions.service";
import { UsersService } from "../../../../rest/services/users.service";
import { LanguageService } from "../../../../services/language.service";
import { AlertService } from "../../../../services/alert.service";
import { MatStep, MatStepper } from "@angular/material/stepper";
import { HcValidators } from "../../../../shared/validators";

@Component({
	templateUrl: "./user-account.component.html",
	styleUrls: ["./user-account.component.scss"],
	selector: "hc-user-account"
})
export class UserAccountComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	accountForm: any;
	logonId: FormControl;
	email1: FormControl;
	password: FormControl;
	parentOrganization: FormControl;
	policy: FormControl;

	passwordVisible = false;
	organizationList: Array<any> = [];
	organizationsLoading = false;
	accountPolicyList: Array<any>;
	getOrganizationsSubscription: Subscription = null;

	@ViewChild("logonIdInput", {static: false}) logonIdInput: ElementRef<HTMLInputElement>;
	@ViewChild("emailInput", {static: false}) emailInput: ElementRef<HTMLInputElement>;

	private organizationSearchString: Subject<string> = new Subject<string>();
	private onLanguageChangeSubscription: Subscription = null;

	constructor(private userMainService: UserMainService,
			private route: ActivatedRoute,
			private organizationsService: OrganizationsService,
			private userAccountPolicyDescriptionsService: UserAccountPolicyDescriptionsService,
			private usersService: UsersService,
			private languageService: LanguageService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.userMainService.loadCurrentUser(this.route.snapshot.params.id).subscribe(
				response => {
					this.setValues();
				}
			);
		} else {
			if (this.userMainService.userData != null) {
				const userData = this.userMainService.userData;
				this.logonId.setValue(userData.logonId);
				this.email1.setValue(userData.address.email1);
				this.password.setValue(userData.password);
				this.parentOrganization.setValue(userData.parentOrganizationName);
			} else {
				this.userMainService.userData = {
					"address": {}
				};
			}
			this.getOrganizations("");
			this.organizationSearchString.pipe(debounceTime(250)).subscribe(searchString => {
				this.getOrganizations(searchString);
			});
		}
		this.initAccountPolicyList();
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.initAccountPolicyList();
		});
	}

	ngAfterViewInit() {
		this.step.stepControl = this.accountForm;
		setTimeout(() => {
			if (this.mode === "create") {
				this.logonIdInput.nativeElement.focus();
			} else {
				this.emailInput.nativeElement.focus();
			}
		}, 250);
	}

	ngOnDestroy() {
		this.organizationSearchString.unsubscribe();
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	next() {
		this.alertService.clear();
		if (this.accountForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("USER_MANAGEMENT.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message, clear: true});
			});
		}
	}

	validateLogonId() {
		this.userMainService.userData.logonId = this.logonId.value;
	}

	validateEmail() {
		this.userMainService.userData.address.email1 = this.email1.value;
	}

	validatePassword() {
		this.userMainService.userData.password = this.password.value;
	}

	searchParentOrganizations(value) {
		this.organizationSearchString.next(value);
	}

	selectParentOrganization(org: any) {
		if (org) {
			this.userMainService.userData.parentOrganizationId = org.id;
			this.userMainService.userData.parentOrganizationName = org.organizationName;
			this.parentOrganization.setValue(org.organizationName);
		} else {
			this.searchParentOrganizations("");
		}
	}

	selectAccountPolicy(accountPolicy: any) {
		this.userMainService.userData.userAccountPolicyId = accountPolicy.userAccountPolicyId;
	}

	triggerSave() {
		this.save.emit(null);
	}

	private getOrganizations(searchString) {
		this.organizationsLoading = true;
		this.getOrganizationsSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
			organizationName: searchString,
			limit: 10
		}).subscribe(
			response => {
				if (response.items.length === 1 && response.items[0].organizationName === searchString) {
					this.selectParentOrganization(response.items[0]);
				} else {
					response.items.sort((org1, org2) => {
						let result = 0;
						if (org1.organizationName < org2.organizationName) {
							result = -1;
						} else if (org1.organizationName > org2.organizationName) {
							result = 1;
						}
						return result;
					});
					this.organizationList = response.items;
				}
				this.getOrganizationsSubscription = null;
				this.organizationsLoading = false;
			},
			error => {
				this.getOrganizationsSubscription = null;
				this.organizationsLoading = false;
				console.log(error);
			}
		);

	}

	private createFormControls() {
		if (this.mode === "edit") {
			this.logonId = new FormControl({value: "", disabled: true});
			this.password = new FormControl("", Validators.minLength(8));
			this.parentOrganization = new FormControl({value: "", disabled: true});
		} else {
			this.logonId = new FormControl("", HcValidators.required, control => {
				return new Observable<ValidationErrors | null>((observer: Observer<ValidationErrors | null>) => {
					if (!control.value) {
						observer.next(null);
						observer.complete();
					} else {
						this.usersService.UsersGetManageableUsers({
							logonId: control.value
						}).subscribe((body: any) => {
							let errors = null;
							if (body && body.items) {
								for (let i = 0; i < body.items.length; i++) {
									const logonId = body.items[i].logonId;
									if (logonId === this.logonId.value) {
										errors = {
											duplicateLoginId: true
										};
										break;
									}
								}
							}
							observer.next(errors);
							observer.complete();
						},
						error => {
							observer.next(null);
							observer.complete();
						});
					}
				});
			});
			this.password = new FormControl("", [
				Validators.required,
				Validators.minLength(8)
			]);
			this.parentOrganization = new FormControl("", [
				Validators.required,
				parentOrganization => {
					const value = parentOrganization.value;
					const userData = this.userMainService.userData;
					let errors = null;
					if (value !== "" &&
							(value !== userData.parentOrganizationName ||
							userData.parentOrganizationId === null)) {
						errors = {
							invalidParentOrganization: true
						};
					}
					return errors;
				}
			]);
		}
		this.email1 = new FormControl("", [
			Validators.required,
			Validators.email
		]);
		this.policy = new FormControl("", Validators.required);
	}

	private createForm() {
		this.accountForm = new FormGroup({
			logonId: this.logonId,
			email1: this.email1,
			password: this.password,
			parentOrganization: this.parentOrganization,
			policy: this.policy
		});
	}

	private setValues() {
		const userData = this.userMainService.userData;
		this.logonId.setValue(userData.logonId);
		this.email1.setValue(userData.address.email1);
		this.password.setValue(userData.password);
		this.parentOrganization.setValue(userData.parentOrganizationName);
		this.setSelectedAccountPolicy();
	}

	private initAccountPolicyList(): void {
		this.accountPolicyList = [];
		this.userAccountPolicyDescriptionsService.getUserAccountPolicyDescriptions({
			languageId: LanguageService.languageId
		}).subscribe(
			response => {
				this.accountPolicyList = response.items.map(value => {
					return {
						"content": value.description,
						"userAccountPolicyId": value.userAccountPolicyId
					};
				});
				this.setSelectedAccountPolicy();
			},
			error => {
				console.log(error);
			}
		);
	}

	private setSelectedAccountPolicy() {
		if (this.accountPolicyList && this.userMainService.userData) {
			const userAccountPolicyId = this.userMainService.userData.userAccountPolicyId;
			if (userAccountPolicyId) {
				for (let i = 0; i < this.accountPolicyList.length; i++) {
					const accountPolicy = this.accountPolicyList[i];
					if (accountPolicy.userAccountPolicyId === userAccountPolicyId) {
						this.policy.setValue(accountPolicy);
						break;
					}
				}
			}
		}
	}
}
