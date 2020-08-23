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
import { ShippingJurisdictionListComponent } from "./components/shipping-jurisdiction-list/shipping-jurisdiction-list.component";
import { CreateShippingJurisdictionComponent } from "./components/create-shipping-jurisdiction/create-shipping-jurisdiction.component";
import { EditShippingJurisdictionComponent } from "./components/edit-shipping-jurisdiction/edit-shipping-jurisdiction.component";

const routes: Routes = [
	{
		path: "shipping-jurisdiction-list", component: ShippingJurisdictionListComponent
	},
	{
		path: "create-shipping-jurisdiction", component: CreateShippingJurisdictionComponent
	},
	{
		path: "edit-shipping-jurisdiction/:id", component: EditShippingJurisdictionComponent
	},
	{
		path: "", redirectTo: "shipping-jurisdiction-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class ShippingJurisdictionsRoutingModule { }
