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
import { CommonModule, DatePipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";
import { StorePreviewRoutingModule } from "./store-preview-routing.module";
import { StorePreviewComponent } from "./components/store-preview/store-preview.component";
import { PreviewSettingsDialogComponent } from "./components/preview-settings-dialog/preview-settings-dialog.component";

@NgModule({
	declarations: [
		StorePreviewComponent,
		PreviewSettingsDialogComponent
	],
	entryComponents: [
		PreviewSettingsDialogComponent
	],
	imports: [
		CommonModule,
		MatSelectModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		TranslateModule,
		MatDialogModule,
		MatDatepickerModule,
		MatInputModule,
		MatSlideToggleModule,
		ScrollingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatListModule,
		MatCheckboxModule,
		MatSnackBarModule,
		MatButtonToggleModule,
		MatTooltipModule,
		StorePreviewRoutingModule
	],
	providers: [
		DatePipe
	]
})
export class StorePreviewModule { }
