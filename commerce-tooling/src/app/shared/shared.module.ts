/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { NgModule } from "@angular/core";

import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { IframeService } from "../services/iframe.service";
import { LanguageService } from "../services/language.service";

export function createRootTranslateLoader(httpClient: HttpClient) {
	return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
	imports: [
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createRootTranslateLoader),
				deps: [HttpClient],
			}
		})
	],
	exports: [
		TranslateModule
	],
	declarations: []
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [TranslateService, IframeService]
		};
	}

	constructor(
			public translateService: TranslateService,
			public languageService: LanguageService) {
		languageService.onLanguageChange.subscribe(languageChangeEvent => {
			this.translateService.use(languageChangeEvent.language);
		});
	}
}
