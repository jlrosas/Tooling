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
import { ContractsService } from "../../../../rest/services/contracts.service";

@Component({
	templateUrl: "./delete-contract-dialog.component.html",
	styleUrls: ["./delete-contract-dialog.component.scss"]
})
export class DeleteContractDialogComponent implements OnInit {
	deleteContractForm: FormGroup;
	contractName: string;
	contractId: string;
	processing = false;

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private contractsService: ContractsService,
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<DeleteContractDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.contractName = data.name;
		this.contractId = data.id;
	}

	ngOnInit() {
		this.deleteContractForm = this.fb.group({
		});
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	deleteContract() {
		this.alertService.clear();
		this.processing = true;
		this.contractsService.deleteContract(this.contractId).subscribe(response => {
			this.translateService.get("CONTRACTS.CONTRACT_DELETED_MESSAGE").subscribe((message: string) => {
				this.alertService.success({message});
			});
			this.processing = false;
			this.dialogRef.close({ contractDeleted: true });
		},
		errorResponse => {
			this.processing = false;
		});
	}
}
