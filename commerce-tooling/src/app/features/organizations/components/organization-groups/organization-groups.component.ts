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
import { FormGroup, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { OrganizationMainService } from "../../services/organization-main.service";
import { MemberGroupsService } from "../../../../rest/services/member-groups.service";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { AlertService } from "../../../../services/alert.service";
import { MatStep } from "@angular/material";

@Component({
	templateUrl: "./organization-groups.component.html",
	styleUrls: ["./organization-groups.component.scss"],
	selector: "hc-organization-groups"
})
export class OrganizationGroupsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	groupsForm: any;
	searchTextInclude: FormControl;
	searchTextExclude: FormControl;

	includeMemberGroupList: Array<any> = [];
	excludeMemberGroupList: Array<any> = [];
	getIncludeMemberGroupsSubscription: Subscription = null;
	getExcludeMemberGroupsSubscription: Subscription = null;
	assignedMemberGroups: Array<any> = [];
	assignedIncludeMemberGroups: Array<any> = [];
	assignedExcludeMemberGroups: Array<any> = [];

	currentSearchInclude = null;
	currentSearchExclude = null;

	@ViewChild("searchTextIncludeInput", {static: false}) searchTextIncludeInput: ElementRef<HTMLInputElement>;

	private organizationNames = {};
	private getOrganizationSubscriptions = {};
	private includeMemberGroupsSearchString: Subject<string> = new Subject<string>();
	private excludeMemberGroupsSearchString: Subject<string> = new Subject<string>();

	constructor(private router: Router,
			private route: ActivatedRoute,
			private organizationMainService: OrganizationMainService,
			private memberGroupsService: MemberGroupsService,
			private organizationsService: OrganizationsService,
			private alertService: AlertService,
			private translateService: TranslateService) { }

	ngOnInit() {
		this.createForm();
		if (this.mode === "edit") {
			const id: string = this.route.snapshot.params.id;
			this.organizationMainService.loadCurrentMemberGroupMemberships(id).subscribe(response => {
				this.assignedMemberGroups = this.organizationMainService.assignedMemberGroups;
				this.assignedMemberGroups.forEach(assignedMemberGroup => {
					const organizationId = assignedMemberGroup.organizationId;
					if (this.organizationNames[organizationId]) {
						assignedMemberGroup.organizationName = this.organizationNames[organizationId];
					} else {
						this.loadOrganizationName(organizationId);
					}
				});
				this.populateAssignedMemberGroups();
			});
		} else {
			if (this.organizationMainService.assignedMemberGroups == null) {
				this.organizationMainService.assignedMemberGroups = [];
			}
			this.assignedMemberGroups = this.organizationMainService.assignedMemberGroups;
			this.assignedMemberGroups.forEach(assignedMemberGroup => {
				const organizationId = assignedMemberGroup.organizationId;
				if (this.organizationNames[organizationId]) {
					assignedMemberGroup.organizationName = this.organizationNames[organizationId];
				} else {
					this.loadOrganizationName(organizationId);
				}
			});
		}
		this.includeMemberGroupsSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchInclude = searchString;
			this.getIncludeMemberGroups(searchString);
		});
		this.excludeMemberGroupsSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchExclude = searchString;
			this.getExcludeMemberGroups(searchString);
		});
		this.searchIncludeMemberGroups("");
		this.searchExcludeMemberGroups("");
	}

	ngAfterViewInit() {
		this.step.stepControl = this.groupsForm;
		setTimeout(() => {
			this.searchTextIncludeInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
		this.includeMemberGroupsSearchString.unsubscribe();
		this.excludeMemberGroupsSearchString.unsubscribe();
	}

	onChangeCheckbox(memberGroup, exclude, event) {
		let assignedMemberGroup = null;
		let index = -1;
		for (let i = 0; i < this.assignedMemberGroups.length; i++) {
			if (memberGroup.id === this.assignedMemberGroups[i].memberGroupId) {
				assignedMemberGroup = this.assignedMemberGroups[i];
				index = i;
				break;
			}
		}
		if (event.checked) {
			if (assignedMemberGroup != null) {
				assignedMemberGroup.exclude = exclude;
			} else {
				this.assignedMemberGroups.push({
					memberGroupId: memberGroup.id,
					memberGroupName: memberGroup.name,
					organizationId: memberGroup.ownerId,
					organizationName: memberGroup.organizationName,
					exclude: exclude
				});
			}
		} else {
			if (index >= 0) {
				this.assignedMemberGroups.splice(index, 1);
			}
		}
		this.populateAssignedMemberGroups();
	}

	isAssignedGroup(memberGroup, exclude) {
		let assigned = false;
		this.assignedMemberGroups.forEach(assignedMemberGroup => {
			if (assignedMemberGroup.memberGroupId === memberGroup.id && assignedMemberGroup.exclude === exclude) {
				assigned = true;
			}
		});
		return assigned;
	}

	populateAssignedMemberGroups() {
		const assignedIncludeMemberGroups = [];
		const assignedExcludeMemberGroups = [];
		this.assignedMemberGroups.forEach(assignedMemberGroup => {
			if (assignedMemberGroup.exclude === "0") {
				assignedIncludeMemberGroups.push(assignedMemberGroup);
			} else {
				assignedExcludeMemberGroups.push(assignedMemberGroup);
			}
		});
		this.assignedIncludeMemberGroups = assignedIncludeMemberGroups;
		this.assignedExcludeMemberGroups = assignedExcludeMemberGroups;
	}

	clearIncludeMemberGroupSearch() {
		this.currentSearchInclude = null;
		this.searchTextInclude.setValue("");
		this.getIncludeMemberGroups("");
	}

	clearExcludeMemberGroupSearch() {
		this.currentSearchExclude = null;
		this.searchTextExclude.setValue("");
		this.getExcludeMemberGroups("");
	}

	searchIncludeMemberGroups(searchString: string) {
		this.includeMemberGroupsSearchString.next(searchString);
	}

	searchExcludeMemberGroups(searchString: string) {
		this.excludeMemberGroupsSearchString.next(searchString);
	}

	getIncludeMemberGroups(searchString: string) {
		if (this.getIncludeMemberGroupsSubscription != null) {
			this.getIncludeMemberGroupsSubscription.unsubscribe();
			this.getIncludeMemberGroupsSubscription = null;
		}
		this.getIncludeMemberGroupsSubscription = this.memberGroupsService.getMemberGroups({
			searchString: searchString,
			usage: ["RegisteredCustomer"],
			limit: 10
		}).subscribe(
			response => {
				this.includeMemberGroupList = response.items;
				this.getIncludeMemberGroupsSubscription = null;
				this.includeMemberGroupList.forEach(memberGroup => {
					const organizationId = memberGroup.ownerId;
					if (this.organizationNames[organizationId]) {
						memberGroup.organizationName = this.organizationNames[organizationId];
					} else {
						this.loadOrganizationName(organizationId);
					}
				});
			},
			error => {
				this.getIncludeMemberGroupsSubscription = null;
				console.log(error);
			}
		);
	}

	getExcludeMemberGroups(searchString: string) {
		if (this.getExcludeMemberGroupsSubscription != null) {
			this.getExcludeMemberGroupsSubscription.unsubscribe();
			this.getExcludeMemberGroupsSubscription = null;
		}
		this.getExcludeMemberGroupsSubscription = this.memberGroupsService.getMemberGroups({
			searchString: searchString,
			usage: ["RegisteredCustomer"],
			limit: 10
		}).subscribe(
			response => {
				this.excludeMemberGroupList = response.items;
				this.getExcludeMemberGroupsSubscription = null;
				this.excludeMemberGroupList.forEach(memberGroup => {
					const organizationId = memberGroup.ownerId;
					if (this.organizationNames[organizationId]) {
						memberGroup.organizationName = this.organizationNames[organizationId];
					} else {
						this.loadOrganizationName(organizationId);
					}
				});
			},
			error => {
				this.getExcludeMemberGroupsSubscription = null;
				console.log(error);
			}
		);
	}

	removeAssignedMemberGroup(assignedMemberGroup) {
		const index = this.assignedMemberGroups.indexOf(assignedMemberGroup);
		if (index >= 0) {
			this.assignedMemberGroups.splice(index, 1);
			this.populateAssignedMemberGroups();
		}
	}

	triggerSave() {
		this.save.emit(null);
	}

	private createForm() {
		this.searchTextInclude = new FormControl("");
		this.searchTextExclude = new FormControl("");
		this.groupsForm = new FormGroup({
			searchTextInclude: this.searchTextInclude,
			searchTextExclude: this.searchTextExclude
		});
	}

	private loadOrganizationName(organizationId: string): void {
		if (!this.getOrganizationSubscriptions[organizationId]) {
			this.getOrganizationSubscriptions[organizationId] = this.organizationsService.
					OrganizationsFindByOrganizationId(organizationId).subscribe(
				body => {
					this.organizationNames[organizationId] = body.organizationName;
					this.getOrganizationSubscriptions[organizationId] = null;
					if (this.includeMemberGroupList != null) {
						this.includeMemberGroupList.forEach(memberGroup => {
							if (memberGroup.ownerId === body.id) {
								memberGroup.organizationName = body.organizationName;
							}
						});
					}
					if (this.excludeMemberGroupList != null) {
						this.excludeMemberGroupList.forEach(memberGroup => {
							if (memberGroup.ownerId === body.id) {
								memberGroup.organizationName = body.organizationName;
							}
						});
					}
					this.assignedMemberGroups.forEach(assignedMemberGroup => {
						if (assignedMemberGroup.organizationId === body.id) {
							assignedMemberGroup.organizationName = body.organizationName;
						}
					});
				}
			);
		}
	}
}
