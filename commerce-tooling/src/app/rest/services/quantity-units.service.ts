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
class QuantityUnitsService extends __BaseService {
  static readonly getQuantityUnitsPath = '/rest/admin/v2/quantity-units';
  static readonly createQuantityUnitPath = '/rest/admin/v2/quantity-units';
  static readonly getQuantityUnitByIdPath = '/rest/admin/v2/quantity-units/{id}';
  static readonly deleteQuantityUnitByIdPath = '/rest/admin/v2/quantity-units/{id}';
  static readonly updateQuantityUnitByIdPath = '/rest/admin/v2/quantity-units/{id}';
  static readonly getDescriptionsOfQuantityUnitPath = '/rest/admin/v2/quantity-units/{id}/descriptions';
  static readonly getConversionsToOfQuantityUnitPath = '/rest/admin/v2/quantity-units/{id}/conversions-to';
  static readonly getConversionsFromOfQuantityUnitPath = '/rest/admin/v2/quantity-units/{id}/conversions-from';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of Quantity Units.
   * @param params The `QuantityUnitsService.GetQuantityUnitsParams` containing the following parameters:
   *
   * - `id`: The Qunatity Unit ID.
   *
   * - `field1`: A customizable field.
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
   * @return A collection of Quantity Units, such as kilogram, meter, liter, pound, foot, quart etc.
   */
  getQuantityUnitsResponse(params: QuantityUnitsService.GetQuantityUnitsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: string, field1?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.field1 != null) __params = __params.set('field1', params.field1.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/quantity-units`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: string, field1?: string}>}>;
      })
    );
  }

  /**
   * Get a collection of Quantity Units.
   * @param params The `QuantityUnitsService.GetQuantityUnitsParams` containing the following parameters:
   *
   * - `id`: The Qunatity Unit ID.
   *
   * - `field1`: A customizable field.
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
   * @return A collection of Quantity Units, such as kilogram, meter, liter, pound, foot, quart etc.
   */
  getQuantityUnits(params: QuantityUnitsService.GetQuantityUnitsParams): __Observable<{count?: number, items?: Array<{id?: string, field1?: string}>}> {
    return this.getQuantityUnitsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: string, field1?: string}>})
    );
  }

  /**
   * Create a Quantity Unit.
   * @param QuantityUnit A Quantity Unit.
   */
  createQuantityUnitResponse(QuantityUnit: {id?: string, field1?: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = QuantityUnit;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/quantity-units`,
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
   * Create a Quantity Unit.
   * @param QuantityUnit A Quantity Unit.
   */
  createQuantityUnit(QuantityUnit: {id?: string, field1?: string}): __Observable<null> {
    return this.createQuantityUnitResponse(QuantityUnit).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a Quantity Unit.
   * @param params The `QuantityUnitsService.GetQuantityUnitByIdParams` containing the following parameters:
   *
   * - `id`: The Qunatity Unit ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Quantity Unit.
   */
  getQuantityUnitByIdResponse(params: QuantityUnitsService.GetQuantityUnitByIdParams): __Observable<__StrictHttpResponse<{id?: string, field1?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/quantity-units/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: string, field1?: string}>;
      })
    );
  }

  /**
   * Get a Quantity Unit.
   * @param params The `QuantityUnitsService.GetQuantityUnitByIdParams` containing the following parameters:
   *
   * - `id`: The Qunatity Unit ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Quantity Unit.
   */
  getQuantityUnitById(params: QuantityUnitsService.GetQuantityUnitByIdParams): __Observable<{id?: string, field1?: string}> {
    return this.getQuantityUnitByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: string, field1?: string})
    );
  }

  /**
   * Delete a Quantity Unit.
   * @param id The Qunatity Unit ID.
   */
  deleteQuantityUnitByIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/quantity-units/${id}`,
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
   * Delete a Quantity Unit.
   * @param id The Qunatity Unit ID.
   */
  deleteQuantityUnitById(id: string): __Observable<null> {
    return this.deleteQuantityUnitByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a Quantity Unit.
   * @param params The `QuantityUnitsService.UpdateQuantityUnitByIdParams` containing the following parameters:
   *
   * - `QuantityUnit`: A Quantity Unit.
   *
   * - `id`: The Qunatity Unit ID.
   */
  updateQuantityUnitByIdResponse(params: QuantityUnitsService.UpdateQuantityUnitByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.QuantityUnit;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/quantity-units/${params.id}`,
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
   * Update a Quantity Unit.
   * @param params The `QuantityUnitsService.UpdateQuantityUnitByIdParams` containing the following parameters:
   *
   * - `QuantityUnit`: A Quantity Unit.
   *
   * - `id`: The Qunatity Unit ID.
   */
  updateQuantityUnitById(params: QuantityUnitsService.UpdateQuantityUnitByIdParams): __Observable<null> {
    return this.updateQuantityUnitByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `QuantityUnitsService.GetDescriptionsOfQuantityUnitParams` containing the following parameters:
   *
   * - `id`: The Qunatity Unit ID.
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
   * @return A collection of Quantity Unit descriptions.
   */
  getDescriptionsOfQuantityUnitResponse(params: QuantityUnitsService.GetDescriptionsOfQuantityUnitParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{quantityUnitId?: string, languageId?: number, description?: string}>}>> {
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
      this.rootUrl + `/rest/admin/v2/quantity-units/${params.id}/descriptions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{quantityUnitId?: string, languageId?: number, description?: string}>}>;
      })
    );
  }

  /**
   * @param params The `QuantityUnitsService.GetDescriptionsOfQuantityUnitParams` containing the following parameters:
   *
   * - `id`: The Qunatity Unit ID.
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
   * @return A collection of Quantity Unit descriptions.
   */
  getDescriptionsOfQuantityUnit(params: QuantityUnitsService.GetDescriptionsOfQuantityUnitParams): __Observable<{count?: number, items?: Array<{quantityUnitId?: string, languageId?: number, description?: string}>}> {
    return this.getDescriptionsOfQuantityUnitResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{quantityUnitId?: string, languageId?: number, description?: string}>})
    );
  }

  /**
   * @param params The `QuantityUnitsService.GetConversionsToOfQuantityUnitParams` containing the following parameters:
   *
   * - `id`: The Qunatity Unit ID.
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
   * @return A quantity unit conversion descriptions.
   */
  getConversionsToOfQuantityUnitResponse(params: QuantityUnitsService.GetConversionsToOfQuantityUnitParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, conversionFactor?: number, multiplyOrDivide?: string, updatable?: string, toQuantityUnit?: string, fromQuantityUnit?: string}>}>> {
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
      this.rootUrl + `/rest/admin/v2/quantity-units/${params.id}/conversions-to`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, conversionFactor?: number, multiplyOrDivide?: string, updatable?: string, toQuantityUnit?: string, fromQuantityUnit?: string}>}>;
      })
    );
  }

  /**
   * @param params The `QuantityUnitsService.GetConversionsToOfQuantityUnitParams` containing the following parameters:
   *
   * - `id`: The Qunatity Unit ID.
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
   * @return A quantity unit conversion descriptions.
   */
  getConversionsToOfQuantityUnit(params: QuantityUnitsService.GetConversionsToOfQuantityUnitParams): __Observable<{count?: number, items?: Array<{id?: number, conversionFactor?: number, multiplyOrDivide?: string, updatable?: string, toQuantityUnit?: string, fromQuantityUnit?: string}>}> {
    return this.getConversionsToOfQuantityUnitResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, conversionFactor?: number, multiplyOrDivide?: string, updatable?: string, toQuantityUnit?: string, fromQuantityUnit?: string}>})
    );
  }

  /**
   * @param params The `QuantityUnitsService.GetConversionsFromOfQuantityUnitParams` containing the following parameters:
   *
   * - `id`: The Qunatity Unit ID.
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
   * @return A quantity unit conversion descriptions.
   */
  getConversionsFromOfQuantityUnitResponse(params: QuantityUnitsService.GetConversionsFromOfQuantityUnitParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, conversionFactor?: number, multiplyOrDivide?: string, updatable?: string, toQuantityUnit?: string, fromQuantityUnit?: string}>}>> {
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
      this.rootUrl + `/rest/admin/v2/quantity-units/${params.id}/conversions-from`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, conversionFactor?: number, multiplyOrDivide?: string, updatable?: string, toQuantityUnit?: string, fromQuantityUnit?: string}>}>;
      })
    );
  }

  /**
   * @param params The `QuantityUnitsService.GetConversionsFromOfQuantityUnitParams` containing the following parameters:
   *
   * - `id`: The Qunatity Unit ID.
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
   * @return A quantity unit conversion descriptions.
   */
  getConversionsFromOfQuantityUnit(params: QuantityUnitsService.GetConversionsFromOfQuantityUnitParams): __Observable<{count?: number, items?: Array<{id?: number, conversionFactor?: number, multiplyOrDivide?: string, updatable?: string, toQuantityUnit?: string, fromQuantityUnit?: string}>}> {
    return this.getConversionsFromOfQuantityUnitResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, conversionFactor?: number, multiplyOrDivide?: string, updatable?: string, toQuantityUnit?: string, fromQuantityUnit?: string}>})
    );
  }
}

module QuantityUnitsService {

  /**
   * Parameters for getQuantityUnits
   */
  export interface GetQuantityUnitsParams {

    /**
     * The Qunatity Unit ID.
     */
    id?: string;

    /**
     * A customizable field.
     */
    field1?: string;

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
   * Parameters for getQuantityUnitById
   */
  export interface GetQuantityUnitByIdParams {

    /**
     * The Qunatity Unit ID.
     */
    id: string;

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
   * Parameters for updateQuantityUnitById
   */
  export interface UpdateQuantityUnitByIdParams {

    /**
     * A Quantity Unit.
     */
    QuantityUnit: {id?: string, field1?: string};

    /**
     * The Qunatity Unit ID.
     */
    id: string;
  }

  /**
   * Parameters for getDescriptionsOfQuantityUnit
   */
  export interface GetDescriptionsOfQuantityUnitParams {

    /**
     * The Qunatity Unit ID.
     */
    id: string;

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
   * Parameters for getConversionsToOfQuantityUnit
   */
  export interface GetConversionsToOfQuantityUnitParams {

    /**
     * The Qunatity Unit ID.
     */
    id: string;

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
   * Parameters for getConversionsFromOfQuantityUnit
   */
  export interface GetConversionsFromOfQuantityUnitParams {

    /**
     * The Qunatity Unit ID.
     */
    id: string;

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

export { QuantityUnitsService }
