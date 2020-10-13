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

import { ScheduledJobListComponent } from "./components/scheduled-job-list/scheduled-job-list.component";
import { CreateJobComponent } from "./components/create-job/create-job.component";
import { EditJobComponent } from "./components/edit-job/edit-job.component";

const routes: Routes = [
	{
		path: "scheduled-job-list", component: ScheduledJobListComponent
	},
	{
		path: "create-job", component: CreateJobComponent
	},
	{
		path: "edit-job/:id", component: EditJobComponent
	},
	{
		path: "", redirectTo: "scheduled-job-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class SchedulerRoutingModule { }
