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
class ShippingArrangementsService extends __BaseService {
  static readonly getShippingArrangementsPath = '/rest/admin/v2/shipping-arrangements';
  static readonly createShippingArrangementPath = '/rest/admin/v2/shipping-arrangements';
  static readonly getShippingArrangementByIdPath = '/rest/admin/v2/shipping-arrangements/{id}';
  static readonly deleteShippingArrangementByIdPath = '/rest/admin/v2/shipping-arrangements/{id}';
  static readonly updateShippingArrangementByIdPath = '/rest/admin/v2/shipping-arrangements/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of shipping arrangements.
   * @param params The `ShippingArrangementsService.GetShippingArrangementsParams` containing the following parameters:
   *
   * - `id`: The shipping arrangement ID.
   *
   * - `storeId`: The store ID.
   *
   * - `fulfillmentCenterId`: The FulfillmentCenter ID.
   *
   * - `shippingModeId`: The ShippingMode. NULL indicates this shipping arrangement can be used regardless of shipping mode.
   *
   * - `startDate`: The time this shipping arrangement starts being effective. If STARTDATE is NULL, it means it begin effective from the beginning.
   *
   * - `endDate`: The time this shipping arrangement stops being effective. If ENDDATE is NULL, it means it will effective forever once it has been started. If the EndDate expires, this shipping arrangement turns invalid and then shoppers could not add items to the cart with this shipping arrangement.
   *
   * - `trackingNumber`: The tracking number.
   *
   * - `field1`: Customizable.
   *
   * - `precedence`: When more than one shipping arrangement (for the same Store and shipping mode) is effective at a particular time, the one with the highest precedence is used.
   *
   * - `field2`: Customizable.
   *
   * - `flags`: The low order bit contains a flag as follows, 1 - restricted = If this flag is 1, then this shipping arrangement applies only to order items whose shipping Addresses match one of the shipping jurisdiction associated with this shipping arrangement. Otherwise, it applies to all order items.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A collection of shipping arrangements.
   */
  getShippingArrangementsResponse(params: ShippingArrangementsService.GetShippingArrangementsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, storeId?: number, fulfillmentCenterId?: number, shippingModeId?: number, startDate?: string, endDate?: string, trackingNumber?: string, field1?: string, precedence?: number, field2?: number, flags?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.fulfillmentCenterId != null) __params = __params.set('fulfillmentCenterId', params.fulfillmentCenterId.toString());
    if (params.shippingModeId != null) __params = __params.set('shippingModeId', params.shippingModeId.toString());
    if (params.startDate != null) __params = __params.set('startDate', params.startDate.toString());
    if (params.endDate != null) __params = __params.set('endDate', params.endDate.toString());
    if (params.trackingNumber != null) __params = __params.set('trackingNumber', params.trackingNumber.toString());
    if (params.field1 != null) __params = __params.set('field1', params.field1.toString());
    if (params.precedence != null) __params = __params.set('precedence', params.precedence.toString());
    if (params.field2 != null) __params = __params.set('field2', params.field2.toString());
    if (params.flags != null) __params = __params.set('flags', params.flags.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/shipping-arrangements`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, storeId?: number, fulfillmentCenterId?: number, shippingModeId?: number, startDate?: string, endDate?: string, trackingNumber?: string, field1?: string, precedence?: number, field2?: number, flags?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of shipping arrangements.
   * @param params The `ShippingArrangementsService.GetShippingArrangementsParams` containing the following parameters:
   *
   * - `id`: The shipping arrangement ID.
   *
   * - `storeId`: The store ID.
   *
   * - `fulfillmentCenterId`: The FulfillmentCenter ID.
   *
   * - `shippingModeId`: The ShippingMode. NULL indicates this shipping arrangement can be used regardless of shipping mode.
   *
   * - `startDate`: The time this shipping arrangement starts being effective. If STARTDATE is NULL, it means it begin effective from the beginning.
   *
   * - `endDate`: The time this shipping arrangement stops being effective. If ENDDATE is NULL, it means it will effective forever once it has been started. If the EndDate expires, this shipping arrangement turns invalid and then shoppers could not add items to the cart with this shipping arrangement.
   *
   * - `trackingNumber`: The tracking number.
   *
   * - `field1`: Customizable.
   *
   * - `precedence`: When more than one shipping arrangement (for the same Store and shipping mode) is effective at a particular time, the one with the highest precedence is used.
   *
   * - `field2`: Customizable.
   *
   * - `flags`: The low order bit contains a flag as follows, 1 - restricted = If this flag is 1, then this shipping arrangement applies only to order items whose shipping Addresses match one of the shipping jurisdiction associated with this shipping arrangement. Otherwise, it applies to all order items.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A collection of shipping arrangements.
   */
  getShippingArrangements(params: ShippingArrangementsService.GetShippingArrangementsParams): __Observable<{count?: number, items?: Array<{id?: number, storeId?: number, fulfillmentCenterId?: number, shippingModeId?: number, startDate?: string, endDate?: string, trackingNumber?: string, field1?: string, precedence?: number, field2?: number, flags?: number}>}> {
    return this.getShippingArrangementsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, storeId?: number, fulfillmentCenterId?: number, shippingModeId?: number, startDate?: string, endDate?: string, trackingNumber?: string, field1?: string, precedence?: number, field2?: number, flags?: number}>})
    );
  }

  /**
   * Create a shipping arrangement.
   * @param ShippingArrangement Shipping arrangements.
   */
  createShippingArrangementResponse(ShippingArrangement: {id?: number, storeId?: number, fulfillmentCenterId?: number, shippingModeId?: number, startDate?: string, endDate?: string, trackingNumber?: string, field1?: string, precedence?: number, field2?: number, flags?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ShippingArrangement;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/shipping-arrangements`,
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
   * Create a shipping arrangement.
   * @param ShippingArrangement Shipping arrangements.
   */
  createShippingArrangement(ShippingArrangement: {id?: number, storeId?: number, fulfillmentCenterId?: number, shippingModeId?: number, startDate?: string, endDate?: string, trackingNumber?: string, field1?: string, precedence?: number, field2?: number, flags?: number}): __Observable<null> {
    return this.createShippingArrangementResponse(ShippingArrangement).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a shipping arrangement.
   * @param params The `ShippingArrangementsService.GetShippingArrangementByIdParams` containing the following parameters:
   *
   * - `id`: The shipping arrangement ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Shipping arrangements.
   */
  getShippingArrangementByIdResponse(params: ShippingArrangementsService.GetShippingArrangementByIdParams): __Observable<__StrictHttpResponse<{id?: number, storeId?: number, fulfillmentCenterId?: number, shippingModeId?: number, startDate?: string, endDate?: string, trackingNumber?: string, field1?: string, precedence?: number, field2?: number, flags?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/shipping-arrangements/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, storeId?: number, fulfillmentCenterId?: number, shippingModeId?: number, startDate?: string, endDate?: string, trackingNumber?: string, field1?: string, precedence?: number, field2?: number, flags?: number}>;
      })
    );
  }

  /**
   * Get a shipping arrangement.
   * @param params The `ShippingArrangementsService.GetShippingArrangementByIdParams` containing the following parameters:
   *
   * - `id`: The shipping arrangement ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Shipping arrangements.
   */
  getShippingArrangementById(params: ShippingArrangementsService.GetShippingArrangementByIdParams): __Observable<{id?: number, storeId?: number, fulfillmentCenterId?: number, shippingModeId?: number, startDate?: string, endDate?: string, trackingNumber?: string, field1?: string, precedence?: number, field2?: number, flags?: number}> {
    return this.getShippingArrangementByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, storeId?: number, fulfillmentCenterId?: number, shippingModeId?: number, startDate?: string, endDate?: string, trackingNumber?: string, field1?: string, precedence?: number, field2?: number, flags?: number})
    );
  }

  /**
   * Delete a shipping arrangement.
   * @param id The shipping arrangement ID.
   */
  deleteShippingArrangementByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/shipping-arrangements/${id}`,
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
   * Delete a shipping arrangement.
   * @param id The shipping arrangement ID.
   */
  deleteShippingArrangementById(id: number): __Observable<null> {
    return this.deleteShippingArrangementByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a shipping arrangement.
   * @param params The `ShippingArrangementsService.UpdateShippingArrangementByIdParams` containing the following parameters:
   *
   * - `ShippingArrangement`: Shipping arrangements.
   *
   * - `id`: The shipping arrangement ID.
   */
  updateShippingArrangementByIdResponse(params: ShippingArrangementsService.UpdateShippingArrangementByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.ShippingArrangement;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/shipping-arrangements/${params.id}`,
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
   * Update a shipping arrangement.
   * @param params The `ShippingArrangementsService.UpdateShippingArrangementByIdParams` containing the following parameters:
   *
   * - `ShippingArrangement`: Shipping arrangements.
   *
   * - `id`: The shipping arrangement ID.
   */
  updateShippingArrangementById(params: ShippingArrangementsService.UpdateShippingArrangementByIdParams): __Observable<null> {
    return this.updateShippingArrangementByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ShippingArrangementsService {

  /**
   * Parameters for getShippingArrangements
   */
  export interface GetShippingArrangementsParams {

    /**
     * The shipping arrangement ID.
     */
    id?: number;

    /**
     * The store ID.
     */
    storeId?: number;

    /**
     * The FulfillmentCenter ID.
     */
    fulfillmentCenterId?: number;

    /**
     * The ShippingMode. NULL indicates this shipping arrangement can be used regardless of shipping mode.
     */
    shippingModeId?: number;

    /**
     * The time this shipping arrangement starts being effective. If STARTDATE is NULL, it means it begin effective from the beginning.
     */
    startDate?: string;

    /**
     * The time this shipping arrangement stops being effective. If ENDDATE is NULL, it means it will effective forever once it has been started. If the EndDate expires, this shipping arrangement turns invalid and then shoppers could not add items to the cart with this shipping arrangement.
     */
    endDate?: string;

    /**
     * The tracking number.
     */
    trackingNumber?: string;

    /**
     * Customizable.
     */
    field1?: string;

    /**
     * When more than one shipping arrangement (for the same Store and shipping mode) is effective at a particular time, the one with the highest precedence is used.
     */
    precedence?: number;

    /**
     * Customizable.
     */
    field2?: number;

    /**
     * The low order bit contains a flag as follows, 1 - restricted = If this flag is 1, then this shipping arrangement applies only to order items whose shipping Addresses match one of the shipping jurisdiction associated with this shipping arrangement. Otherwise, it applies to all order items.
     */
    flags?: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;

    /**
     * The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
     */
    fields?: string;

    /**
     * The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
     */
    expand?: string;

    /**
     * The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
     */
    sort?: string;
  }

  /**
   * Parameters for getShippingArrangementById
   */
  export interface GetShippingArrangementByIdParams {

    /**
     * The shipping arrangement ID.
     */
    id: number;

    /**
     * The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
     */
    fields?: string;

    /**
     * The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
     */
    expand?: string;

    /**
     * The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
     */
    sort?: string;
  }

  /**
   * Parameters for updateShippingArrangementById
   */
  export interface UpdateShippingArrangementByIdParams {

    /**
     * Shipping arrangements.
     */
    ShippingArrangement: {id?: number, storeId?: number, fulfillmentCenterId?: number, shippingModeId?: number, startDate?: string, endDate?: string, trackingNumber?: string, field1?: string, precedence?: number, field2?: number, flags?: number};

    /**
     * The shipping arrangement ID.
     */
    id: number;
  }
}

export { ShippingArrangementsService }
