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
import { TransportListComponent } from "./components/transport-list/transport-list.component";
import { CreateTransportComponent } from "./components/create-transport/create-transport.component";
import { EditTransportComponent } from "./components/edit-transport/edit-transport.component";

const routes: Routes = [
	{
		path: "transport-list", component: TransportListComponent
	},
	{
		path: "create-transport", component: CreateTransportComponent
	},
	{
		path: "edit-transport/:id", component: EditTransportComponent
	},
	{
		path: "", redirectTo: "transport-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class TransportsRoutingModule { }
