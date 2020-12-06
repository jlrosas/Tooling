/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, Subscription, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { MatDialog } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { CalculationScalesService } from "../../../../rest/services/calculation-scales.service";
import { CalculationRulesService } from "../../../../rest/services/calculation-rules.service";
import { CalculationRuleScalesService } from "../../../../rest/services/calculation-rule-scales.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import { LanguageService } from "../../../../services/language.service";
import { CalculationCodesService } from "../../../../rest/services/calculation-codes.service";
import { AlertService } from "../../../../services/alert.service";
import { DeleteShippingChargeDialogComponent } from "../delete-shipping-charge-dialog/delete-shipping-charge-dialog.component";
import { QuantityUnitsService } from "../../../../rest/services/quantity-units.service";
import { QuantityUnitDescriptionsService } from "../../../../rest/services/quantity-unit-descriptions.service";

@Component({
	templateUrl: "./shipping-charge-list.component.html",
	styleUrls: ["./shipping-charge-list.component.scss"]
})
export class ShippingChargeListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	listSearchForm: FormGroup;
	searchText: FormControl;
	unit: FormControl;
	chargesType: FormControl;

	currentSearchString = null;
	chargesTypeFilter = null;
	unitFilter = null;
	unitList = [];
	unitOfMeasureDescriptions = {};
	showFilters = false;
	responsiveCols = 12;
	displayedColumns: string[] = [
		"name",
		"description",
		"startDate",
		"endDate",
		"chargesType",
		"unit",
		"actions"
	];
	model = new ShippingChargeDataSource();

	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "name";
	sortDirection = "asc";
	pageIndex = 0;

	storeId: number;
	shippingCodeId: number;
	shippingCodeStoreId: number;
	shippingCodeName: string;

	private getShippingChargesSubscription: Subscription = null;
	private onLanguageChangeSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private chargesTypeKeys = {
		"byQuantity": "SHIPPING_CHARGES.BY_QUANTITY",
		"byWeight": "SHIPPING_CHARGES.BY_WEIGHT",
		"fixed": "SHIPPING_CHARGES.FIXED"
	};
	private chargesTypeIndices = Object.keys(this.chargesTypeKeys);
	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};
	private shippingCharges: Array<ShippingCharge> = [];

	constructor(private router: Router,
			private route: ActivatedRoute,
			private calculationScalesService: CalculationScalesService,
			private calculationRulesService: CalculationRulesService,
			private calculationRuleScalesService: CalculationRuleScalesService,
			private dialog: MatDialog,
			private languageService: LanguageService,
			private calculationCodesService: CalculationCodesService,
			private quantityUnitsService: QuantityUnitsService,
			private quantityUnitDescriptionsService: QuantityUnitDescriptionsService,
			private preferenceService: PreferenceService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	ngOnInit() {
		this.shippingCodeId = Number(this.route.snapshot.params.shippingCodeId);
		this.storeId = Number(this.route.snapshot.params.storeId);
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.calculationCodesService.getCalculationCodeById({
			id: Number(this.route.snapshot.params.shippingCodeId)
		}).subscribe(response => {
			this.shippingCodeName = response.calculationCode;
			this.shippingCodeStoreId = response.storeId;
		});
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchString = searchString;
			this.pageIndex = 0;
			this.displayShippingCharges();
		});
		this.quantityUnitsService.getQuantityUnits({}).subscribe(response => {
			this.unitList = response.items;
		});
		this.getUnitsOfMeasureDescriptions();
		this.onLanguageChangeSubscription = this.languageService.onLanguageChange.subscribe(() => {
			this.getUnitsOfMeasureDescriptions();
		});
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(sort => {
			this.pageIndex = 0;
			this.displayShippingCharges();
		});
		this.getShippingCharges();
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
		if (this.getShippingChargesSubscription) {
			this.getShippingChargesSubscription.unsubscribe();
		}
		if (this.onLanguageChangeSubscription) {
			this.onLanguageChangeSubscription.unsubscribe();
		}
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this.displayShippingCharges();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.pageIndex = 0;
		this.displayShippingCharges();
	}

	selectChargesType(chargesType) {
		if (this.chargesTypeFilter !== chargesType) {
			this.chargesTypeFilter = chargesType;
			this.pageIndex = 0;
			this.displayShippingCharges();
		}
	}

	clearChargesType($event) {
		this.chargesTypeFilter = null;
		this.chargesType.setValue(null);
		this.pageIndex = 0;
		this.displayShippingCharges();
		$event.stopPropagation();
	}

	selectUnit(unit) {
		if (this.unitFilter !== unit) {
			this.unitFilter = unit;
			this.pageIndex = 0;
			this.displayShippingCharges();
		}
	}

	clearUnit($event) {
		this.unitFilter = null;
		this.unit.setValue(null);
		this.pageIndex = 0;
		this.displayShippingCharges();
		$event.stopPropagation();
	}

	searchShippingCharges(searchString: string) {
		this.searchString.next(searchString);
	}

	createShippingCharge() {
		this.router.navigate(["shipping-charges/create-shipping-charge", {
			storeId: this.storeId,
			shippingCodeId: this.shippingCodeId
		}]);
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	deleteShippingCharge(shippingCharge: any) {
		const { calculationRuleId, calculationScaleId, name } = shippingCharge;
		const dialogRef = this.dialog.open(DeleteShippingChargeDialogComponent, {
			...this.dialogConfig,
			data: {
				calculationRuleId,
				calculationScaleId,
				name
			}
		});
		dialogRef.afterClosed().subscribe(data => {
			if (data && data.shippingChargeDeleted) {
				this.getShippingCharges();
			}
		});
	}

	refreshShippingCharges() {
		this.getShippingCharges();
	}

	private getUnitsOfMeasureDescriptions() {
		this.quantityUnitDescriptionsService.getQuantityUnitDescriptions({
			languageId: LanguageService.languageId
		}).subscribe(response => {
			if (response.items && response.items.length > 0) {
				response.items.forEach(item => {
					this.unitOfMeasureDescriptions[item.quantityUnitId] = item.description;
				});
			}
		});
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
		this.chargesType = new FormControl(this.chargesTypeFilter);
		this.unit = new FormControl(this.unitFilter);
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
			chargesType: this.chargesType,
			unit: this.unit
		});
		this.listSearchForm = new FormGroup({
			searchText: this.searchText
		});
	}

	private getShippingCharges() {
		if (this.getShippingChargesSubscription != null) {
			this.getShippingChargesSubscription.unsubscribe();
			this.getShippingChargesSubscription = null;
		}
		this.getShippingChargesSubscription = this.calculationRulesService.getCalculationRules({
			calculationCodeId: this.shippingCodeId
		}).subscribe(body => {
			this.getShippingChargesSubscription.unsubscribe();
			this.getShippingChargesSubscription = null;
			const data: Array<ShippingCharge> = [];
			const calculationRuleIds: Array<number> = [];
			body.items.forEach(calculationRule => {
				calculationRuleIds.push(calculationRule.id);
				let startDate = calculationRule.startDate ? new Date(calculationRule.startDate) : null;
				if (startDate && startDate.getFullYear() === 1900) {
					startDate = null;
				}
				let endDate = calculationRule.endDate ? new Date(calculationRule.endDate) : null;
				if (endDate && endDate.getFullYear() === 2100) {
					endDate = null;
				}
				data.push({
					calculationRuleId: calculationRule.id,
					name: "",
					description: "",
					startDate,
					endDate,
					chargesType: "",
					unitOfMeasure: ""
				});
			});
			if (calculationRuleIds.length > 0) {
				this.getShippingChargesSubscription = this.calculationRuleScalesService.getCalculationRuleScales({
					calculationRuleId: calculationRuleIds
				}).subscribe(body2 => {
					this.getShippingChargesSubscription.unsubscribe();
					this.getShippingChargesSubscription = null;
					const calculationScaleIds: Array<number> = [];
					body2.items.forEach(calculationRuleScale => {
						calculationScaleIds.push(calculationRuleScale.calculationScaleId);
						for (let i = 0; i < data.length; i++) {
							if (data[i].calculationRuleId === calculationRuleScale.calculationRuleId) {
								data[i].calculationScaleId = calculationRuleScale.calculationScaleId;
								break;
							}
						}
					});
					if (calculationScaleIds.length > 0) {
						this.getShippingChargesSubscription = this.calculationScalesService.getCalculationScales({
							id: calculationScaleIds
						}).subscribe((body3: any) => {
							this.getShippingChargesSubscription.unsubscribe();
							this.getShippingChargesSubscription = null;
							body3.items.forEach(calculationScale => {
								for (let i = 0; i < data.length; i++) {
									if (data[i].calculationScaleId === calculationScale.id) {
										data[i].name = calculationScale.scaleCode ? calculationScale.scaleCode : "";
										data[i].description = calculationScale.scaleDescription ? calculationScale.scaleDescription : "";
										data[i].unitOfMeasure = null;
										if (calculationScale.scaleLookupMethod === -28) {
											if (calculationScale.unitOfMeasure === "C62") {
												data[i].chargesType = "byQuantity";
											} else {
												data[i].chargesType = "fixed";
											}
										} else if (calculationScale.scaleLookupMethod === -29) {
											data[i].chargesType = "byWeight";
											data[i].unitOfMeasure = calculationScale.unitOfMeasure;
										}
										break;
									}
								}
								this.shippingCharges = data;
								this.displayShippingCharges();
							});
						});
					} else {
						this.shippingCharges = data;
						this.displayShippingCharges();
					}
				});
			} else {
				this.shippingCharges = data;
				this.displayShippingCharges();
			}
		});
	}

	private displayShippingCharges() {
		this.preferenceService.save(this.preferenceToken, {
			searchString: this.currentSearchString,
			sort: this.sort,
			pageIndex: this.pageIndex,
			pageSize: this.pageSize,
			filter: {
				chargesTypeFilter: this.chargesTypeFilter,
				unitFilter: this.unitFilter
			}
		});
		let data = this.shippingCharges;
		if (this.currentSearchString) {
			const filterValue = this.currentSearchString.toLowerCase();
			data = data.filter(
				shippingCharge => shippingCharge.name.toLowerCase().indexOf(filterValue) >= 0 ||
						shippingCharge.description.toLowerCase().indexOf(filterValue) >= 0
			);
		}
		if (this.chargesTypeFilter) {
			data = data.filter(
				shippingCharge => shippingCharge.chargesType === this.chargesTypeFilter
			);
		}
		if (this.unitFilter) {
			data = data.filter(
				shippingCharge => shippingCharge.unitOfMeasure === this.unitFilter
			);
		}
		const sort = this.sort.active;
		data.sort((shippingCharge1, shippingCharge2) => {
			let result = 0;
			let value1: any = null;
			let value2: any = null;
			if (this.sort.direction === "desc") {
				value1 = shippingCharge2[sort];
				value2 = shippingCharge1[sort];
			} else {
				value1 = shippingCharge1[sort];
				value2 = shippingCharge2[sort];
			}
			if (typeof value1 === "string") {
				value1 = value1.toLowerCase();
			}
			if (typeof value2 === "string") {
				value2 = value2.toLowerCase();
			}
			if (value1 === null) {
				value1 = "";
			}
			if (value2 === null) {
				value2 = "";
			}
			if (value1 < value2) {
				result = -1;
			} else if (value1 > value2) {
				result = 1;
			}
			return result;
		});
		const offset = this.pageIndex * this.paginator.pageSize;
		const limit = this.paginator.pageSize;
		this.paginator.length = data.length;
		data = data.slice(offset, offset + limit);
		this.model.setData(data);
	}

	private getPreferenceData() {
		this.preferenceToken = "shipping-charge-list";
		const preference = this.preferenceService.get(this.preferenceToken);
		if (preference) {
			const {
				pageSize,
				sort,
				searchString,
				showFilters,
				filter,
				pageIndex
			} = preference;
			if (pageSize) {
				this.pageSize = pageSize;
			}
			if (sort) {
				this.sort = sort ? sort : this.sort;
				this.activeColumn = sort.active;
				this.sortDirection = sort.direction;
			}
			if (searchString) {
				this.currentSearchString = searchString;
			}
			if (showFilters) {
				this.showFilters = showFilters;
			}
			if (filter) {
				const {chargesTypeFilter, unitFilter} = filter;
				this.chargesTypeFilter = chargesTypeFilter;
				this.unitFilter = unitFilter;
			}
			if (pageIndex) {
				this.pageIndex = pageIndex;
			}
		}
	}
}

interface ShippingCharge {
	calculationRuleId: number;
	calculationScaleId?: number;
	name?: string;
	description?: string;
	startDate?: Date;
	endDate?: Date;
	chargesType?: string;
	unitOfMeasure?: string;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class ShippingChargeDataSource extends DataSource<ShippingCharge> {
	private shippingCharges$: Subject<ShippingCharge[]> = new Subject<ShippingCharge[]>();

	setData(shippingCharges: ShippingCharge[]) {
		this.shippingCharges$.next(shippingCharges);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<ShippingCharge[]> {
		return this.shippingCharges$.asObservable();
	}

	disconnect() {}
}
