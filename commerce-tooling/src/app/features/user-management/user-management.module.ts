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
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserManagementRoutingModule } from "./user-management-routing.module";
import { ChevronRight16Module } from "@carbon/icons-angular/lib/chevron--right/16";
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
import { UserGroupsComponent } from "./components/user-groups/user-groups.component";
import { UserRolesComponent } from "./components/user-roles/user-roles.component";
import { UserAccountComponent } from "./components/user-account/user-account.component";
import { UserContactComponent } from "./components/user-contact/user-contact.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { DirectivesModule } from "../../directives/directives.module";
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		UserManagementRoutingModule,
		HttpClientModule,
		FormsModule,
		TranslateModule,
		ChevronRight16Module,
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
		MatBadgeModule,
		MatDividerModule,
		MatSelectModule,
		MatSlideToggleModule,
		DirectivesModule,
		MatTooltipModule
	],
	declarations: [
		UserGroupsComponent,
		UserRolesComponent,
		UserAccountComponent,
		UserContactComponent,
		UserListComponent,
		CreateUserComponent,
		EditUserComponent
	],
	providers: [
	],
	entryComponents: [
	]
})
export class UserManagementModule { }
