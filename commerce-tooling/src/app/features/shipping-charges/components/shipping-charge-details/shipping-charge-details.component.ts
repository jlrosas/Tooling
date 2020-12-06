/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, ValidationErrors } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { ShippingChargeMainService } from "../../services/shipping-charge-main.service";
import { AlertService } from "../../../../services/alert.service";
import { HcValidators } from "../../../../shared/validators";
import { Subscription, Subject, Observer, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { CalculationScalesService } from "../../../../rest/services/calculation-scales.service";

@Component({
	templateUrl: "./shipping-charge-details.component.html",
	styleUrls: ["./shipping-charge-details.component.scss"],
	selector: "hc-shipping-charge-details"
})
export class ShippingChargeDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: FormGroup | any;
	name: FormControl;
	description: FormControl;
	startDate: FormControl;
	endDate: FormControl;
	timePeriod = "always";

	@ViewChild("nameInput") nameInput: ElementRef<HTMLInputElement>;

	private statusChangesSubscription: Subscription = null;
	private getCalculationScalesSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private matchingCalculationScale$: Subject<any> = new Subject<any>();

	constructor(
			private router: Router,
			private route: ActivatedRoute,
			private shippingChargeMainService: ShippingChargeMainService,
			private calculationScalesService: CalculationScalesService,
			private translateService: TranslateService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.shippingChargeMainService.loadCurrentShippingCharge(Number(this.route.snapshot.params.id)).subscribe(response => {
				this.setValues();
			});
		} else {
			this.setValues();
		}
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getCalculationScales(searchString);
		});
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
		setTimeout(() => {
			this.nameInput.nativeElement.focus();
		}, 250);
	}

	validateName() {
		this.shippingChargeMainService.shippingChargeData.scaleCode = this.name.value;
	}

	validateDescription() {
		this.shippingChargeMainService.shippingChargeData.scaleDescription = this.description.value;
	}

	validateTimePeriod($event) {
		if ($event.value === "specifiedTimePeriod") {
			const newDate = new Date();
			const todayDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
			const nextYearDate = new Date(newDate.getFullYear() + 1, newDate.getMonth(), newDate.getDate());
			this.startDate.setValue(todayDate);
			this.endDate.setValue(nextYearDate);
			this.shippingChargeMainService.shippingChargeData.startDate = todayDate.toISOString();
			this.shippingChargeMainService.shippingChargeData.endDate = nextYearDate.toISOString();
		} else {
			this.shippingChargeMainService.shippingChargeData.startDate = (new Date(1900, 0)).toISOString();
			this.shippingChargeMainService.shippingChargeData.endDate = (new Date(2100, 0)).toISOString();
		}
	}

	validateShippingChargeStart(value: any) {
		this.shippingChargeMainService.shippingChargeData.startDate = (new Date(value)).toISOString();
	}

	validateShippingChargeEnd(value: any) {
		this.shippingChargeMainService.shippingChargeData.endDate = (new Date(value)).toISOString();
	}

	ngOnDestroy() {
		if (this.statusChangesSubscription) {
			this.statusChangesSubscription.unsubscribe();
			this.statusChangesSubscription = null;
		}
	}

	next() {
		if (this.statusChangesSubscription) {
			this.statusChangesSubscription.unsubscribe();
			this.statusChangesSubscription = null;
		}
		this.detailsForm.markAllAsTouched();
		this.alertService.clear();
		if (this.detailsForm.pending) {
			this.statusChangesSubscription = this.detailsForm.statusChanges.subscribe(statusChange => {
				this.statusChangesSubscription.unsubscribe();
				this.next();
			});
		} else {
			if (this.detailsForm.valid) {
				this.stepper.next();
			} else {
				this.translateService.get("SHIPPING_CHARGES.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message});
				});
			}
		}
	}

	triggerSave() {
		this.detailsForm.markAllAsTouched();
		this.save.emit(null);
	}

	private setValues() {
		if (this.shippingChargeMainService.shippingChargeData !== null) {
			const shippingChargeData = this.shippingChargeMainService.shippingChargeData;
			this.name.setValue(shippingChargeData.scaleCode);
			this.description.setValue(shippingChargeData.scaleDescription);
			if (shippingChargeData.startDate && new Date(shippingChargeData.startDate).getFullYear() === 1900) {
				this.timePeriod = "always";
			} else {
				this.timePeriod = "specifiedTimePeriod";
			}
			if (shippingChargeData.startDate) {
				this.startDate.setValue(new Date(shippingChargeData.startDate));
			}
			if (shippingChargeData.endDate) {
				this.endDate.setValue(new Date(shippingChargeData.endDate));
			}
		} else {
			this.shippingChargeMainService.shippingChargeData = {
				shippingCodeId: Number(this.route.snapshot.params.shippingCodeId),
				storeId: Number(this.route.snapshot.params.storeId),
				startDate: new Date(1900, 0).toISOString(),
				endDate: new Date(2100, 0).toISOString()
			};
		}
	}

	private getCalculationScales(searchString) {
		if (this.getCalculationScalesSubscription != null) {
			this.getCalculationScalesSubscription.unsubscribe();
			this.getCalculationScalesSubscription = null;
		}
		this.getCalculationScalesSubscription = this.calculationScalesService.getCalculationScales({
			scaleCode: searchString.trim(),
			storeId: Number(this.route.snapshot.params.storeId),
			calculationUsageId: -2
		}).subscribe((body: any) => {
			this.getCalculationScalesSubscription.unsubscribe();
			this.getCalculationScalesSubscription = null;
			this.matchingCalculationScale$.next(body.items.length > 0 ? body.items[0] : null);
		});
	}

	private createFormControls() {
		this.name = new FormControl("", HcValidators.required, control => {
			return new Observable<ValidationErrors | null>((observer: Observer<ValidationErrors | null>) => {
				if (!control.value) {
					observer.next(null);
					observer.complete();
				} else {
					this.matchingCalculationScale$.subscribe((matchingCalculationScale: any) => {
						let errors = null;
						if (matchingCalculationScale) {
							const currentCalculationScaleId = this.shippingChargeMainService.currentCalculationScaleId;
							const id = matchingCalculationScale.id;
							const name = matchingCalculationScale.scaleCode;
							if (name === control.value.trim() && currentCalculationScaleId !== id) {
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
		this.description = new FormControl("");
		this.startDate = new FormControl(null, startDate => {
			let errors = null;
			if (this.timePeriod === "specifiedTimePeriod") {
				if (startDate.value === null || startDate.value === "") {
					errors = {
						required: true
					};
				} else if (this.endDate.value && this.endDate.value < startDate.value) {
					errors = {
						afterEndDate: true
					};
				} else if (this.endDate.errors && this.endDate.errors.beforeStartDate) {
					this.endDate.setErrors(null);
				}
			}
			return errors;
		});
		this.endDate = new FormControl(null, endDate => {
			let errors = null;
			if (this.timePeriod === "specifiedTimePeriod") {
				if (endDate.value === null || endDate.value === "") {
					errors = {
						required: true
					};
				} else if (this.startDate.value && endDate.value < this.startDate.value) {
					errors = {
						beforeStartDate: true
					};
				} else if (this.startDate.errors && this.startDate.errors.afterEndDate) {
					this.startDate.setErrors(null);
				}
			}
			return errors;
		});
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			name: this.name,
			description: this.description,
			startDate: this.startDate,
			endDate: this.endDate
		});
	}
}
