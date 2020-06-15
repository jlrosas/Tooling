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

import { ApprovalListComponent } from "./components/approval-list/approval-list.component";
import { ApprovalSummaryComponent } from "./components/approval-summary/approval-summary.component";

const routes: Routes = [
	{
		path: "approval-list", component: ApprovalListComponent
	},
	{
		path: "approval-summary/:id", component: ApprovalSummaryComponent
	},
	{
		path: "", redirectTo: "approval-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class ApprovalsRoutingModule { }
