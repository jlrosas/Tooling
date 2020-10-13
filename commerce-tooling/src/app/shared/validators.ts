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
import { FormControl } from "@angular/forms";

@Injectable()
export class HcValidators {
	static required(control: FormControl) {
		let isInvalid = false;
		if (control.value !== null) {
			isInvalid = (control.value || "").trim().length === 0;
		}
		return isInvalid ? { "required": true } : null;
	}
}
