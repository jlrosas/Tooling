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
import { LanguageDescriptionsService } from "../../../../rest/services/language-descriptions.service";
import { CurrencyDescriptionsService } from "../../../../rest/services/currency-descriptions.service";
import { CurrentUserService } from "../../../../services/current-user.service";

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
	buyerAdministrator: FormControl;
	buyerApprover: FormControl;
	buyer: FormControl;
	phoneNumber: FormControl;
	preferredCurrency: FormControl;
	preferredLanguage: FormControl;
	preferredCommunicationMethod: FormControl;
	challengeQuestion: FormControl;
	challengeAnswer: FormControl;

	passwordVisible = false;
	organizationList: Array<any> = [];
	organizationsLoading = false;
	accountPolicyList: Array<any>;
	getOrganizationsSubscription: Subscription = null;
	organizationCount = 0;
	organizationSearchString = "";

	hasBuyerAdminRole = false;

	isRegisteredCustomer = false;
	isB2BStore = false;
	storeList: Array<any> = [];
	currencyList: Array<any> = [];
	languageList: Array<any> = [];
	communicationMethodList: Array<any> = [
		{
			name: "USER_MANAGEMENT.PREFERRED_METHOD_EMAIL",
			value: "E1"
		},
		{
			name: "USER_MANAGEMENT.PREFERRED_METHOD_PHONE",
			value: "P1"
		}
	];

	@ViewChild("logonIdInput") logonIdInput: ElementRef<HTMLInputElement>;
	@ViewChild("emailInput") emailInput: ElementRef<HTMLInputElement>;

	private organizationSearchString$: Subject<string> = new Subject<string>();
	private onLanguageChangeSubscription: Subscription = null;
	private B2C_STORE_TYPES = new Set([
		"B2C",
		"BBB",
		"MHS",
		"RHS"
	]);

	constructor(private userMainService: UserMainService,
			private route: ActivatedRoute,
			private organizationsService: OrganizationsService,
			private userAccountPolicyDescriptionsService: UserAccountPolicyDescriptionsService,
			private usersService: UsersService,
			private languageService: LanguageService,
			private alertService: AlertService,
			private translateService: TranslateService,
			private currencyDescriptionsService: CurrencyDescriptionsService,
			private languageDescriptionsService: LanguageDescriptionsService,
			private currentUserService: CurrentUserService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		this.initAccountPolicyList();
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.initAccountPolicyList();
			this.initCurrencyList();
			this.initLanguageList();
		});
		this.initCurrencyList();
		this.initLanguageList();
		if (this.mode === "edit") {
			this.userMainService.loadCurrentUser(this.route.snapshot.params.id).subscribe(response => {
				this.setValues();
			});
		} else {
			if (this.userMainService.userData == null) {
				const storeId = (this.route.snapshot.params.storeId && this.route.snapshot.params.storeId !== "0") ?
						Number(this.route.snapshot.params.storeId) : null;
				this.userMainService.userData = {
					storeId,
					isRegisteredCustomer: storeId !== null,
					address: {}
				};
				const userData = this.userMainService.userData;
				if (storeId) {
					userData.userAccountPolicyId = -1;
					userData.storeType = this.route.snapshot.params.storeType;
					if (this.B2C_STORE_TYPES.has(userData.storeType)) {
						userData.profileType = "C";
						userData.parentOrganizationId = "-2000";
						userData.parentOrganizationName = "Default Organization";
					} else {
						userData.profileType = null;
						userData.parentOrganizationId = null;
						userData.parentOrganizationName = null;
					}
				}
			}
			this.setValues();
			this.organizationSearchString$.pipe(debounceTime(250)).subscribe(searchString => {
				this.organizationList = [];
				this.organizationCount = 0;
				this.organizationSearchString = searchString;
				this.getOrganizations();
			});
			this.currentUserService.hasMatchingRole([-1, -21]).subscribe(hasRole => {
				this.hasBuyerAdminRole = hasRole;
			});
			if (this.isRegisteredCustomer) {
				this.policy.disable();
			}
			if (!this.isRegisteredCustomer || this.isB2BStore) {
				this.getOrganizations();
			} else {
				this.parentOrganization.disable();
			}
		}
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
		this.organizationSearchString$.unsubscribe();
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
		this.organizationSearchString$.next(value);
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
		this.userMainService.userData.userAccountPolicyId = accountPolicy;
	}

	triggerSave() {
		this.save.emit(null);
	}

	loadMoreOrganizations() {
		if (this.organizationList.length < this.organizationCount) {
			this.getOrganizations();
		}
	}

	validateBuyerAdministrator($event) {
		this.userMainService.userData.isBuyerAdministrator = $event.checked;
	}

	validateBuyerApprover($event) {
		this.userMainService.userData.isBuyerApprover = $event.checked;
	}

	validateBuyer($event) {
		this.userMainService.userData.isBuyer = $event.checked;
	}

	validatePhoneNumber() {
		this.userMainService.userData.address.phone1 = this.phoneNumber.value;
	}

	validateChallengeQuestion() {
		this.userMainService.userData.challengeQuestion = this.challengeQuestion.value;
	}

	validateChallengeAnswer() {
		this.userMainService.userData.challengeAnswer = this.challengeAnswer.value;
	}

	selectPreferredCurrency(currency: any) {
		this.userMainService.userData.preferredCurrency = currency;
	}

	selectPreferredLanguage(languageId: any) {
		this.userMainService.userData.preferredLanguageId = languageId;
	}

	selectPreferredCommunicationMethod(method: any) {
		this.userMainService.userData.preferredCommunication = method;
	}

	private getOrganizations() {
		this.organizationsLoading = true;
		const searchString = this.organizationSearchString;
		if (this.getOrganizationsSubscription) {
			this.getOrganizationsSubscription.unsubscribe();
			this.getOrganizationsSubscription = null;
		}
		const args: OrganizationsService.OrganizationGetManageableOrganizationsParams = {
			organizationName: searchString,
			sort: "organizationName",
			limit: 10,
			offset: this.organizationList.length
		};
		const storeId = this.userMainService.userData.storeId;
		if (this.isRegisteredCustomer && storeId && !this.B2C_STORE_TYPES.has(this.userMainService.userData.storeType)) {
			args.taskName = "CreateRegisteredCustomer";
			args.storeId = storeId;
		}
		this.getOrganizationsSubscription = this.organizationsService.OrganizationGetManageableOrganizations(args).subscribe(response => {
			if (this.organizationList.length === 0 && response.items.length === 1 && response.items[0].organizationName === searchString) {
				this.selectParentOrganization(response.items[0]);
			} else {
				this.organizationList = [ ...this.organizationList, ...response.items];
			}
			this.organizationCount = response.count;
			this.getOrganizationsSubscription = null;
			this.organizationsLoading = false;
		},
		error => {
			this.getOrganizationsSubscription = null;
			this.organizationsLoading = false;
		});
	}

	private createFormControls() {
		if (this.mode === "edit") {
			this.logonId = new FormControl({value: "", disabled: true});
			this.password = new FormControl("");
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
				Validators.required
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
		this.preferredLanguage = new FormControl();
		this.preferredCurrency = new FormControl();
		this.preferredCommunicationMethod = new FormControl();
		this.phoneNumber = new FormControl();
		this.challengeQuestion = new FormControl();
		this.challengeAnswer = new FormControl();
		this.buyerAdministrator = new FormControl();
		this.buyerApprover = new FormControl();
		this.buyer = new FormControl();
	}

	private createForm() {
		this.accountForm = new FormGroup({
			logonId: this.logonId,
			email1: this.email1,
			password: this.password,
			parentOrganization: this.parentOrganization,
			buyerAdministrator: this.buyerAdministrator,
			buyerApprover: this.buyerApprover,
			buyer: this.buyer,
			policy: this.policy,
			phoneNumber: this.phoneNumber,
			preferredCurrency: this.preferredCurrency,
			preferredLanguage: this.preferredLanguage,
			preferredCommunicationMethod: this.preferredCommunicationMethod,
			challengeQuestion: this.challengeQuestion,
			challengeAnswer: this.challengeAnswer
		});
	}

	private setValues() {
		const userData = this.userMainService.userData;
		this.logonId.setValue(userData.logonId ? userData.logonId : "");
		this.email1.setValue(userData.address.email1 ? userData.address.email1 : "");
		this.password.setValue(userData.password ? userData.password : "");
		this.isRegisteredCustomer = userData.isRegisteredCustomer ? true : false;
		this.isB2BStore = this.isRegisteredCustomer && userData.storeType && !this.B2C_STORE_TYPES.has(userData.storeType);
		this.parentOrganization.setValue(userData.parentOrganizationName ? userData.parentOrganizationName : "");
		this.buyerAdministrator.setValue(!!userData.isBuyerAdministrator);
		this.buyerApprover.setValue(!!userData.isBuyerApprover);
		this.buyer.setValue(!!userData.isBuyer);
		this.policy.setValue(userData.userAccountPolicyId ? userData.userAccountPolicyId : null);
		this.phoneNumber.setValue(userData.address.phone1 ? userData.address.phone1 : "");
		this.preferredCurrency.setValue(userData.preferredCurrency ? userData.preferredCurrency : null);
		this.preferredLanguage.setValue(userData.preferredLanguageId ? userData.preferredLanguageId : null);
		this.preferredCommunicationMethod.setValue(userData.preferredCommunication ? userData.preferredCommunication : null);
		this.challengeQuestion.setValue(userData.challengeQuestion ? userData.challengeQuestion : "");
		this.challengeAnswer.setValue(userData.challengeAnswer ? userData.challengeAnswer : "");
	}

	private initAccountPolicyList(): void {
		this.accountPolicyList = [];
		this.userAccountPolicyDescriptionsService.getUserAccountPolicyDescriptions({
			languageId: LanguageService.languageId
		}).subscribe(response => {
			this.accountPolicyList = response.items.map(value => {
				return {
					"content": value.description,
					"userAccountPolicyId": value.userAccountPolicyId
				};
			});
		});
	}

	private initCurrencyList() {
		this.currencyDescriptionsService.getCurrencyDescriptions({
			languageId: LanguageService.languageId,
			sort: "description"
		}).subscribe((body: any) => {
			const newCurrencyList = [];
			body.items.forEach(currency => {
				newCurrencyList.push({
					code: currency.code,
					displayName: currency.description
				});
			});
			this.currencyList = newCurrencyList.sort((a, b) => a.displayName.localeCompare(b.displayName));
		});
	}

	private initLanguageList() {
		this.languageDescriptionsService.getLanguageDescriptions({
			languageId: LanguageService.languageId,
			sort: "description"
		}).subscribe((body: any) => {
			const newLanguageList = [];
			body.items.forEach(language => {
				newLanguageList.push({
					id: language.descriptionLanguageId,
					displayName: language.description
				});
			});
			this.languageList = newLanguageList.sort((a, b) => a.displayName.localeCompare(b.displayName));
		});
	}

}
