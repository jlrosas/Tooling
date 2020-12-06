/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, Input } from "@angular/core";
import { MatTabChangeEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { ShippingCodeMainService, Product, Category } from "../../services/shipping-code-main.service";

@Component({
	templateUrl: "./select-shipping-categories-and-products.component.html",
	styleUrls: ["./select-shipping-categories-and-products.component.scss"]
})
export class SelectShippingCategoriesAndProductsComponent implements OnInit {
	id: string;
	mode: string;
	selectedProducts: Array<Product> = [];
	selectedCategories: Array<Category> = [];
	storeId: number = null;
	activeTab = 0;

	constructor(private route: ActivatedRoute,
			private router: Router,
			private shippingCodeMainService: ShippingCodeMainService) { }

	ngOnInit() {
		const { id, storeId, tab = 0, mode = "create" } = this.route.snapshot.params;
		this.id = id;
		this.storeId = Number(storeId);
		this.activeTab = Number(tab);
		this.mode = mode;
		this.selectedProducts = this.shippingCodeMainService.selectedProducts.filter(product => product.storeId === this.storeId);
		this.selectedCategories = this.shippingCodeMainService.selectedCategories.filter(category => category.storeId === this.storeId);
	}

	back() {
		if (this.mode === "create") {
			this.router.navigate(["/shipping-codes", "create-shipping-code", {
				storeId: this.storeId,
				step: 1,
				tab: this.activeTab
			}]);
		} else {
			this.router.navigate(["/shipping-codes", "edit-shipping-code", this.id, {
				storeId: this.storeId,
				step: 1,
				tab: this.activeTab
			}]);
		}
	}

	onSelectProducts($event) {
		$event.forEach(product => {
			const isProductAlreadySelected = this.selectedProducts
				.filter(selectedProduct => selectedProduct.id === product.id)
				.length > 0;
			if (!isProductAlreadySelected) {
				this.selectedProducts = [...this.selectedProducts, product];
				this.shippingCodeMainService.selectedProducts = [...this.shippingCodeMainService.selectedProducts, product];
			}
		});
	}

	onUnselectProducts($event) {
		$event.forEach(product => {
			this.selectedProducts = this.selectedProducts.filter(item => item.id !== product.id);
			this.shippingCodeMainService.selectedProducts = this.shippingCodeMainService.selectedProducts
					.filter(item => (item.id !== product.id || item.storeId !== product.storeId));
		});
	}

	onSelectCategory($event) {
		const isCategoryAlreadySelected = this.selectedCategories
				.filter(selectedCategory => selectedCategory.id === $event.id)
				.length > 0;
		if (!isCategoryAlreadySelected) {
			this.selectedCategories = [...this.selectedCategories, $event];
			this.shippingCodeMainService.selectedCategories = [...this.shippingCodeMainService.selectedCategories, $event];
		}
	}

	onUnselectCategory($event) {
		this.selectedCategories = this.selectedCategories.filter(item => item.id !== $event.id);
		this.shippingCodeMainService.selectedCategories = this.shippingCodeMainService.selectedCategories
				.filter(item => (item.id !== $event.id || item.storeId !== $event.storeId));
	}

	tabChanged(tabChangeEvent: MatTabChangeEvent) {
		this.activeTab = tabChangeEvent.index;
	}

	getCategoriesForSummaryView() {
		return this.selectedCategories ? [...this.selectedCategories].reverse().slice(0, 3) : [];
	}

	getProductsForSummaryView() {
		return this.selectedProducts ? [...this.selectedProducts].reverse().slice(0, 3) : [];
	}
}
