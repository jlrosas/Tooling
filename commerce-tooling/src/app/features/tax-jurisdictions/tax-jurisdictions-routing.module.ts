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
import { TaxJurisdictionListComponent } from "./components/tax-jurisdiction-list/tax-jurisdiction-list.component";
import { CreateTaxJurisdictionComponent } from "./components/create-tax-jurisdiction/create-tax-jurisdiction.component";
import { EditTaxJurisdictionComponent } from "./components/edit-tax-jurisdiction/edit-tax-jurisdiction.component";

const routes: Routes = [
	{
		path: "tax-jurisdiction-list", component: TaxJurisdictionListComponent
	},
	{
		path: "create-tax-jurisdiction", component: CreateTaxJurisdictionComponent
	},
	{
		path: "edit-tax-jurisdiction/:id", component: EditTaxJurisdictionComponent
	},
	{
		path: "", redirectTo: "tax-jurisdiction-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class TaxJurisdictionsRoutingModule { }
