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
import { ShippingCodeListComponent } from "./components/shipping-code-list/shipping-code-list.component";
import { CreateShippingCodeComponent } from "./components/create-shipping-code/create-shipping-code.component";
import { EditShippingCodeComponent } from "./components/edit-shipping-code/edit-shipping-code.component";
import {
	SelectShippingCategoriesAndProductsComponent
} from "./components/select-shipping-categories-and-products/select-shipping-categories-and-products.component";

const routes: Routes = [
	{
		path: "shipping-code-list", component: ShippingCodeListComponent
	},
	{
		path: "create-shipping-code", component: CreateShippingCodeComponent
	},
	{
		path: "edit-shipping-code/:id", component: EditShippingCodeComponent
	},
	{
		path: "select-shipping-categories-and-products", component: SelectShippingCategoriesAndProductsComponent
	},
	{
		path: "", redirectTo: "shipping-code-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class ShippingCodesRoutingModule { }
