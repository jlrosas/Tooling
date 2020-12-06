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
import { ShippingModesService } from "../../../../rest/services/shipping-modes.service";
import { ShippingModeCarriersService } from "../../../../rest/services/shipping-mode-carriers.service";
import { ShippingModeCodesService } from "../../../../rest/services/shipping-mode-codes.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { LanguageService } from "../../../../services/language.service";
import { CurrentUserService } from "../../../../services/current-user.service";
import { StoreDefaultsService } from "../../../../rest/services/store-defaults.service";
import { ShippingModeDescriptionsService } from "../../../../rest/services/shipping-mode-descriptions.service";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../../services/alert.service";
import { DeleteShippingModeDialogComponent } from "../delete-shipping-mode-dialog/delete-shipping-mode-dialog.component";

@Component({
	templateUrl: "./shipping-mode-list.component.html",
	styleUrls: ["./shipping-mode-list.component.scss"]
})
export class ShippingModeListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	listSearchForm: FormGroup;
	searchText: FormControl;
	store: FormControl;
	carrier: FormControl;
	service: FormControl;
	currentSearchString = null;
	storeList: Array<any> = [];
	selectedStore = null;
	selectedCarrier = null;
	selectedService = null;
	showFilters = false;
	responsiveCols = 12;
	displayedColumns: string[] = [
		"carrier",
		"shippingCode",
		"estimatedDeliveryTime",
		"description",
		"trackingURL",
		"default",
		"actions"
	];
	model = new ShippingModeDataSource();
	defaultShipModeId = -1;
	carrierList: Array<any> = [];
	serviceList: Array<any> = [];
	carriersLoading = false;
	servicesLoading = false;

	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "carrier";
	sortDirection = "asc";
	pageIndex = 0;

	private onLanguageChangeSubscription: Subscription = null;
	private getShippingModesSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private getStoresSubscription: Subscription = null;
	private storeSearchString: Subject<string> = new Subject<string>();
	private getStoreNameSubscription: Subscription = null;
	private carrierSearchString: Subject<string> = new Subject<string>();
	private getCarriersSubscription: Subscription = null;
	private serviceSearchString: Subject<string> = new Subject<string>();
	private getServicesSubscription: Subscription = null;
	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};

	constructor(private router: Router,
			private route: ActivatedRoute,
			private shippingModesService: ShippingModesService,
			private shippingModeCarriersService: ShippingModeCarriersService,
			private shippingModeCodesService: ShippingModeCodesService,
			private onlineStoresService: OnlineStoresService,
			private currentUserService: CurrentUserService,
			private translateService: TranslateService,
			private alertService: AlertService,
			private languageService: LanguageService,
			private storeDefaultsService: StoreDefaultsService,
			private shippingModeDescriptionsService: ShippingModeDescriptionsService,
			private dialog: MatDialog,
			private preferenceService: PreferenceService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchString = searchString;
			this.pageIndex = 0;
			this.getShippingModes();
		});
		this.storeSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getStores(searchString);
		});
		this.carrierSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			if (this.carrier.value === searchString) {
				this.getCarriers(searchString);
			} else {
				this.carriersLoading = false;
			}
		});
		this.serviceSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			if (this.service.value === searchString) {
				this.getServices(searchString);
			} else {
				this.servicesLoading = false;
			}
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
			this.getShippingModes();
		});
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.getShippingModes();
		});
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
		this.storeSearchString.unsubscribe();
		this.carrierSearchString.unsubscribe();
		this.serviceSearchString.unsubscribe();
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this.getShippingModes();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.pageIndex = 0;
		this.getShippingModes();
	}

	clearCarrierFilter() {
		if (this.selectedCarrier) {
			this.selectedCarrier = null;
			this.carrier.setValue("");
			this.pageIndex = 0;
			this.getShippingModes();
		}
	}

	clearServiceFilter() {
		if (this.selectedService) {
			this.selectedService = null;
			this.service.setValue("");
			this.pageIndex = 0;
			this.getShippingModes();
		}
	}

	refresh() {
		this.getShippingModes();
	}

	searchShippingModes(searchString: string) {
		this.searchString.next(searchString);
	}

	createShippingMode() {
		this.router.navigate(["shipping-modes/create-shipping-mode", {storeId: this.selectedStore.id}]);
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
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
			this.getShippingModes();
			this.searchCarriers(this.carrier.value);
			this.searchServices(this.service.value);
			this.storeList = [];
			this.searchStores("");
		}
	}

	resetSelectedStore() {
		if (this.selectedStore) {
			this.store.setValue(this.selectedStore.identifier);
		}
	}

	getCarriers(searchString: string) {
		if (this.selectedStore) {
			this.carriersLoading = true;
			if (this.getCarriersSubscription !== null) {
				this.getCarriersSubscription.unsubscribe();
				this.getCarriersSubscription = null;
			}
			const args: ShippingModeCarriersService.GetShippingModeCarriersParams = {
				storeId:  this.selectedStore.id,
				limit: 10
			};
			if (searchString != null && searchString.length !== 0) {
				args.searchString = searchString;
			}
			this.getCarriersSubscription = this.shippingModeCarriersService.getShippingModeCarriers(args).subscribe(response => {
				this.carrierList = response.items;
				this.carriersLoading = false;
				this.getCarriersSubscription = null;
			},
			error => {
				this.getCarriersSubscription = null;
				this.carriersLoading = false;
			});
		}
	}

	searchCarriers(value) {
		if (value === "") {
			this.clearCarrierFilter();
		}
		this.carriersLoading = true;
		this.carrierSearchString.next(value);
	}

	resetCarrierFilter() {
		if (this.selectedCarrier) {
			this.carrier.setValue(this.selectedCarrier);
		} else if (this.carrier.value !== "") {
			this.carrier.setValue("");
			this.searchCarriers("");
		}
	}

	selectCarrier(carrier: string) {
		if (carrier) {
			this.selectedCarrier = carrier;
			this.pageIndex = 0;
			this.carrier.setValue(carrier);
			this.carrierList = [];
			this.getShippingModes();
		}
	}

	getServices(searchString: string) {
		if (this.selectedStore) {
			this.servicesLoading = true;
			if (this.getServicesSubscription !== null) {
				this.getServicesSubscription.unsubscribe();
				this.getServicesSubscription = null;
			}
			const args: ShippingModeCodesService.GetShippingModeCodesParams = {
				storeId:  this.selectedStore.id,
				limit: 10
			};
			if (searchString != null && searchString.length !== 0) {
				args.searchString = searchString;
			}
			this.getServicesSubscription = this.shippingModeCodesService.getShippingModeCodes(args).subscribe(response => {
				this.serviceList = response.items;
				this.servicesLoading = false;
				this.getServicesSubscription = null;
			},
			error => {
				this.getServicesSubscription = null;
				this.servicesLoading = false;
			});
		}
	}

	searchServices(value) {
		if (value === "") {
			this.clearServiceFilter();
		}
		this.carriersLoading = true;
		this.serviceSearchString.next(value);
	}

	resetServiceFilter() {
		if (this.selectedService) {
			this.service.setValue(this.selectedService);
		} else if (this.service.value !== "") {
			this.service.setValue("");
			this.searchServices("");
		}
	}

	selectService(service: any) {
		if (service) {
			this.selectedService = service;
			this.pageIndex = 0;
			this.service.setValue(service);
			this.serviceList = [];
			this.getShippingModes();
		}
	}

	deleteShippingMode(shippingMode: any) {
		const { id, service } = shippingMode;
		const dialogRef = this.dialog.open(DeleteShippingModeDialogComponent, {
			...this.dialogConfig,
			data: {
				id,
				shippingMode: service,
				storeId: this.selectedStore.id
			}
		});
		dialogRef.afterClosed().subscribe(data => {
			if (data && data.shippingModeDeleted) {
				this.getShippingModes();
				this.searchCarriers(this.carrier.value);
				this.searchServices(this.service.value);
			}
		});
	}

	setAsDefault(shipModeId: number) {
		this.alertService.clear();
		const args: StoreDefaultsService.UpdateStoreDefaultByIdParams = {
			id:  this.selectedStore.id,
			StoreDefault: {
				shipModeId
			}
		};
		this.storeDefaultsService.updateStoreDefaultByIdResponse(args).subscribe(response => {
			this.translateService.get("SHIPPING_MODES.DEFAULT_SET_SUCCESS_MESSAGE").subscribe((message: string) => {
				this.alertService.success({message});
			});
			this.getShippingModes();
		});
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

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
		this.store = new FormControl("");
		this.carrier = new FormControl(this.selectedCarrier ? this.selectedCarrier : "");
		this.service = new FormControl(this.selectedService ? this.selectedService : "");
	}

	private createForm() {
		this.listSearchForm = new FormGroup({
			searchText: this.searchText,
			store: this.store
		});
		this.listFilterForm = new FormGroup({
			carrier: this.carrier,
			service: this.service
		});
	}

	private getShippingModes() {
		if (this.selectedStore) {
			this.preferenceService.save(this.preferenceToken, {
				searchString: this.currentSearchString,
				sort: this.sort,
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				filter: {
					carrier: this.selectedCarrier,
					service: this.selectedService
				}
			});
			this.defaultShipModeId = -1;
			this.storeDefaultsService.getStoreDefaultById({
				id: this.selectedStore.id
			}).subscribe(data => {
				this.defaultShipModeId = data.shipModeId;
			});
			const args: ShippingModesService.GetShippingModesParams = {
				storeId:  this.selectedStore.id,
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
			if (this.selectedCarrier != null) {
				args.carrier = this.selectedCarrier;
			}
			if (this.selectedService != null) {
				args.shippingCode = this.selectedService;
			}
			if (this.getShippingModesSubscription != null) {
				this.getShippingModesSubscription.unsubscribe();
				this.getShippingModesSubscription = null;
			}
			this.getShippingModesSubscription = this.shippingModesService.getShippingModes(args).subscribe((body: any) => {
				this.getShippingModesSubscription.unsubscribe();
				this.getShippingModesSubscription = null;
				this.paginator.length = body.count;
				const data: ShippingMode[] = [];
				if (body.items.length === 0) {
					this.model.setData(data);
				} else {
					const shippingModes = {};
					const shippingModeIds: any = [];
					for (let i = 0; i < body.items.length; i++) {
						const item = body.items[i];
						const shippingMode: ShippingMode = {
							id: item.id,
							carrier: item.carrier,
							service: item.shippingCode,
							trackingURL: item.trackingURL,
							estimatedDeliveryTime: "",
							description: "",
							defaultShippingMode: "",
							storeId: item.storeId
						};
						data.push(shippingMode);
						shippingModeIds.push(shippingMode.id);
						shippingModes[shippingMode.id] = shippingMode;
					}
					const getDescArgs: ShippingModeDescriptionsService.GetShippingModeDescriptionsParams = {
						languageId: LanguageService.languageId,
						shippingModeId: shippingModeIds,
						storeId: this.selectedStore.id
					};
					this.getShippingModesSubscription = this.shippingModeDescriptionsService.getShippingModeDescriptions(getDescArgs)
							.subscribe(response => {
						this.getShippingModesSubscription.unsubscribe();
						this.getShippingModesSubscription = null;
						response.items.forEach(item => {
							const shippingMode = shippingModes[item.shippingModeId];
							if (shippingMode) {
								if (item.description) {
									shippingMode.description = item.description;
								}
								if (item.field2) {
									shippingMode.estimatedDeliveryTime = item.field2;
								}
							}
						});
						this.model.setData(data);
					});
				}
			});
		}
	}

	private getPreferenceData() {
		this.preferenceToken = "shipping-mode-list";
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
				const { carrier, service } = filter;
				if (carrier) {
					this.selectedCarrier = carrier;
				}
				if (service) {
					this.selectedService = service;
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
}

interface ShippingMode {
	id: number;
	carrier: string;
	service: string;
	estimatedDeliveryTime: string;
	description: string;
	defaultShippingMode: string;
	trackingURL: string;
	storeId: number;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class ShippingModeDataSource extends DataSource<ShippingMode> {
	private shippingModes$: Subject<ShippingMode[]> = new Subject<ShippingMode[]>();

	setData(shippingModes: ShippingMode[]) {
		this.shippingModes$.next(shippingModes);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<ShippingMode[]> {
		return this.shippingModes$.asObservable();
	}

	disconnect() {}
}
