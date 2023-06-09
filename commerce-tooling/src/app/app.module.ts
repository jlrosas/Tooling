/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, Provider, APP_INITIALIZER } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { MatNativeDateModule } from "@angular/material/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ApiConfiguration } from "./rest/api-configuration";
import { ApiModule } from "./rest/api.module";
import { FormsModule } from "@angular/forms";

import { AuthService } from "./services/auth.service";
import { CurrentUserService } from "./services/current-user.service";
import { FeatureService } from "./services/feature.service";
import { FeatureEnabledDirective } from "./directives/feature-enabled.directive";
import { FeatureDisabledDirective } from "./directives/feature-disabled.directive";
import { JwtInterceptor } from "./rest/interceptor";
import { SharedModule } from "./shared/shared.module";
import { AlertListComponent } from "./components/alert-list/alert-list.component";
import { TrimRequestBodyInterceptor } from "./rest/trim-request-data-interceptor";
import { ErrorHandlerInterceptor } from "./rest/api-error-handler-interceptor";
import { AlertComponent } from "./components/alert/alert.component";
import { MatSnackBarModule } from "@angular/material";
import { MatIconModule } from "@angular/material/icon";

export function initApiConfiguration(config: ApiConfiguration): () => Promise<any> {
	return (): Promise<any> => {
		return new Promise((resolve, reject) => {
			if (window.parent !== window) {
				const eventListener = (event) => {
					const eventData = event.data;
					if (eventData && eventData.data) {
						if (eventData.action === "API_HOST") {
							const apiHost = eventData.data.apiHost;
							if (apiHost) {
								config.rootUrl = apiHost;
								window.removeEventListener("message", eventListener);
								resolve();
							}
						}
					}
				};
				window.addEventListener("message", eventListener);
				window.parent.postMessage({"action": "API_HOST_FETCH_REQUEST"}, "*");
			} else {
				resolve();
			}
		});
	};
}

export const INIT_API_CONFIGURATION: Provider = {
	provide: APP_INITIALIZER,
	useFactory: initApiConfiguration,
	deps: [ApiConfiguration],
	multi: true
};

@NgModule({
	declarations: [
		AppComponent,
		FeatureEnabledDirective,
		FeatureDisabledDirective,
		AlertListComponent,
		AlertComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		MatNativeDateModule,
		SharedModule.forRoot(),
		ApiModule,
		MatSnackBarModule,
		MatIconModule
	],
	providers: [
		INIT_API_CONFIGURATION,
		AuthService,
		CurrentUserService,
		FeatureService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TrimRequestBodyInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorHandlerInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true
		},
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: { showError: true }
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
