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
import { MatSort } from "@angular/material";

@Injectable({
	providedIn: "root"
})

export class PreferenceService {
	private preferences = {};

	save(token: string, preference: Preference): void {
		const preferenceObj = this.preferences[token];
		this.preferences[token] = preferenceObj ? {...preferenceObj, ...preference} : preference;
	}

	saveFilter(token: string, filter: object): void {
		const preferenceObj = this.preferences[token];
		if (preferenceObj) {
			filter = { ...preferenceObj.filter, ...filter};
			preferenceObj.filter = filter;
		} else {
			this.preferences[token] = { filter };
		}
	}

	get(token: string): Preference {
		return this.preferences[token];
	}

	clear(token: string): void {
		if (typeof token === "undefined") {
			this.preferences = {};
		} else {
			this.preferences[token] = null;
		}
	}
}

interface Preference {
	pageSize?: number;
	sort?: MatSort;
	searchString?: string;
	filter?: any;
	showFilters?: boolean;
	pageIndex?: number;
}
