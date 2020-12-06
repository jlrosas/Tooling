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
import { FormGroup, FormControl } from "@angular/forms";
import { OrganizationMainService } from "../../services/organization-main.service";
import { RoleAssignmentsService } from "../../../../rest/services/role-assignments.service";
import { RoleDescriptionsService } from "../../../../rest/services/role-descriptions.service";
import { LanguageService } from "../../../../services/language.service";
import { AlertService } from "../../../../services/alert.service";
import { MatStep } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";

@Component({
	templateUrl: "./organization-roles.component.html",
	styleUrls: ["./organization-roles.component.scss"],
	selector: "hc-organization-roles"
})
export class OrganizationRolesComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	rolesForm: any;
	availableRoles: FormControl;

	roleNames = null;
	availableRoleList: Array<any> = [];
	filteredAvailableRoleList: Array<any> = [];
	assignedRoles: Array<{roleName: string, roleId: number}> = null;
	parentRoles: Array<any> = null;

	@ViewChild("availableRolesInput") availableRolesInput: ElementRef<HTMLInputElement>;
	private onLanguageChangeSubscription: Subscription = null;
	private availableRolesValueChangesSubscription: Subscription = null;
	constructor(private router: Router,
		private route: ActivatedRoute,
		private organizationMainService: OrganizationMainService,
		private roleDescriptionsService: RoleDescriptionsService,
		private roleAssignmentsService: RoleAssignmentsService,
		private languageService: LanguageService,
		private alertService: AlertService,
		private translateService: TranslateService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		this.loadRoleNames();
		if (this.mode === "edit") {
			const id: string = this.route.snapshot.params.id;
			this.organizationMainService.loadCurrentOrganization(id).subscribe(
				response => {
					this.loadParentRoles();
				}
			);
			this.organizationMainService.loadCurrentOrganizationRoles(id).subscribe(
				response => {
					this.assignedRoles = this.organizationMainService.assignedRoles;
					this.populateAssignedRoleNames();
					this.populateAvailableRoles();
				}
			);
		} else {
			this.loadParentRoles();
		}
		this.availableRolesValueChangesSubscription = this.availableRoles.valueChanges
				.subscribe((value) => {
			this.updateFilteredAvailableRoleList(value);
		});
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.loadRoleNames();
		});
		if (this.organizationMainService.assignedRoles == null) {
			this.organizationMainService.assignedRoles = [];
		}
		this.assignedRoles = this.organizationMainService.assignedRoles;
	}

	ngAfterViewInit() {
		this.step.stepControl = this.rolesForm;
		setTimeout(() => {
			this.availableRolesInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy(): void {
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
		if (this.availableRolesValueChangesSubscription) {
			this.availableRolesValueChangesSubscription.unsubscribe();
		}
	}

	triggerSave() {
		this.save.emit(null);
	}

	removeRole(assignedRole: any) {
		const index = this.assignedRoles.indexOf(assignedRole);
		if (index >= 0) {
			this.assignedRoles.splice(index, 1);
			this.populateAvailableRoles();
		}
	}

	selectRole(role: any) {
		if (role) {
			this.assignedRoles.push({
				roleName: role.content,
				roleId: role.roleId
			});
			this.populateAvailableRoles();
			this.availableRolesInput.nativeElement.value = "";
			this.availableRoles.setValue(null);
		}
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
			this.populateAssignedRoleNames();
			this.populateParentRoles();
		});
	}

	private populateAssignedRoleNames() {
		if (this.assignedRoles && this.roleNames) {
			this.assignedRoles.forEach(assignedRole => {
				assignedRole.roleName = this.roleNames[assignedRole.roleId];
			});
		}
	}

	private loadParentRoles() {
		this.roleAssignmentsService.getRoleAssignments({
			memberId: this.organizationMainService.organizationData.parentOrganizationId
		}).subscribe(body => {
			this.parentRoles = [];
			body.items.forEach(roleAssignment => {
				this.parentRoles.push({
					roleId: roleAssignment.roleId
				});
			});
			this.populateParentRoles();
		});
	}

	private populateParentRoles() {
		if (this.parentRoles != null && this.roleNames != null) {
			this.parentRoles.forEach(parentRole => {
				parentRole.roleName = this.roleNames[parentRole.roleId];
			});
			this.parentRoles.sort((role1, role2) => {
				let result = 0;
				if (role1.roleName < role2.roleName) {
					result = -1;
				} else if (role1.roleName > role2.roleName) {
					result = 1;
				}
				return result;
			});
			this.populateAvailableRoles();
		}
	}

	private populateAvailableRoles() {
		if (this.assignedRoles != null && this.parentRoles != null) {
			const newAvailableRoleList = [];
			this.parentRoles.forEach(parentRole => {
				let alreadyAssigned = false;
				for (let i = 0; i < this.assignedRoles.length; i++) {
					const assignedRole = this.assignedRoles[i];
					if (assignedRole.roleId === parentRole.roleId) {
						alreadyAssigned = true;
						break;
					}
				}
				if (!alreadyAssigned) {
					newAvailableRoleList.push({
						"content": parentRole.roleName,
						"roleId": parentRole.roleId
					});
				}
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

	private createFormControls() {
		this.availableRoles = new FormControl("");
	}

	private createForm() {
		this.rolesForm = new FormGroup({
			availableRoles: this.availableRoles
		});
	}
}
