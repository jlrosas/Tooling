/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Component, OnInit, Inject, Input, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../../services/alert.service";
import { ContractsService } from "../../../../rest/services/contracts.service";
import { HcValidators } from "../../../../shared/validators";

@Component({
	templateUrl: "./copy-contract-dialog.component.html",
	styleUrls: ["./copy-contract-dialog.component.scss"]
})
export class CopyContractDialogComponent implements OnInit, AfterViewInit {
	copyContractForm: FormGroup;
	name: FormControl;
	contractId: string;
	processing = false;

	@ViewChild("nameInput", {static: false}) nameInput: ElementRef<HTMLInputElement>;

	constructor(private translateService: TranslateService,
			private alertService: AlertService,
			private contractsService: ContractsService,
			private dialogRef: MatDialogRef<CopyContractDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.contractId = data.id;
	}

	ngOnInit() {
		this.createFormControls();
		this.createForm();
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.nameInput.nativeElement.focus();
		}, 250);
	}

	copyContract() {
		if (this.copyContractForm.valid) {
			this.alertService.clear();
			this.processing = true;
			this.contractsService.copyContract({
				id: this.contractId,
				body: {
					name: this.name.value
				}
			}).subscribe(response => {
				this.translateService.get("CONTRACTS.CONTRACT_COPIED_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
				this.processing = false;
				this.dialogRef.close({ contractCopied: true });
			},
			errorResponse => {
				this.processing = false;
			});
		}
	}

	cancel() {
		if (!this.processing) {
			this.alertService.clear();
			this.dialogRef.close();
		}
	}

	private createFormControls() {
		this.name = new FormControl("", HcValidators.required);
	}

	private createForm() {
		this.copyContractForm = new FormGroup({
			name: this.name
		});
	}
}
