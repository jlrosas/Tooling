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
import { Close16Module } from "@carbon/icons-angular/lib/close/16";
import { ChevronRight16Module } from "@carbon/icons-angular/lib/chevron--right/16";
import { Delete16Module } from "@carbon/icons-angular/lib/delete/16";
import { Export16Module } from "@carbon/icons-angular/lib/export/16";
import { TranslateModule } from "@ngx-translate/core";
import { CdkTableModule } from "@angular/cdk/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatStepperModule } from "@angular/material/stepper";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { MatChipsModule } from "@angular/material/chips";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatListModule } from "@angular/material/list";
import { MatBadgeModule } from "@angular/material/badge";
import { MatDividerModule } from "@angular/material/divider";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DirectivesModule } from "../../directives/directives.module";
import { ExtendedSitesRoutingModule } from "./extended-sites-routing.module";
import { ExtendedSiteListComponent } from "./components/extended-site-list/extended-site-list.component";
import { ExtendedSiteDetailsComponent } from "./components/extended-site-details/extended-site-details.component";
import { ExtendedSiteSetupComponent } from "./components/extended-site-setup/extended-site-setup.component";
import { CreateExtendedSiteComponent } from "./components/create-extended-site/create-extended-site.component";
import { DeleteExtendedSiteDialogComponent } from "./components/delete-extended-site-dialog/delete-extended-site-dialog.component";
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ExtendedSitesRoutingModule,
		TranslateModule,
		Close16Module,
		ChevronRight16Module,
		Delete16Module,
		Export16Module,
		CdkTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatTableModule,
		MatIconModule,
		MatInputModule,
		MatDialogModule,
		MatButtonToggleModule,
		MatGridListModule,
		MatAutocompleteModule,
		MatStepperModule,
		MatButtonModule,
		CdkStepperModule,
		MatChipsModule,
		MatTabsModule,
		MatCheckboxModule,
		MatListModule,
		MatBadgeModule,
		MatDividerModule,
		MatSelectModule,
		MatSlideToggleModule,
		MatTooltipModule,
		DirectivesModule
	],
	declarations: [
		ExtendedSiteListComponent,
		ExtendedSiteDetailsComponent,
		ExtendedSiteSetupComponent,
		CreateExtendedSiteComponent,
		DeleteExtendedSiteDialogComponent
	],
	providers: [
	],
	entryComponents: [
		DeleteExtendedSiteDialogComponent
	]
})
export class ExtendedSitesModule {}
