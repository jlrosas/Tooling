/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSelect } from "@angular/material/select";
import { Component, OnInit, Inject, Input, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators, Form } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../../services/alert.service";
import { ShippingModeMainService } from "../../services/shipping-mode-main.service";

@Component({
	templateUrl: "./shipping-mode-description-dialog.component.html",
	styleUrls: ["./shipping-mode-description-dialog.component.scss"]
})
export class ShippingModeDescriptionDialogComponent implements OnInit, AfterViewInit {
	descriptionForm: FormGroup;
	description: FormControl;
	additionalDescription: FormControl;
	estimateDeliveryTime: FormControl;
	language: FormControl;
	data = null;
	mode = null;
	languageIdList: Array<any> = [];
	languageList = {};

	@ViewChild("languageSelect") languageSelect: MatSelect;
	@ViewChild("descriptionInput") descriptionInput: ElementRef<HTMLInputElement>;

	constructor(
			private translateService: TranslateService,
			private alertService: AlertService,
			private shippingModeMainService: ShippingModeMainService,
			private dialogRef: MatDialogRef<ShippingModeDescriptionDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.data = data;
	}

	ngOnInit() {
		if (this.data) {
			this.mode = this.data.mode;
			this.createFormControls();
			this.createForm();
			this.languageList = this.data.languageList;
			this.languageIdList = Object.keys(this.data.languageList).map(Number);
			if (this.data && this.data.description) {
				this.description.setValue(this.data.description.description);
				this.additionalDescription.setValue(this.data.description.field1);
				this.estimateDeliveryTime.setValue(this.data.description.field2);
			}
			this.setSelectedLanguage();
		}
	}

	ngAfterViewInit() {
		setTimeout(() => {
			if (this.mode === "edit") {
				this.descriptionInput.nativeElement.focus();
			} else {
				this.languageSelect.focus();
			}
		}, 250);
	}

	save() {
		this.descriptionForm.markAllAsTouched();
		this.alertService.clear();
		if (this.descriptionForm.valid) {
			const description = this.data.description ? this.data.description : {};
			if (this.data.mode === "create") {
				description.languageId = this.language.value;
			}
			description.description = this.description.value;
			description.field1 = this.additionalDescription.value;
			description.field2 = this.estimateDeliveryTime.value;
			this.dialogRef.close(description);
		} else {
			this.descriptionForm.markAllAsTouched();
			this.translateService.get("SHIPPING_MODES.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	cancel() {
		this.alertService.clear();
		this.dialogRef.close();
	}

	private createFormControls() {
		if (this.mode === "edit") {
			this.language = new FormControl({value: "", disabled: true});
		} else {
			this.language = new FormControl("", [Validators.required, control => {
				const value = control.value;
				const currentDescriptions = this.shippingModeMainService.shippingModeDescriptions;
				let errors = null;
				if (value !== "" && currentDescriptions.length > 0) {
					let found = false;
					for (let i = 0; i < currentDescriptions.length; i++) {
						if (currentDescriptions[i].languageId === value) {
							found = true;
							break;
						}
					}
					if (found) {
						errors = {
							duplicate: true
						};
					}
				}
				return errors;
			}]);
		}
		this.description = new FormControl("");
		this.additionalDescription = new FormControl("");
		this.estimateDeliveryTime = new FormControl("");
	}

	private createForm() {
		this.descriptionForm = new FormGroup({
			description: this.description,
			additionalDescription: this.additionalDescription,
			estimateDeliveryTime: this.estimateDeliveryTime,
			language: this.language
		});
	}

	private setSelectedLanguage() {
		if (this.data.description) {
			const languageId = this.data.description.languageId;
			if (languageId) {
				this.language.setValue(this.languageList[languageId]);
			}
		}
	}
}
