/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020

 *-------------------------------------------------------------------
 */

import { Injectable } from "@angular/core";
import { Subject, Observable, Observer } from "rxjs";

@Injectable({ providedIn: "root" })
export class NavigationDisabledService {
	private navigationDisabled: boolean = null;
	private navigationDisabledSet: Subject<boolean> = new Subject<boolean>();

	setNavigationDisabled(navigationDisabled: boolean) {
		this.navigationDisabled = navigationDisabled;
		if (navigationDisabled !== null) {
			this.navigationDisabledSet.next(navigationDisabled);
		}
	}

	getNavigationDisabled(): Observable<boolean> {
		return new Observable((observer: Observer<boolean>) => {
			if (this.navigationDisabled !== null) {
				observer.next(this.navigationDisabled);
				observer.complete();
			} else {
				const navigationDisabledSetSubscription = this.navigationDisabledSet.subscribe((navigationDisabled: boolean) => {
					observer.next(navigationDisabled);
					observer.complete();
					navigationDisabledSetSubscription.unsubscribe();
				});
			}
		});
	}
}
