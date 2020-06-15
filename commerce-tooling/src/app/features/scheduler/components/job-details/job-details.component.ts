/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { AlertService } from "../../../../services/alert.service";
import { Subject, Subscription, Observable } from "rxjs";
import { map, startWith, debounceTime } from "rxjs/operators";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { JobTypesService } from "../../../../rest/services/job-types.service";
import { JobSiteCommandsService } from "../../../../rest/services/job-site-commands.service";
import { JobStoreCommandsService } from "../../../../rest/services/job-store-commands.service";
import { JobMainService } from "../../services/job-main.service";
import { StoreNameService } from "../../../../services/store-name.service";

@Component({
	templateUrl: "./job-details.component.html",
	styleUrls: ["./job-details.component.scss"],
	selector: "hc-job-details"
})
export class JobDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: any;
	storeDropdown: FormControl;
	commandFormControl: FormControl;
	storeCommandFormControl: FormControl;
	applicationTypeDropdown: FormControl;
	parametersFormControl: FormControl;
	storeCheckCommandFormControl: FormControl;
	descriptionFormControl: FormControl;

	applicationType: string = null;
	command: string = null;
	selectedStore = 0;
	storeList: Array<any> = [];

	siteCommandList: Array<any> = [];
	filteredSiteCommandList: Array<any> = [];

	storeCommandList: Array<any> = [];
	checkCommandList: Array<any> = [];

	applicationTypeList: Array<any> = [];

	private onLangChangeSubscription: Subscription = null;
	private getStoresSubscription: Subscription = null;
	private storeSearchString: Subject<string> = new Subject<string>();
	private siteCommandSearchString: Subject<string> = new Subject<string>();

	constructor(private router: Router,
			private route: ActivatedRoute,
			private translateService: TranslateService,
			private alertService: AlertService,
			private jobTypesService: JobTypesService,
			private jobSiteCommandsService: JobSiteCommandsService,
			private jobStoreCommandsService: JobStoreCommandsService,
			private onlineStoresService: OnlineStoresService,
			private jobMainService: JobMainService,
			private storeNameService: StoreNameService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		this.getJobStoreCommandList();

		this.storeSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getStores(searchString);
		});

		this.siteCommandSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			const filterValue = searchString.toLowerCase();
			this.filteredSiteCommandList = 	this.siteCommandList.filter(
					command => command.command.toLowerCase().includes(filterValue));
		});

		if (this.mode === "edit") {
			this.setValues();
		} else {
			if (this.jobMainService.jobData !== null) {
				const jobData = this.jobMainService.jobData;
				this.selectedStore = this.jobMainService.jobData.storeId;
				if (this.selectedStore !== 0) {
					this.storeDropdown.setValue(jobData.storeName);
				} else {
					this.commandFormControl.setValue(jobData.command || "");
				}
				this.applicationTypeDropdown.setValue(jobData.applicationType || "");
				this.parametersFormControl.setValue(jobData.query || "");
				this.descriptionFormControl.setValue(jobData.description || "");
			} else {
				this.jobMainService.jobData = {
					storeId: 0
				};
				this.applicationTypeDropdown.setValue("default");
				this.selectApplicationType("default");
			}
			this.getApplicationTypeList();
			this.getJobSiteCommandList();
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
	}

	ngOnDestroy() {
		if (this.onLangChangeSubscription) {
			this.onLangChangeSubscription.unsubscribe();
		}
	}

	next() {
		this.detailsForm.markAllAsTouched();
		this.alertService.clear();
		if (this.detailsForm.valid) {
			this.stepper.next();
		} else {
			this.translateService.get("SCHEDULER.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message, clear: true});
			});
		}
	}

	triggerSave() {
		this.detailsForm.markAllAsTouched();
		this.alertService.clear();
		if (this.detailsForm.valid) {
			this.save.emit(null);
		} else {
			this.translateService.get("SCHEDULER.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message, clear: true});
			});
		}
	}

	searchSiteCommand(searchString: string) {
		this.jobMainService.jobData.command = null;
		this.command = null;
		this.siteCommandSearchString.next(searchString);
	}

	getJobSiteCommandList() {
		this.jobSiteCommandsService.getScheduledJobSiteCommands("application/json").
				subscribe((body: any) => {
			this.siteCommandList = body.items;
			this.searchSiteCommand(this.commandFormControl.value);
		});
	}

	selectJobSiteCommand(command: string) {
		this.jobMainService.jobData.command = command;
		this.command = command;
		this.commandFormControl.setValue(command);
	}

	getJobStoreCommandList() {
		this.jobStoreCommandsService.getScheduledJobStoreCommands("application/json").
				subscribe((body: any) => {
			this.storeCommandList = body.items;
			this.initStoreCommand();
		});
	}

	selectJobStoreCommand(command: any) {
		this.checkCommandList = command.checkCommands;
		this.jobMainService.jobData.command = command.command;
		this.command = command.command;
		this.jobMainService.jobData.checkCommandName = null;
		this.jobMainService.jobData.checkCommandInterface = null;
		this.jobMainService.jobData.checkCommandId = null;
	}

	selectJobStoreCheckCommand(checkCommand: any) {
		this.jobMainService.jobData.checkCommandName = checkCommand.displayName;
		this.jobMainService.jobData.checkCommandInterface = checkCommand.interfaceName;
		this.jobMainService.jobData.checkCommandId = checkCommand.id;
	}

	clearStore($event) {
		this.selectedStore = 0;
		this.jobMainService.jobData.storeId = 0;
		this.jobMainService.jobData.storeName = null;
		this.storeDropdown.setValue("");
		this.commandFormControl.setValue(null);
		this.jobMainService.jobData.command = null;
		this.command = null;
		this.checkCommandList = [];
		this.jobMainService.jobData.checkCommandName = null;
		this.jobMainService.jobData.checkCommandInterface = null;
		this.jobMainService.jobData.checkCommandId = null;
		this.storeCommandFormControl.setValue(null);
		this.updateFormControlEnablement();
		this.searchStores("");
		$event.stopPropagation();
	}

	selectStore(store: any) {
		this.selectedStore = store.id;
		this.jobMainService.jobData.storeId = this.selectedStore;
		this.jobMainService.jobData.storeName = store.identifier;
		this.commandFormControl.setValue(null);
		this.jobMainService.jobData.command = null;
		this.command = null;
		this.checkCommandList = [];
		this.storeCommandFormControl.setValue(null);
		this.storeDropdown.setValue(store.identifier);
		this.storeList = [];
		this.updateFormControlEnablement();
	}

	searchStores(searchString: string) {
		this.storeSearchString.next(searchString);
	}

	getStores(searchString: string) {
		if (this.getStoresSubscription != null) {
			this.getStoresSubscription.unsubscribe();
			this.getStoresSubscription = null;
		}
		this.getStoresSubscription = this.onlineStoresService.getOnlineStoresByIdentifier({
			usage: "HCL_SiteAdminStoreList",
			identifier: "*" + searchString + "*",
			limit: 10
	 	}).subscribe(
	 		response => {
		 		this.getStoresSubscription = null;
		 		if (response.items.length === 1 && response.items[0].identifier === this.storeDropdown.value) {
		 			this.selectStore(response.items[0]);
		 		} else {
		 			this.storeList = response.items;
		 		}
			},
			error => {
				this.getStoresSubscription = null;
				console.log(error);
			}
		);
	}

	getApplicationTypeList() {
		const args: JobTypesService.JobGetJobTypesParams = {
			ContentType: "application/json"
		};
		this.jobTypesService.JobGetJobTypes(args).subscribe((body: any) => {
			this.applicationTypeList = body.items;
		});
	}

	selectApplicationType(applicationType: string) {
		this.applicationType = applicationType;
		this.jobMainService.jobData.applicationType = applicationType;
		this.jobMainService.onApplicationTypeChange.emit(applicationType);
		if (applicationType === "broadcast") {
			if (this.selectedStore !== 0) {
				this.selectedStore = 0;
				this.storeDropdown.setValue(null);
				this.jobMainService.jobData.storeId = 0;
				this.jobMainService.jobData.storeName = null;
				this.commandFormControl.setValue(null);
				this.jobMainService.jobData.command = null;
				this.command = null;
				this.checkCommandList = [];
				this.storeCommandFormControl.setValue(null);
			}
		}
		this.updateFormControlEnablement();
	}

	validateParameters() {
		this.jobMainService.jobData.query = this.parametersFormControl.value;
	}

	validateDescription() {
		this.jobMainService.jobData.description = this.descriptionFormControl.value;
	}

	private createFormControls() {
		if (this.mode === "edit") {
			this.applicationTypeDropdown = new FormControl({value: "", disabled: true});
			this.storeDropdown = new FormControl({value: "", disabled: true});
			this.commandFormControl = new FormControl({value: "", disabled: true});
			this.storeCommandFormControl = new FormControl({value: "", disabled: true});
			this.storeCheckCommandFormControl = new FormControl({value: "", disabled: true});
		} else {
			this.applicationTypeDropdown = new FormControl("");
			this.storeDropdown = new FormControl("", storeDropdown => {
				const value = storeDropdown.value;
				const jobData = this.jobMainService.jobData;
				let errors = null;
				if (value !== "" &&
						(value !== jobData.storeName ||
						jobData.storeId === 0)) {
					errors = {
						invalidStore: true
					};
				}
				return errors;
			});
			this.commandFormControl = new FormControl("", commandFormControl => {
				const value = commandFormControl.value;
				const jobData = this.jobMainService.jobData;
				let errors = null;
				if (value !== "" && value !== jobData.command) {
					errors = {
						invalidCommand: true
					};
				}
				return errors;
			});
			this.storeCommandFormControl = new FormControl("");
			this.storeCheckCommandFormControl = new FormControl("");
		}
		this.parametersFormControl = new FormControl("");
		this.descriptionFormControl = new FormControl("");
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			applicationTypeDropdown: this.applicationTypeDropdown,
			storeDropdown: this.storeDropdown,
			commandFormControl: this.commandFormControl,
			storeCommandFormControl: this.storeCommandFormControl,
			parametersFormControl: this.parametersFormControl,
			storeCheckCommandFormControl: this.storeCheckCommandFormControl,
			descriptionFormControl: this.descriptionFormControl
		});
	}

	private setValues() {
		const id: string = this.route.snapshot.params.id;
		this.jobMainService.loadCurrentJob(id).subscribe(response => {
			const jobData = this.jobMainService.jobData;
			if (jobData.applicationType) {
				this.applicationTypeDropdown.setValue(jobData.applicationType);
				this.selectApplicationType(jobData.applicationType);
			}
			if (jobData.query) {
				this.parametersFormControl.setValue(jobData.query);
			}
			if (jobData.description) {
				this.descriptionFormControl.setValue(jobData.description);
			}
			if (jobData.storeId === null || jobData.storeId === 0) {
				this.selectedStore = 0;
				if (jobData.command) {
					this.selectJobSiteCommand(jobData.command);
					this.commandFormControl.setValue(jobData.command);
				}
			} else {
				this.selectedStore = jobData.storeId;
				this.storeNameService.getStoreName(jobData.storeId.toString()).subscribe(storeName => {
					this.storeDropdown.setValue(storeName);
					jobData.storeName = storeName;
				});
				this.initStoreCommand();
			}
			this.updateFormControlEnablement();
		});
	}

	private initStoreCommand() {
		if (this.selectedStore !== 0) {
			const jobData = this.jobMainService.jobData;
			if (jobData.command) {
				let jobCommand: any;
				for (let i = 0; i < this.storeCommandList.length; i++) {
					const storeCommand = this.storeCommandList[i];
					if (storeCommand.command === jobData.command) {
						jobCommand = storeCommand;
						break;
					}
				}
				if (jobCommand) {
					this.command = jobCommand.command;
					this.checkCommandList = jobCommand.checkCommands;
					this.storeCommandFormControl.setValue(jobCommand.command);
				}
				if (jobData.checkCommandInterface) {
					if (this.checkCommandList) {
						let selectedCheckCommand: any;
						for (let i = 0; i < this.checkCommandList.length; i++) {
							const checkCommand = this.checkCommandList[i];
							if (checkCommand.interfaceName === jobData.checkCommandInterface) {
								selectedCheckCommand = checkCommand;
								break;
							}
						}
						if (selectedCheckCommand) {
							this.selectJobStoreCheckCommand(selectedCheckCommand);
							this.storeCheckCommandFormControl.setValue(selectedCheckCommand);
						}
					}
				}
			}
		}
	}

	private updateFormControlEnablement() {
		if (this.mode === "create") {
			if (this.applicationType === "broadcast") {
				this.storeCommandFormControl.disable();
				this.storeCheckCommandFormControl.disable();
				this.storeDropdown.disable();
				this.commandFormControl.enable();
			} else {
				this.storeDropdown.enable();
				if (this.selectedStore === 0) {
					this.storeCommandFormControl.disable();
					this.storeCheckCommandFormControl.disable();
					this.commandFormControl.enable();
				} else {
					this.storeCommandFormControl.enable();
					this.storeCheckCommandFormControl.enable();
					this.commandFormControl.disable();
				}
			}
		}
	}
}
