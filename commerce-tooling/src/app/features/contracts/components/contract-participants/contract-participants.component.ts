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
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../../services/alert.service";
import { MatStep, MatStepper } from "@angular/material";
import { AccountsService } from "../../../../rest/services/accounts.service";
import { ContractMainService } from "../../services/contract-main.service";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { MemberGroupsService } from "../../../../rest/services/member-groups.service";
import { OrganizationNameService } from "../../../../services/organization-name.service";

@Component({
	templateUrl: "./contract-participants.component.html",
	styleUrls: ["./contract-participants.component.scss"],
	selector: "hc-contract-participants"
})
export class ContractParticipantsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	participantsForm: any;
	orgSearchControl: FormControl;
	memberGroupSearchControl: FormControl;
	organizationList: Array<any> = [];
	selectedOrganizations: Array<any> = [];
	memberGroupList: Array<any> = [];
	selectedMemberGroups: Array<any> = [];
	buyers: Array<any> = [];
	customerOrganizationId: null;

	@ViewChild("organizationInput") organizationInput: ElementRef<HTMLInputElement>;

	private getOrganizationSubscriptions = {};
	private organizationSearchString: Subject<string> = new Subject<string>();
	private memberGroupSearchString: Subject<string> = new Subject<string>();
	private getOrganizationsSubscription: Subscription = null;
	private getMemberGroupsSubscription: Subscription = null;

	constructor(private route: ActivatedRoute,
			private accountsService: AccountsService,
			private contractMainService: ContractMainService,
			private alertService: AlertService,
			private memberGroupsService: MemberGroupsService,
			private organizationsService: OrganizationsService,
			private organizationNameService: OrganizationNameService) { }

	ngOnInit() {
		this.createForm();
		if (this.mode === "edit") {
			this.contractMainService.loadCurrentBuyers(this.route.snapshot.params.id).subscribe(response => {
				this.buyers = this.contractMainService.buyers;
				this.populateBuyers();
			});
		} else {
			if (this.contractMainService.buyers === null) {
				this.contractMainService.buyers = [];
			}
			this.buyers = this.contractMainService.buyers;
			this.populateBuyers();
		}
		this.accountsService.getAccountById(this.route.snapshot.params.accountId).subscribe(response => {
			this.customerOrganizationId = response.customerOrganizationId;
			this.searchOrganizations(this.orgSearchControl.value);
		});
		this.organizationSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getOrganizations(searchString);
		});
		this.memberGroupSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getMemberGroups(searchString);
		});
		this.getMemberGroups("");
	}

	ngAfterViewInit() {
		this.step.stepControl = this.participantsForm;
		setTimeout(() => {
			this.organizationInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
	}

	triggerSave() {
		this.save.emit(null);
	}

	clearOrganizationSearch() {
		this.orgSearchControl.setValue("");
		this.searchOrganizations("");
	}

	searchOrganizations(value) {
		this.organizationSearchString.next(value);
	}

	onChangeOrganizationCheckbox(organization: any, event: any) {
		let selectedOrganization = null;
		let index = -1;
		for (let i = 0; i < this.selectedOrganizations.length; i++) {
			if (organization.id === this.selectedOrganizations[i].memberId) {
				selectedOrganization = this.selectedOrganizations[i];
				index = i;
				break;
			}
		}
		if (event.checked) {
			if (selectedOrganization == null) {
				const newBuyer = {
					memberId: organization.id,
					memberType: "organization",
					organizationName: organization.organizationName
				};
				this.buyers.push(newBuyer);
				this.selectedOrganizations.push(newBuyer);
			}
		} else {
			if (index >= 0) {
				this.selectedOrganizations.splice(index, 1);
			}
			index = -1;
			for (let i = 0; i < this.buyers.length; i++) {
				if (organization.id === this.buyers[i].memberId) {
					index = i;
					break;
				}
			}
			if (index >= 0) {
				this.buyers.splice(index, 1);
			}
		}
	}

	onChangeMemberGroupCheckbox(group: any, event: any) {
		let selectedGroup = null;
		let index = -1;
		for (let i = 0; i < this.selectedMemberGroups.length; i++) {
			if (group.id === this.selectedMemberGroups[i].memberId) {
				selectedGroup = this.selectedMemberGroups[i];
				index = i;
				break;
			}
		}
		if (event.checked) {
			if (selectedGroup == null) {
				const newBuyer = {
					memberId: group.id,
					memberType: "memberGroup",
					memberGroupName: group.name,
					organizationName: group.organizationName
				};
				this.buyers.push(newBuyer);
				this.selectedMemberGroups.push(newBuyer);
			}
		} else {
			if (index >= 0) {
				this.selectedMemberGroups.splice(index, 1);
			}
			index = -1;
			for (let i = 0; i < this.buyers.length; i++) {
				if (group.id === this.buyers[i].memberId) {
					index = i;
					break;
				}
			}
			if (index >= 0) {
				this.buyers.splice(index, 1);
			}
		}
	}

	removeSelectedOrganization(organization: any) {
		let index = this.selectedOrganizations.indexOf(organization);
		if (index >= 0) {
			this.selectedOrganizations.splice(index, 1);
		}
		index = this.buyers.indexOf(organization);
		if (index >= 0) {
			this.buyers.splice(index, 1);
		}
	}

	removeSelecteGroup(group: any) {
		let index = this.selectedMemberGroups.indexOf(group);
		if (index >= 0) {
			this.selectedMemberGroups.splice(index, 1);
		}
		index = this.buyers.indexOf(group);
		if (index >= 0) {
			this.buyers.splice(index, 1);
		}
	}

	getOrganizations(searchString: string) {
		if (this.getOrganizationsSubscription !== null) {
			this.getOrganizationsSubscription.unsubscribe();
			this.getOrganizationsSubscription = null;
		}
		if (this.customerOrganizationId) {
			this.getOrganizationsSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
				organizationName: searchString,
				ancestorOrganizationId: this.customerOrganizationId,
				taskName: "Manage",
				sort: "organizationName",
				limit: 5
			}).subscribe(response => {
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
				this.getOrganizationsSubscription = null;
			},
			error => {
				this.getOrganizationsSubscription = null;
			});
		}
	}

	clearMemberGroupSearch() {
		this.memberGroupSearchControl.setValue("");
		this.getMemberGroups("");
	}

	searchMemberGroups(searchString: string) {
		this.memberGroupSearchString.next(searchString);
	}

	getMemberGroups(searchString: string) {
		if (this.getMemberGroupsSubscription != null) {
			this.getMemberGroupsSubscription.unsubscribe();
			this.getMemberGroupsSubscription = null;
		}
		this.getMemberGroupsSubscription = this.memberGroupsService.getMemberGroups({
			searchString,
			usage: ["UserGroup", "CustomerPrice"],
			limit: 5
		}).subscribe(
			response => {
				this.memberGroupList = response.items;
				this.getMemberGroupsSubscription = null;
				this.memberGroupList.forEach(memberGroup => {
					const organizationId = memberGroup.ownerId;
					this.organizationNameService.getOrganizationName(organizationId).subscribe(organizationName => {
						memberGroup.organizationName = organizationName;
					});
				});
			},
			error => {
				this.getMemberGroupsSubscription = null;
			}
		);
	}

	isSelectedOrganization(organization) {
		let selected = false;
		this.selectedOrganizations.forEach(selectedOrganization => {
			if (selectedOrganization.memberId === organization.id) {
				selected = true;
			}
		});
		return selected;
	}

	isSelectedMemberGroup(memberGroup) {
		let selected = false;
		this.selectedMemberGroups.forEach(selectedMemberGroup => {
			if (selectedMemberGroup.memberId === memberGroup.id) {
				selected = true;
			}
		});
		return selected;
	}

	private createForm() {
		this.orgSearchControl = new FormControl("");
		this.memberGroupSearchControl = new FormControl("");
		this.participantsForm = new FormGroup({
			orgSearchControl: this.orgSearchControl,
			memberGroupSearchControl: this.memberGroupSearchControl
		});
	}

	private populateBuyers() {
		const selectedOrganizations = [];
		const selectedMemberGroups = [];
		this.buyers.forEach(buyer => {
			if (buyer.memberType === "organization") {
				selectedOrganizations.push(buyer);
				if (!buyer.organizationName) {
					this.organizationNameService.getOrganizationName(buyer.memberId).subscribe(organizationName => {
						buyer.organizationName = organizationName;
					});
				}
			} else if (buyer.memberType === "memberGroup") {
				selectedMemberGroups.push(buyer);
				if (!buyer.memberGroupName) {
					this.memberGroupsService.getMemberGroup({
						id: buyer.memberId
					}).subscribe(memberGroup => {
						buyer.memberGroupName = memberGroup.name;
						const organizationId = memberGroup.ownerId;
						this.organizationNameService.getOrganizationName(organizationId).subscribe(organizationName => {
							buyer.organizationName = organizationName;
						});
					});
				}
			}
		});
		this.selectedOrganizations = selectedOrganizations;
		this.selectedMemberGroups = selectedMemberGroups;
	}
}
