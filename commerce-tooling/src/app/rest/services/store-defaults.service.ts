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
class StoreDefaultsService extends __BaseService {
  static readonly getStoreDefaultsPath = '/rest/admin/v2/store-defaults';
  static readonly createStoreDefaultPath = '/rest/admin/v2/store-defaults';
  static readonly getStoreDefaultByIdPath = '/rest/admin/v2/store-defaults/{id}';
  static readonly deleteStoreDefaultByIdPath = '/rest/admin/v2/store-defaults/{id}';
  static readonly updateStoreDefaultByIdPath = '/rest/admin/v2/store-defaults/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of store defaults.
   * @param params The `StoreDefaultsService.GetStoreDefaultsParams` containing the following parameters:
   *
   * - `id`: The Store.
   *
   * - `shipModeId`: The default shipping mode for the store.
   *
   * - `contractId`: The default contract for the store.
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
   * @return A collection of store default values.
   */
  getStoreDefaultsResponse(params: StoreDefaultsService.GetStoreDefaultsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, shipModeId?: number, contractId?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.shipModeId != null) __params = __params.set('shipModeId', params.shipModeId.toString());
    if (params.contractId != null) __params = __params.set('contractId', params.contractId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/store-defaults`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, shipModeId?: number, contractId?: string}>}>;
      })
    );
  }

  /**
   * Get a collection of store defaults.
   * @param params The `StoreDefaultsService.GetStoreDefaultsParams` containing the following parameters:
   *
   * - `id`: The Store.
   *
   * - `shipModeId`: The default shipping mode for the store.
   *
   * - `contractId`: The default contract for the store.
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
   * @return A collection of store default values.
   */
  getStoreDefaults(params: StoreDefaultsService.GetStoreDefaultsParams): __Observable<{count?: number, items?: Array<{id?: number, shipModeId?: number, contractId?: string}>}> {
    return this.getStoreDefaultsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, shipModeId?: number, contractId?: string}>})
    );
  }

  /**
   * Create a store default.
   * @param StoreDefault StoreDefault
   */
  createStoreDefaultResponse(StoreDefault: {id?: number, shipModeId?: number, contractId?: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = StoreDefault;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/store-defaults`,
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
   * Create a store default.
   * @param StoreDefault StoreDefault
   */
  createStoreDefault(StoreDefault: {id?: number, shipModeId?: number, contractId?: string}): __Observable<null> {
    return this.createStoreDefaultResponse(StoreDefault).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a store default.
   * @param params The `StoreDefaultsService.GetStoreDefaultByIdParams` containing the following parameters:
   *
   * - `id`: The Store.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return StoreDefault
   */
  getStoreDefaultByIdResponse(params: StoreDefaultsService.GetStoreDefaultByIdParams): __Observable<__StrictHttpResponse<{id?: number, shipModeId?: number, contractId?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/store-defaults/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, shipModeId?: number, contractId?: string}>;
      })
    );
  }

  /**
   * Get a store default.
   * @param params The `StoreDefaultsService.GetStoreDefaultByIdParams` containing the following parameters:
   *
   * - `id`: The Store.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return StoreDefault
   */
  getStoreDefaultById(params: StoreDefaultsService.GetStoreDefaultByIdParams): __Observable<{id?: number, shipModeId?: number, contractId?: string}> {
    return this.getStoreDefaultByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, shipModeId?: number, contractId?: string})
    );
  }

  /**
   * Delete a default.
   * @param id The Store.
   */
  deleteStoreDefaultByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/store-defaults/${id}`,
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
   * Delete a default.
   * @param id The Store.
   */
  deleteStoreDefaultById(id: number): __Observable<null> {
    return this.deleteStoreDefaultByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a store default.
   * @param params The `StoreDefaultsService.UpdateStoreDefaultByIdParams` containing the following parameters:
   *
   * - `StoreDefault`: StoreDefault
   *
   * - `id`: The Store.
   */
  updateStoreDefaultByIdResponse(params: StoreDefaultsService.UpdateStoreDefaultByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.StoreDefault;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/store-defaults/${params.id}`,
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
   * Update a store default.
   * @param params The `StoreDefaultsService.UpdateStoreDefaultByIdParams` containing the following parameters:
   *
   * - `StoreDefault`: StoreDefault
   *
   * - `id`: The Store.
   */
  updateStoreDefaultById(params: StoreDefaultsService.UpdateStoreDefaultByIdParams): __Observable<null> {
    return this.updateStoreDefaultByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module StoreDefaultsService {

  /**
   * Parameters for getStoreDefaults
   */
  export interface GetStoreDefaultsParams {

    /**
     * The Store.
     */
    id?: number;

    /**
     * The default shipping mode for the store.
     */
    shipModeId?: number;

    /**
     * The default contract for the store.
     */
    contractId?: string;

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
   * Parameters for getStoreDefaultById
   */
  export interface GetStoreDefaultByIdParams {

    /**
     * The Store.
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
   * Parameters for updateStoreDefaultById
   */
  export interface UpdateStoreDefaultByIdParams {

    /**
     * StoreDefault
     */
    StoreDefault: {id?: number, shipModeId?: number, contractId?: string};

    /**
     * The Store.
     */
    id: number;
  }
}

export { StoreDefaultsService }
