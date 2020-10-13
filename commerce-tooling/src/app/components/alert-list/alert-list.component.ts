/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, Input, ViewChild, TemplateRef } from "@angular/core";
import { Subscription } from "rxjs";

import { AlertService } from "../../services/alert.service";
import { MatSnackBar } from "@angular/material";

@Component({
	selector: "hc-alert-list",
	templateUrl: "alert-list.component.html"
})
export class AlertListComponent implements OnInit, OnDestroy {
	@Input() className: string;
	messages: any = [];

	@ViewChild("snackBarTemplate", {static: false})
	snackBarTemplate: TemplateRef<any>;
	private autoHideDuration = 6000;
	private alertSubscription: Subscription;

	constructor(private alertService: AlertService, private snackBar: MatSnackBar) { }

	ngOnInit() {
		const removeMessageHandlers = [];
		this.alertSubscription = this.alertService.getAlert().subscribe(messageObj => {
			if (messageObj && messageObj.type) {
				this.messages.push({
					type: messageObj.type,
					message: messageObj.message,
					showDismiss: true
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
				this.snackBar.dismiss();
			}
			if (this.messages && this.messages.length > 0) {
				this.snackBar.openFromTemplate(this.snackBarTemplate, {
					horizontalPosition: "center",
					verticalPosition: "top"
				});
			}
		});
	}

	ngOnDestroy() {
		this.alertSubscription.unsubscribe();
		this.snackBar.dismiss();
	}

	closeAlert() {
		this.snackBar.dismiss();
		this.messages = [];
 	}

	removeMessage(messageObj: any) {
		const index = this.messages.findIndex((item: { message: any; }) => item.message === messageObj.message);
		if (index !== -1) {
			this.messages.splice(index, 1);
		}
		if (this.messages.length === 0) {
			this.closeAlert();
		}
	}
}
