/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { MAT_DIALOG_DATA, MatDialogRef, MatSelect } from "@angular/material";
import { Component, OnInit, Inject, Input, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators, Form } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../../services/alert.service";
import { Subject, Subscription, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FulfillmentCentersService } from "../../../../rest/services/fulfillment-centers.service";
import { ShippingArrangementsService } from "../../../../rest/services/shipping-arrangements.service";
import { JurisdictionsService } from "../../../../rest/services/jurisdictions.service";
import { JurisdictionGroupsService } from "../../../../rest/services/jurisdiction-groups.service";
import { JurisdictionGroupRelationshipsService } from "../../../../rest/services/jurisdiction-group-relationships.service";
import { TaxCategoryMainService } from "../../services/tax-category-main.service";
import { HcValidators } from "../../../../shared/validators";

@Component({
	selector: "hc-tax-category-rate-dialog",
	templateUrl: "./tax-category-rate-dialog.component.html",
	styleUrls: ["./tax-category-rate-dialog.component.scss"]
})
export class TaxCategoryRateDialogComponent implements OnInit, AfterViewInit {
	taxRateForm: FormGroup;
	fulfillmentCenter: FormControl;
	jurisdiction: FormControl;
	rate: FormControl;

	data = null;
	mode = null;
	storeId = null;
	storeOwnerId = null;

	fulfillmentCenterSearchList: Array<any> = null;
	jurisdictionSearchList: Array<any> = null;

	selectedFulfillmentCenter = null;
	selectedJurisdiction = null;
	taxRate = null;

	@ViewChild("fulfillmentCenterInput") fulfillmentCenterInput: ElementRef<HTMLInputElement>;
	@ViewChild("rateInput") rateInput: ElementRef<HTMLInputElement>;

	private fulfillmentCenterIds: Array<number> = null;
	private getFulfillmentCentersSubscription: Subscription = null;
	private getJurisdictionsSubscription: Subscription = null;
	private fulfillmentCenterSearchString: Subject<string> = new Subject<string>();
	private jurisdictionSearchString: Subject<string> = new Subject<string>();

	constructor(
			private translateService: TranslateService,
			private alertService: AlertService,
			private shippingArrangementsService: ShippingArrangementsService,
			private fulfillmentCentersService: FulfillmentCentersService,
			private jurisdictionGroupsService: JurisdictionGroupsService,
			private jurisdictionGroupRelationshipsService: JurisdictionGroupRelationshipsService,
			private jurisdictionsService: JurisdictionsService,
			private taxCategoryMainService: TaxCategoryMainService,
			private dialogRef: MatDialogRef<TaxCategoryRateDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.data = data;
		this.mode = this.data.mode;
		this.storeOwnerId = this.data.storeOwnerId;
	}

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.data.taxRate) {
			this.fulfillmentCenter.setValue(this.data.taxRate.fulfillmentCenterName);
			this.jurisdiction.setValue(this.data.taxRate.jurisdictionGroupCode);
			this.rate.setValue(this.data.taxRate.rate.toString());
			this.taxRate = this.data.taxRate.rate;
		}
		if (this.taxCategoryMainService.taxCategoryData.storeId) {
			this.storeId = this.taxCategoryMainService.taxCategoryData.storeId;
		}
		if (this.mode === "create") {
			this.fulfillmentCenterSearchString.pipe(debounceTime(250)).subscribe(searchString => {
				this.getFulfillmentCenters(searchString);
			});
			this.initFulfillmentCenters();
			this.jurisdictionSearchString.pipe(debounceTime(250)).subscribe(searchString => {
				this.getJurisdictions(searchString);
			});
			this.searchJurisdictions("");
		}
	}

	ngAfterViewInit() {
		setTimeout(() => {
			if (this.mode === "edit") {
				this.rateInput.nativeElement.focus();
			} else {
				this.fulfillmentCenterInput.nativeElement.focus();
			}
		}, 250);
	}

	save() {
		this.taxRateForm.markAllAsTouched();
		this.alertService.clear();
		if (this.taxRateForm.valid) {
			let duplicate = false;
			if (this.mode === "create") {
				this.taxCategoryMainService.taxRates.forEach(taxRate => {
					if (taxRate.fulfillmentCenterId === this.selectedFulfillmentCenter.id &&
						taxRate.jurisdictionGroupId === this.selectedJurisdiction.id) {
						duplicate = true;
					}
				});
			}
			if (duplicate) {
				this.translateService.get("TAX_CATEGORIES.DUPLICATE_TAX_RATE").subscribe((message: string) => {
					this.alertService.error({message});
				});
			} else {
				const taxRate = this.data.taxRate ? this.data.taxRate : {};
				if (this.mode === "create") {
					taxRate.fulfillmentCenterName = this.selectedFulfillmentCenter.name;
					taxRate.fulfillmentCenterId = this.selectedFulfillmentCenter.id;
					taxRate.jurisdictionGroupCode = this.selectedJurisdiction.code;
					taxRate.jurisdictionGroupId = this.selectedJurisdiction.id;
					taxRate.precedence = 0;
				}
				taxRate.rate = this.taxRate;
				if (this.mode === "edit") {
					this.dialogRef.close(taxRate);
				} else {
					this.jurisdictionGroupRelationshipsService.getJurisdictionGroupRelationships({
						jurisdictionGroupId: taxRate.jurisdictionGroupId
					}).subscribe(response => {
						if (response.items.length === 1) {
							this.jurisdictionsService.getJurisdictionById({
								id: response.items[0].jurisdictionId
							}).subscribe(jurisdiction => {
								if (jurisdiction.state) {
									taxRate.precedence = 2;
								}
								this.dialogRef.close(taxRate);
							});
						} else {
							this.dialogRef.close(taxRate);
						}
					});
				}
			}
		} else {
			this.taxRateForm.markAllAsTouched();
			this.translateService.get("TAX_CATEGORIES.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	cancel() {
		this.alertService.clear();
		this.dialogRef.close();
	}

	searchFulfillmentCenters(searchString: string) {
		this.fulfillmentCenterSearchString.next(searchString);
	}

	searchJurisdictions(searchString: string) {
		this.jurisdictionSearchString.next(searchString);
	}

	getFulfillmentCenters(searchString: string) {
		if (this.fulfillmentCenterIds) {
			if (this.getFulfillmentCentersSubscription != null) {
				this.getFulfillmentCentersSubscription.unsubscribe();
				this.getFulfillmentCentersSubscription = null;
			}
			this.getFulfillmentCentersSubscription = this.fulfillmentCentersService.getFulfillmentCenters({
				id: this.fulfillmentCenterIds,
				searchString,
				memberId: this.storeOwnerId,
				limit: 10
			}).subscribe(response => {
		 		this.getFulfillmentCentersSubscription = null;
		 		if (response.items.length === 1) {
		 			this.selectFulfillmentCenter(response.items[0]);
		 		} else {
		 			this.fulfillmentCenterSearchList = response.items;
		 		}
			},
			error => {
				this.getFulfillmentCentersSubscription = null;
			});
		}
	}

	selectFulfillmentCenter(fulfillmentCenter: any) {
		this.selectedFulfillmentCenter = fulfillmentCenter;
		this.fulfillmentCenter.setValue(fulfillmentCenter.name);
	}

	getJurisdictions(searchString: string) {
		if (this.getJurisdictionsSubscription != null) {
			this.getJurisdictionsSubscription.unsubscribe();
			this.getJurisdictionsSubscription = null;
		}
		this.getJurisdictionsSubscription = this.jurisdictionGroupsService.getJurisdictionGroups({
			storeId: this.storeId,
			subclass: 2,
			searchString,
			limit: 10
		}).subscribe(response => {
	 		this.getJurisdictionsSubscription = null;
	 		if (response.items.length === 1 && response.items[0].code === searchString) {
	 			this.selectJurisdiction(response.items[0]);
	 		} else {
	 			this.jurisdictionSearchList = response.items;
	 		}
		},
		error => {
			this.getJurisdictionsSubscription = null;
		});
	}

	selectJurisdiction(jurisdiction: any) {
		this.selectedJurisdiction = jurisdiction;
		this.jurisdiction.setValue(jurisdiction.code);
	}

	validateTaxRate() {
		this.taxRate = Number(this.rate.value);
	}

	private createFormControls() {
		if (this.mode === "create") {
			this.fulfillmentCenter = new FormControl("", [Validators.required, control => {
				const value = control.value;
				let errors = null;
				if (value !== "" && (this.selectedFulfillmentCenter === null ||
						value !== this.selectedFulfillmentCenter.name)) {
					errors = {
						invalidFulfillmentCenter: true
					};
				}
				return errors;
			}]);
			this.jurisdiction = new FormControl("", [Validators.required, control => {
				const value = control.value;
				let errors = null;
				if (value !== "" && (this.selectedJurisdiction === null ||
						value !== this.selectedJurisdiction.code)) {
					errors = {
						invalidJurisdiction: true
					};
				}
				return errors;
			}]);
		} else {
			this.fulfillmentCenter = new FormControl({value: "", disabled: true});
			this.jurisdiction = new FormControl({value: "", disabled: true});
		}
		this.rate = new FormControl("", [HcValidators.required,
			Validators.min(0),
			Validators.maxLength(15),
			control => {
				let errors = null;
				const trimmedValue: string = control.value.toString().trim();
				if (control.value !== null && trimmedValue !== "" && isNaN(control.value)) {
					errors = {
						invalidRate: true
					};
				}
				return errors;
			}
		]);
	}

	private createForm() {
		this.taxRateForm = new FormGroup({
			fulfillmentCenter: this.fulfillmentCenter,
			jurisdiction: this.jurisdiction,
			rate: this.rate
		});
	}

	private initFulfillmentCenters() {
		this.shippingArrangementsService.getShippingArrangements({
			storeId: this.storeId
		}).subscribe(response => {
			const fulfillmentCenterIds = [];
			response.items.forEach(item => {
				fulfillmentCenterIds.push(item.fulfillmentCenterId);
			});
			this.fulfillmentCenterIds = fulfillmentCenterIds;
			this.searchFulfillmentCenters(this.fulfillmentCenter.value);
		});
	}
}
