/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Injectable } from "@angular/core";
import { Observable, Observer, forkJoin } from "rxjs";
import { ConnectionSpecsService } from "../../../rest/services/connection-specs.service";
import { InteractionSpecsService } from "../../../rest/services/interaction-specs.service";
import { ProfilesService } from "../../../rest/services/profiles.service";

@Injectable({
	providedIn: "root"
})
export class MessageTypeMainService {
	messageTypeData: any = null;
	connectionSpecProperties: any = null;
	interactionSpecProperties: any = null;
	currentProfileId: number = null;
	processing = false;

	private currentProfile: any = null;
	private currentConnectionSpecs: any = null;
	private currentInteractionSpecs: any = null;

	constructor(private profilesService: ProfilesService,
			private connectionSpecsService: ConnectionSpecsService,
			private interactionSpecsService: InteractionSpecsService) { }

	clearData() {
		this.messageTypeData = null;
		this.connectionSpecProperties = null;
		this.interactionSpecProperties = null;
		this.currentProfileId = null;
		this.currentProfile = null;
		this.currentConnectionSpecs = null;
		this.currentInteractionSpecs = null;
	}

	createMessageType(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			const data = this.messageTypeData;
			this.profilesService.createProfileResponse({
				storeId: data.storeId,
				deviceFormatId: data.deviceFormatId,
				usersView: "N",
				lowPriority: data.lowPriority,
				highPriority: data.highPriority,
				archive: data.archive,
				transportId: data.transportId,
				messageTypeId: data.messageTypeId
			}).subscribe(response => {
				const paths: Array<string> = response.headers.get("location").split("/");
				const id: number = Number(paths[paths.length - 1]);
				this.currentProfileId = id;
				const requests = [];
				const connectionSpecsBody = this.buildCreateConnectionSpecsBody();
				if (connectionSpecsBody) {
					requests.push(this.connectionSpecsService.updateMessageTransportConnectionSpecsResponse({
						transportId: data.transportId,
						storeId: data.storeId,
						profileId: id,
						body: connectionSpecsBody
					}));
				}
				const interactionSpecsBody = this.buildCreateInteractionSpecsBody();
				if (interactionSpecsBody) {
					requests.push(this.interactionSpecsService.updateInteractionSpecsResponse({
						profileId: id,
						body: interactionSpecsBody
					}));
				}
				if (requests.length > 0) {
					forkJoin(requests).subscribe(responseList => {
						observer.next([response, ...responseList]);
						observer.complete();
						this.processing = false;
					},
					error => {
						this.processing = false;
						observer.error(error);
					});
				} else {
					observer.next([response]);
					observer.complete();
					this.processing = false;
				}
			},
			error => {
				this.processing = false;
				observer.error(error);
			});
		});
	}

	loadCurrentProfile(profileId: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentProfile != null && this.currentProfileId === profileId) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (profileId !== this.currentProfile) {
					this.clearData();
					this.currentProfileId = profileId;
				}
				this.profilesService.getProfileById({
					id: profileId
				}).subscribe(body => {
					this.currentProfile = body;
					this.messageTypeData = {
						id: body.id,
						storeId: body.storeId,
						lowPriority: body.lowPriority,
						highPriority: body.highPriority,
						archive: body.archive,
						transportId: body.transportId,
						messageTypeId: body.messageTypeId,
						deviceFormatId: body.deviceFormatId
					};
					observer.next(undefined);
					observer.complete();
				},
				error => {
					observer.error(error);
					observer.complete();
				});
			}
		});
	}

	loadCurrentMessageTypeProperties(profileId: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			this.loadCurrentProfile(profileId).subscribe(response => {
				const requests = [
					this.connectionSpecsService.getMessageTransportConnectionSpecs({
						profileId: this.messageTypeData.id,
						transportId: this.messageTypeData.transportId,
						storeId: this.messageTypeData.storeId
					}),
					this.interactionSpecsService.getInteractionSpecs(this.messageTypeData.id)
				];
				forkJoin(requests).subscribe(responseList => {
					this.currentConnectionSpecs = responseList[0];
					this.connectionSpecProperties = {};
					if (this.currentConnectionSpecs.properties) {
						this.currentConnectionSpecs.properties.forEach(property => {
							this.connectionSpecProperties[property.name] = property.value ? property.value : "";
						});
					}
					this.currentInteractionSpecs = responseList[1];
					this.interactionSpecProperties = {};
					if (this.currentInteractionSpecs.properties) {
						this.currentInteractionSpecs.properties.forEach(property => {
							this.interactionSpecProperties[property.name] = property.value ? property.value : "";
						});
					}
					observer.next(undefined);
					observer.complete();
				},
				error => {
					observer.error(error);
					observer.complete();
				});
			},
			error => {
				observer.error(error);
				observer.complete();
			});
		});
	}

	updateMessageType(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			if (this.currentProfileId != null && this.messageTypeData != null) {
				const updateProfileRequest = this.getUpdateProfileRequest();
				const updateConnectionSpecsRequest = this.getUpdateConnectionSpecsRequest();
				const updateInteractionSpecsRequest = this.getUpdateInteractionSpecsRequest();
				const requests1 = [];
				const requests2 = [];
				if (updateProfileRequest !== null) {
					requests1.push(updateProfileRequest);
					if (updateConnectionSpecsRequest !== null) {
						requests2.push(updateConnectionSpecsRequest);
					}
					if (updateInteractionSpecsRequest !== null) {
						requests2.push(updateInteractionSpecsRequest);
					}
				} else {
					if (updateConnectionSpecsRequest !== null) {
						requests1.push(updateConnectionSpecsRequest);
					}
					if (updateInteractionSpecsRequest !== null) {
						requests1.push(updateInteractionSpecsRequest);
					}
				}
				if (requests1.length > 0) {
					forkJoin(requests1).subscribe(responseList1 => {
						if (requests2.length > 0) {
							forkJoin(requests2).subscribe(responseList2 => {
								observer.next(undefined);
								observer.complete();
								this.processing = false;
							},
							error => {
								this.processing = false;
								observer.error(error);
							});
						} else {
							observer.next(undefined);
							observer.complete();
							this.processing = false;
						}
					},
					error => {
						this.processing = false;
						observer.error(error);
					});
				} else {
					observer.next(undefined);
					observer.complete();
					this.processing = false;
				}
			} else {
				observer.next(undefined);
				observer.complete();
				this.processing = false;
			}
		});
	}

	private buildCreateConnectionSpecsBody() {
		let body = null;
		if (this.connectionSpecProperties) {
			body = {
				properties: []
			};
			const properties = body.properties;
			for (const name of Object.keys(this.connectionSpecProperties)) {
				properties.push({
					name,
					value: this.connectionSpecProperties[name]
				});
			}
		}
		return body;
	}

	private buildCreateInteractionSpecsBody() {
		let body = null;
		if (this.interactionSpecProperties) {
			body = {
				properties: []
			};
			const properties = body.properties;
			for (const name of Object.keys(this.interactionSpecProperties)) {
				properties.push({
					name,
					value: this.interactionSpecProperties[name]
				});
			}
		}
		return body;
	}

	private getUpdateProfileRequest() {
		let request = null;
		const data = this.messageTypeData;
		if (data && this.currentProfile &&
				(data.lowPriority !== this.currentProfile.lowPriority ||
				data.highPriority !== this.currentProfile.highPriority ||
				data.archive !== this.currentProfile.archive ||
				data.deviceFormatId !== this.currentProfile.deviceFormatId ||
				data.transportId !== this.currentProfile.transportId)) {
			const body: any = {};
			if (data.lowPriority !== this.currentProfile.lowPriority) {
				body.lowPriority = data.lowPriority;
			}
			if (data.highPriority !== this.currentProfile.highPriority) {
				body.highPriority = data.highPriority;
			}
			if (data.archive !== this.currentProfile.archive) {
				body.archive = data.archive;
			}
			if (data.deviceFormatId !== this.currentProfile.deviceFormatId) {
				body.deviceFormatId = data.deviceFormatId;
			}
			if (data.transportId !== this.currentProfile.transportId) {
				body.transportId = data.transportId;
			}
			request = this.profilesService.updateProfileByIdResponse({
				id: this.currentProfileId,
				Profile: body
			});
		}
		return request;
	}

	private getUpdateConnectionSpecsRequest() {
		let request = null;
		const data = this.messageTypeData;
		if (data && this.currentConnectionSpecs && this.connectionSpecProperties && this.currentProfileId) {
			const body = {
				properties: []
			};
			const properties = body.properties;
			const currentProperties = this.currentConnectionSpecs.properties;
			if (this.connectionSpecProperties) {
				for (const name of Object.keys(this.connectionSpecProperties)) {
					let currentPropertyValue = null;
					if (currentProperties) {
						for (let i = 0; i < currentProperties.length; i++) {
							const currentProperty = currentProperties[i];
							if (currentProperty.name === name) {
								currentPropertyValue = currentProperty.value;
								break;
							}
						}
					}
					if (currentPropertyValue !== this.connectionSpecProperties[name]) {
						properties.push({
							name,
							value: this.connectionSpecProperties[name]
						});
					}
				}
				request = this.connectionSpecsService.updateMessageTransportConnectionSpecsResponse({
					transportId: data.transportId,
					storeId: data.storeId,
					profileId: this.currentProfileId,
					body
				});
			}
		}
		return request;
	}

	private getUpdateInteractionSpecsRequest() {
		let request = null;
		const data = this.messageTypeData;
		if (data && this.currentInteractionSpecs && this.interactionSpecProperties && this.currentProfileId) {
			const body = {
				properties: []
			};
			const properties = body.properties;
			const currentProperties = this.currentInteractionSpecs.properties;
			if (this.interactionSpecProperties) {
				for (const name of Object.keys(this.interactionSpecProperties)) {
					let currentPropertyValue = null;
					if (currentProperties) {
						for (let i = 0; i < currentProperties.length; i++) {
							const currentProperty = currentProperties[i];
							if (currentProperty.name === name) {
								currentPropertyValue = currentProperty.value;
								break;
							}
						}
					}
					if (currentPropertyValue !== this.interactionSpecProperties[name]) {
						properties.push({
							name,
							value: this.interactionSpecProperties[name]
						});
					}
				}
				request = this.interactionSpecsService.updateInteractionSpecsResponse({
					profileId: this.currentProfileId,
					body
				});
			}
		}
		return request;
	}
}
