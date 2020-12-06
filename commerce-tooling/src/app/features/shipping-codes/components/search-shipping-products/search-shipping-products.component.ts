/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020
 *-------------------------------------------------------------------
 */

import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input, OnChanges } from "@angular/core";
import { Subject, Subscription, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { DataSource } from "@angular/cdk/table";
import { ActivatedRoute } from "@angular/router";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { SelectionModel } from "@angular/cdk/collections";
import { CatalogEntriesService } from "../../../../rest/services/catalog-entries.service";
import { LanguageService } from "../../../../services/language.service";
import { Product } from "../../services/shipping-code-main.service";

@Component({
	selector: "hc-search-shipping-products",
	templateUrl: "./search-shipping-products.component.html",
	styleUrls: ["./search-shipping-products.component.scss"]
})
export class SearchShippingProductsComponent implements OnInit, AfterViewInit, OnChanges {
	@Input() selectedProducts: Array<Product> = null;
	@Input() unselectedProductIds: Array<Product> = null;
	@Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
	@Output() onUnselect: EventEmitter<any> = new EventEmitter<any>();
	productListSearchForm: FormGroup;
	searchText: FormControl;
	responsiveCols = 12;
	displayedColumns: string[] = [
		"select",
		"name",
		"partNumber",
		"type",
		"shortDescription"
	];
	model = new ProductDataSource();

	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	pageIndex = 0;
	tableVisibility = false;
	selection: SelectionModel<Product> = new SelectionModel<Product>(true, []);
	currentSearchString = "";
	storeId: number;

	private searchString: Subject<string> = new Subject<string>();
	private getProductsSubscription: Subscription = null;

	constructor(private catalogEntriesService: CatalogEntriesService,
			private route: ActivatedRoute,
			private languageService: LanguageService) {}

	ngOnInit() {
		const { storeId } = this.route.snapshot.params;
		this.storeId = storeId ? Number(storeId) : null;
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.pageIndex = 0;
			this.currentSearchString = searchString;
			this.getProducts();
		});
	}

	ngAfterViewInit() {
		this.model.setData([]);
		this.getProducts();
	}

	ngOnChanges() {
		if (this.model.data && this.unselectedProductIds) {
			this.selection.deselect(...this.model.data.filter(product => this.unselectedProductIds.includes(product.id)));
		}
		this.markSelectedProducts();
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.model.data ? this.model.data.length : 0;
		return numSelected === numRows;
	}

	masterToggle() {
		if (this.isAllSelected()) {
			this.selection.clear();
			this.unselectAllProducts();
		} else {
			this.selection.select(...this.model.data);
			this.selectAllProducts();
		}
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this.getProducts();
	}

	clearProductSearch() {
		this.tableVisibility = false;
		this.currentSearchString = "";
		this.searchText.setValue("");
		this.getProducts();
	}

	searchProducts(searchString: string) {
		this.searchString.next(searchString);
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	selectProduct(product: Product) {
		this.onSelect.emit([product]);
	}

	selectAllProducts() {
		this.onSelect.emit([...this.model.data]);
	}

	unselectProduct(product: Product) {
		this.onUnselect.emit([product]);
	}

	unselectAllProducts() {
		this.onUnselect.emit([...this.model.data]);
	}

	onSelectionChange(product) {
		this.selection.toggle(product);
		if (this.selection.isSelected(product)) {
			this.selectProduct(product);
		} else {
			this.unselectProduct(product);
		}
	}

	private createFormControls() {
		this.searchText = new FormControl("");
	}

	private createForm() {
		this.productListSearchForm = new FormGroup({
			searchText: this.searchText
		});
	}

	private markSelectedProducts() {
		if (this.model.data && this.selectedProducts) {
			const selectedProductIds = this.selectedProducts.map(product => product.id);
			this.selection.clear();
			this.selection.select(...this.model.data.filter(product => selectedProductIds.includes(product.id)));
		}
	}

	private getProducts() {
		if (this.getProductsSubscription) {
			this.getProductsSubscription.unsubscribe();
			this.getProductsSubscription = null;
		}
		this.getProductsSubscription = this.catalogEntriesService.getCatalogEntries({
			catalogId: "-1",
			storeId: this.storeId,
			dataLanguageIds: LanguageService.languageId.toString(),
			catalogEntryType: ["ItemBean", "ProductBean"],
			searchString: this.currentSearchString,
			offset: this.pageIndex * this.paginator.pageSize,
			limit: this.paginator.pageSize
		}).subscribe(body => {
			const data: Array<Product> = [];
			for (let i = 0; i < body.items.length; i++) {
				const item = body.items[i];
				let name = "";
				let shortDescription = "";
				if (item.descriptions && item.descriptions.length > 0) {
					name = item.descriptions[0].name;
					shortDescription = item.descriptions[0].shortDescription;
				}
				data.push({
					id: item.id,
					sku: item.partNumber,
					name,
					type: item.typeCode,
					shortDescription,
					storeId: this.storeId
				});
			}
			this.paginator.length = body.count;
			this.model.setData(data);
			this.tableVisibility = body.items.length > 0;
			this.markSelectedProducts();
			this.getProductsSubscription = null;
		},
		error => {
			this.getProductsSubscription = null;
			this.model.setData([]);
			this.tableVisibility = false;
		});
	}
}

/**
 * Data source to provide data to be rendered in the table.
 */
class ProductDataSource extends DataSource<Product> {
	data = null;
	private products$: Subject<Product[]> = new Subject<Product[]>();

	setData(products: Product[]) {
		this.products$.next(products);
		this.data = products;
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<Product[]> {
		return this.products$.asObservable();
	}

	disconnect() {}
}
