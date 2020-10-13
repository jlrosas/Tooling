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
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { ShippingChargesRoutingModule } from "./shipping-charges-routing.module";
import { ShippingChargeListComponent } from "./components/shipping-charge-list/shipping-charge-list.component";
import { ShippingChargeDetailsComponent } from "./components/shipping-charge-details/shipping-charge-details.component";
import { DirectivesModule } from "../../directives/directives.module";
import { CreateShippingChargeComponent } from "./components/create-shipping-charge/create-shipping-charge.component";
import { EditShippingChargeComponent } from "./components/edit-shipping-charge/edit-shipping-charge.component";
import { DeleteShippingChargeDialogComponent } from "./components/delete-shipping-charge-dialog/delete-shipping-charge-dialog.component";
import { ShippingChargeDefineTypeComponent } from "./components/shipping-charge-define-type/shipping-charge-define-type.component";
import { ShippingChargeRangeDialogComponent } from "./components/shipping-charge-range-dialog/shipping-charge-range-dialog.component";
import {
	ShippingChargeFulfillmentOptionsComponent
} from "./components/shipping-charge-fulfillment-options/shipping-charge-fulfillment-options.component";
import {
	ShippingChargeFulfillmentOptionDialogComponent
} from "./components/shipping-charge-fulfillment-option-dialog/shipping-charge-fulfillment-option-dialog.component";
import { CurrencyService } from "../../services/currency.service";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ShippingChargesRoutingModule,
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
		MatRadioModule,
		MatDatepickerModule
	],
	declarations: [
		ShippingChargeListComponent,
		ShippingChargeDetailsComponent,
		ShippingChargeDefineTypeComponent,
		CreateShippingChargeComponent,
		EditShippingChargeComponent,
		DeleteShippingChargeDialogComponent,
		ShippingChargeRangeDialogComponent,
		ShippingChargeRangeDialogComponent,
		ShippingChargeFulfillmentOptionsComponent,
		ShippingChargeFulfillmentOptionDialogComponent
	],
	providers: [
		CurrencyService
	],
	entryComponents: [
		DeleteShippingChargeDialogComponent,
		ShippingChargeRangeDialogComponent,
		ShippingChargeRangeDialogComponent,
		ShippingChargeFulfillmentOptionDialogComponent
	]
})
export class ShippingChargesModule {}
