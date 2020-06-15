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

import { ContractListComponent } from "./components/contract-list/contract-list.component";
import { ContractSummaryComponent } from "./components/contract-summary/contract-summary.component";
import { CreateContractComponent } from "./components/create-contract/create-contract.component";
import { EditContractComponent } from "./components/edit-contract/edit-contract.component";

const routes: Routes = [
	{
		path: "contract-list", component: ContractListComponent
	},
	{
		path: "create-contract", component: CreateContractComponent
	},
	{
		path: "edit-contract/:id", component: EditContractComponent
	},
	{
		path: "contract-summary/:id", component: ContractSummaryComponent
	},
	{
		path: "", redirectTo: "contract-list", pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class ContractsRoutingModule { }
