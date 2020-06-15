/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, Input, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { DataSource } from "@angular/cdk/table";
import { AccountPurchaseOrderDialogComponent } from "../account-purchase-order-dialog/account-purchase-order-dialog.component";
import { AccountMainService, PurchaseOrder } from "../../services/account-main.service";
import { CurrencyService } from "../../../../services/currency.service";

@Component({
	selector: "hc-account-purchase-order-list",
	templateUrl: "./account-purchase-order-list.component.html",
	styleUrls: ["./account-purchase-order-list.component.scss"]
})
export class AccountPurchaseOrderListComponent implements AfterViewInit {
	@Input() mode: String;

	displayedColumns: string[] = ["purchaseOrderNumber", "spendingLimit", "actions"];

	model = new PurchaseOrderDataSource();

	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "500px",
		disableClose: true,
		autoFocus: true
	};

	constructor(private route: ActivatedRoute,
		private accountMainService: AccountMainService,
		private currencyService: CurrencyService,
		private dialog: MatDialog) { }

	ngAfterViewInit() {
		if (this.mode === "edit") {
			this.accountMainService.loadCurrentPurchaseOrders(this.route.snapshot.params.id).subscribe(
				response => {
					this.model.setData(this.accountMainService.purchaseOrders);
				}
			);
		} else {
			if (this.accountMainService.purchaseOrders === null) {
				this.accountMainService.purchaseOrders = [];
			}
			setTimeout(() => {
				this.model.setData(this.accountMainService.purchaseOrders);
			});
		}
	}

	createPurchaseOrder() {
		const dialogRef = this.dialog.open(AccountPurchaseOrderDialogComponent, {
			...this.dialogConfig,
			data: {
				storeId: Number(this.route.snapshot.params.storeId),
				otherPurchaseOrderNumbers: this.accountMainService.purchaseOrders ?
						this.accountMainService.purchaseOrders.map(row => row.purchaseOrderNumber) : []
			}
		});
		dialogRef.afterClosed().subscribe((purchaseOrder: PurchaseOrder) => {
			if (purchaseOrder) {
				this.accountMainService.purchaseOrders.push(purchaseOrder);
				this.model.setData(this.accountMainService.purchaseOrders);
			}
		});
	}

	editPurchaseOrder(purchaseOrder: PurchaseOrder) {
		const dialogRef = this.dialog.open(AccountPurchaseOrderDialogComponent, {
			...this.dialogConfig,
			data: {
				purchaseOrder,
				storeId: Number(this.route.snapshot.params.storeId),
				otherPurchaseOrderNumbers: this.accountMainService.purchaseOrders ?
						this.accountMainService.purchaseOrders.map(row =>
						row.purchaseOrderNumber !== purchaseOrder.purchaseOrderNumber ? row.purchaseOrderNumber : null) : []
			}
		});
		dialogRef.afterClosed().subscribe((modifiedPurchaseOrder: PurchaseOrder) => {
			if (modifiedPurchaseOrder) {
				this.model.setData(this.accountMainService.purchaseOrders);
			}
		});
	}

	deletePurchaseOrder(id) {
		this.accountMainService.purchaseOrders.splice(id, 1);
		this.model.setData(this.accountMainService.purchaseOrders);
	}

	formatSpendingLimit(purchaseOrder: PurchaseOrder): string {
		let result = null;
		const value = purchaseOrder.spendingLimitValue;
		if (value !== null && value !== undefined) {
			const currency = purchaseOrder.spendingLimitCurrency;
			result = value.toFixed(this.currencyService.getCurrencyDecimalPlaces(currency)) + " " + currency;
		}
		return result;
	}
}

/**
 * Data source to provide data to be rendered in the table.
 */
class PurchaseOrderDataSource extends DataSource<PurchaseOrder> {
	private purchaseOrders$: Subject<PurchaseOrder[]> = new Subject<PurchaseOrder[]>();

	setData(purchaseOrders: PurchaseOrder[]) {
		this.purchaseOrders$.next(purchaseOrders);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<PurchaseOrder[]> {
		return this.purchaseOrders$.asObservable();
	}

	disconnect() {}
}
