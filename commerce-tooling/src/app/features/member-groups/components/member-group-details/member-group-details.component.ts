/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { MatSelect } from "@angular/material/select";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { MemberGroupMainService } from "../../services/member-group-main.service";
import { OrganizationNameService } from "../../../../services/organization-name.service";
import { AlertService } from "../../../../services/alert.service";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { HcValidators } from "../../../../shared/validators";
import { CurrentUserService } from "../../../../services/current-user.service";

@Component({
	templateUrl: "./member-group-details.component.html",
	styleUrls: ["./member-group-details.component.scss"],
	selector: "hc-member-group-details"
})
export class MemberGroupDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: any;
	memberGroupType: FormControl;
	memberGroupName: FormControl;
	description: FormControl;
	parentOrganization: FormControl;

	memberGroupTypeList: Array<any> = [];
	organizationList: Array<any> = [];
	isLinear = true;
	organizationsLoading = false;

	@ViewChild("memberGroupTypeSelect") memberGroupTypeSelect: MatSelect;
	@ViewChild("descriptionInput") descriptionInput: ElementRef<HTMLInputElement>;

	private onLangChangeSubscription: Subscription = null;
	private parentOrgSearchString: Subject<string> = new Subject<string>();
	private getOrganizationsSubscription: Subscription = null;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private translateService: TranslateService,
			private memberGroupMainService: MemberGroupMainService,
			private organizationsService: OrganizationsService,
			private organizationNameService: OrganizationNameService,
			private alertService: AlertService,
			private currentUserService: CurrentUserService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.memberGroupMainService.loadCurrentMemberGroup(this.route.snapshot.params.id).subscribe(
				response => {
					this.setValues();
				}
			);
		} else {
			if (this.memberGroupMainService.memberGroupData !== null) {
				const memberGroupData = this.memberGroupMainService.memberGroupData;
				this.memberGroupName.setValue(memberGroupData.name);
				this.description.setValue(memberGroupData.description);
				this.parentOrganization.setValue(memberGroupData.parentOrganizationName);
			} else {
				this.memberGroupMainService.memberGroupData = {
				};
			}
			this.initMemberGroupTypeList();
			this.onLangChangeSubscription = this.translateService.onLangChange.subscribe(() => {
				this.initMemberGroupTypeList();
			});
			this.parentOrgSearchString.pipe(debounceTime(250)).subscribe(parentOrg => {
				this.getOrganizations(parentOrg);
			});
			this.searchParentOrganization("");
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
		setTimeout(() => {
			if (this.mode === "create") {
				this.memberGroupTypeSelect.focus();
			} else {
				this.descriptionInput.nativeElement.focus();
			}
		}, 250);
	}

	ngOnDestroy() {
		if (this.onLangChangeSubscription) {
			this.onLangChangeSubscription.unsubscribe();
		}
	}

	next() {
		this.alertService.clear();
		if (this.detailsForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("MEMBER_GROUPS.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message, clear: true});
			});
		}
	}

	triggerSave() {
		this.save.emit(null);
	}

	validateMemberGroupName() {
		this.memberGroupMainService.memberGroupData.name = this.memberGroupName.value;
	}

	validateDescription() {
		this.memberGroupMainService.memberGroupData.description = this.description.value;
	}

	getOrganizations(orgString: string) {
		this.organizationsLoading = true;
		if (this.getOrganizationsSubscription !== null) {
			this.getOrganizationsSubscription.unsubscribe();
			this.getOrganizationsSubscription = null;
		}
		this.memberGroupMainService.memberGroupData.ownerId = null;
		this.memberGroupMainService.memberGroupData.parentOrganizationName = null;
		this.getOrganizationsSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
			organizationName: orgString,
			limit: 10
		}).subscribe(response => {
			if (response.items.length === 1 && response.items[0].organizationName === this.parentOrganization.value) {
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
		});
	}

	searchParentOrganization(value) {
		this.parentOrgSearchString.next(value);
	}

	selectParentOrganization(org: any) {
		if (org) {
			this.memberGroupMainService.memberGroupData.ownerId = org.id;
			this.memberGroupMainService.memberGroupData.parentOrganizationName = org.organizationName;
			this.parentOrganization.setValue(org.organizationName);
		} else {
			this.searchParentOrganization("");
		}
	}

	selectMemberGroupType(group: any) {
		this.memberGroupMainService.memberGroupData.usage = group.memberGroupType;
		this.memberGroupMainService.onUsageChange.emit(this.memberGroupMainService.memberGroupData.usage);
	}

	private setValues() {
		const id: string = this.route.snapshot.params.id;
		this.memberGroupMainService.loadCurrentMemberGroup(id).subscribe(response => {
			const memberGroupData = this.memberGroupMainService.memberGroupData;
			this.memberGroupName.setValue(memberGroupData.name);
			this.description.setValue(memberGroupData.description);
			this.organizationNameService.getOrganizationName(memberGroupData.ownerId).subscribe(organizationName => {
				this.parentOrganization.setValue(organizationName);
			});
			this.initMemberGroupType();
			this.onLangChangeSubscription = this.translateService.onLangChange.subscribe(() => {
				this.initMemberGroupType();
			});
		});
	}

	private createFormControls() {
		if (this.mode === "edit") {
			this.memberGroupName = new FormControl({value: "", disabled: true});
			this.description = new FormControl("");
			this.memberGroupType = new FormControl({value: "", disabled: true});
			this.parentOrganization = new FormControl({value: "", disabled: true});
		} else {
			this.memberGroupName = new FormControl("", HcValidators.required);
			this.description = new FormControl("");
			this.memberGroupType = new FormControl("", Validators.required);
			this.parentOrganization = new FormControl("", [
				Validators.required,
				parentOrganization => {
					const value = parentOrganization.value;
					const memberGroupData = this.memberGroupMainService.memberGroupData;
					let errors = null;
					if (value !== "" &&
							(value !== memberGroupData.parentOrganizationName ||
							memberGroupData.ownerId === null)) {
						errors = {
							invalidParentOrganization: true
						};
					}
					return errors;
				}
			]);
		}
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			memberGroupName : this.memberGroupName,
			description: this.description,
			memberGroupType: this.memberGroupType,
			parentOrganization: this.parentOrganization
		});
	}

	private initMemberGroupTypeList(): void {
		const usage = this.memberGroupMainService.memberGroupData.usage;
		const accessControlType = {
			"content": "",
			"memberGroupType": "AccessControl"
		};
		this.translateService.get("MEMBER_GROUPS.ACCESS_CONTROL").subscribe((text: string) => {
			accessControlType.content = text;
		});
		const customerPriceType = {
			"content": "",
			"memberGroupType": "CustomerPrice"
		};
		this.translateService.get("MEMBER_GROUPS.CUSTOMER_PRICE").subscribe((text: string) => {
			customerPriceType.content = text;
		});
		this.memberGroupTypeList = [
			customerPriceType
		];
		this.currentUserService.getRoles().subscribe((currentUserRoles: Array<number>) => {
			for (let index = 0; index < currentUserRoles.length; index++) {
				if (currentUserRoles[index] === -1) {
					this.memberGroupTypeList = [
						accessControlType,
						customerPriceType
					];
					break;
				}
			}
			if (usage !== null) {
				for (let i = 0; i < this.memberGroupTypeList.length; i++) {
					if (this.memberGroupTypeList[i].memberGroupType === usage) {
						this.memberGroupType.setValue(this.memberGroupTypeList[i]);
						break;
					}
				}
			}
		});
	}

	private initMemberGroupType(): void {
		const usage = this.memberGroupMainService.memberGroupData.usage;
		if (usage === "AccessControl") {
			this.translateService.get("MEMBER_GROUPS.ACCESS_CONTROL").subscribe((text: string) => {
				this.memberGroupType.setValue(text);
			});
		} else if (usage === "CustomerPrice") {
			this.translateService.get("MEMBER_GROUPS.CUSTOMER_PRICE").subscribe((text: string) => {
				this.memberGroupType.setValue(text);
			});
		} else if (usage === "RegisteredCustomer") {
			this.translateService.get("MEMBER_GROUPS.REGISTERED_CUSTOMER").subscribe((text: string) => {
				this.memberGroupType.setValue(text);
			});
		} else {
			this.memberGroupType.setValue(usage);
		}
	}
}
