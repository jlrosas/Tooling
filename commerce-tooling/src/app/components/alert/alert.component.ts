/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
	selector: "hc-alert",
	templateUrl: "./alert.component.html",
	styleUrls: ["./alert.component.scss"]
})

export class AlertComponent {
	@Input() className: String;
	@Input() messages: Array<any>;

	@Output() onClose: EventEmitter<any> = new EventEmitter<any>();
	@Output() onRemoveMessage: EventEmitter<any> = new EventEmitter<any>();

	closeAlert() {
		this.onClose.emit(null);
	}

	removeMessage(message) {
		this.onRemoveMessage.emit(message);
	}
}
