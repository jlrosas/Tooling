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
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CdkTableModule } from "@angular/cdk/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ApprovalsRoutingModule } from "./approvals-routing.module";
import { DirectivesModule } from "../../directives/directives.module";
import { ApprovalListComponent } from "./components/approval-list/approval-list.component";
import { ApprovalSummaryComponent } from "./components/approval-summary/approval-summary.component";
import { ContractApprovalSummaryComponent } from "./components/contract-approval-summary/contract-approval-summary.component";
import {
	OrganizationApprovalSummaryComponent
} from "./components/organization-approval-summary/organization-approval-summary.component";
import { UserApprovalSummaryComponent } from "./components/user-approval-summary/user-approval-summary.component";
import { OrderApprovalSummaryComponent } from "./components/order-approval-summary/order-approval-summary.component";
import { ApprovalDialogComponent } from "./components/approval-dialog/approval-dialog.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ApprovalsRoutingModule,
		TranslateModule,
		CdkTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatTableModule,
		MatIconModule,
		MatInputModule,
		MatDialogModule,
		MatButtonToggleModule,
		MatButtonModule,
		MatGridListModule,
		MatAutocompleteModule,
		MatDatepickerModule,
		MatTooltipModule,
		MatMenuModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		DirectivesModule,
		MatSelectModule
	],
	declarations: [
		ApprovalListComponent,
		ApprovalSummaryComponent,
		ContractApprovalSummaryComponent,
		OrganizationApprovalSummaryComponent,
		UserApprovalSummaryComponent,
		OrderApprovalSummaryComponent,
		ApprovalDialogComponent
	]
})
export class ApprovalsModule {}
