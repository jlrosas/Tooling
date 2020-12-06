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
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDividerModule } from "@angular/material/divider";
import { DirectivesModule } from "../../directives/directives.module";
import { MessagesRoutingModule } from "./messages-routing.module";
import { MessageListComponent } from "./components/message-list/message-list.component";
import { MessageDetailsComponent } from "./components/message-details/message-details.component";
import { MessageConfigurationComponent } from "./components/message-configuration/message-configuration.component";
import { ResendMessageComponent } from "./components/resend-message/resend-message.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MessagesRoutingModule,
		TranslateModule,
		CdkTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatTableModule,
		MatIconModule,
		MatInputModule,
		MatButtonToggleModule,
		MatGridListModule,
		MatSelectModule,
		MatButtonModule,
		MatAutocompleteModule,
		MatSlideToggleModule,
		MatStepperModule,
		MatTooltipModule,
		MatDividerModule,
		DirectivesModule
	],
	declarations: [
		MessageListComponent,
		MessageDetailsComponent,
		MessageConfigurationComponent,
		ResendMessageComponent
	],
	providers: [
	]
})
export class MessagesModule {}
