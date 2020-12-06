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
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper } from "@angular/material/stepper";
import { TaxJurisdictionMainService } from "../../services/tax-jurisdiction-main.service";
import { JurisdictionsService } from "../../../../rest/services/jurisdictions.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./edit-tax-jurisdiction.component.html",
	styleUrls: ["./edit-tax-jurisdiction.component.scss"]
})
export class EditTaxJurisdictionComponent {
	@ViewChild("stepper") stepper: MatStepper;

	private getTaxJurisdictionsSubscription: Subscription = null;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private taxJurisdictionMainService: TaxJurisdictionMainService,
			private jurisdictionsService: JurisdictionsService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			this.alertService.clear();
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("TAX_JURISDICTIONS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.taxJurisdictionMainService.clearData();
		this.router.navigate(["tax-jurisdictions/tax-jurisdiction-list", {storeId: this.route.snapshot.params.storeId}]);
	}

	save() {
		if (!this.taxJurisdictionMainService.processing) {
			this.alertService.clear();
			let valid = true;
			let pending = false;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl) {
					if (!stepControl.valid) {
						valid = false;
					}
					if (stepControl.pending) {
						pending = true;
						const statusChangesSubscription = stepControl.statusChanges.subscribe(statusChange => {
							statusChangesSubscription.unsubscribe();
							this.save();
						});
					}
				}
			});
			if (!pending) {
				if (valid) {
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
							if (jurisdiction.id !== taxJurisdictionData.id && taxJurisdictionData.countryAbbreviation === jurisdiction.countryAbbreviation &&
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
							this.taxJurisdictionMainService.updateTaxJurisdiction().subscribe(response => {
								this.taxJurisdictionMainService.clearData();
								this.router.navigate(["tax-jurisdictions/tax-jurisdiction-list", {storeId: this.route.snapshot.params.storeId}]);
								this.translateService.get("TAX_JURISDICTIONS.TAX_JURISDICTION_SAVED_MESSAGE").subscribe((message: string) => {
									this.alertService.success({message});
								});
							});
						}
					});
				} else {
					this.translateService.get("TAX_JURISDICTIONS.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			}
		}
	}
}
