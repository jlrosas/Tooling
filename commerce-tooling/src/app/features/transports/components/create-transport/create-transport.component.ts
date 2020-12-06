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
import { MatStepper } from "@angular/material/stepper";
import { TranslateService } from "@ngx-translate/core";
import { TransportMainService } from "../../services/transport-main.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./create-transport.component.html",
	styleUrls: ["./create-transport.component.scss"]
})
export class CreateTransportComponent {
	@ViewChild("stepper") stepper: MatStepper;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private transportMainService: TransportMainService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	cancel() {
		this.alertService.clear();
		this.transportMainService.clearData();
		this.router.navigate(["transports", "transport-list"]);
	}

	submit() {
		if (!this.transportMainService.processing) {
			this.alertService.clear();
			let completedMandatorySteps = 0;
			let valid = true;
			this.stepper.steps.forEach(step => {
				const stepControl = step.stepControl;
				if (stepControl) {
					stepControl.markAllAsTouched();
					if (!stepControl.valid) {
						valid = false;
					}
				}
				if (!step.optional && step.completed) {
					completedMandatorySteps++;
				}
			});
			if (valid && completedMandatorySteps >= 0) {
				this.transportMainService.createTransport().subscribe(response => {
					this.transportMainService.clearData();
					this.router.navigate(["transports", "transport-list"]);
					this.translateService.get("TRANSPORTS.TRANSPORT_CREATED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
				});
			} else if (!valid) {
				if (!this.transportMainService.transportData.transportId) {
					this.translateService.get("TRANSPORTS.NO_TRANSPORT_ERROR").subscribe((message: string) => {
						this.alertService.error({message});
					});
				} else {
					this.translateService.get("TRANSPORTS.INPUT_ERROR").subscribe((message: string) => {
						this.alertService.error({message, clear: true});
					});
				}
			} else {
				this.translateService.get("TRANSPORTS.NOT_COMPLETE_ERROR").subscribe((message: string) => {
					this.alertService.error({message, clear: true});
				});
			}
		}
	}
}
