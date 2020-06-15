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

import { MemberGroupListComponent } from "./components/member-group-list/member-group-list.component";
import { CreateMemberGroupComponent } from "./components/create-member-group/create-member-group.component";
import { EditMemberGroupComponent } from "./components/edit-member-group/edit-member-group.component";

const routes: Routes = [
	{
		path: "member-group-list", component: MemberGroupListComponent
	},
	{
		path: "create-member-group", component: CreateMemberGroupComponent
	},
	{
		path: "edit-member-group/:id", component: EditMemberGroupComponent
	},
	{
		path: "", redirectTo: "member-group-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class MemberGroupsRoutingModule { }
