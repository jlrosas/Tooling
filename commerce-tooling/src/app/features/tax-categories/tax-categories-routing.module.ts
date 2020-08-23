/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TaxCategoryListComponent } from "./components/tax-category-list/tax-category-list.component";
import { CreateTaxCategoryComponent } from "./components/create-tax-category/create-tax-category.component";
import { EditTaxCategoryComponent } from "./components/edit-tax-category/edit-tax-category.component";

const routes: Routes = [
	{
		path: "tax-category-list", component: TaxCategoryListComponent
	},
	{
		path: "create-tax-category", component: CreateTaxCategoryComponent
	},
	{
		path: "edit-tax-category/:id", component: EditTaxCategoryComponent
	},
	{
		path: "", redirectTo: "tax-category-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class TaxCategoriesRoutingModule { }
