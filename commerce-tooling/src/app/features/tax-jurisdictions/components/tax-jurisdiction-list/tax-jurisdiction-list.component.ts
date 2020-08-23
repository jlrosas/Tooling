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
import { DeleteTaxJurisdictionDialogComponent } from "../delete-tax-jurisdiction-dialog/delete-tax-jurisdiction-dialog.component";
import { CountriesService } from "../../../../rest/services/countries.service";
import { StatesService } from "../../../../rest/services/states.service";
import { LanguageService } from "../../../../services/language.service";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { JurisdictionGroupRelationshipsService } from "../../../../rest/services/jurisdiction-group-relationships.service";
import { TaxJurisdictionCalculationRulesService } from "../../../../rest/services/tax-jurisdiction-calculation-rules.service";
import { TaxCategoriesService } from "../../../../rest/services/tax-categories.service";
import { CalculationRulesService } from "../../../../rest/services/calculation-rules.service";

@Component({
	templateUrl: "./tax-jurisdiction-list.component.html",
	styleUrls: ["./tax-jurisdiction-list.component.scss"]
})
export class TaxJurisdictionListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	listSearchForm: FormGroup;
	displayedColumns: string[] = [
		"code",
		"country",
		"state",
		"actions"
	];
	searchText: FormControl;
	country: FormControl;
	state: FormControl;
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
	model = new TaxJurisdictionDataSource();

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
	private countryList: Array<any> = [];
	private stateList: Array<any> = [];

	private getTaxJurisdictionsSubscription: Subscription = null;
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
			private translateService: TranslateService,
			private dialog: MatDialog,
			private preferenceService: PreferenceService,
			private alertService: AlertService,
			private taxJurisdictionCalculationRulesService: TaxJurisdictionCalculationRulesService,
			private jurisdictionGroupRelationshipsService: JurisdictionGroupRelationshipsService,
			private taxCategoriesService: TaxCategoriesService,
			private calculationRulesService: CalculationRulesService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.preferenceService.save(this.preferenceToken, { searchString });
			this.currentSearchString = searchString;
			this.paginator.pageIndex = 0;
			this.getTaxJurisdictions();
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
				this.preferenceService.saveFilter(this.preferenceToken,
						{stateFilter: this.selectedState});
				this.paginator.pageIndex = 0;
				this.getTaxJurisdictions();
			}
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
			this.paginator.pageIndex = 0;
			this.preferenceService.save(this.preferenceToken, {sort: this.sort});
			this.getTaxJurisdictions();
		});
		this.initCountryList();
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.preferenceService.save(this.preferenceToken, {pageSize: this.pageSize});
		this.getTaxJurisdictions();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.save(this.preferenceToken, { searchString: ""});
		this.getTaxJurisdictions();
	}

	searchTaxJurisdictions(searchString: string) {
		this.searchString.next(searchString);
	}

	createTaxJurisdiction() {
		if (this.selectedStore) {
			this.router.navigate(["tax-jurisdictions/create-tax-jurisdiction", {storeId: this.selectedStore.id}]);
		}
	}

	refresh() {
		this.alertService.clear();
		this.getTaxJurisdictions();
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	deleteTaxJurisdiction(taxJurisdiction: any) {
		this.jurisdictionGroupRelationshipsService.getJurisdictionGroupRelationships({
			jurisdictionId: taxJurisdiction.id
		}).subscribe((body: any) => {
			const taxJurisdictionGroupRelationships = body.items;
			if (taxJurisdictionGroupRelationships.length > 0) {
				const jurisdictionGroupId = taxJurisdictionGroupRelationships[0].jurisdictionGroupId;
				this.taxJurisdictionCalculationRulesService.getTaxJurisdictionCalculationRules({
					jurisdictionGroupId: jurisdictionGroupId
				}).subscribe((taxRuleBody: any) => {
					const taxJurisdictionRules = taxRuleBody.items;
					if (taxJurisdictionRules.length > 0) {
						const jurisdictionName = taxJurisdiction.jurisdiction;
						this.translateService.get("TAX_JURISDICTIONS.JURISDICTION_BEING_USED_IN_TAX_CATEGORY", {jurisdictionName})
								.subscribe((message: string) => {
							this.alertService.error({message, clear: true});
						});
					} else {
						this.doDelete(taxJurisdiction);
					}
				});
			} else {
				this.doDelete(taxJurisdiction);
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
			usage: "HCL_TaxTool",
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
		const currentStoreId = this.selectedStore ? this.selectedStore.id : null;
		this.currentUserService.setPreferredStore(store.identifier);
		this.selectedStore = store;
		this.store.setValue(store.identifier);
		if (currentStoreId !== store.id) {
			this.paginator.pageIndex = 0;
			this.getTaxJurisdictions();
			this.storeList = [];
			this.searchStores("");
		}
	}

	resetSelectedStore() {
		if (this.selectedStore) {
			this.store.setValue(this.selectedStore.identifier);
		}
	}

	searchCountries(searchString) {
		this.countrySearchString.next(searchString);
	}

	selectCountry(country: any) {
		const countryName = country != null ? country.name : null;
		const countryCode = country != null ? country.countryAbbr : null;
		this.country.setValue(countryName);
		if (!this.selectedCountry || this.selectedCountry.countryAbbr !== country.countryAbbr) {
			this.selectedCountry = country;
			this.state.setValue("");
			this.selectedState = null;
			this.initStateList(countryCode);
			this.preferenceService.saveFilter(this.preferenceToken,
					{countryFilter: country});
			this.preferenceService.saveFilter(this.preferenceToken,
					{stateFilter: null});
			this.paginator.pageIndex = 0;
			this.getTaxJurisdictions();
		}
	}

	clearCountry() {
		this.country.setValue("");
		this.selectedCountry = null;
		this.filteredCountryList = this.countryList;
		this.stateList = [];
		this.filteredStateList = [];
		this.preferenceService.saveFilter(this.preferenceToken,
				{countryFilter: null});
		this.paginator.pageIndex = 0;
		this.getTaxJurisdictions();
	}

	searchStates(searchString) {
		this.stateSearchString.next(searchString);
	}

	selectState(state: any) {
		const stateCode = state != null ? state.stateAbbr : null;
		this.state.setValue(state ? state.name : "");
		this.selectedState = state;
		this.preferenceService.saveFilter(this.preferenceToken,
				{stateFilter: state});
		this.paginator.pageIndex = 0;
		this.getTaxJurisdictions();
	}

	clearState() {
		this.state.setValue("");
		this.selectedState = null;
		this.filteredStateList = this.stateList;
		this.preferenceService.saveFilter(this.preferenceToken,
				{stateFilter: null});
		this.paginator.pageIndex = 0;
		this.getTaxJurisdictions();
	}

	private doDelete(taxJurisdiction: any) {
		const { id, jurisdiction } = taxJurisdiction;
		const dialogRef = this.dialog.open(DeleteTaxJurisdictionDialogComponent, {
			...this.dialogConfig,
			data: {
				id,
				jurisdiction
			}
		});
		dialogRef.afterClosed().subscribe(data => {
			if (data && data.jurisdictionDeleted) {
				this.getTaxJurisdictions();
			}
		});
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
		this.state = new FormControl(this.selectedState ? this.selectedState.name : "");
		this.country = new FormControl(this.selectedCountry ? this.selectedCountry.name : "");
		this.store = new FormControl("");
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
			country: this.country,
			state: this.state
		});
		this.listSearchForm = new FormGroup({
			store: this.store,
			searchText: this.searchText
		});
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

	private getTaxJurisdictions() {
		const args: JurisdictionsService.GetJurisdictionsParams = {
			subclass: 2, // 1 for shipping jurisdiction and 2 for tax jurisdiction
			storeId:  this.selectedStore.id,
			offset: (this.paginator.pageIndex) * this.paginator.pageSize,
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
		let sort = this.sort.active;
		if (this.sort.direction === "asc") {
			sort = sort;
		} else if (this.sort.direction === "desc") {
			sort = "-" + sort;
		}
		args.sort = sort;
		if (this.getTaxJurisdictionsSubscription != null) {
			this.getTaxJurisdictionsSubscription.unsubscribe();
			this.getTaxJurisdictionsSubscription = null;
		}
		this.getTaxJurisdictionsSubscription = this.jurisdictionsService.
			getJurisdictions(args).subscribe((body: any) => {
			this.getTaxJurisdictionsSubscription.unsubscribe();
			this.getTaxJurisdictionsSubscription = null;
			this.paginator.length = body.count;
			const data: TaxJurisdiction[] = [];
			for (let i = 0; i < body.items.length; i++) {
				const item = body.items[i];
				const taxJurisdiction: TaxJurisdiction = {
					id: item.id,
					jurisdiction: item.code,
					country: item.country,
					state: item.state
				};
				data.push(taxJurisdiction);
			}
			this.model.setData(data);
		});
	}

	private getPreferenceData() {
		this.preferenceToken = "tax-jurisdiction-list";
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
				const {countryFilter, stateFilter} = filter;
				if (countryFilter) {
					this.selectedCountry = countryFilter;
				}
				if (stateFilter) {
					this.selectedState = stateFilter;
				}
			}
			if (showFilters) {
				this.showFilters = showFilters;
			}
		}
	}

	private initCountryList() {
		this.countriesService.getCountries({
			languageId: LanguageService.languageId
		}).subscribe(
			response => {
				this.countryList = response.items;
				this.searchCountries(this.country.value);
			},
			error => {
				console.log(error);
			}
		);
	}

	private initStateList(countryCode: any) {
		this.stateList = [];
		this.filteredStateList = [];
		if (countryCode != null && countryCode !== "") {
			this.statesService.getStates({
				countryAbbr: countryCode,
				languageId: LanguageService.languageId
			}).subscribe(response => {
				this.stateList = response.items;
				this.searchStates(this.state.value);
			},
			error => {
				console.log(error);
			});
		}
	}
}

interface TaxJurisdiction {
	id: string;
	jurisdiction: string;
	country: string;
	state: string;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class TaxJurisdictionDataSource extends DataSource<TaxJurisdiction> {
	private taxJurisdictions$: Subject<TaxJurisdiction[]> = new Subject<TaxJurisdiction[]>();

	setData(taxJurisdictions: TaxJurisdiction[]) {
		this.taxJurisdictions$.next(taxJurisdictions);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<TaxJurisdiction[]> {
		return this.taxJurisdictions$.asObservable();
	}

	disconnect() {}
}
