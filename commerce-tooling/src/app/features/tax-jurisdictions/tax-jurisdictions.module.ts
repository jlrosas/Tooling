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
import { TaxJurisdictionsRoutingModule } from "./tax-jurisdictions-routing.module";
import { TaxJurisdictionListComponent } from "./components/tax-jurisdiction-list/tax-jurisdiction-list.component";
import { TaxJurisdictionDetailsComponent } from "./components/tax-jurisdiction-details/tax-jurisdiction-details.component";
import { DirectivesModule } from "../../directives/directives.module";
import { CreateTaxJurisdictionComponent } from "./components/create-tax-jurisdiction/create-tax-jurisdiction.component";
import { EditTaxJurisdictionComponent } from "./components/edit-tax-jurisdiction/edit-tax-jurisdiction.component";
// tslint:disable-next-line: max-line-length
import { DeleteTaxJurisdictionDialogComponent } from "./components/delete-tax-jurisdiction-dialog//delete-tax-jurisdiction-dialog.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TaxJurisdictionsRoutingModule,
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
		TaxJurisdictionListComponent,
		CreateTaxJurisdictionComponent,
		TaxJurisdictionDetailsComponent,
		EditTaxJurisdictionComponent,
		DeleteTaxJurisdictionDialogComponent
	],
	providers: [
	],
	entryComponents: [
		DeleteTaxJurisdictionDialogComponent
	]
})
export class TaxJurisdictionsModule {}
