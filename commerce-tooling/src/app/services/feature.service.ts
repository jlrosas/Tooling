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
import { Subject } from "rxjs";

@Injectable()
export class FeatureService {
	public darkFeatures;
	public darkFeaturesValid: Subject<boolean> = new Subject<boolean>();

	setDarkFeatures(darkFeatures) {
		this.darkFeatures = darkFeatures;
		this.darkFeaturesValid.next(true);
	}
}
