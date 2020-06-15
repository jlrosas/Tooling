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
import { AccountListComponent } from "./components/account-list/account-list.component";
import { CreatAccountComponent } from "./components/create-account/create-account.component";
import { EditAccountComponent } from "./components/edit-account/edit-account.component";

const routes: Routes = [
	{
		path: "account-list", component: AccountListComponent
	},
	{
		path: "create-account", component: CreatAccountComponent
	},
	{
		path: "edit-account/:id", component: EditAccountComponent
	},
	{
		path: "", redirectTo: "account-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class AccountsRoutingModule { }
