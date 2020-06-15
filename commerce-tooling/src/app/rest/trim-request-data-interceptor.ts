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
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, Observer, Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";
import { ApiConfiguration } from "./api-configuration";
import { LanguageService } from "../services/language.service";

@Injectable()
export class TrimRequestBodyInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService, private apiConfiguration: ApiConfiguration, private languageService: LanguageService) { }

	intercept(request: HttpRequest<any>, nextHttpHandler: HttpHandler): Observable<HttpEvent<any>> {
		if (request.url.indexOf(this.apiConfiguration.rootUrl + "/rest") === 0) {
			if (request.body) {
				request = request.clone({body: this.trimObject(request.body)});
			}
		}
		return nextHttpHandler.handle(request);
	}

	trimObject(obj: any) {
		if (!Array.isArray(obj) && (typeof obj !== "object" || obj === null)) {
			return obj;
		}
		return Object.keys(obj).reduce((acc, key) => {
			acc[key] = typeof obj[key] === "string" ? obj[key].trim() : this.trimObject(obj[key]);
			return acc;
		}, Array.isArray(obj) ? [] : {});
	}
}
