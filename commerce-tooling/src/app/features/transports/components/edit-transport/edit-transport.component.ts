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
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper } from "@angular/material/stepper";
import { TransportMainService } from "../../services/transport-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./edit-transport.component.html",
	styleUrls: ["./edit-transport.component.scss"]
})
export class EditTransportComponent {
	@ViewChild("stepper") stepper: MatStepper;

	constructor(private router: Router,
			private transportMainService: TransportMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	handleSelectionChange($event) {
		if ($event.previouslySelectedStep) {
			const previousStepControl = $event.previouslySelectedStep.stepControl;
			if (previousStepControl && !previousStepControl.valid) {
				this.translateService.get("TRANSPORTS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}

	cancel() {
		this.alertService.clear();
		this.transportMainService.clearData();
		this.router.navigate(["transports/transport-list"]);
	}

	save() {
		if (!this.transportMainService.processing) {
			this.alertService.clear();
			let valid = true;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl && !step.stepControl.valid) {
					valid = false;
				}
			});
			if (valid) {
				this.transportMainService.updateTransport().subscribe(response => {
					this.transportMainService.clearData();
					this.router.navigate(["transports/transport-list"]);
					this.translateService.get("TRANSPORTS.TRANSPORT_SAVED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
				});
			} else {
				this.translateService.get("TRANSPORTS.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
