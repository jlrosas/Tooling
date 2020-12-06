/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class GoogleAnalyticsService extends __BaseService {
  static readonly getGoogleOAuthAccessTokenPath = '/rest/admin/v2/google-analytics/token';
  static readonly getGoogleAnalyticsConfigurationPath = '/rest/admin/v2/google-analytics/configuration';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a Google Access Token, for use with Google Analytics.
   * @return The request completed successfully.
   */
  getGoogleOAuthAccessTokenResponse(): __Observable<__StrictHttpResponse<{token?: string, expirationTime?: string, scopes?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/google-analytics/token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{token?: string, expirationTime?: string, scopes?: string}>;
      })
    );
  }

  /**
   * Get a Google Access Token, for use with Google Analytics.
   * @return The request completed successfully.
   */
  getGoogleOAuthAccessToken(): __Observable<{token?: string, expirationTime?: string, scopes?: string}> {
    return this.getGoogleOAuthAccessTokenResponse().pipe(
      __map(_r => _r.body as {token?: string, expirationTime?: string, scopes?: string})
    );
  }

  /**
   * Get a Google Access Token, for use with Google Analytics.
   * @param storeId The store to return the configuration for.  Default is store ID 0 (all stores)
   * @return The request completed successfully.
   */
  getGoogleAnalyticsConfigurationResponse(storeId?: number): __Observable<__StrictHttpResponse<{clientId?: string, viewId?: string, scopes?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (storeId != null) __params = __params.set('storeId', storeId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/google-analytics/configuration`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{clientId?: string, viewId?: string, scopes?: string}>;
      })
    );
  }

  /**
   * Get a Google Access Token, for use with Google Analytics.
   * @param storeId The store to return the configuration for.  Default is store ID 0 (all stores)
   * @return The request completed successfully.
   */
  getGoogleAnalyticsConfiguration(storeId?: number): __Observable<{clientId?: string, viewId?: string, scopes?: string}> {
    return this.getGoogleAnalyticsConfigurationResponse(storeId).pipe(
      __map(_r => _r.body as {clientId?: string, viewId?: string, scopes?: string})
    );
  }
}

module GoogleAnalyticsService {
}

export { GoogleAnalyticsService }
