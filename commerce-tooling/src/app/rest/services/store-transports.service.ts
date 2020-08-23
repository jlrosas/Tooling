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
class StoreTransportsService extends __BaseService {
  static readonly getStoreTransportsPath = '/rest/admin/v2/store-transports';
  static readonly createStoreTransportPath = '/rest/admin/v2/store-transports';
  static readonly getStoreTransportByIdPath = '/rest/admin/v2/store-transports/storeId:{storeId},transportId:{transportId}';
  static readonly deleteStoreTransportByIdPath = '/rest/admin/v2/store-transports/storeId:{storeId},transportId:{transportId}';
  static readonly updateStoreTransportByIdPath = '/rest/admin/v2/store-transports/storeId:{storeId},transportId:{transportId}';
  static readonly getTransportsOfStoreTransportPath = '/rest/admin/v2/store-transports/storeId:{storeId},transportId:{transportId}/transports';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of Store transports.
   * @param params The `StoreTransportsService.GetStoreTransportsParams` containing the following parameters:
   *
   * - `storeId`: The Store ID.
   *
   * - `transportId`: The transport.
   *
   * - `active`: If it is active.
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
   * @return A collection of Store transports.
   */
  getStoreTransportsResponse(params: StoreTransportsService.GetStoreTransportsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{storeId?: number, transportId?: number, active?: number, links?: {transports?: {href?: string}}}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.transportId != null) __params = __params.set('transportId', params.transportId.toString());
    if (params.active != null) __params = __params.set('active', params.active.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/store-transports`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{storeId?: number, transportId?: number, active?: number, links?: {transports?: {href?: string}}}>}>;
      })
    );
  }

  /**
   * Get a collection of Store transports.
   * @param params The `StoreTransportsService.GetStoreTransportsParams` containing the following parameters:
   *
   * - `storeId`: The Store ID.
   *
   * - `transportId`: The transport.
   *
   * - `active`: If it is active.
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
   * @return A collection of Store transports.
   */
  getStoreTransports(params: StoreTransportsService.GetStoreTransportsParams): __Observable<{count?: number, items?: Array<{storeId?: number, transportId?: number, active?: number, links?: {transports?: {href?: string}}}>}> {
    return this.getStoreTransportsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{storeId?: number, transportId?: number, active?: number, links?: {transports?: {href?: string}}}>})
    );
  }

  /**
   * Create an Store transport.
   * @param StoreTransport An store transport.
   */
  createStoreTransportResponse(StoreTransport: {storeId?: number, transportId?: number, active?: number, links?: {transports?: {href?: string}}}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = StoreTransport;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/store-transports`,
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
   * Create an Store transport.
   * @param StoreTransport An store transport.
   */
  createStoreTransport(StoreTransport: {storeId?: number, transportId?: number, active?: number, links?: {transports?: {href?: string}}}): __Observable<null> {
    return this.createStoreTransportResponse(StoreTransport).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get an Store transport.
   * @param params The `StoreTransportsService.GetStoreTransportByIdParams` containing the following parameters:
   *
   * - `storeId`: The Store ID.
   *
   * - `transportId`: The transport.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return An store transport.
   */
  getStoreTransportByIdResponse(params: StoreTransportsService.GetStoreTransportByIdParams): __Observable<__StrictHttpResponse<{storeId?: number, transportId?: number, active?: number, links?: {transports?: {href?: string}}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/store-transports/storeId:${params.storeId},transportId:${params.transportId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{storeId?: number, transportId?: number, active?: number, links?: {transports?: {href?: string}}}>;
      })
    );
  }

  /**
   * Get an Store transport.
   * @param params The `StoreTransportsService.GetStoreTransportByIdParams` containing the following parameters:
   *
   * - `storeId`: The Store ID.
   *
   * - `transportId`: The transport.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return An store transport.
   */
  getStoreTransportById(params: StoreTransportsService.GetStoreTransportByIdParams): __Observable<{storeId?: number, transportId?: number, active?: number, links?: {transports?: {href?: string}}}> {
    return this.getStoreTransportByIdResponse(params).pipe(
      __map(_r => _r.body as {storeId?: number, transportId?: number, active?: number, links?: {transports?: {href?: string}}})
    );
  }

  /**
   * Delete an Store transport.
   * @param params The `StoreTransportsService.DeleteStoreTransportByIdParams` containing the following parameters:
   *
   * - `storeId`: The Store ID.
   *
   * - `transportId`: The transport.
   */
  deleteStoreTransportByIdResponse(params: StoreTransportsService.DeleteStoreTransportByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/store-transports/storeId:${params.storeId},transportId:${params.transportId}`,
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
   * Delete an Store transport.
   * @param params The `StoreTransportsService.DeleteStoreTransportByIdParams` containing the following parameters:
   *
   * - `storeId`: The Store ID.
   *
   * - `transportId`: The transport.
   */
  deleteStoreTransportById(params: StoreTransportsService.DeleteStoreTransportByIdParams): __Observable<null> {
    return this.deleteStoreTransportByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update an Store transport.
   * @param params The `StoreTransportsService.UpdateStoreTransportByIdParams` containing the following parameters:
   *
   * - `StoreTransport`: An store transport.
   *
   * - `storeId`: The Store ID.
   *
   * - `transportId`: The transport.
   */
  updateStoreTransportByIdResponse(params: StoreTransportsService.UpdateStoreTransportByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.StoreTransport;


    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/store-transports/storeId:${params.storeId},transportId:${params.transportId}`,
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
   * Update an Store transport.
   * @param params The `StoreTransportsService.UpdateStoreTransportByIdParams` containing the following parameters:
   *
   * - `StoreTransport`: An store transport.
   *
   * - `storeId`: The Store ID.
   *
   * - `transportId`: The transport.
   */
  updateStoreTransportById(params: StoreTransportsService.UpdateStoreTransportByIdParams): __Observable<null> {
    return this.updateStoreTransportByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Finds the transport in a store-transport relationship.
   * @param params The `StoreTransportsService.GetTransportsOfStoreTransportParams` containing the following parameters:
   *
   * - `storeId`: The Store ID.
   *
   * - `transportId`: The transport.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return An store transport.
   */
  getTransportsOfStoreTransportResponse(params: StoreTransportsService.GetTransportsOfStoreTransportParams): __Observable<__StrictHttpResponse<{id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/store-transports/storeId:${params.storeId},transportId:${params.transportId}/transports`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string}>;
      })
    );
  }

  /**
   * Finds the transport in a store-transport relationship.
   * @param params The `StoreTransportsService.GetTransportsOfStoreTransportParams` containing the following parameters:
   *
   * - `storeId`: The Store ID.
   *
   * - `transportId`: The transport.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return An store transport.
   */
  getTransportsOfStoreTransport(params: StoreTransportsService.GetTransportsOfStoreTransportParams): __Observable<{id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string}> {
    return this.getTransportsOfStoreTransportResponse(params).pipe(
      __map(_r => _r.body as {id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string})
    );
  }
}

module StoreTransportsService {

  /**
   * Parameters for getStoreTransports
   */
  export interface GetStoreTransportsParams {

    /**
     * The Store ID.
     */
    storeId?: number;

    /**
     * The transport.
     */
    transportId?: number;

    /**
     * If it is active.
     */
    active?: number;

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
   * Parameters for getStoreTransportById
   */
  export interface GetStoreTransportByIdParams {

    /**
     * The Store ID.
     */
    storeId: number;

    /**
     * The transport.
     */
    transportId: number;

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
   * Parameters for deleteStoreTransportById
   */
  export interface DeleteStoreTransportByIdParams {

    /**
     * The Store ID.
     */
    storeId: number;

    /**
     * The transport.
     */
    transportId: number;
  }

  /**
   * Parameters for updateStoreTransportById
   */
  export interface UpdateStoreTransportByIdParams {

    /**
     * An store transport.
     */
    StoreTransport: {storeId?: number, transportId?: number, active?: number, links?: {transports?: {href?: string}}};

    /**
     * The Store ID.
     */
    storeId: number;

    /**
     * The transport.
     */
    transportId: number;
  }

  /**
   * Parameters for getTransportsOfStoreTransport
   */
  export interface GetTransportsOfStoreTransportParams {

    /**
     * The Store ID.
     */
    storeId: number;

    /**
     * The transport.
     */
    transportId: number;

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

export { StoreTransportsService }
