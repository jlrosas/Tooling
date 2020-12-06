/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { RolesService } from "../../../../rest/services/roles.service";
import { RoleDescriptionsService } from "../../../../rest/services/role-descriptions.service";
import { UserMainService } from "../../services/user-main.service";
import { FormGroup, FormControl } from "@angular/forms";
import { TASK_NAME_ASSIGN_ROLE_TO_USER } from "../../../../shared/constants";
import { LanguageService } from "../../../../services/language.service";
import { AlertService } from "../../../../services/alert.service";
import { MatStep, MatStepper } from "@angular/material";

@Component({
	templateUrl: "./user-roles.component.html",
	styleUrls: ["./user-roles.component.scss"],
	selector: "hc-user-roles"
})
export class UserRolesComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	rolesForm: any;
	organization: FormControl;
	availableRoles: FormControl;

	organizationList: Array<any> = [];
	selectedOrganization: any;
	getOrganizationsSubscription: Subscription = null;
	getAssignableRolesSubscription: Subscription = null;
	roleNames = null;
	assignableRoles: Array<any> = null;
	availableRoleList: Array<any> = [];
	assignedRoles: Array<{organizationName: string, roleName: string, organizationId: number, roleId: number}> = null;
	filteredAvailableRoleList: Array<any> = [];
	rolesLoading = false;

	@ViewChild("availableRolesInput") availableRolesInput: ElementRef<HTMLInputElement>;
	@ViewChild("orgInput") orgInput: ElementRef<HTMLInputElement>;

	private organizationSearchString: Subject<string> = new Subject<string>();
	private availableRolesValueChangesSubscription: Subscription = null;
	private onLanguageChangeSubscription: Subscription = null;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private userMainService: UserMainService,
			private organizationsService: OrganizationsService,
			private roleDescriptionsService: RoleDescriptionsService,
			private rolesService: RolesService,
			private languageService: LanguageService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		this.loadRoleNames();
		if (this.mode === "edit") {
			this.userMainService.loadCurrentUserRoles(this.route.snapshot.params.id).subscribe(
				response => {
					this.assignedRoles = this.userMainService.assignedRoles;
					this.populateAssignedRoleNames();
				}
			);
		}
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.loadRoleNames();
		});
		this.availableRolesValueChangesSubscription = this.availableRoles.valueChanges
				.subscribe((value) => {
			this.updateFilteredAvailableRoleList(value);
		});

		if (this.userMainService.assignedRoles == null) {
			this.userMainService.assignedRoles = [];
		}
		this.assignedRoles = this.userMainService.assignedRoles;
		this.getOrganizations("");
		this.organizationSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getOrganizations(searchString);
		});
	}

	ngAfterViewInit() {
		this.step.stepControl = this.rolesForm;
		setTimeout(() => {
			this.orgInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy(): void {
		this.organizationSearchString.unsubscribe();
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	searchOrganizations(value) {
		this.organizationSearchString.next(value);
	}

	selectOrganization(org: any) {
		this.organization.setValue(org.organizationName);
		this.selectedOrganization = org;
		this.organizationList = [];
		this.availableRoles.enable();
		this.loadAssignableRoles();
	}

	selectRole(role: any) {
		if (this.selectedOrganization && role) {
			this.assignedRoles.push({
				organizationName: this.selectedOrganization.organizationName,
				organizationId: this.selectedOrganization.id,
				roleName: role.content,
				roleId: role.roleId
			});
			this.loadAssignableRoles();
			this.availableRolesInput.nativeElement.value = "";
			this.availableRoles.setValue(null);
		}
	}

	removeRole(assignedRole) {
		const index = this.assignedRoles.indexOf(assignedRole);
		if (index >= 0) {
			this.assignedRoles.splice(index, 1);
			this.loadAssignableRoles();
		}
	}

	triggerSave() {
		this.save.emit(null);
	}

	private createFormControls() {
		this.organization = new FormControl("");
		this.availableRoles = new FormControl({value: "", disabled: true});
	}

	private createForm() {
		this.rolesForm = new FormGroup({
			organization: this.organization,
			availableRoles: this.availableRoles
		});
	}

	private getOrganizations(searchString) {
		if (this.getOrganizationsSubscription != null) {
			this.getOrganizationsSubscription.unsubscribe();
			this.getOrganizationsSubscription = null;
		}
		this.selectedOrganization = null;
		this.availableRoles.disable();
		this.availableRoleList = [];
		this.getOrganizationsSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
			organizationName: searchString,
			taskName: TASK_NAME_ASSIGN_ROLE_TO_USER,
			limit: 10
		}).subscribe(response => {
			if (response.items.length === 1 && response.items[0].organizationName === searchString) {
				this.selectOrganization(response.items[0]);
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
		},
		error => {
			this.getOrganizationsSubscription = null;
		});
	}

	private loadRoleNames() {
		this.roleDescriptionsService.getRoleDescriptions({
			languageId: LanguageService.languageId
		}).subscribe((body: any) => {
			const roleNames = {};
			for (let i = 0; i < body.items.length; i++) {
				const roleDescription = body.items[i];
				roleNames[roleDescription.roleId] = roleDescription.displayName;
			}
			this.roleNames = roleNames;
			this.populateAvailableRoles();
			this.populateAssignedRoleNames();
		});
	}

	private populateAssignedRoleNames() {
		if (this.roleNames && this.assignedRoles) {
			this.assignedRoles.forEach(assignedRole => {
				assignedRole.roleName = this.roleNames[assignedRole.roleId];
			});
		}
	}

	private loadAssignableRoles() {
		if (this.getAssignableRolesSubscription != null) {
			this.getAssignableRolesSubscription.unsubscribe();
			this.getAssignableRolesSubscription = null;
		}
		this.availableRoleList = [];
		this.assignableRoles = null;
		if (this.selectedOrganization != null) {
			this.rolesLoading = true;
			this.getAssignableRolesSubscription = this.rolesService.getAssignableRoles({
				organizationId: this.selectedOrganization.id
			}).subscribe((body: any) => {
				this.assignableRoles = body.items;
				this.populateAvailableRoles();
				this.rolesLoading = false;
			});
		}
	}

	private populateAvailableRoles() {
		if (this.assignableRoles && this.roleNames) {
			const newAvailableRoleList = [];
			for (let i = 0; i < this.assignableRoles.length; i++) {
				const role = this.assignableRoles[i];
				const roleId = role.id;
				const organizationId = this.selectedOrganization.id;
				let alreadyAssigned = false;
				for (let j = 0; j < this.assignedRoles.length; j++) {
					const assignedRole = this.assignedRoles[j];
					if (assignedRole.roleId === roleId && assignedRole.organizationId === organizationId) {
						alreadyAssigned = true;
						break;
					}
				}
				if (!alreadyAssigned) {
					newAvailableRoleList.push({
						"content": this.roleNames[roleId],
						"selected": false,
						"roleId": roleId
					});
				}
			}
			newAvailableRoleList.sort((role1, role2) => {
				let result = 0;
				if (role1.content < role2.content) {
					result = -1;
				} else if (role1.content > role2.content) {
					result = 1;
				}
				return result;
			});
			this.availableRoleList = newAvailableRoleList;
			this.updateFilteredAvailableRoleList(this.availableRoles.value);
		}
	}

	private updateFilteredAvailableRoleList(value) {
		if (value) {
			if (value.content) {
				value = value.content;
			}
			const filterValue = value.toLowerCase();
			const newList = this.availableRoleList.filter(
				role => role.content.toLowerCase().indexOf(filterValue) === 0
			);
			this.filteredAvailableRoleList = newList;
		} else {
			this.filteredAvailableRoleList = this.availableRoleList;
		}
	}
}
