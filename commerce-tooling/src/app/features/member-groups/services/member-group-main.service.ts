/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Injectable, EventEmitter } from "@angular/core";
import { Observable, Observer, forkJoin } from "rxjs";
import { MemberGroupsService } from "../../../rest/services/member-groups.service";
import { MemberGroupMembershipsService } from "../../../rest/services/member-group-memberships.service";
import { OrganizationsService } from "../../../rest/services/organizations.service";

@Injectable({
	providedIn: "root"
})
export class MemberGroupMainService {
	memberGroupData: any = null;
	ignoreTargetOrganizationRoles = true;
	assignedTargetOrganizationRoles: Array<any> = null;
	ignoreAnyOrganizationRoles = true;
	assignedAnyOrganizationRoles: Array<any> = null;
	ignoreRolesInOrganizations = true;
	assignedOrganizationRoles: Array<any> = null;
	registrationStatus = null;
	assignedMembers: Array<any> = null;
	currentMemberGroupId: string = null;
	processing = false;
	readonly onUsageChange: EventEmitter<string> = new EventEmitter<string>();

	private currentMemberGroup: any = null;
	private currentMembers: Array<any> = null;
	private currentMemberGroupConditionElements: Array<any> = null;

	constructor(private memberGroupsService: MemberGroupsService,
			private memberGroupMembershipsService: MemberGroupMembershipsService,
			private organizationsService: OrganizationsService) { }

	clearData() {
		this.memberGroupData = null;
		this.ignoreTargetOrganizationRoles = true;
		this.assignedTargetOrganizationRoles = null;
		this.ignoreAnyOrganizationRoles = true;
		this.assignedAnyOrganizationRoles = null;
		this.ignoreRolesInOrganizations = true;
		this.assignedOrganizationRoles = null;
		this.registrationStatus = null;
		this.assignedMembers = null;
		this.currentMemberGroupId = null;
		this.processing = false;
		this.currentMemberGroup = null;
		this.currentMembers = null;
		this.currentMemberGroupConditionElements = null;
	}

	createMemberGroup(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			this.memberGroupsService.createMemberGroupResponse({
				body: this.buildCreateMemberGroupBody()
			}).subscribe(
				response => {
					const paths: Array<string> = response.headers.get("location").split("/");
					const id: string = paths[paths.length - 1];
					const conditionElementRequests = this.getCreateConditionElementRequests(id);
					const memberRequests = this.getCreateMemberRequests(id);
					if (conditionElementRequests.length === 0 && memberRequests.length === 0) {
						observer.next(undefined);
						observer.complete();
						this.processing = false;
					} else {
						let requests = memberRequests;
						let dependentRequests = null;
						if (conditionElementRequests.length > 0) {
							requests = requests.concat(conditionElementRequests[0]);
							dependentRequests = conditionElementRequests.slice(1);
						}
						this.forkJoinRequests(observer, requests, dependentRequests, [response]);
					}
				},
				error => {
					observer.error(error);
					observer.complete();
					this.processing = false;
				}
			);
		});
	}

	updateMemberGroup(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			const updateMemberGroupRequest = this.getUpdateMemberGroupRequest();
			const conditionElementRequests = this.getUpdateConditionElementRequests();
			const memberRequests = this.getUpdateMemberRequests();
			if (updateMemberGroupRequest == null && conditionElementRequests.length === 0 && memberRequests.length === 0) {
				observer.next(undefined);
				observer.complete();
				this.processing = false;
			} else {
				let requests = [];
				let dependentRequests = [];
				if (updateMemberGroupRequest != null) {
					requests.push(updateMemberGroupRequest);
				}
				if (conditionElementRequests.length > 0) {
					requests = requests.concat(conditionElementRequests[0]);
					dependentRequests = conditionElementRequests.slice(1);
				}
				if (memberRequests.length > 0) {
					requests = requests.concat(memberRequests[0]);
					for (let i = 1; i < memberRequests.length; i++) {
						if (dependentRequests.length < i - 1) {
							dependentRequests.push(memberRequests[i]);
						} else {
							dependentRequests[i - 1] = dependentRequests[i - 1].concat(memberRequests[i]);
						}
					}
				}
				this.forkJoinRequests(observer, requests, dependentRequests, []);
			}
		});
	}

	loadCurrentMemberGroup(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentMemberGroup != null && this.currentMemberGroup.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentMemberGroupId) {
					this.clearData();
					this.currentMemberGroupId = id;
				}
				this.memberGroupsService.getMemberGroup({
					id
				}).subscribe(
					body => {
						this.currentMemberGroup = body;
						this.memberGroupData = {
							id:	body.id,
							name: body.name,
							description: body.description,
							ownerId: body.ownerId,
							usage: body.usage
						};
						this.onUsageChange.emit(body.usage);
						observer.next(undefined);
						observer.complete();
					},
					error => {
						observer.error(error);
						observer.complete();
					}
				);
			}
		});
	}

	loadCurrentMemberGroupDefinition(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (id === this.currentMemberGroupId && this.currentMemberGroupConditionElements !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentMemberGroupId) {
					this.clearData();
					this.currentMemberGroupId = id;
				}
				this.memberGroupsService.getMemberGroupConditionElements({
					id
				}).subscribe(body => {
					this.loadMembersGroupDefinitionFromResponse(body);
					observer.next(undefined);
					observer.complete();
				},
				error => {
					observer.next(error);
					observer.complete();
				});
			}
		});
	}

	loadCurrentMemberGroupMembers(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (id === this.currentMemberGroupId && this.assignedMembers !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentMemberGroupId) {
					this.clearData();
					this.currentMemberGroupId = id;
				}
				this.memberGroupMembershipsService.getMemberGroupMemberships({
					memberGroupId: id
				}).subscribe(body => {
					this.currentMembers = body.items;
					this.assignedMembers = [];
					this.currentMembers.forEach(member => {
						this.assignedMembers.push({
							memberId: member.memberId,
							exclude: member.exclude
						});
					});
					observer.next(undefined);
					observer.complete();
				},
				error => {
					observer.next(error);
					observer.complete();
				});
			}
		});
	}

	private loadOrganizationNames(uniqueOrganizationIds: Array<string>): void {
		uniqueOrganizationIds.forEach(organizationId => {
			this.organizationsService.OrganizationsFindByOrganizationId(organizationId).subscribe(
				body => {
					this.assignedOrganizationRoles.forEach(assignedOrganizationRole => {
						if (assignedOrganizationRole.organizationId === body.id) {
							assignedOrganizationRole.organizationName = body.organizationName;
						}
					});
				}
			);
		});
	}

	private buildCreateMemberGroupBody(): any {
		const memberGroup = this.memberGroupData;
		const newMemberGroup: any = {
		};
		if (memberGroup.name) {
			newMemberGroup.name = memberGroup.name;
		}
		if (memberGroup.description) {
			newMemberGroup.description = memberGroup.description;
		}
		if (memberGroup.ownerId) {
			newMemberGroup.ownerId = memberGroup.ownerId;
		}
		if (memberGroup.usage) {
			newMemberGroup.usage = memberGroup.usage;
		}
		return newMemberGroup;
	}

	private getCreateMemberRequests(id: string): Array<Observable<any>> {
		const requests = [];
		const assignedMembers = this.assignedMembers;
		this.assignedMembers = null;
		if (assignedMembers != null) {
			assignedMembers.forEach(assignedMember => {
				requests.push(this.memberGroupMembershipsService.createMemberGroupMembershipResponse({
					memberGroupId: id,
					memberId: assignedMember.memberId,
					exclude: assignedMember.exclude
				}));
			});
		}
		return requests;
	}

	private getCreateConditionElementRequests(id: string): Array<Array<Observable<any>>> {
		const conditionElements = this.getConditionElements();
		const requests: Array<Array<Observable<any>>> = [];
		conditionElements.forEach(conditionElementArray => {
			if (conditionElementArray.length > 0) {
				const requestArray = [];
				requests.push(requestArray);
				conditionElementArray.forEach(conditionElement => {
					requestArray.push(this.memberGroupsService.createMemberGroupConditionElementResponse({
						id,
						body: conditionElement
					}));
				});
			}
		});

		if (requests.length > 0) {
			const requestArray = [];
			requests.push(requestArray);
			requestArray.push(this.memberGroupsService.activateMemberGroupResponse({
				id
			}));
		}

		return requests;
	}

	private getUpdateMemberGroupRequest(): Observable<any> {
		let request: Observable<any> = null;
		if (this.currentMemberGroup != null && this.memberGroupData != null &&
				this.memberGroupData.description !== this.currentMemberGroup.description) {
			request = this.memberGroupsService.updateMemberGroupResponse({
				id: this.currentMemberGroupId,
				body: {
					description: this.memberGroupData.description
				}
			});
		}
		return request;
	}

	private getUpdateConditionElementRequests(): Array<Array<Observable<any>>> {
		const conditionElements = this.getConditionElements();
		const deletedConditionElements = [];
		if (this.currentMemberGroupConditionElements != null) {
			this.currentMemberGroupConditionElements.forEach(currentConditionElementArray => {
				const deletedConditionElementArray = [];
				deletedConditionElements.push(deletedConditionElementArray);
				currentConditionElementArray.forEach(currentConditionElement => {
					let found = false;
					for (let i = 0; i < conditionElements.length; i++) {
						const conditionElementArray = conditionElements[i];
						for (let j = 0; j < conditionElementArray.length; j++) {
							const conditionElement = conditionElementArray[j];
							if (this.checkEquivalentConditionElements(currentConditionElement, conditionElement)) {
								found = true;
								conditionElementArray.splice(j, 1);
								break;
							}
						}
						if (found) {
							if (conditionElementArray.length === 0) {
								conditionElements.splice(i, 1);
								i--;
							}
							break;
						}
					}
					if (!found) {
						deletedConditionElementArray.push(currentConditionElement);
					}
				});
			});
		}

		const requests: Array<Array<Observable<any>>> = [];
		for (let i = deletedConditionElements.length; i > 0; i--) {
			const deletedConditionElementArray = deletedConditionElements[i - 1];
			if (deletedConditionElementArray.length > 0) {
				const requestArray = [];
				requests.push(requestArray);
				deletedConditionElementArray.forEach(conditionElement => {
					requestArray.push(this.memberGroupsService.deleteMemberGroupConditionElementResponse({
						id: this.currentMemberGroupId,
						elementId: conditionElement.id
					}));
				});
			}
		}
		conditionElements.forEach(conditionElementArray => {
			if (conditionElementArray.length > 0) {
				const requestArray = [];
				requests.push(requestArray);
				conditionElementArray.forEach(conditionElement => {
					requestArray.push(this.memberGroupsService.createMemberGroupConditionElementResponse({
						id: this.currentMemberGroupId,
						body: conditionElement
					}));
				});
			}
		});

		if (requests.length > 0) {
			const requestArray = [];
			requests.push(requestArray);
			requestArray.push(this.memberGroupsService.activateMemberGroupResponse({
				id: this.currentMemberGroupId
			}));
		}

		return requests;
	}

	private getUpdateMemberRequests(): Array<Array<Observable<any>>> {
		const deletedMembers = [];
		const addedMembers = [];
		if (this.currentMembers != null) {
			this.currentMembers.forEach(currentMember => {
				let found = false;
				if (this.assignedMembers != null) {
					this.assignedMembers.forEach(assignedMember => {
						if (assignedMember.memberId === currentMember.memberId && assignedMember.exclude === currentMember.exclude) {
							found = true;
						}
					});
				}
				if (!found) {
					deletedMembers.push(currentMember);
				}
			});
		}
		if (this.assignedMembers != null) {
			this.assignedMembers.forEach(assignedMember => {
				let found = false;
				if (this.currentMembers != null) {
					this.currentMembers.forEach(currentMember => {
						if (currentMember.memberId === assignedMember.memberId && currentMember.exclude === assignedMember.exclude) {
							found = true;
						}
					});
				}
				if (!found) {
					addedMembers.push(assignedMember);
				}
			});
		}

		const requests: Array<Array<Observable<any>>> = [];
		if (deletedMembers.length > 0) {
			const requestArray = [];
			requests.push(requestArray);
			deletedMembers.forEach(deletedMember => {
				requestArray.push(this.memberGroupMembershipsService.deleteMemberGroupMembershipByIdResponse({
					memberGroupId: this.currentMemberGroupId,
					memberId: deletedMember.memberId
				}));
			});
		}
		if (addedMembers.length > 0) {
			const requestArray = [];
			requests.push(requestArray);
			addedMembers.forEach(addedMember => {
				requestArray.push(this.memberGroupMembershipsService.createMemberGroupMembershipResponse({
					memberGroupId: this.currentMemberGroupId,
					memberId: addedMember.memberId,
					exclude: addedMember.exclude
				}));
			});
		}

		return requests;
	}

	private checkEquivalentConditionElements(element1, element2): boolean {
		let equivalent = true;
		if (element1.parentElementName !== element2.parentElementName || element1.type !== element2.type) {
			equivalent = false;
		} else if (element1.type === "simpleCondition") {
			if (element1.simpleConditionVariable !== element2.simpleConditionVariable ||
					element1.simpleConditionOperator !== element2.simpleConditionOperator ||
					element1.simpleConditionValue !== element2.simpleConditionValue) {
				equivalent = false;
			} else {
				const nvpList1 = element1.nameValuePairVariable;
				const nvpList2 = element2.nameValuePairVariable;
				if (nvpList1 && !nvpList2 || !nvpList1 && nvpList2) {
					equivalent = false;
				} else if (nvpList1 && nvpList2) {
					if (nvpList1.length !== nvpList2.length) {
						equivalent = false;
					} else {
						for (let i = 0; i < nvpList1.length; i++) {
							if (nvpList1[i].name !== nvpList2[i].name || nvpList1[i].value !== nvpList2[i].value) {
								equivalent = false;
							}
						}
					}
				}
			}
		} else if (element1.name !== element2.name) {
			equivalent = false;
		}
		return equivalent;
	}

	private getConditionElements(): Array<Array<any>> {
		const conditionElements = [[], [], []];
		if (!this.ignoreRolesInOrganizations && this.assignedOrganizationRoles != null && this.assignedOrganizationRoles.length > 0) {
			this.assignedOrganizationRoles.forEach(assignedOrganizationRole => {
				conditionElements[2].push({
					"parentElementName": "role",
					"simpleConditionVariable": "role",
					"simpleConditionOperator": "=",
					"simpleConditionValue": assignedOrganizationRole.roleIdentifier,
					"type": "simpleCondition",
					"nameValuePairVariable": [
						{
							"name": "org",
							"value": assignedOrganizationRole.organizationId
						}
					]
				});
			});
		}
		if (!this.ignoreTargetOrganizationRoles && this.assignedTargetOrganizationRoles != null &&
				this.assignedTargetOrganizationRoles.length > 0) {
			this.assignedTargetOrganizationRoles.forEach(assignedRole => {
				conditionElements[2].push({
					"parentElementName": "role",
					"simpleConditionVariable": "role",
					"simpleConditionOperator": "=",
					"simpleConditionValue": assignedRole.roleIdentifier,
					"type": "simpleCondition",
					"nameValuePairVariable": [
						{
							"name": "org",
							"value": "OrgAndAncestorOrgs"
						}
					]
				});
			});
		}
		if (!this.ignoreAnyOrganizationRoles && this.assignedAnyOrganizationRoles != null && this.assignedAnyOrganizationRoles.length > 0) {
			this.assignedAnyOrganizationRoles.forEach(assignedRole => {
				conditionElements[2].push({
					"parentElementName": "role",
					"simpleConditionVariable": "role",
					"simpleConditionOperator": "=",
					"simpleConditionValue": assignedRole.roleIdentifier,
					"type": "simpleCondition"
				});
			});
		}
		if (conditionElements[2].length > 0) {
			conditionElements[1].push({
				"name": "role",
				"parentElementName": "topAndList",
				"type": "orListCondition"
			});
		}
		if (this.registrationStatus) {
			conditionElements[1].push({
				"parentElementName": "topAndList",
				"simpleConditionVariable": "registrationStatus",
				"simpleConditionOperator": "=",
				"simpleConditionValue": this.registrationStatus,
				"type": "simpleCondition"
			});
		}
		if (conditionElements[1].length > 0) {
			conditionElements[0].push({
				"name": "topAndList",
				"parentElementName": null,
				"type": "andListCondition"
			});
		}

		return conditionElements;
	}

	private loadMembersGroupDefinitionFromResponse(body: any) {
		this.assignedTargetOrganizationRoles = [];
		this.assignedAnyOrganizationRoles = [];
		this.assignedOrganizationRoles = [];
		this.ignoreTargetOrganizationRoles = true;
		this.ignoreAnyOrganizationRoles = true;
		this.ignoreRolesInOrganizations = true;
		this.registrationStatus = null;
		const uniqueOrganizationIds: Array<string> = [];
		if (body && body.items) {
			this.currentMemberGroupConditionElements = [];
			const parentMap = {};
			body.items.forEach(element => {
				parentMap[element.name] = element.parentElementName;
			});
			body.items.forEach(item => {
				let ancestorCount = 0;
				let name = item.name;
				while (parentMap[name]) {
					ancestorCount++;
					name = parentMap[name];
				}
				while (this.currentMemberGroupConditionElements.length <= ancestorCount) {
					this.currentMemberGroupConditionElements.push([]);
				}
				this.currentMemberGroupConditionElements[ancestorCount].push(item);
				if (item.parentElementName === "role") {
					let isAssignedOrganizationRole = false;
					let isTargetOrganizationRole = false;
					let isAnyOrganizationRole = false;
					if (item.nameValuePairVariable && item.nameValuePairVariable.length > 0) {
						if (item.nameValuePairVariable[0].value !== "OrgAndAncestorOrgs") {
							isAssignedOrganizationRole = true;
						} else {
							isTargetOrganizationRole = true;
						}
					} else {
						isAnyOrganizationRole = true;
					}
					if (isAssignedOrganizationRole) {
						this.assignedOrganizationRoles.push({
							organizationId: item.nameValuePairVariable[0].value,
							roleIdentifier: item.simpleConditionValue
						});
						if (uniqueOrganizationIds.indexOf(item.nameValuePairVariable[0].value) < 0) {
							uniqueOrganizationIds.push(item.nameValuePairVariable[0].value);
						}
						this.ignoreRolesInOrganizations = false;
					} else if (isTargetOrganizationRole) {
						this.assignedTargetOrganizationRoles.push({
							roleIdentifier: item.simpleConditionValue
						});
						this.ignoreTargetOrganizationRoles = false;
					} else if (isAnyOrganizationRole) {
						this.assignedAnyOrganizationRoles.push({
							roleIdentifier: item.simpleConditionValue
						});
						this.ignoreAnyOrganizationRoles = false;
					}
				}
				if (item.simpleConditionVariable === "registrationStatus") {
					this.registrationStatus = item.simpleConditionValue;
				}
			});
			this.loadOrganizationNames(uniqueOrganizationIds);
		}
	}

	private forkJoinRequests(observer: Observer<Array<any>>, requests: Array<any>,
			dependentRequests: Array<Array<any>>, responseList: Array<any>): void {
		forkJoin(requests).subscribe(
			newResponseList => {
				if (dependentRequests != null && dependentRequests.length > 0) {
					this.forkJoinRequests(observer, dependentRequests[0], dependentRequests.slice(1), responseList.concat(newResponseList));
				} else {
					observer.next(responseList.concat(newResponseList));
					observer.complete();
					this.processing = false;
				}
			},
			error => {
				observer.error(error);
			}
		);
	}

}
