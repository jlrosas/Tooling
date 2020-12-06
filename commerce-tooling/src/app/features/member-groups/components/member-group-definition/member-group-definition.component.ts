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
import { FormGroup, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Subscription, Subject, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { MatStep } from "@angular/material/stepper";
import { MatSelect } from "@angular/material/select";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { RolesService } from "../../../../rest/services/roles.service";
import { RoleDescriptionsService } from "../../../../rest/services/role-descriptions.service";
import { MemberGroupMainService } from "../../services/member-group-main.service";
import { LanguageService } from "../../../../services/language.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./member-group-definition.component.html",
	styleUrls: ["./member-group-definition.component.scss"],
	selector: "hc-member-group-definition"
})
export class MemberGroupDefinitionComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	definitionForm: any;
	targetOrganizationRolesOption: FormControl;
	availableTargetOrganizationRoles: FormControl;
	anyOrganizationRolesOption: FormControl;
	availableAnyOrganizationRoles: FormControl;
	availableOrganizationRoles: FormControl;
	rolesInOrganizationsOption: FormControl;
	organization: FormControl;
	registrationStatusOption: FormControl;

	rolesInOrganizationsOptions: Array<any> = null;
	targetOrganizationRolesOptions: Array<any> = null;
	anyOrganizationRolesOptions: Array<any> = null;
	registrationStatusOptions: Array<any> = null;
	organizationList: Array<any> = [];
	selectedOrganization: any;
	roleNames = null;
	roles = null;
	roleIdsByIdentifier = null;
	roleIdentifiersById = null;
	assignableRoles: Array<any> = null;
	availableOrganizationRoleList: Array<any> = [];
	availableTargetOrganizationRoleList: Array<any> = [];
	availableAnyOrganizationRoleList: Array<any> = [];
	filteredAvailableOrganizationRoleList: Array<any> = [];
	filteredAvailableTargetOrganizationRoleList: Array<any> = [];
	filteredAvailableAnyOrganizationRoleList: Array<any> = [];
	assignedOrganizationRoles: Array<{organizationName: string, roleName: string, organizationId: string, roleIdentifier: string}> = null;
	assignedTargetOrganizationRoles: Array<{roleName: string, roleIdentifier: string}> = null;
	assignedAnyOrganizationRoles: Array<{roleName: string, roleIdentifier: string}> = null;

	registrationDisabled = false;

	@ViewChild("targetOrganizationRolesOptionSelect") targetOrganizationRolesOptionSelect: MatSelect;
	@ViewChild("availableTargetOrganizationRolesInput") availableTargetOrganizationRolesInput: ElementRef<HTMLInputElement>;
	@ViewChild("availableAnyOrganizationRolesInput") availableAnyOrganizationRolesInput: ElementRef<HTMLInputElement>;
	@ViewChild("availableOrganizationRolesInput") availableOrganizationRolesInput: ElementRef<HTMLInputElement>;

	private getOrganizationsSubscription: Subscription = null;
	private getAssignableRolesSubscription: Subscription = null;
	private availableTargetOrganizationRolesValueChangesSubscription: Subscription = null;
	private availableAnyOrganizationRolesValueChangesSubscription: Subscription = null;
	private availableOrganizationRolesValueChangesSubscription = null;
	private organizationValueChangesSubscription = null;
	private organizationSearchString: Subject<string> = new Subject<string>();
	private onLanguageChangeSubscription: Subscription = null;
	private restoredRegistrationOption = null;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private organizationsService: OrganizationsService,
			private roleDescriptionsService: RoleDescriptionsService,
			private rolesService: RolesService,
			private languageService: LanguageService,
			private translateService: TranslateService,
			private memberGroupMainService: MemberGroupMainService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.setValues();
		} else {
			if (this.memberGroupMainService.assignedOrganizationRoles == null) {
				this.memberGroupMainService.assignedOrganizationRoles = [];
				this.memberGroupMainService.assignedTargetOrganizationRoles = [];
				this.memberGroupMainService.assignedAnyOrganizationRoles = [];
			}
			this.assignedOrganizationRoles = this.memberGroupMainService.assignedOrganizationRoles;
			this.assignedTargetOrganizationRoles = this.memberGroupMainService.assignedTargetOrganizationRoles;
			this.assignedAnyOrganizationRoles = this.memberGroupMainService.assignedAnyOrganizationRoles;
			if (this.assignedTargetOrganizationRoles.length > 0) {
				this.registrationDisabled = true;
				this.memberGroupMainService.registrationStatus = null;
			}
			this.setTranslatables();
		}
		this.organizationSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getOrganizations(searchString);
		});
		this.loadRoles();
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.setTranslatables();
		});
		this.availableTargetOrganizationRolesValueChangesSubscription = this.availableTargetOrganizationRoles.valueChanges
				.subscribe((value) => {
			this.updateFilteredAvailableTargetOrganizationRoleList(value);
		});
		this.availableAnyOrganizationRolesValueChangesSubscription = this.availableAnyOrganizationRoles.valueChanges
				.subscribe((value) => {
			this.updateFilteredAvailableAnyOrganizationRoleList(value);
		});
		this.availableOrganizationRolesValueChangesSubscription = this.availableOrganizationRoles.valueChanges
				.subscribe((value) => {
			this.updateFilteredAvailableOrganizationRoleList(value);
		});
		this.searchOrganization("");
	}

	ngAfterViewInit() {
		this.step.stepControl = this.definitionForm;
		setTimeout(() => {
			this.targetOrganizationRolesOptionSelect.focus();
		}, 250);
	}

	ngOnDestroy(): void {
		this.organizationSearchString.unsubscribe();
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
		if (this.availableTargetOrganizationRolesValueChangesSubscription) {
			this.availableTargetOrganizationRolesValueChangesSubscription.unsubscribe();
		}
		if (this.availableAnyOrganizationRolesValueChangesSubscription) {
			this.availableAnyOrganizationRolesValueChangesSubscription.unsubscribe();
		}
		if (this.availableOrganizationRolesValueChangesSubscription) {
			this.availableOrganizationRolesValueChangesSubscription.unsubscribe();
		}
		if (this.organizationValueChangesSubscription) {
			this.organizationValueChangesSubscription.unsubscribe();
		}
	}

	searchOrganization(searchString) {
		if (!this.selectedOrganization || this.selectedOrganization.organizationName !== searchString) {
			if (this.getOrganizationsSubscription != null) {
				this.getOrganizationsSubscription.unsubscribe();
				this.getOrganizationsSubscription = null;
			}
			this.selectedOrganization = null;
			this.availableOrganizationRoleList = [];
			this.organizationSearchString.next(searchString);
		}
	}

	selectRolesInOrganizationsOption(rolesOption: any) {
		if (rolesOption) {
			this.memberGroupMainService.ignoreRolesInOrganizations = rolesOption.ignoreRolesInOrganizations;
		}
	}

	selectOrganization(org: any) {
		this.selectedOrganization = org;
		this.organization.setValue(org.organizationName);
		this.loadAssignableRoles();
	}

	selectOrganizationRole(role: any) {
		if (this.selectedOrganization && role) {
			this.assignedOrganizationRoles.push({
				organizationName: this.selectedOrganization.organizationName,
				organizationId: this.selectedOrganization.id,
				roleName: role.content,
				roleIdentifier: role.roleIdentifier
			});
			this.populateAvailableOrganizationRoles();
			this.availableOrganizationRolesInput.nativeElement.value = "";
			this.availableOrganizationRoles.setValue(null);
		}
	}

	removeOrganizationRole(assignedOrganizationRole) {
		const index = this.assignedOrganizationRoles.indexOf(assignedOrganizationRole);
		if (index >= 0) {
			this.assignedOrganizationRoles.splice(index, 1);
			this.loadAssignableRoles();
		}
	}

	selectTargetOrganizationRolesOption(option: any) {
		if (option) {
			this.memberGroupMainService.ignoreTargetOrganizationRoles = option.ignoreTargetOrganizationRoles;
			if (option.ignoreTargetOrganizationRoles && this.registrationDisabled) {
				this.registrationDisabled = false;
				this.memberGroupMainService.registrationStatus = this.restoredRegistrationOption;
			} else if (!this.registrationDisabled) {
				this.registrationDisabled = true;
				this.memberGroupMainService.registrationStatus = null;
			}
		}
	}

	selectTargetOrganizationRole(role: any) {
		if (role) {
			this.assignedTargetOrganizationRoles.push({
				roleName: role.content,
				roleIdentifier: role.roleIdentifier
			});
			this.registrationDisabled = true;
			this.memberGroupMainService.registrationStatus = null;
			this.populateAvailableTargetOrganizationRoles();
			this.availableTargetOrganizationRolesInput.nativeElement.value = "";
			this.availableTargetOrganizationRoles.setValue(null);
		}
	}

	removeTargetOrganizationRole(assignedRole) {
		const index = this.assignedTargetOrganizationRoles.indexOf(assignedRole);
		if (index >= 0) {
			this.assignedTargetOrganizationRoles.splice(index, 1);
			this.populateAvailableTargetOrganizationRoles();
		}
		if (this.assignedTargetOrganizationRoles.length === 0) {
			this.memberGroupMainService.registrationStatus = this.restoredRegistrationOption;
			this.registrationDisabled = false;
		}
	}

	selectAnyOrganizationRolesOption(option: any) {
		if (option) {
			this.memberGroupMainService.ignoreAnyOrganizationRoles = option.ignoreAnyOrganizationRoles;
		}
	}

	selectAnyOrganizationRole(role: any) {
		if (role) {
			this.assignedAnyOrganizationRoles.push({
				roleName: role.content,
				roleIdentifier: role.roleIdentifier
			});
			this.populateAvailableAnyOrganizationRoles();
			this.availableAnyOrganizationRolesInput.nativeElement.value = "";
			this.availableAnyOrganizationRoles.setValue(null);
		}
	}

	removeAnyOrganizationRole(assignedRole) {
		const index = this.assignedAnyOrganizationRoles.indexOf(assignedRole);
		if (index >= 0) {
			this.assignedAnyOrganizationRoles.splice(index, 1);
			this.populateAvailableAnyOrganizationRoles();
		}
	}

	selectRegistrationStatusOption(registrationStatusOption: any) {
		if (registrationStatusOption) {
			this.restoredRegistrationOption = registrationStatusOption.registrationStatus;
			this.memberGroupMainService.registrationStatus = registrationStatusOption.registrationStatus;
		}
	}

	triggerSave() {
		this.save.emit(null);
	}

	private setValues() {
		const id: string = this.route.snapshot.params.id;
		this.memberGroupMainService.loadCurrentMemberGroupDefinition(id).subscribe(response => {
			this.assignedOrganizationRoles = this.memberGroupMainService.assignedOrganizationRoles;
			this.assignedTargetOrganizationRoles = this.memberGroupMainService.assignedTargetOrganizationRoles;
			this.assignedAnyOrganizationRoles = this.memberGroupMainService.assignedAnyOrganizationRoles;
			this.setTranslatables();
			if (this.assignedTargetOrganizationRoles.length > 0) {
				this.registrationDisabled = true;
				this.memberGroupMainService.registrationStatus = null;
			}
			setTimeout(() => {
				this.targetOrganizationRolesOptionSelect.focus();
			}, 250);
		});
	}

	private updateFilteredAvailableTargetOrganizationRoleList(value) {
		if (value) {
			if (value.content) {
				value = value.content;
			}
			const filterValue = value.toLowerCase();
			const newList = this.availableTargetOrganizationRoleList.filter(
				role => role.content.toLowerCase().indexOf(filterValue) === 0
			);
			this.filteredAvailableTargetOrganizationRoleList = newList;
		} else {
			this.filteredAvailableTargetOrganizationRoleList = this.availableTargetOrganizationRoleList;
		}
	}

	private updateFilteredAvailableAnyOrganizationRoleList(value) {
		if (value) {
			if (value.content) {
				value = value.content;
			}
			const filterValue = value.toLowerCase();
			const newList = this.availableAnyOrganizationRoleList.filter(
				role => role.content.toLowerCase().indexOf(filterValue) === 0
			);
			this.filteredAvailableAnyOrganizationRoleList = newList;
		} else {
			this.filteredAvailableAnyOrganizationRoleList = this.availableAnyOrganizationRoleList;
		}
	}

	private updateFilteredAvailableOrganizationRoleList(value) {
		if (value) {
			if (value.content) {
				value = value.content;
			}
			const filterValue = value.toLowerCase();
			const newList = this.availableOrganizationRoleList.filter(
				role => role.content.toLowerCase().indexOf(filterValue) === 0
			);
			this.filteredAvailableOrganizationRoleList = newList;
		} else {
			this.filteredAvailableOrganizationRoleList = this.availableOrganizationRoleList;
		}
	}

	private createFormControls() {
		this.targetOrganizationRolesOption = new FormControl("");
		this.availableTargetOrganizationRoles = new FormControl("");
		this.anyOrganizationRolesOption = new FormControl("");
		this.availableAnyOrganizationRoles = new FormControl("");
		this.rolesInOrganizationsOption = new FormControl("");
		this.organization = new FormControl("");
		this.registrationStatusOption = new FormControl("");
		this.availableOrganizationRoles = new FormControl("");
	}

	private createForm() {
		this.definitionForm = new FormGroup({
			targetOrganizationRolesOption: this.targetOrganizationRolesOption,
			availableTargetOrganizationRoles: this.availableTargetOrganizationRoles,
			anyOrganizationRolesOption: this.anyOrganizationRolesOption,
			availableAnyOrganizationRoles: this.availableAnyOrganizationRoles,
			availableOrganizationRoles: this.availableOrganizationRoles,
			rolesInOrganizationsOption: this.rolesInOrganizationsOption,
			organization: this.organization,
			registrationStatusOption: this.registrationStatusOption
		});
	}

	private setTranslatables() {
		this.loadRoleNames();
		this.initRolesInOrganizationsOptions();
		this.initTargetOrganizationRolesOptions();
		this.initAnyOrganizationRolesOptions();
		this.initRegistrationStatusOptions();
	}

	private initRolesInOrganizationsOptions(): void {
		const ignoreRolesInOrganizations = this.memberGroupMainService.ignoreRolesInOrganizations;
		const ignoreRolesInOrganizationsOption = {
			"content": "",
			"ignoreRolesInOrganizations": true
		};
		this.translateService.get("MEMBER_GROUPS.IGNORE_ROLES_IN_ORGANIZATIONS").subscribe((text: string) => {
			ignoreRolesInOrganizationsOption.content = text;
		});
		const checkRolesInOrganizationsOption = {
			"content": "",
			"ignoreRolesInOrganizations": false
		};
		this.translateService.get("MEMBER_GROUPS.CHECK_ROLES_IN_ORGANIZATIONS").subscribe((text: string) => {
			checkRolesInOrganizationsOption.content = text;
		});
		this.rolesInOrganizationsOptions = [
			ignoreRolesInOrganizationsOption,
			checkRolesInOrganizationsOption
		];
		if (ignoreRolesInOrganizations) {
			this.rolesInOrganizationsOption.setValue(ignoreRolesInOrganizationsOption);
		} else {
			this.rolesInOrganizationsOption.setValue(checkRolesInOrganizationsOption);
		}
	}

	private initTargetOrganizationRolesOptions(): void {
		const ignoreTargetOrganizationRoles = this.memberGroupMainService.ignoreTargetOrganizationRoles;
		const ignoreTargetOrganizationRolesOption = {
			"content": "",
			"ignoreTargetOrganizationRoles": true
		};
		this.translateService.get("MEMBER_GROUPS.IGNORE_TARGET_ORGANIZATION_ROLES").subscribe((text: string) => {
			ignoreTargetOrganizationRolesOption.content = text;
		});
		const checkTargetOrganizationRolesOption = {
			"content": "",
			"ignoreTargetOrganizationRoles": false
		};
		this.translateService.get("MEMBER_GROUPS.CHECK_TARGET_ORGANIZATION_ROLES").subscribe((text: string) => {
			checkTargetOrganizationRolesOption.content = text;
		});
		this.targetOrganizationRolesOptions = [
			ignoreTargetOrganizationRolesOption,
			checkTargetOrganizationRolesOption
		];
		if (ignoreTargetOrganizationRoles) {
			this.targetOrganizationRolesOption.setValue(ignoreTargetOrganizationRolesOption);
		} else {
			this.targetOrganizationRolesOption.setValue(checkTargetOrganizationRolesOption);
		}
	}

	private initAnyOrganizationRolesOptions(): void {
		const ignoreAnyOrganizationRoles = this.memberGroupMainService.ignoreAnyOrganizationRoles;
		const ignoreAnyOrganizationRolesOption = {
			"content": "",
			"ignoreAnyOrganizationRoles": true
		};
		this.translateService.get("MEMBER_GROUPS.IGNORE_ANY_ORGANIZATION_ROLES").subscribe((text: string) => {
			ignoreAnyOrganizationRolesOption.content = text;
		});
		const checkAnyOrganizationRolesOption = {
			"content": "",
			"ignoreAnyOrganizationRoles": false
		};
		this.translateService.get("MEMBER_GROUPS.CHECK_ANY_ORGANIZATION_ROLES").subscribe((text: string) => {
			checkAnyOrganizationRolesOption.content = text;
		});
		this.anyOrganizationRolesOptions = [
			ignoreAnyOrganizationRolesOption,
			checkAnyOrganizationRolesOption
		];
		if (ignoreAnyOrganizationRoles) {
			this.anyOrganizationRolesOption.setValue(ignoreAnyOrganizationRolesOption);
		} else {
			this.anyOrganizationRolesOption.setValue(checkAnyOrganizationRolesOption);
		}
	}

	private initRegistrationStatusOptions(): void {
		const registrationStatus = this.memberGroupMainService.registrationStatus;
		const ignoreRegistrationStatusOption = {
			"content": "",
			"registrationStatus": null
		};
		this.translateService.get("MEMBER_GROUPS.IGNORE_REGISTRATION_STATUS").subscribe((text: string) => {
			ignoreRegistrationStatusOption.content = text;
		});
		const guestOption = {
			"content": "",
			"registrationStatus": "G"
		};
		this.translateService.get("MEMBER_GROUPS.GUEST").subscribe((text: string) => {
			guestOption.content = text;
		});
		const registeredOption = {
			"content": "",
			"registrationStatus": "R"
		};
		this.translateService.get("MEMBER_GROUPS.REGISTERED").subscribe((text: string) => {
			registeredOption.content = text;
		});
		const administratorOption = {
			"content": "",
			"registrationStatus": "A"
		};
		this.translateService.get("MEMBER_GROUPS.ADMINISTRATOR").subscribe((text: string) => {
			administratorOption.content = text;
		});
		const siteAdministratorOption = {
			"content": "",
			"registrationStatus": "S"
		};
		this.translateService.get("MEMBER_GROUPS.SITE_ADMINISTRATOR").subscribe((text: string) => {
			siteAdministratorOption.content = text;
		});
		this.registrationStatusOptions = [
			ignoreRegistrationStatusOption,
			guestOption,
			registeredOption,
			administratorOption,
			siteAdministratorOption
		];
		for (let i = 0; i < this.registrationStatusOptions.length; i++) {
			if (this.registrationStatusOptions[i].registrationStatus === registrationStatus) {
				this.registrationStatusOption.setValue(this.registrationStatusOptions[i]);
				break;
			}
		}
	}

	private getOrganizations(searchString) {
		this.getOrganizationsSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
			organizationName: searchString,
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

	private loadRoles() {
		this.rolesService.getRoles({}).subscribe((body: any) => {
			this.roles = body.items;
			const roleIdentifiersById = {};
			const roleIdsByIdentifier = {};
			for (let i = 0; i < this.roles.length; i++) {
				const role = body.items[i];
				roleIdentifiersById[role.id] = role.name;
				roleIdsByIdentifier[role.name] = role.id;
			}
			this.roleIdentifiersById = roleIdentifiersById;
			this.roleIdsByIdentifier = roleIdsByIdentifier;
			this.populateAvailableTargetOrganizationRoles();
			this.populateAvailableAnyOrganizationRoles();
			this.populateAvailableOrganizationRoles();
			this.populateAssignedRoleNames();
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
			this.populateAvailableTargetOrganizationRoles();
			this.populateAvailableAnyOrganizationRoles();
			this.populateAvailableOrganizationRoles();
			this.populateAssignedRoleNames();
		});
	}

	private populateAssignedRoleNames() {
		if (this.roleNames && this.roleIdsByIdentifier) {
			if (this.assignedTargetOrganizationRoles) {
				this.assignedTargetOrganizationRoles.forEach(assignedRole => {
					assignedRole.roleName = this.roleNames[this.roleIdsByIdentifier[assignedRole.roleIdentifier]];
				});
			}
			if (this.assignedAnyOrganizationRoles) {
				this.assignedAnyOrganizationRoles.forEach(assignedRole => {
					assignedRole.roleName = this.roleNames[this.roleIdsByIdentifier[assignedRole.roleIdentifier]];
				});
			}
			if (this.assignedOrganizationRoles) {
				this.assignedOrganizationRoles.forEach(assignedRole => {
					assignedRole.roleName = this.roleNames[this.roleIdsByIdentifier[assignedRole.roleIdentifier]];
				});
			}
		}
	}

	private loadAssignableRoles() {
		if (this.getAssignableRolesSubscription != null) {
			this.getAssignableRolesSubscription.unsubscribe();
			this.getAssignableRolesSubscription = null;
		}
		this.availableOrganizationRoleList = [];
		this.assignableRoles = null;
		if (this.selectedOrganization != null) {
			this.getAssignableRolesSubscription = this.rolesService.getAssignableRoles({
				organizationId: this.selectedOrganization.id
			}).subscribe((body: any) => {
				this.assignableRoles = body.items;
				this.populateAvailableOrganizationRoles();
			});
		}
	}

	private populateAvailableOrganizationRoles() {
		if (this.assignableRoles && this.roleNames && this.roleIdentifiersById) {
			const newAvailableOrganizationRoleList = [];
			for (let i = 0; i < this.assignableRoles.length; i++) {
				const role = this.assignableRoles[i];
				const roleIdentifier = this.roleIdentifiersById[role.id];
				const organizationId = this.selectedOrganization.id;
				let alreadyAssigned = false;
				for (let j = 0; j < this.assignedOrganizationRoles.length; j++) {
					const assignedRole = this.assignedOrganizationRoles[j];
					if (assignedRole.roleIdentifier === roleIdentifier && assignedRole.organizationId === organizationId) {
						alreadyAssigned = true;
						break;
					}
				}
				if (!alreadyAssigned) {
					newAvailableOrganizationRoleList.push({
						"content": this.roleNames[role.id],
						"roleIdentifier": roleIdentifier
					});
				}
			}
			newAvailableOrganizationRoleList.sort((role1, role2) => {
				let result = 0;
				if (role1.content < role2.content) {
					result = -1;
				} else if (role1.content > role2.content) {
					result = 1;
				}
				return result;
			});
			this.availableOrganizationRoleList = newAvailableOrganizationRoleList;
			this.updateFilteredAvailableOrganizationRoleList(this.availableOrganizationRoles.value);
		}
	}

	private populateAvailableTargetOrganizationRoles() {
		if (this.roleNames && this.roles) {
			const newAvailableRoleList = [];
			for (let i = 0; i < this.roles.length; i++) {
				const role = this.roles[i];
				const roleIdentifier = role.name;
				let alreadyAssigned = false;
				for (let j = 0; j < this.assignedTargetOrganizationRoles.length; j++) {
					const assignedRole = this.assignedTargetOrganizationRoles[j];
					if (assignedRole.roleIdentifier === roleIdentifier) {
						alreadyAssigned = true;
						break;
					}
				}
				if (!alreadyAssigned) {
					newAvailableRoleList.push({
						"content": this.roleNames[role.id],
						"roleIdentifier": roleIdentifier
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
			this.availableTargetOrganizationRoleList = newAvailableRoleList;
			this.updateFilteredAvailableTargetOrganizationRoleList(this.availableTargetOrganizationRoles.value);
		}
	}

	private populateAvailableAnyOrganizationRoles() {
		if (this.roleNames && this.roles) {
			const newAvailableRoleList = [];
			for (let i = 0; i < this.roles.length; i++) {
				const role = this.roles[i];
				const roleIdentifier = role.name;
				let alreadyAssigned = false;
				for (let j = 0; j < this.assignedAnyOrganizationRoles.length; j++) {
					const assignedRole = this.assignedAnyOrganizationRoles[j];
					if (assignedRole.roleIdentifier === roleIdentifier) {
						alreadyAssigned = true;
						break;
					}
				}
				if (!alreadyAssigned) {
					newAvailableRoleList.push({
						"content": this.roleNames[role.id],
						"roleIdentifier": roleIdentifier
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
			this.availableAnyOrganizationRoleList = newAvailableRoleList;
			this.updateFilteredAvailableAnyOrganizationRoleList(this.availableAnyOrganizationRoles.value);
		}
	}
}
