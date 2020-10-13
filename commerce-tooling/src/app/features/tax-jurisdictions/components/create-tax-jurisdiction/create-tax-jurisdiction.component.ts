/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MatStepper } from "@angular/material/stepper";
import { TranslateService } from "@ngx-translate/core";
import { JurisdictionsService } from "../../../../rest/services/jurisdictions.service";
import { TaxJurisdictionMainService } from "../../services/tax-jurisdiction-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./create-tax-jurisdiction.component.html",
	styleUrls: ["./create-tax-jurisdiction.component.scss"]
})
export class CreateTaxJurisdictionComponent {
	@ViewChild("stepper", {static: false}) stepper: MatStepper;

	private getTaxJurisdictionsSubscription: Subscription = null;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private jurisdictionsService: JurisdictionsService,
			private taxJurisdictionMainService: TaxJurisdictionMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	cancel() {
		this.alertService.clear();
		this.taxJurisdictionMainService.clearData();
		this.router.navigate(["tax-jurisdictions", "tax-jurisdiction-list", {storeId: this.route.snapshot.params.storeId}]);
	}

	submit() {
		if (!this.taxJurisdictionMainService.processing) {
			this.alertService.clear();
			let completedMandatorySteps = 0;
			let valid = true;
			let pending = false;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl) {
					stepControl.markAllAsTouched();
					if (!stepControl.valid) {
						valid = false;
					}
					if (stepControl.pending) {
						pending = true;
						const statusChangesSubscription = stepControl.statusChanges.subscribe(statusChange => {
							statusChangesSubscription.unsubscribe();
							this.submit();
						});
					}
				}
				if (!step.optional && step.completed) {
					completedMandatorySteps++;
				}
			});
			if (!pending) {
				if (valid && completedMandatorySteps >= 0) {
					if (this.getTaxJurisdictionsSubscription != null) {
						this.getTaxJurisdictionsSubscription.unsubscribe();
						this.getTaxJurisdictionsSubscription = null;
					}
					const args: JurisdictionsService.GetJurisdictionsParams = {
						storeId: Number(this.route.snapshot.params.storeId),
						subclass: 2
					};
					const taxJurisdictionData = this.taxJurisdictionMainService.taxJurisdictionData;
					if (taxJurisdictionData.countryAbbreviation) {
						args.countryAbbreviation = taxJurisdictionData.countryAbbreviation;
					}
					if (taxJurisdictionData.stateAbbreviation) {
						args.stateAbbreviation = taxJurisdictionData.stateAbbreviation;
					} else if (taxJurisdictionData.state) {
						args.state = taxJurisdictionData.state;
					}
					this.getTaxJurisdictionsSubscription = this.jurisdictionsService.getJurisdictions(args).subscribe(body => {
						let duplicate = false;
						for (let i = 0; i < body.items.length; i++) {
							const jurisdiction = body.items[i];
							if (taxJurisdictionData.countryAbbreviation === jurisdiction.countryAbbreviation &&
									(taxJurisdictionData.stateAbbreviation === jurisdiction.stateAbbreviation ||
									jurisdiction.stateAbbreviation == null && (taxJurisdictionData.state === jurisdiction.state))) {
								duplicate = true;
								break;
							}
						}
						if (duplicate) {
							this.translateService.get("TAX_JURISDICTIONS.DUPLICATE_COUNTRY_STATE_COMBINATION")
									.subscribe((message: string) => {
								this.alertService.error({message, clear: true});
							});
						} else {
							this.taxJurisdictionMainService.createTaxJurisdiction().subscribe(name => {
								this.taxJurisdictionMainService.clearData();
								this.router.navigate(["tax-jurisdictions", "tax-jurisdiction-list", {storeId: this.route.snapshot.params.storeId}]);
								this.translateService.get("TAX_JURISDICTIONS.TAX_JURISDICTION_CREATED_MESSAGE", {name}).
										subscribe((message: string) => {
									this.alertService.success({message});
								});
							});
						}
					});
				} else if (!valid) {
					this.translateService.get("TAX_JURISDICTIONS.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				} else {
					this.translateService.get("TAX_JURISDICTIONS.NOT_COMPLETE_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
