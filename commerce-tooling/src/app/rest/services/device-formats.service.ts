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
class DeviceFormatsService extends __BaseService {
  static readonly getDeviceFormatsPath = '/rest/admin/v2/device-formats';
  static readonly createDeviceFormatPath = '/rest/admin/v2/device-formats';
  static readonly getDeviceFormatByIdPath = '/rest/admin/v2/device-formats/{id}';
  static readonly deleteDeviceFormatByIdPath = '/rest/admin/v2/device-formats/{id}';
  static readonly updateDeviceFormatByIdPath = '/rest/admin/v2/device-formats/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of device formats.
   * @param params The `DeviceFormatsService.GetDeviceFormatsParams` containing the following parameters:
   *
   * - `id`: The device format ID.
   *
   * - `deviceTypeId`: Device format ID.
   *
   * - `name`: Display name for the device format.
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
   * @return A collection of device format.
   */
  getDeviceFormatsResponse(params: DeviceFormatsService.GetDeviceFormatsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, deviceTypeId?: string, name?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.deviceTypeId != null) __params = __params.set('deviceTypeId', params.deviceTypeId.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/device-formats`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, deviceTypeId?: string, name?: string}>}>;
      })
    );
  }

  /**
   * Get a collection of device formats.
   * @param params The `DeviceFormatsService.GetDeviceFormatsParams` containing the following parameters:
   *
   * - `id`: The device format ID.
   *
   * - `deviceTypeId`: Device format ID.
   *
   * - `name`: Display name for the device format.
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
   * @return A collection of device format.
   */
  getDeviceFormats(params: DeviceFormatsService.GetDeviceFormatsParams): __Observable<{count?: number, items?: Array<{id?: number, deviceTypeId?: string, name?: string}>}> {
    return this.getDeviceFormatsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, deviceTypeId?: string, name?: string}>})
    );
  }

  /**
   * Create a device format.
   * @param DeviceFormat A device format
   */
  createDeviceFormatResponse(DeviceFormat: {id?: number, deviceTypeId?: string, name?: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = DeviceFormat;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/device-formats`,
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
   * Create a device format.
   * @param DeviceFormat A device format
   */
  createDeviceFormat(DeviceFormat: {id?: number, deviceTypeId?: string, name?: string}): __Observable<null> {
    return this.createDeviceFormatResponse(DeviceFormat).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a device format.
   * @param params The `DeviceFormatsService.GetDeviceFormatByIdParams` containing the following parameters:
   *
   * - `id`: The device format ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A device format
   */
  getDeviceFormatByIdResponse(params: DeviceFormatsService.GetDeviceFormatByIdParams): __Observable<__StrictHttpResponse<{id?: number, deviceTypeId?: string, name?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/device-formats/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, deviceTypeId?: string, name?: string}>;
      })
    );
  }

  /**
   * Get a device format.
   * @param params The `DeviceFormatsService.GetDeviceFormatByIdParams` containing the following parameters:
   *
   * - `id`: The device format ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A device format
   */
  getDeviceFormatById(params: DeviceFormatsService.GetDeviceFormatByIdParams): __Observable<{id?: number, deviceTypeId?: string, name?: string}> {
    return this.getDeviceFormatByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, deviceTypeId?: string, name?: string})
    );
  }

  /**
   * Delete a device format.
   * @param id The device format ID.
   */
  deleteDeviceFormatByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/device-formats/${id}`,
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
   * Delete a device format.
   * @param id The device format ID.
   */
  deleteDeviceFormatById(id: number): __Observable<null> {
    return this.deleteDeviceFormatByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a device format.
   * @param params The `DeviceFormatsService.UpdateDeviceFormatByIdParams` containing the following parameters:
   *
   * - `DeviceFormat`: A device format
   *
   * - `id`: The device format ID.
   */
  updateDeviceFormatByIdResponse(params: DeviceFormatsService.UpdateDeviceFormatByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.DeviceFormat;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/device-formats/${params.id}`,
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
   * Update a device format.
   * @param params The `DeviceFormatsService.UpdateDeviceFormatByIdParams` containing the following parameters:
   *
   * - `DeviceFormat`: A device format
   *
   * - `id`: The device format ID.
   */
  updateDeviceFormatById(params: DeviceFormatsService.UpdateDeviceFormatByIdParams): __Observable<null> {
    return this.updateDeviceFormatByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module DeviceFormatsService {

  /**
   * Parameters for getDeviceFormats
   */
  export interface GetDeviceFormatsParams {

    /**
     * The device format ID.
     */
    id?: number;

    /**
     * Device format ID.
     */
    deviceTypeId?: string;

    /**
     * Display name for the device format.
     */
    name?: string;

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
   * Parameters for getDeviceFormatById
   */
  export interface GetDeviceFormatByIdParams {

    /**
     * The device format ID.
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
   * Parameters for updateDeviceFormatById
   */
  export interface UpdateDeviceFormatByIdParams {

    /**
     * A device format
     */
    DeviceFormat: {id?: number, deviceTypeId?: string, name?: string};

    /**
     * The device format ID.
     */
    id: number;
  }
}

export { DeviceFormatsService }
