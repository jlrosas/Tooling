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
import { ShippingModesRoutingModule } from "./shipping-modes-routing.module";
import { ShippingModeListComponent } from "./components/shipping-mode-list/shipping-mode-list.component";
import { ShippingModeDetailsComponent } from "./components/shipping-mode-details/shipping-mode-details.component";
import { DirectivesModule } from "../../directives/directives.module";
import { CreateShippingModeComponent } from "./components/create-shipping-mode/create-shipping-mode.component";
import { EditShippingModeComponent } from "./components/edit-shipping-mode/edit-shipping-mode.component";
import { DeleteShippingModeDialogComponent } from "./components/delete-shipping-mode-dialog/delete-shipping-mode-dialog.component";
// tslint:disable-next-line: max-line-length
import { ShippingModeDescriptionDialogComponent } from "./components/shipping-mode-description-dialog/shipping-mode-description-dialog.component";
import { ShippingModeDescriptionListComponent } from "./components/shipping-mode-description-list/shipping-mode-description-list.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ShippingModesRoutingModule,
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
		ShippingModeListComponent,
		CreateShippingModeComponent,
		ShippingModeDetailsComponent,
		EditShippingModeComponent,
		DeleteShippingModeDialogComponent,
		ShippingModeDescriptionDialogComponent,
		ShippingModeDescriptionListComponent
	],
	providers: [
	],
	entryComponents: [
		DeleteShippingModeDialogComponent,
		ShippingModeDescriptionDialogComponent
	]
})
export class ShippingModesModule {}
