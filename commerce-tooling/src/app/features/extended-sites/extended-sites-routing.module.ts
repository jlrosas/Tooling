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

import { ExtendedSiteListComponent } from "./components/extended-site-list/extended-site-list.component";
import { CreateExtendedSiteComponent } from "./components/create-extended-site/create-extended-site.component";

const routes: Routes = [
	{
		path: "extended-site-list", component: ExtendedSiteListComponent
	},
	{
		path: "create-extended-site", component: CreateExtendedSiteComponent
	},
	{
		path: "", redirectTo: "extended-site-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class ExtendedSitesRoutingModule { }
