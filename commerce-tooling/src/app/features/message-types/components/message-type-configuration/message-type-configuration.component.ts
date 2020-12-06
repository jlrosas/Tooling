/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { MatStep } from "@angular/material/stepper";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription, forkJoin } from "rxjs";
import { MessageTypeMainService } from "../../services/message-type-main.service";
import { TransportsService } from "../../../../rest/services/transports.service";
import { ConnectionSpecsService } from "../../../../rest/services/connection-specs.service";

@Component({
	selector: "hc-message-type-configuration",
	templateUrl: "./message-type-configuration.component.html",
	styleUrls: ["./message-type-configuration.component.scss"]
})
export class MessageTypeConfigurationComponent implements AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	configurationForm: FormGroup | any;
	formControls: { [key: string]: AbstractControl; };
	fields: Array<any>;

	@ViewChild("fieldInput") firstInput: ElementRef<HTMLInputElement>;

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

	constructor(private route: ActivatedRoute,
			private messageTypeMainService: MessageTypeMainService,
			private transportsService: TransportsService,
			private connectionSpecsService: ConnectionSpecsService) { }

	ngAfterViewInit() {
		const transportId = this.messageTypeMainService.messageTypeData ? this.messageTypeMainService.messageTypeData.transportId : null;
		const storeId = Number(this.route.snapshot.params.storeId);
		if (transportId) {
			const requests = [
				this.transportsService.getConnectionSpecMetaInfo(transportId),
				this.connectionSpecsService.getTransportConnectionSpecs({
					transportId,
					storeId
				}),
				this.transportsService.getInteractionSpecMetaInfo(transportId)
			];
			forkJoin(requests).subscribe((responseList: Array<any>) => {
				const connectionSpecMetaInfo = responseList[0];
				responseList[1].properties.forEach(storeProperty => {
					if (storeProperty.value) {
						for (let i = 0; i < connectionSpecMetaInfo.properties.length; i++) {
							if (storeProperty.name === connectionSpecMetaInfo.properties[i].name) {
								connectionSpecMetaInfo.properties[i].value = storeProperty.value;
							}
						}
					}
				});
				const interactionSpecMetaInfo = responseList[2];
				this.createFormControls(connectionSpecMetaInfo.properties, interactionSpecMetaInfo.properties);
				this.createForm();
				if (this.mode === "edit") {
					this.messageTypeMainService.loadCurrentMessageTypeProperties(Number(this.route.snapshot.params.id))
							.subscribe(response => {
						connectionSpecMetaInfo.properties.forEach(property => {
							if (!(property.name in this.messageTypeMainService.connectionSpecProperties)) {
								this.messageTypeMainService.connectionSpecProperties[property.name] = property.value;
							}
						});
						interactionSpecMetaInfo.properties.forEach(property => {
							if (!(property.name in this.messageTypeMainService.interactionSpecProperties)) {
								this.messageTypeMainService.interactionSpecProperties[property.name] = property.value;
							}
						});
						this.setValues();
					});
				} else {
					if (!this.messageTypeMainService.connectionSpecProperties) {
						this.messageTypeMainService.connectionSpecProperties = {};
						connectionSpecMetaInfo.properties.forEach(property => {
							this.messageTypeMainService.connectionSpecProperties[property.name] = property.value;
						});
					}
					if (!this.messageTypeMainService.interactionSpecProperties) {
						this.messageTypeMainService.interactionSpecProperties = {};
						interactionSpecMetaInfo.properties.forEach(property => {
							this.messageTypeMainService.interactionSpecProperties[property.name] = property.value;
						});
					}
					this.setValues();
				}
			});
		}
	}

	validateField(field, value: string) {
		if (field.connectionSpec) {
			this.messageTypeMainService.connectionSpecProperties[field.name] = value;
		} else {
			this.messageTypeMainService.interactionSpecProperties[field.name] = value;
		}
	}

	triggerSave() {
		this.save.emit(null);
	}

	private createFormControls(connectionSpecProperties, interactionSpecProperties) {
		this.formControls = {};
		this.fields = [];
		if (connectionSpecProperties) {
			connectionSpecProperties.forEach(property => {
				const label = this.fieldTextKeys[property.name] ? this.fieldTextKeys[property.name] : property.name;
				this.fields.push({
					name: property.name,
					label,
					encrypt: property.encrypt,
					connectionSpec: true
				});
				this.formControls[property.name] = new FormControl("");
			});
		}
		if (interactionSpecProperties) {
			interactionSpecProperties.forEach(property => {
				const label = this.fieldTextKeys[property.name] ? this.fieldTextKeys[property.name] : property.name;
				this.fields.push({
					name: property.name,
					label,
					encrypt: property.encrypt,
					connectionSpec: false
				});
				this.formControls[property.name] = new FormControl("");
			});
		}
	}

	private createForm() {
		this.configurationForm = new FormGroup(this.formControls);
		this.step.stepControl = this.configurationForm;
		if (this.fields.length > 0) {
			setTimeout(() => {
				this.firstInput.nativeElement.focus();
			}, 250);
		}
	}

	private setValues() {
		const connectionSpecProperties = this.messageTypeMainService.connectionSpecProperties;
		const interactionSpecProperties = this.messageTypeMainService.interactionSpecProperties;
		this.fields.forEach(field => {
			if (field.connectionSpec && connectionSpecProperties[field.name]) {
				this.formControls[field.name].setValue(connectionSpecProperties[field.name]);
			} else if (!field.connectionSpec && interactionSpecProperties[field.name]) {
				this.formControls[field.name].setValue(interactionSpecProperties[field.name]);
			}
		});
	}
}
