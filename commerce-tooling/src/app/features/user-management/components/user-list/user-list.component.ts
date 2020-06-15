/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, Subscription, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { UsersService } from "../../../../rest/services/users.service";
import { RoleAssignmentsService } from "../../../../rest/services/role-assignments.service";
import { RoleDescriptionsService } from "../../../../rest/services/role-descriptions.service";
import { UserMainService } from "../../services/user-main.service";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { FormGroup, FormControl } from "@angular/forms";
import { DataSource } from "@angular/cdk/table";
import { MatPaginator, MatSort } from "@angular/material";
import { LanguageService } from "../../../../services/language.service";
import { TranslateService } from "@ngx-translate/core";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./user-list.component.html",
	styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	listSearchForm: FormGroup;
	parentOrganization: FormControl;
	role: FormControl;
	organizationList: Array<any> = [];
	roleList: Array<any> = [];
	getOrganizationsSubscription: Subscription = null;
	parentOrganizationId = null;
	roleId = null;
	searchText: FormControl;
	showFilters = false;
	responsiveCols = 12;

	model = new UsersDataSource();
	public userRolesMap = {};

	displayedColumns: string[] = ["loginId", "firstName",  "lastName",  "parentOrganizationName", "role", "status", "actions"];

	@ViewChild(MatPaginator, { static: false })
	paginator: MatPaginator;
	@ViewChild(MatSort, { static: false })
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "loginId";
	sortDirection = "asc";
	currentSearchString = null;
	organizationsLoading = false;

	private roleNames = null;
	private searchString: Subject<string> = new Subject<string>();
	private getManageableUsersSubscription: Subscription = null;
	private getRoleAssignmentsSubscriptions: Array<Subscription> = [];

	private onLangChangeSubscription: Subscription = null;
	private parentOrganizationFilter = {label: "", value: ""};

	constructor(private router: Router,
		private usersService: UsersService,
		private roleAssignmentsService: RoleAssignmentsService,
		private roleDescriptionsService: RoleDescriptionsService,
		private userMainService: UserMainService,
		private organizationsService: OrganizationsService,
		private preferenceService: PreferenceService,
		private translateService: TranslateService,
		private alertService: AlertService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.preferenceService.save(this.preferenceToken, { searchString });
			this.paginator.pageIndex = 0;
			this.currentSearchString = searchString;
			this.getManageableUsers();
		});
		this.loadRoleNames();
		this.searchParentOrganizations("");
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(sort => {
			this.paginator.pageIndex = 0;
			this.preferenceService.save(this.preferenceToken, {sort: this.sort});
			this.getManageableUsers();
		});
		this.getManageableUsers();
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
		if (this.onLangChangeSubscription) {
			this.onLangChangeSubscription.unsubscribe();
		}
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	onResponsiveColsChange(e: any) {
		this.responsiveCols = e;
	}

	public handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.preferenceService.save(this.preferenceToken, {pageSize: this.pageSize});
		this.getManageableUsers();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.save(this.preferenceToken, { searchString: ""});
		this.getManageableUsers();
	}

	selectPage(page: number) {
		this.getManageableUsers();
	}

	createUser() {
		this.userMainService.clearData();
		this.router.navigate(["/users/create-user"]);
	}

	searchUsers(searchString: string) {
		this.searchString.next(searchString);
	}

	searchParentOrganizations(searchString) {
		this.organizationsLoading = true;
		if (this.getOrganizationsSubscription != null) {
			this.getOrganizationsSubscription.unsubscribe();
			this.getOrganizationsSubscription = null;
		}
		this.getOrganizationsSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
			organizationName: this.parentOrganization.value,
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
			console.log(error);
		});
	}

	selectParentOrganization(org: any) {
		if (org) {
			this.parentOrganization.setValue(org.organizationName);
			if (this.parentOrganizationId !== org.id) {
				this.preferenceService.saveFilter(this.preferenceToken,
						{parentOrganizationFilter: {label: org.organizationName, value: org.id}});
				this.parentOrganizationId = org.id;
				this.paginator.pageIndex = 0;
				this.getManageableUsers();
			}
		} else {
			this.clearParentOrganization();
		}
	}

	selectRole(roleId: any) {
		if (this.roleId !== roleId) {
			this.preferenceService.saveFilter(this.preferenceToken,
				{roleFilter: roleId});
			this.roleId = roleId;
			this.paginator.pageIndex = 0;
			this.getManageableUsers();
		}
	}

	clearParentOrganization() {
		this.parentOrganizationId = null;
		this.parentOrganization.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { parentOrganizationFilter: null });
		this.getManageableUsers();
		this.searchParentOrganizations("");
	}

	clearRole($event) {
		this.roleId = null;
		this.roleList.forEach(role => {
			role.selected = role.roleId === this.roleId;
		});
		this.role.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { roleFilter: null });
		this.getManageableUsers();
		$event.stopPropagation();
	}

	getManageableUsers() {
		const args: UsersService.UsersGetManageableUsersParams = {
			offset: (this.paginator.pageIndex) * this.paginator.pageSize,
			limit: this.paginator.pageSize
		};
		if (this.currentSearchString) {
			args.searchString = this.currentSearchString;
		}
		if (this.parentOrganizationId != null) {
			args.parentOrganizationId = this.parentOrganizationId;
		}
		if (this.roleId != null) {
			args.roleId = this.roleId;
		}
		let sort = this.sort.active;
		if (this.sort.direction === "asc") {
			sort = sort;
		} else if (this.sort.direction === "desc") {
			sort = "-" + sort;
		}
		args.sort = sort;
		if (this.getManageableUsersSubscription != null) {
			this.getManageableUsersSubscription.unsubscribe();
			this.getManageableUsersSubscription = null;
		}
		if (this.getRoleAssignmentsSubscriptions != null) {
			this.getRoleAssignmentsSubscriptions.forEach(subscription => {
				subscription.unsubscribe();
			});
			this.getRoleAssignmentsSubscriptions = null;
		}
		this.getManageableUsersSubscription = this.usersService.UsersGetManageableUsers(args).subscribe((body: any) => {
			this.getManageableUsersSubscription.unsubscribe();
			this.getManageableUsersSubscription = null;
			this.paginator.length = body.count;
			const data = [];
			this.getRoleAssignmentsSubscriptions = [];
			if (body.items != null) {
				for (let i = 0; i < body.items.length; i++) {
					const item = body.items[i];
					this.populateRoles(item.id);
					const user: User = {
						id: item.id,
						loginId: item.logonId,
						firstName: (item.address) ? item.address.firstName : "",
						lastName: (item.address) ? item.address.lastName : "",
						parentOrganizationName: item.parentOrganizationName,
						roles: this.userRolesMap[item.id],
						status: item.status
					};
					data.push(user);
				}
			}
			this.model.setData(data);
		});
	}

	setUserStatus(id: string, status: number) {
		this.usersService.UsersUpdateUserResponse({
			id,
			body: {status}
		}).subscribe(response => {
			this.translateService.get(status === 1 ? "USER_MANAGEMENT.USER_ENABLED_MESSAGE" : "USER_MANAGEMENT.USER_DISABLED_MESSAGE")
					.subscribe((message: string) => {
				this.alertService.success({message});
			});
			this.getManageableUsers();
		},
		errorResponse => {
			if (errorResponse.error && errorResponse.error.errors) {
				errorResponse.error.errors.forEach((error: { errorMessage: string; }) => {
					this.alertService.error({message: error.errorMessage});
				});
			} else {
				console.log(errorResponse);
			}
		});
	}

	private createFormControls() {
		this.parentOrganization = new FormControl(this.parentOrganizationFilter.label);
		this.role = new FormControl(this.roleId);
		this.searchText = new FormControl(this.currentSearchString);
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
			parentOrganization: this.parentOrganization,
			role: this.role
		});
		this.listSearchForm = new FormGroup({
			searchText: this.searchText
		});
	}

	private populateRoles(id: string) {
		const getRoleAssignmentsSubscription = this.roleAssignmentsService.getRoleAssignments({
			memberId: id
		}).subscribe((body: any) => {
			getRoleAssignmentsSubscription.unsubscribe();
			const index = this.getRoleAssignmentsSubscriptions.indexOf(getRoleAssignmentsSubscription);
			if (index >= 0) {
				this.getRoleAssignmentsSubscriptions.splice(index, 1);
			}
			const uniqueRoles: Array<number> = [];
			for (let i = 0; i < body.items.length; i++) {
				const roleId = body.items[i].roleId;
				if (uniqueRoles.indexOf(roleId) === -1) {
					uniqueRoles.push(roleId);
				}
			}
			this.populateRoleNames(id, uniqueRoles);
		});
		this.getRoleAssignmentsSubscriptions.push(getRoleAssignmentsSubscription);
	}

	private populateRoleNames(id: string, uniqueRoles: Array<number>) {
		if (this.roleNames != null) {
			const roleIds = uniqueRoles;
			const roleNames = [];
			for (let i = 0; i < roleIds.length; i++) {
				roleNames.push(this.roleNames[roleIds[i]]);
			}
			roleNames.sort((roleName1, roleName2) => {
				let result = 0;
				if (roleName1 < roleName2) {
					result = -1;
				} else if (roleName1 > roleName2) {
					result = 1;
				}
				return result;
			});
			this.userRolesMap[id] = roleNames;
		}
	}

	private loadRoleNames() {
		this.roleDescriptionsService.getRoleDescriptions({
			languageId: LanguageService.languageId
		}).subscribe((body: any) => {
			const roleList = [];
			const roleNames = {};
			for (let i = 0; i < body.items.length; i++) {
				const roleDescription = body.items[i];
				roleNames[roleDescription.roleId] = roleDescription.displayName;
				roleList.push({
					"content": roleDescription.displayName,
					"roleId": roleDescription.roleId
				});
			}
			roleList.sort((role1, role2) => {
				let result = 0;
				if (role1.content < role2.content) {
					result = -1;
				} else if (role1.content > role2.content) {
					result = 1;
				}
				return result;
			});
			this.roleList = roleList;
			this.roleNames = roleNames;
		});
	}

	private getPreferenceData() {
		this.preferenceToken = this.router.url;
		const preference = this.preferenceService.get(this.preferenceToken);
		if (preference) {
			const {
				pageSize,
				sort,
				searchString,
				filter,
				showFilters
			} = preference;
			if (pageSize) {
				this.pageSize = pageSize;
			}
			if (sort) {
				this.sort = sort ? sort : this.sort;
				this.activeColumn = sort.active;
				this.sortDirection = sort.direction;
			}
			if (searchString) {
				this.currentSearchString = searchString;
			}
			if (filter) {
				const {roleFilter, parentOrganizationFilter} = filter;
				if (parentOrganizationFilter) {
					this.parentOrganizationFilter = parentOrganizationFilter;
					this.parentOrganizationId = parentOrganizationFilter.value;
				}
				this.roleId = roleFilter;
			}
			if (showFilters) {
				this.showFilters = showFilters;
			}
		}
	}
}

interface User {
	id: string;
	loginId: string;
	firstName: string;
	lastName: string;
	parentOrganizationName: string;
	roles: string[];
	status: number;
}
/**
 * Data source to provide data to be rendered in the table.
 */
class UsersDataSource extends DataSource<User> {
	private user$: Subject<User[]> = new Subject<User[]>();

	setData(user: User[]) {
		this.user$.next(user);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<User[]> {
		return this.user$.asObservable();
	}

	disconnect() {}
}
