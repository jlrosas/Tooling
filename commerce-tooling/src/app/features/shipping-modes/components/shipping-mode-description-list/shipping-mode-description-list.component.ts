/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, Input, AfterViewInit, OnDestroy, Output, EventEmitter, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, Observable, Subscription } from "rxjs";
import { MatDialog, MatStep, MatPaginator, MatSort } from "@angular/material";
import { DataSource } from "@angular/cdk/table";
import { ShippingModeMainService } from "../../services/shipping-mode-main.service";
import { LanguageDescriptionsService } from "../../../../rest/services/language-descriptions.service";
import { LanguageService } from "../../../../services/language.service";
import { ShippingModeDescriptionDialogComponent } from "../shipping-mode-description-dialog/shipping-mode-description-dialog.component";
import { FormGroup } from "@angular/forms";

@Component({
	selector: "hc-shipping-mode-description-list",
	templateUrl: "./shipping-mode-description-list.component.html",
	styleUrls: ["./shipping-mode-description-list.component.scss"]
})
export class ShippingModeDescriptionListComponent implements AfterViewInit, OnDestroy {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	displayedColumns: string[] = ["language", "mainDescription", "additionalDescrition", "estimatedDeliveryTime", "actions"];
	listSearchForm: FormGroup | any;
	model = new DescriptionDataSource();
	preferenceToken: string;
	languageList = {};
	private onLanguageChangeSubscription: Subscription = null;

	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};

	constructor(private route: ActivatedRoute,
			private shippingModeMainService: ShippingModeMainService,
			private languageDescriptionsService: LanguageDescriptionsService,
			private languageService: LanguageService,
			private dialog: MatDialog) { }

	ngAfterViewInit() {
		if (this.mode === "edit") {
			this.shippingModeMainService.loadCurrentShippingModeDescriptions(
					Number(this.route.snapshot.params.id)).subscribe(response => {
				this.model.setData(this.shippingModeMainService.shippingModeDescriptions);
			});
		} else {
			if (this.shippingModeMainService.shippingModeDescriptions === null) {
				this.shippingModeMainService.shippingModeDescriptions = [];
			}
			this.model.setData(this.shippingModeMainService.shippingModeDescriptions);
		}
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.initLanguageList();
		});
		this.initLanguageList();
	}

	ngOnDestroy() {
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	triggerSave() {
		this.save.emit(null);
	}

	createDescription() {
		const dialogRef = this.dialog.open(ShippingModeDescriptionDialogComponent, {
			...this.dialogConfig,
			data: {
				mode: "create",
				languageList: this.languageList,
				currentDescriptions: this.shippingModeMainService.shippingModeDescriptions
			}
		});
		dialogRef.afterClosed().subscribe((description: Description) => {
			if (description) {
				this.shippingModeMainService.shippingModeDescriptions.push(description);
				this.model.setData(this.shippingModeMainService.shippingModeDescriptions);
			}
		});
	}

	editDescription(description: Description) {
		const dialogRef = this.dialog.open(ShippingModeDescriptionDialogComponent, {
			...this.dialogConfig,
			data: {
				mode: "edit",
				description,
				languageList: this.languageList,
				currentDescriptions: this.shippingModeMainService.shippingModeDescriptions
			}
		});
		dialogRef.afterClosed().subscribe((modifiedDescription: Description) => {
			if (modifiedDescription) {
				this.model.setData(this.shippingModeMainService.shippingModeDescriptions);
			}
		});
	}

	deleteDescription(id) {
		this.shippingModeMainService.shippingModeDescriptions.splice(id, 1);
		this.model.setData(this.shippingModeMainService.shippingModeDescriptions);
	}

	private initLanguageList() {
		this.languageDescriptionsService.getLanguageDescriptions({
			languageId: LanguageService.languageId,
			sort: "description"
		}).subscribe((body: any) => {
			const newLanguageList = {};
			body.items.forEach(language => {
				newLanguageList[language.descriptionLanguageId] = language.description;
			});
			this.languageList = newLanguageList;
		});
	}
}

interface Description {
	id: number;
	languageId: number;
	description: string;
	field1: string;
	field2: string;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class DescriptionDataSource extends DataSource<Description> {
	private descriptions$: Subject<Description[]> = new Subject<Description[]>();

	setData(description: Description[]) {
		this.descriptions$.next(description);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<Description[]> {
		return this.descriptions$.asObservable();
	}

	disconnect() {}
}
