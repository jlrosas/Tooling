/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, Subscription, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { OrganizationMainService } from "../../services/organization-main.service";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { FormGroup, FormControl } from "@angular/forms";
import { DataSource } from "@angular/cdk/table";
import { MatPaginator, MatSort } from "@angular/material";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";

@Component({
	templateUrl: "./organization-list.component.html",
	styleUrls: ["./organization-list.component.scss"]
})
export class OrganizationListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	listSearchForm: FormGroup;
	searchText: FormControl;
	parentOrganization: FormControl;
	organizationList: Array<any> = [];
	parentOrganizationFilter = null;
	showFilters = false;
	responsiveCols = 12;
	organizationsLoading = false;

	model = new OrganizationsDataSource();

	displayedColumns: string[] = ["organizationName", "parentOrganizationName", "organizationType"];

	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "organizationName";
	sortDirection = "asc";
	currentSearchString = null;
	pageIndex = 0;

	private organizationSearchString: Subject<string> = new Subject<string>();
	private getOrganizationsSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private getManageableOrganizationsSubscription: Subscription = null;
	private typeTextKeys = {
		"O": "ORGANIZATIONS.ORGANIZATION",
		"OU": "ORGANIZATIONS.ORGANIZATIONAL_UNIT"
	};
	private typeTextIndices = Object.keys(this.typeTextKeys);

	private onLangChangeSubscription: Subscription = null;

	constructor(private router: Router,
			private organizationsService: OrganizationsService,
			private organizationMainService: OrganizationMainService,
			private preferenceService: PreferenceService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.pageIndex = 0;
			this.currentSearchString = searchString;
			this.getManageableOrganizations();
		});
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
		this.sort.sortChange.subscribe(sort => {
			this.pageIndex = 0;
			this.getManageableOrganizations();
		});
		this.getManageableOrganizations();
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
		this.organizationSearchString.unsubscribe();
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
		this.getManageableOrganizations();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.pageIndex = 0;
		this.getManageableOrganizations();
	}

	searchOrganizations(searchString: string) {
		this.searchString.next(searchString);
	}

	getManageableOrganizations() {
		this.preferenceService.save(this.preferenceToken, {
			searchString: this.currentSearchString,
			sort: this.sort,
			pageIndex: this.pageIndex,
			pageSize: this.pageSize,
			filter: {
				parentOrganizationFilter: this.parentOrganizationFilter
			}
		});
		const args: OrganizationsService.OrganizationGetManageableOrganizationsParams = {
			offset: this.pageIndex * this.paginator.pageSize,
			limit: this.paginator.pageSize
		};
		if (this.currentSearchString) {
			args.organizationName = this.currentSearchString;
		}
		if (this.parentOrganizationFilter != null) {
			args.parentOrganizationId = this.parentOrganizationFilter.id;
		}
		let sort = this.sort.active;
		if (this.sort.direction === "asc") {
			sort = sort;
		} else if (this.sort.direction === "desc") {
			sort = "-" + sort;
		}
		args.sort = sort;
		if (this.getManageableOrganizationsSubscription != null) {
			this.getManageableOrganizationsSubscription.unsubscribe();
			this.getManageableOrganizationsSubscription = null;
		}
		this.getManageableOrganizationsSubscription = this.organizationsService.
				OrganizationGetManageableOrganizations(args).subscribe((body: any) => {
			this.getManageableOrganizationsSubscription.unsubscribe();
			this.getManageableOrganizationsSubscription = null;
			this.paginator.length = body.count;
			const data = [];
			const typeItems = [];
			for (let i = 0; i < body.items.length; i++) {
				const item = body.items[i];
				const typeTextKey = this.typeTextKeys[item.organizationType];
				const org: Organization = {
					id: item.id,
					name: item.organizationName,
					parentOrganizationName: item.parentOrganizationName,
					typeTextKey
				};
				data.push(org);
			}
			this.model.setData(data);
		});
	}

	createOrganization() {
		this.organizationMainService.clearData();
		this.router.navigate(["organizations/create-organization"]);
	}

	searchParentOrganizations(searchString: string) {
		this.organizationsLoading = true;
		this.organizationSearchString.next(searchString);
	}

	getParentOrganizations(searchString) {
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
				this.getManageableOrganizations();
			}
		}
	}

	clearParentOrganization() {
		this.parentOrganizationFilter = null;
		this.parentOrganization.setValue("");
		this.pageIndex = 0;
		this.getManageableOrganizations();
		this.searchParentOrganizations("");
	}

	refreshOrganizations() {
		this.getManageableOrganizations();
	}

	private createFormControls() {
		this.parentOrganization = new FormControl(this.parentOrganizationFilter ? this.parentOrganizationFilter.organizationName : "");
		this.searchText = new FormControl(this.currentSearchString);
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
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
				const {parentOrganizationFilter} = filter;
				this.parentOrganizationFilter = parentOrganizationFilter;
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

interface Organization {
	id: string;
	name: string;
	parentOrganizationName: string;
	typeTextKey: string;
}
/**
 * Data source to provide data to be rendered in the table.
 */
class OrganizationsDataSource extends DataSource<Organization> {
	private organization$: Subject<Organization[]> = new Subject<Organization[]>();

	setData(memberGroups: Organization[]) {
		this.organization$.next(memberGroups);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<Organization[]> {
		return this.organization$.asObservable();
	}

	disconnect() {}
}
