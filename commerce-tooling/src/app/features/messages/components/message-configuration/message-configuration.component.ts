/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { MessageMainService } from "../../services/message-main.service";

@Component({
	templateUrl: "./message-configuration.component.html",
	styleUrls: ["./message-configuration.component.scss"],
	selector: "hc-message-configuration"
})
export class MessageConfigurationComponent implements OnInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	configurationForm: any;
	formControls: { [key: string]: AbstractControl; };
	fields: Array<any>;

	@ViewChild("fieldInput", {static: false}) firstInput: ElementRef<HTMLInputElement>;

	private fieldTextKeys = {
		"host": "MESSAGES.CONFIGURATION_PROPERTY_HOST",
		"protocol": "MESSAGES.CONFIGURATION_PROPERTY_PROTOCOL",
		"port": "MESSAGES.CONFIGURATION_PROPERTY_PORT",
		"sendpartial": "MESSAGES.CONFIGURATION_PROPERTY_SEND_PARTIAL",
		"retryDuration": "MESSAGES.CONFIGURATION_PROPERTY_RETRY_DURATION",
		"userName": "MESSAGES.CONFIGURATION_PROPERTY_USER_NAME",
		"password": "MESSAGES.CONFIGURATION_PROPERTY_PASSWORD",
		"CC": "MESSAGES.CONFIGURATION_PROPERTY_CC",
		"BCC": "MESSAGES.CONFIGURATION_PROPERTY_BCC",
		"sender": "MESSAGES.CONFIGURATION_PROPERTY_SENDER",
		"subject": "MESSAGES.CONFIGURATION_PROPERTY_SUBJECT",
		"replyTo": "MESSAGES.CONFIGURATION_PROPERTY_REPLY_TO",
		"recipient": "MESSAGES.CONFIGURATION_PROPERTY_RECIPIENT",
		"contentType": "MESSAGES.CONFIGURATION_PROPERTY_CONTENT_TYPE",
		"location": "MESSAGES.CONFIGURATION_PROPERTY_LOCATION",
		"FileName": "MESSAGES.CONFIGURATION_PROPERTY_FILE_NAME",
		"mode": "MESSAGES.CONFIGURATION_PROPERTY_MODE",
		"factory": "MESSAGES.CONFIGURATION_PROPERTY_FACTORY",
		"inQueue": "MESSAGES.CONFIGURATION_PROPERTY_IN_QUEUE",
		"errorQueue": "MESSAGES.CONFIGURATION_PROPERTY_ERROR_QUEUE",
		"outQueue": "MESSAGES.CONFIGURATION_PROPERTY_OUT_QUEUE",
		"JMSExpiration": "MESSAGES.CONFIGURATION_PROPERTY_JMS_EXPIRATION",
		"JMSHeaderProperty": "MESSAGES.CONFIGURATION_PROPERTY_JMS_HEADER_PROPERTY",
		"input": "MESSAGES.CONFIGURATION_PROPERTY_INPUT",
		"timeOut": "MESSAGES.CONFIGURATION_PROPERTY_TIME_OUT",
		"targetService": "MESSAGES.CONFIGURATION_PROPERTY_TARGET_SERVICE",
		"transportVersion": "MESSAGES.CONFIGURATION_PROPERTY_TRANSPORT_VERSION",
		"URL": "MESSAGES.CONFIGURATION_PROPERTY_URL",
		"readTimeout": "MESSAGES.CONFIGURATION_PROPERTY_READ_TIME_OUT",
		"connectTimeout": "MESSAGES.CONFIGURATION_PROPERTY_CONNECT_TIME_OUT",
		"usePostMethod": "MESSAGES.CONFIGURATION_PROPERTY_USE_POST_METHOD",
		"Endpoint": "MESSAGES.CONFIGURATION_PROPERTY_ENDPOINT",
		"APIKey": "MESSAGES.CONFIGURATION_PROPERTY_API_KEY",
		"APIValue": "MESSAGES.CONFIGURATION_PROPERTY_API_VALUE",
		"UserNameKey": "MESSAGES.CONFIGURATION_PROPERTY_USER_NAME_KEY",
		"UserNameValue": "MESSAGES.CONFIGURATION_PROPERTY_USER_NAME_VALUE",
		"PasswordKey": "MESSAGES.CONFIGURATION_PROPERTY_PASSWORD_KEY",
		"Password": "MESSAGES.CONFIGURATION_PROPERTY_PASSWORD_VALUE",
		"RecipientDelimiter": "MESSAGES.CONFIGURATION_PROPERTY_RECIPIENT_DELIMITER",
		"RecipientKey": "MESSAGES.CONFIGURATION_PROPERTY_RECIPIENT_KEY",
		"MaxRecipients": "MESSAGES.CONFIGURATION_PROPERTY_MAX_RECIPIENTS",
		"MessageKey": "MESSAGES.CONFIGURATION_PROPERTY_MESSAGE_KEY",
		"SenderKey": "MESSAGES.CONFIGURATION_PROPERTY_SENDER_KEY",
		"SenderValue": "MESSAGES.CONFIGURATION_PROPERTY_SENDER_VALUE",
		"CharacterLimit": "MESSAGES.CONFIGURATION_PROPERTY_CHARACTER_LIMIT",
		"CustomParameters": "MESSAGES.CONFIGURATION_PROPERTY_CUSTOM_PARAMETERS",
		"recipientValue": "MESSAGES.CONFIGURATION_PROPERTY_RECIPIENT_VALUE",
		"messageValue": "MESSAGES.CONFIGURATION_PROPERTY_MESSAGE_VALUE",
		"basicAuthenticationUserName": "MESSAGES.CONFIGURATION_PROPERTY_BASIC_AUTHENTICATION_USER_NAME",
		"basicAuthenticationPassword": "MESSAGES.CONFIGURATION_PROPERTY_BASIC_AUTHENTICATION_PASSWORD",
		"errorLifeExpectancy": "MESSAGES.CONFIGURATION_PROPERTY_ERROR_LIFE_EXPECTANCY",
		"codeMapping": "MESSAGES.CONFIGURATION_PROPERTY_CODE_MAPPING",
		"configuratorURL": "MESSAGES.CONFIGURATION_PROPERTY_CONFIGURATOR_URL",
		"sterlingId": "MESSAGES.CONFIGURATION_PROPERTY_STERLING_ID",
		"sterlingPassword": "MESSAGES.CONFIGURATION_PROPERTY_STERLING_PASSWORD",
		"sterlingServerURL": "MESSAGES.CONFIGURATION_PROPERTY_STERLING_URL",
		"visualModelerId": "MESSAGES.CONFIGURATION_PROPERTY_VISUAL_MODELER_ID",
		"visualModelerPassword": "MESSAGES.CONFIGURATION_PROPERTY_VISUAL_MODELER_PASSWORD",
		"visualModelerServer": "MESSAGES.CONFIGURATION_PROPERTY_VISUAL_MODELER_SERVER",
		"ordSysHeartbeatURL": "MESSAGES.CONFIGURATION_PROPERTY_ORD_SYS_HEARTBEAT_URL",
		"invSysHeartbeatURL": "MESSAGES.CONFIGURATION_PROPERTY_INV_SYS_HEARTBEAT_URL",
		"integrationURL": "MESSAGES.CONFIGURATION_PROPERTY_INTEGRATION_URL",
		"integrationUserId": "MESSAGES.CONFIGURATION_PROPERTY_INTEGRATION_USER_ID",
		"remoteDirectory": "MESSAGES.CONFIGURATION_PROPERTY_REMOTE_DIRECTORY",
		"clientId": "MESSAGES.CONFIGURATION_PROPERTY_CLIENT_ID",
		"clientSecret": "MESSAGES.CONFIGURATION_PROPERTY_CLIENT_SECRET",
		"refreshToken": "MESSAGES.CONFIGURATION_PROPERTY_REFRESH_TOKEN",
		"transactXmlUrl": "MESSAGES.CONFIGURATION_PROPERTY_TRANSACT_XML_URL",
		"oauthUrl": "MESSAGES.CONFIGURATION_PROPERTY_OAUTH_URL",
		"campaignId": "MESSAGES.CONFIGURATION_PROPERTY_CAMPAIGN_ID",
		"UBXURL": "MESSAGES.CONFIGURATION_PROPERTY_UBX_URL",
		"EndpointAuthenticationKey": "MESSAGES.CONFIGURATION_PROPERTY_ENDPOINT_AUTHENTICATION_KEY",
		"ApplicationId": "MESSAGES.CONFIGURATION_PROPERTY_APPLICATION_ID",
		"DeploymentId": "MESSAGES.CONFIGURATION_PROPERTY_DEPLOYMENT_ID",
		"WCHTenantId": "MESSAGES.CONFIGURATION_PROPERTY_WCH_TENANT_ID",
		"WCHUserName": "MESSAGES.CONFIGURATION_PROPERTY_WCH_USER_NAME",
		"WCHPassword": "MESSAGES.CONFIGURATION_PROPERTY_WCH_PASSWORD"
	};
	private encryptedFields = new Set([
		"password",
		"Password",
		"basicAuthenticationPassword",
		"sterlingPassword",
		"visualModelerPassword",
		"EndpointAuthenticationKey",
		"WCHPassword"
	]);

	constructor(private route: ActivatedRoute,
			private messageMainService: MessageMainService) { }

	ngOnInit() {
		if (this.route.snapshot.params.archived === "true") {
			this.messageMainService.loadCurrentArchivedMessage(this.route.snapshot.params.id).subscribe(response => {
				this.createFormControls();
				this.createForm();
			});
		} else {
			this.messageMainService.loadCurrentPendingMessage(this.route.snapshot.params.id).subscribe(response => {
				this.createFormControls();
				this.createForm();
			});
		}
	}

	validateField(field, value: string) {
		if (field.connectionSpecification) {
			this.messageMainService.messageData.connectionSpecifications[field.name] = value;
		} else if (field.interactionSpecification) {
			this.messageMainService.messageData.interactionSpecifications[field.name] = value;
		}
	}

	triggerSave() {
		this.save.emit(null);
	}

	private createFormControls() {
		this.formControls = {};
		this.fields = [];
		const connectionSpecifications = this.messageMainService.messageData.connectionSpecifications;
		const interactionSpecifications = this.messageMainService.messageData.interactionSpecifications;
		if (connectionSpecifications) {
			for (const name of Object.keys(connectionSpecifications)) {
				const label = this.fieldTextKeys[name] ? this.fieldTextKeys[name] : name;
				this.fields.push({
					name: name,
					label: label,
					encrypted: this.encryptedFields.has(name),
					connectionSpecification: true
				});
				this.formControls[name] = new FormControl(connectionSpecifications[name]);
			}
		}
		if (interactionSpecifications) {
			for (const name of Object.keys(interactionSpecifications)) {
				const label = this.fieldTextKeys[name] ? this.fieldTextKeys[name] : name;
				this.fields.push({
					name: name,
					label: label,
					encrypted: this.encryptedFields.has(name),
					interactionSpecification: true
				});
				this.formControls[name] = new FormControl(interactionSpecifications[name]);
			}
		}
	}

	private createForm() {
		this.configurationForm = new FormGroup(this.formControls);
		this.step.stepControl = this.configurationForm;
		setTimeout(() => {
			this.firstInput.nativeElement.focus();
		}, 250);
	}
}

