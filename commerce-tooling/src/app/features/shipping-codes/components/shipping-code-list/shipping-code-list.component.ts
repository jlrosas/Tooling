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
import { TranslateService } from "@ngx-translate/core";
import { CalculationCodesService } from "../../../../rest/services/calculation-codes.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { CurrentUserService } from "../../../../services/current-user.service";
import { AlertService } from "../../../../services/alert.service";
import { DeleteShippingCodeDialogComponent } from "../delete-shipping-code-dialog/delete-shipping-code-dialog.component";

@Component({
	templateUrl: "./shipping-code-list.component.html",
	styleUrls: ["./shipping-code-list.component.scss"]
})
export class ShippingCodeListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	listSearchForm: FormGroup;
	searchText: FormControl;
	store: FormControl;
	statusSelect: FormControl;
	currentSearchString = null;
	storeList: Array<any> = [];
	selectedStore = null;
	showFilters = false;
	statusFilter = null;
	responsiveCols = 12;
	displayedColumns: string[] = [
		"calculationCode",
		"status",
		"actions"
	];
	model = new ShippingCodeDataSource();

	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "calculationCode";
	sortDirection = "asc";
	pageIndex = 0;
	private statusTextKeys = {
		1: "SHIPPING_CODES.ACTIVATED",
		0: "SHIPPING_CODES.DEACTIVATED"
	};
	private getShippingCodesSubscription: Subscription = null;
	private getStoresSubscription: Subscription = null;
	private storeSearchString: Subject<string> = new Subject<string>();
	private getStoreNameSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private statusTextIndices = Object.keys(this.statusTextKeys);
	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};

	constructor(private router: Router,
			private route: ActivatedRoute,
			private calculationCodesService: CalculationCodesService,
			private dialog: MatDialog,
			private onlineStoresService: OnlineStoresService,
			private currentUserService: CurrentUserService,
			private preferenceService: PreferenceService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchString = searchString;
			this.pageIndex = 0;
			this.getShippingCodes();
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
						usage: "HCL_ShippingTool",
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
			this.getShippingCodes();
		});
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
		this.storeSearchString.unsubscribe();
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this.getShippingCodes();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.pageIndex = 0;
		this.getShippingCodes();
	}

	searchShippingCodes(searchString: string) {
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
			usage: "HCL_ShippingTool",
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
			this.getShippingCodes();
			this.storeList = [];
			this.searchStores("");
		}
	}

	resetSelectedStore() {
		if (this.selectedStore) {
			this.store.setValue(this.selectedStore.identifier);
		}
	}

	createShippingCode() {
		if (this.selectedStore) {
			this.router.navigate(["shipping-codes/create-shipping-code", {
				storeId: this.selectedStore.id
			}]);
		}
	}

	refreshShippingCodes() {
		this.getShippingCodes();
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	selectStatus(statusIndex: any) {
		if (this.statusFilter !== statusIndex) {
			this.statusFilter = statusIndex;
			this.pageIndex = 0;
			this.getShippingCodes();
		}
	}

	clearStatus($event) {
		this.statusFilter = null;
		this.statusSelect.setValue(null);
		this.pageIndex = 0;
		this.getShippingCodes();
		$event.stopPropagation();
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	deleteShippingCode(shippingCode: any) {
		const { id, calculationCode } = shippingCode;
		const dialogRef = this.dialog.open(DeleteShippingCodeDialogComponent, {
			...this.dialogConfig,
			data: {
				shippingCodeId: id,
				shippingCodeName: calculationCode
			}
		});
		dialogRef.afterClosed().subscribe(data => {
			if (data && data.shippingCodeDeleted) {
				this.getShippingCodes();
			}
		});
	}

	gotoShippingCharges(row: any) {
		this.router.navigate(["/shipping-charges/shipping-charge-list", {
			shippingCodeId: row.id,
			storeId: this.selectedStore.id
		}]);
	}

	setShippingCodeStatus(id: number, status: number) {
		this.calculationCodesService.updateCalculationCodeById({
			id,
			CalculationCode: {
				published: status
			}
		}).subscribe(response => {
			this.translateService.get(status === 1 ?
					"SHIPPING_CODES.SHIPPING_CODE_ACTIVATED_MESSAGE" :
					"SHIPPING_CODES.SHIPPING_CODE_DEACTIVATED_MESSAGE").subscribe((message: string) => {
				this.alertService.success({message});
			});
			this.getShippingCodes();
		});
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
		this.store = new FormControl("");
		this.statusSelect = new FormControl(this.statusFilter);
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
			statusSelect: this.statusSelect
		});
		this.listSearchForm = new FormGroup({
			searchText: this.searchText,
			store: this.store
		});
	}

	private getShippingCodes() {
		if (this.selectedStore) {
			this.preferenceService.save(this.preferenceToken, {
				searchString: this.currentSearchString,
				sort: this.sort,
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				filter: {
					statusFilter: this.statusFilter
				}
			});
			const args: CalculationCodesService.GetCalculationCodesParams = {
				offset: this.pageIndex * this.paginator.pageSize,
				limit: this.paginator.pageSize,
				calculationUsageId: [-2],
				storeId: this.selectedStore.id
			};
			if (this.currentSearchString) {
				args.searchString = this.currentSearchString;
			}
			if (this.statusFilter) {
				args.published = this.statusFilter;
			}
			let sort = this.sort.active;
			if (this.sort.direction === "asc") {
				sort = sort;
			} else if (this.sort.direction === "desc") {
				sort = "-" + sort;
			}
			args.sort = sort;
			if (this.getShippingCodesSubscription != null) {
				this.getShippingCodesSubscription.unsubscribe();
				this.getShippingCodesSubscription = null;
			}
			this.getShippingCodesSubscription = this.calculationCodesService.
					getCalculationCodes(args).subscribe((body: any) => {
				this.getShippingCodesSubscription.unsubscribe();
				this.getShippingCodesSubscription = null;
				this.paginator.length = body.count;
				const data: ShippingCode[] = [];
				for (let i = 0; i < body.items.length; i++) {
					const item = body.items[i];
					const shippingCode: ShippingCode = {
						id: item.id,
						storeId: item.storeId,
						calculationCode: item.calculationCode,
						status: item.published
					};
					data.push(shippingCode);
				}
				this.model.setData(data);
			});
		}
	}

	private getPreferenceData() {
		this.preferenceToken = "shipping-code-list";
		const preference = this.preferenceService.get(this.preferenceToken);
		if (preference) {
			const {
				pageSize,
				sort,
				searchString,
				showFilters,
				filter,
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
			if (showFilters) {
				this.showFilters = showFilters;
			}
			if (filter) {
				const {statusFilter} = filter;
				this.statusFilter = statusFilter;
			}
			if (pageIndex) {
				this.pageIndex = pageIndex;
			}
		}
	}

	private getFirstStore() {
		this.onlineStoresService.getOnlineStores({
			usage: "HCL_ShippingTool",
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

interface ShippingCode {
	id: number;
	storeId: number;
	calculationCode: string;
	status: number;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class ShippingCodeDataSource extends DataSource<ShippingCode> {
	private shippingCodes$: Subject<ShippingCode[]> = new Subject<ShippingCode[]>();

	setData(shippingCodes: ShippingCode[]) {
		this.shippingCodes$.next(shippingCodes);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<ShippingCode[]> {
		return this.shippingCodes$.asObservable();
	}

	disconnect() {}
}
