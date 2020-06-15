/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { CurrentUserService } from "../services/current-user.service";

/**
 * Structural directive for role based enablement.
 * e.g. <div *hcRole="[-1]">...</div>
 *
 * Roles:
 * -1	Site Administrator
 * -3	Customer Service Representative
 * -4	Seller
 * -8	Product Manager
 * -9	Marketing Manager
 * -10	Receiver
 * -11	Pick Packer
 * -12	Operations Manager
 * -13	Buyer (sell-side)
 * -14	Customer Service Supervisor
 * -15	Returns Administrator
 * -16	Category Manager
 * -17	Logistics Manager
 * -18	Sales Manager
 * -19	Account Representative
 * -20	Seller Administrator
 * -21	Buyer Administrator
 * -22	Buyer Approver
 * -24	Buyer (buy-side)
 * -25	Procurement Buyer Administrator
 * -26	Procurement Buyer
 * -27	Channel Manager
 * -29	Registered Customer
 * -32	Workspace Taskgroup Approver
 * -33	Workspace Content Contributor
 * -34	Workspace Manager
 * -31	Organization Participant
 * -30	Attachment Manager
 * -35	Marketing Director
 * -36	Catalog Exporter
 */
@Directive({
	selector: "[hcRole]"
})
export class RoleDirective {
	private currentUserRoles: Array<number> = null;
	private _roles: Array<number> = null;
	private hasView = false;

	constructor(private templateRef: TemplateRef<any>,
			private viewContainer: ViewContainerRef,
			private currentUserService: CurrentUserService) { }

	@Input("hcRole") set roles(roles: Array<number>) {
		this._roles = roles;
		this.currentUserService.getRoles().subscribe((currentUserRoles: Array<number>) => {
			this.currentUserRoles = currentUserRoles;
			this.applyRoles();
		});
	}

	get roles(): Array<number> {
		return this._roles;
	}

	private applyRoles() {
		let hasRole = false;
		if (this.roles != null && this.currentUserRoles != null) {
			for (let i = 0; i < this.roles.length; i++) {
				const role = this.roles[i];
				for (let j = 0; j < this.currentUserRoles.length; j++) {
					const currentUserRole = this.currentUserRoles[j];
					if (role === currentUserRole) {
						hasRole = true;
						break;
					}
				}
				if (hasRole) {
					break;
				}
			}
		}
		if (hasRole && !this.hasView) {
			this.viewContainer.createEmbeddedView(this.templateRef);
			this.hasView = true;
		} else if (!hasRole && this.hasView) {
			this.viewContainer.clear();
			this.hasView = false;
		}
	}
}
