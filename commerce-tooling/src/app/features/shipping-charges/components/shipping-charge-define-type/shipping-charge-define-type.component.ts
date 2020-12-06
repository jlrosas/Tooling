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
import { MatStep, MatStepper } from "@angular/material/stepper";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HcValidators } from "../../../../shared/validators";
import { ActivatedRoute } from "@angular/router";
import { Subscription, Subject, Observable } from "rxjs";
import { ShippingChargeMainService, ShippingChargeRange } from "../../services/shipping-charge-main.service";
import { AlertService } from "../../../../services/alert.service";
import { LanguageService } from "../../../../services/language.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { QuantityUnitsService } from "../../../../rest/services/quantity-units.service";
import { CalculationScalesService } from "../../../../rest/services/calculation-scales.service";
import { QuantityUnitDescriptionsService } from "../../../../rest/services/quantity-unit-descriptions.service";
import { DataSource } from "@angular/cdk/table";
import { MatDialog } from "@angular/material";
import { ShippingChargeRangeDialogComponent } from "../shipping-charge-range-dialog/shipping-charge-range-dialog.component";
import { CurrencyService } from "../../../../services/currency.service";

@Component({
	selector: "hc-shipping-charge-define-type",
	templateUrl: "./shipping-charge-define-type.component.html",
	styleUrls: ["./shipping-charge-define-type.component.scss"]
})
export class ShippingChargeDefineTypeComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();
	unitOfMeasure: FormControl;
	currency: FormControl;
	fixedCharge: FormControl;
	chargeType: string;
	currencies = [];
	defaultCurrency = null;
	unitsOfMeasure = [];
	unitOfMeasureDescriptions = {};

	chargeTypeForm: FormGroup | any;
	@ViewChild("stepper") stepper: MatStepper;
	displayedColumns: string[] = ["range", "charge", "actions"];
	listSearchForm: FormGroup | any;
	model = new ShippingChargeRangeDataSource();
	preferenceToken: string;
	languageList = {};
	private onLanguageChangeSubscription: Subscription = null;
	private savedRanges = null;

	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};

	constructor(private route: ActivatedRoute,
			private shippingChargeMainService: ShippingChargeMainService,
			private onlineStoresService: OnlineStoresService,
			private quantityUnitsService: QuantityUnitsService,
			private quantityUnitDescriptionsService: QuantityUnitDescriptionsService,
			private languageService: LanguageService,
			private currencyService: CurrencyService,
			private calculationScalesService: CalculationScalesService,
			private alertService: AlertService,
			private dialog: MatDialog) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		this.onlineStoresService.getOnlineStoreCurrencies(Number(this.route.snapshot.params.storeId)).subscribe(response => {
			this.currencies = response.currencies;
			this.defaultCurrency = response.defaultCurrency;
			this.initCurrency();
			if (this.currencies && this.currencies.length === 0) {
				this.onlineStoresService.getOnlineStoreCurrencies(0).subscribe(store0 => {
					this.currencies = store0.currencies;
					if (!this.defaultCurrency && store0.defaultCurrency) {
						this.defaultCurrency = store0.defaultCurrency;
						this.initCurrency();
					}
				});
			}
		});
		this.quantityUnitsService.getQuantityUnits({}).subscribe (response => {
			this.unitsOfMeasure = response.items;
		});
		this.getUnitsOfMeasureDescriptions();
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.getUnitsOfMeasureDescriptions();
		});

		if (this.mode === "edit") {
			this.shippingChargeMainService.loadCurrentRanges(Number(this.route.snapshot.params.id)).subscribe(response => {
				this.setValues();
			});
		} else {
			this.setValues();
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.chargeTypeForm;
	}

	ngOnDestroy() {
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	triggerSave() {
		this.chargeTypeForm.markAllAsTouched();
		this.save.emit(null);
	}

	validateChargeType($event) {
		this.chargeType = $event.value;
		if (this.chargeType === "fixed") {
			this.shippingChargeMainService.shippingChargeData.scaleLookupMethod = -28;
			this.shippingChargeMainService.shippingChargeData.unitOfMeasure = null;
			this.fixedCharge.enable();
			this.unitOfMeasure.disable();
			if (this.shippingChargeMainService.ranges.length > 1) {
				this.savedRanges = this.shippingChargeMainService.ranges.splice(1);
			} else if (this.shippingChargeMainService.ranges.length === 0) {
				this.shippingChargeMainService.ranges = [{
					rangeStart: 0,
					value: null
				}];
			}
			if (this.shippingChargeMainService.ranges.length === 1) {
				const value = this.shippingChargeMainService.ranges[0].value;
				this.fixedCharge.setValue(value !== null ? value.toString() : "");
			}
		} else if (this.chargeType === "byQuantity") {
			this.shippingChargeMainService.shippingChargeData.scaleLookupMethod = -28;
			this.shippingChargeMainService.shippingChargeData.unitOfMeasure = "C62";
			this.fixedCharge.disable();
			this.unitOfMeasure.disable();
			if (this.savedRanges) {
				this.shippingChargeMainService.ranges = this.shippingChargeMainService.ranges.concat(this.savedRanges);
				this.savedRanges = null;
			} else if (this.shippingChargeMainService.ranges.length === 1 &&
					this.shippingChargeMainService.ranges[0].value === null) {
				this.shippingChargeMainService.ranges = [];
			}
			this.model.setData(this.shippingChargeMainService.ranges);
		} else if (this.chargeType === "byWeight") {
			this.shippingChargeMainService.shippingChargeData.scaleLookupMethod = -29;
			this.shippingChargeMainService.shippingChargeData.unitOfMeasure = this.unitOfMeasure.value ? this.unitOfMeasure.value : null;
			this.fixedCharge.disable();
			this.unitOfMeasure.enable();
			if (this.savedRanges) {
				this.shippingChargeMainService.ranges = this.shippingChargeMainService.ranges.concat(this.savedRanges);
				this.savedRanges = null;
			} else if (this.shippingChargeMainService.ranges.length === 1 &&
					this.shippingChargeMainService.ranges[0].value === null) {
				this.shippingChargeMainService.ranges = [];
			}
			this.model.setData(this.shippingChargeMainService.ranges);
		}
	}

	createRange() {
		const dialogRef = this.dialog.open(ShippingChargeRangeDialogComponent, {
			...this.dialogConfig,
			data: {
				mode: "create",
				chargeType: this.chargeType,
				currency: this.shippingChargeMainService.shippingChargeData.currency,
				currentRanges: this.shippingChargeMainService.ranges
			}
		});
		dialogRef.afterClosed().subscribe((range: ShippingChargeRange) => {
			if (range) {
				this.model.setData(this.shippingChargeMainService.ranges);
			}
		});
	}

	getRangeEnd(index: number) {
		let rangeEnd = null;
		if (this.shippingChargeMainService.ranges && this.shippingChargeMainService.ranges.length > (index + 1)) {
			if (this.chargeType === "byQuantity") {
				rangeEnd = this.shippingChargeMainService.ranges[index + 1].rangeStart - 1;
			} else {
				rangeEnd = this.shippingChargeMainService.ranges[index + 1].rangeStart - 0.00001;
			}
		}
		return rangeEnd;
	}

	getFormattedValue(range: ShippingChargeRange) {
		const currency = this.shippingChargeMainService.shippingChargeData.currency;
		return range.value.toFixed(this.currencyService.getCurrencyDecimalPlaces(currency));
	}

	editRange(range: ShippingChargeRange) {
		const dialogRef = this.dialog.open(ShippingChargeRangeDialogComponent, {
			...this.dialogConfig,
			data: {
				mode: "edit",
				range,
				chargeType: this.chargeType,
				currency: this.shippingChargeMainService.shippingChargeData.currency,
				currentRanges: this.shippingChargeMainService.ranges
			}
		});
		dialogRef.afterClosed().subscribe((modifiedRange: ShippingChargeRange) => {
			if (modifiedRange) {
				this.model.setData(this.shippingChargeMainService.ranges);
			}
		});
	}

	deleteRange(range) {
		const index = this.shippingChargeMainService.ranges.indexOf(range);
		if (index >= 0) {
			this.shippingChargeMainService.ranges.splice(index, 1);
			this.model.setData(this.shippingChargeMainService.ranges);
		}
	}

	validateShippingChargeUnit(value: any) {
		this.shippingChargeMainService.shippingChargeData.unitOfMeasure = value;
	}

	validateShippingChargeCurrency(value: any) {
		this.shippingChargeMainService.shippingChargeData.currency = value;
	}

	validateFixedCharge() {
		this.savedRanges = null;
		if (this.fixedCharge.valid) {
			this.shippingChargeMainService.ranges[0].value = Number(this.fixedCharge.value);
		} else {
			this.shippingChargeMainService.ranges[0].value = null;
		}
	}

	private getUnitsOfMeasureDescriptions() {
		this.quantityUnitDescriptionsService.getQuantityUnitDescriptions({ languageId: LanguageService.languageId }).subscribe(response => {
			if (response.items && response.items.length > 0) {
				response.items.forEach(item => {
					this.unitOfMeasureDescriptions[item.quantityUnitId] = item.description;
				});
			}
		});
	}

	private setValues() {
		const shippingChargeData = this.shippingChargeMainService.shippingChargeData;
		let ranges = this.shippingChargeMainService.ranges;
		if (!ranges || ranges.length === 0) {
			ranges = [];
			this.shippingChargeMainService.ranges = ranges;
		}
		if (shippingChargeData) {
			if (shippingChargeData.scaleLookupMethod === -28 && shippingChargeData.unitOfMeasure === null) {
				if (ranges.length === 0) {
					this.shippingChargeMainService.ranges = [{
						rangeStart: 0,
						value: null
					}];
				}
				this.chargeType = "fixed";
				const value = this.shippingChargeMainService.ranges[0].value;
				this.fixedCharge.setValue(value !== null ? value.toString() : "");
				this.fixedCharge.enable();
			} else if (shippingChargeData.scaleLookupMethod === -29) {
				this.chargeType = "byWeight";
				this.unitOfMeasure.setValue(shippingChargeData.unitOfMeasure);
				this.unitOfMeasure.enable();
			} else if (shippingChargeData.scaleLookupMethod === -28 && shippingChargeData.unitOfMeasure === "C62") {
				this.chargeType = "byQuantity";
			}
			this.currency.setValue(shippingChargeData.currency);
		} else {
			this.shippingChargeMainService.shippingChargeData = {
				shippingCodeId: Number(this.route.snapshot.params.shippingCodeId),
				storeId: Number(this.route.snapshot.params.storeId),
				startDate: new Date(1900, 0).toISOString(),
				endDate: new Date(2100, 0).toISOString()
			};
			this.initCurrency();
		}
		this.model.setData(this.shippingChargeMainService.ranges);
	}

	private createFormControls() {
		this.unitOfMeasure = new FormControl({value: "", disabled: true}, Validators.required);
		this.currency = new FormControl("", Validators.required);
		this.fixedCharge = new FormControl({value: "", disabled: true}, [
			HcValidators.required,
			control => {
				let errors = null;
				const trimmedValue: string = control.value.toString().trim();
				const numericValue = Number(trimmedValue);
				if (trimmedValue !== "" && (isNaN(numericValue) || numericValue < 0)) {
					errors = {
						invalidCharge: true
					};
				}
				return errors;
			}
		]);
	}

	private createForm() {
		this.chargeTypeForm = new FormGroup({
			unitOfMeasure: this.unitOfMeasure,
			currency: this.currency,
			fixedCharge: this.fixedCharge
		});
	}

	private initCurrency() {
		const shippingChargeData = this.shippingChargeMainService.shippingChargeData;
		if (this.mode === "create" && this.defaultCurrency && shippingChargeData && !shippingChargeData.currency) {
			this.currency.setValue(this.defaultCurrency);
			shippingChargeData.currency = this.defaultCurrency;
		}
	}
}

/**
 * Data source to provide data to be rendered in the table.
 */
class ShippingChargeRangeDataSource extends DataSource<ShippingChargeRange> {
	private ranges$: Subject<ShippingChargeRange[]> = new Subject<ShippingChargeRange[]>();

	setData(ranges: ShippingChargeRange[]) {
		ranges.sort((range1, range2) => {
			let result = 0;
			if (range1.rangeStart < range2.rangeStart) {
				result = -1;
			} else if (range1.rangeStart > range2.rangeStart) {
				result = 1;
			}
			return result;
		});
		setTimeout(() => {
			this.ranges$.next(ranges);
		}, 0);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<ShippingChargeRange[]> {
		return this.ranges$.asObservable();
	}

	disconnect() {}
}
