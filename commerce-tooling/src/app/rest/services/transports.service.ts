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
class TransportsService extends __BaseService {
  static readonly getTransportsPath = '/rest/admin/v2/transports';
  static readonly createTransportPath = '/rest/admin/v2/transports';
  static readonly getTransportByIdPath = '/rest/admin/v2/transports/{id}';
  static readonly deleteTransportByIdPath = '/rest/admin/v2/transports/{id}';
  static readonly updateTransportByIdPath = '/rest/admin/v2/transports/{id}';
  static readonly getConnectionSpecMetaInfoPath = '/rest/admin/v2/transports/{id}/connection-spec-meta-info';
  static readonly getInteractionSpecMetaInfoPath = '/rest/admin/v2/transports/{id}/interaction-spec-meta-info';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of Store transports.
   * @param params The `TransportsService.GetTransportsParams` containing the following parameters:
   *
   * - `id`: The transport ID.
   *
   * - `code`: The code of the transport.
   *
   * - `name`: The name of the transport.
   *
   * - `description`: The description.
   *
   * - `timeout`: The timeout.
   *
   * - `implemented`: If it is implemented.
   *
   * - `addressable`: If it is addressable.
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
  getTransportsResponse(params: TransportsService.GetTransportsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.code != null) __params = __params.set('code', params.code.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.timeout != null) __params = __params.set('timeout', params.timeout.toString());
    if (params.implemented != null) __params = __params.set('implemented', params.implemented.toString());
    if (params.addressable != null) __params = __params.set('addressable', params.addressable.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/transports`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string}>}>;
      })
    );
  }

  /**
   * Get a collection of Store transports.
   * @param params The `TransportsService.GetTransportsParams` containing the following parameters:
   *
   * - `id`: The transport ID.
   *
   * - `code`: The code of the transport.
   *
   * - `name`: The name of the transport.
   *
   * - `description`: The description.
   *
   * - `timeout`: The timeout.
   *
   * - `implemented`: If it is implemented.
   *
   * - `addressable`: If it is addressable.
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
  getTransports(params: TransportsService.GetTransportsParams): __Observable<{count?: number, items?: Array<{id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string}>}> {
    return this.getTransportsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string}>})
    );
  }

  /**
   * Create an Store transport.
   * @param Transport A store transport.
   */
  createTransportResponse(Transport: {id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Transport;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/transports`,
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
   * @param Transport A store transport.
   */
  createTransport(Transport: {id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string}): __Observable<null> {
    return this.createTransportResponse(Transport).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get an Store transport.
   * @param params The `TransportsService.GetTransportByIdParams` containing the following parameters:
   *
   * - `id`: The transport ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A store transport.
   */
  getTransportByIdResponse(params: TransportsService.GetTransportByIdParams): __Observable<__StrictHttpResponse<{id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/transports/${params.id}`,
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
   * Get an Store transport.
   * @param params The `TransportsService.GetTransportByIdParams` containing the following parameters:
   *
   * - `id`: The transport ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A store transport.
   */
  getTransportById(params: TransportsService.GetTransportByIdParams): __Observable<{id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string}> {
    return this.getTransportByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string})
    );
  }

  /**
   * Delete an Store transport.
   * @param id The transport ID.
   */
  deleteTransportByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/transports/${id}`,
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
   * @param id The transport ID.
   */
  deleteTransportById(id: number): __Observable<null> {
    return this.deleteTransportByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update an Store transport.
   * @param params The `TransportsService.UpdateTransportByIdParams` containing the following parameters:
   *
   * - `Transport`: A store transport.
   *
   * - `id`: The transport ID.
   */
  updateTransportByIdResponse(params: TransportsService.UpdateTransportByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.Transport;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/transports/${params.id}`,
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
   * @param params The `TransportsService.UpdateTransportByIdParams` containing the following parameters:
   *
   * - `Transport`: A store transport.
   *
   * - `id`: The transport ID.
   */
  updateTransportById(params: TransportsService.UpdateTransportByIdParams): __Observable<null> {
    return this.updateTransportByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id The unique numeric ID for identifying the transport.
   * @return The operation is successful.
   */
  getConnectionSpecMetaInfoResponse(id: number): __Observable<__StrictHttpResponse<{properties?: Array<{name?: string, encrypt?: boolean, value?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/transports/${id}/connection-spec-meta-info`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{properties?: Array<{name?: string, encrypt?: boolean, value?: string}>}>;
      })
    );
  }

  /**
   * @param id The unique numeric ID for identifying the transport.
   * @return The operation is successful.
   */
  getConnectionSpecMetaInfo(id: number): __Observable<{properties?: Array<{name?: string, encrypt?: boolean, value?: string}>}> {
    return this.getConnectionSpecMetaInfoResponse(id).pipe(
      __map(_r => _r.body as {properties?: Array<{name?: string, encrypt?: boolean, value?: string}>})
    );
  }

  /**
   * @param id The unique numeric ID for identifying the transport.
   * @return The operation is successful.
   */
  getInteractionSpecMetaInfoResponse(id: number): __Observable<__StrictHttpResponse<{properties?: Array<{name?: string, encrypt?: boolean, value?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/transports/${id}/interaction-spec-meta-info`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{properties?: Array<{name?: string, encrypt?: boolean, value?: string}>}>;
      })
    );
  }

  /**
   * @param id The unique numeric ID for identifying the transport.
   * @return The operation is successful.
   */
  getInteractionSpecMetaInfo(id: number): __Observable<{properties?: Array<{name?: string, encrypt?: boolean, value?: string}>}> {
    return this.getInteractionSpecMetaInfoResponse(id).pipe(
      __map(_r => _r.body as {properties?: Array<{name?: string, encrypt?: boolean, value?: string}>})
    );
  }
}

module TransportsService {

  /**
   * Parameters for getTransports
   */
  export interface GetTransportsParams {

    /**
     * The transport ID.
     */
    id?: number;

    /**
     * The code of the transport.
     */
    code?: string;

    /**
     * The name of the transport.
     */
    name?: string;

    /**
     * The description.
     */
    description?: string;

    /**
     * The timeout.
     */
    timeout?: number;

    /**
     * If it is implemented.
     */
    implemented?: string;

    /**
     * If it is addressable.
     */
    addressable?: string;

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
   * Parameters for getTransportById
   */
  export interface GetTransportByIdParams {

    /**
     * The transport ID.
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
   * Parameters for updateTransportById
   */
  export interface UpdateTransportByIdParams {

    /**
     * A store transport.
     */
    Transport: {id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string};

    /**
     * The transport ID.
     */
    id: number;
  }
}

export { TransportsService }
