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
import { HttpErrorResponse } from "@angular/common/http";
import { delay } from "rxjs/operators";
import { AlertService } from "./alert.service";
import { Subscription, of } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
	providedIn: "root"
})
export class ApiErrorService {
	private apiErrors = [];
	private handleErrorsSubscription: Subscription = null;

	constructor(private alertService: AlertService, private translateService: TranslateService) { }

	handleError(apiErrorResponse: HttpErrorResponse, errorHandler?: (error: HttpErrorResponse) => void) {
		let found = false;
		for (let i = 0; i < this.apiErrors.length; i++) {
			const apiError = this.apiErrors[i];
			if (apiError.errorResponse === apiErrorResponse) {
				apiError.errorHandler = errorHandler ? errorHandler : this.defaultErrorHandler;
				found = true;
				break;
			}
		}
		if (!found) {
			this.apiErrors.push({
				errorResponse: apiErrorResponse,
				errorHandler: errorHandler ? errorHandler : ((errorResponse: HttpErrorResponse) => this.defaultErrorHandler(errorResponse))
			});
			if (this.handleErrorsSubscription) {
				this.handleErrorsSubscription.unsubscribe();
				this.handleErrorsSubscription = null;
			}
			this.handleErrorsSubscription = of(null).pipe(delay(0)).subscribe(result => {
				this.handleErrors();
			});
		}
	}

	private handleErrors() {
		this.apiErrors.forEach(apiError => {
			apiError.errorHandler(apiError.errorResponse);
		});
		this.apiErrors = [];
	}

	private defaultErrorHandler(errorResponse: HttpErrorResponse) {
		if (errorResponse.error && errorResponse.error.errors) {
			errorResponse.error.errors.forEach((errorObj: { errorMessage?: string; message?: string; }) => {
				const errorMessage = errorObj.errorMessage ? errorObj.errorMessage : errorObj.message;
				if (errorMessage) {
					this.alertService.error({message: errorMessage});
				}
			});
		} else {
			console.log(errorResponse);
		}
	}
}
