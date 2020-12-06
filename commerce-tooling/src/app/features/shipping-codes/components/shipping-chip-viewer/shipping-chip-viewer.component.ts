/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "hc-shipping-chip-viewer",
	templateUrl: "./shipping-chip-viewer.component.html",
	styleUrls: ["./shipping-chip-viewer.component.scss"]
})
export class ShippingChipViewerComponent {
	@Input() list = [];
	@Input() title = "";
	@Input() link = [];
	@Input() totalItems = 0;
	@Output() onRemove: EventEmitter<any> = new EventEmitter<any>();

	constructor(private router: Router) {}

	removeSelection($event) {
		this.onRemove.emit($event);
	}

	goToLink() {
		this.router.navigate([...this.link]);
	}
}
