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
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { ApiErrorService } from "../services/api-error.service";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
	constructor(private apiErrorService: ApiErrorService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
			const method = request.method;
			if (method === "POST" || method === "PATCH" || method === "DELETE") {
				this.apiErrorService.handleError(error);
			} else {
				console.log(error);
			}
			return throwError(error);
		}));
	}
}
