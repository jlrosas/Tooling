/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component } from "@angular/core";

import { AuthService } from "./services/auth.service";
import { LanguageService } from "./services/language.service";
import { FeatureService } from "./services/feature.service";
import { CurrentUserService } from "./services/current-user.service";
import { StorePreviewOptionsService } from "./services/store-preview-options.service";
import { NavigationDisabledService } from "./services/navigation-disabled.service";
import { TranslateService } from "@ngx-translate/core";
import { DateAdapter } from "@angular/material/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {

	constructor(private authService: AuthService,
			private languageService: LanguageService,
			private featureService: FeatureService,
			private translateService: TranslateService,
			private dateAdapter: DateAdapter<any>,
			private storePreviewOptionsService: StorePreviewOptionsService,
			private currentUserService: CurrentUserService,
			private navigationDisabled: NavigationDisabledService) {
		translateService.setDefaultLang("en-US");
		dateAdapter.setLocale("en-US");
		languageService.setLocale("en-US");
		this.addMessageListener();
		window.parent.postMessage({ action: "FETCH_RENDER_VIEW_DATA" }, "*");
		window.parent.postMessage({ action: "DARK_FEATURES_FETCH_REQUEST" }, "*");
		window.parent.postMessage({ action: "STORE_PREVIEW_DATA_FETCH_REQUEST" }, "*");
	}

	addMessageListener() {
		window.addEventListener("message", (event) => {
			const eventData = event.data;
			if (eventData && eventData.data) {
				if (eventData.action === "JWT") {
					const jwt = eventData.data.token;
					if (jwt) {
						this.authService.setJwt(jwt);
					}
				} else if (eventData.action === "RENDER_VIEW_DATA") {
					const jwt = eventData.data.token;
					if (jwt) {
						this.authService.setJwt(jwt);
					}
					const locale = eventData.data.locale;
					if (locale) {
						this.languageService.setLocale(locale);
						this.dateAdapter.setLocale(LanguageService.language);
					}
					const userId = eventData.data.userId;
					if (userId) {
						this.currentUserService.setUserId(userId);
					}
					const store = eventData.data.store;
					this.currentUserService.setStoreName(store);
					const navigationDisabled = eventData.data.navigationDisabled;
					this.navigationDisabled.setNavigationDisabled(!!navigationDisabled);
				} else if (eventData.action === "DARK_FEATURES") {
					const darkFeatures = eventData.data.darkFeatures;
					if (darkFeatures) {
						this.featureService.setDarkFeatures(darkFeatures);
					}
				} else if (eventData.action === "STORE_PREVIEW_DATA") {
					const storePreviewOptions = eventData.data;
					if (storePreviewOptions) {
						this.storePreviewOptionsService.setStorePreviewOptions(storePreviewOptions);
					}
				}
			}
		});
	}
}
