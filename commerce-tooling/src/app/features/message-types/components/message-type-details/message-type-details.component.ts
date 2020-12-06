/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, Validators, FormControl, ValidationErrors } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Subscription, Subject, Observer, Observable, forkJoin } from "rxjs";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { debounceTime } from "rxjs/operators";
import { MessageTypeMainService } from "../../services/message-type-main.service";
import { AlertService } from "../../../../services/alert.service";
import { DataSource } from "@angular/cdk/table";
import { MessageTypesService } from "../../../../rest/services/message-types.service";
import { TransportsService } from "../../../../rest/services/transports.service";
import { StoreTransportsService } from "../../../../rest/services/store-transports.service";
import { DeviceFormatsService } from "../../../../rest/services/device-formats.service";
import { ProfilesService } from "../../../../rest/services/profiles.service";

@Component({
	templateUrl: "./message-type-details.component.html",
	styleUrls: ["./message-type-details.component.scss"],
	selector: "hc-message-type-details"
})
export class MessageTypeDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: FormGroup | any;
	messageTypeModel = new MessageTypeDataSource();
	currentMessageTypeSearchString = null;
	transportModel = new TransportDataSource();
	currentTransportSearchString = null;
	messageTypeSearchText: FormControl;
	messageType: FormControl;
	minimumSeverity: FormControl;
	maximumSeverity: FormControl;
	transportSearchText: FormControl;
	transport: FormControl;
	deviceFormat: FormControl;
	archiveMessage: FormControl;

	@ViewChild("messageTypeSearchInput") messageTypeSearchInput: ElementRef<HTMLInputElement>;
	@ViewChild("minimumSeverityInput") minimumSeverityInput: ElementRef<HTMLInputElement>;

	messageTypeDisplayedColumns: string[] = [
		"select",
		"name"
	];
	transportDisplayedColumns: string[] = [
		"select",
		"name",
		"description"
	];
	deviceFormats: Array<DeviceFormat> = [];
	selectedMessageTypeName: string = null;

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
	private deviceFormatKeys = {
		"webservices": "MESSAGE_TYPES.DEVICE_FORMAT_WEBSERVICES",
		"TransactXML": "MESSAGE_TYPES.DEVICE_FORMAT_TRANSACT_XML",
		"BROWSER": "MESSAGE_TYPES.DEVICE_FORMAT_BROWSER",
		"I_MODE": "MESSAGE_TYPES.DEVICE_FORMAT_I_MODE",
		"E-mail": "MESSAGE_TYPES.DEVICE_FORMAT_E-MAIL",
		"MQXML": "MESSAGE_TYPES.DEVICE_FORMAT_MQXML",
		"MQNC": "MESSAGE_TYPES.DEVICE_FORMAT_MQNC",
		"SMS": "MESSAGE_TYPES.DEVICE_FORMAT_SMS",
		"AlertPortlet": "MESSAGE_TYPES.DEVICE_FORMAT_ALERT_PORTLET",
		"mobile": "MESSAGE_TYPES.DEVICE_FORMAT_MOBILE"
	};

	private messageTypeSearchString: Subject<string> = new Subject<string>();
	private transportSearchString: Subject<string> = new Subject<string>();
	private messageTypes: Array<MessageType> = [];
	private transports: Array<Transport> = [];
	private getProfileSubscription: Subscription = null;
	private matchingProfile$: Subject<any> = new Subject<any>();
	private statusChangesSubscription: Subscription = null;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private messageTypeMainService: MessageTypeMainService,
			private translateService: TranslateService,
			private alertService: AlertService,
			private messageTypesService: MessageTypesService,
			private transportsService: TransportsService,
			private storeTransportsService: StoreTransportsService,
			private deviceFormatsService: DeviceFormatsService,
			private profilesService: ProfilesService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.messageTypeMainService.loadCurrentProfile(Number(this.route.snapshot.params.id)).subscribe(response => {
				this.setValues();
				this.loadSelectedMessageType();
			});
		} else {
			this.loadAvailableMessageTypes();
			this.messageTypeSearchString.pipe(debounceTime(250)).subscribe(searchString => {
				this.currentMessageTypeSearchString = searchString;
				this.displayMessageTypes();
			});
			this.setValues();
		}
		this.loadTransports();
		this.loadDeviceFormats();
		this.transportSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentTransportSearchString = searchString;
			this.displayTransports();
		});
	}

	ngOnDestroy() {
		if (this.getProfileSubscription) {
			this.getProfileSubscription.unsubscribe();
		}
		if (this.statusChangesSubscription) {
			this.statusChangesSubscription.unsubscribe();
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
		if (this.mode === "create") {
			setTimeout(() => {
				this.messageTypeSearchInput.nativeElement.focus();
			}, 250);
		} else {
			setTimeout(() => {
				this.minimumSeverityInput.nativeElement.focus();
			}, 250);
		}
	}

	next() {
		if (this.statusChangesSubscription) {
			this.statusChangesSubscription.unsubscribe();
			this.statusChangesSubscription = null;
		}
		this.detailsForm.markAllAsTouched();
		this.alertService.clear();
		if (this.detailsForm.pending) {
			this.statusChangesSubscription = this.detailsForm.statusChanges.subscribe(statusChange => {
				this.statusChangesSubscription.unsubscribe();
				this.next();
			});
		} else if (this.detailsForm.valid) {
			this.stepper.next();
		} else if (this.detailsForm.errors && this.detailsForm.errors.duplicateProfile) {
			this.translateService.get("MESSAGE_TYPES.DUPLICATE_PROFILE").subscribe((message: string) => {
				this.alertService.error({message});
			});
		} else {
			this.translateService.get("MESSAGE_TYPES.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	triggerSave() {
		this.detailsForm.markAllAsTouched();
		this.save.emit(null);
	}

	clearMessageTypeSearch() {
		this.currentMessageTypeSearchString = null;
		this.messageTypeSearchText.setValue("");
		this.displayMessageTypes();
	}

	searchMessageTypes(searchString: string) {
		this.messageTypeSearchString.next(searchString);
	}

	selectMessageType(messageTypeId: number) {
		this.messageTypeMainService.messageTypeData.messageTypeId = messageTypeId;
	}

	validateMinimumSeverity() {
		if (this.messageTypeMainService.messageTypeData) {
			this.messageTypeMainService.messageTypeData.lowPriority = Number(this.minimumSeverity.value);
		}
	}

	validateMaximumSeverity() {
		if (this.messageTypeMainService.messageTypeData) {
			this.messageTypeMainService.messageTypeData.highPriority = Number(this.maximumSeverity.value);
		}
	}

	clearTransportSearch() {
		this.currentTransportSearchString = null;
		this.transportSearchText.setValue("");
		this.displayTransports();
	}

	searchTransports(searchString: string) {
		this.transportSearchString.next(searchString);
	}

	selectTransport(transportId: number) {
		this.messageTypeMainService.messageTypeData.transportId = transportId;
		this.messageTypeMainService.connectionSpecProperties = null;
		this.messageTypeMainService.interactionSpecProperties = null;
	}

	selectDeviceFormat(deviceFormatId: number) {
		if (this.messageTypeMainService.messageTypeData) {
			this.messageTypeMainService.messageTypeData.deviceFormatId = deviceFormatId;
		}
	}

	validateArchiveMessage() {
		if (this.messageTypeMainService.messageTypeData) {
			this.messageTypeMainService.messageTypeData.archive = this.archiveMessage.value ? 1 : 0;
		}
	}

	private setValues() {
		if (!this.messageTypeMainService.messageTypeData) {
			this.messageTypeMainService.messageTypeData = {
				storeId: Number(this.route.snapshot.params.storeId),
				lowPriority: 0,
				highPriority: 0,
				archive: 0
			};
		}
		const data = this.messageTypeMainService.messageTypeData;
		this.messageType.setValue(data.messageTypeId ? data.messageTypeId : null);
		this.minimumSeverity.setValue(data.lowPriority);
		this.maximumSeverity.setValue(data.highPriority);
		this.transport.setValue(data.transportId ? data.transportId : null);
		this.deviceFormat.setValue(data.deviceFormatId ? data.deviceFormatId : null);
		this.archiveMessage.setValue(data.archive === 1 ? true : false);
	}

	private createFormControls() {
		this.messageTypeSearchText = new FormControl(this.currentMessageTypeSearchString);
		this.messageType = new FormControl(null, Validators.required);
		this.minimumSeverity = new FormControl("", [Validators.required, Validators.min(0), control => {
			const value = Number(control.value);
			const data = this.messageTypeMainService.messageTypeData;
			let errors = null;
			if (data && !isNaN(value) && !isNaN(data.lowPriority) && value > data.highPriority) {
				errors = {
					invalidMinimumSeverity: true
				};
			}
			if (this.maximumSeverity &&
					(this.maximumSeverity.errors && this.maximumSeverity.errors.invalidMaximumSeverity && errors === null ||
					errors !== null && (!this.maximumSeverity.errors || !this.maximumSeverity.errors.invalidMaximumSeverity))) {
				this.maximumSeverity.updateValueAndValidity();
			}
			return errors;
		}]);
		this.maximumSeverity = new FormControl("", [Validators.required, Validators.min(0), control => {
			const value = Number(control.value);
			const data = this.messageTypeMainService.messageTypeData;
			let errors = null;
			if (data && !isNaN(value) && !isNaN(data.highPriority) && value < data.lowPriority) {
				errors = {
					invalidMaximumSeverity: true
				};
			}
			if (this.minimumSeverity &&
					(this.minimumSeverity.errors && this.minimumSeverity.errors.invalidMinimumSeverity && errors === null ||
					errors !== null && (!this.minimumSeverity.errors || !this.minimumSeverity.errors.invalidMinimumSeverity))) {
				this.minimumSeverity.updateValueAndValidity();
			}
			return errors;
		}]);
		this.transportSearchText = new FormControl(this.currentTransportSearchString);
		this.transport = new FormControl(null, Validators.required);
		this.deviceFormat = new FormControl(null, Validators.required);
		this.archiveMessage = new FormControl(false);
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			messageTypeSearchText: this.messageTypeSearchText,
			messageType: this.messageType,
			minimumSeverity: this.minimumSeverity,
			maximumSeverity: this.maximumSeverity,
			transportSearchText: this.transportSearchText,
			transport: this.transport,
			deviceFormat: this.deviceFormat,
			archiveMessage: this.archiveMessage
		}, null, form => {
			return new Observable<ValidationErrors | null>((observer: Observer<ValidationErrors | null>) => {
				const data = this.messageTypeMainService.messageTypeData;
				const transportId = data ? data.transportId : null;
				const messageTypeId = data ? data.messageTypeId : null;
				if (!messageTypeId || !transportId) {
					observer.next(null);
					observer.complete();
				} else {
					this.matchingProfile$.subscribe((matchingProfile: any) => {
						let errors = null;
						if (matchingProfile) {
							const currentProfileId = this.messageTypeMainService.currentProfileId;
							const id = matchingProfile.id;
							if (currentProfileId !== id) {
								errors = {
									duplicateProfile: true
								};
							}
						}
						observer.next(errors);
						observer.complete();
					});
					this.getProfile(messageTypeId, transportId);
				}
			});
		});
	}

	private loadSelectedMessageType() {
		this.messageTypesService.getMessageTypeById({
			id: this.messageTypeMainService.messageTypeData.messageTypeId
		}).subscribe(messageType => {
			const keys: Array<string> = [];
			const name = messageType.name;
			const selectedMessageType = {
				messageTypeId: messageType.id,
				name
			};
			if (name && this.messageTypeKeys[name]) {
				keys.push(this.messageTypeKeys[name]);
			}
			if (keys.length > 0) {
				this.translateService.get(keys).subscribe(translations => {
					if (this.messageTypeKeys[selectedMessageType.name]) {
						selectedMessageType.name = translations[this.messageTypeKeys[selectedMessageType.name]];
					}
					this.selectedMessageTypeName = selectedMessageType.name;
				});
			} else {
				this.selectedMessageTypeName = selectedMessageType.name;
			}
		});
	}

	private loadAvailableMessageTypes() {
		this.messageTypesService.getMessageTypes({}).subscribe(body => {
			const data: Array<MessageType> = [];
			const keys: Array<string> = [];
			body.items.forEach(messageType => {
				const name = messageType.name;
				if (messageType.name && !messageType.name.startsWith("$")) {
					data.push({
						messageTypeId: messageType.id,
						name
					});
					if (name && this.messageTypeKeys[name]) {
						keys.push(this.messageTypeKeys[name]);
					}
				}
			});
			if (keys.length > 0) {
				this.translateService.get(keys).subscribe(translations => {
					data.forEach(messageType => {
						const name = messageType.name;
						if (this.messageTypeKeys[name]) {
							messageType.name = translations[this.messageTypeKeys[name]];
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

	private displayMessageTypes() {
		let data = this.messageTypes;
		if (this.currentMessageTypeSearchString) {
			const filterValue = this.currentMessageTypeSearchString.toLowerCase();
			data = data.filter(
				messageType => messageType.name.toLowerCase().indexOf(filterValue) >= 0
			);
		}
		data.sort((messageType1, messageType2) => {
			let result = 0;
			const value1 = messageType1.name.toLowerCase();
			const value2 = messageType2.name.toLowerCase();
			if (value1 < value2) {
				result = -1;
			} else if (value1 > value2) {
				result = 1;
			}
			return result;
		});
		this.messageTypeModel.setData(data);
	}

	private loadTransports() {
		const requests = [
			this.storeTransportsService.getStoreTransports({
				storeId: Number(this.route.snapshot.params.storeId),
				active: 1
			}),
			this.transportsService.getTransports({
				implemented: "Y"
			})
		];
		forkJoin(requests).subscribe(responseList => {
			const storeTransports = {};
			responseList[0].items.forEach(storeTransport => {
				storeTransports[storeTransport.transportId] = storeTransport;
			});
			const data: Array<Transport> = [];
			const keys: Array<string> = [];
			responseList[1].items.forEach(transport => {
				if (storeTransports[transport.id]) {
					const name = transport ? transport.name : "";
					const description = transport ? transport.description : "";
					data.push({
						transportId: transport.id,
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

	private displayTransports() {
		let data = this.transports;
		if (this.currentTransportSearchString) {
			const filterValue = this.currentTransportSearchString.toLowerCase();
			data = data.filter(
				transport => transport.name.toLowerCase().indexOf(filterValue) >= 0 ||
						transport.description.toLowerCase().indexOf(filterValue) >= 0
			);
		}
		data.sort((transport1, transport2) => {
			let result = 0;
			const value1 = transport1.name.toLowerCase();
			const value2 = transport2.name.toLowerCase();
			if (value1 < value2) {
				result = -1;
			} else if (value1 > value2) {
				result = 1;
			}
			return result;
		});
		this.transportModel.setData(data);
	}

	private loadDeviceFormats() {
		this.deviceFormatsService.getDeviceFormats({}).subscribe(body => {
			const data: Array<DeviceFormat> = [];
			const keys: Array<string> = [];
			body.items.forEach(deviceFormat => {
				const name = deviceFormat.name;
				const deviceTypeId = deviceFormat.deviceTypeId;
				data.push({
					deviceFormatId: deviceFormat.id,
					name,
					deviceTypeId
				});
				if (deviceTypeId && this.deviceFormatKeys[deviceTypeId]) {
					keys.push(this.deviceFormatKeys[deviceTypeId]);
				}
			});
			this.translateService.get(keys).subscribe(translations => {
				data.forEach(element => {
					if (this.deviceFormatKeys[element.deviceTypeId]) {
						element.name = translations[this.deviceFormatKeys[element.deviceTypeId]];
					}
				});
				data.sort((deviceFormat1, deviceFormat2) => {
					let result = 0;
					const value1 = deviceFormat1.name.toLowerCase();
					const value2 = deviceFormat2.name.toLowerCase();
					if (value1 < value2) {
						result = -1;
					} else if (value1 > value2) {
						result = 1;
					}
					return result;
				});
				this.deviceFormats = data;
			});
		});
	}

	private getProfile(messageTypeId: number, transportId: number) {
		if (this.getProfileSubscription != null) {
			this.getProfileSubscription.unsubscribe();
			this.getProfileSubscription = null;
		}
		this.getProfileSubscription = this.profilesService.getProfiles({
			storeId: Number(this.route.snapshot.params.storeId),
			messageTypeId,
			transportId
		}).subscribe((body: any) => {
			this.getProfileSubscription.unsubscribe();
			this.getProfileSubscription = null;
			this.matchingProfile$.next(body.items.length === 1 ? body.items[0] : null);
		});
	}
}

interface MessageType {
	messageTypeId: number;
	name: string;
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

interface Transport {
	transportId: number;
	name: string;
	description: string;
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

interface DeviceFormat {
	deviceFormatId: number;
	name: string;
	deviceTypeId: string;
}
