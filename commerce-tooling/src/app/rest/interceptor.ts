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
export class JwtInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService, private apiConfiguration: ApiConfiguration, private languageService: LanguageService) { }

	intercept(request: HttpRequest<any>, nextHttpHandler: HttpHandler): Observable<HttpEvent<any>> {
		if (request.url.indexOf(this.apiConfiguration.rootUrl + "/wcs/resources") === 0
			|| request.url.indexOf(this.apiConfiguration.rootUrl + "/rest") === 0) {
			return new Observable<HttpEvent<any>>((observer: Observer<HttpEvent<any>>) => {
				if (AuthService.jwt) {
					this.sendAuthenticatedRequest(request, nextHttpHandler, observer, null);
				} else {
					const isTokenValidSubscription: Subscription = this.authService.isTokenValid.subscribe((isTokenValid: boolean) => {
						if (isTokenValid) {
							this.sendAuthenticatedRequest(request, nextHttpHandler, observer, isTokenValidSubscription);
						}
					});
				}
			});
		}
		return nextHttpHandler.handle(request);
	}

	sendAuthenticatedRequest(request: HttpRequest<any>, nextHttpHandler: HttpHandler, observer: Observer<HttpEvent<any>>,
			isTokenValidSubscription: Subscription): void {
		const jwtRequest: HttpRequest<any> = request.clone({
			setHeaders: {
				"Authorization": `Bearer ${AuthService.jwt}`,
			},
			setParams: {
				locale: LanguageService.locale
			}
		});
		window.parent.postMessage({"action": "START_PROGRESS_INDICATOR"}, "*");
		nextHttpHandler.handle(jwtRequest).subscribe(
			response => {
				if (isTokenValidSubscription) {
					isTokenValidSubscription.unsubscribe();
				}
				observer.next(response);
			},
			err => {
				window.parent.postMessage({"action": "STOP_PROGRESS_INDICATOR"}, "*");
				if (err.status === 401) {
					this.authService.setJwt(null);
					if (!isTokenValidSubscription) {
						isTokenValidSubscription = this.authService.isTokenValid.subscribe((isTokenValid: boolean) => {
							if (isTokenValid) {
								this.sendAuthenticatedRequest(request, nextHttpHandler, observer, isTokenValidSubscription);
							}
						});
					}
				} else {
					if (isTokenValidSubscription) {
						isTokenValidSubscription.unsubscribe();
					}
					observer.error(err);
				}
			},
			() => {
				window.parent.postMessage({"action": "STOP_PROGRESS_INDICATOR"}, "*");
				observer.complete();
			}
		);
	}
}
