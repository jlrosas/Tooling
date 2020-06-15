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
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { Subject, Subscription, Observable, merge, of } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ApprovalStatusService } from "../../../../rest/services/approval-status.service";
import { UsersService } from "../../../../rest/services/users.service";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DataSource } from "@angular/cdk/table";
import { ApprovalDialogComponent } from "../approval-dialog/approval-dialog.component";
import { AlertService } from "../../../../services/alert.service";
import { CurrentUserService } from "../../../../services/current-user.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";

@Component({
	templateUrl: "./approval-list.component.html",
	styleUrls: ["./approval-list.component.scss"]
})
export class ApprovalListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	approver: FormControl;
	listSearchForm: FormGroup;
	searchText: FormControl;
	statusSelect: FormControl;
	processSelect: FormControl;
	submitStartText: FormControl;
	submitEndText: FormControl;
	showFilters = false;
	currentSearchString = null;
	approverList: Array<any> = [];
	approverId = null;
	statusFilter = null;
	processFilter = null;
	submitStartFilter = null;
	submitEndFilter = null;
	responsiveCols = 12;

	model = new ApprovalListDataSource();

	displayedColumns: string[] = ["requestor", "entityId", "process", "status", "lastUpdate", "actions"];

	@ViewChild(MatPaginator, {static: false})
	paginator: MatPaginator;
	@ViewChild(MatSort, {static: false})
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "status";
	sortDirection = "asc";

	private approverSearchString: Subject<string> = new Subject<string>();
	private getApproversSubscription: Subscription = null;

	private searchString: Subject<string> = new Subject<string>();
	private getApprovalStatusesSubscription: Subscription = null;

	private processTextKeys = {
		"10001": "APPROVALS.RFQ_RESPONSE",
		"10002": "APPROVALS.ORDER_PROCESSING",
		"10003": "APPROVALS.CONTRACT_SUBMIT",
		"10004": "APPROVALS.USER_REGISTRATION",
		"10005": "APPROVALS.ORGANIZATION_REGISTRATION",
		"10006": "APPROVALS.RESELLER_USER_REGISTRATION"
	};
	private processTextIndices = Object.keys(this.processTextKeys);
	private statusTextKeys = {
		0: "APPROVALS.PENDING",
		1: "APPROVALS.APPROVED",
		2: "APPROVALS.REJECTED"
	};
	private statusTextIndices = Object.keys(this.statusTextKeys);
	private approverFilter = {label: "", value: ""};

	constructor(private router: Router,
			private translateService: TranslateService,
			private approvalStatusService: ApprovalStatusService,
			private usersService: UsersService,
			private alertService: AlertService,
			private dialog: MatDialog,
			private currentUserService: CurrentUserService,
			private preferenceService: PreferenceService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.currentUserService.getRoles().subscribe((currentUserRoles: Array<number>) => {
			for (let index = 0; index < currentUserRoles.length; index++) {
				if (currentUserRoles[index] === -1) {
					this.displayedColumns = ["requestor", "entityId", "approver", "process", "status", "lastUpdate", "actions"];
					break;
				}
			}
		});
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.preferenceService.save(this.preferenceToken, { searchString });
			this.currentSearchString = searchString;
			this.paginator.pageIndex = 0;
			this.getApprovalStatuses();
		});
		this.approverSearchString.pipe(debounceTime(250)).subscribe(approverSearchString => {
			this.getApprovers(approverSearchString);
		});
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(sort => {
			this.paginator.pageIndex = 0;
			this.preferenceService.save(this.preferenceToken, {sort: this.sort});
			this.getApprovalStatuses();
		});
		this.getApprovalStatuses();
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
		this.approverSearchString.unsubscribe();
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	public handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.preferenceService.save(this.preferenceToken, {pageSize: this.pageSize});
		this.getApprovalStatuses();
	}

	openDialog(approvalStatusId: any, flowTypeId: string, action: string) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.autoFocus = true;
		dialogConfig.closeOnNavigation = true;

		dialogConfig.data = {
			id: approvalStatusId,
			action: action,
			flowTypeId: flowTypeId
		};
		const dialogRef = this.dialog.open(ApprovalDialogComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(
			data => {
				if (data) {
					if (action === "Approve") {
						this.approve(approvalStatusId, data.comments);
					} else {
						this.reject(approvalStatusId, data.comments);
					}
				}
			}
		);
	}

	startDateFilter = (d: Date | null): boolean => {
		return  (this.submitEndText.value && d) ? (d < this.submitEndText.value) : true;
	}

	endDateFilter = (d: Date | null): boolean => {
		return  (this.submitStartText.value && d) ? (d > this.submitStartText.value) : true;
	}

	approve(approvalStatusId: any, comment: string) {
		this.alertService.clear();
		this.approvalStatusService.updateApprovalStatus({id: approvalStatusId, body: {
			"status": 1,
			"comment": comment
		}}).subscribe((resp: any) => {
			this.getApprovalStatuses();
			if (resp && resp.resultmsg === "approvalsFailed") {
				this.translateService.get("APPROVALS.UNAPPROVED_ORGANIZATION_ERROR_MESSAGE").subscribe((message: string) => {
					this.alertService.error({message});
				});
			} else {
				this.translateService.get("APPROVALS.APPROVED_SUCCESS_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
			}
		});
	}

	reject(approvalStatusId: any, comment: string) {
		this.alertService.clear();
		this.approvalStatusService.updateApprovalStatus({id: approvalStatusId, body: {
			"status": 2,
			"comment": comment
		}}).subscribe(resp => {
			this.getApprovalStatuses();
			this.translateService.get("APPROVALS.REJECTED_SUCCESS_MESSAGE").subscribe((message: string) => {
				this.alertService.success({message});
			});
		});
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.save(this.preferenceToken, { searchString: ""});
		this.getApprovalStatuses();
	}

	refresh() {
		this.alertService.clear();
		this.getApprovalStatuses();
	}

	searchApprovals(searchString: string) {
		this.searchString.next(searchString);
	}

	searchApprovers(searchString: string) {
		this.approverSearchString.next(searchString);
	}

	selectApprover(approver: any) {
		this.approver.setValue(approver.logonId);
		if (this.approverId !== approver.id) {
			this.preferenceService.saveFilter(this.preferenceToken,
				{approverFilter: {label: approver.logonId, value: approver.id}});
			this.approverId = approver.id;
			this.paginator.pageIndex = 0;
			this.getApprovalStatuses();
		}
	}

	clearApprover() {
		this.approverId = null;
		this.approver.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { approverFilter: null });
		this.getApprovalStatuses();
	}

	selectStatus(statusIndex: any) {
		if (this.statusFilter !== statusIndex) {
			this.preferenceService.saveFilter(this.preferenceToken,
				{statusFilter: statusIndex});
			this.statusFilter = statusIndex;
			this.paginator.pageIndex = 0;
			this.getApprovalStatuses();
		}
	}

	clearStatus($event) {
		this.statusFilter = null;
		this.statusSelect.setValue(null);
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { statusFilter: null });
		this.getApprovalStatuses();
		$event.stopPropagation();
	}

	selectProcess(processIndex: any) {
		if (this.processFilter !== processIndex) {
			this.preferenceService.saveFilter(this.preferenceToken,
				{processFilter: processIndex});
			this.processFilter = processIndex;
			this.paginator.pageIndex = 0;
			this.getApprovalStatuses();
		}
	}

	clearSubmitStart() {
		this.submitStartFilter = null;
		this.submitStartText.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { submitStartFilter: null });
		this.getApprovalStatuses();
	}

	selectSubmitStart(submitStart: any) {
		if (this.submitStartFilter !== submitStart) {
			this.preferenceService.saveFilter(this.preferenceToken,
				{submitStartFilter: submitStart});
			this.submitStartFilter = submitStart;
			this.paginator.pageIndex = 0;
			this.getApprovalStatuses();
		}
	}

	clearSubmitEnd() {
		this.submitEndFilter = null;
		this.submitEndText.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { submitEndFilter: null });
		this.getApprovalStatuses();
	}

	selectSubmitEnd(submitEnd: any) {
		if (this.submitEndFilter !== submitEnd) {
			this.preferenceService.saveFilter(this.preferenceToken,
				{submitEndFilter: submitEnd});
			this.submitEndFilter = submitEnd;
			this.paginator.pageIndex = 0;
			this.getApprovalStatuses();
		}
	}

	clearProcess($event) {
		this.processFilter = null;
		this.processSelect.setValue(null);
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken, { processFilter: null });
		this.getApprovalStatuses();
		$event.stopPropagation();
	}

	private createFormControls() {
		this.approver = new FormControl(this.approverFilter.label);
		this.searchText = new FormControl(this.currentSearchString);
		this.statusSelect = new FormControl(this.statusFilter);
		this.processSelect = new FormControl(this.processFilter);
		this.submitStartText = new FormControl(this.submitStartFilter);
		this.submitEndText = new FormControl(this.submitEndFilter);
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
			approver: this.approver,
			statusSelect: this.statusSelect,
			processSelect: this.processSelect,
			submitStartText: this.submitStartText,
			submitEndText: this.submitEndText
		});
		this.listSearchForm = new FormGroup({
			searchText: this.searchText
		});
	}

	private getApprovers(approverSearchString: string) {
		if (this.getApproversSubscription != null) {
			this.getApproversSubscription.unsubscribe();
			this.getApproversSubscription = null;
		}
		this.getApproversSubscription = this.usersService.UsersGetManageableUsers({
			searchString: approverSearchString,
			sort: "logonId",
			limit: 10
		}).subscribe(
			response => {
				if (response.items.length === 1 && response.items[0].logonId === this.approver.value) {
					this.selectApprover(response.items[0]);
					this.approverList = null;
				} else {
					response.items.forEach(user => {
						user.displayName = this.formatName(user.logonId, user.address.firstName, user.address.lastName);
					});
					this.approverList = response.items;
				}
				this.getApproversSubscription = null;
			},
			error => {
				this.getApproversSubscription = null;
				console.log(error);
			}
		);
	}

	private getApprovalStatuses() {
		const args: ApprovalStatusService.GetApprovalStatusesParams = {
			offset: (this.paginator.pageIndex) * this.paginator.pageSize,
			limit: this.paginator.pageSize
		};
		if (this.currentSearchString) {
			args.searchString = this.currentSearchString;
		}
		if (this.approverId != null) {
			args.approverId = this.approverId;
		}
		if (this.statusFilter != null) {
			args.status = this.statusFilter;
		}
		if (this.processFilter != null) {
			args.flowTypeId = this.processFilter;
		}
		if (this.submitStartFilter != null) {
			args.startSubmitDate = (new Date(this.submitStartFilter)).toISOString();
		}
		if (this.submitEndFilter != null) {
			args.endSubmitDate = (new Date(this.submitEndFilter)).toISOString();
		}
		let sort = this.sort.active;
		if (this.sort.direction === "asc") {
			sort = sort;
		} else if (this.sort.direction === "desc") {
			sort = "-" + sort;
		}
		args.sort = sort;
		if (this.getApprovalStatusesSubscription != null) {
			this.getApprovalStatusesSubscription.unsubscribe();
			this.getApprovalStatusesSubscription = null;
		}
		this.getApprovalStatusesSubscription = this.approvalStatusService.getApprovalStatuses(args).subscribe((body: any) => {
			this.getApprovalStatusesSubscription.unsubscribe();
			this.getApprovalStatusesSubscription = null;
			this.paginator.length = body.count;
			const data: ApprovalStatus[] = [];
			for (let i = 0; i < body.items.length; i++) {
				const item = body.items[i];
				const processTextKey = this.processTextKeys[item.flowTypeId];
				const statusTextKey = this.statusTextKeys[item.status];
				const approvalStatus: ApprovalStatus = {
					id: item.id,
					flowTypeId: item.flowTypeId,
					requestor: this.formatName(item.submitterLogonId, item.submitterFirstName, item.submitterLastName),
					approver: this.formatName(item.approverLogonId, item.approverFirstName, item.approverLastName),
					processTextKey: processTextKey ? processTextKey : item.flowTypeId,
					statusTextKey: statusTextKey ? statusTextKey : item.status,
					lastUpdate: (new Date(item.lastUpdate)).toLocaleString(),
					status: item.status,
					entityId: item.entityId
				};
				data.push(approvalStatus);
			}
			this.model.setData(data);
		});
	}

	private formatName(logonId: string, firstName: string, lastName: string): string {
		let name = logonId;
		if (lastName != null && lastName.length > 0) {
			name += " (";
			if (firstName != null && firstName.length > 0) {
				name += firstName + " ";
			}
			name += lastName + ")";
		}
		return name;
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
				const {approverFilter, statusFilter, processFilter, submitStartFilter, submitEndFilter} = filter;
				if (approverFilter) {
					this.approverFilter = approverFilter;
					this.approverId = approverFilter.value;
				}
				this.statusFilter = statusFilter;
				this.processFilter = processFilter;
				this.submitStartFilter = submitStartFilter;
				this.submitEndFilter = submitEndFilter;
			}
			if (showFilters) {
				this.showFilters = showFilters;
			}
		}
	}
}

interface ApprovalStatus {
	id: string;
	flowTypeId: string;
	requestor: string;
	approver: string;
	processTextKey: string;
	statusTextKey: string;
	lastUpdate: string;
	status: string;
	entityId: string;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class ApprovalListDataSource extends DataSource<ApprovalStatus> {
	private approvals$: Subject<ApprovalStatus[]> = new Subject<ApprovalStatus[]>();

	setData(approvals: ApprovalStatus[]) {
		this.approvals$.next(approvals);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<ApprovalStatus[]> {
		return this.approvals$.asObservable();
	}

	disconnect() {}
}

