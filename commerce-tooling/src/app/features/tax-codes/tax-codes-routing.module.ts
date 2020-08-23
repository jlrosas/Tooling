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
import { TaxCodeListComponent } from "./components/tax-code-list/tax-code-list.component";
import { CreateTaxCodeComponent } from "./components/create-tax-code/create-tax-code.component";
import { EditTaxCodeComponent } from "./components/edit-tax-code/edit-tax-code.component";

const routes: Routes = [
	{
		path: "tax-code-list", component: TaxCodeListComponent
	},
	{
		path: "create-tax-code", component: CreateTaxCodeComponent
	},
	{
		path: "edit-tax-code/:id", component: EditTaxCodeComponent
	},
	{
		path: "", redirectTo: "tax-code-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class TaxCodesRoutingModule { }
