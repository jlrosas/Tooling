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
import { MatRadioModule } from "@angular/material/radio";
import { MatTabsModule } from "@angular/material/tabs";
import { ShippingCodesRoutingModule } from "./shipping-codes-routing.module";
import { ShippingCodeListComponent } from "./components/shipping-code-list/shipping-code-list.component";
import { ShippingCodeDetailsComponent } from "./components/shipping-code-details/shipping-code-details.component";
import { DirectivesModule } from "../../directives/directives.module";
import { CreateShippingCodeComponent } from "./components/create-shipping-code/create-shipping-code.component";
import { ShippingCodeCategoriesComponent } from "./components/shipping-code-categories/shipping-code-categories.component";
import { EditShippingCodeComponent } from "./components/edit-shipping-code/edit-shipping-code.component";
import { DeleteShippingCodeDialogComponent } from "./components/delete-shipping-code-dialog/delete-shipping-code-dialog.component";
import { ShippingCategoryListComponent } from "./components/shipping-category-list/shipping-category-list.component";
import { ShippingProductListComponent } from "./components/shipping-product-list/shipping-product-list.component";
import {
	SelectShippingCategoriesAndProductsComponent
} from "./components/select-shipping-categories-and-products/select-shipping-categories-and-products.component";
import { ShippingCatalogBrowserComponent } from "./components/shipping-catalog-browser/shipping-catalog-browser.component";
import { SearchShippingProductsComponent } from "./components/search-shipping-products/search-shipping-products.component";
import { SearchShippingCategoriesComponent } from "./components/search-shipping-categories/search-shipping-categories.component";
import { ShippingChipViewerComponent } from "./components/shipping-chip-viewer/shipping-chip-viewer.component";
import { MatTreeModule } from "@angular/material/tree";
import { MatProgressBarModule } from "@angular/material";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ShippingCodesRoutingModule,
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
		MatTabsModule,
		MatTreeModule,
		MatProgressBarModule
	],
	declarations: [
		ShippingCodeListComponent,
		CreateShippingCodeComponent,
		ShippingCodeDetailsComponent,
		ShippingCodeCategoriesComponent,
		EditShippingCodeComponent,
		DeleteShippingCodeDialogComponent,
		ShippingCategoryListComponent,
		ShippingProductListComponent,
		SelectShippingCategoriesAndProductsComponent,
		ShippingCatalogBrowserComponent,
		SearchShippingProductsComponent,
		SearchShippingCategoriesComponent,
		ShippingChipViewerComponent
	],
	providers: [
	]
})
export class ShippingCodesModule {}
