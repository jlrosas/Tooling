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
class CalculationRangesService extends __BaseService {
  static readonly getCalculationRangesPath = '/rest/admin/v2/calculation-ranges';
  static readonly createCalculationRangePath = '/rest/admin/v2/calculation-ranges';
  static readonly getCalculationRangeByIdPath = '/rest/admin/v2/calculation-ranges/{id}';
  static readonly deleteCalculationRangeByIdPath = '/rest/admin/v2/calculation-ranges/{id}';
  static readonly updateCalculationRangeByIdPath = '/rest/admin/v2/calculation-ranges/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of calculation range.
   * @param params The `CalculationRangesService.GetCalculationRangesParams` containing the following parameters:
   *
   * - `id`: The calculation range ID.
   *
   * - `cumulative`: Valid values, 0 = only the matching Calculation Range with the highest RANGE START value is used. 1 = all matching Calculation Ranges are used. The calculated monetary amounts are summed to arrive at the final result.
   *
   * - `rangeStart`: If a lookup number is greater than or equal to RANGE START, or if RANGE START is NULL, this row matches the lookup number.
   *
   * - `field1`: Customizable.
   *
   * - `field2`: Customizable.
   *
   * - `field3`: Customizable.
   *
   * - `markForDelete`: Reserved for HCL Internal use.
   *
   * - `calculationMethodId`: The Calculation Range Method that determines a monetary amount from the Calculation Range Lookup Result.
   *
   * - `calculationScaleId`: The Calculation Scale of which this Calculation Range is a part.
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
   * @return A collection of calculation range.
   */
  getCalculationRangesResponse(params: CalculationRangesService.GetCalculationRangesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, cumulative?: number, rangeStart?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, calculationMethodId?: number, calculationScaleId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.id || []).forEach(val => {if (val != null) __params = __params.append('id', val.toString())});
    if (params.cumulative != null) __params = __params.set('cumulative', params.cumulative.toString());
    if (params.rangeStart != null) __params = __params.set('rangeStart', params.rangeStart.toString());
    if (params.field1 != null) __params = __params.set('field1', params.field1.toString());
    if (params.field2 != null) __params = __params.set('field2', params.field2.toString());
    if (params.field3 != null) __params = __params.set('field3', params.field3.toString());
    if (params.markForDelete != null) __params = __params.set('markForDelete', params.markForDelete.toString());
    if (params.calculationMethodId != null) __params = __params.set('calculationMethodId', params.calculationMethodId.toString());
    (params.calculationScaleId || []).forEach(val => {if (val != null) __params = __params.append('calculationScaleId', val.toString())});
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/calculation-ranges`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, cumulative?: number, rangeStart?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, calculationMethodId?: number, calculationScaleId?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of calculation range.
   * @param params The `CalculationRangesService.GetCalculationRangesParams` containing the following parameters:
   *
   * - `id`: The calculation range ID.
   *
   * - `cumulative`: Valid values, 0 = only the matching Calculation Range with the highest RANGE START value is used. 1 = all matching Calculation Ranges are used. The calculated monetary amounts are summed to arrive at the final result.
   *
   * - `rangeStart`: If a lookup number is greater than or equal to RANGE START, or if RANGE START is NULL, this row matches the lookup number.
   *
   * - `field1`: Customizable.
   *
   * - `field2`: Customizable.
   *
   * - `field3`: Customizable.
   *
   * - `markForDelete`: Reserved for HCL Internal use.
   *
   * - `calculationMethodId`: The Calculation Range Method that determines a monetary amount from the Calculation Range Lookup Result.
   *
   * - `calculationScaleId`: The Calculation Scale of which this Calculation Range is a part.
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
   * @return A collection of calculation range.
   */
  getCalculationRanges(params: CalculationRangesService.GetCalculationRangesParams): __Observable<{count?: number, items?: Array<{id?: number, cumulative?: number, rangeStart?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, calculationMethodId?: number, calculationScaleId?: number}>}> {
    return this.getCalculationRangesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, cumulative?: number, rangeStart?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, calculationMethodId?: number, calculationScaleId?: number}>})
    );
  }

  /**
   * Create a calculation range.
   * @param CalculationRange A calculation ranges.
   */
  createCalculationRangeResponse(CalculationRange: {id?: number, cumulative?: number, rangeStart?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, calculationMethodId?: number, calculationScaleId?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CalculationRange;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/calculation-ranges`,
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
   * Create a calculation range.
   * @param CalculationRange A calculation ranges.
   */
  createCalculationRange(CalculationRange: {id?: number, cumulative?: number, rangeStart?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, calculationMethodId?: number, calculationScaleId?: number}): __Observable<null> {
    return this.createCalculationRangeResponse(CalculationRange).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a calculation range.
   * @param params The `CalculationRangesService.GetCalculationRangeByIdParams` containing the following parameters:
   *
   * - `id`: The calculation range ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A calculation ranges.
   */
  getCalculationRangeByIdResponse(params: CalculationRangesService.GetCalculationRangeByIdParams): __Observable<__StrictHttpResponse<{id?: number, cumulative?: number, rangeStart?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, calculationMethodId?: number, calculationScaleId?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/calculation-ranges/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, cumulative?: number, rangeStart?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, calculationMethodId?: number, calculationScaleId?: number}>;
      })
    );
  }

  /**
   * Get a calculation range.
   * @param params The `CalculationRangesService.GetCalculationRangeByIdParams` containing the following parameters:
   *
   * - `id`: The calculation range ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A calculation ranges.
   */
  getCalculationRangeById(params: CalculationRangesService.GetCalculationRangeByIdParams): __Observable<{id?: number, cumulative?: number, rangeStart?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, calculationMethodId?: number, calculationScaleId?: number}> {
    return this.getCalculationRangeByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, cumulative?: number, rangeStart?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, calculationMethodId?: number, calculationScaleId?: number})
    );
  }

  /**
   * Delete a calculation range.
   * @param id The calculation range ID.
   */
  deleteCalculationRangeByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/calculation-ranges/${id}`,
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
   * Delete a calculation range.
   * @param id The calculation range ID.
   */
  deleteCalculationRangeById(id: number): __Observable<null> {
    return this.deleteCalculationRangeByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a calculation range.
   * @param params The `CalculationRangesService.UpdateCalculationRangeByIdParams` containing the following parameters:
   *
   * - `CalculationRange`: A calculation ranges.
   *
   * - `id`: The calculation range ID.
   */
  updateCalculationRangeByIdResponse(params: CalculationRangesService.UpdateCalculationRangeByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.CalculationRange;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/calculation-ranges/${params.id}`,
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
   * Update a calculation range.
   * @param params The `CalculationRangesService.UpdateCalculationRangeByIdParams` containing the following parameters:
   *
   * - `CalculationRange`: A calculation ranges.
   *
   * - `id`: The calculation range ID.
   */
  updateCalculationRangeById(params: CalculationRangesService.UpdateCalculationRangeByIdParams): __Observable<null> {
    return this.updateCalculationRangeByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CalculationRangesService {

  /**
   * Parameters for getCalculationRanges
   */
  export interface GetCalculationRangesParams {

    /**
     * The calculation range ID.
     */
    id?: Array<number>;

    /**
     * Valid values, 0 = only the matching Calculation Range with the highest RANGE START value is used. 1 = all matching Calculation Ranges are used. The calculated monetary amounts are summed to arrive at the final result.
     */
    cumulative?: number;

    /**
     * If a lookup number is greater than or equal to RANGE START, or if RANGE START is NULL, this row matches the lookup number.
     */
    rangeStart?: number;

    /**
     * Customizable.
     */
    field1?: number;

    /**
     * Customizable.
     */
    field2?: number;

    /**
     * Customizable.
     */
    field3?: string;

    /**
     * Reserved for HCL Internal use.
     */
    markForDelete?: number;

    /**
     * The Calculation Range Method that determines a monetary amount from the Calculation Range Lookup Result.
     */
    calculationMethodId?: number;

    /**
     * The Calculation Scale of which this Calculation Range is a part.
     */
    calculationScaleId?: Array<number>;

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
   * Parameters for getCalculationRangeById
   */
  export interface GetCalculationRangeByIdParams {

    /**
     * The calculation range ID.
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
   * Parameters for updateCalculationRangeById
   */
  export interface UpdateCalculationRangeByIdParams {

    /**
     * A calculation ranges.
     */
    CalculationRange: {id?: number, cumulative?: number, rangeStart?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, calculationMethodId?: number, calculationScaleId?: number};

    /**
     * The calculation range ID.
     */
    id: number;
  }
}

export { CalculationRangesService }
