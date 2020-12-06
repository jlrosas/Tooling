/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { MatSelect } from "@angular/material/select";
import { MatStep } from "@angular/material/stepper";
import { FormGroup, FormControl, Validators, ValidationErrors } from "@angular/forms";
import { Subject, Subscription, Observable, Observer } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { TaxCodeMainService } from "../../services/tax-code-main.service";
import { CalculationCodesService } from "../../../../rest/services/calculation-codes.service";
import { AlertService } from "../../../../services/alert.service";
import { HcValidators } from "../../../../shared/validators";

@Component({
	selector: "hc-tax-code-details",
	templateUrl: "./tax-code-details.component.html",
	styleUrls: ["./tax-code-details.component.scss"]
})
export class TaxCodeDetailsComponent implements OnInit, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: FormGroup | any;
	name: FormControl;
	taxType:  FormControl;

	taxTypes = [
		{
			value: -3,
			textKey: "TAX_CODES.TAX_TYPE_SALES"
		},
		{
			value: -4,
			textKey: "TAX_CODES.TAX_TYPE_SHIPPING"
		}
	];

	@ViewChild("taxTypeSelect") taxTypeSelect: MatSelect;
	@ViewChild("nameInput") nameInput: ElementRef<HTMLInputElement>;

	private getTaxCodesSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private matchingTaxCode$: Subject<any> = new Subject<any>();

	constructor(private route: ActivatedRoute,
			private taxCodeMainService: TaxCodeMainService,
			private calculationCodesService: CalculationCodesService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.taxCodeMainService.loadCurrentTaxCode(Number(this.route.snapshot.params.id)).subscribe(response => {
				this.setValues();
			});
		} else {
			this.setValues();
		}
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getTaxCodes(searchString);
		});
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
		setTimeout(() => {
			if (this.mode === "edit") {
				this.nameInput.nativeElement.focus();
			} else {
				this.taxTypeSelect.focus();
			}
		}, 250);
	}

	triggerSave() {
		this.detailsForm.markAllAsTouched();
		this.save.emit(null);
	}

	validateName() {
		this.taxCodeMainService.taxCodeData.calculationCode = this.name.value;
	}

	selectTaxType(taxType: any) {
		this.taxCodeMainService.taxCodeData.calculationUsageId = taxType.value;
	}

	private setValues() {
		const taxCodeData = this.taxCodeMainService.taxCodeData;
		if (taxCodeData) {
			this.name.setValue(taxCodeData.calculationCode ? taxCodeData.calculationCode : "");
			if (taxCodeData.calculationUsageId) {
				for (let i = 0; i < this.taxTypes.length; i++) {
					if (this.taxTypes[i].value === taxCodeData.calculationUsageId) {
						this.taxType.setValue(this.taxTypes[i]);
						break;
					}
				}
			}
		} else {
			this.taxCodeMainService.taxCodeData = {
				storeId: Number(this.route.snapshot.params.storeId)
			};
		}
	}

	private getTaxCodes(searchString) {
		if (this.getTaxCodesSubscription != null) {
			this.getTaxCodesSubscription.unsubscribe();
			this.getTaxCodesSubscription = null;
		}
		this.getTaxCodesSubscription = this.calculationCodesService.getCalculationCodes({
			calculationCode: searchString.trim(),
			storeId: Number(this.route.snapshot.params.storeId),
			calculationUsageId: [-3, -4]
		}).subscribe((body: any) => {
			this.getTaxCodesSubscription.unsubscribe();
			this.getTaxCodesSubscription = null;
			this.matchingTaxCode$.next(body.items.length > 0 ? body.items[0] : null);
		});
	}

	private createFormControls() {
		if (this.mode === "edit") {
			this.taxType = new FormControl({value: null, disabled: true});
		} else {
			this.taxType = new FormControl(null, Validators.required);
		}
		this.name = new FormControl("", HcValidators.required, control => {
			return new Observable<ValidationErrors | null>((observer: Observer<ValidationErrors | null>) => {
				if (!control.value) {
					observer.next(null);
					observer.complete();
				} else {
					this.matchingTaxCode$.subscribe((matchingTaxCode: any) => {
						let errors = null;
						if (matchingTaxCode) {
							const currentTaxCodeId = this.taxCodeMainService.currentTaxCodeId;
							const id = matchingTaxCode.id;
							const name = matchingTaxCode.calculationCode;
							if (name === control.value.trim() && currentTaxCodeId !== id) {
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
			taxType: this.taxType,
			name: this.name
		});
	}
}
