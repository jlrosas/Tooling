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
import { MessageListComponent } from "./components/message-list/message-list.component";
import { ResendMessageComponent } from "./components/resend-message/resend-message.component";


const routes: Routes = [
	{
		path: "message-list", component: MessageListComponent
	},
	{
		path: "resend-message/:id", component: ResendMessageComponent
	},
	{
		path: "", redirectTo: "message-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class MessagesRoutingModule { }
