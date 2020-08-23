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
import { Observable, Observer, forkJoin } from "rxjs";
import { UserAccountPoliciesService } from "../../../rest/services/user-account-policies.service";
import { UserAccountPolicyDescriptionsService } from "../../../rest/services/user-account-policy-descriptions.service";
import { PasswordPoliciesService } from "../../../rest/services/password-policies.service";
import { PasswordPolicyDescriptionsService } from "../../../rest/services/password-policy-descriptions.service";
import { UserAccountLockoutPoliciesService } from "../../../rest/services/user-account-lockout-policies.service";
import { UserAccountLockoutPolicyDescriptionsService } from "../../../rest/services/user-account-lockout-policy-descriptions.service";

@Injectable({
	providedIn: "root"
})

export class SecurityPoliciesMainService {
	userAccountPolicyData: any = null;
	passwordPolicyData: any = null;
	userAccountLockoutPolicyData: any = null;
	currentUserAccountPolicyId: number = null;
	processing = false;

	private currentUserAccountPolicy: any = null;
	private currentUserAccountPolicyDescription: any = null;
	private currentPasswordPolicy: any = null;
	private currentPasswordPolicyDescription: any = null;
	private currentUserAccountLockoutPolicy: any = null;
	private currentUserAccountLockoutPolicyDescription: any = null;

	constructor(private userAccountPoliciesService: UserAccountPoliciesService,
			private userAccountPolicyDescriptionsService: UserAccountPolicyDescriptionsService,
			private passwordPoliciesService: PasswordPoliciesService,
			private passwordPolicyDescriptionsService: PasswordPolicyDescriptionsService,
			private userAccountLockoutPoliciesService: UserAccountLockoutPoliciesService,
			private userAccountLockoutPolicyDescriptionsService: UserAccountLockoutPolicyDescriptionsService) { }

	clearData() {
		this.userAccountPolicyData = null;
		this.passwordPolicyData = null;
		this.userAccountLockoutPolicyData = null;
		this.currentUserAccountPolicyId = null;
		this.currentUserAccountPolicy = null;
		this.currentUserAccountPolicyDescription = null;
		this.currentPasswordPolicy = null;
		this.currentPasswordPolicyDescription = null;
		this.currentUserAccountLockoutPolicy = null;
		this.currentUserAccountLockoutPolicyDescription = null;
	}

	createUserAccountPolicy(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			let requests = [this.getCreatePasswordPolicyRequest(), this.getCreateUserAccountLockoutPolicyRequest()];
			forkJoin(requests).subscribe(responseList => {
				const passwordPolicyPaths: Array<string> = responseList[0].headers.get("location").split("/");
				const passwordPolicyId: string = passwordPolicyPaths[passwordPolicyPaths.length - 1];
				const userAccountLockoutPolicyPaths: Array<string> = responseList[1].headers.get("location").split("/");
				const userAccountLockoutPolicyId: string = userAccountLockoutPolicyPaths[userAccountLockoutPolicyPaths.length - 1];
				this.userAccountPoliciesService.createUserAccountPolicyResponse({
					passwordPolicyId: passwordPolicyId,
					userAccountLockoutPolicyId: userAccountLockoutPolicyId
				}).subscribe(response => {
					const paths: Array<string> = response.headers.get("location").split("/");
					const id: number = Number(paths[paths.length - 1]);
					requests = [
						this.getCreateUserAccountPolicyDescriptionRequest(id),
						this.getCreatePasswordPolicyDescriptionRequest(passwordPolicyId),
						this.getCreateUserAccountLockoutPolicyDescriptionRequest(userAccountLockoutPolicyId)
					];
					forkJoin(requests).subscribe(descriptionResponseList => {
						observer.next(responseList.concat(response).concat(descriptionResponseList));
						observer.complete();
						this.processing = false;
					},
					error => {
						observer.error(error);
						observer.complete();
						this.processing = false;
					});
				},
				error => {
					observer.error(error);
					observer.complete();
					this.processing = false;
				});
			},
			error => {
				observer.error(error);
				observer.complete();
				this.processing = false;
			});
		});
	}

	loadCurrentUserAccountPolicy(id: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentUserAccountPolicy != null && this.currentUserAccountPolicy.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentUserAccountPolicyId) {
					this.clearData();
					this.currentUserAccountPolicyId = id;
				}
				this.userAccountPoliciesService.getUserAccountPolicyById({id}).subscribe((body: any) => {
					this.currentUserAccountPolicy = body;
					this.userAccountPolicyData = {
					};
					this.userAccountPolicyDescriptionsService.getUserAccountPolicyDescriptionById({
						userAccountPolicyId: id,
						languageId: -1
					}).subscribe(descriptionBody => {
						this.currentUserAccountPolicyDescription = descriptionBody;
						this.userAccountPolicyData.description = descriptionBody.description;
						observer.next(undefined);
						observer.complete();
					},
					error => {
						observer.next(undefined);
						observer.complete();
					});
					this.passwordPolicyDescriptionsService.getPasswordPolicyDescriptionById({
						passwordPolicyId: body.passwordPolicyId,
						languageId: -1
					}).subscribe(descriptionBody => {
						this.currentPasswordPolicyDescription = descriptionBody;
					});
					this.userAccountLockoutPolicyDescriptionsService.getUserAccountLockoutPolicyDescriptionById({
						userAccountLockoutPolicyId: body.userAccountLockoutPolicyId,
						languageId: -1
					}).subscribe(descriptionBody => {
						this.currentUserAccountLockoutPolicyDescription = descriptionBody;
					});
				},
				error => {
					observer.error(error);
					observer.complete();
				});
			}
		});
	}

	loadCurrentPasswordPolicy(id: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			this.loadCurrentUserAccountPolicy(id).subscribe(response => {
				if (this.currentPasswordPolicy != null) {
					observer.next(undefined);
					observer.complete();
				} else {
					const passwordPolicyId = this.currentUserAccountPolicy.passwordPolicyId;
					this.passwordPoliciesService.getPasswordPolicyById({
						id: passwordPolicyId
					}).subscribe((body: any) => {
						this.currentPasswordPolicy = body;
						this.passwordPolicyData = {
							matchUserId: body.matchUserId,
							maximumConsecutiveType: body.maximumConsecutiveType,
							maximumInstances: body.maximumInstances,
							maximumLifetime: body.maximumLifetime,
							minimumAlphabetic: body.minimumAlphabetic,
							minimumNumeric: body.minimumNumeric,
							minimumPasswordLength: body.minimumPasswordLength,
							reusePassword: body.reusePassword
						};
						observer.next(undefined);
						observer.complete();
					},
					error => {
						observer.error(error);
						observer.complete();
					});
				}
			},
			error => {
				observer.error(error);
				observer.complete();
			});
		});
	}

	loadCurrentUserAccountLockoutPolicy(id: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			this.loadCurrentUserAccountPolicy(id).subscribe(response => {
				if (this.currentUserAccountLockoutPolicy != null) {
					observer.next(undefined);
					observer.complete();
				} else {
					const userAccountLockoutPolicyId = this.currentUserAccountPolicy.userAccountLockoutPolicyId;
					this.userAccountLockoutPoliciesService.getUserAccountLockoutPolicyById({
						id: userAccountLockoutPolicyId
					}).subscribe((body: any) => {
						this.currentUserAccountLockoutPolicy = body;
						this.userAccountLockoutPolicyData = {
							lockoutThreshold: body.lockoutThreshold,
							waitTime: body.waitTime
						};
						observer.next(undefined);
						observer.complete();
					},
					error => {
						observer.error(error);
						observer.complete();
					});
				}
			},
			error => {
				observer.error(error);
				observer.complete();
			});
		});
	}

	updateUserAccountPolicy(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			const requests = [];
			const updateUserAccountPolicyDescriptionRequest = this.getUpdateUserAccountPolicyDescriptionRequest();
			if (updateUserAccountPolicyDescriptionRequest) {
				requests.push(updateUserAccountPolicyDescriptionRequest);
			}
			const updatePasswordPolicyDescriptionRequest = this.getUpdatePasswordPolicyDescriptionRequest();
			if (updatePasswordPolicyDescriptionRequest) {
				requests.push(updatePasswordPolicyDescriptionRequest);
			}
			const updateUserAccountLockoutPolicyDescriptionRequest = this.getUpdateUserAccountLockoutPolicyDescriptionRequest();
			if (updateUserAccountLockoutPolicyDescriptionRequest) {
				requests.push(updateUserAccountLockoutPolicyDescriptionRequest);
			}
			const updatePasswordPolicyRequest = this.getUpdatePasswordPolicyRequest();
			if (updatePasswordPolicyRequest) {
				requests.push(updatePasswordPolicyRequest);
			}
			const updateUserAccountLockoutPolicyRequest = this.getUpdateUserAccountLockoutPolicyRequest();
			if (updateUserAccountLockoutPolicyRequest) {
				requests.push(updateUserAccountLockoutPolicyRequest);
			}
			if (requests.length === 0) {
				observer.next(undefined);
				observer.complete();
				this.processing = false;
			} else {
				forkJoin(requests).subscribe(
					responseList => {
						observer.next(responseList);
						observer.complete();
						this.processing = false;
					},
					error => {
						observer.error(error);
						this.processing = false;
					}
				);
			}
		});
	}

	private getCreatePasswordPolicyRequest(): Observable<any> {
		const body: any = {
			maximumConsecutiveType: 4,
			minimumAlphabetic: 1,
			maximumInstances: 3,
			minimumNumeric: 1,
			maximumLifetime: 90,
			minimumPasswordLength: 8,
			reusePassword: 1,
			matchUserId: 0
		};
		const data = this.passwordPolicyData;
		if (data) {
			if (data.matchUserId !== undefined) {
				body.matchUserId = data.matchUserId;
			}
			if (data.maximumConsecutiveType !== undefined) {
				body.maximumConsecutiveType = data.maximumConsecutiveType;
			}
			if (data.maximumInstances !== undefined) {
				body.maximumInstances = data.maximumInstances;
			}
			if (data.maximumLifetime !== undefined) {
				body.maximumLifetime = data.maximumLifetime;
			}
			if (data.minimumAlphabetic !== undefined) {
				body.minimumAlphabetic = data.minimumAlphabetic;
			}
			if (data.minimumNumeric !== undefined) {
				body.minimumNumeric = data.minimumNumeric;
			}
			if (data.matchUserId !== undefined) {
				body.minimumPasswordLength = data.minimumPasswordLength;
			}
			if (data.reusePassword !== undefined) {
				body.reusePassword = data.reusePassword;
			}
		}
		return this.passwordPoliciesService.createPasswordPolicyResponse(body);
	}

	private getCreateUserAccountLockoutPolicyRequest(): Observable<any> {
		const body: any = {
			lockoutThreshold: 6,
			waitTime: 10
		};
		const data = this.userAccountLockoutPolicyData;
		if (data) {
			if (data.lockoutThreshold !== undefined) {
				body.lockoutThreshold = data.lockoutThreshold;
			}
			if (data.waitTime !== undefined) {
				body.waitTime = data.waitTime;
			}
		}
		return this.userAccountLockoutPoliciesService.createUserAccountLockoutPolicyResponse(body);
	}

	private getCreateUserAccountPolicyDescriptionRequest(userAccountPolicyId: number): Observable<any> {
		const body: any = {
			userAccountPolicyId: userAccountPolicyId,
			languageId: -1
		};
		const data = this.userAccountPolicyData;
		if (data) {
			if (data.description !== undefined) {
				body.description = data.description;
			}
		}
		return this.userAccountPolicyDescriptionsService.createUserAccountPolicyDescriptionResponse(body);
	}

	private getCreatePasswordPolicyDescriptionRequest(passwordPolicyId: string): Observable<any> {
		const body: any = {
			passwordPolicyId: passwordPolicyId,
			languageId: -1
		};
		const data = this.userAccountPolicyData;
		if (data) {
			if (data.description !== undefined) {
				body.description = data.description;
			}
		}
		return this.passwordPolicyDescriptionsService.createPasswordPolicyDescriptionResponse(body);
	}

	private getCreateUserAccountLockoutPolicyDescriptionRequest(userAccountLockoutPolicyId: string): Observable<any> {
		const body: any = {
			userAccountLockoutPolicyId: userAccountLockoutPolicyId,
			languageId: -1
		};
		const data = this.userAccountPolicyData;
		if (data) {
			if (data.description !== undefined) {
				body.description = data.description;
			}
		}
		return this.userAccountLockoutPolicyDescriptionsService.createUserAccountLockoutPolicyDescriptionResponse(body);
	}

	private getUpdateUserAccountPolicyDescriptionRequest(): Observable<any> {
		let request = null;
		const data = this.userAccountPolicyData;
		if (data) {
			if (data.description !== undefined) {
				if (this.currentUserAccountPolicyDescription) {
					if (data.description !== this.currentUserAccountPolicyDescription.description) {
						request = this.userAccountPolicyDescriptionsService.updateUserAccountPolicyDescriptionByIdResponse({
							userAccountPolicyId: this.currentUserAccountPolicyDescription.userAccountPolicyId,
							languageId: this.currentUserAccountPolicyDescription.languageId,
							UserAccountPolicyDescription: {
								description: data.description
							}
						});
					}
				} else if (this.currentUserAccountPolicy) {
					request = this.getCreateUserAccountPolicyDescriptionRequest(this.currentUserAccountPolicy.id);
				}
			}
		}
		return request;
	}

	private getUpdatePasswordPolicyDescriptionRequest(): Observable<any> {
		let request = null;
		const data = this.userAccountPolicyData;
		if (data) {
			if (data.description !== undefined) {
				if (this.currentPasswordPolicyDescription) {
					if (data.description !== this.currentPasswordPolicyDescription.description) {
						request = this.passwordPolicyDescriptionsService.updatePasswordPolicyDescriptionByIdResponse({
							passwordPolicyId: this.currentPasswordPolicyDescription.passwordPolicyId,
							languageId: this.currentPasswordPolicyDescription.languageId,
							PasswordPolicyDescription: {
								description: data.description
							}
						});
					}
				} else if (this.currentUserAccountPolicy) {
					request = this.getCreatePasswordPolicyDescriptionRequest(this.currentUserAccountPolicy.passwordPolicyId);
				}
			}
		}
		return request;
	}

	private getUpdateUserAccountLockoutPolicyDescriptionRequest(): Observable<any> {
		let request = null;
		const data = this.userAccountPolicyData;
		if (data) {
			if (data.description !== undefined) {
				if (this.currentUserAccountLockoutPolicyDescription) {
					if (data.description !== this.currentUserAccountLockoutPolicyDescription.description) {
						request = this.userAccountLockoutPolicyDescriptionsService.updateUserAccountLockoutPolicyDescriptionByIdResponse({
							userAccountLockoutPolicyId: this.currentUserAccountLockoutPolicyDescription.userAccountLockoutPolicyId,
							languageId: this.currentUserAccountLockoutPolicyDescription.languageId,
							UserAccountLockoutPolicyDescription: {
								description: data.description
							}
						});
					}
				} else if (this.currentUserAccountPolicy) {
					request = this.getCreateUserAccountLockoutPolicyDescriptionRequest(this.currentUserAccountPolicy.userAccountLockoutPolicyId);
				}
			}
		}
		return request;
	}

	private getUpdatePasswordPolicyRequest(): Observable<any> {
		let request = null;
		const data = this.passwordPolicyData;
		const currentPasswordPolicy = this.currentPasswordPolicy;
		if (data && currentPasswordPolicy &&
				(data.matchUserId !== currentPasswordPolicy.matchUserId ||
				data.maximumConsecutiveType !== currentPasswordPolicy.maximumConsecutiveType ||
				data.maximumInstances !== currentPasswordPolicy.maximumInstances ||
				data.maximumLifetime !== currentPasswordPolicy.maximumLifetime ||
				data.minimumAlphabetic !== currentPasswordPolicy.minimumAlphabetic ||
				data.minimumNumeric !== currentPasswordPolicy.minimumNumeric ||
				data.matchUserId !== currentPasswordPolicy.minimumPasswordLength ||
				data.reusePassword !== currentPasswordPolicy.reusePassword)) {
			const body: any = {};
			if (data.matchUserId !== currentPasswordPolicy.matchUserId) {
				body.matchUserId = data.matchUserId;
			}
			if (data.maximumConsecutiveType !== currentPasswordPolicy.maximumConsecutiveType) {
				body.maximumConsecutiveType = data.maximumConsecutiveType;
			}
			if (data.maximumInstances !== currentPasswordPolicy.maximumInstances) {
				body.maximumInstances = data.maximumInstances;
			}
			if (data.maximumLifetime !== currentPasswordPolicy.maximumLifetime) {
				body.maximumLifetime = data.maximumLifetime;
			}
			if (data.minimumAlphabetic !== currentPasswordPolicy.minimumAlphabetic) {
				body.minimumAlphabetic = data.minimumAlphabetic;
			}
			if (data.minimumNumeric !== currentPasswordPolicy.minimumNumeric) {
				body.minimumNumeric = data.minimumNumeric;
			}
			if (data.matchUserId !== currentPasswordPolicy.minimumPasswordLength) {
				body.minimumPasswordLength = data.minimumPasswordLength;
			}
			if (data.reusePassword !== currentPasswordPolicy.reusePassword) {
				body.reusePassword = data.reusePassword;
			}
			request = this.passwordPoliciesService.updatePasswordPolicyByIdResponse({
				id: currentPasswordPolicy.id,
				PasswordPolicy: body
			});
		}
		return request;
	}

	private getUpdateUserAccountLockoutPolicyRequest(): Observable<any> {
		let request = null;
		const data = this.userAccountLockoutPolicyData;
		const currentUserAccountLockoutPolicy = this.currentUserAccountLockoutPolicy;
		if (data && currentUserAccountLockoutPolicy &&
				(data.lockoutThreshold !== currentUserAccountLockoutPolicy.lockoutThreshold ||
				data.waitTime !== currentUserAccountLockoutPolicy.waitTime)) {
			const body: any = {};
			if (data.lockoutThreshold !== currentUserAccountLockoutPolicy.lockoutThreshold) {
				body.lockoutThreshold = data.lockoutThreshold;
			}
			if (data.waitTime !== currentUserAccountLockoutPolicy.waitTime) {
				body.waitTime = data.waitTime;
			}
			request = this.userAccountLockoutPoliciesService.updateUserAccountLockoutPolicyByIdResponse({
				id: currentUserAccountLockoutPolicy.id,
				UserAccountLockoutPolicy: body
			});
		}
		return request;
	}
}
