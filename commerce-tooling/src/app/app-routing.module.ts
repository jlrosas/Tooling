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
		loadChildren: () => import("./features/organizations/organizations.module").then(m => m.OrganizationsModule)
	},
	{
		path: "users",
		loadChildren: () => import("./features/user-management/user-management.module").then(m => m.UserManagementModule)
	},
	{
		path: "store-preview",
		loadChildren: () => import("./features/store-preview/store-preview.module").then(m => m.StorePreviewModule)
	},
 	{
 		path: "approvals",
 		loadChildren: () => import("./features/approvals/approvals.module").then(m => m.ApprovalsModule)
 	},
 	{
 		path: "member-groups",
 		loadChildren: () => import("./features/member-groups/member-groups.module").then(m => m.MemberGroupsModule)
	 },
	 {
		path: "accounts",
		loadChildren: () => import("./features/accounts/accounts.module").then(m => m.AccountsModule)
	},
	{
		path: "contracts",
		loadChildren: () => import("./features/contracts/contracts.module").then(m => m.ContractsModule)
	},
	{
		path: "extended-sites",
		loadChildren: () => import("./features/extended-sites/extended-sites.module").then(m => m.ExtendedSitesModule)
	},
	{
		path: "scheduler",
		loadChildren: () => import("./features/scheduler/scheduler.module").then(m => m.SchedulerModule)
 	},
 	{
		path: "messages",
		loadChildren: () => import("./features/messages/messages.module").then(m => m.MessagesModule)
	},
	{
		path: "registries",
		loadChildren: () => import("./features/registries/registries.module").then(m => m.RegistriesModule)
	},
	{
		path: "shipping-jurisdictions",
		loadChildren: () => import("./features/shipping-jurisdictions/shipping-jurisdictions.module").then(m => m.ShippingJurisdictionsModule)
	},
	{
		path: "shipping-modes",
		loadChildren: () => import("./features/shipping-modes/shipping-modes.module").then(m => m.ShippingModesModule)
	},
	{
		path: "shipping-codes",
		loadChildren: () => import("./features/shipping-codes/shipping-codes.module").then(m => m.ShippingCodesModule)
	},
	{
		path: "shipping-charges",
		loadChildren: () => import("./features/shipping-charges/shipping-charges.module").then(m => m.ShippingChargesModule)
	},
	{
		path: "transports",
		loadChildren: () => import("./features/transports/transports.module").then(m => m.TransportsModule)
	},
	{
		path: "message-types",
		loadChildren: () => import("./features/message-types/message-types.module").then(m => m.MessageTypesModule)
	},
	{
		path: "security-policies",
		loadChildren: () => import("./features/security-policies/security-policies.module").then(m => m.SecurityPoliciesModule)
 	},
	{
 		path: "tax-categories",
		loadChildren: () => import("./features/tax-categories/tax-categories.module").then(m => m.TaxCategoriesModule)
	},
	{
		path: "tax-jurisdictions",
		loadChildren: () => import("./features/tax-jurisdictions/tax-jurisdictions.module").then(m => m.TaxJurisdictionsModule)
	},
	{
		path: "tax-codes",
		loadChildren: () => import("./features/tax-codes/tax-codes.module").then(m => m.TaxCodesModule)
	},
	{
		path: "google-analytics",
		loadChildren: () => import("./features/google-analytics/google-analytics.module").then(m => m.GoogleAnalyticsModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
