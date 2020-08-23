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
class ShippingModeCarriersService extends __BaseService {
  static readonly getShippingModeCarriersPath = '/rest/admin/v2/shipping-mode-carriers';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Gets a collection of shipping mode carriers for the specified store.
   * @param params The `ShippingModeCarriersService.GetShippingModeCarriersParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `searchString`: Limits search results to only include carriers that match the value of this parameter. Searches are case-insensitive.
   *
   * @return The request completed successfully.
   */
  getShippingModeCarriersResponse(params: ShippingModeCarriersService.GetShippingModeCarriersParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/shipping-mode-carriers`,
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
   * Gets a collection of shipping mode carriers for the specified store.
   * @param params The `ShippingModeCarriersService.GetShippingModeCarriersParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `searchString`: Limits search results to only include carriers that match the value of this parameter. Searches are case-insensitive.
   *
   * @return The request completed successfully.
   */
  getShippingModeCarriers(params: ShippingModeCarriersService.GetShippingModeCarriersParams): __Observable<any> {
    return this.getShippingModeCarriersResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }
}

module ShippingModeCarriersService {

  /**
   * Parameters for getShippingModeCarriers
   */
  export interface GetShippingModeCarriersParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;

    /**
     * Limits search results to only include carriers that match the value of this parameter. Searches are case-insensitive.
     */
    searchString?: string;
  }
}

export { ShippingModeCarriersService }
