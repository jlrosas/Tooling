/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, AfterViewInit, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, Observable, Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MatStep, MatStepper } from "@angular/material/stepper";
import { DataSource } from "@angular/cdk/table";
import { FormGroup } from "@angular/forms";
import { ShippingChargeMainService, ShippingChargeFulfillmentOption } from "../../services/shipping-charge-main.service";
import { FulfillmentCentersService } from "../../../../rest/services/fulfillment-centers.service";
import { JurisdictionsService } from "../../../../rest/services/jurisdictions.service";
import { ShippingModesService } from "../../../../rest/services/shipping-modes.service";
import {
	ShippingChargeFulfillmentOptionDialogComponent
} from "../shipping-charge-fulfillment-option-dialog/shipping-charge-fulfillment-option-dialog.component";

@Component({
	selector: "hc-shipping-charge-fulfillment-options",
	templateUrl: "./shipping-charge-fulfillment-options.component.html",
	styleUrls: ["./shipping-charge-fulfillment-options.component.scss"]
})
export class ShippingChargeFulfillmentOptionsComponent implements AfterViewInit, OnInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	fulfillmentForm: FormGroup | any;
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	displayedColumns: string[] = ["fulfillmentCenter", "jurisdiction", "shippingMode", "precedence", "actions"];

	model = new FulfillmentOptionDataSource();

	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "500px",
		disableClose: true,
		autoFocus: true
	};

	constructor(private route: ActivatedRoute,
		private shippingChargeMainService: ShippingChargeMainService,
		private fulfillmentCentersService: FulfillmentCentersService,
		private jurisdictionsService: JurisdictionsService,
		private shippingModesService: ShippingModesService,
		private dialog: MatDialog) { }

	ngOnInit() {
		this.createForm();
	}

	ngAfterViewInit() {
		this.step.stepControl = this.fulfillmentForm;
		if (this.mode === "edit") {
			this.shippingChargeMainService.loadCurrentFulfillmentOptions(Number(this.route.snapshot.params.id),
					this.route.snapshot.params.storeOwnerId).subscribe(response => {
				this.model.setData(this.shippingChargeMainService.fulfillmentOptions);
			});
		} else {
			if (this.shippingChargeMainService.fulfillmentOptions === null) {
				this.shippingChargeMainService.fulfillmentOptions = [];
			}
			this.model.setData(this.shippingChargeMainService.fulfillmentOptions);
		}
	}

	triggerSave() {
		this.fulfillmentForm.markAllAsTouched();
		this.save.emit(null);
	}

	createFulfillmentOption() {
		const dialogRef = this.dialog.open(ShippingChargeFulfillmentOptionDialogComponent, {
			...this.dialogConfig,
			data: {
				storeId: Number(this.route.snapshot.params.storeId),
				storeOwnerId: this.route.snapshot.params.storeOwnerId,
				fulfillmentOptions: this.shippingChargeMainService.fulfillmentOptions
			}
		});
		dialogRef.afterClosed().subscribe((fulfillmentOption: ShippingChargeFulfillmentOption) => {
			if (fulfillmentOption) {
				this.shippingChargeMainService.fulfillmentOptions.push(fulfillmentOption);
				this.model.setData(this.shippingChargeMainService.fulfillmentOptions);
			}
		});
	}

	editFulfillmentOption(fulfillmentOption: ShippingChargeFulfillmentOption) {
		const dialogRef = this.dialog.open(ShippingChargeFulfillmentOptionDialogComponent, {
			...this.dialogConfig,
			data: {
				fulfillmentOption,
				storeId: Number(this.route.snapshot.params.storeId),
				storeOwnerId: this.route.snapshot.params.storeOwnerId,
				fulfillmentOptions: this.shippingChargeMainService.fulfillmentOptions
			}
		});
		dialogRef.afterClosed().subscribe((modifiedFulfillmentOption: ShippingChargeFulfillmentOption) => {
			if (modifiedFulfillmentOption) {
				this.model.setData(this.shippingChargeMainService.fulfillmentOptions);
			}
		});
	}

	deleteFulfillmentOption(id) {
		this.shippingChargeMainService.fulfillmentOptions.splice(id, 1);
		this.model.setData(this.shippingChargeMainService.fulfillmentOptions);
	}

	private createForm() {
		this.fulfillmentForm = new FormGroup({
		});
	}
}

/**
 * Data source to provide data to be rendered in the table.
 */
class FulfillmentOptionDataSource extends DataSource<ShippingChargeFulfillmentOption> {
	private fulfillmentOptions$: Subject<ShippingChargeFulfillmentOption[]> = new Subject<ShippingChargeFulfillmentOption[]>();

	setData(fulfillmentOptions: ShippingChargeFulfillmentOption[]) {
		this.fulfillmentOptions$.next(fulfillmentOptions);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<ShippingChargeFulfillmentOption[]> {
		return this.fulfillmentOptions$.asObservable();
	}

	disconnect() {}
}
