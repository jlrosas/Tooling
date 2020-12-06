/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, Subscription, Observable, forkJoin } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { UsersService } from "../../../../rest/services/users.service";
import { RoleAssignmentsService } from "../../../../rest/services/role-assignments.service";
import { RoleDescriptionsService } from "../../../../rest/services/role-descriptions.service";
import { UserMainService } from "../../services/user-main.service";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { FormGroup, FormControl } from "@angular/forms";
import { DataSource } from "@angular/cdk/table";
import { MatDialog, MatPaginator, MatSort } from "@angular/material";
import { LanguageService } from "../../../../services/language.service";
import { TranslateService } from "@ngx-translate/core";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import { AlertService } from "../../../../services/alert.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { PasswordResetDialogComponent } from "../password-reset-dialog/password-reset-dialog.component";
import { CurrentUserService } from "../../../../services/current-user.service";

@Component({
	templateUrl: "./user-list.component.html",
	styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	listSearchForm: FormGroup;
	parentOrganization: FormControl;
	store: FormControl;
	role: FormControl;
	organizationList: Array<any> = [];
	roleList: Array<any> = [];
	parentOrganizationFilter = null;
	roleId = null;
	searchText: FormControl;
	showFilters = false;
	responsiveCols = 12;

	storeRequired = false;
	seller = false;

	model = new UsersDataSource();
	public userRolesMap = {};
	public registeredCustomerMap = {};
	public registeredCustomerStoreOwnerIdsMap = {};

	displayedColumns: string[] = ["loginId", "firstName",  "lastName",  "parentOrganizationName", "role", "status", "actions"];

	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "loginId";
	sortDirection = "asc";
	currentSearchString = null;
	organizationsLoading = false;
	selectedStore = null;
	isB2CStore = false;
	storeList: Array<any> = [];

	pageIndex = 0;

	private roleNames = null;
	private organizationSearchString: Subject<string> = new Subject<string>();
	private getOrganizationsSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private getStoresSubscription: Subscription = null;
	private storeSearchString: Subject<string> = new Subject<string>();
	private getStoreNameSubscription: Subscription = null;
	private getManageableUsersSubscription: Subscription = null;
	private getRoleAssignmentsSubscriptions: Array<Subscription> = [];

	private onLangChangeSubscription: Subscription = null;

	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};

	private B2C_STORE_TYPES = new Set([
		"B2C",
		"BBB",
		"MHS",
		"RHS"
	]);

	constructor(private router: Router,
			private route: ActivatedRoute,
			private usersService: UsersService,
			private roleAssignmentsService: RoleAssignmentsService,
			private roleDescriptionsService: RoleDescriptionsService,
			private userMainService: UserMainService,
			private organizationsService: OrganizationsService,
			private preferenceService: PreferenceService,
			private translateService: TranslateService,
			private alertService: AlertService,
			private onlineStoresService: OnlineStoresService,
			private currentUserService: CurrentUserService,
			private dialog: MatDialog) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.pageIndex = 0;
			this.currentSearchString = searchString;
			this.getManageableUsers();
		});
		this.storeSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getStores(searchString);
		});
		this.loadRoleNames();
		this.organizationSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			if (this.parentOrganization.value === searchString) {
				this.getParentOrganizations(searchString);
			} else {
				this.organizationsLoading = false;
			}
		});
		this.searchParentOrganizations("");
	}

	ngAfterViewInit() {
		// -1 Site Administrator
		// -3 Customer Service Representative
		// -4 Seller
		// -12 Operations Manager
		// -14 Customer Service Supervisor
		// -20 Seller Administrator
		// -21 Buyer Administrator
		// -27 Channel Manager
		forkJoin([
			this.currentUserService.hasMatchingRole([-1, -3, -14, -20, -21, -27]),
			this.currentUserService.hasMatchingRole([-1, -20, -27]),
			this.currentUserService.hasMatchingRole([-1, -3, -12, -14, -20, -21, -27])
		]).subscribe((hasRoleArray: Array<boolean>) => {
			this.storeRequired = !hasRoleArray[0];
			const storePreferred = !hasRoleArray[1];
			this.seller = !hasRoleArray[2];
			const storeId = this.route.snapshot.params.storeId;
			if (storeId && storeId !== "0") {
				this.onlineStoresService.getOnlineStore(Number(storeId)).subscribe(store => {
					this.selectStore(store);
				});
			} else if (this.storeRequired || (storePreferred && storeId !== "0")) {
				this.getStoreNameSubscription = this.currentUserService.getStoreName().subscribe((storeName: string) => {
					if (storeName) {
						this.onlineStoresService.getOnlineStoresByIdentifier({
							identifier: storeName,
							usage: "HCL_UserTool",
							limit: 1
						}).subscribe(onlineStoreResponse => {
							if (this.getStoreNameSubscription) {
								this.getStoreNameSubscription.unsubscribe();
								this.getStoreNameSubscription = null;
							}
							const storeArray = onlineStoreResponse.items;
							for (let i = 0; i < storeArray.length; i++) {
								const store = storeArray[i];
								if (storeName === store.identifier) {
									this.selectStore(store);
									break;
								}
							}
							if (this.selectedStore === null) {
								this.getFirstStore();
							}
						});
					} else {
						this.getFirstStore();
					}
				});
			} else {
				this.searchStores("");
				this.getManageableUsers();
			}
		});
		this.sort.sortChange.subscribe(sort => {
			this.pageIndex = 0;
			this.getManageableUsers();
		});
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
		this.organizationSearchString.unsubscribe();
		this.storeSearchString.unsubscribe();
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
		this.pageIndex = e.pageIndex;
		this.getManageableUsers();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.pageIndex = 0;
		this.getManageableUsers();
	}

	selectPage(page: number) {
		this.getManageableUsers();
	}

	createUser() {
		this.userMainService.clearData();
		if (this.selectedStore) {
			this.router.navigate(["/users/create-user", {
				storeId: this.selectedStore.id,
				storeType: this.selectedStore.type,
				storeIdentifier: this.selectedStore.identifier
			}]);
		} else {
			this.router.navigate(["/users/create-user", {storeId: 0}]);
		}
	}

	searchUsers(searchString: string) {
		this.searchString.next(searchString);
	}

	searchParentOrganizations(searchString: string) {
		this.organizationsLoading = true;
		this.organizationSearchString.next(searchString);
	}

	getParentOrganizations(searchString) {
		this.organizationsLoading = true;
		if (this.getOrganizationsSubscription != null) {
			this.getOrganizationsSubscription.unsubscribe();
			this.getOrganizationsSubscription = null;
		}
		this.getOrganizationsSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
			organizationName: searchString,
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

	resetParentOrganizationFilter() {
		if (this.parentOrganizationFilter) {
			this.parentOrganization.setValue(this.parentOrganizationFilter.organizationName);
		} else if (this.parentOrganization.value !== "") {
			this.parentOrganization.setValue("");
			this.searchParentOrganizations("");
		}
	}

	selectParentOrganization(org: any) {
		if (org) {
			this.parentOrganization.setValue(org.organizationName);
			this.organizationList = [];
			if (this.parentOrganizationFilter === null || this.parentOrganizationFilter.id !== org.id) {
				this.parentOrganizationFilter = {
					id: org.id,
					organizationName: org.organizationName
				};
				this.pageIndex = 0;
				this.getManageableUsers();
			}
		}
	}

	selectRole(roleId: any) {
		if (this.roleId !== roleId) {
			this.roleId = roleId;
			this.pageIndex = 0;
			this.getManageableUsers();
		}
	}

	clearParentOrganization() {
		this.parentOrganizationFilter = null;
		this.parentOrganization.setValue("");
		this.pageIndex = 0;
		this.getManageableUsers();
		this.searchParentOrganizations("");
	}

	clearRole($event) {
		this.roleId = null;
		this.role.setValue(null);
		this.pageIndex = 0;
		this.getManageableUsers();
		$event.stopPropagation();
	}

	getManageableUsers() {
		if (!this.storeRequired || this.selectedStore) {
			this.preferenceService.save(this.preferenceToken, {
				searchString: this.currentSearchString,
				sort: this.sort,
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				filter: {
					parentOrganizationFilter: this.parentOrganizationFilter,
					roleFilter: this.roleId
				}
			});
			const args: UsersService.UsersGetManageableUsersParams = {
				offset: this.pageIndex * this.pageSize,
				limit: this.pageSize
			};
			if (this.currentSearchString) {
				args.searchString = this.currentSearchString;
			}
			if (this.parentOrganizationFilter != null) {
				args.parentOrganizationId = this.parentOrganizationFilter.id;
			}
			if (this.roleId != null) {
				args.roleId = this.roleId;
			}
			if (this.selectedStore != null) {
				args.roleOrganizationId = this.selectedStore.ownerId;
				args.organizationRoleId = -29;
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
							status: item.status,
						};
						data.push(user);
					}
				}
				this.model.setData(data);
			});
		}
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
		});
	}

	searchStores(searchString: string) {
		this.storeSearchString.next(searchString);
	}

	getStores(searchString: string) {
		if (this.getStoresSubscription !== null) {
			this.getStoresSubscription.unsubscribe();
			this.getStoresSubscription = null;
		}
		this.getStoresSubscription = this.onlineStoresService.getOnlineStores({
			usage: "HCL_UserTool",
			searchString,
			limit: 10
	 	}).subscribe(response => {
	 		this.getStoresSubscription = null;
	 		if (response.items.length === 1 && response.items[0].identifier === this.store.value) {
	 			this.selectStore(response.items[0]);
	 		} else {
	 			this.storeList = response.items;
	 		}
		},
		error => {
			this.getStoresSubscription = null;
		});
	}

	selectStore(store: any) {
		if (this.getStoreNameSubscription) {
			this.getStoreNameSubscription.unsubscribe();
			this.getStoreNameSubscription = null;
		}
		const currentStoreId = this.selectedStore ? this.selectedStore.id : null;
		this.currentUserService.setPreferredStore(store.identifier);
		this.selectedStore = store;
		this.store.setValue(store.identifier);
		this.isB2CStore = this.B2C_STORE_TYPES.has(store.type);
		if (currentStoreId !== store.id) {
			if (currentStoreId !== null) {
				this.pageIndex = 0;
			}
			this.getManageableUsers();
			this.storeList = [];
			this.searchStores("");
		}
	}

	resetSelectedStore() {
		if (this.selectedStore) {
			this.store.setValue(this.selectedStore.identifier);
		}
	}

	clearStore() {
		this.selectedStore = null;
		this.isB2CStore = false;
		this.store.setValue(null);
		this.pageIndex = 0;
		this.getManageableUsers();
	}

	refreshUsers() {
		this.getManageableUsers();
	}

	resetPassword(id: string, loginId: string) {
		const dialogRef = this.dialog.open(PasswordResetDialogComponent, {
			...this.dialogConfig,
			data: {
				id,
				name: loginId,
				storeOwnerIds: this.registeredCustomerStoreOwnerIdsMap[id]
			}
		});
		dialogRef.afterClosed().subscribe(data => {
			if (data && data.passwordReset) {
				this.getManageableUsers();
			}
		});
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
		this.parentOrganization = new FormControl(this.parentOrganizationFilter ? this.parentOrganizationFilter.organizationName : "");
		this.role = new FormControl(this.roleId);
		this.store = new FormControl("");
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
			parentOrganization: this.parentOrganization,
			role: this.role
		});
		this.listSearchForm = new FormGroup({
			searchText: this.searchText,
			store: this.store
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
			const registeredCustomerStoreOwnerIds = [];
			const uniqueRoles: Array<number> = [];
			for (let i = 0; i < body.items.length; i++) {
				const roleId = body.items[i].roleId;
				if (uniqueRoles.indexOf(roleId) === -1) {
					uniqueRoles.push(roleId);
				}
				if (roleId === -29) {
					registeredCustomerStoreOwnerIds.push(body.items[i].organizationId);
				}
			}
			this.populateRoleNames(id, uniqueRoles);
			this.registeredCustomerStoreOwnerIdsMap[id] = registeredCustomerStoreOwnerIds;
			this.registeredCustomerMap[id] = registeredCustomerStoreOwnerIds.length > 0;
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

	private getFirstStore() {
		this.onlineStoresService.getOnlineStores({
			usage: "HCL_UserTool",
			limit: 1
		}).subscribe(onlineStoreResponse => {
			const storeArray = onlineStoreResponse.items;
			for (let index = 0; index < storeArray.length; index++) {
				const store = storeArray[index];
				this.selectStore(store);
				break;
			}
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
				showFilters,
				pageIndex
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
				const {roleFilter, parentOrganizationFilter, storeFilter} = filter;
				this.parentOrganizationFilter = parentOrganizationFilter;
				this.roleId = roleFilter;
			}
			if (showFilters) {
				this.showFilters = showFilters;
			}
			if (pageIndex) {
				this.pageIndex = pageIndex;
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
