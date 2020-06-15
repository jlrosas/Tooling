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
import { StorePreviewComponent } from "./components/store-preview/store-preview.component";

const routes: Routes = [
	{
		path: "", component: StorePreviewComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class StorePreviewRoutingModule { }
