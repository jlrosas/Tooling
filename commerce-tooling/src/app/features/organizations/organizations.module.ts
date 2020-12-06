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

import { OrganizationsRoutingModule } from "./organizations-routing.module";
import { OrganizationListComponent } from "./components/organization-list/organization-list.component";
import { OrganizationApprovalsComponent } from "./components/organization-approvals/organization-approvals.component";
import { OrganizationContactComponent } from "./components/organization-contact/organization-contact.component";
import { OrganizationDetailsComponent } from "./components/organization-details/organization-details.component";
import { OrganizationRolesComponent } from "./components/organization-roles/organization-roles.component";

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
import { DirectivesModule } from "../../directives/directives.module";
import { MatTooltipModule } from "@angular/material";
import { OrganizationGroupsComponent } from "./components/organization-groups/organization-groups.component";
import { CreateOrganizationComponent } from "./components/create-organization/create-organization.component";
import { EditOrganizationComponent } from "./components/edit-organization/edit-organization.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		OrganizationsRoutingModule,
		TranslateModule,
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
		OrganizationListComponent,
		OrganizationApprovalsComponent,
		OrganizationContactComponent,
		OrganizationDetailsComponent,
		OrganizationRolesComponent,
		OrganizationGroupsComponent,
		CreateOrganizationComponent,
		EditOrganizationComponent
	],
	providers: [
	]
})
export class OrganizationsModule {}
