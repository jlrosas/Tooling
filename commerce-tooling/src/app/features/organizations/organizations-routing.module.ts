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

import { OrganizationListComponent } from "./components/organization-list/organization-list.component";
import { CreateOrganizationComponent } from "./components/create-organization/create-organization.component";
import { EditOrganizationComponent } from "./components/edit-organization/edit-organization.component";

const routes: Routes = [
	{
		path: "organization-list", component: OrganizationListComponent
	},
	{
		path: "create-organization", component: CreateOrganizationComponent
	},
	{
		path: "edit-organization/:id", component: EditOrganizationComponent
	},
	{
		path: "", redirectTo: "organization-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
