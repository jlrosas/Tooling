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

@NgModule({
	imports: [],
	declarations: [
		RoleDirective,
		NotRoleDirective,
		ResponsiveGridDirective
	],
	exports: [
		RoleDirective,
		NotRoleDirective,
		ResponsiveGridDirective
	]
})
export class DirectivesModule { }
