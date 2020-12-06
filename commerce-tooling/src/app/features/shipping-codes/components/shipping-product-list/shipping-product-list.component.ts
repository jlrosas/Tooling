/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020
 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Input } from "@angular/core";
import { Subject, Observable, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { SelectionModel } from "@angular/cdk/collections";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { ShippingCodeMainService, Product } from "../../services/shipping-code-main.service";

@Component({
	selector: "hc-shipping-product-list",
	templateUrl: "./shipping-product-list.component.html",
	styleUrls: ["./shipping-product-list.component.scss"]
})
export class ShippingProductListComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() mode = "";
	listSearchForm: FormGroup;
	searchText: FormControl;
	currentSearchString = null;
	responsiveCols = 12;
	displayedColumns: string[] = [
		"select",
		"name",
		"sku",
		"shortDescription",
		"type",
		"actions"
	];
	model = new ProductDataSource();

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
	id: number;
	storeId: number;
	selection: SelectionModel<Product> = new SelectionModel<Product>(true, []);

	private searchString: Subject<string> = new Subject<string>();

	constructor(private router: Router,
			private route: ActivatedRoute,
			private shippingCodeMainService: ShippingCodeMainService) { }

	ngOnInit() {
		const { id, storeId } = this.route.snapshot.params;
		this.storeId = Number(storeId);
		this.id = id ? Number(id) : null;
		this.createFormControls();
		this.createForm();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchString = searchString;
			this.pageIndex = 0;
			this.displayProducts();
		});
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(sort => {
			this.pageIndex = 0;
			this.displayProducts();
		});
		setTimeout(() => {
			if (this.mode === "edit") {
				this.shippingCodeMainService.loadCurrentCatalogEntries(this.id, this.storeId).subscribe(response => {
					this.displayProducts();
				});
			} else {
				if (this.shippingCodeMainService.selectedProducts === null) {
					this.shippingCodeMainService.selectedProducts = [];
				}
				this.displayProducts();
			}
		}, 0);
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this.displayProducts();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.pageIndex = 0;
		this.displayProducts();
	}

	searchProducts(searchString: string) {
		this.searchString.next(searchString);
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	deleteSelectedProducts() {
		const selectedProducts = this.shippingCodeMainService.selectedProducts;
		this.shippingCodeMainService.selectedProducts = selectedProducts.filter(product => !this.selection.isSelected(product));
		this.selection.deselect(...this.selection.selected);
		this.displayProducts();
	}

	deleteProduct($event) {
		const selectedProducts = this.shippingCodeMainService.selectedProducts;
		this.shippingCodeMainService.selectedProducts = selectedProducts
			.filter(selectedProduct => (selectedProduct.id !== $event.id || selectedProduct.storeId !== $event.storeId));
		if (this.selection.isSelected($event)) {
			this.selection.deselect($event);
		}
		this.displayProducts();
	}

	clearSelectedProducts() {
		this.selection.selected.forEach(product => {
			this.selection.deselect(product);
		});
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		let numRows = 0;
		this.model.data.forEach(product => {
			if (product.storeId === this.storeId) {
				numRows++;
			}
		});
		return numSelected === numRows;
	}

	masterToggle() {
		if (this.isAllSelected()) {
			this.selection.clear();
		} else {
			this.model.data.forEach(product => {
				if (product.storeId === this.storeId) {
					this.selection.select(product);
				}
			});
		}
	}

	selectProducts() {
		if (this.shippingCodeMainService.selectedProducts !== null &&
				this.shippingCodeMainService.selectedCategories !== null) {
			this.router.navigate(["shipping-codes", "select-shipping-categories-and-products", {
				id: this.id,
				storeId: this.storeId,
				tab: 1,
				mode: this.mode
			}]);
		}
	}

	hasSelectedProducts() {
		return this.selection && this.selection.selected && this.selection.selected.length > 0;
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
	}

	private createForm() {
		this.listSearchForm = new FormGroup({
			searchText: this.searchText
		});
	}

	private displayProducts() {
		if (this.shippingCodeMainService.selectedProducts !== null) {
			const selectedProducts = this.shippingCodeMainService.selectedProducts || [];
			let filteredProducts = selectedProducts.filter(
				product => product.name ? product.name.toLocaleLowerCase().includes((this.searchText.value || "").toLocaleLowerCase()) : true);
			const sort = this.sort.active;
			filteredProducts.sort((product1, product2) => {
				let result = 0;
				let value1: any = null;
				let value2: any = null;
				if (this.sort.direction === "desc") {
					value1 = product2[sort];
					value2 = product1[sort];
				} else {
					value1 = product1[sort];
					value2 = product2[sort];
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
			this.paginator.length = filteredProducts.length;
			filteredProducts = filteredProducts.slice(offset, offset + limit);
			this.model.setData(filteredProducts);
		}
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
