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
import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { CalculationScalesService } from "../../../../rest/services/calculation-scales.service";
import { CalculationRulesService } from "../../../../rest/services/calculation-rules.service";

@Component({
	templateUrl: "./delete-shipping-charge-dialog.component.html",
	styleUrls: ["./delete-shipping-charge-dialog.component.scss"]
})
export class DeleteShippingChargeDialogComponent implements OnInit {
	deleteShippingChargeForm: FormGroup;
	calculationRuleId: number;
	calculationScaleId?: number;
	name?: string;

	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private calculationScalesService: CalculationScalesService,
			private calculationRulesService: CalculationRulesService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<DeleteShippingChargeDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.name = data.name;
		this.calculationRuleId = data.calculationRuleId;
		this.calculationScaleId = data.calculationScaleId;
	}

	ngOnInit() {
		this.deleteShippingChargeForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	deleteShippingCharge() {
		this.alertService.clear();
		if (!this.processing) {
			this.processing = true;
			this.calculationRulesService.deleteCalculationRuleById(this.calculationRuleId).subscribe(response => {
				this.calculationScalesService.deleteCalculationScaleById(this.calculationScaleId).subscribe(response2 => {
					this.translateService.get("SHIPPING_CHARGES.SHIPPING_CHARGE_DELETED_MESSAGE").subscribe((message: string) => {
						this.alertService.success({message});
					});
					this.processing = false;
					this.dialogRef.close({ shippingChargeDeleted: true });
				},
				error => {
					this.processing = false;
				});
			},
			error => {
				this.processing = false;
			});
		}
	}
}
