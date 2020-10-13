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
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { OrganizationMainService } from "../../services/organization-main.service";
import { Subscription, Subject } from "rxjs";
import { AlertService } from "../../../../services/alert.service";
import { MatStep, MatStepper } from "@angular/material";
import { debounceTime } from "rxjs/operators";
import { HcValidators } from "../../../../shared/validators";

@Component({
	templateUrl: "./organization-details.component.html",
	styleUrls: ["./organization-details.component.scss"],
	selector: "hc-organization-details"
})
export class OrganizationDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: any;
	organizationName: FormControl;
	description: FormControl;
	organizationType: FormControl;
	parentOrganization: FormControl;

	organizationList: Array<any> = [];
	getOrganizationsSubscription: Subscription = null;
	organizationsLoading = false;

	@ViewChild("organizationNameInput", {static: false}) organizationNameInput: ElementRef<HTMLInputElement>;
	@ViewChild("descriptionInput", {static: false}) descriptionInput: ElementRef<HTMLInputElement>;

	private parentOrgSearchString: Subject<string> = new Subject<string>();
	private onLangChangeSubscription: Subscription = null;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private translateService: TranslateService,
			private organizationMainService: OrganizationMainService,
			private organizationsService: OrganizationsService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.organizationMainService.loadCurrentOrganization(this.route.snapshot.params.id).subscribe(
				response => {
					this.setValues();
				}
			);
		} else {
			if (this.organizationMainService.organizationData != null) {
				const organizationData = this.organizationMainService.organizationData;
				this.organizationName.setValue(organizationData.organizationName);
				this.organizationType.setValue(organizationData.organizationType);
				this.description.setValue(organizationData.description);
				this.parentOrganization.setValue(organizationData.parentOrganizationName);
			} else {
				this.organizationMainService.organizationData = {
					"address": {}
				};
			}
			this.getOrganizations("");
			this.parentOrgSearchString.pipe(debounceTime(250)).subscribe(searchString => {
				this.getOrganizations(searchString);
			});
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
		setTimeout(() => {
			if (this.mode === "create") {
				this.organizationNameInput.nativeElement.focus();
			} else {
				this.descriptionInput.nativeElement.focus();
			}
		}, 250);
	}

	ngOnDestroy() {
		if (this.onLangChangeSubscription) {
			this.onLangChangeSubscription.unsubscribe();
		}
	}

	next() {
		this.alertService.clear();
		if (this.detailsForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("ORGANIZATIONS.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message, clear: true});
			});
		}
	}

	validateOrganizationName() {
		this.organizationMainService.organizationData.organizationName = this.organizationName.value;
	}

	validateDescription() {
		this.organizationMainService.organizationData.description = this.description.value;
	}

	searchParentOrganization(value) {
		this.parentOrgSearchString.next(value);
	}

	getOrganizations(orgString: string) {
		this.organizationsLoading = true;
		if (this.getOrganizationsSubscription != null) {
			this.getOrganizationsSubscription.unsubscribe();
			this.getOrganizationsSubscription = null;
		}
		this.organizationMainService.organizationData.parentOrganizationId = null;
		this.organizationMainService.organizationData.parentOrganizationName = null;
		this.getOrganizationsSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
			organizationName: orgString,
			limit: 10
		}).subscribe(response => {
			if (response.items.length === 1 && response.items[0].organizationName === this.parentOrganization.value) {
				this.selectParentOrganization(response.items[0]);
			} else {
				response.items.sort((org1, org2) => {
					let result = 0;
					if (org1.organizationName < org2.organizationName) {
						result = -1;
					} else if (org1.organizationName > org2.organizationName) {
						result = 1;
					}
					return result;
				});
				this.organizationList = response.items;
			}
			this.getOrganizationsSubscription = null;
			this.organizationsLoading = false;
		},
		error => {
			this.getOrganizationsSubscription = null;
			this.organizationsLoading = false;
		});
	}

	triggerSave() {
		this.save.emit(null);
	}

	selectParentOrganization(org: any) {
		if (org) {
			this.organizationMainService.organizationData.parentOrganizationId = org.id;
			this.organizationMainService.organizationData.parentOrganizationName = org.organizationName;
			this.parentOrganization.setValue(org.organizationName);
		} else {
			this.searchParentOrganization("");
		}
	}

	selectOrganizationType(orgType: any) {
		this.organizationMainService.organizationData.organizationType = orgType;
	}

	private setValues() {
		const organizationData = this.organizationMainService.organizationData;
		this.organizationName.setValue(organizationData.organizationName);
		this.description.setValue(organizationData.description);
		this.parentOrganization.setValue(organizationData.parentOrganizationName);
		this.setTranslatables();
		this.onLangChangeSubscription = this.translateService.onLangChange.subscribe(() => {
			this.setTranslatables();
		});
	}

	private setTranslatables() {
		const organizationData = this.organizationMainService.organizationData;
		if (organizationData.organizationType === "O") {
			this.translateService.get("ORGANIZATIONS.ORGANIZATION").subscribe((text: string) => {
				this.organizationType.setValue(text);
			});
		} else if (organizationData.organizationType === "OU") {
			this.translateService.get("ORGANIZATIONS.ORGANIZATIONAL_UNIT").subscribe((text: string) => {
				this.organizationType.setValue(text);
			});
		} else {
			this.organizationType.setValue(organizationData.organizationType);
		}
	}

	private createFormControls() {
		if (this.mode === "edit") {
			this.organizationName = new FormControl({value: "", disabled: true});
			this.description = new FormControl("");
			this.organizationType = new FormControl({value: "", disabled: true});
			this.parentOrganization = new FormControl({value: "", disabled: true});
		} else {
			this.organizationName = new FormControl("", HcValidators.required);
			this.description = new FormControl("");
			this.organizationType = new FormControl("", Validators.required);
			this.parentOrganization = new FormControl("", [
				Validators.required,
				parentOrganization => {
					const value = parentOrganization.value;
					const organizationData = this.organizationMainService.organizationData;
					let errors = null;
					if (value !== "" &&
							(value !== organizationData.parentOrganizationName ||
							organizationData.parentOrganizationId === null)) {
						errors = {
							invalidParentOrganization: true
						};
					}
					return errors;
				}
			]);
		}
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			organizationName : this.organizationName,
			description: this.description,
			organizationType: this.organizationType,
			parentOrganization: this.parentOrganization
		});
	}
}
