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
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Subject, Subscription, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { TransportsService } from "../../../../rest/services/transports.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { StoreTransportsService } from "../../../../rest/services/store-transports.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import { TransportMainService } from "../../services/transport-main.service";

@Component({
	templateUrl: "./transport-list.component.html",
	styleUrls: ["./transport-list.component.scss"]
})
export class TransportListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	listSearchForm: FormGroup;
	searchText: FormControl;
	store: FormControl;
	status: FormControl;

	currentSearchString = null;
	showFilters = false;
	storeList: Array<any> = [];
	storeFilter = null;
	statusFilter = null;
	responsiveCols = 12;
	displayedColumns: string[] = [
		"name",
		"description",
		"status"
	];
	model = new TransportDataSource();

	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "name";
	sortDirection = "asc";
	pageIndex = 0;

	private transportKeys = {
		"Configurator": "TRANSPORTS.CONFIGURATOR",
		"ConfiguratorDesc": "TRANSPORTS.CONFIGURATOR_DESC",
		"SterlingOMS": "TRANSPORTS.STERLINGOMS",
		"SterlingOMSDesc": "TRANSPORTS.STERLINGOMS_DESC",
		"DemandTecFTP": "TRANSPORTS.DEMANDTECFTP",
		"DemandTecFTPDesc": "TRANSPORTS.DEMANDTECFTP_DESC",
		"DPExportFTP": "TRANSPORTS.DPEXPORTFTP",
		"DPExportFTPDesc": "TRANSPORTS.DPEXPORTFTP_DESC",
		"DPImportFTP": "TRANSPORTS.DPIMPORTFTP",
		"DPImportFTPDesc": "TRANSPORTS.DPIMPORTFTP_DESC",
		"JCAUBX": "TRANSPORTS.JCAUBX",
		"JCAUBXDesc": "TRANSPORTS.JCAUBX_DESC",
		"JCAWCH": "TRANSPORTS.JCAWCH",
		"JCAWCHDesc": "TRANSPORTS.JCAWCH_DESC",
		"CommerceInsightsFTP": "TRANSPORTS.COMMERCEFTP",
		"CommerceInsightsFTPDesc": "TRANSPORTS.COMMERCEFTP_DESC",
		"EMailSender": "TRANSPORTS.EMAILSENDER",
		"EMailSenderDesc": "TRANSPORTS.EMAILSENDER_DESC",
		"File": "TRANSPORTS.FILE",
		"FileDesc": "TRANSPORTS.FILE_DESC",
		"MQ": "TRANSPORTS.MQ",
		"MQDesc": "TRANSPORTS.MQ_DESC",
		"Fax": "TRANSPORTS.FAX",
		"FaxDesc": "TRANSPORTS.FAX_DESC",
		"SMSHTTP": "TRANSPORTS.SMSHTTP",
		"SMSWS": "TRANSPORTS.SMSWS",
		"SMSHTTPDesc": "TRANSPORTS.SMSHTTP_DESC",
		"SMSWSDesc": "TRANSPORTS.SMSWS_DESC",
		"WebServices(HTTP)": "TRANSPORTS.WEBSERVICES_HTTP",
		"WebServices(JMS)": "TRANSPORTS.WEBSERVICES_JMS",
		"HTTP": "TRANSPORTS.HTTP",
		"Silverpop": "TRANSPORTS.SILVERPOP",
		"SilverpopDesc": "TRANSPORTS.SILVERPOP_DESC",
		"SampleConnector": "TRANSPORTS.SAMPLE_CONNECTOR",
		"SampleJ2CConnector": "TRANSPORTS.SAMPLE_CONNECTOR_DESC",
		"DataloadSFTP": "TRANSPORTS.DATALOAD_SFTP",
		"DataloadSFTPDesc": "TRANSPORTS.DATALOAD_SFTP_DESC",
		"Success360": "TRANSPORTS.SUCCESS_360",
		"Success360Desc": "TRANSPORTS.SUCCESS_360_DESC"
	};

	private transports: Array<Transport> = [];
	private allTransports: any = null;

	private onLangChangeSubscription: Subscription = null;
	private getStoreTransportsSubscription: Subscription = null;
	private getStoresSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private storeSearchString: Subject<string> = new Subject<string>();

	constructor(private router: Router,
			private translateService: TranslateService,
			private storeTransportsService: StoreTransportsService,
			private transportsService: TransportsService,
			private preferenceService: PreferenceService,
			private onlineStoresService: OnlineStoresService,
			private transportMainService: TransportMainService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchString = searchString;
			this.pageIndex = 0;
			this.displayTransports();
		});
		this.storeSearchString.pipe(debounceTime(250)).subscribe(storeSearchString => {
			this.getStores(storeSearchString);
		});
		this.getStores("");
		this.loadTransports();
		this.onLangChangeSubscription = this.translateService.onLangChange.subscribe(() => {
			this.getStoreTransports();
		});
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(sort => {
			this.pageIndex = 0;
			this.displayTransports();
		});
		this.getStoreTransports();
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
		this.onLangChangeSubscription.unsubscribe();
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this.displayTransports();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.pageIndex = 0;
		this.displayTransports();
	}

	searchTransports(searchString: string) {
		this.searchString.next(searchString);
	}

	searchStores(searchString: string) {
		this.storeSearchString.next(searchString);
	}

	selectStore(store: any) {
		this.storeFilter = store;
		this.store.setValue(store.identifier);
		this.storeList = [];
		this.pageIndex = 0;
		this.getStoreTransports();
	}

	clearStore() {
		this.storeFilter = null;
		this.store.setValue("");
		this.getStores("");
		this.getStoreTransports();
	}

	selectStatus(status) {
		if (this.statusFilter !== status) {
			this.statusFilter = status;
			this.pageIndex = 0;
			this.displayTransports();
		}
	}

	clearStatus($event) {
		this.statusFilter = null;
		this.status.setValue(null);
		this.pageIndex = 0;
		this.displayTransports();
		$event.stopPropagation();
	}

	createTransport() {
		if (this.storeFilter !== null) {
			this.router.navigate(["transports/create-transport", {storeId: this.storeFilter.id}]);
		} else {
			this.router.navigate(["transports/create-transport", {storeId: 0}]);
		}
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	refreshTransports() {
		this.getStoreTransports();
	}

	toggleTransportActive(event, transport) {
		const active: number = (event.checked === true) ? 1 : 0;
		this.storeTransportsService.updateStoreTransportById({
			storeId: transport.storeId,
			transportId: transport.transportId,
			StoreTransport: {
				active
			}
		}).subscribe(response => {
			this.getStoreTransports();
		},
		error => {
			this.getStoreTransports();
		});
	}

	private loadTransports() {
		this.transportsService.getTransports({
			implemented: "Y"
		}).subscribe(response => {
			this.allTransports = {};
			response.items.forEach(transport => {
				this.allTransports[transport.id] = transport;
			});
			this.getStoreTransports();
		});
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
		this.store = new FormControl(this.storeFilter ? this.storeFilter.identifier : "");
		this.status = new FormControl(this.statusFilter);
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
			store: this.store,
			status: this.status
		});
		this.listSearchForm = new FormGroup({
			searchText: this.searchText
		});
	}

	private getStoreTransports() {
		if (this.allTransports) {
			if (this.getStoreTransportsSubscription != null) {
				this.getStoreTransportsSubscription.unsubscribe();
				this.getStoreTransportsSubscription = null;
			}
			const storeId = this.storeFilter ? this.storeFilter.id : 0;
			this.getStoreTransportsSubscription = this.storeTransportsService.getStoreTransports({
				storeId
			}).subscribe((body: any) => {
				this.getStoreTransportsSubscription.unsubscribe();
				this.getStoreTransportsSubscription = null;
				const data: Array<Transport> = [];
				const keys: Array<string> = [];
				body.items.forEach(storeTransport => {
					const transport = this.allTransports[storeTransport.transportId];
					if (transport) {
						const name = transport.name;
						const description = transport.description;
						data.push({
							storeId: storeTransport.storeId,
							transportId: storeTransport.transportId,
							active: storeTransport.active,
							name,
							description
						});
						if (name && this.transportKeys[name]) {
							keys.push(this.transportKeys[name]);
						}
						if (description && this.transportKeys[description]) {
							keys.push(this.transportKeys[description]);
						}
					}
				});
				if (keys.length > 0) {
					this.translateService.get(keys).subscribe(translations => {
						data.forEach(transport => {
							const name = transport.name;
							const description = transport.description;
							if (this.transportKeys[name]) {
								transport.name = translations[this.transportKeys[name]];
							}
							if (this.transportKeys[description]) {
								transport.description = translations[this.transportKeys[description]];
							}
						});
						this.transports = data;
						this.displayTransports();
					});
				} else {
					this.transports = data;
					this.displayTransports();
				}
			});
		}
	}

	private displayTransports() {
		this.preferenceService.save(this.preferenceToken, {
			searchString: this.currentSearchString,
			sort: this.sort,
			pageIndex: this.pageIndex,
			pageSize: this.pageSize,
			filter: {
				storeFilter: this.storeFilter,
				statusFilter: this.statusFilter
			}
		});
		let data = this.transports;
		if (this.currentSearchString) {
			const filterValue = this.currentSearchString.toLowerCase();
			data = data.filter(
				transport => transport.name.toLowerCase().indexOf(filterValue) >= 0 ||
						transport.description.toLowerCase().indexOf(filterValue) >= 0
			);
		}
		if (this.statusFilter !== null) {
			data = data.filter(
				transport => transport.active === this.statusFilter
			);
		}
		const sort = this.sort.active;
		data.sort((transport1, transport2) => {
			let result = 0;
			let value1: any = null;
			let value2: any = null;
			if (this.sort.direction === "desc") {
				value1 = transport2[sort];
				value2 = transport1[sort];
			} else {
				value1 = transport1[sort];
				value2 = transport2[sort];
			}
			if (typeof value1 === "string") {
				value1 = value1.toLowerCase();
			}
			if (typeof value2 === "string") {
				value2 = value2.toLowerCase();
			}
			if (value1 === null) {
				value1 = "";
			}
			if (value2 === null) {
				value2 = "";
			}
			if (value1 < value2) {
				result = -1;
			} else if (value1 > value2) {
				result = 1;
			}
			return result;
		});
		const offset = this.pageIndex * this.paginator.pageSize;
		const limit = this.paginator.pageSize;
		this.paginator.length = data.length;
		data = data.slice(offset, offset + limit);
		this.model.setData(data);
	}

	private getPreferenceData() {
		this.preferenceToken = "transport-list";
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
			if (showFilters) {
				this.showFilters = showFilters;
			}
			if (filter) {
				const {
					storeFilter = null,
					statusFilter = null
				} = filter;
				this.storeFilter = storeFilter;
				this.statusFilter = statusFilter;
			}
			if (pageIndex) {
				this.pageIndex = pageIndex;
			}
		}
	}

	private getStores(searchString: string) {
		if (this.getStoresSubscription != null) {
			this.getStoresSubscription.unsubscribe();
			this.getStoresSubscription = null;
		}
		this.getStoresSubscription = this.onlineStoresService.getOnlineStores({
			usage: "HCL_SiteAdminStoreList",
			searchString,
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
}

interface Transport {
	transportId: number;
	storeId: number;
	name: string;
	description: string;
	active: number;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class TransportDataSource extends DataSource<Transport> {
	private transports$: Subject<Transport[]> = new Subject<Transport[]>();

	setData(transports: Transport[]) {
		this.transports$.next(transports);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<Transport[]> {
		return this.transports$.asObservable();
	}

	disconnect() {}
}
