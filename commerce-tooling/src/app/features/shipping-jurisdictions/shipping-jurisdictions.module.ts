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
import { ShippingJurisdictionsRoutingModule } from "./shipping-jurisdictions-routing.module";
import { ShippingJurisdictionListComponent } from "./components/shipping-jurisdiction-list/shipping-jurisdiction-list.component";
import { ShippingJurisdictionDetailsComponent } from "./components/shipping-jurisdiction-details/shipping-jurisdiction-details.component";
import { DirectivesModule } from "../../directives/directives.module";
import { CreateShippingJurisdictionComponent } from "./components/create-shipping-jurisdiction/create-shipping-jurisdiction.component";
import { EditShippingJurisdictionComponent } from "./components/edit-shipping-jurisdiction/edit-shipping-jurisdiction.component";
import {
	DeleteShippingJurisdictionDialogComponent
} from "./components/delete-shipping-jurisdiction-dialog/delete-shipping-jurisdiction-dialog.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ShippingJurisdictionsRoutingModule,
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
		MatTooltipModule
	],
	declarations: [
		ShippingJurisdictionListComponent,
		CreateShippingJurisdictionComponent,
		ShippingJurisdictionDetailsComponent,
		EditShippingJurisdictionComponent,
		DeleteShippingJurisdictionDialogComponent
	],
	providers: [
	]
})
export class ShippingJurisdictionsModule {}
