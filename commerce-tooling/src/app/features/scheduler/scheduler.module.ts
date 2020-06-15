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
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
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
import { SchedulerRoutingModule } from "./scheduler-routing.module";
import { ScheduledJobListComponent } from "./components/scheduled-job-list/scheduled-job-list.component";
import { CreateJobComponent } from "./components/create-job/create-job.component";
import { EditJobComponent } from "./components/edit-job/edit-job.component";
import { JobDetailsComponent } from "./components/job-details/job-details.component";
import { JobConfigurationComponent } from "./components/job-configuration/job-configuration.component";
import { JobScheduleComponent } from "./components/job-schedule/job-schedule.component";
import { StoreNameService } from "../../services/store-name.service";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule,
		Close16Module,
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
		MatDatepickerModule,
		MatNativeDateModule,
		MatBadgeModule,
		MatDividerModule,
		MatSelectModule,
		MatSlideToggleModule,
		MatTooltipModule,
		DirectivesModule,
		SchedulerRoutingModule
	],
	declarations: [
		ScheduledJobListComponent,
		CreateJobComponent,
		EditJobComponent,
		JobDetailsComponent,
		JobConfigurationComponent,
		JobScheduleComponent
	],
	providers: [
		StoreNameService
	],
	entryComponents: [
	]
})
export class SchedulerModule {}
