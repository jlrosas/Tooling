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

import { NFormsModule } from "carbon-components-angular";
import { Filter16Module } from "@carbon/icons-angular/lib/filter/16";
import { Close16Module } from "@carbon/icons-angular/lib/close/16";
import { ChevronRight16Module } from "@carbon/icons-angular/lib/chevron--right/16";
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
import { MatNativeDateModule } from "@angular/material/core";
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
import { ApprovalDialogComponent } from "./components/approval-dialog/approval-dialog.component";
import { OrganizationNameService } from "../../services/organization-name.service";
import { StoreNameService } from "../../services/store-name.service";
import { CurrencyService } from "../../services/currency.service";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NFormsModule,
		ApprovalsRoutingModule,
		TranslateModule,
		Filter16Module,
		Close16Module,
		ChevronRight16Module,
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
		MatNativeDateModule,
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
		ApprovalDialogComponent
	],
	entryComponents: [ApprovalDialogComponent],
	providers: [
		OrganizationNameService,
		StoreNameService,
		CurrencyService
	]
})
export class ApprovalsModule {}
