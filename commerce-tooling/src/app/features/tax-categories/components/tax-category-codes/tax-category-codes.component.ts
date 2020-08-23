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
import { MatStepper, MatStep } from "@angular/material/stepper";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { debounceTime } from "rxjs/operators";
import { Subject, Subscription, Observable } from "rxjs";
import { TaxCategoryMainService } from "../../services/tax-category-main.service";
import { AlertService } from "../../../../services/alert.service";
import { CalculationCodesService } from "../../../../rest/services/calculation-codes.service";

@Component({
	selector: "hc-tax-category-codes",
	templateUrl: "./tax-category-codes.component.html",
	styleUrls: ["./tax-category-codes.component.scss"]
})
export class TaxCategoryCodesComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	codesForm: FormGroup | any;
	taxCodeSearch: FormControl;
	taxCodes: Array<any> = [];
	taxCodeSearchList: Array<any> = [];

	@ViewChild("taxCodeSearchInput", {static: false}) taxCodeSearchInput: ElementRef<HTMLInputElement>;

	private getTaxCodesSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();

	constructor(private route: ActivatedRoute,
			private taxCategoryMainService: TaxCategoryMainService,
			private calculationCodesService: CalculationCodesService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.taxCategoryMainService.loadCurrentTaxCodes(Number(this.route.snapshot.params.id)).subscribe(response => {
				this.setValues();
			});
		} else {
			this.setValues();
		}
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getTaxCodes(searchString);
		});
		this.getTaxCodes("");
	}

	ngAfterViewInit() {
		this.step.stepControl = this.codesForm;
		setTimeout(() => {
			this.taxCodeSearchInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
	}

	next() {
		this.stepper.next();
	}

	triggerSave() {
		this.codesForm.markAllAsTouched();
		this.save.emit(null);
	}

	searchTaxCodes(searchString: string) {
		this.searchString.next(searchString);
	}

	getTaxCodes(searchString: string) {
		if (this.getTaxCodesSubscription != null) {
			this.getTaxCodesSubscription.unsubscribe();
			this.getTaxCodesSubscription = null;
		}
		this.getTaxCodesSubscription = this.calculationCodesService.getCalculationCodes({
			storeId: Number(this.route.snapshot.params.storeId),
			searchString: searchString,
			calculationUsageId: [this.taxCategoryMainService.taxCategoryData.taxTypeId],
			limit: 10
		}).subscribe(response => {
	 		this.getTaxCodesSubscription = null;
	 		if (response.items.length === 1 && searchString === response.items[0].calculationCode) {
	 			this.selectTaxCode(response.items[0]);
	 		} else {
	 			this.taxCodeSearchList = response.items;
	 		}
		},
		error => {
			this.getTaxCodesSubscription = null;
			console.log(error);
		});
	}

	selectTaxCode(taxCode: any) {
		this.taxCodeSearch.setValue("");
		let found = false;
		for (let i = 0; i < this.taxCodes.length; i++) {
			if (this.taxCodes[i].calculationCode === taxCode.calculationCode) {
				found = true;
				break;
			}
		}
		if (!found) {
			this.taxCodes.push(taxCode);
		}
		this.searchTaxCodes("");
	}

	removeTaxCode(taxCode: any) {
		const pos: number = this.taxCodes.indexOf(taxCode);
		this.taxCodes.splice(pos, 1);
	}

	private setValues() {
		if (this.taxCategoryMainService.taxCodes == null) {
			this.taxCategoryMainService.taxCodes = [];
		}
		this.taxCodes = this.taxCategoryMainService.taxCodes;
	}

	private createFormControls() {
		this.taxCodeSearch = new FormControl();
	}

	private createForm() {
		this.codesForm = new FormGroup({
			taxCodeSearch : this.taxCodeSearch
		});
	}
}
