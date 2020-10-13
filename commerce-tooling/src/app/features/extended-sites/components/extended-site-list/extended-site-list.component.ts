/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { Subject, Subscription, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { saveAs } from "file-saver";
import { MatDialog } from "@angular/material";
import { ExtendedSiteMainService } from "../../services/extended-site-main.service";
import { ExtendedSitesService } from "../../../../rest/services/extended-sites.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { AlertService } from "../../../../services/alert.service";
import { LanguageService } from "../../../../services/language.service";
import { ApiErrorService } from "../../../../services/api-error.service";
import { CurrentUserService } from "../../../../services/current-user.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS, DATE_FORMAT_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import { DeleteExtendedSiteDialogComponent } from "../delete-extended-site-dialog/delete-extended-site-dialog.component";

@Component({
	templateUrl: "./extended-site-list.component.html",
	styleUrls: ["./extended-site-list.component.scss"]
})
export class ExtendedSiteListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	hubStore: FormControl;
	statusSelect: FormControl;
	listSearchForm: FormGroup;
	searchText: FormControl;

	currentSearchString = null;
	selectedStatus = null;
	hubStoreList: Array<any> = [];
	selectedHubStore = null;
	showFilters = false;
	responsiveCols = 12;

	model = new ExtendedSitesDataSource();

	displayedColumns: string[] = ["identifier", "name", "status", "createDate", "actions"];

	@ViewChild(MatPaginator, { static: false })
	paginator: MatPaginator;
	@ViewChild(MatSort, { static: false })
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "identifier";
	sortDirection = "asc";
	pageIndex = 0;

	@ViewChild("importFileInput", {static: false}) importFileInput: ElementRef<HTMLInputElement>;

	private searchString: Subject<string> = new Subject<string>();
	private hubStoreSearchString: Subject<string> = new Subject<string>();
	private getHubStoresSubscription: Subscription = null;
	private getExtendedSitesSubscription: Subscription = null;
	private onLangChangeSubscription: Subscription = null;

	private statusTextKeys = {
		"open": "EXTENDED_SITES.OPEN",
		"closed": "EXTENDED_SITES.CLOSED",
		"suspended": "EXTENDED_SITES.SUSPENDED",
		"deploying": "EXTENDED_SITES.DEPLOYING",
		"deployFailed": "EXTENDED_SITES.DEPLOY_FAILED"
	};
	private statusIndices = ["open", "closed", "deployFailed"];

	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};

	constructor(private router: Router,
			private translateService: TranslateService,
			private extendedSitesService: ExtendedSitesService,
			private extendedSiteMainService: ExtendedSiteMainService,
			private onlineStoresService: OnlineStoresService,
			private alertService: AlertService,
			private languageService: LanguageService,
			private apiErrorService: ApiErrorService,
			private currentUserService: CurrentUserService,
			private preferenceService: PreferenceService,
			private dialog: MatDialog) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.pageIndex = 0;
			this.currentSearchString = searchString;
			this.getExtendedSites();
		});
		this.hubStoreSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getHubStores(searchString);
		});
		this.onLangChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.getExtendedSites();
		});
	}

	ngAfterViewInit() {
		this.currentUserService.getStoreName().subscribe((storeName: string) => {
			if (storeName) {
				this.onlineStoresService.getOnlineStoresByIdentifier({
					identifier: storeName,
					usage: "HCL_ESiteTool",
					limit: 1
				}).subscribe(onlineStoreResponse => {
					const storeArray = onlineStoreResponse.items;
					for (let i = 0; i < storeArray.length; i++) {
						const store = storeArray[i];
						if (storeName === store.identifier) {
							this.selectHubStore(store);
							break;
						}
					}
					if (this.selectedHubStore === null) {
						this.getFirstHubStore();
					}
				});
			} else {
				this.getFirstHubStore();
			}
		});
		this.sort.sortChange.subscribe(sort => {
			this.pageIndex = 0;
			this.getExtendedSites();
		});
	}

	ngOnDestroy() {
		if (this.onLangChangeSubscription) {
			this.onLangChangeSubscription.unsubscribe();
		}
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
		this.pageIndex = e.pageIndex;
		this.getExtendedSites();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.pageIndex = 0;
		this.getExtendedSites();
	}

	searchExtendedSites(searchString: string) {
		this.searchString.next(searchString);
	}

	getExtendedSites() {
		if (this.selectedHubStore != null) {
			this.preferenceService.save(this.preferenceToken, {
				searchString: this.currentSearchString,
				sort: this.sort,
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				filter: {
					statusFilter: this.selectedStatus
				}
			});
			const args: ExtendedSitesService.GetExtendedSitesParams = {
				offset: this.pageIndex * this.paginator.pageSize,
				limit: this.paginator.pageSize,
				storeId: this.selectedHubStore.id
			};
			if (this.currentSearchString) {
				args.searchString = this.currentSearchString;
			}
			if (this.selectedStatus != null) {
				args.status = this.selectedStatus;
			}
			let sort = this.sort.active;
			if (this.sort.direction === "asc") {
				sort = sort;
			} else if (this.sort.direction === "desc") {
				sort = "-" + sort;
			}
			args.sort = sort;
			if (this.getExtendedSitesSubscription != null) {
				this.getExtendedSitesSubscription.unsubscribe();
				this.getExtendedSitesSubscription = null;
			}
			this.getExtendedSitesSubscription = this.extendedSitesService.
					getExtendedSites(args).subscribe((body: any) => {
				this.getExtendedSitesSubscription.unsubscribe();
				this.getExtendedSitesSubscription = null;
				this.paginator.length = body.count;
				const data: ExtendedSite[] = [];
				for (let i = 0; i < body.items.length; i++) {
					const item = body.items[i];
					const statusTextKey = this.statusTextKeys[item.status];
					const extendedSite: ExtendedSite = {
						id: item.id,
						identifier: item.identifier,
						name: item.name,
						createDate: new Intl.DateTimeFormat(LanguageService.language, DATE_FORMAT_OPTIONS).format((new Date(item.createDate))),
						status: item.status,
						statusTextKey
					};
					data.push(extendedSite);
				}
				this.model.setData(data);
			});
		}
	}

	createExtendedSite() {
		this.alertService.clear();
		this.extendedSiteMainService.clearData();
		this.router.navigate(["extended-sites/create-extended-site", {storeId: this.selectedHubStore.id}]);
	}

	importExtendedSite() {
		if (this.selectedHubStore) {
			this.alertService.clear();
			const files = this.importFileInput.nativeElement.files;
			for (let i = 0; i < files.length; i++) {
				const file: any = files[i];
				const fileName = file.name;
				const fileType = file.type;
				if (fileName.includes(".xml") && fileType === "text/xml") {
					file.text().then(text => {
						this.extendedSitesService.importExtendedSiteResponse({
							storeId: this.selectedHubStore.id,
							body: text
						}).subscribe(response => {
							this.translateService.get("EXTENDED_SITES.STORE_IMPORTED_MESSAGE").subscribe((message: string) => {
								this.alertService.success({message});
							});
							this.getExtendedSites();
						},
						importErrorResponse => {
							this.apiErrorService.handleError(importErrorResponse, errorResponse => {
								if (errorResponse.error && errorResponse.error.errors) {
									errorResponse.error.errors.forEach(error => {
										if (error.errorKey === "_ERR_CONTRACT_UNIQUE_KEY_ALREADY_EXISTS") {
											this.translateService.get("EXTENDED_SITES.DUPLICATE_EXTENDED_SITE")
													.subscribe((message: string) => {
												this.alertService.error({message});
											});
										} else {
											this.alertService.error({message: error.errorMessage});
										}
									});
									this.getExtendedSites();
								} else {
									console.log(errorResponse);
								}
							});
						});
					});
				} else  {
					this.translateService.get("EXTENDED_SITES.INVALID_XML_FILE").subscribe((message: string) => {
						this.alertService.error({message});
					});
				}
			}
		}
	}

	deleteExtendedSite(extendedSite: any) {
		const { id, name } = extendedSite;
		const dialogRef = this.dialog.open(DeleteExtendedSiteDialogComponent, {
			...this.dialogConfig,
			data: {
				id,
				name
			}
		});

		dialogRef.afterClosed().subscribe(data => {
			if (data && data.extendedSiteDeleted) {
				this.getExtendedSites();
			}
		});
	}

	exportExtendedSite(id: string) {
		this.alertService.clear();
		this.extendedSitesService.exportExtendedSiteResponse(id).subscribe(response => {
			saveAs(response.body, "storeexport_" + id + ".xml");
		});
	}

	selectStatus(status: string) {
		if (this.selectedStatus !== status) {
			this.selectedStatus = status;
			this.pageIndex = 0;
			this.getExtendedSites();
		}
	}

	clearStatus($event) {
		this.selectedStatus = null;
		this.statusSelect.setValue(null);
		this.pageIndex = 0;
		this.getExtendedSites();
		$event.stopPropagation();
	}

	getHubStores(searchString: string) {
		if (this.getHubStoresSubscription != null) {
			this.getHubStoresSubscription.unsubscribe();
			this.getHubStoresSubscription = null;
		}
		this.getHubStoresSubscription = this.onlineStoresService.getOnlineStoresByIdentifier({
			usage: "HCL_ESiteTool",
			identifier: "*" + searchString + "*",
			limit: 10
		}).subscribe(response => {
			this.getHubStoresSubscription = null;
			if (response.items.length === 1 && response.items[0].identifier === this.hubStore.value) {
				this.selectHubStore(response.items[0]);
			} else {
				response.items.sort((store1, store2) => {
					let result = 0;
					if (store1.identifier < store2.identifier) {
						result = -1;
					} else if (store1.identifier > store2.identifier) {
						result = 1;
					}
					return result;
				});
				this.hubStoreList = response.items;
			}
		},
		error => {
			this.getHubStoresSubscription = null;
		});
	}

	searchHubStores(searchString: string) {
		this.hubStoreSearchString.next(searchString);
	}

	selectHubStore(store: any) {
		const currentStoreId = this.selectedHubStore ? this.selectedHubStore.id : null;
		this.currentUserService.setPreferredStore(store.identifier);
		this.selectedHubStore = store;
		this.hubStore.setValue(store.identifier);
		if (currentStoreId !== null) {
			this.pageIndex = 0;
		}
		this.getExtendedSites();
	}

	refreshExtendedSites() {
		this.getExtendedSites();
	}

	private createFormControls() {
		this.hubStore = new FormControl("");
		this.statusSelect = new FormControl(this.selectedStatus);
		this.searchText = new FormControl(this.currentSearchString);
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
			hubStore: this.hubStore,
			statusSelect: this.statusSelect
		});
		this.listSearchForm = new FormGroup({
			searchText: this.searchText
		});
	}

	private getFirstHubStore() {
		this.onlineStoresService.getOnlineStores({
			usage: "HCL_ESiteTool",
			limit: 1
		}).subscribe(onlineStoreResponse => {
			const storeArray = onlineStoreResponse.items;
			for (let index = 0; index < storeArray.length; index++) {
				const store = storeArray[index];
				this.selectHubStore(store);
				break;
			}
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
				const {statusFilter} = filter;
				this.selectedStatus  = statusFilter;
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

interface ExtendedSite {
	id: string;
	identifier: string;
	name: string;
	createDate: string;
	status: string;
	statusTextKey: string;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class ExtendedSitesDataSource extends DataSource<ExtendedSite> {
	private extendedSites$: Subject<ExtendedSite[]> = new Subject<ExtendedSite[]>();

	setData(extendedSites: ExtendedSite[]) {
		this.extendedSites$.next(extendedSites);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<ExtendedSite[]> {
		return this.extendedSites$.asObservable();
	}

	disconnect() {}
}
