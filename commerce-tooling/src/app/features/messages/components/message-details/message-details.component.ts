/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { TransportsService } from "../../../../rest/services/transports.service";
import { MessageMainService } from "../../services/message-main.service";

@Component({
	templateUrl: "./message-details.component.html",
	styleUrls: ["./message-details.component.scss"],
	selector: "hc-message-details"
})
export class MessageDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;

	detailsForm: any;
	messageId: FormControl;
	transport: FormControl;
	content: string;

	@ViewChild("nextButton") nextButton: ElementRef<HTMLInputElement>;

	private onLangChangeSubscription: Subscription;

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

	constructor(private route: ActivatedRoute,
			private translateService: TranslateService,
			private transportsService: TransportsService,
			private messageMainService: MessageMainService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.route.snapshot.params.archived === "true") {
			this.messageMainService.loadCurrentArchivedMessage(this.route.snapshot.params.id).subscribe(response => {
				this.setValues();
			});
		} else {
			this.messageMainService.loadCurrentPendingMessage(this.route.snapshot.params.id).subscribe(response => {
				this.setValues();
			});
		}
		this.onLangChangeSubscription = this.translateService.onLangChange.subscribe(() => {
			this.populateTransport();
		});
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.nextButton.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
		if (this.onLangChangeSubscription) {
			this.onLangChangeSubscription.unsubscribe();
		}
	}

	private createFormControls() {
		this.messageId = new FormControl({value: "", disabled: true});
		this.transport = new FormControl({value: "", disabled: true});
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			messageId: this.messageId,
			transport: this.transport
		});
	}

	private setValues() {
		const messageData = this.messageMainService.messageData;
		this.messageId.setValue(messageData.id);
		this.content = messageData.content;
		this.populateTransport();
	}

	private populateTransport() {
		const messageData = this.messageMainService.messageData;
		this.transportsService.getTransportById({
			id: messageData.transportId
		}).subscribe(transport => {
			if (this.transportTextKeys[transport.name]) {
				this.translateService.get(this.transportTextKeys[transport.name]).subscribe(transportName => {
					this.transport.setValue(transportName);
				});
			} else {
				this.transport.setValue(transport.name);
			}
		});
	}
}
