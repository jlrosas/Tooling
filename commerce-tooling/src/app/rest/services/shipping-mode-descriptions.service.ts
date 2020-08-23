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
class ShippingModeDescriptionsService extends __BaseService {
  static readonly getShippingModeDescriptionsPath = '/rest/admin/v2/shipping-mode-descriptions';
  static readonly createShippingModeDescriptionPath = '/rest/admin/v2/shipping-mode-descriptions';
  static readonly getShippingModeDescriptionByIdPath = '/rest/admin/v2/shipping-mode-descriptions/languageId:{languageId},shippingModeId:{shippingModeId}';
  static readonly deleteShippingModeDescriptionByIdPath = '/rest/admin/v2/shipping-mode-descriptions/languageId:{languageId},shippingModeId:{shippingModeId}';
  static readonly updateShippingModeDescriptionByIdPath = '/rest/admin/v2/shipping-mode-descriptions/languageId:{languageId},shippingModeId:{shippingModeId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of Shipping Mode Descriptions.
   * @param params The `ShippingModeDescriptionsService.GetShippingModeDescriptionsParams` containing the following parameters:
   *
   * - `shippingModeId`: The Shipping Mode ID.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `languageId`: The Language ID.
   *
   * - `description`: A brief description of the shipping mode, suitable for display to a customer for selection. For example, XYZ Carrier, Overnight shipping mode.
   *
   * - `field1`: Customizable.
   *
   * - `field2`: Customizable.
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
   * @return A collection of Shipping Mode Descriptions.
   */
  getShippingModeDescriptionsResponse(params: ShippingModeDescriptionsService.GetShippingModeDescriptionsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{shippingModeId?: number, languageId?: number, description?: string, field1?: string, field2?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.shippingModeId || []).forEach(val => {if (val != null) __params = __params.append('shippingModeId', val.toString())});
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.languageId != null) __params = __params.set('languageId', params.languageId.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.field1 != null) __params = __params.set('field1', params.field1.toString());
    if (params.field2 != null) __params = __params.set('field2', params.field2.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/shipping-mode-descriptions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{shippingModeId?: number, languageId?: number, description?: string, field1?: string, field2?: string}>}>;
      })
    );
  }

  /**
   * Get a collection of Shipping Mode Descriptions.
   * @param params The `ShippingModeDescriptionsService.GetShippingModeDescriptionsParams` containing the following parameters:
   *
   * - `shippingModeId`: The Shipping Mode ID.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `languageId`: The Language ID.
   *
   * - `description`: A brief description of the shipping mode, suitable for display to a customer for selection. For example, XYZ Carrier, Overnight shipping mode.
   *
   * - `field1`: Customizable.
   *
   * - `field2`: Customizable.
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
   * @return A collection of Shipping Mode Descriptions.
   */
  getShippingModeDescriptions(params: ShippingModeDescriptionsService.GetShippingModeDescriptionsParams): __Observable<{count?: number, items?: Array<{shippingModeId?: number, languageId?: number, description?: string, field1?: string, field2?: string}>}> {
    return this.getShippingModeDescriptionsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{shippingModeId?: number, languageId?: number, description?: string, field1?: string, field2?: string}>})
    );
  }

  /**
   * Create a shipping mode description.
   * @param ShippingModeDescription A Shipping Mode Description.
   */
  createShippingModeDescriptionResponse(ShippingModeDescription: {shippingModeId?: number, languageId?: number, description?: string, field1?: string, field2?: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ShippingModeDescription;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/shipping-mode-descriptions`,
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
   * Create a shipping mode description.
   * @param ShippingModeDescription A Shipping Mode Description.
   */
  createShippingModeDescription(ShippingModeDescription: {shippingModeId?: number, languageId?: number, description?: string, field1?: string, field2?: string}): __Observable<null> {
    return this.createShippingModeDescriptionResponse(ShippingModeDescription).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a shipping mode description.
   * @param params The `ShippingModeDescriptionsService.GetShippingModeDescriptionByIdParams` containing the following parameters:
   *
   * - `languageId`: The Language ID.
   *
   * - `shippingModeId`: The Shipping Mode ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Shipping Mode Description.
   */
  getShippingModeDescriptionByIdResponse(params: ShippingModeDescriptionsService.GetShippingModeDescriptionByIdParams): __Observable<__StrictHttpResponse<{shippingModeId?: number, languageId?: number, description?: string, field1?: string, field2?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/shipping-mode-descriptions/languageId:${params.languageId},shippingModeId:${params.shippingModeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{shippingModeId?: number, languageId?: number, description?: string, field1?: string, field2?: string}>;
      })
    );
  }

  /**
   * Get a shipping mode description.
   * @param params The `ShippingModeDescriptionsService.GetShippingModeDescriptionByIdParams` containing the following parameters:
   *
   * - `languageId`: The Language ID.
   *
   * - `shippingModeId`: The Shipping Mode ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Shipping Mode Description.
   */
  getShippingModeDescriptionById(params: ShippingModeDescriptionsService.GetShippingModeDescriptionByIdParams): __Observable<{shippingModeId?: number, languageId?: number, description?: string, field1?: string, field2?: string}> {
    return this.getShippingModeDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as {shippingModeId?: number, languageId?: number, description?: string, field1?: string, field2?: string})
    );
  }

  /**
   * Delete a shipping mode description.
   * @param params The `ShippingModeDescriptionsService.DeleteShippingModeDescriptionByIdParams` containing the following parameters:
   *
   * - `languageId`: The Language ID.
   *
   * - `shippingModeId`: The Shipping Mode ID.
   */
  deleteShippingModeDescriptionByIdResponse(params: ShippingModeDescriptionsService.DeleteShippingModeDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/shipping-mode-descriptions/languageId:${params.languageId},shippingModeId:${params.shippingModeId}`,
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
   * Delete a shipping mode description.
   * @param params The `ShippingModeDescriptionsService.DeleteShippingModeDescriptionByIdParams` containing the following parameters:
   *
   * - `languageId`: The Language ID.
   *
   * - `shippingModeId`: The Shipping Mode ID.
   */
  deleteShippingModeDescriptionById(params: ShippingModeDescriptionsService.DeleteShippingModeDescriptionByIdParams): __Observable<null> {
    return this.deleteShippingModeDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a shipping mode description.
   * @param params The `ShippingModeDescriptionsService.UpdateShippingModeDescriptionByIdParams` containing the following parameters:
   *
   * - `ShippingModeDescription`: A Shipping Mode Description.
   *
   * - `languageId`: The Language ID.
   *
   * - `shippingModeId`: The Shipping Mode ID.
   */
  updateShippingModeDescriptionByIdResponse(params: ShippingModeDescriptionsService.UpdateShippingModeDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.ShippingModeDescription;


    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/shipping-mode-descriptions/languageId:${params.languageId},shippingModeId:${params.shippingModeId}`,
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
   * Update a shipping mode description.
   * @param params The `ShippingModeDescriptionsService.UpdateShippingModeDescriptionByIdParams` containing the following parameters:
   *
   * - `ShippingModeDescription`: A Shipping Mode Description.
   *
   * - `languageId`: The Language ID.
   *
   * - `shippingModeId`: The Shipping Mode ID.
   */
  updateShippingModeDescriptionById(params: ShippingModeDescriptionsService.UpdateShippingModeDescriptionByIdParams): __Observable<null> {
    return this.updateShippingModeDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ShippingModeDescriptionsService {

  /**
   * Parameters for getShippingModeDescriptions
   */
  export interface GetShippingModeDescriptionsParams {

    /**
     * The Shipping Mode ID.
     */
    shippingModeId?: Array<number>;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;

    /**
     * The Language ID.
     */
    languageId?: number;

    /**
     * A brief description of the shipping mode, suitable for display to a customer for selection. For example, XYZ Carrier, Overnight shipping mode.
     */
    description?: string;

    /**
     * Customizable.
     */
    field1?: string;

    /**
     * Customizable.
     */
    field2?: string;

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
   * Parameters for getShippingModeDescriptionById
   */
  export interface GetShippingModeDescriptionByIdParams {

    /**
     * The Language ID.
     */
    languageId: number;

    /**
     * The Shipping Mode ID.
     */
    shippingModeId: number;

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
   * Parameters for deleteShippingModeDescriptionById
   */
  export interface DeleteShippingModeDescriptionByIdParams {

    /**
     * The Language ID.
     */
    languageId: number;

    /**
     * The Shipping Mode ID.
     */
    shippingModeId: number;
  }

  /**
   * Parameters for updateShippingModeDescriptionById
   */
  export interface UpdateShippingModeDescriptionByIdParams {

    /**
     * A Shipping Mode Description.
     */
    ShippingModeDescription: {shippingModeId?: number, languageId?: number, description?: string, field1?: string, field2?: string};

    /**
     * The Language ID.
     */
    languageId: number;

    /**
     * The Shipping Mode ID.
     */
    shippingModeId: number;
  }
}

export { ShippingModeDescriptionsService }
