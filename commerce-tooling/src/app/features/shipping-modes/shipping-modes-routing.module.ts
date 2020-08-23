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
import { ShippingModeListComponent } from "./components/shipping-mode-list/shipping-mode-list.component";
import { CreateShippingModeComponent } from "./components/create-shipping-mode/create-shipping-mode.component";
import { EditShippingModeComponent } from "./components/edit-shipping-mode/edit-shipping-mode.component";

const routes: Routes = [
	{
		path: "shipping-mode-list", component: ShippingModeListComponent
	},
	{
		path: "create-shipping-mode", component: CreateShippingModeComponent
	},
	{
		path: "edit-shipping-mode/:id", component: EditShippingModeComponent
	},
	{
		path: "", redirectTo: "shipping-mode-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class ShippingModesRoutingModule { }
