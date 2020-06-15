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
import { DeleteAccountDialogComponent } from "../delete-account-dialog/delete-account-dialog.component";
import { AccountsService } from "../../../../rest/services/accounts.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { CurrentUserService } from "../../../../services/current-user.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";

@Component({
	templateUrl: "./account-list.component.html",
	styleUrls: ["./account-list.component.scss"]
})
export class AccountListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	listSearchForm: FormGroup;
	displayedColumns: string[] = ["name", "contracts", "actions"];
	searchText: FormControl;
	store: FormControl;
	storeList: Array<any> = [];
	selectedStore = null;
	showFilters = false;
	responsiveCols = 12;
	currentSearchString = null;

	model = new AccountDataSource();

	@ViewChild(MatPaginator, {static: false})
	paginator: MatPaginator;
	@ViewChild(MatSort, {static: false})
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "name";
	sortDirection = "asc";

	private getAccountsSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private getStoresSubscription: Subscription = null;
	private storeSearchString: Subject<string> = new Subject<string>();
	private getStoreNameSubscription: Subscription = null;
	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};

	constructor(private router: Router,
			private route: ActivatedRoute,
			private accountsService: AccountsService,
			private onlineStoresService: OnlineStoresService,
			private currentUserService: CurrentUserService,
			private dialog: MatDialog,
			private preferenceService: PreferenceService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.preferenceService.save(this.preferenceToken, { searchString });
			this.currentSearchString = searchString;
			this.paginator.pageIndex = 0;
			this.getAccounts();
		});
		this.storeSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getStores(searchString);
		});
	}

	ngAfterViewInit() {
		const storeId = this.route.snapshot.params.storeId;
		if (storeId !== null && storeId !== undefined) {
			this.onlineStoresService.getOnlineStore(Number(storeId)).subscribe(store => {
				this.selectStore(store);
			});
		} else {
			this.getStoreNameSubscription = this.currentUserService.getStoreName().subscribe((storeName: string) => {
				if (storeName) {
					this.onlineStoresService.getOnlineStoresByIdentifier({
						identifier: storeName,
						usage: "HCL_AccountTool",
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
		}
		this.sort.sortChange.subscribe(sort => {
			this.paginator.pageIndex = 0;
			this.preferenceService.save(this.preferenceToken, {sort: this.sort});
			this.getAccounts();
		});
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
		this.storeSearchString.unsubscribe();
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.preferenceService.save(this.preferenceToken, {pageSize: this.pageSize});
		this.getAccounts();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.save(this.preferenceToken, { searchString: ""});
		this.getAccounts();
	}

	searchAccounts(searchString: string) {
		this.searchString.next(searchString);
	}

	searchStores(searchString: string) {
		this.storeSearchString.next(searchString);
	}

	getStores(searchString: string) {
		if (this.getStoresSubscription != null) {
			this.getStoresSubscription.unsubscribe();
			this.getStoresSubscription = null;
		}
		this.getStoresSubscription = this.onlineStoresService.getOnlineStoresByIdentifier({
			usage: "HCL_AccountTool",
			identifier: "*" + searchString + "*",
			limit: 10
	 	}).subscribe(
	 		response => {
		 		this.getStoresSubscription = null;
		 		if (response.items.length === 1 && response.items[0].identifier === this.store.value) {
		 			this.selectStore(response.items[0]);
		 		} else {
		 			this.storeList = response.items;
		 		}
			},
			error => {
				this.getStoresSubscription = null;
				console.log(error);
			}
		);
	}

	selectStore(store: any) {
		if (this.getStoreNameSubscription) {
			this.getStoreNameSubscription.unsubscribe();
			this.getStoreNameSubscription = null;
		}
		this.currentUserService.setPreferredStore(store.identifier);
		this.selectedStore = store;
		this.store.setValue(store.identifier);
		this.storeList = [];
		this.paginator.pageIndex = 0;
		this.getAccounts();
	}

	createAccount() {
		if (this.selectedStore) {
			this.router.navigate(["accounts/create-account", {storeId: this.selectedStore.id}]);
		}
	}

	gotoContracts(accountId: any) {
		this.router.navigate(["/contracts/contract-list", {accountId: accountId, storeId: this.selectedStore.id}]);
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	deleteAccount(account: any) {
		const { id, name } = account;
		const dialogRef = this.dialog.open(DeleteAccountDialogComponent, {
			...this.dialogConfig,
			data: {
				id,
				name
			}
		});
		dialogRef.afterClosed().subscribe(data => {
			if (data && data.accountDeleted) {
				this.getAccounts();
			}
		});
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
		this.store = new FormControl("");
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
			store: this.store
		});
		this.listSearchForm = new FormGroup({
			searchText: this.searchText
		});
	}

	private getAccounts() {
		if (this.selectedStore) {
			const args: AccountsService.GetAccountsParams = {
				storeId: this.selectedStore.id,
				offset: (this.paginator.pageIndex) * this.paginator.pageSize,
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
			if (this.getAccountsSubscription != null) {
				this.getAccountsSubscription.unsubscribe();
				this.getAccountsSubscription = null;
			}
			this.getAccountsSubscription = this.accountsService.
				getAccounts(args).subscribe((body: any) => {
				this.getAccountsSubscription.unsubscribe();
				this.getAccountsSubscription = null;
				this.paginator.length = body.count;
				const data: Account[] = [];
				for (let i = 0; i < body.items.length; i++) {
					const item = body.items[i];
					const account: Account = {
						id: item.id,
						name: item.customerOrganizationName,
						numberOfContracts: item.numberOfContracts
					};
					data.push(account);
				}
				this.model.setData(data);
			});
		} else {
			this.model.setData([]);
		}
	}

	private getFirstStore() {
		this.onlineStoresService.getOnlineStores({
			usage: "HCL_AccountTool",
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
		this.preferenceToken = "account-list";
		const preference = this.preferenceService.get(this.preferenceToken);
		if (preference) {
			const {
				pageSize,
				sort,
				searchString,
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
			if (showFilters) {
				this.showFilters = showFilters;
			}
		}
	}
}

interface Account {
	id: string;
	name: string;
	numberOfContracts: number;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class AccountDataSource extends DataSource<Account> {
	private accounts$: Subject<Account[]> = new Subject<Account[]>();

	setData(accounts: Account[]) {
		this.accounts$.next(accounts);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<Account[]> {
		return this.accounts$.asObservable();
	}

	disconnect() {}
}
