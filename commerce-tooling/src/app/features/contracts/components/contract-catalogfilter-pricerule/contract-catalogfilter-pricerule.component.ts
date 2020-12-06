/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component,  OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../../services/alert.service";
import { MatStep, MatStepper } from "@angular/material";
import { ContractMainService } from "../../services/contract-main.service";
import { CatalogFiltersService } from "../../../../rest/services/catalog-filters.service";
import { PriceRulesService } from "../../../../rest/services/price-rules.service";
import { StoreNameService } from "../../../../services/store-name.service";

@Component({
	templateUrl: "./contract-catalogfilter-pricerule.component.html",
	styleUrls: ["./contract-catalogfilter-pricerule.component.scss"],
	selector: "hc-contract-filter-price"
})
export class ContractFilterPriceComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	filterPriceForm: any;
	catalogFilter: FormControl;
	priceRule: FormControl;

	catalogFilterList: Array<any> = [];
	getCatalogFiltersSubscription: Subscription = null;
	priceRuleList: Array<any> = [];
	getPriceRulesSubscription: Subscription = null;

	@ViewChild("catalogFilterInput") catalogFilterInput: ElementRef<HTMLInputElement>;

	private catalogFilterSearchString: Subject<string> = new Subject<string>();
	private priceRuleSearchString: Subject<string> = new Subject<string>();

	constructor(private router: Router,
			private route: ActivatedRoute,
			private contractMainService: ContractMainService,
			private alertService: AlertService,
			private translateService: TranslateService,
			private catalogFiltersService: CatalogFiltersService,
			private priceRulesService: PriceRulesService,
			private storeNameService: StoreNameService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.contractMainService.loadCurrentContract(this.route.snapshot.params.id).subscribe(response => {
				this.setValues();
			});
		} else {
			this.setValues();
		}
		this.catalogFilterSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getCatalogFilters(searchString);
		});
		this.priceRuleSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getPriceRules(searchString);
		});
	}

	ngAfterViewInit() {
		this.step.stepControl = this.filterPriceForm;
		setTimeout(() => {
			this.catalogFilterInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
		this.catalogFilterSearchString.unsubscribe();
		if (this.getCatalogFiltersSubscription !== null) {
			this.getCatalogFiltersSubscription.unsubscribe();
			this.getCatalogFiltersSubscription = null;
		}
		this.priceRuleSearchString.unsubscribe();
		if (this.getPriceRulesSubscription !== null) {
			this.getPriceRulesSubscription.unsubscribe();
			this.getPriceRulesSubscription = null;
		}
	}

	next() {
		this.alertService.clear();
		if (this.filterPriceForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("CONTRACTS.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	triggerSave() {
		this.save.emit(null);
	}

	getCatalogFilters(searchString: string) {
		if (this.getCatalogFiltersSubscription !== null) {
			this.getCatalogFiltersSubscription.unsubscribe();
			this.getCatalogFiltersSubscription = null;
		}
		this.contractMainService.contractData.catalogFilterId = null;
		this.contractMainService.contractData.catalogFilterName = null;
		this.getCatalogFiltersSubscription = this.catalogFiltersService.getCatalogFiltersByName({
			name: "*" + searchString + "*",
			storeId: this.route.snapshot.params.storeId
		}).subscribe(response => {
			if (response.items.length === 1 && response.items[0].name === this.catalogFilter.value) {
				this.selectCatalogFilter(response.items[0]);
			} else {
				this.catalogFilterList = response.items;
			}
			this.getCatalogFiltersSubscription = null;
		},
		error => {
			this.getCatalogFiltersSubscription = null;
		});
	}

	searchCatalogFilters(value) {
		this.catalogFilterSearchString.next(value);
	}

	selectCatalogFilter(catalogFilter: any) {
		this.contractMainService.contractData.catalogFilterId = catalogFilter.id;
		this.contractMainService.contractData.catalogFilterName = catalogFilter.name;
		this.catalogFilter.setValue(catalogFilter.name);
	}

	clearCatalogFilterSearch() {
		this.catalogFilter.setValue("");
		this.searchCatalogFilters("");
	}

	getPriceRules(searchString: string) {
		if (this.getPriceRulesSubscription !== null) {
			this.getPriceRulesSubscription.unsubscribe();
			this.getPriceRulesSubscription = null;
		}
		this.contractMainService.contractData.priceRuleId = null;
		this.contractMainService.contractData.priceRuleName = null;
		this.getPriceRulesSubscription = this.priceRulesService.getPriceRuleByNameOrDescription({
			searchText: "*" + searchString + "*",
			storeId: this.route.snapshot.params.storeId,
			limit: 10
		}).subscribe(response => {
			if (response.items.length === 1 && response.items[0].name === this.priceRule.value) {
				this.selectPriceRule(response.items[0]);
			} else {
				this.priceRuleList = response.items;
				this.priceRuleList.forEach(priceRule => {
					this.storeNameService.getStoreName(priceRule.storeId).subscribe(storeName => {
						priceRule.storeName = storeName;
					});
				});
			}
			this.getPriceRulesSubscription = null;
		},
		error => {
			this.getPriceRulesSubscription = null;
		});
	}

	searchPriceRules(value) {
		this.priceRuleSearchString.next(value);
	}

	selectPriceRule(priceRule: any) {
		this.contractMainService.contractData.priceRuleId = priceRule.id;
		this.contractMainService.contractData.priceRuleName = priceRule.name;
		this.contractMainService.contractData.priceRuleStoreName = priceRule.storeName;
		this.priceRule.setValue(priceRule.name + " - " + priceRule.storeName);
	}

	clearPriceRuleSearch() {
		this.priceRule.setValue("");
		this.searchPriceRules("");
	}

	private setValues() {
		if (this.contractMainService.contractData != null) {
			const contractData = this.contractMainService.contractData;
			if (contractData.catalogFilterName) {
				this.catalogFilter.setValue(contractData.catalogFilterName);
			} else if (contractData.catalogFilterId) {
				this.catalogFiltersService.getCatalogFilterById({
					id: contractData.catalogFilterId,
					storeId: this.route.snapshot.params.storeId
				}).subscribe(response => {
					contractData.catalogFilterName = response.name;
					this.catalogFilter.setValue(contractData.catalogFilterName);
				});
			} else {
				this.getCatalogFilters("");
			}
			if (contractData.priceRuleName && contractData.priceRuleStoreName) {
				this.priceRule.setValue(contractData.priceRuleName + " - " + contractData.priceRuleStoreName);
			} else if (contractData.priceRuleId) {
				this.priceRulesService.getPriceRuleById({
					id: contractData.priceRuleId,
					storeId: this.route.snapshot.params.storeId
				}).subscribe(response => {
					contractData.priceRuleName = response.name;
					this.storeNameService.getStoreName(response.storeId.toString()).subscribe(storeName => {
						contractData.priceRuleStoreName = storeName;
						this.priceRule.setValue(contractData.priceRuleName + " - " + storeName);
					});
				});
			} else {
				this.getPriceRules("");
			}
		} else {
			this.contractMainService.contractData = {
				accountId: this.route.snapshot.params.accountId
			};
		}
	}

	private createFormControls() {
		this.catalogFilter = new FormControl("", [
			control => {
				const value = control.value;
				const contractData = this.contractMainService.contractData;
				let errors = null;
				if (value !== "" &&
						(value !== contractData.catalogFilterName ||
							contractData.catalogFilterId === null)) {
					errors = {
						invalidCatalogFilter: true
					};
				}
				return errors;
			}
		]);
		this.priceRule = new FormControl("", [
			control => {
				const value = control.value;
				const contractData = this.contractMainService.contractData;
				let errors = null;
				if (value !== "" &&
						(value !== (contractData.priceRuleName + " - " + contractData.priceRuleStoreName) ||
							contractData.priceRuleId === null)) {
					errors = {
						invalidPriceRule: true
					};
				}
				return errors;
			}
		]);
	}

	private createForm() {
		this.filterPriceForm = new FormGroup({
			catalogFilter: this.catalogFilter,
			priceRule: this.priceRule
		});
	}
}
