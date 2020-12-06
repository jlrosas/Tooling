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
import { FormGroup, FormControl, ValidationErrors, Validators } from "@angular/forms";
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
export class ShippingCodeDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: FormGroup | any;
	name: FormControl;
	productsOrCategories: FormControl;
	hasProductsOrCategories = false;
	isInherited = false;
	isInheritedAllProducts = false;
	isInheritedSpecificProducts = false;
	storeId: number;

	@ViewChild("nameInput") nameInput: ElementRef<HTMLInputElement>;

	private getShippingCodesSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private matchingShippingCode$: Subject<any> = new Subject<any>();
	private statusChangesSubscription: Subscription = null;

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
		this.storeId = Number(this.route.snapshot.params.storeId);
		if (this.mode === "edit") {
			this.shippingCodeMainService.loadCurrentShippingCode(Number(this.route.snapshot.params.id), this.storeId).subscribe(response => {
				this.setValues();
			});
		} else {
			this.setValues();
		}
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getShippingCodes(searchString);
		});
	}

	ngOnDestroy() {
		if (this.getShippingCodesSubscription) {
			this.getShippingCodesSubscription.unsubscribe();
		}
		if (this.statusChangesSubscription) {
			this.statusChangesSubscription.unsubscribe();
		}
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
		} else if (this.detailsForm.valid) {
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

	validateSelectProductsOrCategories($event) {
		this.shippingCodeMainService.shippingCodeData.productsOrCategories = $event.value;
		this.shippingCodeMainService.onSelectProductsOrCategories.emit($event.value);
	}

	private setValues() {
		if (this.shippingCodeMainService.shippingCodeData !== null) {
			const shippingCodeData = this.shippingCodeMainService.shippingCodeData;
			this.name.setValue(shippingCodeData.calculationCode);
			if (shippingCodeData.storeId !== this.storeId) {
				this.name.disable();
			}
		} else {
			this.shippingCodeMainService.shippingCodeData = {
				storeId: this.storeId,
				productsOrCategories: "allProducts"
			};
		}
		this.productsOrCategories.setValue(this.shippingCodeMainService.shippingCodeData.productsOrCategories);
		this.isInherited = this.storeId !== this.shippingCodeMainService.shippingCodeData.storeId;
		this.isInheritedAllProducts = this.isInherited && this.shippingCodeMainService.inheritedProductsOrCategories === "allProducts";
		this.isInheritedSpecificProducts = this.isInherited && this.shippingCodeMainService.inheritedProductsOrCategories === "specificProducts";
	}

	private getShippingCodes(searchString) {
		if (this.getShippingCodesSubscription != null) {
			this.getShippingCodesSubscription.unsubscribe();
			this.getShippingCodesSubscription = null;
		}
		this.getShippingCodesSubscription = this.calculationCodesService.getCalculationCodes({
			calculationCode: searchString.trim(),
			storeId: this.storeId,
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
		this.productsOrCategories = new FormControl(null, Validators.required);
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			name: this.name,
			productsOrCategories: this.productsOrCategories
		});
	}
}
