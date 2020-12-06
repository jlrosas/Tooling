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
import { Observable, Observer } from "rxjs";
import { ConnectionSpecsService } from "../../../rest/services/connection-specs.service";
import { StoreTransportsService } from "../../../rest/services/store-transports.service";

@Injectable({
	providedIn: "root"
})
export class TransportMainService {
	transportData: any = null;
	properties: any = null;
	currentTransportId: number = null;
	currentStoreId: number = null;
	processing = false;

	private currentConnectionSpecs: any = null;

	constructor(private connectionSpecsService: ConnectionSpecsService,
			private storeTransportsService: StoreTransportsService) { }

	clearData() {
		this.transportData = null;
		this.properties = null;
		this.currentTransportId = null;
		this.currentStoreId = null;
		this.currentConnectionSpecs = null;
	}

	createTransport(): Observable<any> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			const data = this.transportData;
			this.storeTransportsService.createStoreTransportResponse({
				storeId: data.storeId,
				transportId: data.transportId,
				active: 1
			}).subscribe(response => {
				this.connectionSpecsService.updateTransportConnectionSpecsResponse({
					transportId: data.transportId,
					storeId: data.storeId,
					body: this.buildCreateConnectionSpecsBody()
				}).subscribe(response2 => {
					observer.next([response, response2]);
					observer.complete();
					this.processing = false;
				},
				error => {
					this.processing = false;
					observer.error(error);
				});
			},
			error => {
				this.processing = false;
				observer.error(error);
			});
		});
	}

	loadCurrentTransportProperties(transportId: number, storeId: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentConnectionSpecs != null && this.currentTransportId === transportId && this.currentStoreId === storeId) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (transportId !== this.currentTransportId && storeId !== this.currentStoreId) {
					this.clearData();
					this.currentTransportId = transportId;
					this.currentStoreId = storeId;
				}
				this.connectionSpecsService.getTransportConnectionSpecs({
					transportId,
					storeId
				}).subscribe(body => {
					this.currentConnectionSpecs = body;
					this.properties = {};
					if (body.properties) {
						body.properties.forEach(property => {
							this.properties[property.name] = property.value ? property.value : "";
						});
					}
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

	updateTransport(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			if (this.currentConnectionSpecs !== null && this.currentTransportId !== null && this.currentStoreId !== null) {
				this.connectionSpecsService.updateTransportConnectionSpecs({
					transportId: this.currentTransportId,
					storeId: this.currentStoreId,
					body: this.buildUpdateConnectionSpecsBody()
				}).subscribe(response => {
					observer.next(undefined);
					observer.complete();
					this.processing = false;
				},
				error => {
					this.processing = false;
					observer.error(error);
				});
			} else {
				observer.next(undefined);
				observer.complete();
			}
		});
	}

	private buildCreateConnectionSpecsBody() {
		const body = {
			properties: []
		};
		const properties = body.properties;
		if (this.properties) {
			for (const name of Object.keys(this.properties)) {
				properties.push({
					name,
					value: this.properties[name]
				});
			}
		}
		return body;
	}

	private buildUpdateConnectionSpecsBody() {
		const body = {
			properties: []
		};
		const properties = body.properties;
		const currentProperties = this.currentConnectionSpecs.properties ? this.currentConnectionSpecs.properties : null;
		if (this.properties) {
			for (const name of Object.keys(this.properties)) {
				let currentPropertyValue = null;
				if (currentProperties) {
					for (let i = 0; i < currentProperties.length; i++) {
						const currentProperty = currentProperties[i];
						if (currentProperty.name === name) {
							currentPropertyValue = currentProperty.value;
							break;
						}
					}
				}
				if (currentPropertyValue !== this.properties[name]) {
					properties.push({
						name,
						value: this.properties[name]
					});
				}
			}
		}
		return body;
	}
}
