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
import { FeatureService } from "../services/feature.service";
import { Subscription } from "rxjs";

/**
 * Structural directive for feature enablement.
 * e.g. <div hcFeatureEnabled="'featureName'">...</div>
 */
@Directive({ selector: "[hcFeatureEnabled]"})
export class FeatureEnabledDirective {
	private featureName;
	private hasView = false;

	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef,
		private featureService: FeatureService) {
	}

	@Input() set hcFeatureEnabled(featureName: string) {
		this.featureName = featureName;
		if (this.featureService.darkFeatures) {
			this.applyFeatureEnabled();
		} else {
			const darkFeaturesValidSubscription = this.featureService.darkFeaturesValid.subscribe((darkFeaturesValid: boolean) => {
				if (darkFeaturesValid) {
					darkFeaturesValidSubscription.unsubscribe();
					this.applyFeatureEnabled();
				}
			});
		}
	}

	private applyFeatureEnabled() {
		const featureEnabled: boolean = !this.featureService.darkFeatures[this.featureName];
		if (featureEnabled && !this.hasView) {
			this.viewContainer.createEmbeddedView(this.templateRef);
			this.hasView = true;
		} else if (!featureEnabled && this.hasView) {
			this.viewContainer.clear();
			this.hasView = false;
		}
	}
}
