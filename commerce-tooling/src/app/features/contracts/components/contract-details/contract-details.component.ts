/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../../services/alert.service";
import { MatStep, MatStepper } from "@angular/material/stepper";
import { ContractMainService } from "../../services/contract-main.service";
import { ContractsService } from "../../../../rest/services/contracts.service";
import { HcValidators } from "../../../../shared/validators";

@Component({
	templateUrl: "./contract-details.component.html",
	styleUrls: ["./contract-details.component.scss"],
	selector: "hc-contract-details"
})
export class ContractDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: any;
	name: FormControl;
	description: FormControl;
	comment: FormControl;
	startDate: FormControl;
	endDate: FormControl;
	baseContract: FormControl;
	startsImmediately: FormControl;
	noExpiryDate: FormControl;

	baseContractList: Array<any> = [];
	getBaseContractsSubscription: Subscription = null;

	@ViewChild("nameInput", {static: false}) nameInput: ElementRef<HTMLInputElement>;
	@ViewChild("descriptionInput", {static: false}) descriptionInput: ElementRef<HTMLInputElement>;

	private baseContractSearchString: Subject<string> = new Subject<string>();

	constructor(private router: Router,
			private route: ActivatedRoute,
			private contractMainService: ContractMainService,
			private contractsService: ContractsService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.contractMainService.loadCurrentContract(this.route.snapshot.params.id).subscribe(
				response => {
					this.setValues();
				}
			);
		} else {
			this.setValues();
		}
		this.baseContractSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getBaseContracts(searchString);
		});
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
		setTimeout(() => {
			this.nameInput.nativeElement.focus();
			if (this.mode === "create") {
				this.nameInput.nativeElement.focus();
			} else {
				this.descriptionInput.nativeElement.focus();
			}
		}, 250);
	}

	ngOnDestroy() {
		this.baseContractSearchString.unsubscribe();
		if (this.getBaseContractsSubscription !== null) {
			this.getBaseContractsSubscription.unsubscribe();
			this.getBaseContractsSubscription = null;
		}
	}

	next() {
		this.detailsForm.markAllAsTouched();
		this.alertService.clear();
		if (this.detailsForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("CONTRACTS.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message});
			});
		}
	}

	startDateFilter = (d: Date | null): boolean => {
		let includeDate = true;
		if (this.endDate.value && this.startDate.value && new Date(this.endDate.value) < new Date(this.startDate.value)) {
			includeDate = true;
		} else if (d && this.endDate.value) {
			includeDate = d < new Date(this.endDate.value);
		}
		return includeDate;
	}

	endDateFilter = (d: Date | null): boolean => {
		let includeDate = true;
		if (this.endDate.value && this.startDate.value && new Date(this.endDate.value) < new Date(this.startDate.value)) {
			includeDate = true;
		} else if (d && this.startDate.value) {
			includeDate = d > new Date(this.startDate.value);
		}
		return includeDate;
	}

	triggerSave() {
		this.detailsForm.markAllAsTouched();
		this.save.emit(null);
	}

	validateName() {
		this.contractMainService.contractData.name = this.name.value;
	}

	validateDescription() {
		this.contractMainService.contractData.description = this.description.value;
	}

	validateComments() {
		this.contractMainService.contractData.comment = this.comment.value;
	}

	changeStartsImmediately($event) {
		if ($event.checked) {
			this.contractMainService.contractData.startDate = null;
			this.startDate.reset();
			this.startDate.disable();
		} else {
			this.startDate.enable();
		}
	}

	changeNoExpiryDate($event) {
		if ($event.checked) {
			this.contractMainService.contractData.endDate = null;
			this.endDate.reset();
			this.endDate.disable();
		} else {
			this.endDate.enable();
		}
	}

	selectStartDate(startDate) {
		this.contractMainService.contractData.startDate = startDate;
		this.endDate.updateValueAndValidity();
	}

	selectEndDate(endDate) {
		this.contractMainService.contractData.endDate = endDate;
		this.startDate.updateValueAndValidity();
	}

	getBaseContracts(searchString: string) {
		if (this.getBaseContractsSubscription !== null) {
			this.getBaseContractsSubscription.unsubscribe();
			this.getBaseContractsSubscription = null;
		}
		this.contractMainService.contractData.baseContractId = null;
		this.contractMainService.contractData.baseContractName = null;
		this.getBaseContractsSubscription = this.contractsService.getContracts({
			searchString: searchString,
			accountId: this.route.snapshot.params.accountId,
			baseContracts: true,
			status: "active",
			sort: "name",
			limit: 10
		}).subscribe(
			response => {
				if (response.items.length === 1 && response.items[0].name === this.baseContract.value) {
					this.selectBaseContract(response.items[0]);
				} else {
					this.baseContractList = response.items;
				}
				this.getBaseContractsSubscription = null;
			},
			error => {
				this.getBaseContractsSubscription = null;
				console.log(error);
			}
		);
	}

	searchBaseContracts(value) {
		this.baseContractSearchString.next(value);
	}

	selectBaseContract(contract: any) {
		this.contractMainService.contractData.baseContractId = contract.id;
		this.contractMainService.contractData.baseContractName = contract.name;
		this.baseContract.setValue(contract.name);
	}

	private setValues() {
		if (this.contractMainService.contractData != null) {
			const contractData = this.contractMainService.contractData;
			this.name.setValue(contractData.name);
			this.description.setValue(contractData.description);
			this.comment.setValue(contractData.comment);
			if (contractData.startDate === null) {
				this.startsImmediately.setValue(true);
				this.startDate.disable();
			} else {
				this.startDate.setValue(contractData.startDate);
			}
			if (contractData.endDate === null) {
				this.noExpiryDate.setValue(true);
				this.endDate.disable();
			} else {
				this.endDate.setValue(contractData.endDate);
			}
			if (contractData.baseContractName) {
				this.baseContract.setValue(contractData.baseContractName);
			} else {
				this.getBaseContracts("");
			}
		} else {
			this.contractMainService.contractData = {
				accountId: this.route.snapshot.params.accountId
			};
			this.getBaseContracts("");
		}
	}

	private createFormControls() {
		if (this.mode === "edit") {
			this.name = new FormControl({value: "", disabled: true});
		} else {
			this.name = new FormControl("", HcValidators.required);
		}
		this.description = new FormControl("", HcValidators.required);
		this.comment = new FormControl("");
		this.startsImmediately = new FormControl(false);
		this.noExpiryDate = new FormControl(false);
		this.startDate = new FormControl("", control => {
			const value = control.value;
			const contractData = this.contractMainService.contractData;
			let errors = null;
			if (value && contractData.endDate) {
				if (new Date(value) > new Date(contractData.endDate)) {
					errors = {
						invalidStartDate: true
					};
				}
			}
			return errors;
		});
		this.endDate = new FormControl("", control => {
			const value = control.value;
			const contractData = this.contractMainService.contractData;
			let errors = null;
			if (value && contractData.startDate) {
				if (new Date(value) < new Date(contractData.startDate)) {
					errors = {
						invalidEndDate: true
					};
				}
			}
			return errors;
		});
		this.baseContract = new FormControl("", [
			contract => {
				const value = contract.value;
				const contractData = this.contractMainService.contractData;
				let errors = null;
				if (value !== "" &&
						(value !== contractData.baseContractName ||
							contractData.baseContractId === null)) {
					errors = {
						invalidBaseContract: true
					};
				}
				return errors;
			}
		]);
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			name: this.name,
			description: this.description,
			comment: this.comment,
			startsImmediately: this.startsImmediately,
			noExpiryDate: this.noExpiryDate,
			startDate: this.startDate,
			endDate: this.endDate,
			baseContract: this.baseContract
		});
	}
}
