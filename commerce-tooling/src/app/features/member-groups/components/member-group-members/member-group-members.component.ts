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
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MatStep } from "@angular/material/stepper";
import { MemberGroupMainService } from "../../services/member-group-main.service";
import { UsersService } from "../../../../rest/services/users.service";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
	templateUrl: "./member-group-members.component.html",
	styleUrls: ["./member-group-members.component.scss"],
	selector: "hc-member-group-members"
})
export class MemberGroupMembersComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	membersForm: any;
	searchTextInclude: FormControl;
	searchTextExclude: FormControl;

	includeMemberList: Array<any> = [];
	excludeMemberList: Array<any> = [];
	getIncludeMembersSubscription: Subscription = null;
	getExcludeMembersSubscription: Subscription = null;
	assignedMembers: Array<any> = [];
	assignedIncludeMembers: Array<any> = [];
	assignedExcludeMembers: Array<any> = [];

	currentSearchInclude = null;
	currentSearchExclude = null;

	@ViewChild("searchTextIncludeInput") searchTextIncludeInput: ElementRef<HTMLInputElement>;

	private includeMembersSearchString: Subject<string> = new Subject<string>();
	private excludeMembersSearchString: Subject<string> = new Subject<string>();
	private organizationMemberGroup = false;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private translateService: TranslateService,
			private memberGroupMainService: MemberGroupMainService,
			private usersService: UsersService,
			private organizationsService: OrganizationsService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createForm();
		if (this.mode === "edit") {
			this.setValues();
		} else {
			if (this.memberGroupMainService.assignedMembers == null) {
				this.memberGroupMainService.assignedMembers = [];
			}
			this.assignedMembers = this.memberGroupMainService.assignedMembers;
			this.populateAssignedMembers();
		}
		if (this.memberGroupMainService.memberGroupData != null &&
				this.memberGroupMainService.memberGroupData.usage === "RegisteredCustomer") {
			this.organizationMemberGroup = true;
		}
		this.includeMembersSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchInclude = searchString;
			this.getIncludeMembers(searchString);
		});
		this.excludeMembersSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.currentSearchExclude = searchString;
			this.getExcludeMembers(searchString);
		});
		this.searchIncludeMembers("");
		this.searchExcludeMembers("");
	}

	ngAfterViewInit() {
		this.step.stepControl = this.membersForm;
		setTimeout(() => {
			this.searchTextIncludeInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
		this.includeMembersSearchString.unsubscribe();
		this.excludeMembersSearchString.unsubscribe();
	}

	onChangeCheckbox(member, exclude, event) {
		let assignedMember = null;
		let index = -1;
		for (let i = 0; i < this.assignedMembers.length; i++) {
			if (member.id === this.assignedMembers[i].memberId) {
				assignedMember = this.assignedMembers[i];
				index = i;
				break;
			}
		}
		if (event.checked) {
			if (assignedMember != null) {
				assignedMember.exclude = exclude;
			} else {
				this.assignedMembers.push({
					memberId: member.id,
					memberName: member.name,
					exclude
				});
			}
		} else {
			if (index >= 0) {
				this.assignedMembers.splice(index, 1);
			}
		}
		this.populateAssignedMembers();
	}

	isAssignedMember(member, exclude) {
		let assigned = false;
		this.assignedMembers.forEach(assignedMember => {
			if (assignedMember.memberId === member.id && assignedMember.exclude === exclude) {
				assigned = true;
			}
		});
		return assigned;
	}

	populateAssignedMembers() {
		const assignedIncludeMembers = [];
		const assignedExcludeMembers = [];
		this.assignedMembers.forEach(assignedMember => {
			if (assignedMember.exclude === "0") {
				assignedIncludeMembers.push(assignedMember);
			} else {
				assignedExcludeMembers.push(assignedMember);
			}
		});
		this.assignedIncludeMembers = assignedIncludeMembers;
		this.assignedExcludeMembers = assignedExcludeMembers;
	}

	clearIncludeMemberSearch() {
		this.currentSearchInclude = null;
		this.searchTextInclude.setValue("");
		this.getIncludeMembers("");
	}

	clearExcludeMemberSearch() {
		this.currentSearchExclude = null;
		this.searchTextExclude.setValue("");
		this.getExcludeMembers("");
	}

	searchIncludeMembers(searchString: string) {
		this.includeMembersSearchString.next(searchString);
	}

	searchExcludeMembers(searchString: string) {
		this.excludeMembersSearchString.next(searchString);
	}

	getIncludeMembers(searchString: string) {
		if (this.getIncludeMembersSubscription != null) {
			this.getIncludeMembersSubscription.unsubscribe();
			this.getIncludeMembersSubscription = null;
		}
		if (this.organizationMemberGroup) {
			this.getIncludeMembersSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
				taskName: "ManageExcludingAD",
				organizationName: searchString,
				limit: 10
			}).subscribe(response => {
				this.includeMemberList = response.items;
				this.getIncludeMembersSubscription = null;
				this.includeMemberList.forEach(member => {
					member.name = member.organizationName;
				});
			},
			error => {
				this.getIncludeMembersSubscription = null;
			});
		} else {
			this.getIncludeMembersSubscription = this.usersService.UsersGetManageableUsers({
				searchString,
				limit: 10
			}).subscribe(response => {
				this.includeMemberList = response.items;
				this.getIncludeMembersSubscription = null;
				this.includeMemberList.forEach(member => {
					member.name = this.getUserDisplayName(member);
				});
			},
			error => {
				this.getIncludeMembersSubscription = null;
			});
		}
	}

	getExcludeMembers(searchString: string) {
		if (this.getExcludeMembersSubscription != null) {
			this.getExcludeMembersSubscription.unsubscribe();
			this.getExcludeMembersSubscription = null;
		}
		if (this.organizationMemberGroup) {
			this.getExcludeMembersSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
				taskName: "ManageExcludingAD",
				organizationName: searchString,
				limit: 10
			}).subscribe(response => {
				this.excludeMemberList = response.items;
				this.getExcludeMembersSubscription = null;
				this.excludeMemberList.forEach(member => {
					member.name = member.organizationName;
				});
			},
			error => {
				this.getExcludeMembersSubscription = null;
			});
		} else {
			this.getExcludeMembersSubscription = this.usersService.UsersGetManageableUsers({
				searchString,
				limit: 10
			}).subscribe(response => {
				this.excludeMemberList = response.items;
				this.getExcludeMembersSubscription = null;
				this.excludeMemberList.forEach(member => {
					member.name = this.getUserDisplayName(member);
				});
			},
			error => {
				this.getExcludeMembersSubscription = null;
			});
		}
	}

	removeAssignedMember(assignedMember) {
		const index = this.assignedMembers.indexOf(assignedMember);
		if (index >= 0) {
			this.assignedMembers.splice(index, 1);
			this.populateAssignedMembers();
		}
	}

	triggerSave() {
		this.save.emit(null);
	}

	private setValues() {
		const id: string = this.route.snapshot.params.id;
		this.memberGroupMainService.loadCurrentMemberGroup(id).subscribe(memberGroupResponse => {
			if (this.memberGroupMainService.memberGroupData.usage === "RegisteredCustomer") {
				this.organizationMemberGroup = true;
			}
			this.memberGroupMainService.loadCurrentMemberGroupMembers(id).subscribe(response => {
				this.assignedMembers = this.memberGroupMainService.assignedMembers;
				this.assignedMembers.forEach(assignedMember => {
					if (this.organizationMemberGroup) {
						this.organizationsService.OrganizationsFindByOrganizationId(assignedMember.memberId).subscribe(organization => {
							assignedMember.memberName = organization.organizationName;
						});
					} else {
						this.usersService.UsersFindByUserId(assignedMember.memberId).subscribe(user => {
							assignedMember.memberName = this.getUserDisplayName(user);
						});
					}
				});
				this.populateAssignedMembers();
			});
		});
	}

	private createForm() {
		this.searchTextInclude = new FormControl("");
		this.searchTextExclude = new FormControl("");
		this.membersForm = new FormGroup({
			searchTextInclude: this.searchTextInclude,
			searchTextExclude: this.searchTextExclude
		});
	}

	private getUserDisplayName(user): string {
		let name = user.logonId;
		if (user.address) {
			name += " (";
			if (user.address.firstName) {
				name += user.address.firstName;
				name += " ";
			}
			if (user.address.lastName) {
				name += user.address.lastName;
			}
			name += ")";
		}
		return name;
	}
}
