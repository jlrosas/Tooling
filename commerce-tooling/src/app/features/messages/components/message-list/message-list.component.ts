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
import { TranslateService } from "@ngx-translate/core";
import { Subject, Subscription, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { CurrentUserService } from "../../../../services/current-user.service";
import { PendingMessagesService } from "../../../../rest/services/pending-messages.service";
import { ArchivedMessagesService } from "../../../../rest/services/archived-messages.service";
import { TransportsService } from "../../../../rest/services/transports.service";
import { AlertService } from "../../../../services/alert.service";
import { MessageMainService } from "../../services/message-main.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";

@Component({
	templateUrl: "./message-list.component.html",
	styleUrls: ["./message-list.component.scss"]
})
export class MessageListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	listSearchForm: FormGroup;
	displayedColumns: string[] = ["id", "transport", "storeId", "retries", "status", "actions"];
	searchText: FormControl;
	archivedToggle: FormControl;
	store: FormControl;
	transport: FormControl;
	statusSelect: FormControl;

	currentSearchString = null;
	storeList: Array<any> = [];
	selectedStore = null;
	transportList: Array<any> = [];
	filteredTransportList: Array<any> = [];
	selectedTransport = null;
	statusFilter = null;
	archived = false;

	responsiveCols = 12;
	showFilters = false;

	model = new MessageDataSource();

	@ViewChild(MatPaginator, {static: false})
	paginator: MatPaginator;
	@ViewChild(MatSort, {static: false})
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "id";
	sortDirection = "asc";

	private transportTextKeys = {
		"EMailSender": "MESSAGES.TRANSPORT_EMAIL",
		"File": "MESSAGES.TRANSPORT_FILE",
		"MQ": "MESSAGES.TRANSPORT_MQ",
		"Fax": "MESSAGES.TRANSPORT_FAX",
		"SampleConnector": "MESSAGES.TRANSPORT_SAMPLE_CONNECTOR",
		"DemandTecFTP": "MESSAGES.TRANSPORT_DEMAND_TEC_FTP",
		"CommerceInsightsFTP": "MESSAGES.TRANSPORT_COMMERCE_INSIGHTS_FTP",
		"HTTP": "MESSAGES.TRANSPORT_HTTP",
		"WebServices(HTTP)": "MESSAGES.TRANSPORT_WEB_SERVICES_HTTP",
		"WebServices(JMS)": "MESSAGES.TRANSPORT_WEB_SERVICES_JMS",
		"SMSHTTP": "MESSAGES.TRANSPORT_SMS_HTTP",
		"SMSWS": "MESSAGES.TRANSPORT_SMS_WS",
		"Silverpop": "MESSAGES.TRANSPORT_SILVERPOP",
		"JCAUBX": "MESSAGES.TRANSPORT_JCA_UBX",
		"Success360": "MESSAGES.TRANSPORT_SUCCESS_360",
		"JCAWCH": "MESSAGES.TRANSPORT_JCA_WCH",
		"DPExportFTP": "MESSAGES.TRANSPORT_DP_EXPORT_FTP",
		"DPImportFTP": "MESSAGES.TRANSPORT_DP_IMPORT_FTP",
		"DataloadSFTP": "MESSAGES.TRANSPORT_DATALOAD_SFTP",
		"Configurator": "MESSAGES.TRANSPORT_CONFIGURATOR",
		"SterlingOMS": "MESSAGES.TRANSPORT_STERLING_OMS"
	};
	private transportIdToTextKeyMap = {};

	private statusTextKeys = {
		"failed": "MESSAGES.STATUS_FAILED",
		"pending": "MESSAGES.STATUS_PENDING"
	};

	private statusIndices = Object.keys(this.statusTextKeys);

	private getMessagesSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private storeSearchString: Subject<string> = new Subject<string>();
	private getStoresSubscription: Subscription = null;
	private onLangChangeSubscription: Subscription = null;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private translateService: TranslateService,
			private pendingMessagesService: PendingMessagesService,
			private archivedMessagesService: ArchivedMessagesService,
			private onlineStoresService: OnlineStoresService,
			private transportsService: TransportsService,
			private currentUserService: CurrentUserService,
			private alertService: AlertService,
			private messageMainService: MessageMainService,
			private preferenceService: PreferenceService) { }

	ngOnInit() {
		this.archived = this.route.snapshot.params.archived === "true";
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchString = searchString;
			this.paginator.pageIndex = 0;
			this.preferenceService.save(this.preferenceToken, { searchString });
			this.getMessages();
		});
		this.storeSearchString.pipe(debounceTime(250)).subscribe(storeSearchString => {
			this.getStores(storeSearchString);
		});
		this.getStores("");
		this.loadTransports();
		this.onLangChangeSubscription = this.translateService.onLangChange.subscribe(() => {
			this.populateTransports();
		});
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(sort => {
			this.paginator.pageIndex = 0;
			this.preferenceService.save(this.preferenceToken, {sort: this.sort});
			this.getMessages();
		});
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
		this.storeSearchString.unsubscribe();
		if (this.onLangChangeSubscription) {
			this.onLangChangeSubscription.unsubscribe();
		}
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.preferenceService.save(this.preferenceToken, {pageSize: this.pageSize});
		this.getMessages();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.save(this.preferenceToken, { searchString: ""});
		this.getMessages();
	}

	refresh() {
		this.alertService.clear();
		this.getMessages();
	}

	searchMessages(searchString: string) {
		this.searchString.next(searchString);
	}

	toggleArchived(e: any) {
		this.archived = e.checked;
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { archivedFilter: e.checked });
		this.getMessages();
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
			usage: "HCL_SiteAdminStoreList",
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
			console.log(error);
		});
	}

	selectStore(store: any) {
		this.currentUserService.setPreferredStore(store.identifier);
		this.selectedStore = store;
		this.store.setValue(store.identifier);
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken,
			{storeFilter: store});
		this.getMessages();
	}

	clearStore() {
		this.selectedStore = null;
		this.store.setValue("");
		this.getStores("");
		this.preferenceService.saveFilter(this.preferenceToken,
			{storeFilter: null});
		this.getMessages();
	}

	searchTransports(value) {
		if (value) {
			const filterValue = value.toLowerCase();
			const newList = this.transportList.filter(
				transport => transport.content.toLowerCase().indexOf(filterValue) >= 0
			);
			this.filteredTransportList = newList;
		} else {
			this.filteredTransportList = this.transportList;
		}
	}

	selectTransport(transport: any) {
		if (this.selectedTransport !== transport) {
			this.selectedTransport = transport;
			this.transport.setValue(transport.content);
			this.preferenceService.saveFilter(this.preferenceToken, { transportFilter: transport });
			this.paginator.pageIndex = 0;
			this.getMessages();
		}
	}

	clearTransport($event) {
		this.selectedTransport = null;
		this.transport.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { transportFilter: null });
		this.getMessages();
		$event.stopPropagation();
	}

	selectStatus(status: any) {
		if (this.statusFilter !== status) {
			this.statusFilter = status;
			this.paginator.pageIndex = 0;
			this.preferenceService.saveFilter(this.preferenceToken, { statusFilter: status });
			this.getMessages();
		}
	}

	clearStatus($event) {
		this.statusFilter = null;
		this.statusSelect.setValue(null);
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { statusFilter: null });
		this.getMessages();
		$event.stopPropagation();
	}

	incrementRetries(pendingMessage) {
		this.pendingMessagesService.incrementRetries(pendingMessage.id).subscribe(response => {
			this.getMessages();
			this.translateService.get("MESSAGES.INCREMENT_RETRIES_SUCCESS_MESSAGE").subscribe((message: string) => {
				this.alertService.success({message});
			});
		});
	}

	deleteMessage(messageObject) {
		if (this.archived) {
			this.archivedMessagesService.deleteArchivedMessage(messageObject.id).subscribe(response => {
				this.getMessages();
				this.translateService.get("MESSAGES.DELETE_MESSAGE_SUCCESS_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
			});
		} else {
			this.pendingMessagesService.deletePendingMessage(messageObject.id).subscribe(response => {
				this.getMessages();
				this.translateService.get("MESSAGES.DELETE_MESSAGE_SUCCESS_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
			});
		}
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
		this.archivedToggle = new FormControl(this.archived);
		this.store = new FormControl(this.selectedStore ? this.selectedStore.identifier : "");
		this.transport = new FormControl(this.transport ? this.selectedTransport.content : "");
		this.statusSelect = new FormControl(this.statusFilter);
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
			archivedToggle: this.archivedToggle,
			store: this.store,
			transport: this.transport,
			statusSelect: this.statusSelect
		});
		this.listSearchForm = new FormGroup({
			searchText: this.searchText,
		});
	}

	private getMessages() {
		if (this.archived) {
			this.getArchivedMessages();
		} else {
			this.getPendingMessages();
		}
	}

	private loadTransports() {
		this.transportsService.getTransports({
			implemented: "Y"
		}).subscribe((result: any) => {
			const transportIdToTextKeyMap = {};
			const transportList = [];
			result.items.forEach(item => {
				transportList.push({
					id: item.id,
					name: item.name,
					content: item.name
				});
				if (this.transportTextKeys[item.name]) {
					transportIdToTextKeyMap[item.id] = this.transportTextKeys[item.name];
				} else {
					transportIdToTextKeyMap[item.id] = item.name;
				}
			});
			this.transportList = transportList;
			this.transportIdToTextKeyMap = transportIdToTextKeyMap;
			this.populateTransports();
			this.getMessages();
		});
	}

	private populateTransports() {
		const textKeys = [];
		const transportList = this.transportList;
		transportList.forEach(transport => {
			if (this.transportTextKeys[transport.name]) {
				textKeys.push(this.transportTextKeys[transport.name]);
			}
		});
		this.translateService.get(textKeys).subscribe(translations => {
			transportList.forEach(transport => {
				if (this.transportTextKeys[transport.name]) {
					transport.content = translations[this.transportTextKeys[transport.name]];
				}
			});
			transportList.sort((transport1, transport2) => {
				let result = 0;
				if (transport1 < transport2) {
					result = -1;
				} else if (transport1 > transport2) {
					result = 1;
				}
				return result;
			});
			this.transportList = transportList;
			if (this.selectedTransport) {
				this.transport.setValue(this.selectedTransport.content);
			} else {
				this.searchTransports(this.transport.value);
			}
		});
	}

	private getPendingMessages() {
		const args: PendingMessagesService.GetPendingMessagesParams = {
			offset: (this.paginator.pageIndex) * this.paginator.pageSize,
			limit: this.paginator.pageSize
		};
		if (this.selectedStore) {
			args.storeId = this.selectedStore.id;
		}
		if (this.currentSearchString) {
			args.searchString = this.currentSearchString;
		}
		if (this.selectedTransport != null) {
			args.transportId = this.selectedTransport.id;
		}
		if (this.statusFilter != null) {
			args.status = this.statusFilter;
		}
		let sort = this.sort.active;
		if (this.sort.direction === "asc") {
			sort = sort;
		} else if (this.sort.direction === "desc") {
			sort = "-" + sort;
		}
		args.sort = sort;
		if (this.getMessagesSubscription != null) {
			this.getMessagesSubscription.unsubscribe();
			this.getMessagesSubscription = null;
		}
		this.getMessagesSubscription = this.pendingMessagesService.getPendingMessages(args).subscribe((body: any) => {
			this.getMessagesSubscription.unsubscribe();
			this.getMessagesSubscription = null;
			this.paginator.length = body.count;
			const data: Message[] = [];
			for (let i = 0; i < body.items.length; i++) {
				const item = body.items[i];
				const message: Message = {
					id: item.id,
					transportTextKey: this.transportIdToTextKeyMap[item.transportId],
					storeId: item.storeId,
					retries: item.retries,
					status: item.status,
					statusTextKey: this.statusTextKeys[item.status]
				};
				data.push(message);
			}
			this.model.setData(data);
		});
	}

	private getArchivedMessages() {
		const args: ArchivedMessagesService.GetArchivedMessagesParams = {
			offset: (this.paginator.pageIndex) * this.paginator.pageSize,
			limit: this.paginator.pageSize
		};
		if (this.selectedStore) {
			args.storeId = this.selectedStore.id;
		}
		if (this.currentSearchString) {
			args.searchString = this.currentSearchString;
		}
		if (this.selectedTransport != null) {
			args.transportId = this.selectedTransport.id;
		}
		let sort = this.sort.active;
		if (this.sort.direction === "asc") {
			sort = sort;
		} else if (this.sort.direction === "desc") {
			sort = "-" + sort;
		}
		args.sort = sort;
		if (this.getMessagesSubscription != null) {
			this.getMessagesSubscription.unsubscribe();
			this.getMessagesSubscription = null;
		}
		this.getMessagesSubscription = this.archivedMessagesService.getArchivedMessages(args).subscribe((body: any) => {
			this.getMessagesSubscription.unsubscribe();
			this.getMessagesSubscription = null;
			this.paginator.length = body.count;
			const data: Message[] = [];
			for (let i = 0; i < body.items.length; i++) {
				const item = body.items[i];
				const message: Message = {
					id: item.id,
					transportTextKey: this.transportIdToTextKeyMap[item.transportId],
					storeId: item.storeId,
					status: "archived",
					statusTextKey: "MESSAGES.STATUS_ARCHIVED"
				};
				data.push(message);
			}
			this.model.setData(data);
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
				const { archivedFilter, storeFilter = null, statusFilter = null, transportFilter = null } = filter;
				if (archivedFilter) {
					this.archived = archivedFilter;
				}
				this.selectedTransport = transportFilter;
				this.selectedStore = storeFilter;
				this.statusFilter = statusFilter;
			}
			if (showFilters) {
				this.showFilters = showFilters;
			}
		}
	}
}

interface Message {
	id: string;
	transportTextKey: string;
	storeId: number;
	retries?: number;
	status?: string;
	statusTextKey: string;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class MessageDataSource extends DataSource<Message> {
	private messages$: Subject<Message[]> = new Subject<Message[]>();

	setData(messages: Message[]) {
		this.messages$.next(messages);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<Message[]> {
		return this.messages$.asObservable();
	}

	disconnect() {}
}
