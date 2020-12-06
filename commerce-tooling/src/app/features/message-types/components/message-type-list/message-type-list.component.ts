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
import { Subject, Subscription, Observable, forkJoin } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { MatDialog } from "@angular/material";
import { MessageTypesService } from "../../../../rest/services/message-types.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { ProfilesService } from "../../../../rest/services/profiles.service";
import { StoreTransportsService } from "../../../../rest/services/store-transports.service";
import { TransportsService } from "../../../../rest/services/transports.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import { DeleteMessageTypeDialogComponent } from "../delete-message-type-dialog/delete-message-type-dialog.component";

@Component({
	templateUrl: "./message-type-list.component.html",
	styleUrls: ["./message-type-list.component.scss"]
})
export class MessageTypeListComponent implements OnInit, OnDestroy, AfterViewInit {
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
		"messageType",
		"severityRange",
		"transportName",
		"transportStatus",
		"actions"
	];

	model = new MessageTypeDataSource();

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

	private messageTypes: Array<MessageType> = [];
	private allTransports: any = null;
	private allMessageTypes: any = null;

	private onLangChangeSubscription: Subscription = null;
	private getProfilesSubscription: Subscription = null;
	private getStoresSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private storeSearchString: Subject<string> = new Subject<string>();

	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};

	private transportKeys = {
		"Configurator": "TRANSPORTS.CONFIGURATOR",
		"SterlingOMS": "TRANSPORTS.STERLINGOMS",
		"DemandTecFTP": "TRANSPORTS.DEMANDTECFTP",
		"DPExportFTP": "TRANSPORTS.DPEXPORTFTP",
		"DPImportFTP": "TRANSPORTS.DPIMPORTFTP",
		"JCAUBX": "TRANSPORTS.JCAUBX",
		"JCAWCH": "TRANSPORTS.JCAWCH",
		"CommerceInsightsFTP": "TRANSPORTS.COMMERCEFTP",
		"EMailSender": "TRANSPORTS.EMAILSENDER",
		"File": "TRANSPORTS.FILE",
		"MQ": "TRANSPORTS.MQ",
		"Fax": "TRANSPORTS.FAX",
		"SMSHTTP": "TRANSPORTS.SMSHTTP",
		"SMSWS": "TRANSPORTS.SMSWS",
		"WebServices(HTTP)": "TRANSPORTS.WEBSERVICES_HTTP",
		"WebServices(JMS)": "TRANSPORTS.WEBSERVICES_JMS",
		"HTTP": "TRANSPORTS.HTTP",
		"Silverpop": "TRANSPORTS.SILVERPOP",
		"SampleConnector": "TRANSPORTS.SAMPLE_CONNECTOR",
		"SampleJ2CConnector": "TRANSPORTS.SAMPLE_CONNECTOR_DESC",
		"DataloadSFTP": "TRANSPORTS.DATALOAD_SFTP",
		"Success360": "TRANSPORTS.SUCCESS_360"
	};
	private messageTypeKeys = {
		"ApproversNotify": "MESSAGE_TYPES.APPROVERSNOTIFY",
		"ErrorMessage": "MESSAGE_TYPES.ERRORMESSAGE",
		"OrderCreateFixFormat": "MESSAGE_TYPES.ORDERCREATEFIXFORMAT",
		"OrderCreateXMLFormat": "MESSAGE_TYPES.ORDERCREATEXMLFORMAT",
		"OrderStatusNotify": "MESSAGE_TYPES.ORDERSTATUSNOTIFY",
		"OrderAuthorized": "MESSAGE_TYPES.ORDERAUTHORIZED",
		"OrderReceived": "MESSAGE_TYPES.ORDERRECEIVED",
		"OrderRejected": "MESSAGE_TYPES.ORDERREJECTED",
		"OrderChanged": "MESSAGE_TYPES.ORDERCHANGED",
		"MerchantOrderNotify": "MESSAGE_TYPES.MERCHANTORDERNOTIFY",
		"OrderCancel": "MESSAGE_TYPES.ORDERCANCEL",
		"PasswordNotify": "MESSAGE_TYPES.PASSWORDNOTIFY",
		"BroadcastMessage": "MESSAGE_TYPES.BROADCASTMESSAGE",
		"AdminOrderComment": "MESSAGE_TYPES.ADMINORDERCOMMENT",
		"ReleaseShipNotify": "MESSAGE_TYPES.RELEASESHIPNOTIFY",
		"Invoice": "MESSAGE_TYPES.INVOICE",
		"RFQSubmitMessage": "MESSAGE_TYPES.RFQSUBMITMESSAGE",
		"RFQCloseMessage": "MESSAGE_TYPES.RFQCLOSEMESSAGE",
		"RFQCompleteMessage": "MESSAGE_TYPES.RFQCOMPLETEMESSAGE",
		"ResponseNotification": "MESSAGE_TYPES.RESPONSENOTIFICATION",
		"CollabEmail": "MESSAGE_TYPES.COLLABEMAIL",
		"PriceAndAvailabilityCheck": "MESSAGE_TYPES.PRICEANDAVAILABILITYCHECK",
		"BatchAvailability": "MESSAGE_TYPES.BATCHAVAILABILITY",
		"ShoppingCartTransfer": "MESSAGE_TYPES.SHOPPINGCARTTRANSFER",
		"CheckInventoryAvailabilityBE": "MESSAGE_TYPES.CHECKINVENTORYAVAILABILITYBE",
		"CustomerMessage": "MESSAGE_TYPES.CUSTOMERMESSAGE",
		"OrderSummaryReportNotification": "MESSAGE_TYPES.ORDERSUMMARYREPORTNOTIFICATION",
		"StoreUsageReportNotification": "MESSAGE_TYPES.STOREUSAGEREPORTNOTIFICATION",
		"ResellerRegistrationApprovedNotification": "MESSAGE_TYPES.RESELLERREGAPPROVED",
		"ResellerRegistrationRejectedNotification": "MESSAGE_TYPES.RESELLERREGREJECTED",
		"StoreCommerceReportNotification": "MESSAGE_TYPES.STORECOMMERCEREPORTNOTIFICATION",
		"SiteCommerceReportNotification": "MESSAGE_TYPES.SITECOMMERCEREPORTNOTIFICATION",
		"OrderCancelForMerchant": "MESSAGE_TYPES.ORDERCANCELFORMERCHANT",
		"CouponsSavedNotification": "MESSAGE_TYPES.COUPONSSAVEDNOTIFICATION",
		"InterestItemListMessage": "MESSAGE_TYPES.INTERESTITEMLISTMESSAGE",
		"RejectTaskNotification": "MESSAGE_TYPES.REJECTTASKNOTIFICATION",
		"ReadyToApproveTaskGroupNotification": "MESSAGE_TYPES.READYTOAPPROVETASKGROUPNOTIFICATION",
		"ActivateTaskNotification": "MESSAGE_TYPES.ACTIVATETASKNOTIFICATION",
		"MarketingMessage": "MESSAGE_TYPES.MARKETINGMESSAGE",
		"LCProfileIntegration": "MESSAGE_TYPES.LCPROFILEINTEGRATION",
		"com.ibm.commerce.order.external": "MESSAGE_TYPES.ORDEREXTERNAL",
		"com.ibm.commerce.order.external.GetOrder": "MESSAGE_TYPES.ORDEREXTERNALGETORDER",
		"com.ibm.commerce.inventory.external": "MESSAGE_TYPES.INVENTORYEXTERNAL",
		"com.ibm.commerce.price.external": "MESSAGE_TYPES.PRICEEXTERNAL",
		"UserAccountEmailActivateMessage": "MESSAGE_TYPES.USERACCOUNTEMAILACTIVATEMESSAGE"
	};

	constructor(private router: Router,
			private messageTypesService: MessageTypesService,
			private dialog: MatDialog,
			private preferenceService: PreferenceService,
			private onlineStoresService: OnlineStoresService,
			private profilesService: ProfilesService,
			private transportsService: TransportsService,
			private translateService: TranslateService,
			private storeTransportsService: StoreTransportsService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchString = searchString;
			this.paginator.pageIndex = 0;
			this.displayMessageTypes();
		});
		this.storeSearchString.pipe(debounceTime(250)).subscribe(storeSearchString => {
			this.getStores(storeSearchString);
		});
		this.getStores("");
		this.loadMessageTypesAndTransports();
		this.onLangChangeSubscription = this.translateService.onLangChange.subscribe(() => {
			this.displayMessageTypes();
		});
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(sort => {
			this.paginator.pageIndex = 0;
			this.displayMessageTypes();
		});
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
		this.onLangChangeSubscription.unsubscribe();
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this.displayMessageTypes();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.pageIndex = 0;
		this.displayMessageTypes();
	}

	searchMessageTypes(searchString: string) {
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
		this.getProfiles();
	}

	clearStore() {
		this.storeFilter = null;
		this.store.setValue("");
		this.getStores("");
		this.getProfiles();
	}

	selectStatus(status) {
		if (this.statusFilter !== status) {
			this.statusFilter = status;
			this.pageIndex = 0;
			this.displayMessageTypes();
		}
	}

	clearStatus($event) {
		this.statusFilter = null;
		this.status.setValue(null);
		this.pageIndex = 0;
		this.displayMessageTypes();
		$event.stopPropagation();
	}

	createMessageType() {
		if (this.storeFilter !== null) {
			this.router.navigate(["message-types/create-message-type", {storeId: this.storeFilter.id}]);
		} else {
			this.router.navigate(["message-types/create-message-type", {storeId: 0}]);
		}
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	refreshMessageTypes() {
		this.getProfiles();
	}

	deleteMessageType(messageType: any) {
		const { id, name } = messageType;
		const dialogRef = this.dialog.open(DeleteMessageTypeDialogComponent, {
			...this.dialogConfig,
			data: {
				profileId: id,
				messageTypeName: name
			}
		});
		dialogRef.afterClosed().subscribe(data => {
			if (data && data.messageTypeDeleted) {
				this.getProfiles();
			}
		});
	}

	private loadMessageTypesAndTransports() {
		const requests = [
			this.messageTypesService.getMessageTypes({}),
			this.transportsService.getTransports({
				implemented: "Y"
			})
		];
		forkJoin(requests).subscribe(responseList => {
			this.allMessageTypes = {};
			responseList[0].items.forEach(messageType => {
				this.allMessageTypes[messageType.id] = messageType;
			});
			this.allTransports = {};
			responseList[1].items.forEach(transport => {
				this.allTransports[transport.id] = transport;
			});
			this.getProfiles();
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

	private getProfiles() {
		if (this.allTransports && this.allMessageTypes) {
			if (this.getProfilesSubscription != null) {
				this.getProfilesSubscription.unsubscribe();
				this.getProfilesSubscription = null;
			}
			const storeId = this.storeFilter ? this.storeFilter.id : 0;
			const requests = [
				this.storeTransportsService.getStoreTransports({storeId}),
				this.profilesService.getProfiles({storeId}),
			];
			this.getProfilesSubscription = forkJoin(requests).subscribe(responseList => {
				this.getProfilesSubscription.unsubscribe();
				this.getProfilesSubscription = null;
				const allStoreTransports = {};
				responseList[0].items.forEach(storeTransport => {
					allStoreTransports[storeTransport.transportId] = storeTransport;
				});
				const data: Array<MessageType> = [];
				const keys: Array<string> = [];
				responseList[1].items.forEach(profile => {
					const transport = this.allTransports[profile.transportId];
					const storeTransport = allStoreTransports[profile.transportId];
					const messageType = this.allMessageTypes[profile.messageTypeId];
					if (transport && storeTransport && messageType && messageType.name && !messageType.name.startsWith("$")) {
						const name = messageType.name;
						const transportName = transport.name;
						data.push({
							id: profile.id,
							storeId: profile.storeId,
							name,
							severityRange: profile.lowPriority + " - " + profile.highPriority,
							transportName,
							active: storeTransport.active
						});
						if (name && this.messageTypeKeys[name]) {
							keys.push(this.messageTypeKeys[name]);
						}
						if (transportName && this.transportKeys[transportName]) {
							keys.push(this.transportKeys[transportName]);
						}
					}
				});
				if (keys.length > 0) {
					this.translateService.get(keys).subscribe(translations => {
						data.forEach(messageType => {
							const name = messageType.name;
							const transportName = messageType.transportName;
							if (this.messageTypeKeys[name]) {
								messageType.name = translations[this.messageTypeKeys[name]];
							}
							if (this.transportKeys[transportName]) {
								messageType.transportName = translations[this.transportKeys[transportName]];
							}
						});
						this.messageTypes = data;
						this.displayMessageTypes();
					});
				} else {
					this.messageTypes = data;
					this.displayMessageTypes();
				}
			});
		}
	}

	private displayMessageTypes() {
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
		let data = this.messageTypes;
		if (this.currentSearchString) {
			const filterValue = this.currentSearchString.toLowerCase();
			data = data.filter(
				messageType => messageType.name.toLowerCase().indexOf(filterValue) >= 0 ||
						messageType.transportName.toLowerCase().indexOf(filterValue) >= 0
			);
		}
		if (this.statusFilter !== null) {
			data = data.filter(
				messageType => messageType.active === this.statusFilter
			);
		}
		const sort = this.sort.active;
		data.sort((messageType1, messageType2) => {
			let result = 0;
			let value1: any = null;
			let value2: any = null;
			if (this.sort.direction === "desc") {
				value1 = messageType2[sort];
				value2 = messageType1[sort];
			} else {
				value1 = messageType1[sort];
				value2 = messageType2[sort];
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
		this.preferenceToken = "message-type-list";
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
				const { storeFilter = null, statusFilter = null } = filter;
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

interface MessageType {
	id: number;
	storeId: number;
	name: string;
	severityRange: string;
	transportName: string;
	active: number;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class MessageTypeDataSource extends DataSource<MessageType> {
	private messageTypes$: Subject<MessageType[]> = new Subject<MessageType[]>();

	setData(messageTypes: MessageType[]) {
		this.messageTypes$.next(messageTypes);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<MessageType[]> {
		return this.messageTypes$.asObservable();
	}

	disconnect() {}
}
