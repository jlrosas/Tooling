/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { OrganizationMainService } from "../../services/organization-main.service";
import { ApprovalTypesService } from "../../../../rest/services/approval-types.service";
import { AlertService } from "../../../../services/alert.service";
import { MatStep } from "@angular/material/stepper";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
	templateUrl: "./organization-approvals.component.html",
	styleUrls: ["./organization-approvals.component.scss"],
	selector: "hc-organization-approvals"
})
export class OrganizationApprovalsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	approvalTypesForm: any;
	searchText: FormControl;

	approvalTypeList: Array<{ id: string; approvalName: string; selected: boolean; }> = [];
	filteredApprovalTypeList: Array<{ id: string; approvalName: string; selected: boolean; }> = [];
	assignedApprovalTypeList: Array<{ id: string; approvalName: string; }> = [];

	@ViewChild("searchTextInput") searchTextInput: ElementRef<HTMLInputElement>;

	private searchString: Subject<string> = new Subject<string>();
	constructor(private router: Router,
		private route: ActivatedRoute,
		private organizationMainService: OrganizationMainService,
		private approvalTypesService: ApprovalTypesService,
		private alertService: AlertService,
		private translateService: TranslateService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		this.loadAvailableApprovalTypes();
		if (this.mode === "edit") {
			const id: string = this.route.snapshot.params.id;
			this.organizationMainService.loadCurrentOrganizationApprovals(id).subscribe(
				response => {
					this.assignedApprovalTypeList = this.organizationMainService.assignedApprovalTypes;
					this.populateAvailableApprovalTypes();
				}
			);
		} else {
			if (this.organizationMainService.assignedApprovalTypes == null) {
				this.organizationMainService.assignedApprovalTypes = [];
			}
			this.assignedApprovalTypeList = this.organizationMainService.assignedApprovalTypes;
		}
		this.searchString.pipe(debounceTime(250)).subscribe(searchStr => {
			this.filterApprovalTypes(searchStr);
		});
	}

	ngAfterViewInit(): void {
		this.step.stepControl = this.approvalTypesForm;
		setTimeout(() => {
			this.searchTextInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
	}

	triggerSave() {
		this.save.emit(null);
	}

	approvalSelectionChanged(
		event: { checked: boolean }, approvalType: { id: string; approvalName: string; selected: boolean; }) {
		if (event) {
			if (event.checked) {
				this.assignedApprovalTypeList.push({
					id: approvalType.id,
					approvalName: approvalType.approvalName
				});
			} else {
				const index = this.assignedApprovalTypeList.findIndex(approval => approval.id === approvalType.id);
				if (index >= 0) {
					this.assignedApprovalTypeList.splice(index, 1);
				}
			}
			const approvalTypeListindex = this.approvalTypeList.findIndex(approval => approval.id === approvalType.id);
			this.approvalTypeList[approvalTypeListindex].selected = event.checked;
		}
	}

	searchApprovalTypes(filterString: string) {
		this.searchString.next(filterString);
	}

	filterApprovalTypes(filterString: string) {
		const newList = this.approvalTypeList.filter(
			approvalType => approvalType.approvalName.toLowerCase().includes(filterString.toLowerCase())
		);
		this.filteredApprovalTypeList = newList;
	}

	clearSearchText() {
		this.filteredApprovalTypeList = this.approvalTypeList;
		this.searchText.setValue("");
	}

	private loadAvailableApprovalTypes() {
		this.approvalTypesService.getApprovalTypes({
			sort: "description"
		}).subscribe(body => {
			this.approvalTypeList = [];
			body.items.forEach((approvalType: { id: string; description: string; }) => {
				this.approvalTypeList.push({
					id: approvalType.id,
					approvalName: approvalType.description,
					selected: false
				});
			});
			this.filteredApprovalTypeList = this.approvalTypeList;
			this.populateAvailableApprovalTypes();
		});
	}

	private populateAvailableApprovalTypes() {
		if (this.assignedApprovalTypeList != null && this.approvalTypeList != null) {
			this.approvalTypeList.forEach(approval => {
				for (let i = 0; i < this.assignedApprovalTypeList.length; i++) {
					const assignedApprovalType = this.assignedApprovalTypeList[i];
					if (assignedApprovalType.id === approval.id) {
						approval.selected = true;
						this.assignedApprovalTypeList[i].approvalName = approval.approvalName;
						break;
					}
				}
			});
		}
	}

	private createFormControls() {
		this.searchText = new FormControl("");
	}

	private createForm() {
		this.approvalTypesForm = new FormGroup({
			searchText: this.searchText
		});
	}
}
