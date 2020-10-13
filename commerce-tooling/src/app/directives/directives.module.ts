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
import { RoleDirective } from "./role.directive";
import { NotRoleDirective } from "./not-role.directive";
import { ResponsiveGridDirective } from "./responsive-grid.directive";
import { NavigationEnabledDirective } from "./navigation-enabled.directive";
import { NavigationDisabledDirective } from "./navigation-disabled.directive";

@NgModule({
	imports: [],
	declarations: [
		RoleDirective,
		NotRoleDirective,
		ResponsiveGridDirective,
		NavigationEnabledDirective,
		NavigationDisabledDirective
	],
	exports: [
		RoleDirective,
		NotRoleDirective,
		ResponsiveGridDirective,
		NavigationEnabledDirective,
		NavigationDisabledDirective
	]
})
export class DirectivesModule { }
