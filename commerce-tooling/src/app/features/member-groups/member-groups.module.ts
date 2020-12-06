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
import { MemberGroupsRoutingModule } from "./member-groups-routing.module";
import { MemberGroupListComponent } from "./components/member-group-list/member-group-list.component";
import { MemberGroupDetailsComponent } from "./components/member-group-details/member-group-details.component";
import { MemberGroupDefinitionComponent } from "./components/member-group-definition/member-group-definition.component";
import { MemberGroupMembersComponent } from "./components/member-group-members/member-group-members.component";
import { CreateMemberGroupComponent } from "./components/create-member-group/create-member-group.component";
import { EditMemberGroupComponent } from "./components/edit-member-group/edit-member-group.component";
import { OrganizationNameService } from "../../services/organization-name.service";
import { DeleteMemberGroupDialogComponent } from "./components/delete-member-group-dialog/delete-member-group-dialog.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MemberGroupsRoutingModule,
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
		MemberGroupListComponent,
		MemberGroupDetailsComponent,
		MemberGroupDefinitionComponent,
		MemberGroupMembersComponent,
		CreateMemberGroupComponent,
		EditMemberGroupComponent,
		DeleteMemberGroupDialogComponent
	],
	providers: [
		OrganizationNameService
	]
})
export class MemberGroupsModule {}
