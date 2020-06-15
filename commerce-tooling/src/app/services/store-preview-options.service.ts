/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class StorePreviewOptionsService {
	static storePreviewOptions = null;
	readonly onStorePreviewOptionsChange: EventEmitter<any> = new EventEmitter<any>();

	constructor() { }

	setStorePreviewOptions(storePreviewOptions: any) {
		StorePreviewOptionsService.storePreviewOptions = storePreviewOptions;
		this.onStorePreviewOptionsChange.emit(storePreviewOptions);
	}
}
