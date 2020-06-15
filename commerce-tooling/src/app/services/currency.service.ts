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

@Injectable()
export class CurrencyService {
	private CURRENCY_DECIMALS_MAP = {
		"BHD": 3,
		"BIF": 0,
		"CLF": 4,
		"CLP": 0,
		"DJF": 0,
		"GNF": 0,
		"IQD": 3,
		"ISK": 0,
		"JOD": 3,
		"JPY": 0,
		"KMF": 0,
		"KRW": 0,
		"KWD": 3,
		"LYD": 3,
		"OMR": 3,
		"PYG": 0,
		"RWF": 0,
		"TND": 3,
		"UGX": 0,
		"UYI": 0,
		"VND": 0,
		"VUV": 0,
		"XAF": 0,
		"XAG": 0,
		"XAU": 0,
		"XBA": 0,
		"XBB": 0,
		"XBC": 0,
		"XBD": 0,
		"XDR": 0,
		"XOF": 0,
		"XDP": 0,
		"XPF": 0,
		"XPT": 0,
		"XSU": 0,
		"XTS": 0,
		"XUA": 0,
		"XXX": 0
	};

	getCurrencyDecimalPlaces(currency: string): number {
		let decimalPlaces = this.CURRENCY_DECIMALS_MAP[currency];
		if (isNaN(decimalPlaces)) {
			decimalPlaces = 2;
		}
		return decimalPlaces;
	}
}
