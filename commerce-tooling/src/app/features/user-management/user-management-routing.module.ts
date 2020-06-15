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
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { UserListComponent } from "./components/user-list/user-list.component";

const routes: Routes = [
	{
		path: "user-list", component: UserListComponent
	},
	{
		path: "create-user", component: CreateUserComponent
	},
	{
		path: "edit-user/:id", component: EditUserComponent
	},
	{
		path: "", redirectTo: "user-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserManagementRoutingModule { }
