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
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject, forkJoin } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { SelectionModel } from "@angular/cdk/collections";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { CatalogGroupsService } from "../../../../rest/services/catalog-groups.service";
import { LanguageService } from "../../../../services/language.service";
import { ShippingCodeMainService, Category } from "../../services/shipping-code-main.service";

@Component({
	selector: "hc-shipping-category-list",
	templateUrl: "./shipping-category-list.component.html",
	styleUrls: ["./shipping-category-list.component.scss"]
})
export class ShippingCategoryListComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() mode = "";
	listSearchForm: FormGroup;
	searchText: FormControl;
	currentSearchString = null;
	responsiveCols = 12;
	displayedColumns: string[] = [
		"select",
		"name",
		"shortDescription",
		"parentCategory",
		"actions"
	];
	model = new CategoryDataSource();

	categoryIdToNameMap = {};

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
	id: number;
	selection: SelectionModel<Category> = new SelectionModel<Category>(true, []);

	private searchString: Subject<string> = new Subject<string>();

	constructor(private router: Router,
			private route: ActivatedRoute,
			private catalogGroupsService: CatalogGroupsService,
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
			this.displayCategories();
		});
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(sort => {
			this.pageIndex = 0;
			this.displayCategories();
		});
		setTimeout(() => {
			if (this.mode === "edit") {
				this.shippingCodeMainService.loadCurrentCatalogGroups(this.id, this.storeId).subscribe(response => {
					this.displayCategories();
				});
			} else {
				if (this.shippingCodeMainService.selectedCategories === null) {
					this.shippingCodeMainService.selectedCategories = [];
				}
				this.displayCategories();
			}
		}, 0);
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
	}

	handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.pageIndex = e.pageIndex;
		this.displayCategories();
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.pageIndex = 0;
		this.displayCategories();
	}

	searchCategories(searchString: string) {
		this.searchString.next(searchString);
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	deleteSelectedCategories() {
		const selectedCategories = this.shippingCodeMainService.selectedCategories;
		this.shippingCodeMainService.selectedCategories = selectedCategories
				.filter(category => !this.selection.isSelected(category));
		this.selection.deselect(...this.selection.selected);
		this.displayCategories();
	}

	deleteCategory($event) {
		const selectedCategories = this.shippingCodeMainService.selectedCategories;
		this.shippingCodeMainService.selectedCategories = selectedCategories
				.filter(selectedCategory => selectedCategory.id !== $event.id);
		if (this.selection.isSelected($event)) {
			this.selection.deselect($event);
		}
		this.displayCategories();
	}

	clearSelectedCategories() {
		this.selection.selected.forEach(category => {
			this.selection.deselect(category);
		});
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		let numRows = 0;
		this.model.data.forEach(category => {
			if (category.storeId === this.storeId) {
				numRows++;
			}
		});
		return numSelected === numRows;
	}

	masterToggle() {
		if (this.isAllSelected()) {
			this.selection.clear();
		} else {
			this.model.data.forEach(category => {
				if (category.storeId === this.storeId) {
					this.selection.select(category);
				}
			});
		}
	}

	selectCategories() {
		if (this.shippingCodeMainService.selectedProducts !== null &&
				this.shippingCodeMainService.selectedCategories !== null) {
			this.router.navigate(["shipping-codes", "select-shipping-categories-and-products", {
				id: this.id,
				storeId: this.storeId,
				tab: 0,
				mode: this.mode
			}]);
		}
	}

	hasSelectedCategories() {
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

	private displayCategories() {
		if (this.shippingCodeMainService.selectedCategories !== null) {
			const selectedCategories = this.shippingCodeMainService.selectedCategories;
			let filteredCategories = selectedCategories
				.filter(category => (category.name ?
					category.name.toLocaleLowerCase().includes((this.currentSearchString || "").toLocaleLowerCase()) : true));
			const sort = this.sort.active;
			filteredCategories.sort((category1, category2) => {
				let result = 0;
				let value1: any = null;
				let value2: any = null;
				if (this.sort.direction === "desc") {
					value1 = category2[sort];
					value2 = category1[sort];
				} else {
					value1 = category1[sort];
					value2 = category2[sort];
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
			this.paginator.length = filteredCategories.length;
			filteredCategories = filteredCategories.slice(offset, offset + limit);
			const requests = [];
			filteredCategories.map(node => {
				if (node.parentCatalogGroupId) {
					requests.push(
						this.catalogGroupsService.getCatalogGroupById({
							id: node.parentCatalogGroupId,
							storeId: this.storeId,
							dataLanguageIds: LanguageService.languageId.toString(),
						})
					);
				}
			});
			forkJoin(requests).subscribe((responseList: Array<any>) => {
				for (let i = 0; i < responseList.length; i++) {
					const catalogGroup = responseList[i];
					this.categoryIdToNameMap[String(catalogGroup.id)] = catalogGroup.name;
				}
			});
			this.model.setData(filteredCategories);
		}
	}
}

/**
 * Data source to provide data to be rendered in the table.
 */
class CategoryDataSource extends DataSource<Category> {
	data = null;
	private categories$: Subject<Category[]> = new Subject<Category[]>();
	setData(categories: Category[]) {
		this.categories$.next(categories);
		this.data = categories;
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<Category[]> {
		return this.categories$.asObservable();
	}

	disconnect() {}
}
