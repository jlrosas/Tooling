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
export class TaxCodeMainService {
	taxCodeData: any = null;
	processing = false;
	currentTaxCodeId: number = null;

	private currentTaxCode: any = null;

	constructor(private calculationCodeServices: CalculationCodesService) { }

	clearData() {
		this.currentTaxCodeId = null;
		this.taxCodeData = null;
		this.currentTaxCode = null;
	}

	createTaxCode(): Observable<string> {
		this.processing = true;
		return new Observable<string>((observer: Observer<string>) => {
			const args: any = {
				calculationCode: this.taxCodeData.calculationCode,
				groupBy: 0,
				published: 1,
				sequence: 0.0,
				storeId : this.taxCodeData.storeId,
				displayLevel: 0,
				precedence: 0.0,
				calculationUsageId: this.taxCodeData.calculationUsageId,
				calculationCodeQualifyMethodMode: 0
			};
			if (this.taxCodeData.calculationUsageId === -3) {
				args.calculationMethodId = -43;
				args.calculationCodeApplyMethodId = -44;
				args.calculationCodeQualifyMethodId = -42;
			} else if (this.taxCodeData.calculationUsageId === -4) {
				args.calculationMethodId = -63;
				args.calculationCodeApplyMethodId = -64;
				args.calculationCodeQualifyMethodId = -62;
			}
			this.calculationCodeServices.createCalculationCodeResponse(args).subscribe(response => {
				observer.next(this.taxCodeData.calculationCode);
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

	updateTaxCode(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			if (this.currentTaxCodeId != null && this.currentTaxCode != null) {
				const data = this.taxCodeData;
				const args: CalculationCodesService.UpdateCalculationCodeByIdParams = {
					id: this.currentTaxCodeId,
					CalculationCode: {}
				};
				if (data.calculationCode !== this.currentTaxCode.calculationCode) {
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

	loadCurrentTaxCode(id: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentTaxCode != null && this.currentTaxCode.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentTaxCodeId) {
					this.clearData();
					this.currentTaxCodeId = id;
				}
				const args: CalculationCodesService.GetCalculationCodeByIdParams = {
					id
				};
				this.calculationCodeServices.getCalculationCodeById(args).subscribe((body: any) => {
					this.currentTaxCode = body;
					this.taxCodeData = {
						id: body.id,
						calculationCode: body.calculationCode,
						calculationUsageId: body.calculationUsageId
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
