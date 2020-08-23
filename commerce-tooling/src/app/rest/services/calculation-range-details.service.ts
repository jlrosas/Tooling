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
class CalculationRangeDetailsService extends __BaseService {
  static readonly getCalculationRangeDetailsPath = '/rest/admin/v2/calculation-range-details';
  static readonly createCalculationRangeDetailPath = '/rest/admin/v2/calculation-range-details';
  static readonly getCalculationRangeDetailByIdPath = '/rest/admin/v2/calculation-range-details/{id}';
  static readonly deleteCalculationRangeDetailByIdPath = '/rest/admin/v2/calculation-range-details/{id}';
  static readonly updateCalculationRangeDetailByIdPath = '/rest/admin/v2/calculation-range-details/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of Calculation Range Details.
   * @param params The `CalculationRangeDetailsService.GetCalculationRangeDetailsParams` containing the following parameters:
   *
   * - `id`: The Calculation Range Detail ID.
   *
   * - `calculationRangeId`: The Calculation Range ID.
   *
   * - `currency`: This is the currency of the monetary amount in the VALUE column. This is a currency code as per ISO 4217 standards.
   *
   * - `value`: The monetary amount of the shipping charges.
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
   * @return A collection of Calculation Range Details.
   */
  getCalculationRangeDetailsResponse(params: CalculationRangeDetailsService.GetCalculationRangeDetailsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, calculationRangeId?: number, currency?: string, value?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.id || []).forEach(val => {if (val != null) __params = __params.append('id', val.toString())});
    (params.calculationRangeId || []).forEach(val => {if (val != null) __params = __params.append('calculationRangeId', val.toString())});
    if (params.currency != null) __params = __params.set('currency', params.currency.toString());
    if (params.value != null) __params = __params.set('value', params.value.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/calculation-range-details`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, calculationRangeId?: number, currency?: string, value?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of Calculation Range Details.
   * @param params The `CalculationRangeDetailsService.GetCalculationRangeDetailsParams` containing the following parameters:
   *
   * - `id`: The Calculation Range Detail ID.
   *
   * - `calculationRangeId`: The Calculation Range ID.
   *
   * - `currency`: This is the currency of the monetary amount in the VALUE column. This is a currency code as per ISO 4217 standards.
   *
   * - `value`: The monetary amount of the shipping charges.
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
   * @return A collection of Calculation Range Details.
   */
  getCalculationRangeDetails(params: CalculationRangeDetailsService.GetCalculationRangeDetailsParams): __Observable<{count?: number, items?: Array<{id?: number, calculationRangeId?: number, currency?: string, value?: number}>}> {
    return this.getCalculationRangeDetailsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, calculationRangeId?: number, currency?: string, value?: number}>})
    );
  }

  /**
   * Create a Calculation Range Detail.
   * @param CalculationRangeDetail A Calculation Range Detail.
   */
  createCalculationRangeDetailResponse(CalculationRangeDetail: {id?: number, calculationRangeId?: number, currency?: string, value?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CalculationRangeDetail;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/calculation-range-details`,
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
   * Create a Calculation Range Detail.
   * @param CalculationRangeDetail A Calculation Range Detail.
   */
  createCalculationRangeDetail(CalculationRangeDetail: {id?: number, calculationRangeId?: number, currency?: string, value?: number}): __Observable<null> {
    return this.createCalculationRangeDetailResponse(CalculationRangeDetail).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a Calculation Range Detail.
   * @param params The `CalculationRangeDetailsService.GetCalculationRangeDetailByIdParams` containing the following parameters:
   *
   * - `id`: The Calculation Range Detail ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Calculation Range Detail.
   */
  getCalculationRangeDetailByIdResponse(params: CalculationRangeDetailsService.GetCalculationRangeDetailByIdParams): __Observable<__StrictHttpResponse<{id?: number, calculationRangeId?: number, currency?: string, value?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/calculation-range-details/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, calculationRangeId?: number, currency?: string, value?: number}>;
      })
    );
  }

  /**
   * Get a Calculation Range Detail.
   * @param params The `CalculationRangeDetailsService.GetCalculationRangeDetailByIdParams` containing the following parameters:
   *
   * - `id`: The Calculation Range Detail ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Calculation Range Detail.
   */
  getCalculationRangeDetailById(params: CalculationRangeDetailsService.GetCalculationRangeDetailByIdParams): __Observable<{id?: number, calculationRangeId?: number, currency?: string, value?: number}> {
    return this.getCalculationRangeDetailByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, calculationRangeId?: number, currency?: string, value?: number})
    );
  }

  /**
   * Delete a Calculation Range Detail.
   * @param id The Calculation Range Detail ID.
   */
  deleteCalculationRangeDetailByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/calculation-range-details/${id}`,
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
   * Delete a Calculation Range Detail.
   * @param id The Calculation Range Detail ID.
   */
  deleteCalculationRangeDetailById(id: number): __Observable<null> {
    return this.deleteCalculationRangeDetailByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a Calculation Range Detail.
   * @param params The `CalculationRangeDetailsService.UpdateCalculationRangeDetailByIdParams` containing the following parameters:
   *
   * - `CalculationRangeDetail`: A Calculation Range Detail.
   *
   * - `id`: The Calculation Range Detail ID.
   */
  updateCalculationRangeDetailByIdResponse(params: CalculationRangeDetailsService.UpdateCalculationRangeDetailByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.CalculationRangeDetail;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/calculation-range-details/${params.id}`,
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
   * Update a Calculation Range Detail.
   * @param params The `CalculationRangeDetailsService.UpdateCalculationRangeDetailByIdParams` containing the following parameters:
   *
   * - `CalculationRangeDetail`: A Calculation Range Detail.
   *
   * - `id`: The Calculation Range Detail ID.
   */
  updateCalculationRangeDetailById(params: CalculationRangeDetailsService.UpdateCalculationRangeDetailByIdParams): __Observable<null> {
    return this.updateCalculationRangeDetailByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CalculationRangeDetailsService {

  /**
   * Parameters for getCalculationRangeDetails
   */
  export interface GetCalculationRangeDetailsParams {

    /**
     * The Calculation Range Detail ID.
     */
    id?: Array<number>;

    /**
     * The Calculation Range ID.
     */
    calculationRangeId?: Array<number>;

    /**
     * This is the currency of the monetary amount in the VALUE column. This is a currency code as per ISO 4217 standards.
     */
    currency?: string;

    /**
     * The monetary amount of the shipping charges.
     */
    value?: number;

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
   * Parameters for getCalculationRangeDetailById
   */
  export interface GetCalculationRangeDetailByIdParams {

    /**
     * The Calculation Range Detail ID.
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
   * Parameters for updateCalculationRangeDetailById
   */
  export interface UpdateCalculationRangeDetailByIdParams {

    /**
     * A Calculation Range Detail.
     */
    CalculationRangeDetail: {id?: number, calculationRangeId?: number, currency?: string, value?: number};

    /**
     * The Calculation Range Detail ID.
     */
    id: number;
  }
}

export { CalculationRangeDetailsService }
