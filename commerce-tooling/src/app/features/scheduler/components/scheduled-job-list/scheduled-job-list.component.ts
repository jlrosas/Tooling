/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { Subject, Subscription, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { JobsService } from "../../../../rest/services/jobs.service";
import { JobsStatusesService } from "../../../../rest/services/jobs-statuses.service";
import { JobTypesService } from "../../../../rest/services/job-types.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { AlertService } from "../../../../services/alert.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";

@Component({
	templateUrl: "./scheduled-job-list.component.html",
	styleUrls: ["./scheduled-job-list.component.scss"]
})
export class ScheduledJobListComponent implements OnInit, OnDestroy, AfterViewInit {
	listSearchForm: FormGroup;
	listFilterForm: FormGroup;
	searchText: FormControl;
	storeDropdown:  FormControl;
	applicationTypeDropdown: FormControl;
	stateDropdown: FormControl;
	statusDropdown: FormControl;
	startDatePicker: FormControl;
	endDatePicker: FormControl;
	startTimeFormControl: FormControl;
	endTimeFormControl: FormControl;

	currentSearchString = null;

	showFilters = false;
	responsiveCols = 12;

	// The list of columns that will be displayed
	displayedColumns: string[] = [
		"command",
		"parameters",
		"state",
		"status",
		"applicationType",
		"startDate",
		"endDate",
		"actions"
	];

	selectedStore = null;
	storeList: Array<any> = [];

	applicationType = null;
	applicationTypeList: Array<any> = [];

	status = null;
	state = null;

	startDate = null;
	endDate = null;

	startTime = null;
	endTime = null;

	// The table model
	model = new SheduledJobStatusDataSource();

	@ViewChild(MatPaginator, { static: false })
	paginator: MatPaginator;
	@ViewChild(MatSort, { static: false })
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "startDate";
	sortDirection = "asc";

	private statusTextKeys = {
		"S": "SCHEDULER.STATUS_SUCCESS",
		"F": "SCHEDULER.STATUS_FAILED"
	};
	private statusTextIndices = Object.keys(this.statusTextKeys);

	private stateTextKeys = {
		"I": "SCHEDULER.STATE_INACTIVE",
		"C": "SCHEDULER.STATE_COMPLETED",
		"CF": "SCHEDULER.STATE_COMPLETED_FAILED",
		"R": "SCHEDULER.STATE_RUNNING",
		"W": "SCHEDULER.STATE_WAITING",
		"IF": "SCHEDULER.STATE_FAILED_AND_RETRYING",
		"RF": "SCHEDULER.STATE_RUN_FAILED"
	};
	private stateTextIndices = Object.keys(this.stateTextKeys);

	private applicationTypeTextKeys = {
		"auction": "SCHEDULER.APPLICATION_TYPE_AUCTION",
		"broadcast": "SCHEDULER.APPLICATION_TYPE_BROADCAST",
		"default": "SCHEDULER.APPLICATION_TYPE_DEFAULT",
		"inventory": "SCHEDULER.APPLICATION_TYPE_INVENTORY",
		"search": "SCHEDULER.APPLICATION_TYPE_SEARCH",
		"statistics": "SCHEDULER.APPLICATION_TYPE_STATISTICS",
		"upload": "SCHEDULER.APPLICATION_TYPE_UPLOAD"
	};

	private searchString: Subject<string> = new Subject<string>();
	private getJobStatusesSubscription: Subscription = null;
	private getStoresSubscription: Subscription = null;
	private storeSearchString: Subject<string> = new Subject<string>();
	private processingClearAll = false;
	private processingClear = {};
	private processingCancel = {};
	private storeFilter = {label: "", value: ""};

	constructor(private router: Router,
			private jobsStatusesService: JobsStatusesService,
			private jobsService: JobsService,
			private jobTypesService: JobTypesService,
			private onlineStoresService: OnlineStoresService,
			private alertService: AlertService,
			private translateService: TranslateService,
			private preferenceService: PreferenceService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.getApplicationTypeList();
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.preferenceService.save(this.preferenceToken, { searchString });
			this.paginator.pageIndex = 0;
			this.currentSearchString = searchString;
			this.getJobStatusList();
		});
		this.storeSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getStores(searchString);
		});
		this.searchStores("");
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(sort => {
			this.paginator.pageIndex = 0;
			this.preferenceService.save(this.preferenceToken, {sort: this.sort});
			this.getJobStatusList();
		});
		this.getJobStatusList();
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
		this.storeSearchString.unsubscribe();
	}

	selectApplicationType(applicationType: string) {
		if (this.applicationType !== applicationType) {
			this.applicationType = applicationType;
			this.paginator.pageIndex = 0;
			this.preferenceService.saveFilter(this.preferenceToken, { applicationTypeFilter: applicationType });
			this.getJobStatusList();
		}
	}

	clearApplicationTypeSelection($event) {
		this.applicationType = null;
		this.applicationTypeDropdown.setValue(null);
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { applicationTypeFilter: null });
		this.getJobStatusList();
		$event.stopPropagation();
	}

	clearStatusSelection($event) {
		this.status = null;
		this.statusDropdown.setValue(null);
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { statusFilter: null });
		this.getJobStatusList();
		$event.stopPropagation();
	}

	selectStatus(status: string) {
		if (this.status !== status) {
			this.status = status;
			this.paginator.pageIndex = 0;
			this.preferenceService.saveFilter(this.preferenceToken, { statusFilter: status });
			this.getJobStatusList();
		}
	}

	clearStateSelection($event) {
		this.state = null;
		this.stateDropdown.setValue(null);
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { stateFilter: null });
		this.getJobStatusList();
		$event.stopPropagation();
	}

	selectState(state: string) {
		if (this.state !== state) {
			this.state = state;
			this.paginator.pageIndex = 0;
			this.preferenceService.saveFilter(this.preferenceToken, { stateFilter: state });
			this.getJobStatusList();
		}
	}

	selectEndDate(endDate: string) {
		if (this.endDate !== endDate) {
			this.endDate = new Date(endDate);
			this.preferenceService.saveFilter(this.preferenceToken, { endDateFilter: endDate });

			this.endTime = "23:59";
			this.endTimeFormControl.setValue(this.endTime);
			this.preferenceService.saveFilter(this.preferenceToken, { endTimeFilter: this.endTime });

			this.paginator.pageIndex = 0;
			this.getJobStatusList();
		}
	}

	clearStartDate($event) {
		$event.stopPropagation();

		this.startDate = null;
		this.startDatePicker.setValue(null);
		this.preferenceService.saveFilter(this.preferenceToken, { startDateFilter: null });

		this.startTime = null;
		this.startTimeFormControl.setValue(null);
		this.preferenceService.saveFilter(this.preferenceToken, { startTimeFilter: null });

		this.paginator.pageIndex = 0;
		this.getJobStatusList();
	}

	clearStartTime($event) {
		$event.stopPropagation();

		this.startTime = null;
		if (this.startDate !== null) {
			this.startTime = "00:00";
		}
		this.startTimeFormControl.setValue(this.startTime);
		this.preferenceService.saveFilter(this.preferenceToken, { startTimeFilter: this.startTime });

		this.paginator.pageIndex = 0;
		this.getJobStatusList();
	}

	clearEndDate($event) {
		$event.stopPropagation();

		this.endDate = null;
		this.endDatePicker.setValue(null);
		this.preferenceService.saveFilter(this.preferenceToken, { endDateFilter: null });

		this.endTime = null;
		this.endTimeFormControl.setValue(null);
		this.preferenceService.saveFilter(this.preferenceToken, { endTimeFilter: null });

		this.paginator.pageIndex = 0;
		this.getJobStatusList();
	}

	clearEndTime($event) {
		$event.stopPropagation();

		this.endTime = null;
		if (this.endDate !== null) {
			this.endTime = "23:59";
		}
		this.endTimeFormControl.setValue(this.endTime);
		this.preferenceService.saveFilter(this.preferenceToken, { endTimeFilter: this.endTime });

		this.paginator.pageIndex = 0;
		this.getJobStatusList();
	}

	selectStartDate(startDate: string) {
		if (this.startDate !== startDate) {
			this.startDate = new Date(startDate);
			this.preferenceService.saveFilter(this.preferenceToken, { startDateFilter: startDate });

			this.startTime = "00:00";
			this.startTimeFormControl.setValue(this.startTime);
			this.preferenceService.saveFilter(this.preferenceToken, { startTimeFilter: this.startTime });

			this.paginator.pageIndex = 0;
			this.getJobStatusList();
		}
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	search(searchString: string) {
		this.searchString.next(searchString);
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.save(this.preferenceToken, { searchString: ""});
		this.getJobStatusList();
	}

	refresh() {
		this.alertService.clear();
		this.getJobStatusList();
	}

	cancelJob(jobId: string) {
		if (!this.processingCancel[jobId]) {
			this.processingCancel[jobId] = true;
			this.alertService.clear();
			this.jobsService.JobDelete(jobId).subscribe(response => {
				this.processingCancel[jobId] = false;
				delete this.processingCancel[jobId];
				this.translateService.get("SCHEDULER.JOB_CANCELED_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
				this.getJobStatusList();
			},
			errorResponse => {
				this.processingCancel[jobId] = false;
				delete this.processingCancel[jobId];
				if (errorResponse.error && errorResponse.error.errors) {
					errorResponse.error.errors.forEach(error => {
						this.alertService.error({message: error.errorMessage});
					});
				} else {
					console.log(errorResponse);
				}
			});
		}
	}

	clearStatus(job: any) {
		const jobId = job.jobId;
		if (!this.processingClear[jobId]) {
			this.processingClear[jobId] = true;
			this.alertService.clear();
			const endDate = new Date(job.end);
			// Delete job status records with this job ID and 1 second ahead, to get
			// rid of selected job status record
			const endDateString =
				endDate.getFullYear() + "-" +
				(endDate.getMonth() + 1) + "-" +
				endDate.getDate() + "T" +
				endDate.getHours() + ":" +
				endDate.getMinutes() + ":" +
				(endDate.getSeconds() + 1);
			const args: JobsStatusesService.JobStatusesByJobIdDeleteParams = {
				ContentType: "application/json",
				storeId: 0,
				id: jobId,
				endTime: endDateString
			};
			this.jobsStatusesService.JobStatusesByJobIdDelete(args).subscribe(response => {
				this.processingClear[jobId] = false;
				delete this.processingClear[jobId];
				this.translateService.get("SCHEDULER.JOB_STATUS_REMOVED_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
				this.getJobStatusList();
			},
			errorResponse => {
				this.processingClear[jobId] = false;
				delete this.processingClear[jobId];
				if (errorResponse.error && errorResponse.error.errors) {
					errorResponse.error.errors.forEach(error => {
						this.alertService.error({message: error.errorMessage});
					});
				} else {
					console.log(errorResponse);
				}
			});
		}
	}

	clearAllPreviousStatus() {
		if (!this.processingClearAll) {
			this.processingClearAll = true;
			this.alertService.clear();
			const endDate = new Date();
			// Delete job status records up to 1 year ahead, to get
			// rid of all previously completed job run job status records
			const endDateString =
				(endDate.getFullYear() + 1) + "-" +
				(endDate.getMonth() + 1) + "-" +
				endDate.getDate() + "T" +
				endDate.getHours() + ":" +
				endDate.getMinutes() + ":" +
				endDate.getSeconds();
			const args: JobsStatusesService.JobStatusesDeleteParams = {
				ContentType: "application/json",
				storeId: 0,
				endTime: endDateString
			};
			this.jobsStatusesService.JobStatusesDelete(args).subscribe(response => {
				this.processingClearAll = false;
				this.translateService.get("SCHEDULER.ALL_JOB_STATUS_REMOVED_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
				this.getJobStatusList();
			},
			errorResponse => {
				this.processingClearAll = false;
				if (errorResponse.error && errorResponse.error.errors) {
					errorResponse.error.errors.forEach(error => {
						this.alertService.error({message: error.errorMessage});
					});
				} else {
					console.log(errorResponse);
				}
			});
		}
	}

	public handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.preferenceService.save(this.preferenceToken, {pageSize: this.pageSize});
		this.getJobStatusList();
	}

	/**
	 * This method will handle creating jobs
	 */
	createJob() {
		this.alertService.clear();
		this.router.navigate(["scheduler/create-job"]);
	}

	/**
	 * This method will perform the GET call to the job statuses service
	 * and return the data needed to populate the status table.
	 */
	getJobStatusList() {
		const args: JobsStatusesService.GetScheduledJobStatusesParams = {
			offset: (this.paginator.pageIndex) * this.paginator.pageSize,
			limit: this.paginator.pageSize,
			ContentType: "application/json",
			maxItems: 15000
		};
		if (this.currentSearchString) {
			args.searchString = this.currentSearchString;
		}
		if (this.selectedStore !== null) {
			args.storeId = this.selectedStore;
		} else {
			args.storeId = 0;
		}
		if (this.applicationType !== null) {
			args.applicationType = this.applicationType;
		}
		if (this.state !== null) {
			args.state = this.state;
		}
		if (this.status !== null) {
			args.status = this.status;
		}
		if (this.startDate != null && this.startTime === null) {
			this.startTime = "00:00";
		}
		if (this.endDate != null && this.endTime === null) {
			this.endTime = "23:59";
		}
		if (this.startTime !== null) {
			if (this.startDate === null) {
				const today = new Date();
				this.startDate = today;
				this.startDatePicker.setValue(this.startDate);
			}
			const startDate = new Date(this.startDate);
			const startTime = this.startTime;
			const splits: Array<any> = startTime.split(":", 2);
			startDate.setHours(splits[0]);
			startDate.setMinutes(splits[1]);
			this.startDate = startDate;
		}
		if (this.endTime !== null) {
			if (this.endDate === null) {
				const today = new Date();
				this.endDate = today;
				this.endDatePicker.setValue(this.endDate);
			}
			const endDate = new Date(this.endDate);
			const endTime = this.endTime;
			const splits: Array<any> = endTime.split(":", 2);
			endDate.setHours(splits[0]);
			endDate.setMinutes(splits[1]);

			this.endDate = endDate;
		}

		if (this.startDate !== null) {
			const startDate = new Date(this.startDate);
			const startDateString =
					startDate.getFullYear() + "-" +
					(startDate.getMonth() + 1) + "-" +
					startDate.getDate() + "T" +
					startDate.getHours() + ":" +
					startDate.getMinutes() + ":" +
					startDate.getSeconds();
			args.criteriaStart = startDateString;
		}
		if (this.endDate !== null) {
			const endDate = new Date(this.endDate);
			const endDateString =
					endDate.getFullYear() + "-" +
					(endDate.getMonth() + 1) + "-" +
					endDate.getDate() + "T" +
					endDate.getHours() + ":" +
					endDate.getMinutes() + ":" +
					endDate.getSeconds();
			args.criteriaEnd = endDateString;
		}

		let sort = this.sort.active;
		if (this.sort.direction === "asc") {
			sort = sort;
		} else if (this.sort.direction === "desc") {
			sort = "-" + sort;
		}
		args.sort = sort;
		if (this.getJobStatusesSubscription !== null) {
			this.getJobStatusesSubscription.unsubscribe();
			this.getJobStatusesSubscription = null;
		}
		this.getJobStatusesSubscription = this.jobsStatusesService.
		getScheduledJobStatuses(args).subscribe((body: any) => {
			this.getJobStatusesSubscription.unsubscribe();
			this.getJobStatusesSubscription = null;
			this.paginator.length = body.count;
			const data: SheduledJobStatus[] = [];
			for (let i = 0; i < body.items.length; i++) {
				const item = body.items[i];
				const statusTextKey = this.statusTextKeys[item.status];
				const stateTextKey = this.stateTextKeys[item.state];
				const applicationTypeTextKey = this.applicationTypeTextKeys[item.applicationType];
				const jobStatus: SheduledJobStatus = {
					id: item.id,
					jobId: item.jobId,
					command: item.pathInfo,
					parameters: item.queryString,
					state: item.state,
					stateTextKey: stateTextKey ? stateTextKey : item.state,
					status: item.status,
					statusTextKey: statusTextKey ? statusTextKey : item.status,
					applicationType: item.applicationType,
					applicationTypeTextKey: applicationTypeTextKey ? applicationTypeTextKey : item.applicationType,
					start: (item.start !== null && item.start.length > 0) ? (new Date(item.start)).toLocaleString() : "",
					end: (item.end !== null && item.end.length > 0) ? (new Date(item.end)).toLocaleString() : ""
				};
				data.push(jobStatus);
			}
			this.model.setData(data);
		});

	}

	selectStartTime() {
		this.startTime = this.startTimeFormControl.value;
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { startTimeFilter: this.startTime });
		this.getJobStatusList();
	}

	selectEndTime() {
		this.endTime = this.endTimeFormControl.value;
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { endTimeFilter: this.endTime });
		this.getJobStatusList();
	}

	searchStores(searchString: string) {
		this.storeSearchString.next(searchString);
	}

	getStores(searchString: string) {
		if (this.getStoresSubscription !== null) {
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

	selectStore(store: any) {
		this.selectedStore = store.id;
		this.storeDropdown.setValue(store.identifier);
		this.storeList = [];
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken,
			{storeFilter: {label: store.identifier, value: store.id}});
		this.getJobStatusList();
	}

	clearStore() {
		this.selectedStore = null;
		this.storeDropdown.setValue(null);
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken,
			{storeFilter: null});
		this.getJobStatusList();
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
		this.storeDropdown = new FormControl(this.storeFilter.label);
		this.applicationTypeDropdown = new FormControl(this.applicationType);
		this.stateDropdown = new FormControl(this.state);
		this.statusDropdown = new FormControl(this.status);
		this.startDatePicker = new FormControl(this.startDate);
		this.endDatePicker = new FormControl(this.endDate);
		this.startTimeFormControl = new FormControl(this.startTime);
		this.endTimeFormControl = new FormControl(this.endTime);
	}

	private createForm() {
		this.listSearchForm = new FormGroup({
			searchText: this.searchText
		});
		this.listFilterForm = new FormGroup({
			storeDropdown: this.storeDropdown,
			applicationTypeDropdown: this.applicationTypeDropdown,
			stateDropdown: this.stateDropdown,
			statusDropdown: this.statusDropdown,
			startDatePicker: this.startDatePicker,
			endDatePicker: this.endDatePicker,
			startTimeFormControl: this.startTimeFormControl,
			endTimeFormControl: this.endTimeFormControl
		});
	}

	private getApplicationTypeList() {
		const args: JobTypesService.JobGetJobTypesParams = {
			ContentType: "application/json"
		};

		this.jobTypesService.JobGetJobTypes(args).subscribe((body: any) => {
			for (let i = 0; i < body.items.length; i++) {
				const item = body.items[i];
				this.applicationTypeList.push({
					id: item,
					textKey: this.applicationTypeTextKeys[item] ? this.applicationTypeTextKeys[item] : item
				});
			}
			// Support no application type filtering
			const nullValueApplicationType = {
				id: "NullValue",
				textKey: "SCHEDULER.APPLICATION_TYPE_NULL_VALUE"
			};
			this.applicationTypeList.unshift(nullValueApplicationType);
		});

	}

	private getPreferenceData() {
		this.preferenceToken = this.router.url;
		const preference = this.preferenceService.get(this.preferenceToken);
		if (preference) {
			const {
				pageSize,
				sort,
				searchString,
				filter,
				showFilters
			} = preference;
			if (pageSize) {
				this.pageSize = pageSize;
			}
			if (sort) {
				this.sort = sort ? sort : this.sort;
				this.activeColumn = sort.active;
				this.sortDirection = sort.direction;
			}
			if (searchString) {
				this.currentSearchString = searchString;
			}
			if (filter) {
				const { storeFilter = null, applicationTypeFilter = null, stateFilter = null, statusFilter = null,
					startDateFilter = null, endDateFilter = null, startTimeFilter = null, endTimeFilter = null } = filter;
				if (storeFilter) {
					this.selectedStore = storeFilter.value;
					this.storeFilter = storeFilter;
				}
				this.applicationType = applicationTypeFilter;
				this.state = stateFilter;
				this.status = statusFilter;
				this.startDate = startDateFilter;
				this.endDate = endDateFilter;
				this.startTime = startTimeFilter;
				this.endTime = endTimeFilter;
			}
			if (showFilters) {
				this.showFilters = showFilters;
			}
		}
	}
}

interface SheduledJobStatus {
	id: string;
	jobId: string;
	command: string;
	parameters: string;
	state: string;
	stateTextKey: string;
	status: string;
	statusTextKey: string;
	applicationType: string;
	applicationTypeTextKey: string;
	start: string;
	end: string;
}

class SheduledJobStatusDataSource extends DataSource<SheduledJobStatus> {
	private sheduledJobStatus$: Subject<SheduledJobStatus[]> = new Subject<SheduledJobStatus[]>();

	setData(sheduledJobStatus: SheduledJobStatus[]) {
		this.sheduledJobStatus$.next(sheduledJobStatus);
	}

	connect(): Observable<SheduledJobStatus[]> {
		return this.sheduledJobStatus$.asObservable();
	}

	disconnect() {}
}
