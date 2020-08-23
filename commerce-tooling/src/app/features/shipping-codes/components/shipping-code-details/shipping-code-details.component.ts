/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, ValidationErrors } from "@angular/forms";
import { Subject, Subscription, Observable, Observer } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { ShippingCodeMainService } from "../../services/shipping-code-main.service";
import { CalculationCodesService } from "../../../../rest/services/calculation-codes.service";
import { AlertService } from "../../../../services/alert.service";
import { HcValidators } from "../../../../shared/validators";

@Component({
	templateUrl: "./shipping-code-details.component.html",
	styleUrls: ["./shipping-code-details.component.scss"],
	selector: "hc-shipping-code-details"
})
export class ShippingCodeDetailsComponent implements OnInit, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: FormGroup | any;
	name: FormControl;

	@ViewChild("nameInput", {static: false}) nameInput: ElementRef<HTMLInputElement>;

	private getShippingCodesSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private matchingShippingCode$: Subject<any> = new Subject<any>();

	constructor(
			private router: Router,
			private route: ActivatedRoute,
			private shippingCodeMainService: ShippingCodeMainService,
			private calculationCodesService: CalculationCodesService,
			private translateService: TranslateService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.shippingCodeMainService.loadCurrentShippingCode(Number(this.route.snapshot.params.id)).subscribe(response => {
				this.setValues();
			});
		} else {
			this.setValues();
		}
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getShippingCodes(searchString);
		});
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
		setTimeout(() => {
			this.nameInput.nativeElement.focus();
		}, 250);
	}

	validateName() {
		this.shippingCodeMainService.shippingCodeData.calculationCode = this.name.value;
	}

	next() {
		this.detailsForm.markAllAsTouched();
		this.alertService.clear();
		if (this.detailsForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("SHIPPING_CODES.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	triggerSave() {
		this.detailsForm.markAllAsTouched();
		this.save.emit(null);
	}

	private setValues() {
		if (this.shippingCodeMainService.shippingCodeData !== null) {
			const shippingCodeData = this.shippingCodeMainService.shippingCodeData;
			this.name.setValue(shippingCodeData.calculationCode);
		} else {
			this.shippingCodeMainService.shippingCodeData = {
				storeId: Number(this.route.snapshot.params.storeId)
			};
		}
	}

	private getShippingCodes(searchString) {
		if (this.getShippingCodesSubscription != null) {
			this.getShippingCodesSubscription.unsubscribe();
			this.getShippingCodesSubscription = null;
		}
		this.getShippingCodesSubscription = this.calculationCodesService.getCalculationCodes({
			calculationCode: searchString.trim(),
			storeId: Number(this.route.snapshot.params.storeId),
			calculationUsageId: [-2]
		}).subscribe((body: any) => {
			this.getShippingCodesSubscription.unsubscribe();
			this.getShippingCodesSubscription = null;
			this.matchingShippingCode$.next(body.items.length > 0 ? body.items[0] : null);
		});
	}

	private createFormControls() {
		this.name = new FormControl("", HcValidators.required, control => {
			return new Observable<ValidationErrors | null>((observer: Observer<ValidationErrors | null>) => {
				if (!control.value) {
					observer.next(null);
					observer.complete();
				} else {
					this.matchingShippingCode$.subscribe((matchingShippingCode: any) => {
						let errors = null;
						if (matchingShippingCode) {
							const currentShippingCodeId = this.shippingCodeMainService.currentShippingCodeId;
							const id = matchingShippingCode.id;
							const name = matchingShippingCode.calculationCode;
							if (name === control.value.trim() && currentShippingCodeId !== id) {
								errors = {
									duplicateName: true
								};
							}
						}
						observer.next(errors);
						observer.complete();
					});
					this.searchString.next(control.value);
				}
			});
		});
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			name: this.name
		});
	}
}
