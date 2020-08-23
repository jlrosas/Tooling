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
import { CheckmarkOutline16Module } from "@carbon/icons-angular/lib/checkmark--outline/16";
import { ArrowDown16Module } from "@carbon/icons-angular/lib/arrow--down/16";
import { Delete16Module } from "@carbon/icons-angular/lib/delete/16";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SecurityPoliciesRoutingModule } from "./security-policies-routing";
import { SecurityPolicesListComponent } from "./components/security-policy-list/security-policy-list.component";
import { DirectivesModule } from "../../directives/directives.module";
import { CreateSecurityPoliciesComponent } from "./components/create-security-policy/create-security-policy.component";
import { EditSecurityPoliciesComponent } from "./components/edit-security-policy/edit-security-policy.component";
import { SecurityPolicyDetailsComponent } from "./components/security-policy-details/security-policy-details.component";
import { DefinePasswordPolicyComponent } from "./components/define-password-policy/define-password-policy.component";
import { DefineLockoutPolicyComponent } from "./components/define-lockout-policy/define-lockout-policy.component";
import { DeleteSecurityPolicyDialogComponent } from "./components/delete-security-policy-dialog/delete-security-policy-dialog.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SecurityPoliciesRoutingModule,
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
		CheckmarkOutline16Module,
		ArrowDown16Module,
		DirectivesModule,
		MatDialogModule,
		Delete16Module,
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
		SecurityPolicesListComponent,
		CreateSecurityPoliciesComponent,
		EditSecurityPoliciesComponent,
		SecurityPolicyDetailsComponent,
		DefinePasswordPolicyComponent,
		DefineLockoutPolicyComponent,
		DeleteSecurityPolicyDialogComponent
	],
	providers: [
	],
	entryComponents: [
		DeleteSecurityPolicyDialogComponent
	]
})
export class SecurityPoliciesModule {}
