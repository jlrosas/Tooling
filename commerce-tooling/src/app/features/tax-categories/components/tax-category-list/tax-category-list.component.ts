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
import { TaxCategoriesService } from "../../../../rest/services/tax-categories.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import { DeleteTaxCategoryDialogComponent } from "../delete-tax-category-dialog/delete-tax-category-dialog.component";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { CurrentUserService } from "../../../../services/current-user.service";

@Component({
	templateUrl: "./tax-category-list.component.html",
	styleUrls: ["./tax-category-list.component.scss"]
})
export class TaxCategoryListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	listSearchForm: FormGroup;
	searchText: FormControl;
	store: FormControl;
	taxType: FormControl;
	currentSearchString = null;
	storeList: Array<any> = [];
	selectedStore = null;
	showFilters = false;
	selectedTaxType = null;
	responsiveCols = 12;
	displayedColumns: string[] = [
		"name",
		"type",
		"actions"
	];
	model = new TaxCategoryDataSource();

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
	taxTypeTextKeys = {
		"-3": "TAX_CATEGORIES.TAX_TYPE_SALES",
		"-4": "TAX_CATEGORIES.TAX_TYPE_SHIPPING"
	};
	taxTypeTextIndicies = Object.keys(this.taxTypeTextKeys);
	pageIndex = 0;

	private getTaxCategoriesSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private storeSearchString: Subject<string> = new Subject<string>();
	private getStoresSubscription: Subscription = null;
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
			private taxCategoriesService: TaxCategoriesService,
			private dialog: MatDialog,
			private preferenceService: PreferenceService,
			private onlineStoresService: OnlineStoresService,
			private currentUserService: CurrentUserService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchString = searchString;
			this.pageIndex = 0;
			this.getTaxCategories();
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
						usage: "HCL_TaxTool",
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
			this.pageIndex = 0;
			this.getTaxCategories();
		});
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
		this.storeSearchString.unsubscribe();
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this.getTaxCategories();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.pageIndex = 0;
		this.getTaxCategories();
	}

	searchTaxCategories(searchString: string) {
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
			usage: "HCL_TaxTool",
			identifier: "*" + searchString + "*",
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
		if (currentStoreId !== store.id) {
			if (currentStoreId !== null) {
				this.pageIndex = 0;
			}
			this.getTaxCategories();
			this.storeList = [];
			this.searchStores("");
		}
	}

	resetSelectedStore() {
		if (this.selectedStore) {
			this.store.setValue(this.selectedStore.identifier);
		}
	}

	createTaxCategory() {
		if (this.selectedStore) {
			this.router.navigate(["tax-categories/create-tax-category", {storeId: this.selectedStore.id, storeOwnerId: this.selectedStore.ownerId}]);
		}
	}

	refresh() {
		this.getTaxCategories();
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	selectTaxType(taxType: string) {
		this.selectedTaxType = taxType;
		this.pageIndex = 0;
		this.getTaxCategories();
	}

	clearSelectedTaxType($event) {
		this.selectedTaxType = null;
		this.taxType.setValue(null);
		this.pageIndex = 0;
		this.getTaxCategories();
		$event.stopPropagation();
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	deleteTaxCategory(taxCategory: any) {
		const { id, name } = taxCategory;
		const dialogRef = this.dialog.open(DeleteTaxCategoryDialogComponent, {
			...this.dialogConfig,
			data: {
				id,
				name
			}
		});
		dialogRef.afterClosed().subscribe(data => {
			if (data && data.taxCategoryDeleted) {
				this.getTaxCategories();
			}
		});
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
		this.store = new FormControl("");
		this.taxType = new FormControl(this.selectedTaxType);
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
			taxType: this.taxType
		});
		this.listSearchForm = new FormGroup({
			store: this.store,
			searchText: this.searchText
		});
	}

	private getTaxCategories() {
		if (this.selectedStore) {
			this.preferenceService.save(this.preferenceToken, {
				searchString: this.currentSearchString,
				sort: this.sort,
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				filter: {
					taxTypeFilter: this.selectedTaxType
				}
			});
			const args: TaxCategoriesService.GetTaxCategoriesParams = {
				offset: this.pageIndex * this.paginator.pageSize,
				limit: this.paginator.pageSize,
				storeId: this.selectedStore.id
			};
			if (this.currentSearchString) {
				args.searchString = this.currentSearchString;
			}
			if (this.selectedTaxType) {
				args.taxTypeId = Number(this.selectedTaxType);
			}
			let sort = this.sort.active;
			if (this.sort.direction === "asc") {
				sort = sort;
			} else if (this.sort.direction === "desc") {
				sort = "-" + sort;
			}
			args.sort = sort;
			if (this.getTaxCategoriesSubscription != null) {
				this.getTaxCategoriesSubscription.unsubscribe();
				this.getTaxCategoriesSubscription = null;
			}
			this.getTaxCategoriesSubscription = this.taxCategoriesService.
					getTaxCategories(args).subscribe((body: any) => {
				this.getTaxCategoriesSubscription.unsubscribe();
				this.getTaxCategoriesSubscription = null;
				this.paginator.length = body.count;
				const data: TaxCategory[] = [];
				for (let i = 0; i < body.items.length; i++) {
					const item = body.items[i];
					const taxTypeTextKey = this.taxTypeTextKeys[item.taxTypeId];
					const taxCategory: TaxCategory = {
						id: item.id,
						name: item.name,
						type: taxTypeTextKey ? taxTypeTextKey : item.taxTypeId
					};
					data.push(taxCategory);
				}
				this.model.setData(data);
			});
		}
	}

	private getPreferenceData() {
		this.preferenceToken = "tax-category-list";
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
				const {taxTypeFilter} = filter;
				if (taxTypeFilter) {
					this.selectedTaxType = taxTypeFilter;
				}
			}
			if (showFilters) {
				this.showFilters = showFilters;
			}
			if (pageIndex) {
				this.pageIndex = pageIndex;
			}
		}
	}

	private getFirstStore() {
		this.onlineStoresService.getOnlineStores({
			usage: "HCL_TaxTool",
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
}

interface TaxCategory {
	id: number;
	name: string;
	type: string;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class TaxCategoryDataSource extends DataSource<TaxCategory> {
	private taxCategories$: Subject<TaxCategory[]> = new Subject<TaxCategory[]>();

	setData(taxCategories: TaxCategory[]) {
		this.taxCategories$.next(taxCategories);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<TaxCategory[]> {
		return this.taxCategories$.asObservable();
	}

	disconnect() {}
}
