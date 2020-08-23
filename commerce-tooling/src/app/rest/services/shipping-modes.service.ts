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
class ShippingModesService extends __BaseService {
  static readonly getShippingModesPath = '/rest/admin/v2/shipping-modes';
  static readonly createShippingModePath = '/rest/admin/v2/shipping-modes';
  static readonly getShippingModeByIdPath = '/rest/admin/v2/shipping-modes/{id}';
  static readonly deleteShippingModeByIdPath = '/rest/admin/v2/shipping-modes/{id}';
  static readonly updateShippingModeByIdPath = '/rest/admin/v2/shipping-modes/{id}';
  static readonly getDescriptionsOfShippingModePath = '/rest/admin/v2/shipping-modes/{id}/descriptions';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of Shipping Modes.
   * @param params The `ShippingModesService.GetShippingModesParams` containing the following parameters:
   *
   * - `searchString`: Limits search results to only include shipping modes that match the value of this parameter. Searches are case-insensitive.
   *
   * - `id`: The Shipping Mode ID.
   *
   * - `carrier`: A shipping carrier identifier. The company that provides shipping services from a fulfillment center to a customer.
   *
   * - `field1`: An additional description. A brief description of the shipping mode and the carrier.
   *
   * - `field2`: Estimated delivery time description. For example, 1 to 3 business days, 2-3 days etc.
   *
   * - `trackingName`: Reserved for HCL Internal use.
   *
   * - `trackingURL`: The URL address that customers can use to find out more about the status of their shipment. For example, www.xyzcarrier.com.
   *
   * - `trackingSocksHost`: Reserved for HCL Internal use.
   *
   * - `trackingSocksPort`: Reserved for HCL Internal use.
   *
   * - `trackingIcon`: Reserved for HCL Internal use.
   *
   * - `trackingInquiryType`: Reserved for HCL Internal use.
   *
   * - `markForDelete`: Indicates that the shipping mode has been deleted. 0 = No. 1 = Yes.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `shippingCode`: A character string that uniquely identifies this shipping mode, unique for the StoreEntity.
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
   * @return A collection of Shipping Modes.
   */
  getShippingModesResponse(params: ShippingModesService.GetShippingModesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, carrier?: string, field1?: string, field2?: number, trackingName?: string, trackingURL?: string, trackingSocksHost?: string, trackingSocksPort?: number, trackingIcon?: string, trackingInquiryType?: string, markForDelete?: number, storeId?: number, shippingCode?: string, links?: {descriptions?: {href?: string}}}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.carrier != null) __params = __params.set('carrier', params.carrier.toString());
    if (params.field1 != null) __params = __params.set('field1', params.field1.toString());
    if (params.field2 != null) __params = __params.set('field2', params.field2.toString());
    if (params.trackingName != null) __params = __params.set('trackingName', params.trackingName.toString());
    if (params.trackingURL != null) __params = __params.set('trackingURL', params.trackingURL.toString());
    if (params.trackingSocksHost != null) __params = __params.set('trackingSocksHost', params.trackingSocksHost.toString());
    if (params.trackingSocksPort != null) __params = __params.set('trackingSocksPort', params.trackingSocksPort.toString());
    if (params.trackingIcon != null) __params = __params.set('trackingIcon', params.trackingIcon.toString());
    if (params.trackingInquiryType != null) __params = __params.set('trackingInquiryType', params.trackingInquiryType.toString());
    if (params.markForDelete != null) __params = __params.set('markForDelete', params.markForDelete.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.shippingCode != null) __params = __params.set('shippingCode', params.shippingCode.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/shipping-modes`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, carrier?: string, field1?: string, field2?: number, trackingName?: string, trackingURL?: string, trackingSocksHost?: string, trackingSocksPort?: number, trackingIcon?: string, trackingInquiryType?: string, markForDelete?: number, storeId?: number, shippingCode?: string, links?: {descriptions?: {href?: string}}}>}>;
      })
    );
  }

  /**
   * Get a collection of Shipping Modes.
   * @param params The `ShippingModesService.GetShippingModesParams` containing the following parameters:
   *
   * - `searchString`: Limits search results to only include shipping modes that match the value of this parameter. Searches are case-insensitive.
   *
   * - `id`: The Shipping Mode ID.
   *
   * - `carrier`: A shipping carrier identifier. The company that provides shipping services from a fulfillment center to a customer.
   *
   * - `field1`: An additional description. A brief description of the shipping mode and the carrier.
   *
   * - `field2`: Estimated delivery time description. For example, 1 to 3 business days, 2-3 days etc.
   *
   * - `trackingName`: Reserved for HCL Internal use.
   *
   * - `trackingURL`: The URL address that customers can use to find out more about the status of their shipment. For example, www.xyzcarrier.com.
   *
   * - `trackingSocksHost`: Reserved for HCL Internal use.
   *
   * - `trackingSocksPort`: Reserved for HCL Internal use.
   *
   * - `trackingIcon`: Reserved for HCL Internal use.
   *
   * - `trackingInquiryType`: Reserved for HCL Internal use.
   *
   * - `markForDelete`: Indicates that the shipping mode has been deleted. 0 = No. 1 = Yes.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `shippingCode`: A character string that uniquely identifies this shipping mode, unique for the StoreEntity.
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
   * @return A collection of Shipping Modes.
   */
  getShippingModes(params: ShippingModesService.GetShippingModesParams): __Observable<{count?: number, items?: Array<{id?: number, carrier?: string, field1?: string, field2?: number, trackingName?: string, trackingURL?: string, trackingSocksHost?: string, trackingSocksPort?: number, trackingIcon?: string, trackingInquiryType?: string, markForDelete?: number, storeId?: number, shippingCode?: string, links?: {descriptions?: {href?: string}}}>}> {
    return this.getShippingModesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, carrier?: string, field1?: string, field2?: number, trackingName?: string, trackingURL?: string, trackingSocksHost?: string, trackingSocksPort?: number, trackingIcon?: string, trackingInquiryType?: string, markForDelete?: number, storeId?: number, shippingCode?: string, links?: {descriptions?: {href?: string}}}>})
    );
  }

  /**
   * Create a shipping mode.
   * @param ShippingMode A Shipping Mode.
   */
  createShippingModeResponse(ShippingMode: {id?: number, carrier?: string, field1?: string, field2?: number, trackingName?: string, trackingURL?: string, trackingSocksHost?: string, trackingSocksPort?: number, trackingIcon?: string, trackingInquiryType?: string, markForDelete?: number, storeId?: number, shippingCode?: string, links?: {descriptions?: {href?: string}}}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ShippingMode;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/shipping-modes`,
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
   * Create a shipping mode.
   * @param ShippingMode A Shipping Mode.
   */
  createShippingMode(ShippingMode: {id?: number, carrier?: string, field1?: string, field2?: number, trackingName?: string, trackingURL?: string, trackingSocksHost?: string, trackingSocksPort?: number, trackingIcon?: string, trackingInquiryType?: string, markForDelete?: number, storeId?: number, shippingCode?: string, links?: {descriptions?: {href?: string}}}): __Observable<null> {
    return this.createShippingModeResponse(ShippingMode).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a shipping mode.
   * @param params The `ShippingModesService.GetShippingModeByIdParams` containing the following parameters:
   *
   * - `id`: The Shipping Mode ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Shipping Mode.
   */
  getShippingModeByIdResponse(params: ShippingModesService.GetShippingModeByIdParams): __Observable<__StrictHttpResponse<{id?: number, carrier?: string, field1?: string, field2?: number, trackingName?: string, trackingURL?: string, trackingSocksHost?: string, trackingSocksPort?: number, trackingIcon?: string, trackingInquiryType?: string, markForDelete?: number, storeId?: number, shippingCode?: string, links?: {descriptions?: {href?: string}}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/shipping-modes/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, carrier?: string, field1?: string, field2?: number, trackingName?: string, trackingURL?: string, trackingSocksHost?: string, trackingSocksPort?: number, trackingIcon?: string, trackingInquiryType?: string, markForDelete?: number, storeId?: number, shippingCode?: string, links?: {descriptions?: {href?: string}}}>;
      })
    );
  }

  /**
   * Get a shipping mode.
   * @param params The `ShippingModesService.GetShippingModeByIdParams` containing the following parameters:
   *
   * - `id`: The Shipping Mode ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Shipping Mode.
   */
  getShippingModeById(params: ShippingModesService.GetShippingModeByIdParams): __Observable<{id?: number, carrier?: string, field1?: string, field2?: number, trackingName?: string, trackingURL?: string, trackingSocksHost?: string, trackingSocksPort?: number, trackingIcon?: string, trackingInquiryType?: string, markForDelete?: number, storeId?: number, shippingCode?: string, links?: {descriptions?: {href?: string}}}> {
    return this.getShippingModeByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, carrier?: string, field1?: string, field2?: number, trackingName?: string, trackingURL?: string, trackingSocksHost?: string, trackingSocksPort?: number, trackingIcon?: string, trackingInquiryType?: string, markForDelete?: number, storeId?: number, shippingCode?: string, links?: {descriptions?: {href?: string}}})
    );
  }

  /**
   * Delete a shipping mode.
   * @param id The Shipping Mode ID.
   */
  deleteShippingModeByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/shipping-modes/${id}`,
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
   * Delete a shipping mode.
   * @param id The Shipping Mode ID.
   */
  deleteShippingModeById(id: number): __Observable<null> {
    return this.deleteShippingModeByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a shipping mode.
   * @param params The `ShippingModesService.UpdateShippingModeByIdParams` containing the following parameters:
   *
   * - `ShippingMode`: A Shipping Mode.
   *
   * - `id`: The Shipping Mode ID.
   */
  updateShippingModeByIdResponse(params: ShippingModesService.UpdateShippingModeByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.ShippingMode;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/shipping-modes/${params.id}`,
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
   * Update a shipping mode.
   * @param params The `ShippingModesService.UpdateShippingModeByIdParams` containing the following parameters:
   *
   * - `ShippingMode`: A Shipping Mode.
   *
   * - `id`: The Shipping Mode ID.
   */
  updateShippingModeById(params: ShippingModesService.UpdateShippingModeByIdParams): __Observable<null> {
    return this.updateShippingModeByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ShippingModesService.GetDescriptionsOfShippingModeParams` containing the following parameters:
   *
   * - `id`: The Shipping Mode ID.
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
  getDescriptionsOfShippingModeResponse(params: ShippingModesService.GetDescriptionsOfShippingModeParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{shippingModeId?: number, languageId?: number, description?: string, field1?: string, field2?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/shipping-modes/${params.id}/descriptions`,
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
   * @param params The `ShippingModesService.GetDescriptionsOfShippingModeParams` containing the following parameters:
   *
   * - `id`: The Shipping Mode ID.
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
  getDescriptionsOfShippingMode(params: ShippingModesService.GetDescriptionsOfShippingModeParams): __Observable<{count?: number, items?: Array<{shippingModeId?: number, languageId?: number, description?: string, field1?: string, field2?: string}>}> {
    return this.getDescriptionsOfShippingModeResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{shippingModeId?: number, languageId?: number, description?: string, field1?: string, field2?: string}>})
    );
  }
}

module ShippingModesService {

  /**
   * Parameters for getShippingModes
   */
  export interface GetShippingModesParams {

    /**
     * Limits search results to only include shipping modes that match the value of this parameter. Searches are case-insensitive.
     */
    searchString?: string;

    /**
     * The Shipping Mode ID.
     */
    id?: number;

    /**
     * A shipping carrier identifier. The company that provides shipping services from a fulfillment center to a customer.
     */
    carrier?: string;

    /**
     * An additional description. A brief description of the shipping mode and the carrier.
     */
    field1?: string;

    /**
     * Estimated delivery time description. For example, 1 to 3 business days, 2-3 days etc.
     */
    field2?: number;

    /**
     * Reserved for HCL Internal use.
     */
    trackingName?: string;

    /**
     * The URL address that customers can use to find out more about the status of their shipment. For example, www.xyzcarrier.com.
     */
    trackingURL?: string;

    /**
     * Reserved for HCL Internal use.
     */
    trackingSocksHost?: string;

    /**
     * Reserved for HCL Internal use.
     */
    trackingSocksPort?: number;

    /**
     * Reserved for HCL Internal use.
     */
    trackingIcon?: string;

    /**
     * Reserved for HCL Internal use.
     */
    trackingInquiryType?: string;

    /**
     * Indicates that the shipping mode has been deleted. 0 = No. 1 = Yes.
     */
    markForDelete?: number;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;

    /**
     * A character string that uniquely identifies this shipping mode, unique for the StoreEntity.
     */
    shippingCode?: string;

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
   * Parameters for getShippingModeById
   */
  export interface GetShippingModeByIdParams {

    /**
     * The Shipping Mode ID.
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
   * Parameters for updateShippingModeById
   */
  export interface UpdateShippingModeByIdParams {

    /**
     * A Shipping Mode.
     */
    ShippingMode: {id?: number, carrier?: string, field1?: string, field2?: number, trackingName?: string, trackingURL?: string, trackingSocksHost?: string, trackingSocksPort?: number, trackingIcon?: string, trackingInquiryType?: string, markForDelete?: number, storeId?: number, shippingCode?: string, links?: {descriptions?: {href?: string}}};

    /**
     * The Shipping Mode ID.
     */
    id: number;
  }

  /**
   * Parameters for getDescriptionsOfShippingMode
   */
  export interface GetDescriptionsOfShippingModeParams {

    /**
     * The Shipping Mode ID.
     */
    id: number;

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
}

export { ShippingModesService }
