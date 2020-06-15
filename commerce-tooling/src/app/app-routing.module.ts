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

const routes: Routes = [
	{
		path: "organizations",
		loadChildren: "./features/organizations/organizations.module#OrganizationsModule"
	},
	{
		path: "users",
		loadChildren: "./features/user-management/user-management.module#UserManagementModule"
	},
	{
		path: "store-preview",
		loadChildren: "./features/store-preview/store-preview.module#StorePreviewModule"
	},
 	{
 		path: "approvals",
 		loadChildren: "./features/approvals/approvals.module#ApprovalsModule"
 	},
 	{
 		path: "member-groups",
 		loadChildren: "./features/member-groups/member-groups.module#MemberGroupsModule"
	 },
	 {
		path: "accounts",
		loadChildren: "./features/accounts/accounts.module#AccountsModule"
	},
	{
		path: "contracts",
		loadChildren: "./features/contracts/contracts.module#ContractsModule"
	},
	{
		path: "extended-sites",
		loadChildren: "./features/extended-sites/extended-sites.module#ExtendedSitesModule"
	},
	{
		path: "scheduler",
		loadChildren: "./features/scheduler/scheduler.module#SchedulerModule"
 	},
 	{
		path: "messages",
		loadChildren: "./features/messages/messages.module#MessagesModule"
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
