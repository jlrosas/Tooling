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
import { SecurityPolicesListComponent } from "./components/security-policy-list/security-policy-list.component";
import { CreateSecurityPoliciesComponent } from "./components/create-security-policy/create-security-policy.component";
import { EditSecurityPoliciesComponent } from "./components/edit-security-policy/edit-security-policy.component";

const routes: Routes = [
	{
		path: "security-policy-list", component: SecurityPolicesListComponent
	},
	{
		path: "create-security-policy", component: CreateSecurityPoliciesComponent
	},
	{
		path: "edit-security-policy/:id", component: EditSecurityPoliciesComponent
	},
	{
		path: "", redirectTo: "security-policy-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class SecurityPoliciesRoutingModule { }
