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
import { Subject, Subscription, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { MatDialog } from "@angular/material";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import { UserAccountPolicyDescriptionsService } from "../../../../rest/services/user-account-policy-descriptions.service";
import { DeleteSecurityPolicyDialogComponent } from "../delete-security-policy-dialog/delete-security-policy-dialog.component";

@Component({
	templateUrl: "./security-policy-list.component.html",
	styleUrls: ["./security-policy-list.component.scss"]
})
export class SecurityPolicesListComponent implements OnInit, OnDestroy, AfterViewInit {
	listSearchForm: FormGroup;
	displayedColumns: string[] = ["description", "actions"];
	searchText: FormControl;
	responsiveCols = 12;
	currentSearchString = null;

	model = new SecurityPolicyDataSource();

	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "description";
	sortDirection = "asc";
	pageIndex = 0;

	private getSecurityPoliciesSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();

	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};

	constructor(private router: Router,
			private route: ActivatedRoute,
			private userAccountPolicyDescriptionsService: UserAccountPolicyDescriptionsService,
			private preferenceService: PreferenceService,
			private dialog: MatDialog) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchString = searchString;
			this.pageIndex = 0;
			this.getSecurityPolicies();
		});
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(sort => {
			this.pageIndex = 0;
			this.getSecurityPolicies();
		});
		this.getSecurityPolicies();
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this.getSecurityPolicies();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.pageIndex = 0;
		this.getSecurityPolicies();
	}

	searchSecurityPolicies(searchString: string) {
		this.searchString.next(searchString);
	}

	createSecurityPolicy() {
		this.router.navigate(["security-policies/create-security-policy"]);
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	refreshSecurityPolicies() {
		this.getSecurityPolicies();
	}

	deleteSecurityPolicy(securityPolicy: any) {
		const { userAccountPolicyId, description } = securityPolicy;
		const dialogRef = this.dialog.open(DeleteSecurityPolicyDialogComponent, {
			...this.dialogConfig,
			data: {
				id: userAccountPolicyId,
				name: description
			}
		});
		dialogRef.afterClosed().subscribe(data => {
			if (data && data.securityPolicyDeleted) {
				this.getSecurityPolicies();
			}
		});
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
	}

	private createForm() {
		this.listSearchForm = new FormGroup({
			searchText: this.searchText
		});
	}

	private getSecurityPolicies() {
		this.preferenceService.save(this.preferenceToken, {
			searchString: this.currentSearchString,
			sort: this.sort,
			pageIndex: this.pageIndex,
			pageSize: this.pageSize
		});
		const args: UserAccountPolicyDescriptionsService.GetUserAccountPolicyDescriptionsParams = {
			offset: this.pageIndex * this.paginator.pageSize,
			limit: this.paginator.pageSize
		};
		if (this.currentSearchString) {
			args.searchString = this.currentSearchString;
		}
		let sort = this.sort.active;
		if (this.sort.direction === "asc") {
			sort = sort;
		} else if (this.sort.direction === "desc") {
			sort = "-" + sort;
		}
		args.sort = sort;
		args.languageId = -1;
		if (this.getSecurityPoliciesSubscription != null) {
			this.getSecurityPoliciesSubscription.unsubscribe();
			this.getSecurityPoliciesSubscription = null;
		}
		this.getSecurityPoliciesSubscription = this.userAccountPolicyDescriptionsService.
		getUserAccountPolicyDescriptions(args).subscribe((body: any) => {
			this.getSecurityPoliciesSubscription.unsubscribe();
			this.getSecurityPoliciesSubscription = null;
			this.paginator.length = body.count;
			const data: SecurityPolicy[] = [];
			for (let i = 0; i < body.items.length; i++) {
				const item = body.items[i];
				const securityPolicy: SecurityPolicy = {
					userAccountPolicyId: item.userAccountPolicyId,
					description: item.description
				};
				data.push(securityPolicy);
			}
			this.model.setData(data);
		});
	}

	private getPreferenceData() {
		this.preferenceToken = "security-policy-list";
		const preference = this.preferenceService.get(this.preferenceToken);
		if (preference) {
			const {
				pageSize,
				sort,
				searchString,
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
			if (pageIndex) {
				this.pageIndex = pageIndex;
			}
		}
	}

}

interface SecurityPolicy {
	userAccountPolicyId: string;
	description: string;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class SecurityPolicyDataSource extends DataSource<SecurityPolicy> {
	private securityPolicies$: Subject<SecurityPolicy[]> = new Subject<SecurityPolicy[]>();

	setData(securityPolicies: SecurityPolicy[]) {
		this.securityPolicies$.next(securityPolicies);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<SecurityPolicy[]> {
		return this.securityPolicies$.asObservable();
	}

	disconnect() {}
}
