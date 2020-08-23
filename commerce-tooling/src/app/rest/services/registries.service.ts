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
class RegistriesService extends __BaseService {
  static readonly getRegistriesPath = '/rest/admin/v2/registries';
  static readonly updateRegistryPath = '/rest/admin/v2/registries/{registryName}/update';
  static readonly updateAllRegistriesPath = '/rest/admin/v2/registries/update';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a list of registries.
   * @param params The `RegistriesService.GetRegistriesParams` containing the following parameters:
   *
   * - `searchString`: Limits search results to only include registries with a name that matches the value of this parameter. Searches are case-insensitive.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
   *
   * @return The requested completed successfully.
   */
  getRegistriesResponse(params: RegistriesService.GetRegistriesParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/registries`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Get a list of registries.
   * @param params The `RegistriesService.GetRegistriesParams` containing the following parameters:
   *
   * - `searchString`: Limits search results to only include registries with a name that matches the value of this parameter. Searches are case-insensitive.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
   *
   * @return The requested completed successfully.
   */
  getRegistries(params: RegistriesService.GetRegistriesParams): __Observable<any> {
    return this.getRegistriesResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Update a single registry.
   * @param registryName The registry name of the registry to be updated.
   */
  updateRegistryResponse(registryName: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/registries/${registryName}/update`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }

  /**
   * Update a single registry.
   * @param registryName The registry name of the registry to be updated.
   */
  updateRegistry(registryName: string): __Observable<null> {
    return this.updateRegistryResponse(registryName).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update all registries.
   */
  updateAllRegistriesResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/registries/update`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }

  /**
   * Update all registries.
   */
  updateAllRegistries(): __Observable<null> {
    return this.updateAllRegistriesResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
}

module RegistriesService {

  /**
   * Parameters for getRegistries
   */
  export interface GetRegistriesParams {

    /**
     * Limits search results to only include registries with a name that matches the value of this parameter. Searches are case-insensitive.
     */
    searchString?: string;

    /**
     * The maximum number of records to return.
     */
    limit?: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
     */
    sort?: string;
  }
}

export { RegistriesService }
