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
import { GoogleAnalyticsDashboardComponent } from "./components/google-analytics-dashboard/google-analytics-dashboard.component";

const routes: Routes = [
	{
		path: "google-analytics-dashboard", component: GoogleAnalyticsDashboardComponent
	},
	{
		path: "", redirectTo: "google-analytics-dashboard", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class GoogleAnalyticsDashboardRoutingModule { }
