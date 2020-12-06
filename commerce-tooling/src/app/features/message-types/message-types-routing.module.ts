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
import { MessageTypeListComponent } from "./components/message-type-list/message-type-list.component";
import { CreateMessageTypeComponent } from "./components/create-message-type/create-message-type.component";
import { EditMessageTypeComponent } from "./components/edit-message-type/edit-message-type.component";

const routes: Routes = [
	{
		path: "message-type-list", component: MessageTypeListComponent
	},
	{
		path: "create-message-type", component: CreateMessageTypeComponent
	},
	{
		path: "edit-message-type/:id", component: EditMessageTypeComponent
	},
	{
		path: "", redirectTo: "message-type-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class MessageTypesRoutingModule { }
