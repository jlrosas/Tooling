/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, Subscription, forkJoin } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { CatalogsService } from "../../../../rest/services/catalogs.service";
import { LanguageService } from "../../../../services/language.service";
import { Category, Product } from "../../services/shipping-code-main.service";

@Component({
	selector: "hc-search-shipping-categories",
	templateUrl: "./search-shipping-categories.component.html",
	styleUrls: ["./search-shipping-categories.component.scss"]
})
export class SearchShippingCategoriesComponent implements OnInit {
	@Input() selectedCategories: Array<Category> = null;
	@Input() selectedProducts: Array<Product> = null;
	@Output() onSelectCategory: EventEmitter<any> = new EventEmitter<any>();
	@Output() onUnselectCategory: EventEmitter<any> = new EventEmitter<any>();
	@Output() onSelectProduct: EventEmitter<any> = new EventEmitter<any>();
	@Output() onUnselectProduct: EventEmitter<any> = new EventEmitter<any>();

	catalogSearchForm: FormGroup;
	catalogSearchText: FormControl;
	catalogs = [];
	catalogSearchString = "";
	storeId: number;

	private catalogSearchString$: Subject<string> = new Subject<string>();
	private allCatalogs: Array<any> = null;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private catalogsService: CatalogsService,
			private languageService: LanguageService) {	}

	ngOnInit() {
		this.storeId = Number(this.route.snapshot.params.storeId);
		this.createFormControls();
		this.createForm();
		this.catalogSearchString$.pipe(debounceTime(250)).subscribe(searchString => {
			this.catalogs = [];
			this.catalogSearchString = searchString;
			this.displayCatalogs();
		});
		this.getCatalogs();
	}

	searchCatalogs(searchString: string) {
		this.catalogSearchString$.next(searchString);
	}

	clearCatalogSearch() {
		this.catalogSearchText.setValue("");
		this.catalogSearchString = "";
		this.displayCatalogs();
	}

	private createFormControls() {
		this.catalogSearchText = new FormControl("");
	}

	private createForm() {
		this.catalogSearchForm = new FormGroup({
			catalogSearchText: this.catalogSearchText
		});
	}

	private getCatalogs() {
		const requests = [
			this.catalogsService.getCatalogs({
				storeId: this.storeId,
				dataLanguageIds: LanguageService.languageId.toString(),
				masterCatalog: true
			}),
			this.catalogsService.getCatalogs({
				storeId: this.storeId,
				dataLanguageIds: LanguageService.languageId.toString(),
				masterCatalog: false
			})
		];
		forkJoin(requests).subscribe((responseList: Array<any>) => {
			this.allCatalogs = [ ...responseList[0].items, ...responseList[1].items];
			this.displayCatalogs();
		});
	}

	private displayCatalogs() {
		let catalogs = this.allCatalogs || [];
		if (this.catalogSearchString) {
			const filterValue = this.catalogSearchString.toLowerCase();
			catalogs = catalogs.filter(catalog => catalog.identifier.toLowerCase().indexOf(filterValue) >= 0);
		}
		this.catalogs = catalogs;
	}
}
