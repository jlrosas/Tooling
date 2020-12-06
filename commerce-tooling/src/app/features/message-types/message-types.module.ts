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
import { MatRadioModule } from "@angular/material/radio/";
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MessageTypesRoutingModule } from "./message-types-routing.module";
import { MessageTypeListComponent } from "./components/message-type-list/message-type-list.component";
import { DeleteMessageTypeDialogComponent } from "./components/delete-message-type-dialog/delete-message-type-dialog.component";
import { MessageTypeDetailsComponent } from "./components/message-type-details/message-type-details.component";
import { MessageTypeConfigurationComponent } from "./components/message-type-configuration/message-type-configuration.component";
import { DirectivesModule } from "../../directives/directives.module";
import { CreateMessageTypeComponent } from "./components/create-message-type/create-message-type.component";
import { EditMessageTypeComponent } from "./components/edit-message-type/edit-message-type.component";
import { CurrencyService } from "../../services/currency.service";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MessageTypesRoutingModule,
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
		MatRadioModule
	],
	declarations: [
		MessageTypeListComponent,
		DeleteMessageTypeDialogComponent,
		CreateMessageTypeComponent,
		MessageTypeDetailsComponent,
		MessageTypeConfigurationComponent,
		EditMessageTypeComponent
	],
	providers: [
	]
})
export class MessageTypesModule {}
