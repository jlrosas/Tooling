/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";

import { AlertService } from "../../services/alert.service";

@Component({
	selector: "hc-alert-list",
	templateUrl: "alert-list.component.html"
})
export class AlertListComponent implements OnInit, OnDestroy {
	@Input() className: string;
	messages: any = [];

	private autoHideDuration = 6000;
	private alertSubscription: Subscription;

	constructor(private alertService: AlertService) { }

	ngOnInit() {
		const removeMessageHandlers = [];
		this.alertSubscription = this.alertService.getAlert().subscribe(messageObj => {
			if (messageObj && messageObj.type) {
				this.messages.push({
					type: messageObj.type,
					message: messageObj.message,
					showClose: true,
					lowContrast: false
				});
				if (messageObj.type === "success") {
					removeMessageHandlers.push(
						setTimeout(() => {
							this.removeMessage(messageObj);
						},
						this.autoHideDuration)
					);
				}
			} else {
				this.messages = [];
				removeMessageHandlers.forEach(handler => clearTimeout(handler));
			}
		});
	}

	ngOnDestroy() {
		this.alertSubscription.unsubscribe();
	}

	onClose(messageObj: any) {
		this.removeMessage(messageObj);
	}

	private removeMessage(messageObj: any) {
		const index = this.messages.findIndex((item: { message: any; }) => item.message === messageObj.message);
		if (index !== -1) {
			this.messages.splice(index, 1);
		}
	}
}
