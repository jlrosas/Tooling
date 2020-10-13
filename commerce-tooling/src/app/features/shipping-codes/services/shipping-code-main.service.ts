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
import { CalculationCodesService } from "../../../rest/services/calculation-codes.service";

@Injectable({
	providedIn: "root"
})
export class ShippingCodeMainService {
	shippingCodeData: any = null;
	processing = false;
	currentShippingCodeId: number = null;

	private currentShippingCode: any = null;

	constructor(private calculationCodeServices: CalculationCodesService) { }

	clearData() {
		this.currentShippingCodeId = null;
		this.shippingCodeData = null;
		this.currentShippingCode = null;
	}

	createShippingCode(): Observable<string> {
		this.processing = true;
		return new Observable<string>((observer: Observer<string>) => {
			const args: any = {
				calculationCode: this.shippingCodeData.calculationCode,
				storeId: this.shippingCodeData.storeId,
				calculationUsageId: -2,
				combination: 0,
				groupBy: 0,
				published: 0,
				sequence: 0.0,
				displayLevel: 0,
				precedence: 0.0,
				calculationMethodId: -23,
				calculationCodeApplyMethodId: -24,
				calculationCodeQualifyMethodId: -22,
				calculationCodeQualifyMethodMode: 0
			};
			this.calculationCodeServices.createCalculationCodeResponse(args).subscribe(response => {
				observer.next(this.shippingCodeData.calculationCode);
				observer.complete();
				this.processing = false;
			},
			error => {
				observer.error(error);
				observer.complete();
				this.processing = false;
			});
		});
	}

	updateShippingCode(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			if (this.currentShippingCodeId != null && this.currentShippingCode != null) {
				const data = this.shippingCodeData;
				const args: CalculationCodesService.UpdateCalculationCodeByIdParams = {
					id: this.currentShippingCodeId,
					CalculationCode: {}
				};
				if (data.calculationCode !== this.currentShippingCode.calculationCode) {
					args.CalculationCode.calculationCode = data.calculationCode;
				}
				this.calculationCodeServices.updateCalculationCodeByIdResponse(args).subscribe(response => {
					observer.next(undefined);
					observer.complete();
					this.processing = false;
				}, error => {
					observer.error(error);
					observer.complete();
					this.processing = false;
				});
			} else {
				observer.next(undefined);
				observer.complete();
				this.processing = false;
			}
		});
	}

	loadCurrentShippingCode(id: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentShippingCode !== null && this.currentShippingCode.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentShippingCodeId) {
					this.clearData();
					this.currentShippingCodeId = id;
				}
				const args: CalculationCodesService.GetCalculationCodeByIdParams = {
					id
				};
				this.calculationCodeServices.getCalculationCodeById(args).subscribe((body: any) => {
					this.currentShippingCode = body;
					this.shippingCodeData = {
						id: body.id,
						calculationCode: body.calculationCode
					};
					observer.next(undefined);
					observer.complete();
				},
				error => {
					observer.error(error);
					observer.complete();
				});
			}
		});
	}
}
