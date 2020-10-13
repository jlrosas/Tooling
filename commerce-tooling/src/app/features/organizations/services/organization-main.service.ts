/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { OrganizationsService } from "../../../rest/services/organizations.service";
import { RoleAssignmentsService } from "../../../rest/services/role-assignments.service";
import { ApprovalTypesService } from "../../../rest/services/approval-types.service";
import { MemberGroupMembershipsService } from "../../../rest/services/member-group-memberships.service";
import { MemberGroupsService } from "../../../rest/services/member-groups.service";

@Injectable({
	providedIn: "root"
})
export class OrganizationMainService {
	organizationData: any = null;
	assignedRoles: Array<any> = null;
	assignedMemberGroups: Array<any> = null;
	currentOrganizationId: string = null;
	processing = false;
	assignedApprovalTypes: Array<{ id: string; approvalName: string;  }> = null;
	private currentOrganization: any = null;
	private currentRoles: Array<any> = null;
	private currentApprovalTypes: Array<{ id: string }> = null;
	private currentMemberGroupMemberships: Array<any> = null;
	private activeServicesCount = 0;

	constructor(private organizationsService: OrganizationsService,
			private roleAssignmentsService: RoleAssignmentsService,
			private approvalTypesService: ApprovalTypesService,
			private memberGroupMembershipsService: MemberGroupMembershipsService,
			private memberGroupsService: MemberGroupsService) { }

	clearData() {
		this.organizationData = null;
		this.assignedRoles = null;
		this.currentOrganizationId = null;
		this.processing = false;
		this.currentOrganization = null;
		this.currentRoles = null;
		this.assignedApprovalTypes = null;
		this.currentApprovalTypes = null;
		this.currentMemberGroupMemberships = null;
		this.assignedMemberGroups = null;
		this.activeServicesCount = 0;
	}

	createOrganization(): Observable<void> {
		this.processing = true;
		return new Observable<undefined>((observer: Observer<void>) => {
			this.organizationsService.OrganizationsCreateOrganizationResponse(this.buildCreateOrganizationBody()).subscribe(
				response => {
					const paths: Array<string> = response.headers.get("location").split("/");
					const id: string = paths[paths.length - 1];
					this.currentOrganizationId = id;
					this.activeServicesCount = 0;
					if (this.assignedRoles) {
						this.activeServicesCount += this.assignedRoles.length;
					}
					if (this.assignedApprovalTypes) {
						this.activeServicesCount += this.assignedApprovalTypes.length;
					}
					if (this.assignedMemberGroups) {
						this.activeServicesCount += this.assignedMemberGroups.length;
					}
					if (this.activeServicesCount === 0) {
						observer.next(undefined);
						observer.complete();
						this.processing = false;
					} else {
						this.createRoleAssignments(id, observer);
						this.createApprovalTypeAssignments(id, observer);
						this.createMemberGroupMemberships(id, observer);
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

	buildCreateOrganizationBody(): any {
		const address = this.organizationData.address;
		const newAddress: any = {};
		if (address.address1) {
			newAddress.address1 = address.address1;
		}
		if (address.address2) {
			newAddress.address2 = address.address2;
		}
		if (address.city) {
			newAddress.city = address.city;
		}
		if (address.country) {
			newAddress.country = address.country;
		}
		if (address.email1) {
			newAddress.email1 = address.email1;
		}
		if (address.state) {
			newAddress.state = address.state;
		}
		if (address.zipCode) {
			newAddress.zipCode = address.zipCode;
		}
		const organization = this.organizationData;
		const newOrganization: any = {
			address: newAddress
		};
		if (organization.administratorFirstName) {
			newOrganization.administratorFirstName = organization.administratorFirstName;
		}
		if (organization.administratorLastName) {
			newOrganization.administratorLastName = organization.administratorLastName;
		}
		if (organization.description) {
			newOrganization.description = organization.description;
		}
		if (organization.organizationName) {
			newOrganization.organizationName = organization.organizationName;
		}
		if (organization.parentOrganizationId) {
			newOrganization.parentOrganizationId = organization.parentOrganizationId;
		}
		if (organization.organizationType) {
			newOrganization.organizationType = organization.organizationType;
		}
		return newOrganization;
	}

	updateOrganization(): Observable<void> {
		this.processing = true;
		return new Observable<undefined>((observer: Observer<void>) => {
			this.activeServicesCount = 0;
			if (this.currentOrganization != null && this.organizationData != null) {
				this.activeServicesCount ++;
			}

			const deletedRoles = [];
			const addedRoles = [];
			if (this.currentRoles != null && this.assignedRoles != null) {
				this.currentRoles.forEach(currentRole => {
					let found = false;
					this.assignedRoles.forEach(assignedRole => {
						if (assignedRole.roleId === currentRole.roleId) {
							found = true;
						}
					});
					if (!found) {
						deletedRoles.push(currentRole);
					}
				});
				this.assignedRoles.forEach(assignedRole => {
					let found = false;
					this.currentRoles.forEach(currentRole => {
						if (currentRole.roleId === assignedRole.roleId) {
							found = true;
						}
					});
					if (!found) {
						addedRoles.push(assignedRole);
					}
				});
			}
			this.activeServicesCount += deletedRoles.length;
			this.activeServicesCount += addedRoles.length;

			const { addedApprovalTypes, deletedApprovalTypes } = this.getApprovalTypesForUpdate();
			this.activeServicesCount += deletedApprovalTypes.length;
			this.activeServicesCount += addedApprovalTypes.length;

			const deletedMemberGroupMemberships = [];
			const addedMemberGroupMemberships = [];
			const modifiedMemberGroupMemberships = [];
			if (this.currentMemberGroupMemberships != null && this.assignedMemberGroups != null) {
				this.currentMemberGroupMemberships.forEach(currentMemberGroupMembership => {
					let foundAssignedMemberGroup = null;
					this.assignedMemberGroups.forEach(assignedMemberGroup => {
						if (assignedMemberGroup.memberGroupId === currentMemberGroupMembership.memberGroupId) {
							foundAssignedMemberGroup = assignedMemberGroup;
						}
					});
					if (foundAssignedMemberGroup == null) {
						deletedMemberGroupMemberships.push(currentMemberGroupMembership);
					} else if (foundAssignedMemberGroup.exclude !== currentMemberGroupMembership.exclude) {
						modifiedMemberGroupMemberships.push(foundAssignedMemberGroup);
					}
				});
				this.assignedMemberGroups.forEach(assignedMemberGroup => {
					let found = false;
					this.currentMemberGroupMemberships.forEach(currentMemberGroupMembership => {
						if (currentMemberGroupMembership.memberGroupId === assignedMemberGroup.memberGroupId) {
							found = true;
						}
					});
					if (!found) {
						addedMemberGroupMemberships.push(assignedMemberGroup);
					}
				});
			}
			this.activeServicesCount += deletedMemberGroupMemberships.length;
			this.activeServicesCount += modifiedMemberGroupMemberships.length;
			this.activeServicesCount += addedMemberGroupMemberships.length;
			if (this.currentOrganization != null && this.organizationData != null) {
				this.organizationsService.OrganizationsUpdateOrganizationResponse({
					id: this.currentOrganization.id,
					body: this.buildUpdateOrganizationBody()
				}).subscribe(
					response => {
						this.activeServicesCount --;
						if (this.activeServicesCount === 0) {
							observer.next(undefined);
							observer.complete();
							this.processing = false;
						}
					},
					error => {
						this.activeServicesCount --;
						observer.error(error);
						if (this.activeServicesCount === 0) {
							observer.complete();
							this.processing = false;
						}
					}
				);
			}

			deletedRoles.forEach(deletedRole => {
				this.roleAssignmentsService.RoleAssignmentDeleteRoleAssignmentResponse({
					memberId: this.currentOrganizationId,
					organizationId: this.currentOrganizationId,
					roleId: deletedRole.roleId
				}).subscribe(
					response => {
						this.activeServicesCount --;
						if (this.activeServicesCount === 0) {
							observer.next(undefined);
							observer.complete();
							this.processing = false;
						}
					},
					error => {
						this.activeServicesCount --;
						observer.error(error);
						if (this.activeServicesCount === 0) {
							observer.complete();
							this.processing = false;
						}
					}
				);
			});

			addedRoles.forEach(addedRole => {
				this.roleAssignmentsService.RoleAssignmentCreateRoleAssignmentResponse({
					memberId: this.currentOrganizationId,
					organizationId: this.currentOrganizationId,
					roleId: addedRole.roleId
				}).subscribe(
					response => {
						this.activeServicesCount --;
						if (this.activeServicesCount === 0) {
							observer.next(undefined);
							observer.complete();
							this.processing = false;
						}
					},
					error => {
						this.activeServicesCount --;
						observer.error(error);
						if (this.activeServicesCount === 0) {
							observer.complete();
							this.processing = false;
						}
					}
				);
			});

			deletedApprovalTypes.forEach(approvalType => {
				this.approvalTypesService.deleteApprovalTypeAssignmentResponse({
					organizationId: this.currentOrganizationId,
					approvalTypeId: approvalType.id
				}).subscribe(
					response => {
						this.activeServicesCount --;
						if (this.activeServicesCount === 0) {
							observer.next(undefined);
							observer.complete();
							this.processing = false;
						}
					},
					error => {
						this.activeServicesCount --;
						observer.error(error);
						if (this.activeServicesCount === 0) {
							observer.complete();
							this.processing = false;
						}
					}
				);
			});

			addedApprovalTypes.forEach(approvalType => {
				this.approvalTypesService.createApprovalTypeAssignment({
					organizationId: this.currentOrganizationId,
					approvalTypeId: approvalType.id
				}).subscribe(
					response => {
						this.activeServicesCount --;
						if (this.activeServicesCount === 0) {
							observer.next(undefined);
							observer.complete();
							this.processing = false;
						}
					},
					error => {
						this.activeServicesCount --;
						observer.error(error);
						if (this.activeServicesCount === 0) {
							observer.complete();
							this.processing = false;
						}
					}
				);
			});

			deletedMemberGroupMemberships.forEach(deletedMemberGroupMembership => {
				this.memberGroupMembershipsService.deleteMemberGroupMembershipById({
					memberId: this.currentOrganizationId,
					memberGroupId: deletedMemberGroupMembership.memberGroupId
				}).subscribe(
					response => {
						this.activeServicesCount--;
						if (this.activeServicesCount === 0) {
							observer.next(undefined);
							observer.complete();
							this.processing = false;
						}
					},
					error => {
						this.activeServicesCount--;
						observer.error(error);
						if (this.activeServicesCount === 0) {
							observer.complete();
							this.processing = false;
						}
					}
				);
			});

			modifiedMemberGroupMemberships.forEach(modifiedMemberGroupMembership => {
				this.memberGroupMembershipsService.deleteMemberGroupMembershipById({
					memberId: this.currentOrganizationId,
					memberGroupId: modifiedMemberGroupMembership.memberGroupId
				}).subscribe(
					response => {
						this.memberGroupMembershipsService.createMemberGroupMembership({
							memberId: this.currentOrganizationId,
							memberGroupId: modifiedMemberGroupMembership.memberGroupId,
							exclude: modifiedMemberGroupMembership.exclude
						}).subscribe(
							createResponse => {
								this.activeServicesCount--;
								if (this.activeServicesCount === 0) {
									observer.next(undefined);
									observer.complete();
									this.processing = false;
								}
							},
							error => {
								this.activeServicesCount--;
								observer.error(error);
								if (this.activeServicesCount === 0) {
									observer.complete();
									this.processing = false;
								}
							}
						);
					},
					error => {
						this.activeServicesCount--;
						observer.error(error);
						if (this.activeServicesCount === 0) {
							observer.complete();
							this.processing = false;
						}
					}
				);
			});
			addedMemberGroupMemberships.forEach(addedMemberGroupMembership => {
				this.memberGroupMembershipsService.createMemberGroupMembership({
					memberId: this.currentOrganizationId,
					memberGroupId: addedMemberGroupMembership.memberGroupId,
					exclude: addedMemberGroupMembership.exclude
				}).subscribe(
					response => {
						this.activeServicesCount--;
						if (this.activeServicesCount === 0) {
							observer.next(undefined);
							observer.complete();
							this.processing = false;
						}
					},
					error => {
						this.activeServicesCount--;
						observer.error(error);
						if (this.activeServicesCount === 0) {
							observer.complete();
							this.processing = false;
						}
					}
				);
			});
		});
	}

	loadCurrentOrganization(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentOrganization != null && this.currentOrganization.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentOrganizationId) {
					this.clearData();
					this.currentOrganizationId = id;
				}
				this.organizationsService.OrganizationsFindByOrganizationId(id).subscribe(
					body => {
						this.currentOrganization = body;
						const address = body.address;
						this.organizationData = {
							id:	body.id,
							address: {
								address1: address.address1,
								address2: address.address2,
								city: address.city,
								country: address.country,
								email1: address.email1,
								state: address.state,
								zipCode: address.zipCode
							},
							administratorFirstName: body.administratorFirstName,
							administratorLastName: body.administratorLastName,
							description: body.description,
							organizationName: body.organizationName,
							organizationType: body.organizationType,
							parentOrganizationId: body.parentOrganizationId,
							parentOrganizationName: body.parentOrganizationName
						};
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

	loadCurrentOrganizationRoles(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (id === this.currentOrganizationId && this.assignedRoles !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentOrganizationId) {
					this.clearData();
					this.currentOrganizationId = id;
				}
				this.roleAssignmentsService.getRoleAssignments({
					memberId: id
				}).subscribe(body => {
					this.currentRoles = body.items;
					this.assignedRoles = [];
					this.currentRoles.forEach(roleAssignment => {
						this.assignedRoles.push({
							roleId: roleAssignment.roleId,
							roleName: ""
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

	loadCurrentOrganizationApprovals(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (id === this.currentOrganizationId && this.assignedApprovalTypes !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentOrganizationId) {
					this.clearData();
					this.currentOrganizationId = id;
				}
				this.approvalTypesService.getApprovalTypeAssignments({
					organizationId: id
				}).subscribe(body => {
					this.currentApprovalTypes = [];
					this.assignedApprovalTypes = [];
					body.items.forEach((approval: { approvalTypeId: string; approvalName: string }) => {
						this.assignedApprovalTypes.push({
							id: approval.approvalTypeId,
							approvalName: approval.approvalName
						});
						this.currentApprovalTypes.push({
							id: approval.approvalTypeId
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

	loadCurrentMemberGroupMemberships(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (id === this.currentOrganizationId && this.assignedMemberGroups !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentOrganizationId) {
					this.clearData();
					this.currentOrganizationId = id;
				}
				this.memberGroupMembershipsService.getMemberGroupMemberships({
					memberId: id
				}).subscribe(body => {
					this.currentMemberGroupMemberships = body.items;
					this.assignedMemberGroups = [];
					let count = body.items.length;
					if (count > 0) {
						body.items.forEach(memberGroupMembership => {
							const memberGroupId = memberGroupMembership.memberGroupId;
							this.memberGroupsService.getMemberGroup({
								id: memberGroupId
							}).subscribe(memberGroup => {
								count--;
								this.assignedMemberGroups.push({
									memberGroupId,
									organizationId: memberGroup.ownerId,
									memberGroupName: memberGroup.name,
									exclude: memberGroupMembership.exclude
								});
								if (count === 0) {
									observer.next(undefined);
									observer.complete();
								}
							},
							error => {
								count--;
								if (count === 0) {
									observer.next(error);
									observer.complete();
								}
							});
						});
					} else {
						observer.next(undefined);
						observer.complete();
					}
				},
				error => {
					observer.next(error);
					observer.complete();
				});
			}
		});
	}

	buildUpdateOrganizationBody(): any {
		const currentAddress = this.currentOrganization.address;
		const address = this.organizationData.address;
		const changedAddress: any = {};
		if (address.address1 !== currentAddress.address1) {
			changedAddress.address1 = address.address1;
		}
		if (address.address2 !== currentAddress.address2) {
			changedAddress.address2 = address.address2;
		}
		if (address.city !== currentAddress.city) {
			changedAddress.city = address.city;
		}
		if (address.country !== currentAddress.country) {
			changedAddress.country = address.country;
		}
		if (address.email1 !== currentAddress.email1) {
			changedAddress.email1 = address.email1;
		}
		if (address.state !== currentAddress.state) {
			changedAddress.state = address.state;
		}
		if (address.zipCode !== currentAddress.zipCode) {
			changedAddress.zipCode = address.zipCode;
		}
		const organization = this.organizationData;
		const changedOrganization: any = {
			address: changedAddress
		};
		if (organization.administratorFirstName !== this.currentOrganization.administratorFirstName) {
			changedOrganization.administratorFirstName = organization.administratorFirstName;
		}
		if (organization.administratorLastName !== this.currentOrganization.administratorLastName) {
			changedOrganization.administratorLastName = organization.administratorLastName;
		}
		if (organization.description !== this.currentOrganization.description) {
			changedOrganization.description = organization.description;
		}
		return changedOrganization;
	}

	private createRoleAssignments(id: string, observer: Observer<void>): void {
		const assignedRoles = this.assignedRoles;
		if (assignedRoles != null && assignedRoles.length > 0) {
			assignedRoles.forEach(assignedRole => {
				this.roleAssignmentsService.RoleAssignmentCreateRoleAssignmentResponse({
					memberId: id,
					organizationId: id,
					roleId: assignedRole.roleId
				}).subscribe(
					response => {
						this.activeServicesCount --;
						if (this.activeServicesCount === 0) {
							observer.next(undefined);
							observer.complete();
							this.processing = false;
						}
					},
					error => {
						this.activeServicesCount --;
						observer.error(error);
						if (this.activeServicesCount === 0) {
							observer.complete();
							this.processing = false;
						}
					}
				);
			});
		}
	}

	private createApprovalTypeAssignments(id: string, observer: Observer<void>): void {
		const assignedApprovalTypes = this.assignedApprovalTypes;
		if (assignedApprovalTypes != null && assignedApprovalTypes.length > 0) {
			assignedApprovalTypes.forEach(assignedApprovalType => {
				this.approvalTypesService.createApprovalTypeAssignment({
					organizationId: id,
					approvalTypeId: assignedApprovalType.id
				}).subscribe(
					response => {
						this.activeServicesCount --;
						if (this.activeServicesCount === 0) {
							observer.next(undefined);
							observer.complete();
							this.processing = false;
						}
					},
					error => {
						this.activeServicesCount --;
						observer.error(error);
						if (this.activeServicesCount === 0) {
							observer.complete();
							this.processing = false;
						}
					}
				);
			});
		}
	}

	private getApprovalTypesForUpdate(): any {
		const addedApprovalTypes = [];
		const deletedApprovalTypes = [];
		if (this.currentApprovalTypes != null && this.assignedApprovalTypes != null) {
			this.currentApprovalTypes.forEach(currentApprovalType => {
				let found = false;
				this.assignedApprovalTypes.forEach(assignedApproval => {
					if (assignedApproval.id === currentApprovalType.id) {
						found = true;
					}
				});
				if (!found) {
					deletedApprovalTypes.push(currentApprovalType);
				}
			});
			this.assignedApprovalTypes.forEach(assignedApproval => {
				let found = false;
				this.currentApprovalTypes.forEach(currentApproval => {
					if (currentApproval.id === assignedApproval.id) {
						found = true;
					}
				});
				if (!found) {
					addedApprovalTypes.push(assignedApproval);
				}
			});
		}
		return {
			addedApprovalTypes,
			deletedApprovalTypes
		};
	}

	private createMemberGroupMemberships(id: string, observer: Observer<void>): void {
		const assignedMemberGroups = this.assignedMemberGroups;
		if (assignedMemberGroups != null && assignedMemberGroups.length > 0) {
			assignedMemberGroups.forEach(assignedMemberGroup => {
				this.memberGroupMembershipsService.createMemberGroupMembership({
					memberId: id,
					memberGroupId: assignedMemberGroup.memberGroupId,
					exclude: assignedMemberGroup.exclude
				}).subscribe(
					response => {
						this.activeServicesCount--;
						if (this.activeServicesCount === 0) {
							observer.next(undefined);
							observer.complete();
							this.processing = false;
						}
					},
					error => {
						this.activeServicesCount--;
						observer.error(error);
						if (this.activeServicesCount === 0) {
							observer.complete();
							this.processing = false;
						}
					}
				);
			});
		}
	}
}
