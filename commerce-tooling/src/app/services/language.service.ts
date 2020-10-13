/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { EventEmitter, Injectable } from "@angular/core";

export interface LanguageChangeEvent {
	locale: string;
	language: string;
	languageId: number;
}
@Injectable({
	providedIn: "root"
})
export class LanguageService {
	static locale: string;
	static language: string;
	static languageId: number;
	readonly onLanguageChange: EventEmitter<LanguageChangeEvent> = new EventEmitter<LanguageChangeEvent>();

	setLocale(locale: any) {
		const legacyLocale = locale.replace("-", "_");
		const languageArray = [
			{locale: "en_US", languageId: -1},
			{locale: "fr_FR", languageId: -2},
			{locale: "de_DE", languageId: -3},
			{locale: "it_IT", languageId: -4},
			{locale: "es_ES", languageId: -5},
			{locale: "pt_BR", languageId: -6},
			{locale: "zh_CN", languageId: -7},
			{locale: "zh_TW", languageId: -8},
			{locale: "ko_KR", languageId: -9},
			{locale: "ja_JP", languageId: -10},
			{locale: "ru_RU", languageId: -20},
			{locale: "ro_RO", languageId: -21},
			{locale: "pl_PL", languageId: -22},
			{locale: "ar_EG", languageID: -23}
		];
		let languageId = languageArray[0].languageId;
		let activeLocale = languageArray[0].locale;
		for (let index = 0; index < languageArray.length; index++) {
			if (languageArray[index].locale === legacyLocale) {
				languageId = languageArray[index].languageId;
				activeLocale = languageArray[index].locale;
			}
		}
		LanguageService.locale = activeLocale;
		LanguageService.language = locale;
		LanguageService.languageId = languageId;
		this.onLanguageChange.emit({
			locale: activeLocale,
			language: locale,
			languageId
		});
	}
}
