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
class ShippingChargesService extends __BaseService {
  static readonly getShippingChargesPath = '/rest/admin/v2/shipping-charges';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Gets a collection of shipping charges for the specified store.
   * @param params The `ShippingChargesService.GetShippingChargesParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `languageId`: The ID of the language to be used to retrieve the shipping charge data.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `name`: Limits search results to only include shipping charges that match the specified name.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
   *
   * @return The request completed successfully.
   */
  getShippingChargesResponse(params: ShippingChargesService.GetShippingChargesParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.languageId != null) __params = __params.set('languageId', params.languageId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/shipping-charges`,
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
   * Gets a collection of shipping charges for the specified store.
   * @param params The `ShippingChargesService.GetShippingChargesParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `languageId`: The ID of the language to be used to retrieve the shipping charge data.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `name`: Limits search results to only include shipping charges that match the specified name.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
   *
   * @return The request completed successfully.
   */
  getShippingCharges(params: ShippingChargesService.GetShippingChargesParams): __Observable<any> {
    return this.getShippingChargesResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }
}

module ShippingChargesService {

  /**
   * Parameters for getShippingCharges
   */
  export interface GetShippingChargesParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The ID of the language to be used to retrieve the shipping charge data.
     */
    languageId?: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;

    /**
     * Limits search results to only include shipping charges that match the specified name.
     */
    name?: string;

    /**
     * The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
     */
    sort?: string;
  }
}

export { ShippingChargesService }
