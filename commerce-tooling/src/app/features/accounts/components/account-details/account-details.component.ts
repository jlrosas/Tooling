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
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Subscription, Subject } from "rxjs";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { debounceTime } from "rxjs/operators";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { UsersService } from "../../../../rest/services/users.service";
import { AccountMainService } from "../../services/account-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./account-details.component.html",
	styleUrls: ["./account-details.component.scss"],
	selector: "hc-account-details"
})
export class AccountDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: FormGroup | any;
	organization: FormControl;
	contact: FormControl;
	contactInformation: FormControl;
	allowDefaultContract: FormControl;
	baseContractAccount: FormControl;
	comment: FormControl;

	organizationList: Array<any> = [];
	getOrganizationsSubscription: Subscription = null;

	userList: Array<any> = [];
	getUsersSubscription: Subscription = null;

	@ViewChild("organizationInput", {static: false}) organizationInput: ElementRef<HTMLInputElement>;
	@ViewChild("contactInput", {static: false}) contactInput: ElementRef<HTMLInputElement>;

	private organizationSearchString: Subject<string> = new Subject<string>();
	private userSearchString: Subject<string> = new Subject<string>();

	constructor(
			private router: Router,
			private route: ActivatedRoute,
			private translateService: TranslateService,
			private accountMainService: AccountMainService,
			private organizationsService: OrganizationsService,
			private usersService: UsersService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.accountMainService.loadCurrentAccount(this.route.snapshot.params.id).subscribe(
				response => {
					this.setValues();
					if (this.contact.value === "") {
						this.searchUsers("");
					}
				}
			);
		} else {
			this.setValues();
			this.organizationSearchString.pipe(debounceTime(250)).subscribe(searchString => {
				this.getOrganizations(searchString);
			});
		}
		this.userSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getUsers(searchString);
		});
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
		setTimeout(() => {
			if (this.mode === "create") {
					this.organizationInput.nativeElement.focus();
					this.searchOrganizations("");
			} else {
				this.contactInput.nativeElement.focus();
			}
		}, 250);
	}

	ngOnDestroy() {
		if (this.getOrganizationsSubscription !== null) {
			this.getOrganizationsSubscription.unsubscribe();
			this.getOrganizationsSubscription = null;
		}
	}

	next() {
		this.detailsForm.markAllAsTouched();
		this.alertService.clear();
		if (this.detailsForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("ACCOUNTS.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	triggerSave() {
		this.detailsForm.markAllAsTouched();
		this.save.emit(null);
	}

	validateContactInformation() {
		this.accountMainService.accountData.customerContactInformation = this.contactInformation.value;
	}

	validateComments() {
		this.accountMainService.accountData.comment = this.comment.value;
	}

	changeAllowDefaultContract($event) {
		this.accountMainService.accountData.allowDefaultContract = $event.checked;
	}

	changeBaseContractAccount($event) {
		this.accountMainService.accountData.baseContractAccount = $event.checked;
	}

	getOrganizations(searchString: string) {
		if (this.getOrganizationsSubscription !== null) {
			this.getOrganizationsSubscription.unsubscribe();
			this.getOrganizationsSubscription = null;
		}
		this.accountMainService.accountData.organizationId = null;
		this.accountMainService.accountData.organizationName = null;
		this.getOrganizationsSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
			organizationName: searchString,
			storeId: this.accountMainService.accountData.storeId,
			taskName: "CreateAccount",
			sort: "organizationName",
			limit: 10
		}).subscribe(
			response => {
				if (response.items.length === 1 && response.items[0].organizationName === this.organization.value) {
					this.selectOrganization(response.items[0]);
				} else {
					this.organizationList = response.items;
				}
				this.getOrganizationsSubscription = null;
			},
			error => {
				this.getOrganizationsSubscription = null;
			}
		);
	}

	searchOrganizations(value) {
		this.organizationSearchString.next(value);
	}

	selectOrganization(org: any) {
		this.accountMainService.accountData.customerOrganizationId = org.id;
		this.accountMainService.accountData.customerOrganizationName = org.organizationName;
		this.organization.setValue(org.organizationName);
		this.contact.setValue("");
		this.getUsers("");
	}

	getUsers(searchString: string) {
		if (this.getUsersSubscription !== null) {
			this.getUsersSubscription.unsubscribe();
			this.getUsersSubscription = null;
		}
		if (this.accountMainService.accountData.customerOrganizationId) {
			this.accountMainService.accountData.customerUserId = null;
			this.accountMainService.accountData.customerUserName = null;
			this.getUsersSubscription = this.usersService.UsersGetManageableUsers({
				searchString,
				parentOrganizationId: this.accountMainService.accountData.customerOrganizationId,
				sort: "logonId",
				limit: 10
			}).subscribe(
				response => {
					if (response.items && response.items.length === 1 && response.items[0].logonId === this.contact.value) {
						this.selectContact(response.items[0]);
					} else {
						this.userList = response.items;
					}
					this.getUsersSubscription = null;
				},
				error => {
					this.getUsersSubscription = null;
				}
			);
		}
	}

	searchUsers(value) {
		this.userSearchString.next(value);
	}

	selectContact(user: any) {
		this.accountMainService.accountData.customerUserId = user.id;
		this.accountMainService.accountData.customerUserName = user.logonId;
		this.contact.setValue(user.logonId);
	}

	private setValues() {
		if (this.accountMainService.accountData != null) {
			const accountData = this.accountMainService.accountData;
			this.organization.setValue(accountData.customerOrganizationName);
			this.contact.setValue(accountData.customerUserName);
			this.contactInformation.setValue(accountData.customerContactInformation);
			this.comment.setValue(accountData.comment);
			this.allowDefaultContract.setValue(accountData.allowDefaultContract ? true : false);
			this.baseContractAccount.setValue(accountData.baseContractAccount ? true : false);
		} else {
			this.accountMainService.accountData = {
				storeId: Number(this.route.snapshot.params.storeId)
			};
		}
	}

	private createFormControls() {
		if (this.mode === "edit") {
			this.organization = new FormControl({value: "", disabled: true});
			this.baseContractAccount = new FormControl({value: false, disabled: true});
		} else {
			this.organization = new FormControl("", [
				Validators.required,
				organization => {
					const value = organization.value;
					const accountData = this.accountMainService.accountData;
					let errors = null;
					if (value !== "" &&
							(value !== accountData.customerOrganizationName ||
								accountData.customerOrganizationId === null)) {
						errors = {
							invalidOrganization: true
						};
					}
					return errors;
				}
			]);
			this.baseContractAccount = new FormControl(false);
		}
		this.contact = new FormControl("", [
			user => {
				const value = user.value;
				const accountData = this.accountMainService.accountData;
				let errors = null;
				if (value !== "" &&
						(value !== accountData.customerUserName ||
							accountData.customerUserId === null)) {
					errors = {
						invalidContact: true
					};
				}
				return errors;
			}
		]);
		this.contactInformation = new FormControl("");
		this.comment = new FormControl("");
		this.allowDefaultContract = new FormControl(false);
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			organization: this.organization,
			contact: this.contact,
			contactInformation: this.contactInformation,
			comment: this.comment,
			allowDefaultContract: this.allowDefaultContract,
			baseContractAccount: this.baseContractAccount
		});
	}
}
