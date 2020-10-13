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
import { Component, OnInit, Inject, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../../services/alert.service";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FulfillmentCentersService } from "../../../../rest/services/fulfillment-centers.service";
import { ShippingArrangementsService } from "../../../../rest/services/shipping-arrangements.service";
import { JurisdictionGroupsService } from "../../../../rest/services/jurisdiction-groups.service";
import { ShippingModesService } from "../../../../rest/services/shipping-modes.service";
import { HcValidators } from "../../../../shared/validators";

@Component({
	templateUrl: "./shipping-charge-fulfillment-option-dialog.component.html",
	styleUrls: ["./shipping-charge-fulfillment-option-dialog.component.scss"]
})
export class ShippingChargeFulfillmentOptionDialogComponent implements OnInit, AfterViewInit, OnDestroy {
	fulfillmentOptionForm: FormGroup;
	fulfillmentCenter: FormControl;
	jurisdiction: FormControl;
	shippingMode: FormControl;
	precedence: FormControl;

	data = null;
	storeId = null;
	storeOwnerId = null;

	fulfillmentCenters = [];
	filfullmentCenterSearchString = "";
	getFulfillmentCenterSubscription: Subscription = null;
	fulfillmentCenterCount = 0;
	fulfillmentCentersLoading = false;
	selectedFulfillmentCenterId = null;

	jurisdictions = [];
	jurisdictionSearchString = "";
	getJurisdictionsSubscription: Subscription = null;
	jurisdictionCount = 0;
	jurisdictionsLoading = false;
	selectedJurisdictionGroupId = null;

	shippingModes = [];
	shippingModesSearchString = "";
	getshippingModesSubscription: Subscription = null;
	shippingModesCount = 0;
	shippingModesLoading = false;
	selectedShippingModeId = null;
	selectedShippingModeCarrier = null;
	selectedShippingModeService = null;

	@ViewChild("fulfillmentCenterInput", {static: false}) fulfillmentCenterInput: ElementRef<HTMLInputElement>;

	private fulfillmentCenterSearchString$: Subject<string> = new Subject<string>();
	private fulfillmentCenterIds: Array<number> = null;
	private jurisdictionSearchString$: Subject<string> = new Subject<string>();
	private shippingModesSearchString$: Subject<string> = new Subject<string>();

	constructor(
			private translateService: TranslateService,
			private alertService: AlertService,
			private dialogRef: MatDialogRef<ShippingChargeFulfillmentOptionDialogComponent>,
			private fulfillmentCentersService: FulfillmentCentersService,
			private shippingArrangementsService: ShippingArrangementsService,
			private jurisdictionGroupsService: JurisdictionGroupsService,
			private shippingModesService: ShippingModesService,
			@Inject(MAT_DIALOG_DATA) data) {
		this.data = data;
		this.storeId = this.data.storeId;
		this.storeOwnerId = this.data.storeOwnerId;
	}

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.data) {
			if (this.data.fulfillmentOption) {
				const fulfillmentOption = this.data.fulfillmentOption;
				this.selectedFulfillmentCenterId = fulfillmentOption.fulfillmentCenterId;
				this.fulfillmentCenter.setValue(fulfillmentOption.fulfillmentCenterName);
				this.selectedJurisdictionGroupId = fulfillmentOption.jurisdictionGroupId;
				this.jurisdiction.setValue(fulfillmentOption.jurisdictionGroupCode);
				this.selectedShippingModeId = fulfillmentOption.shippingModeId;
				this.selectedShippingModeCarrier = fulfillmentOption.shippingModeCarrier;
				this.selectedShippingModeService = fulfillmentOption.shippingModeService;
				this.shippingMode.setValue(fulfillmentOption.shippingModeCarrier + " - " + fulfillmentOption.shippingModeService);
				this.precedence.setValue(fulfillmentOption.precedence.toString());
			}
		}
		this.initFulfillmentCenters();
		this.fulfillmentCenterSearchString$.pipe(debounceTime(250)).subscribe(searchString => {
			this.fulfillmentCenters = [];
			this.filfullmentCenterSearchString = searchString;
			this.fulfillmentCenterCount = 0;
			this.getFulfillmentCenters();
		});
		this.jurisdictionSearchString$.pipe(debounceTime(250)).subscribe(searchString => {
			this.jurisdictions = [];
			this.jurisdictionSearchString = searchString;
			this.jurisdictionCount = 0;
			this.getJurisdictions();
		});
		this.getJurisdictions();
		this.shippingModesSearchString$.pipe(debounceTime(250)).subscribe(searchString => {
			this.shippingModes = [];
			this.shippingModesSearchString = searchString;
			this.shippingModesCount = 0;
			this.getShippingModes();
		});
		this.getShippingModes();
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.fulfillmentCenterInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
	}

	save() {
		this.alertService.clear();
		this.fulfillmentOptionForm.markAllAsTouched();
		if (this.fulfillmentOptionForm.valid) {
			if (this.isDuplicateFulfillmentOption()) {
				this.translateService.get("SHIPPING_CHARGES.DUPLICATE_FULFILLMENT_OPTION_ERROR").subscribe((message: string) => {
					this.alertService.error({message});
				});
			} else {
				const fulfillmentOption = this.data.fulfillmentOption ? this.data.fulfillmentOption : {};
				fulfillmentOption.fulfillmentCenterId = this.selectedFulfillmentCenterId;
				fulfillmentOption.fulfillmentCenterName = this.fulfillmentCenter.value;
				fulfillmentOption.jurisdictionGroupId = this.selectedJurisdictionGroupId;
				fulfillmentOption.jurisdictionGroupCode = this.jurisdiction.value;
				fulfillmentOption.shippingModeId = this.selectedShippingModeId;
				fulfillmentOption.shippingModeCarrier = this.selectedShippingModeCarrier;
				fulfillmentOption.shippingModeService = this.selectedShippingModeService;
				fulfillmentOption.precedence = Number(this.precedence.value);
				this.dialogRef.close(fulfillmentOption);
			}
		} else {
			this.translateService.get("SHIPPING_CHARGES.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	cancel() {
		this.alertService.clear();
		this.dialogRef.close();
	}

	searchFulfillmentCenters(value) {
		this.selectedFulfillmentCenterId = null;
		this.fulfillmentCenterSearchString$.next(value);
	}

	selectFulfillmentCenter(fulfillmentCenter: any) {
		if (fulfillmentCenter) {
			this.selectedFulfillmentCenterId = fulfillmentCenter.id;
			this.fulfillmentCenter.setValue(fulfillmentCenter.name);
		}
	}

	loadMoreFulfillmentCenters() {
		if (this.fulfillmentCenters.length < this.fulfillmentCenterCount) {
			this.getFulfillmentCenters();
		}
	}

	searchJurisdictions(value) {
		this.selectedJurisdictionGroupId = null;
		this.jurisdictionSearchString$.next(value);
	}

	selectJurisdiction(jurisdiction: any) {
		if (jurisdiction) {
			this.selectedJurisdictionGroupId = jurisdiction.id;
			this.jurisdiction.setValue(jurisdiction.code);
		}
	}

	loadMoreJurisdictions() {
		if (this.jurisdictions.length < this.jurisdictionCount) {
			this.getJurisdictions();
		}
	}

	loadMoreShippingModes() {
		if (this.shippingModes.length < this.shippingModesCount) {
			this.getShippingModes();
		}
	}

	searchShippingModes(value) {
		this.selectedShippingModeId = null;
		this.selectedShippingModeCarrier = null;
		this.selectedShippingModeService = null;
		this.shippingModesSearchString$.next(value);
	}

	selectShippingMode(shippingMode: any) {
		if (shippingMode) {
			this.selectedShippingModeId = shippingMode.id;
			this.selectedShippingModeCarrier = shippingMode.carrier;
			this.selectedShippingModeService = shippingMode.shippingCode;
			this.shippingMode.setValue(shippingMode.carrier + " - " + shippingMode.shippingCode);
		}
	}

	private getFulfillmentCenters() {
		if (this.fulfillmentCenterIds) {
			this.fulfillmentCentersLoading = true;
			const searchString = this.filfullmentCenterSearchString;
			if (this.getFulfillmentCenterSubscription) {
				this.getFulfillmentCenterSubscription.unsubscribe();
				this.getFulfillmentCenterSubscription = null;
			}
			this.getFulfillmentCenterSubscription = this.fulfillmentCentersService.getFulfillmentCenters({
				id: this.fulfillmentCenterIds,
				searchString,
				memberId: this.storeOwnerId,
				limit: 10,
				offset: this.fulfillmentCenters.length
			}).subscribe(response => {
				if (this.fulfillmentCenters.length === 0 && response.items.length === 1 && response.items[0].name === searchString) {
					this.selectFulfillmentCenter(response.items[0]);
				} else {
					this.fulfillmentCenters = [ ...this.fulfillmentCenters, ...response.items];
				}
				this.getFulfillmentCenterSubscription = null;
				this.fulfillmentCenterCount = response.count;
				this.fulfillmentCentersLoading = false;
			},
			error => {
				this.getFulfillmentCenterSubscription = null;
				this.fulfillmentCentersLoading = false;
			});
		}
	}

	private getJurisdictions() {
		this.jurisdictionsLoading = true;
		const searchString = this.jurisdictionSearchString;
		if (this.getJurisdictionsSubscription) {
			this.getJurisdictionsSubscription.unsubscribe();
			this.getJurisdictionsSubscription = null;
		}
		this.getJurisdictionsSubscription = this.jurisdictionGroupsService.getJurisdictionGroups({
			searchString,
			storeId: this.storeId,
			subclass: 1,
			limit: 10,
			offset: this.jurisdictions.length
		}).subscribe(
			response => {
				if (this.jurisdictions.length === 0 && response.items.length === 1 && response.items[0].description === searchString) {
					this.selectJurisdiction(response.items[0]);
				} else {
					this.jurisdictions = [ ...this.jurisdictions, ...response.items];
				}
				this.getJurisdictionsSubscription = null;
				this.jurisdictionCount = response.count;
				this.jurisdictionsLoading = false;
			},
			error => {
				this.getJurisdictionsSubscription = null;
				this.jurisdictionsLoading = false;
			}
		);

	}

	private getShippingModes() {
		this.shippingModesLoading = true;
		const searchString = this.shippingModesSearchString;
		if (this.getshippingModesSubscription) {
			this.getshippingModesSubscription.unsubscribe();
			this.getshippingModesSubscription = null;
		}
		this.getshippingModesSubscription = this.shippingModesService.getShippingModes({
			searchString,
			storeId: this.storeId,
			limit: 10,
			offset: this.shippingModes.length
		}).subscribe(
			response => {
				if (this.shippingModes.length === 0 && response.items.length === 1 && response.items[0].carrier === searchString) {
					this.selectShippingMode(response.items[0]);
				} else {
					this.shippingModes = [ ...this.shippingModes, ...response.items];
				}
				this.getshippingModesSubscription = null;
				this.shippingModesCount = response.count;
				this.shippingModesLoading = false;
			},
			error => {
				this.getshippingModesSubscription = null;
				this.shippingModesLoading = false;
			}
		);

	}

	private isDuplicateFulfillmentOption() {
		let isDuplicateFulfillmentOption = false;
		if (this.data && this.data.fulfillmentOptions) {
			isDuplicateFulfillmentOption = this.data.fulfillmentOptions.some(fulfillmentOption => {
				return fulfillmentOption.fulfillmentCenterId === this.selectedFulfillmentCenterId &&
						fulfillmentOption.jurisdictionGroupId === this.selectedJurisdictionGroupId &&
						fulfillmentOption.shippingModeId === this.selectedShippingModeId &&
						fulfillmentOption !== this.data.fulfillmentOption;
			});
		}
		return isDuplicateFulfillmentOption;
	}

	private createFormControls() {
		this.fulfillmentCenter = new FormControl("", [Validators.required, fulfillmentCenter => {
			let errors = null;
			if (fulfillmentCenter.value !== "" && this.selectedFulfillmentCenterId === null) {
				errors = {
					invalidFulfillmentCenter: true
				};
			}
			return errors;
		}]);
		this.jurisdiction = new FormControl("", [Validators.required, jurisdiction => {
			let errors = null;
			if (jurisdiction.value !== "" && this.selectedJurisdictionGroupId === null) {
				errors = {
					invalidJurisdiction: true
				};
			}
			return errors;
		}]);
		this.shippingMode = new FormControl("", [Validators.required, shippingMode => {
			let errors = null;
			if (shippingMode.value !== "" && this.selectedShippingModeId === null) {
				errors = {
					invalidShippingMode: true
				};
			}
			return errors;
		}]);
		this.precedence = new FormControl("1", [HcValidators.required, precedence => {
			let errors = null;
			if (precedence.value !== "" && precedence.value !== null && isNaN(precedence.value)) {
				errors = {
					invalidPrecedence: true
				};
			}
			return errors;
		}]);
	}

	private createForm() {
		this.fulfillmentOptionForm = new FormGroup({
			fulfillmentCenter: this.fulfillmentCenter,
			jurisdiction: this.jurisdiction,
			shippingMode: this.shippingMode,
			precedence: this.precedence
		});
	}

	private initFulfillmentCenters() {
		this.fulfillmentCentersLoading = true;
		this.shippingArrangementsService.getShippingArrangements({
			storeId: this.storeId
		}).subscribe(response => {
			const fulfillmentCenterIds = [];
			response.items.forEach(item => {
				fulfillmentCenterIds.push(item.fulfillmentCenterId);
			});
			this.fulfillmentCenterIds = fulfillmentCenterIds;
			this.getFulfillmentCenters();
		});
	}
}
