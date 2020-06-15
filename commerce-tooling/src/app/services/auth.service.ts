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
import { Subject } from "rxjs";

@Injectable()
export class AuthService {
	static jwt: string;
	isTokenValid: Subject<boolean> = new Subject<boolean>();

	setJwt(token: string) {
		if (token !== AuthService.jwt) {
			AuthService.jwt = token;
			if (!token) {
				this.isTokenValid.next(false);
				window.top.postMessage({"action": "JWT_FETCH_REQUEST"}, "*");
			} else {
				this.isTokenValid.next(true);
			}
		}
	}
}
