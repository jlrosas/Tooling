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
import { Observable, Observer, Subject, Subscription } from "rxjs";
import { UsersService } from "../rest/services/users.service";

@Injectable()
export class CurrentUserService {
	private userId: string = null;
	private userIdSet: Subject<string> = new Subject<string>();
	private storeName: string = null;
	private storeNameSet: Subject<string> = new Subject<string>();
	private roles: Array<number> = null;
	private rolesSet: Subject<Array<number>> = new Subject<Array<number>>();
	private getRolesSubscription: Subscription = null;

	constructor(private usersService: UsersService) { }

	setUserId(userId: string) {
		this.userId = userId;
		if (userId != null) {
			this.userIdSet.next(userId);
		}
	}

	getUserId(): Observable<string> {
		return new Observable((observer: Observer<string>) => {
			if (this.userId != null) {
				observer.next(this.userId);
				observer.complete();
			} else {
				const userIdSetSubscription = this.userIdSet.subscribe((userId: string) => {
					observer.next(userId);
					observer.complete();
					userIdSetSubscription.unsubscribe();
				});
			}
		});
	}

	setStoreName(storeName: string) {
		this.storeName = storeName;
		if (storeName !== null) {
			this.storeNameSet.next(storeName);
		}
	}

	setPreferredStore(storeName: string) {
		if (storeName !== null && storeName !== this.storeName) {
			this.storeName = storeName;
			window.parent.postMessage({
				"action": "SET_PREFERRED_STORE",
				"data": {
					"store": storeName
				}
			}, "*");
		}
	}

	getStoreName(): Observable<string> {
		return new Observable((observer: Observer<string>) => {
			if (this.storeName != null) {
				observer.next(this.storeName);
				observer.complete();
			} else {
				const storeNameSetSubscription = this.storeNameSet.subscribe((storeName: string) => {
					observer.next(storeName);
					observer.complete();
					storeNameSetSubscription.unsubscribe();
				});
			}
		});
	}

	hasMatchingRole(testRoles: Array<number>): Observable<boolean> {
		return new Observable((observer) => {
			if (this.roles != null) {
				observer.next(this.checkForRoles(testRoles));
				observer.complete();
			} else {
				this.loadRoles();
				const rolesSetSubscription = this.rolesSet.subscribe(roles => {
					observer.next(this.checkForRoles(testRoles));
					observer.complete();
					rolesSetSubscription.unsubscribe();
				});
			}
		});
	}

	getRoles(): Observable<Array<number>> {
		return new Observable((observer) => {
			if (this.roles != null) {
				observer.next(this.roles);
				observer.complete();
			} else {
				this.loadRoles();
				const rolesSetSubscription = this.rolesSet.subscribe(roles => {
					observer.next(roles);
					observer.complete();
					rolesSetSubscription.unsubscribe();
				});
			}
		});
	}

	private checkForRoles(testRoles: Array<number>): boolean {
		let hasRole = false;
		if (this.roles != null) {
			for (let i = 0; i < testRoles.length; i++) {
				const testRole = testRoles[i];
				for (let j = 0; j < this.roles.length; j++) {
					const role = this.roles[j];
					if (testRole === role) {
						hasRole = true;
						break;
					}
				}
				if (hasRole) {
					break;
				}
			}
		}
		return hasRole;
	}

	private loadRoles() {
		this.getUserId().subscribe(userId => {
			if (this.getRolesSubscription == null) {
				this.getRolesSubscription = this.usersService.UsersGetUserRoles(userId).subscribe(response => {
					this.roles = response.items.map(item => item.roleId);
					this.rolesSet.next(this.roles);
					this.getRolesSubscription = null;
				},
				error => {
					console.log(error);
					this.getRolesSubscription = null;
				});
			}
		});
	}
}
