/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { MatStep } from "@angular/material/stepper";
import { Component, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, Observable, Subscription } from "rxjs";
import { DataSource } from "@angular/cdk/table";
import { MatDialog } from "@angular/material";
import { TaxCategoryMainService, TaxRate } from "../../services/tax-category-main.service";
import { TaxCategoryRateDialogComponent } from "../tax-category-rate-dialog/tax-category-rate-dialog.component";

@Component({
	selector: "hc-tax-category-rates",
	templateUrl: "./tax-category-rates.component.html",
	styleUrls: ["./tax-category-rates.component.scss"]
})
export class TaxCategoryRatesComponent implements AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	displayedColumns: string[] = ["rate", "jurisdiction", "fulfillmentCenter", "actions"];

	model = new TaxRateDataSource();

	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};

	constructor(private route: ActivatedRoute,
			private taxCategoryMainService: TaxCategoryMainService,
			private dialog: MatDialog) { }

	ngAfterViewInit() {
		if (this.mode === "edit") {
			this.taxCategoryMainService.loadCurrentTaxRates(Number(this.route.snapshot.params.id),
					this.route.snapshot.params.storeOwnerId).subscribe(response => {
				this.model.setData(this.taxCategoryMainService.taxRates);
			});
		} else {
			if (this.taxCategoryMainService.taxRates === null) {
				this.taxCategoryMainService.taxRates = [];
			}
			this.model.setData(this.taxCategoryMainService.taxRates);
		}
	}

	triggerSave() {
		this.save.emit(null);
	}

	createTaxRate() {
		const dialogRef = this.dialog.open(TaxCategoryRateDialogComponent, {
			...this.dialogConfig,
			data: {
				mode: "create",
				storeOwnerId: this.route.snapshot.params.storeOwnerId
			}
		});
		dialogRef.afterClosed().subscribe((taxRate: TaxRate) => {
			if (taxRate) {
				this.taxCategoryMainService.taxRates.push(taxRate);
				this.model.setData(this.taxCategoryMainService.taxRates);
			}
		});
	}

	editTaxRate(taxRate: TaxRate) {
		const dialogRef = this.dialog.open(TaxCategoryRateDialogComponent, {
			...this.dialogConfig,
			data: {
				mode: "edit",
				storeOwnerId: this.route.snapshot.params.storeOwnerId,
				taxRate
			}
		});
		dialogRef.afterClosed().subscribe((modifiedTaxRate: TaxRate) => {
			if (modifiedTaxRate) {
				this.model.setData(this.taxCategoryMainService.taxRates);
			}
		});
	}

	deleteTaxRate(id) {
		this.taxCategoryMainService.taxRates.splice(id, 1);
		this.model.setData(this.taxCategoryMainService.taxRates);
	}
}

/**
 * Data source to provide data to be rendered in the table.
 */
class TaxRateDataSource extends DataSource<TaxRate> {
	private taxRates$: Subject<TaxRate[]> = new Subject<TaxRate[]>();

	setData(taxRate: TaxRate[]) {
		this.taxRates$.next(taxRate);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<TaxRate[]> {
		return this.taxRates$.asObservable();
	}

	disconnect() {}
}

