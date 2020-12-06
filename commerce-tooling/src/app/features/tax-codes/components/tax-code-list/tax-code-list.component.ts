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
import { CalculationCodesService } from "../../../../rest/services/calculation-codes.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { CurrentUserService } from "../../../../services/current-user.service";
import { DeleteTaxCodeDialogComponent } from "../delete-tax-code-dialog/delete-tax-code-dialog.component";
import { StoreEntityCalculationUsagesService } from "../../../../rest/services/store-entity-calculation-usages.service";
import { CalculationRulesService } from "../../../../rest/services/calculation-rules.service";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
	templateUrl: "./tax-code-list.component.html",
	styleUrls: ["./tax-code-list.component.scss"]
})
export class TaxCodeListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	listSearchForm: FormGroup;
	searchText: FormControl;
	store: FormControl;
	taxType:  FormControl;
	currentSearchString = null;
	storeList: Array<any> = [];
	selectedStore = null;
	showFilters = false;
	selectedTaxType = null;
	responsiveCols = 12;
	displayedColumns: string[] = [
		"calculationCode",
		"type",
		"default",
		"actions"
	];
	model = new TaxCodeDataSource();
	defaultSalesTaxCodeId = -1;
	defaultShippingTaxCodeId = -1;

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
	taxTypeTextKeys = {
		"-3": "TAX_CODES.TAX_TYPE_SALES",
		"-4": "TAX_CODES.TAX_TYPE_SHIPPING"
	};
	taxTypeTextIndicies = Object.keys(this.taxTypeTextKeys);
	pageIndex: number = null;

	private getTaxCodesSubscription: Subscription = null;
	private deleteDefaultTaxCodesSubscription: Subscription = null;
	private createDefaultTaxCodeSubscription: Subscription = null;
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
			private calculationCodesService: CalculationCodesService,
			private dialog: MatDialog,
			private preferenceService: PreferenceService,
			private onlineStoresService: OnlineStoresService,
			private currentUserService: CurrentUserService,
			private storeEntityCalculationUsagesService: StoreEntityCalculationUsagesService,
			private calculationRulesService: CalculationRulesService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchString = searchString;
			this.pageIndex = 0;
			this.getTaxCodes();
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
			this.getTaxCodes();
		});
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
		this.storeSearchString.unsubscribe();
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this.getTaxCodes();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.pageIndex = 0;
		this.getTaxCodes();
	}

	searchTaxCodes(searchString: string) {
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
			this.getTaxCodes();
			this.storeList = [];
			this.searchStores("");
		}
	}

	resetSelectedStore() {
		if (this.selectedStore) {
			this.store.setValue(this.selectedStore.identifier);
		}
	}

	createTaxCode() {
		if (this.selectedStore) {
			this.router.navigate(["tax-codes/create-tax-code", {storeId: this.selectedStore.id}]);
		}
	}

	refresh() {
		this.getTaxCodes();
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	selectTaxType(taxType: string) {
		this.selectedTaxType = taxType;
		this.pageIndex = 0;
		this.getTaxCodes();
	}

	clearTaxType($event) {
		this.selectedTaxType = null;
		this.taxType.setValue(null);
		this.pageIndex = 0;
		this.getTaxCodes();
		$event.stopPropagation();
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	deleteTaxCode(taxCode: any) {
		this.alertService.clear();
		const args: CalculationRulesService.GetCalculationRulesParams = {
			calculationCodeId: taxCode.id
		};
		this.calculationRulesService.getCalculationRules(args).subscribe((body: any) => {
			const taxRules = body.items;
			if (taxRules.length > 0) {
				const taxCodeName = taxCode.name;
				this.translateService.get("TAX_CODES.CODE_BEING_USED_IN_TAX_CATEGORY", {taxCodeName})
						.subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			} else {
				this.doDelete(taxCode);
			}
		});
	}

	setDefaultTaxCode(taxCode: any) {
		this.storeEntityCalculationUsagesService.getStoreEntityCalculationUsages({
			storeId: this.selectedStore.id,
			calculationUsageId: [taxCode.calculationUsageId]
		}).subscribe(response => {
			if (response.items.length > 0) {
				this.storeEntityCalculationUsagesService.updateStoreEntityCalculationUsageByIdResponse({
					storeId: this.selectedStore.id,
					calculationUsageId: taxCode.calculationUsageId,
					StoreEntityCalculationUsage: {
						calculationCodeId: taxCode.id
					}
				}).subscribe(response2 => {
					this.translateService.get("TAX_CODES.DEFAULT_SET_SUCCESS_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
					this.getTaxCodes();
				});
			} else {
				const args: any = {
					storeId: this.selectedStore.id,
					calculationCodeId: taxCode.id,
					calculationUsageId: taxCode.calculationUsageId,
					usageFlags: 1,
					finalizeCalculationUsageMethod: null
				};
				if (taxCode.calculationUsageId === -3) {
					args.sequence = 3.0;
					args.activeCalculationCodeCombineMethodId = -41;
					args.activeCalculationRuleCombineMethodId = -45;
					args.applyCalculationUsageMethodId = -222;
					args.summarizeCalculationUsageMethodId = -223;
					args.initializeCalculationUsageMethodId = -221;
				} else if (taxCode.calculationUsageId === -4) {
					args.sequence = 4.0;
					args.activeCalculationCodeCombineMethodId = -61;
					args.activeCalculationRuleCombineMethodId = -65;
					args.applyCalculationUsageMethodId = -232;
					args.summarizeCalculationUsageMethodId = -233;
					args.initializeCalculationUsageMethodId = -231;
				}
				this.storeEntityCalculationUsagesService.createStoreEntityCalculationUsage(args).subscribe(response2 => {
					this.translateService.get("TAX_CODES.DEFAULT_SET_SUCCESS_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
					this.getTaxCodes();
				});
			}
		});
	}

	private doDelete(taxCode: any) {
		const isDefaultSalesTaxCode = taxCode.id === this.defaultSalesTaxCodeId;
		const isDefaultShippingTaxCode = taxCode.id === this.defaultShippingTaxCodeId;
		const { id, name } = taxCode;
		const dialogRef = this.dialog.open(DeleteTaxCodeDialogComponent, {
			...this.dialogConfig,
			data: {
				id,
				name,
				isDefaultSalesTaxCode,
				isDefaultShippingTaxCode
			}
		});
		dialogRef.afterClosed().subscribe(data => {
			if (data && data.taxCodeDeleted) {
				this.getTaxCodes();
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
			searchText: this.searchText,
			store: this.store
		});
	}

	private getTaxCodes() {
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
			this.storeEntityCalculationUsagesService.getStoreEntityCalculationUsages({
				storeId: this.selectedStore.id,
				calculationUsageId: [-3, -4]
			}).subscribe(response => {
				response.items.forEach(item => {
					if (item.calculationUsageId === -3) {
						this.defaultSalesTaxCodeId = item.calculationCodeId;
					} else if (item.calculationUsageId === -4) {
						this.defaultShippingTaxCodeId = item.calculationCodeId;
					}
				});
			});
			const args: CalculationCodesService.GetCalculationCodesParams = {
				offset: this.pageIndex * this.paginator.pageSize,
				limit: this.paginator.pageSize,
				calculationUsageId: [-3, -4],
				storeId: this.selectedStore.id
			};
			if (this.currentSearchString) {
				args.searchString = this.currentSearchString;
			}
			if (this.selectedTaxType) {
				args.calculationUsageId = [Number(this.selectedTaxType)];
			}
			let sort = this.sort.active;
			if (this.sort.direction === "asc") {
				sort = sort;
			} else if (this.sort.direction === "desc") {
				sort = "-" + sort;
			}
			args.sort = sort;
			if (this.getTaxCodesSubscription != null) {
				this.getTaxCodesSubscription.unsubscribe();
				this.getTaxCodesSubscription = null;
			}
			this.getTaxCodesSubscription = this.calculationCodesService.getCalculationCodes(args).subscribe((body: any) => {
				this.getTaxCodesSubscription.unsubscribe();
				this.getTaxCodesSubscription = null;
				this.paginator.length = body.count;
				const data: TaxCode[] = [];
				for (let i = 0; i < body.items.length; i++) {
					const item = body.items[i];
					const taxTypeTextKey = this.taxTypeTextKeys[item.calculationUsageId];
					const taxCode: TaxCode = {
						id: item.id,
						name: item.calculationCode,
						type: taxTypeTextKey ? taxTypeTextKey : item.calculationUsageId,
						calculationUsageId: item.calculationUsageId
					};
					data.push(taxCode);
				}
				this.model.setData(data);
			});
		}
	}

	private getPreferenceData() {
		this.preferenceToken = "tax-code-list";
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
				const { taxTypeFilter } = filter;
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

interface TaxCode {
	id: number;
	name: string;
	type: string;
	calculationUsageId: number;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class TaxCodeDataSource extends DataSource<TaxCode> {
	private taxCodes$: Subject<TaxCode[]> = new Subject<TaxCode[]>();

	setData(taxCodes: TaxCode[]) {
		this.taxCodes$.next(taxCodes);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<TaxCode[]> {
		return this.taxCodes$.asObservable();
	}

	disconnect() {}
}
