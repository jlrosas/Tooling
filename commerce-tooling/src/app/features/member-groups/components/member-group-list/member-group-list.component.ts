/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { Subject, Subscription, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { MatDialog } from "@angular/material";
import { MemberGroupMainService } from "../../services/member-group-main.service";
import { MemberGroupsService } from "../../../../rest/services/member-groups.service";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { OrganizationNameService } from "../../../../services/organization-name.service";
import { AlertService } from "../../../../services/alert.service";
import { DeleteMemberGroupDialogComponent } from "../delete-member-group-dialog/delete-member-group-dialog.component";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import { CurrentUserService } from "../../../../services/current-user.service";

@Component({
	templateUrl: "./member-group-list.component.html",
	styleUrls: ["./member-group-list.component.scss"]
})
export class MemberGroupListComponent implements OnInit, AfterViewInit {
	listFilterForm: FormGroup;
	memberGroupTypeDropdown: FormControl;
	listSearchForm: FormGroup;
	searchText: FormControl;
	parentOrganization: FormControl;

	currentSearchString = null;
	memberGroupType = null;
	organizationList: Array<any> = [];
	parentOrganizationId = null;
	showFilters = false;
	responsiveCols = 12;
	organizationsLoading = false;

	model = new MemberGroupsDataSource();

	displayedColumns: string[] = ["name", "parentOrganization", "usage", "description", "actions"];
	usageArray: string[] = ["CustomerPrice"];

	@ViewChild(MatPaginator, { static: false })
	paginator: MatPaginator;
	@ViewChild(MatSort, { static: false })
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "name";
	sortDirection = "asc";

	private parentOrgSearchString: Subject<string> = new Subject<string>();
	private getOrganizationsSubscription: Subscription = null;

	private searchString: Subject<string> = new Subject<string>();
	private getMemberGroupsSubscription: Subscription = null;

	private typeTextKeys = {
		"AccessControl": "MEMBER_GROUPS.ACCESS_CONTROL",
		"CustomerPrice": "MEMBER_GROUPS.CUSTOMER_PRICE",
		"RegisteredCustomer": "MEMBER_GROUPS.REGISTERED_CUSTOMER"
	};

	private typeTextIndices = Object.keys({
		"CustomerPrice": "MEMBER_GROUPS.CUSTOMER_PRICE",
	});
	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};
	private memberGroupTypeFilter = {label: "", value: ""};
	private parentOrganizationFilter = {label: "", value: ""};

	constructor(private router: Router,
			private translateService: TranslateService,
			private memberGroupsService: MemberGroupsService,
			private memberGroupMainService: MemberGroupMainService,
			private organizationsService: OrganizationsService,
			private organizationNameService: OrganizationNameService,
			private alertService: AlertService,
			private dialog: MatDialog,
			private preferenceService: PreferenceService,
			private currentUserService: CurrentUserService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.preferenceService.save(this.preferenceToken, { searchString });
			this.paginator.pageIndex = 0;
			this.currentSearchString = searchString;
			this.getMemberGroups();
		});
		this.parentOrgSearchString.pipe(debounceTime(250)).subscribe(parentOrg => {
			this.getOrganizations(parentOrg);
		});
		this.searchOrganizations("");
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(sort => {
			this.paginator.pageIndex = 0;
			this.preferenceService.save(this.preferenceToken, {sort: this.sort});
			this.getMemberGroups();
		});
		this.currentUserService.getRoles().subscribe((currentUserRoles: Array<number>) => {
			for (let index = 0; index < currentUserRoles.length; index++) {
				if (currentUserRoles[index] === -1) {
					this.usageArray = ["AccessControl", "CustomerPrice", "RegisteredCustomer"];
					this.typeTextIndices = Object.keys({
						"AccessControl": "MEMBER_GROUPS.ACCESS_CONTROL",
						"CustomerPrice": "MEMBER_GROUPS.CUSTOMER_PRICE",
						"RegisteredCustomer": "MEMBER_GROUPS.REGISTERED_CUSTOMER"
					});
					break;
				}
			}
			this.getMemberGroups();
		});
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	public handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.preferenceService.save(this.preferenceToken, {pageSize: this.pageSize});
		this.getMemberGroups();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.save(this.preferenceToken, { searchString: ""});
		this.getMemberGroups();
	}

	clearParentOrgFilter() {
		this.parentOrganizationId = null;
		this.parentOrganization.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { parentOrganizationFilter: null });
		this.getMemberGroups();
		this.searchOrganizations("");
	}

	searchMemberGroups(searchString: string) {
		this.searchString.next(searchString);
	}

	getMemberGroups() {
		const args: MemberGroupsService.GetMemberGroupsParams = {
			offset: (this.paginator.pageIndex) * this.paginator.pageSize,
			limit: this.paginator.pageSize,
			usage: this.usageArray
		};
		if (this.currentSearchString) {
			args.searchString = this.currentSearchString;
		}
		if (this.memberGroupType != null) {
			args.usage = [this.memberGroupType];
		}
		if (this.parentOrganizationId != null) {
			args.ownerId = this.parentOrganizationId;
		}
		let sort = this.sort.active;
		if (this.sort.direction === "asc") {
			sort = sort;
		} else if (this.sort.direction === "desc") {
			sort = "-" + sort;
		}
		args.sort = sort;
		if (this.getMemberGroupsSubscription != null) {
			this.getMemberGroupsSubscription.unsubscribe();
			this.getMemberGroupsSubscription = null;
		}
		this.getMemberGroupsSubscription = this.memberGroupsService.
				getMemberGroups(args).subscribe((body: any) => {
			this.getMemberGroupsSubscription.unsubscribe();
			this.getMemberGroupsSubscription = null;
			this.paginator.length = body.count;
			const data: MemberGroup[] = [];
			for (let i = 0; i < body.items.length; i++) {
				const item = body.items[i];
				const typeTextKey = this.typeTextKeys[item.usage];
				const memberGroup: MemberGroup = {
					id: item.id,
					name: item.name,
					parentOrganizationName: "",
					description: item.description,
					usage: item.usage,
					typeTextKey: typeTextKey
				};
				this.organizationNameService.getOrganizationName(item.ownerId).subscribe(organizationName => {
					memberGroup.parentOrganizationName = organizationName;
				});
				data.push(memberGroup);
			}
			this.model.setData(data);
		});
	}

	createMemberGroup() {
		this.alertService.clear();
		this.memberGroupMainService.clearData();
		this.router.navigate(["member-groups/create-member-group"]);
	}

	selectMemberGroupType(memberGroupType: string) {
		if (this.memberGroupType !== memberGroupType) {
			this.preferenceService.saveFilter(this.preferenceToken,
				{memberGroupTypeFilter: {label: this.memberGroupTypeDropdown.value, value: memberGroupType}});
			this.memberGroupType = memberGroupType;
			this.paginator.pageIndex = 0;
			this.getMemberGroups();
		}
	}

	clearMemberGroupType($event) {
		this.memberGroupType = null;
		this.memberGroupTypeDropdown.setValue(null);
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { memberGroupTypeFilter: null });
		this.getMemberGroups();
		$event.stopPropagation();
	}

	getOrganizations(orgString: string) {
		this.organizationsLoading = true;
		if (this.getOrganizationsSubscription != null) {
			this.getOrganizationsSubscription.unsubscribe();
			this.getOrganizationsSubscription = null;
		}
		this.getOrganizationsSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
			organizationName: orgString,
			limit: 10
		}).subscribe(
			response => {
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
			}
		);
	}

	searchOrganizations(searchString: string) {
		this.parentOrgSearchString.next(searchString);
	}

	selectParentOrganization(org: any) {
		if (org) {
			this.parentOrganization.setValue(org.organizationName);
			this.preferenceService.saveFilter(this.preferenceToken,
				{parentOrganizationFilter: {label: org.organizationName, value: org.id}});
			if (this.parentOrganizationId !== org.id) {
				this.parentOrganizationId = org.id;
				this.paginator.pageIndex = 0;
				this.getMemberGroups();
			}
		} else {
			this.clearParentOrgFilter();
		}
	}

	deleteMemberGroup(memberGroup: any) {
		const { id, name } = memberGroup;
		const dialogRef = this.dialog.open(DeleteMemberGroupDialogComponent, {
			...this.dialogConfig,
			data: {
				id,
				name
			}
		});

		dialogRef.afterClosed().subscribe(data => {
			if (data && data.memberGroupDeleted) {
				this.getMemberGroups();
			}
		});
	}

	private createFormControls() {
		this.parentOrganization = new FormControl(this.parentOrganizationFilter.label);
		this.memberGroupTypeDropdown = new FormControl(this.memberGroupTypeFilter.label);
		this.searchText = new FormControl(this.currentSearchString);
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
			memberGroupTypeDropdown: this.memberGroupTypeDropdown,
			parentOrganization: this.parentOrganization
		});
		this.listSearchForm = new FormGroup({
			searchText: this.searchText
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
				const {memberGroupTypeFilter, parentOrganizationFilter} = filter;
				if (memberGroupTypeFilter) {
					this.memberGroupTypeFilter = memberGroupTypeFilter;
					this.memberGroupType = memberGroupTypeFilter.value;
				}
				if (parentOrganizationFilter) {
					this.parentOrganizationFilter = parentOrganizationFilter;
					this.parentOrganizationId = parentOrganizationFilter.value;
				}
			}
			if (showFilters) {
				this.showFilters = showFilters;
			}
		}
	}
}

interface MemberGroup {
	id: string;
	name: string;
	parentOrganizationName: string;
	description: string;
	usage: string;
	typeTextKey: string;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class MemberGroupsDataSource extends DataSource<MemberGroup> {
	private memberGroups$: Subject<MemberGroup[]> = new Subject<MemberGroup[]>();

	setData(memberGroups: MemberGroup[]) {
		this.memberGroups$.next(memberGroups);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<MemberGroup[]> {
		return this.memberGroups$.asObservable();
	}

	disconnect() {}
}
