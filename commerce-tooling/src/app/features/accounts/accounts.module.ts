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
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AccountsRoutingModule } from "./accounts-routing.module";
import { AccountListComponent } from "./components/account-list/account-list.component";
import { AccountDetailsComponent } from "./components/account-details/account-details.component";
import { DirectivesModule } from "../../directives/directives.module";
import { AccountPurchaseOrderComponent } from "./components/account-purchase-order/account-purchase-order.component";
import { AccountPurchaseOrderListComponent } from "./components/account-purchase-order-list/account-purchase-order-list.component";
import { AccountPurchaseOrderDialogComponent } from "./components/account-purchase-order-dialog/account-purchase-order-dialog.component";
import { AccountCreditLineComponent } from "./components/account-credit-line/account-credit-line.component";
import { CreatAccountComponent } from "./components/create-account/create-account.component";
import { AccountAndPaymentBillingComponent } from "./components/account-payment-billing/account-payment-billing.component";
import { AccountShippingComponent } from "./components/account-shipping/account-shipping.component";
import { AccountPaymentMethodListComponent } from "./components/account-payment-method-list/account-payment-method-list.component";
import { AccountPaymentMethodDialogComponent } from "./components/account-payment-method-dialog/account-payment-method-dialog.component";
import { EditAccountComponent } from "./components/edit-account/edit-account.component";
import { CurrencyService } from "../../services/currency.service";
import { DeleteAccountDialogComponent } from "./components/delete-account-dialog/delete-account-dialog.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AccountsRoutingModule,
		TranslateModule,
		CdkTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatTableModule,
		MatIconModule,
		MatInputModule,
		MatButtonToggleModule,
		MatGridListModule,
		MatAutocompleteModule,
		DirectivesModule,
		MatDialogModule,
		MatButtonModule,
		MatStepperModule,
		CdkStepperModule,
		MatCheckboxModule,
		MatSelectModule,
		MatMenuModule,
		MatSlideToggleModule,
		MatListModule,
		MatChipsModule,
		MatTooltipModule,
	],
	declarations: [
		AccountListComponent,
		CreatAccountComponent,
		AccountDetailsComponent,
		AccountPurchaseOrderComponent,
		AccountPurchaseOrderListComponent,
		AccountPurchaseOrderDialogComponent,
		AccountCreditLineComponent,
		AccountAndPaymentBillingComponent,
		AccountShippingComponent,
		AccountPaymentMethodListComponent,
		AccountPaymentMethodDialogComponent,
		EditAccountComponent,
		DeleteAccountDialogComponent
	],
	providers: [
		CurrencyService
	]
})
export class AccountsModule {}
