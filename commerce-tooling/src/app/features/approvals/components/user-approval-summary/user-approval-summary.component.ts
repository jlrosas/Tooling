/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnChanges, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { LanguageService } from "../../../../services/language.service";
import { UsersService } from "../../../../rest/services/users.service";
import { RoleAssignmentsService } from "../../../../rest/services/role-assignments.service";
import { RoleDescriptionsService } from "../../../../rest/services/role-descriptions.service";

@Component({
	templateUrl: "./user-approval-summary.component.html",
	styleUrls: ["./user-approval-summary.component.scss"],
	selector: "hc-user-approval-summary"
})
export class UserApprovalSummaryComponent implements OnInit, OnDestroy, OnChanges {
	@Input() userId: any;

	userName: string;
	userLogonId: string;
	userEmail: string;
	userOrganization: string;
	userRoleIds: Array<number>;
	userRoles: Array<string>;

	private roleNames: any;
	private onLanguageChangeSubscription: Subscription = null;

	constructor(private languageService: LanguageService,
			private usersService: UsersService,
			private roleAssignmentsService: RoleAssignmentsService,
			private roleDescriptionsService: RoleDescriptionsService) { }

	ngOnInit() {
		this.loadRoleNames();
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.loadTranslatables();
		});
	}

	ngOnChanges(changes) {
		if (changes.userId.currentValue !== "" && changes.userId.currentValue !== undefined) {
			const userId = changes.userId.currentValue;
			this.usersService.UsersFindByUserId(changes.userId.currentValue).subscribe(
				user => {
					this.userLogonId = user.logonId;
					if (user.address) {
						if (user.address.firstName) {
							this.userName = user.address.firstName + " " + user.address.lastName;
						} else {
							this.userName = user.address.lastName;
						}
						this.userEmail = user.address.email1;
					}
					this.userLogonId = user.logonId;
					this.userOrganization = user.parentOrganizationName;
					this.loadUserRoles(user.id);
				},
				error => {
					console.log(error);
				}
			);
		}
	}

	ngOnDestroy() {
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	private loadUserRoles(id: string) {
		this.roleAssignmentsService.getRoleAssignments({
			memberId: id
		}).subscribe((body: any) => {
			const uniqueRoles: Array<number> = [];
			for (let i = 0; i < body.items.length; i++) {
				const roleId = body.items[i].roleId;
				if (uniqueRoles.indexOf(roleId) === -1) {
					uniqueRoles.push(roleId);
				}
			}
			this.userRoleIds = uniqueRoles;
			this.populateRoleNames();
		});
	}

	private populateRoleNames() {
		if (this.roleNames != null && this.userRoleIds != null) {
			const roles = [];
			for (let i = 0; i < this.userRoleIds.length; i++) {
				roles.push(this.roleNames[this.userRoleIds[i]]);
			}
			roles.sort((roleName1, roleName2) => {
				let result = 0;
				if (roleName1 < roleName2) {
					result = -1;
				} else if (roleName1 > roleName2) {
					result = 1;
				}
				return result;
			});
			this.userRoles = roles;
		}
	}

	private loadTranslatables() {
		this.loadRoleNames();
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
			this.populateRoleNames();
		});
	}
}

