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
import { JurisdictionsService } from "../../../../rest/services/jurisdictions.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { CurrentUserService } from "../../../../services/current-user.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import {
	DeleteShippingJurisdictionDialogComponent
} from "../delete-shipping-jurisdiction-dialog/delete-shipping-jurisdiction-dialog.component";
import { CountriesService } from "../../../../rest/services/countries.service";
import { StatesService } from "../../../../rest/services/states.service";
import { LanguageService } from "../../../../services/language.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./shipping-jurisdiction-list.component.html",
	styleUrls: ["./shipping-jurisdiction-list.component.scss"]
})
export class ShippingJurisdictionListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	listSearchForm: FormGroup;
	displayedColumns: string[] = [
		"code",
		"country",
		"state",
		"city",
		"zipcodeStart",
		"zipcodeEnd",
		"actions"
	];
	searchText: FormControl;
	country: FormControl;
	state: FormControl;
	city: FormControl;
	store: FormControl;
	storeList: Array<any> = [];
	selectedStore = null;
	showFilters = false;
	responsiveCols = 12;
	currentSearchString = null;
	filteredCountryList: Array<any> = [];
	selectedCountry: any = null;
	filteredStateList: Array<any> = [];
	selectedState: any = null;
	selectedCity: any = null;
	countriesLoading = false;
	statesLoading = false;
	model = new ShippingJurisdictionDataSource();

	@ViewChild(MatPaginator, {static: false})
	paginator: MatPaginator;
	@ViewChild(MatSort, {static: false})
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "code";
	sortDirection = "asc";
	pageIndex = 0;
	private countryList: Array<any> = [];
	private stateList: Array<any> = [];

	private getShippingJurisdictionsSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private countrySearchString: Subject<string> = new Subject<string>();
	private stateSearchString: Subject<string> = new Subject<string>();
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
			private jurisdictionsService: JurisdictionsService,
			private onlineStoresService: OnlineStoresService,
			private currentUserService: CurrentUserService,
			private countriesService: CountriesService,
			private statesService: StatesService,
			private languageService: LanguageService,
			private dialog: MatDialog,
			private preferenceService: PreferenceService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchString = searchString;
			this.pageIndex = 0;
			this.getShippingJurisdictions();
		});
		this.countrySearchString.pipe(debounceTime(250)).subscribe(searchString => {
			if (searchString !== "") {
				const searchText = searchString.toLowerCase();
				this.filteredCountryList = this.countryList.filter(element => {
					return element.name.toLowerCase().includes(searchText);
				});
				if (this.filteredCountryList.length === 1) {
					const country = this.filteredCountryList[0];
					if (country.name === this.country.value) {
						this.selectCountry(country);
					}
				}
			} else {
				this.filteredCountryList = this.countryList;
			}
			this.countriesLoading = false;
		});
		this.stateSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			if (this.stateList.length > 0) {
				if (searchString !== "") {
					const searchText = searchString.toLowerCase();
					this.filteredStateList = this.stateList.filter(element => {
						return element.name.toLowerCase().includes(searchText);
					});
					if (this.filteredStateList.length === 1) {
						const state = this.filteredStateList[0];
						if (state.name === this.state.value) {
							this.selectState(state);
						}
					}
				} else {
					this.filteredStateList = this.stateList;
				}
			} else {
				if (searchString !== "") {
					this.selectedState = {name: searchString};
				} else {
					this.selectedState = null;
				}
				this.pageIndex = 0;
				this.getShippingJurisdictions();
			}
			this.statesLoading = false;
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
			this.getShippingJurisdictions();
		});
		this.initCountryList();
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this.getShippingJurisdictions();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.pageIndex = 0;
		this.getShippingJurisdictions();
	}

	searchShippingJurisdictions(searchString: string) {
		this.searchString.next(searchString);
	}

	createShippingJurisdiction() {
		if (this.selectedStore) {
			this.router.navigate(["shipping-jurisdictions/create-shipping-jurisdiction", {storeId: this.selectedStore.id}]);
		}
	}

	refresh() {
		this.alertService.clear();
		this.getShippingJurisdictions();
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	deleteShippingJurisdiction(shippingJurisdiction: any) {
		const { id, jurisdiction } = shippingJurisdiction;
		const dialogRef = this.dialog.open(DeleteShippingJurisdictionDialogComponent, {
			...this.dialogConfig,
			data: {
				id,
				jurisdiction
			}
		});
		dialogRef.afterClosed().subscribe(data => {
			if (data && data.jurisdictionDeleted) {
				this.getShippingJurisdictions();
			}
		});
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
			this.getShippingJurisdictions();
			this.storeList = [];
			this.searchStores("");
		}
	}

	resetSelectedStore() {
		if (this.selectedStore) {
			this.store.setValue(this.selectedStore.identifier);
		}
	}

	resetCountryFilter() {
		if (this.selectedCountry) {
			this.country.setValue(this.selectedCountry.name);
		} else if (this.country.value !== "") {
			this.country.setValue("");
			this.searchCountries("");
		}
	}

	resetStateFilter() {
		if (this.stateList.length > 0) {
			if (this.selectedState) {
				this.state.setValue(this.selectedState.name);
			} else if (this.state.value !== "") {
				this.state.setValue("");
				this.searchStates("");
			}
		}
	}

	searchCountries(searchString) {
		this.countriesLoading = true;
		this.countrySearchString.next(searchString);
	}

	selectCountry(country: any) {
		if (country) {
			const countryName = country.name;
			const countryCode = country.countryAbbr;
			this.country.setValue(countryName);
			this.filteredCountryList = [];
			if (!this.selectedCountry || this.selectedCountry.countryAbbr !== countryCode) {
				this.selectedCountry = country;
				this.state.setValue("");
				this.selectedState = null;
				this.initStateList(countryCode);
				this.pageIndex = 0;
				this.getShippingJurisdictions();
			}
		}
	}

	clearCountry() {
		this.country.setValue("");
		this.selectedCountry = null;
		this.filteredCountryList = this.countryList;
		this.stateList = [];
		this.filteredStateList = [];
		this.pageIndex = 0;
		this.getShippingJurisdictions();
	}

	searchStates(searchString) {
		this.statesLoading = true;
		this.stateSearchString.next(searchString);
	}

	selectState(state: any) {
		if (state) {
			this.state.setValue(state.name);
			this.filteredStateList = [];
			this.selectedState = state;
			this.pageIndex = 0;
			this.getShippingJurisdictions();
		}
	}

	clearState() {
		this.state.setValue("");
		this.selectedState = null;
		this.filteredStateList = this.stateList;
		this.pageIndex = 0;
		this.getShippingJurisdictions();
	}

	validateCity() {
		this.selectedCity = this.city.value;
		this.pageIndex = 0;
		this.getShippingJurisdictions();
	}

	clearCity() {
		this.selectedCity = null;
		this.city.setValue("");
		this.pageIndex = 0;
		this.getShippingJurisdictions();
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
		this.city = new FormControl("");
		this.state = new FormControl(this.selectedState ? this.selectedState.name : "");
		this.country = new FormControl(this.selectedCountry ? this.selectedCountry.name : "");
		this.store = new FormControl("");
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
			country: this.country,
			state: this.state,
			city: this.city
		});
		this.listSearchForm = new FormGroup({
			store: this.store,
			searchText: this.searchText
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

	private getShippingJurisdictions() {
		this.preferenceService.save(this.preferenceToken, {
			searchString: this.currentSearchString,
			sort: this.sort,
			pageIndex: this.pageIndex,
			pageSize: this.pageSize,
			filter: {
				countryFilter: this.selectedCountry,
				stateFilter: this.selectedState,
				cityFilter: this.selectedCity
			}
		});
		const args: JurisdictionsService.GetJurisdictionsParams = {
			subclass: 1, // 1 for shipping jurisdiction and 2 for tax jurisdiction
			storeId:  this.selectedStore.id,
			offset: (this.pageIndex) * this.paginator.pageSize,
			limit: this.paginator.pageSize
		};
		if (this.currentSearchString) {
			args.searchString = this.currentSearchString;
		}
		if (this.selectedCountry) {
			args.countryAbbreviation = this.selectedCountry.countryAbbr;
			if (this.selectedState) {
				args.stateAbbreviation = this.selectedState.stateAbbr;
			}
		}
		if (this.selectedState) {
			if (this.selectedState.stateAbbr) {
				args.stateAbbreviation = this.selectedState.stateAbbr;
			} else {
				args.state = this.selectedState.name;
			}
		}
		if (this.selectedCity) {
			args.city = this.selectedCity;
		}
		let sort = this.sort.active;
		if (this.sort.direction === "asc") {
			sort = sort;
		} else if (this.sort.direction === "desc") {
			sort = "-" + sort;
		}
		args.sort = sort;
		if (this.getShippingJurisdictionsSubscription != null) {
			this.getShippingJurisdictionsSubscription.unsubscribe();
			this.getShippingJurisdictionsSubscription = null;
		}
		this.getShippingJurisdictionsSubscription = this.jurisdictionsService.
			getJurisdictions(args).subscribe((body: any) => {
			this.getShippingJurisdictionsSubscription.unsubscribe();
			this.getShippingJurisdictionsSubscription = null;
			this.paginator.length = body.count;
			const data: ShippingJurisdiction[] = [];
			for (let i = 0; i < body.items.length; i++) {
				const item = body.items[i];
				const shippingJurisdiction: ShippingJurisdiction = {
					id: item.id,
					jurisdiction: item.code,
					country: item.country,
					state: item.state,
					city: item.city,
					zipcodeStart: item.zipcodeStart,
					zipcodeEnd: item.zipcodeEnd
				};
				data.push(shippingJurisdiction);
			}
			this.model.setData(data);
		});
	}

	private getPreferenceData() {
		this.preferenceToken = "shipping-jurisdiction-list";
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
				const {countryFilter, stateFilter, cityFilter} = filter;
				if (countryFilter) {
					this.selectedCountry = countryFilter;
				}
				if (stateFilter) {
					this.selectedState = stateFilter;
				}
				if (cityFilter) {
					this.selectedCity = cityFilter;
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

	private initCountryList() {
		this.countriesLoading = true;
		this.countriesService.getCountries({
			languageId: LanguageService.languageId,
			sort: "name"
		}).subscribe(response => {
			this.countryList = response.items ? response.items.sort((a, b) => a.name.localeCompare(b.name)) : [];
			this.countriesLoading = false;
			if (this.selectedCountry == null) {
				this.searchCountries(this.country.value);
			}
		});
	}

	private initStateList(countryCode: any) {
		this.stateList = [];
		this.filteredStateList = [];
		if (countryCode != null && countryCode !== "") {
			this.statesLoading = true;
			this.statesService.getStates({
				countryAbbr: countryCode,
				languageId: LanguageService.languageId
			}).subscribe(response => {
				this.statesLoading = false;
				this.stateList = response.items;
				this.searchStates(this.state.value);
			});
		}
	}
}

interface ShippingJurisdiction {
	id: string;
	jurisdiction: string;
	country: string;
	state: string;
	city: string;
	zipcodeStart: string;
	zipcodeEnd: string;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class ShippingJurisdictionDataSource extends DataSource<ShippingJurisdiction> {
	private shippingJurisdictions$: Subject<ShippingJurisdiction[]> = new Subject<ShippingJurisdiction[]>();

	setData(shippingJurisdictions: ShippingJurisdiction[]) {
		this.shippingJurisdictions$.next(shippingJurisdictions);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<ShippingJurisdiction[]> {
		return this.shippingJurisdictions$.asObservable();
	}

	disconnect() {}
}
