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
import { RegistryListComponent } from "./components/registry-list/registry-list.component";

const routes: Routes = [
	{
		path: "registry-list", component: RegistryListComponent
	},
	{
		path: "", redirectTo: "registry-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class RegistriesRoutingModule { }
