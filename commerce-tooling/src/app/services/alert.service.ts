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
import { Observable, Subject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class AlertService {
	private alert$ = new Subject<any>();

	getAlert(): Observable<any> {
		return this.alert$.asObservable();
	}

	success(messageObj) {
		if (messageObj.clear) {
			this.clear();
		}
		this.alert$.next({ type: "success", message: messageObj.message });
	}

	error(messageObj) {
		if (messageObj.clear) {
			this.clear();
		}
		this.alert$.next({ type: "error", message: messageObj.message });
	}

	clear() {
		this.alert$.next();
	}
}
