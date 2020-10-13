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
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatTabsModule } from "@angular/material/tabs";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { ContractsRoutingModule } from "./contracts-routing.module";
import { DirectivesModule } from "../../directives/directives.module";
import { ContractListComponent } from "./components/contract-list/contract-list.component";
import { ContractSummaryComponent } from "./components/contract-summary/contract-summary.component";
import { CreateContractComponent } from "./components/create-contract/create-contract.component";
import { EditContractComponent } from "./components/edit-contract/edit-contract.component";
import { ContractDetailsComponent } from "./components/contract-details/contract-details.component";
import { ContractFilterPriceComponent } from "./components/contract-catalogfilter-pricerule/contract-catalogfilter-pricerule.component";
import { ContractParticipantsComponent } from "./components/contract-participants/contract-participants.component";
import { ContractPaymentBillingComponent } from "./components/contract-payment-billing/contract-payment-billing.component";
import { ContractOrderApprovalComponent } from "./components/contract-order-approval/contract-order-approval.component";
import { ContractShippingComponent } from "./components/contract-shipping/contract-shipping.component";
import { ContractPaymentMethodListComponent } from "./components/contract-payment-method-list/contract-payment-method-list.component";
import { ContractPaymentMethodDialogComponent } from "./components/contract-payment-method-dialog/contract-payment-method-dialog.component";
import { DeleteContractDialogComponent } from "./components/delete-contract-dialog/delete-contract-dialog.component";
import { CopyContractDialogComponent } from "./components/copy-contract-dialog/copy-contract-dialog.component";
import { OrganizationNameService } from "../../services/organization-name.service";
import { StoreNameService } from "../../services/store-name.service";
import { CurrencyService } from "../../services/currency.service";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ContractsRoutingModule,
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
		MatTooltipModule,
		MatMenuModule,
		MatSlideToggleModule,
		DirectivesModule,
		MatSelectModule,
		MatStepperModule,
		CdkStepperModule,
		MatCheckboxModule,
		MatChipsModule,
		MatTabsModule,
		MatListModule,
		MatDividerModule
	],
	declarations: [
		ContractListComponent,
		ContractSummaryComponent,
		CreateContractComponent,
		EditContractComponent,
		ContractDetailsComponent,
		ContractFilterPriceComponent,
		ContractParticipantsComponent,
		ContractPaymentBillingComponent,
		ContractOrderApprovalComponent,
		ContractShippingComponent,
		ContractPaymentMethodListComponent,
		ContractPaymentMethodDialogComponent,
		DeleteContractDialogComponent,
		CopyContractDialogComponent
	],
	entryComponents: [
		ContractPaymentMethodDialogComponent,
		DeleteContractDialogComponent,
		CopyContractDialogComponent
	],
	providers: [
		OrganizationNameService,
		StoreNameService,
		CurrencyService
	]
})
export class ContractsModule {}
