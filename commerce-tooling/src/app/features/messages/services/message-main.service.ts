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
import { Observable, Observer } from "rxjs";
import { PendingMessagesService } from "../../../rest/services/pending-messages.service";
import { ArchivedMessagesService } from "../../../rest/services/archived-messages.service";

@Injectable({
	providedIn: "root"
})
export class MessageMainService {
	messageData: any = null;
	processing = false;

	private currentPendingMessage = null;
	private currentPendingMessageId = null;
	private currentArchivedMessage = null;
	private currentArchivedMessageId = null;

	constructor(private pendingMessagesService: PendingMessagesService,
			private archivedMessagesService: ArchivedMessagesService) { }

	clearData() {
		this.messageData = null;
		this.currentPendingMessage = null;
		this.currentPendingMessageId = null;
		this.currentArchivedMessage = null;
		this.currentArchivedMessageId = null;
	}

	resendMessage(): Observable<void> {
		this.processing = true;
		return new Observable<undefined>((observer: Observer<void>) => {
			const body = this.buildResendMessageBody();
			if (this.currentPendingMessage !== null) {
				this.resendPendingMessage(observer);
			} else if (this.currentArchivedMessage !== null) {
				this.resendArchivedMessage(observer);
			} else {
				observer.next(undefined);
				observer.complete();
				this.processing = false;
			}
		});
	}

	loadCurrentPendingMessage(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentPendingMessage !== null && this.currentPendingMessage.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentPendingMessageId) {
					this.clearData();
					this.currentPendingMessageId = id;
				}
				this.pendingMessagesService.getPendingMessageById(id).subscribe(
					body => {
						this.currentPendingMessage = body;
						this.messageData = {
							id:	body.id,
							transportId: body.transportId,
							storeId: body.storeId,
							content: body.content,
							connectionSpecifications: body.connectionSpecifications,
							interactionSpecifications: body.interactionSpecifications
						};
						observer.next(undefined);
						observer.complete();
					},
					error => {
						observer.error(error);
						observer.complete();
					}
				);
			}
		});
	}

	loadCurrentArchivedMessage(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentArchivedMessage !== null && this.currentArchivedMessage.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentArchivedMessageId) {
					this.clearData();
					this.currentArchivedMessageId = id;
				}
				this.archivedMessagesService.getArchivedMessageById(id).subscribe(
					body => {
						this.currentArchivedMessage = body;
						this.messageData = {
							id:	body.id,
							transportId: body.transportId,
							storeId: body.storeId,
							content: body.content,
							connectionSpecifications: body.connectionSpecifications,
							interactionSpecifications: body.interactionSpecifications
						};
						observer.next(undefined);
						observer.complete();
					},
					error => {
						observer.error(error);
						observer.complete();
					}
				);
			}
		});
	}

	private resendPendingMessage(observer: Observer<void>) {
		this.pendingMessagesService.resendPendingMessageResponse({
			id: this.currentPendingMessage.id,
			body: this.buildResendMessageBody()
		}).subscribe(response => {
			observer.next(undefined);
			observer.complete();
			this.processing = false;
		},
		error => {
			observer.error(error);
			observer.complete();
			this.processing = false;
		});
	}

	private resendArchivedMessage(observer: Observer<void>) {
		this.archivedMessagesService.resendArchivedMessageResponse({
			id: this.currentArchivedMessage.id,
			body: this.buildResendMessageBody()
		}).subscribe(response => {
			observer.next(undefined);
			observer.complete();
			this.processing = false;
		},
		error => {
			observer.error(error);
			observer.complete();
			this.processing = false;
		});
	}

	private buildResendMessageBody(): any {
		const connectionSpecifications = this.messageData.connectionSpecifications;
		const interactionSpecifications = this.messageData.interactionSpecifications;
		const resendMessageBody: {
			connectionSpecifications?: {[key: string]: string},
			interactionSpecifications?: {[key: string]: string}
		} = {};
		if (connectionSpecifications) {
			resendMessageBody.connectionSpecifications = {};
			for (const name of Object.keys(connectionSpecifications)) {
				if (connectionSpecifications[name] !== null) {
					resendMessageBody.connectionSpecifications[name] = connectionSpecifications[name];
				}
			}
		}
		if (interactionSpecifications) {
			resendMessageBody.interactionSpecifications = {};
			for (const name of Object.keys(interactionSpecifications)) {
				if (interactionSpecifications[name] !== null) {
					resendMessageBody.interactionSpecifications[name] = interactionSpecifications[name];
				}
			}
		}
		return resendMessageBody;
	}
}
