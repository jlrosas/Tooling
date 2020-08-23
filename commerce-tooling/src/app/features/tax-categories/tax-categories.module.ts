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
import { TaxCategoriesRoutingModule } from "./tax-categories-routing.module";
import { TaxCategoryListComponent } from "./components/tax-category-list/tax-category-list.component";
import { DirectivesModule } from "../../directives/directives.module";
import { DeleteTaxCategoryDialogComponent } from "./components/delete-tax-category-dialog/delete-tax-category-dialog.component";
import { CreateTaxCategoryComponent } from "./components/create-tax-category/create-tax-category.component";
import { EditTaxCategoryComponent } from "./components/edit-tax-category/edit-tax-category.component";
import { TaxCategoryDetailsComponent } from "./components/tax-category-details/tax-category-details.component";
import { TaxCategoryDisplayNameComponent } from "./components/tax-category-display-name/tax-category-display-name.component";
import { TaxCategoryRatesComponent } from "./components/tax-category-rates/tax-category-rates.component";
import { TaxCategoryCodesComponent } from "./components/tax-category-codes/tax-category-codes.component";
import { TaxCategoryRateDialogComponent } from "./components/tax-category-rate-dialog/tax-category-rate-dialog.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TaxCategoriesRoutingModule,
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
		TaxCategoryListComponent,
		DeleteTaxCategoryDialogComponent,
		CreateTaxCategoryComponent,
		EditTaxCategoryComponent,
		TaxCategoryDetailsComponent,
		TaxCategoryDisplayNameComponent,
		TaxCategoryRatesComponent,
		TaxCategoryCodesComponent,
		TaxCategoryRateDialogComponent
	],
	providers: [
	],
	entryComponents: [
		DeleteTaxCategoryDialogComponent,
		TaxCategoryRateDialogComponent
	]
})
export class TaxCategoriesModule {}
