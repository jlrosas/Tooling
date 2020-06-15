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
import { Observable, Observer, Subject, Subscription } from "rxjs";
import { OnlineStoresService } from "../rest/services/online-stores.service";

@Injectable()
export class StoreNameService {
	private storeNames: { [key: string]: string } = {};
	private storeNameSet: { [key: string]: Subject<string> } = {};
	private getStoreSubscriptions: { [key: string]: Subscription } = {};

	constructor(private onlineStoresService: OnlineStoresService) { }

	getStoreName(storeId: string): Observable<string> {
		return new Observable((observer: Observer<string>) => {
			if (this.storeNames[storeId] != null) {
				observer.next(this.storeNames[storeId]);
				observer.complete();
			} else {
				this.loadStoreName(storeId);
				const storeNameSetSubscription = this.storeNameSet[storeId].subscribe(storeName => {
					observer.next(storeName);
					observer.complete();
					storeNameSetSubscription.unsubscribe();
				});
			}
		});
	}

	private loadStoreName(storeId: string): void {
		if (!this.getStoreSubscriptions[storeId]) {
			if (!this.storeNameSet[storeId]) {
				this.storeNameSet[storeId] = new Subject();
			}
			this.getStoreSubscriptions[storeId] = this.onlineStoresService.
					getOnlineStore(Number(storeId)).subscribe(store => {
				this.storeNames[storeId] = store.identifier;
				this.getStoreSubscriptions[storeId] = null;
				delete this.getStoreSubscriptions[storeId];
				this.storeNameSet[storeId].next(store.identifier);
				this.storeNameSet[storeId] = null;
				delete this.storeNameSet[storeId];
			});
		}
	}
}
