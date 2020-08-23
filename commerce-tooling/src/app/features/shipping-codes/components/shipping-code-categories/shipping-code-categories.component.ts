/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { MatStep } from "@angular/material/stepper";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ShippingCodeMainService } from "../../services/shipping-code-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	selector: "hc-shipping-code-categories",
	templateUrl: "./shipping-code-categories.component.html",
	styleUrls: ["./shipping-code-categories.component.scss"]
})
export class ShippingCodeCategoriesComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	categoriesForm: FormGroup | any;

	constructor(private route: ActivatedRoute,
			private shippingCodeMainService: ShippingCodeMainService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();

		if (this.mode === "edit") {
			this.shippingCodeMainService.loadCurrentShippingCode(this.route.snapshot.params.id).subscribe(response => {
				this.setValues();
			});
		} else {
			this.setValues();
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.categoriesForm;
		setTimeout(() => {
			// this.firstInputTobeFocussednativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
		// unsubscribe any subscription
	}


	triggerSave() {
		this.categoriesForm.markAllAsTouched();
		this.save.emit(null);
	}

	private setValues() {
		const shippingCodeData = this.shippingCodeMainService.shippingCodeData;
		if (shippingCodeData) {
			// populate data for edit mode
		} else {
			this.shippingCodeMainService.shippingCodeData = {
				// paramId: Number(this.route.snapshot.params.paramId)
			};
		}
	}

	private createFormControls() {
	}

	private createForm() {
		this.categoriesForm = new FormGroup({
		});
	}
}
