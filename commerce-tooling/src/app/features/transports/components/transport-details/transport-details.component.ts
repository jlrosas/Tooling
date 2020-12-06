/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Subject, Observable, forkJoin } from "rxjs";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { debounceTime } from "rxjs/operators";
import { TransportMainService } from "../../services/transport-main.service";
import { AlertService } from "../../../../services/alert.service";
import { DataSource } from "@angular/cdk/table";
import { TransportsService } from "../../../../rest/services/transports.service";
import { StoreTransportsService } from "../../../../rest/services/store-transports.service";

@Component({
	templateUrl: "./transport-details.component.html",
	styleUrls: ["./transport-details.component.scss"],
	selector: "hc-transport-details"
})
export class TransportDetailsComponent implements OnInit, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: FormGroup | any;
	model = new TransportDataSource();
	currentSearchString = null;
	searchText: FormControl;
	transport: FormControl;

	@ViewChild("searchInput") searchInput: ElementRef<HTMLInputElement>;

	displayedColumns: string[] = [
		"select",
		"name",
		"description"
	];

	transports: Array<Transport> = null;
	selectedTransportName: string = null;
	selectedTransportDescription: string = null;

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

	private searchString: Subject<string> = new Subject<string>();

	constructor(private router: Router,
			private route: ActivatedRoute,
			private transportMainService: TransportMainService,
			private translateService: TranslateService,
			private alertService: AlertService,
			private transportsService: TransportsService,
			private storeTransportsService: StoreTransportsService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.loadSelectedTransport();
			this.transport.setValue(Number(this.route.snapshot.params.id));
		} else {
			this.loadAvailableTransports();
			this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
				this.currentSearchString = searchString;
				this.displayTransports();
			});
			if (!this.transportMainService.transportData) {
				this.transportMainService.transportData = {
					storeId: Number(this.route.snapshot.params.storeId)
				};
			} else {
				this.transport.setValue(this.transportMainService.transportData.transportId);
			}
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
		if (this.mode === "create") {
			setTimeout(() => {
				this.searchInput.nativeElement.focus();
			}, 250);
		}
	}

	next() {
		this.detailsForm.markAllAsTouched();
		this.alertService.clear();
		if (this.detailsForm.valid) {
			this.stepper.next();
		} else if (!this.transportMainService.transportData.transportId) {
			this.translateService.get("TRANSPORTS.NO_TRANSPORT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		} else {
			this.translateService.get("TRANSPORTS.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	triggerSave() {
		this.detailsForm.markAllAsTouched();
		this.save.emit(null);
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.displayTransports();
	}

	searchTransports(searchString: string) {
		this.searchString.next(searchString);
	}

	selectTransport(transportId: number) {
		this.transportMainService.transportData.transportId = transportId;
		this.transportMainService.properties = null;
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
		this.transport = new FormControl(null, Validators.required);
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			searchText: this.searchText,
			transport: this.transport
		});
	}

	private loadSelectedTransport() {
		const id = Number(this.route.snapshot.params.id);
		this.transportsService.getTransportById({id}).subscribe(transport => {
			const keys: Array<string> = [];
			const name = transport ? transport.name : "";
			const description = transport ? transport.description : "";
			const selectedTransport: Transport = {
				transportId: id,
				name,
				description
			};
			if (name && this.transportKeys[name]) {
				keys.push(this.transportKeys[name]);
			}
			if (description && this.transportKeys[description]) {
				keys.push(this.transportKeys[description]);
			}
			if (keys.length > 0) {
				this.translateService.get(keys).subscribe(translations => {
					if (this.transportKeys[selectedTransport.name]) {
						selectedTransport.name = translations[this.transportKeys[selectedTransport.name]];
					}
					if (this.transportKeys[selectedTransport.description]) {
						selectedTransport.description = translations[this.transportKeys[selectedTransport.description]];
					}
					this.selectedTransportName = selectedTransport.name;
					this.selectedTransportDescription = selectedTransport.description;
				});
			} else {
				this.selectedTransportName = selectedTransport.name;
				this.selectedTransportDescription = selectedTransport.description;
			}
		});
	}

	private loadAvailableTransports() {
		const requests = [
			this.storeTransportsService.getStoreTransports({
				storeId: Number(this.route.snapshot.params.storeId)
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
				if (!storeTransports[transport.id]) {
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
		if (this.currentSearchString) {
			const filterValue = this.currentSearchString.toLowerCase();
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
		this.model.setData(data);
	}
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
