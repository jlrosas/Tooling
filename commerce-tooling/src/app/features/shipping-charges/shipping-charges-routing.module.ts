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
import { ShippingChargeListComponent } from "./components/shipping-charge-list/shipping-charge-list.component";
import { CreateShippingChargeComponent } from "./components/create-shipping-charge/create-shipping-charge.component";
import { EditShippingChargeComponent } from "./components/edit-shipping-charge/edit-shipping-charge.component";

const routes: Routes = [
	{
		path: "shipping-charge-list", component: ShippingChargeListComponent
	},
	{
		path: "create-shipping-charge", component: CreateShippingChargeComponent
	},
	{
		path: "edit-shipping-charge/:id", component: EditShippingChargeComponent
	},
	{
		path: "", redirectTo: "shipping-charge-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class ShippingChargesRoutingModule { }
