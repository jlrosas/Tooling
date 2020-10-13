/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { MatStep, MatStepper } from "@angular/material/stepper";
import { FormGroup, FormControl, ValidationErrors } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subject, Subscription, Observable, Observer } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ShippingModeMainService } from "../../services/shipping-mode-main.service";
import { ShippingModesService } from "../../../../rest/services/shipping-modes.service";
import { ShippingModeCarriersService } from "../../../../rest/services/shipping-mode-carriers.service";
import { ShippingModeCodesService } from "../../../../rest/services/shipping-mode-codes.service";
import { AlertService } from "../../../../services/alert.service";
import { HcValidators } from "../../../../shared/validators";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "hc-shipping-mode-details",
	templateUrl: "./shipping-mode-details.component.html",
	styleUrls: ["./shipping-mode-details.component.scss"]
})
export class ShippingModeDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: FormGroup | any;
	carrier: FormControl;
	service: FormControl;
	trackingURL: FormControl;
	storeId = null;
	carrierList: Array<any> = [];
	serviceList: Array<any> = [];

	@ViewChild("carrierInput", {static: false}) carrierInput: ElementRef<HTMLInputElement>;
	@ViewChild("trackingURLInput", {static: false}) trackingURLInput: ElementRef<HTMLInputElement>;

	private statusChangesSubscription: Subscription = null;
	private carrierSearchString: Subject<string> = new Subject<string>();
	private getCarriersSubscription: Subscription = null;
	private serviceSearchString: Subject<string> = new Subject<string>();
	private getServicesSubscription: Subscription = null;
	private getShippingModesSubscription: Subscription = null;
	private matchingShippingMode$: Subject<any> = new Subject<any>();

	constructor(private route: ActivatedRoute,
			private shippingModeMainService: ShippingModeMainService,
			private shippingModesService: ShippingModesService,
			private shippingModeCarriersService: ShippingModeCarriersService,
			private shippingModeCodesService: ShippingModeCodesService,
			private translateService: TranslateService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		this.storeId = Number(this.route.snapshot.params.storeId);
		if (this.mode === "edit") {
			this.shippingModeMainService.loadCurrentShippingMode(this.route.snapshot.params.id).subscribe(response => {
				this.setValues();
			});
		} else {
			this.setValues();
			this.carrierSearchString.pipe(debounceTime(250)).subscribe(searchString => {
				this.getCarriers(searchString);
				this.getShippingModes(searchString, this.service.value);
			});
			this.carrierSearchString.next("");
			this.serviceSearchString.pipe(debounceTime(250)).subscribe(searchString => {
				this.getServices(searchString);
				this.getShippingModes(this.carrier.value, searchString);
			});
			this.serviceSearchString.next("");
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
		setTimeout(() => {
			if (this.mode === "edit") {
				this.trackingURLInput.nativeElement.focus();
			} else {
				this.carrierInput.nativeElement.focus();
			}
		}, 250);
	}

	ngOnDestroy() {
		if (this.getCarriersSubscription) {
			this.getCarriersSubscription.unsubscribe();
		}
		if (this.getServicesSubscription) {
			this.getServicesSubscription.unsubscribe();
		}
		if (this.getShippingModesSubscription) {
			this.getShippingModesSubscription.unsubscribe();
		}
		if (this.statusChangesSubscription) {
			this.statusChangesSubscription.unsubscribe();
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
		} else if (this.detailsForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("SHIPPING_MODES.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	triggerSave() {
		this.detailsForm.markAllAsTouched();
		this.save.emit(null);
	}

	validateCarrier() {
		this.shippingModeMainService.shippingModeData.carrier = this.carrier.value;
		if (this.carrier.value.trim() === "") {
			this.carrierSearchString.next("");
		}
		this.service.updateValueAndValidity();
	}

	validateService() {
		this.shippingModeMainService.shippingModeData.service = this.service.value;
		if (this.service.value.trim() === "") {
			this.serviceSearchString.next("");
		}
		this.carrier.updateValueAndValidity();
	}

	validateTrackingUrl() {
		this.shippingModeMainService.shippingModeData.trackingURL = this.trackingURL.value;
	}

	getCarriers(searchString: string) {
		if (this.getCarriersSubscription !== null) {
			this.getCarriersSubscription.unsubscribe();
			this.getCarriersSubscription = null;
		}
		const args: ShippingModeCarriersService.GetShippingModeCarriersParams = {
			storeId:  this.storeId,
			limit: 10
		};
		if (searchString != null && searchString.length !== 0) {
			args.searchString = searchString;
		}
		this.getCarriersSubscription = this.shippingModeCarriersService.getShippingModeCarriers(args).subscribe(response => {
			if (response.items.length === 1 && response.items[0] === this.carrier.value) {
				this.carrierList = [];
			} else {
				this.carrierList = response.items;
			}
			this.getCarriersSubscription = null;
		},
		error => {
			this.getCarriersSubscription = null;
		});
	}

	selectCarrier(carrier: string) {
		this.shippingModeMainService.shippingModeData.carrier = carrier;
		this.carrier.setValue(carrier);
		this.service.updateValueAndValidity();
	}

	getServices(searchString: string) {
		if (this.getServicesSubscription !== null) {
			this.getServicesSubscription.unsubscribe();
			this.getServicesSubscription = null;
		}
		const args: ShippingModeCodesService.GetShippingModeCodesParams = {
			storeId:  this.storeId,
			limit: 10
		};
		if (searchString != null && searchString.length !== 0) {
			args.searchString = searchString;
		}
		this.getServicesSubscription = this.shippingModeCodesService.getShippingModeCodes(args).subscribe(response => {
			if (response.items.length === 1 && response.items[0] === this.service.value) {
				this.serviceList = [];
			} else {
				this.serviceList = response.items;
			}
			this.getServicesSubscription = null;
		},
		error => {
			this.getServicesSubscription = null;
		});
	}

	selectService(service: string) {
		this.shippingModeMainService.shippingModeData.service = service;
		this.service.setValue(service);
		this.carrier.updateValueAndValidity();
	}

	private setValues() {
		const shippingModeData = this.shippingModeMainService.shippingModeData;
		if (shippingModeData) {
			this.carrier.setValue(shippingModeData.carrier ? shippingModeData.carrier : "");
			this.service.setValue(shippingModeData.service ? shippingModeData.service : "");
			this.trackingURL.setValue(shippingModeData.trackingURL ? shippingModeData.trackingURL : "");
		} else {
			this.shippingModeMainService.shippingModeData = { storeId : this.storeId };
		}
	}

	private getShippingModes(carrier: string, service: string) {
		if (this.getShippingModesSubscription != null) {
			this.getShippingModesSubscription.unsubscribe();
			this.getShippingModesSubscription = null;
		}
		if (carrier !== "" && service !== "") {
			const args: ShippingModesService.GetShippingModesParams = {
				storeId: this.storeId,
				carrier,
				markForDelete: [0, 1],
				shippingCode: service
			};
			this.getShippingModesSubscription = this.shippingModesService.getShippingModes(args).subscribe((body: any) => {
				this.getShippingModesSubscription.unsubscribe();
				this.getShippingModesSubscription = null;
				const currentShippingModeId = this.shippingModeMainService.currentShippingModeId;
				let matchingShippingMode = null;
				if (body.items.length > 0) {
					body.items.forEach(item => {
						if (matchingShippingMode === null || item.id === currentShippingModeId) {
							matchingShippingMode = item;
						}
					});
				}
				this.matchingShippingMode$.next(matchingShippingMode);
			});
		} else {
			this.matchingShippingMode$.next(null);
		}
	}

	private createFormControls() {
		if (this.mode === "edit") {
			this.carrier = new FormControl({value: "", disabled: true});
			this.service = new FormControl({value: "", disabled: true});
			this.trackingURL = new FormControl("");
		} else {
			this.carrier = new FormControl("", HcValidators.required, control => {
				return new Observable<ValidationErrors | null>((observer: Observer<ValidationErrors | null>) => {
					this.matchingShippingMode$.subscribe((matchingShippingMode: any) => {
						let errors = null;
						if (matchingShippingMode) {
							const currentShippingModeId = this.shippingModeMainService.currentShippingModeId;
							const id = matchingShippingMode.id;
							if (currentShippingModeId !== id) {
								errors = {
									duplicate: true
								};
							}
						}
						observer.next(errors);
						observer.complete();
					});
					this.carrierSearchString.next(control.value);
				});
			});
			this.service = new FormControl("", HcValidators.required, control => {
				return new Observable<ValidationErrors | null>((observer: Observer<ValidationErrors | null>) => {
					this.matchingShippingMode$.subscribe((matchingShippingMode: any) => {
						let errors = null;
						if (matchingShippingMode) {
							const currentShippingModeId = this.shippingModeMainService.currentShippingModeId;
							const id = matchingShippingMode.id;
							if (currentShippingModeId !== id) {
								errors = {
									duplicate: true
								};
							}
						}
						observer.next(errors);
						observer.complete();
					});
					this.serviceSearchString.next(control.value);
				});
			});
			this.trackingURL = new FormControl("");
		}
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			carrier: this.carrier,
			service: this.service,
			trackingURL: this.trackingURL
		});
	}
}
