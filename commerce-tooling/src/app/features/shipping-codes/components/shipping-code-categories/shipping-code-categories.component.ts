/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { MatStep } from "@angular/material/stepper";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MatTabChangeEvent } from "@angular/material";

@Component({
	selector: "hc-shipping-code-categories",
	templateUrl: "./shipping-code-categories.component.html",
	styleUrls: ["./shipping-code-categories.component.scss"]
})
export class ShippingCodeCategoriesComponent implements OnInit, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	categoriesForm: FormGroup | any;
	activeTab = 0;

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.activeTab = Number(this.route.snapshot.params.tab);
	}

	ngAfterViewInit() {
		this.step.stepControl = this.categoriesForm;
	}

	triggerSave() {
		this.save.emit(null);
	}

	tabChanged(tabChangeEvent: MatTabChangeEvent) {
		this.activeTab = tabChangeEvent.index;
	}
}
