/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Directive, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { NavigationDisabledService } from "../services/navigation-disabled.service";

/**
 * Structural directive for navigation enablement.
 * e.g. <div *hcNavigationDisabled>...</div>
 */
@Directive({
	selector: "[hcNavigationDisabled]"
})
export class NavigationDisabledDirective implements OnInit {
	private navigationDisabled = false;
	private hasView = false;

	constructor(private templateRef: TemplateRef<any>,
			private viewContainer: ViewContainerRef,
			private navigationDisabledService: NavigationDisabledService) { }

	public ngOnInit(): void {
		this.navigationDisabledService.getNavigationDisabled().subscribe((navigationDisabled: boolean) => {
			this.navigationDisabled = navigationDisabled;
			this.applyNavigationDisabled();
		});
	}

	private applyNavigationDisabled() {
		if (this.navigationDisabled && !this.hasView) {
			this.viewContainer.createEmbeddedView(this.templateRef);
			this.hasView = true;
		} else if (!this.navigationDisabled && this.hasView) {
			this.viewContainer.clear();
			this.hasView = false;
		}
	}
}
