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
import { UsersService } from "../../../rest/services/users.service";
import { RoleAssignmentsService } from "../../../rest/services/role-assignments.service";
import { OrganizationsService } from "../../../rest/services/organizations.service";
import { MemberGroupMembershipsService } from "../../../rest/services/member-group-memberships.service";
import { MemberGroupsService } from "../../../rest/services/member-groups.service";

@Injectable({
	providedIn: "root"
})
export class UserMainService {
	userData: any = null;
	assignedRoles: Array<any> = null;
	assignedMemberGroups: Array<any> = null;
	currentUserId: string = null;
	processing = false;
	private currentUser: any = null;
	private currentRoles: Array<any> = null;
	private currentMemberGroupMemberships: Array<any> = null;
	private activeServicesCount = 0;

	constructor(private usersService: UsersService,
			private roleAssignmentsService: RoleAssignmentsService,
			private organizationsService: OrganizationsService,
			private memberGroupsService: MemberGroupsService,
			private memberGroupMembershipsService: MemberGroupMembershipsService) { }

	clearData() {
		this.userData = null;
		this.assignedRoles = null;
		this.assignedMemberGroups = null;
		this.currentUserId = null;
		this.processing = false;
		this.currentUser = null;
		this.currentRoles = null;
		this.currentMemberGroupMemberships = null;
		this.activeServicesCount = 0;
	}

	createUser(): Observable<void> {
		this.processing = true;
		return new Observable<undefined>((observer: Observer<void>) => {
			this.usersService.UsersCreateUserResponse(this.buildCreateUserBody()).subscribe(
				response => {
					const paths: Array<string> = response.headers.get("location").split("/");
					const id: string = paths[paths.length - 1];
					this.currentUserId = id;
					this.activeServicesCount = 0;
					if (this.assignedRoles) {
						this.activeServicesCount += this.assignedRoles.length;
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

	buildCreateUserBody(): any {
		const address = this.userData.address;
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
		if (address.firstName) {
			newAddress.firstName = address.firstName;
		}
		if (address.lastName) {
			newAddress.lastName = address.lastName;
		}
		if (address.personTitle) {
			newAddress.personTitle = address.personTitle;
		}
		if (address.state) {
			newAddress.state = address.state;
		}
		if (address.zipCode) {
			newAddress.zipCode = address.zipCode;
		}
		const user = this.userData;
		const newUser: any = {
			address: newAddress
		};
		if (user.logonId) {
			newUser.logonId = user.logonId;
		}
		if (user.parentOrganizationId) {
			newUser.parentOrganizationId = user.parentOrganizationId;
		}
		if (user.password) {
			newUser.password = user.password;
			newUser.passwordVerify = user.password;
		}
		if (user.userAccountPolicyId) {
			newUser.userAccountPolicyId = user.userAccountPolicyId;
		}
		return newUser;
	}

	updateUser(): Observable<void> {
		this.processing = true;
		return new Observable<undefined>((observer: Observer<void>) => {
			this.activeServicesCount = 0;
			if (this.currentUser != null && this.userData != null) {
				this.activeServicesCount ++;
			}

			const deletedRoles = [];
			const addedRoles = [];
			if (this.currentRoles != null && this.assignedRoles != null) {
				this.currentRoles.forEach(currentRole => {
					let found = false;
					this.assignedRoles.forEach(assignedRole => {
						if (assignedRole.roleId === currentRole.roleId && assignedRole.organizationId === currentRole.organizationId) {
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
						if (currentRole.roleId === assignedRole.roleId && currentRole.organizationId === assignedRole.organizationId) {
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

			if (this.currentUser != null && this.userData != null) {
				this.usersService.UsersUpdateUserResponse({
					id: this.currentUser.id,
					body: this.buildUpdateUserBody()
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
			}

			deletedRoles.forEach(deletedRole => {
				this.roleAssignmentsService.RoleAssignmentDeleteRoleAssignmentResponse({
					memberId: this.currentUserId,
					organizationId: deletedRole.organizationId,
					roleId: deletedRole.roleId
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

			addedRoles.forEach(addedRole => {
				this.roleAssignmentsService.RoleAssignmentCreateRoleAssignmentResponse({
					memberId: this.currentUserId,
					organizationId: addedRole.organizationId,
					roleId: addedRole.roleId
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

			deletedMemberGroupMemberships.forEach(deletedMemberGroupMembership => {
				this.memberGroupMembershipsService.deleteMemberGroupMembershipById({
					memberId: this.currentUserId,
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
					memberId: this.currentUserId,
					memberGroupId: modifiedMemberGroupMembership.memberGroupId
				}).subscribe(
					response => {
						this.memberGroupMembershipsService.createMemberGroupMembership({
							memberId: this.currentUserId,
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
					memberId: this.currentUserId,
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

	buildUpdateUserBody(): any {
		const currentAddress = this.currentUser.address;
		const address = this.userData.address;
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
		if (address.firstName !== currentAddress.firstName) {
			changedAddress.firstName = address.firstName;
		}
		if (address.lastName !== currentAddress.lastName) {
			changedAddress.lastName = address.lastName;
		}
		if (address.personTitle !== currentAddress.personTitle) {
			changedAddress.personTitle = address.personTitle;
		}
		if (address.state !== currentAddress.state) {
			changedAddress.state = address.state;
		}
		if (address.zipCode !== currentAddress.zipCode) {
			changedAddress.zipCode = address.zipCode;
		}
		const user = this.userData;
		const changedUser: any = {
			address: changedAddress
		};
		if (user.password) {
			changedUser.password = user.password;
			changedUser.passwordVerify = user.password;
		}
		if (user.userAccountPolicyId !== this.currentUser.userAccountPolicyId) {
			changedUser.userAccountPolicyId = user.userAccountPolicyId;
		}
		return changedUser;
	}

	loadCurrentUser(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentUser !== null && this.currentUser.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentUserId) {
					this.clearData();
					this.currentUserId = id;
				}
				this.usersService.UsersFindByUserId(id).subscribe(
					body => {
						this.currentUser = body;
						const address = body.address;
						this.userData = {
							id:	body.id,
							address: {
								address1: address.address1,
								address2: address.address2,
								city: address.city,
								country: address.country,
								email1: address.email1,
								firstName: address.firstName,
								lastName: address.lastName,
								personTitle: address.personTitle,
								state: address.state,
								zipCode: address.zipCode
							},
							logonId: body.logonId,
							parentOrganizationId: body.parentOrganizationId,
							parentOrganizationName: body.parentOrganizationName,
							password: body.password,
							passwordVerify: body.password,
							userAccountPolicyId: body.userAccountPolicyId
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

	loadCurrentUserRoles(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (id === this.currentUserId && this.assignedRoles !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentUserId) {
					this.clearData();
					this.currentUserId = id;
				}
				this.roleAssignmentsService.getRoleAssignments({
					memberId: id
				}).subscribe(
					body => {
						this.currentRoles = body.items;
						this.assignedRoles = [];
						const uniqueOrganizationIds: Array<string> = [];
						this.currentRoles.forEach(roleAssignment => {
							this.assignedRoles.push({
								organizationId: roleAssignment.organizationId,
								roleId: roleAssignment.roleId
							});
							if (uniqueOrganizationIds.indexOf(roleAssignment.organizationId) < 0) {
								uniqueOrganizationIds.push(roleAssignment.organizationId);
							}
						});
						this.loadOrganizationNames(uniqueOrganizationIds);
						observer.next(undefined);
						observer.complete();
					},
					error => {
						console.log(error);
						observer.next(error);
						observer.complete();
					}
				);
			}
		});
	}

	loadOrganizationNames(uniqueOrganizationIds: Array<string>): void {
		uniqueOrganizationIds.forEach(organizationId => {
			this.organizationsService.OrganizationsFindByOrganizationId(organizationId).subscribe(
				body => {
					this.assignedRoles.forEach(assignedRole => {
						if (assignedRole.organizationId === body.id) {
							assignedRole.organizationName = body.organizationName;
						}
					});
				}
			);
		});
	}

	loadCurrentMemberGroupMemberships(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (id === this.currentUserId && this.assignedMemberGroups !== null) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentUserId) {
					this.clearData();
					this.currentUserId = id;
				}
				this.memberGroupMembershipsService.getMemberGroupMemberships({
					memberId: id
				}).subscribe(
					body => {
						this.currentMemberGroupMemberships = body.items;
						this.assignedMemberGroups = [];
						let count = body.items.length;
						if (count > 0) {
							body.items.forEach(memberGroupMembership => {
								const memberGroupId = memberGroupMembership.memberGroupId;
								this.memberGroupsService.getMemberGroup({
									id: memberGroupId
								}).subscribe(
									memberGroup => {
										count--;
										this.assignedMemberGroups.push({
											memberGroupId: memberGroupId,
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
										console.log(error);
										if (count === 0) {
											observer.next(error);
											observer.complete();
										}
									}
								);
							});
						} else {
							observer.next(undefined);
							observer.complete();
						}
					},
					error => {
						console.log(error);
						observer.next(error);
						observer.complete();
					}
				);
			}
		});
	}

	private createRoleAssignments(id: string, observer: Observer<void>): void {
		const assignedRoles = this.assignedRoles;
		if (assignedRoles != null && assignedRoles.length > 0) {
			assignedRoles.forEach(assignedRole => {
				this.roleAssignmentsService.RoleAssignmentCreateRoleAssignmentResponse({
					memberId: id,
					organizationId: assignedRole.organizationId,
					roleId: assignedRole.roleId
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
