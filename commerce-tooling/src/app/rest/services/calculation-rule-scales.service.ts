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
class CalculationRuleScalesService extends __BaseService {
  static readonly getCalculationRuleScalesPath = '/rest/admin/v2/calculation-rule-scales';
  static readonly createCalculationRuleScalePath = '/rest/admin/v2/calculation-rule-scales';
  static readonly getCalculationRuleScaleByIdPath = '/rest/admin/v2/calculation-rule-scales/calculationRuleId:{calculationRuleId},calculationScaleId:{calculationScaleId}';
  static readonly deleteCalculationRuleScaleByIdPath = '/rest/admin/v2/calculation-rule-scales/calculationRuleId:{calculationRuleId},calculationScaleId:{calculationScaleId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of calculation-rule-scale.
   * @param params The `CalculationRuleScalesService.GetCalculationRuleScalesParams` containing the following parameters:
   *
   * - `calculationScaleId`: The calculation scale ID.
   *
   * - `calculationRuleId`: The calculation rule ID.
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
   * @return A collection of calculation-rule-scale.
   */
  getCalculationRuleScalesResponse(params: CalculationRuleScalesService.GetCalculationRuleScalesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{calculationScaleId?: number, calculationRuleId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.calculationScaleId || []).forEach(val => {if (val != null) __params = __params.append('calculationScaleId', val.toString())});
    (params.calculationRuleId || []).forEach(val => {if (val != null) __params = __params.append('calculationRuleId', val.toString())});
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/calculation-rule-scales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{calculationScaleId?: number, calculationRuleId?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of calculation-rule-scale.
   * @param params The `CalculationRuleScalesService.GetCalculationRuleScalesParams` containing the following parameters:
   *
   * - `calculationScaleId`: The calculation scale ID.
   *
   * - `calculationRuleId`: The calculation rule ID.
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
   * @return A collection of calculation-rule-scale.
   */
  getCalculationRuleScales(params: CalculationRuleScalesService.GetCalculationRuleScalesParams): __Observable<{count?: number, items?: Array<{calculationScaleId?: number, calculationRuleId?: number}>}> {
    return this.getCalculationRuleScalesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{calculationScaleId?: number, calculationRuleId?: number}>})
    );
  }

  /**
   * Create a calculation-rule-scale.
   * @param CalculationRuleScale A calculation-rule-scale.
   */
  createCalculationRuleScaleResponse(CalculationRuleScale: {calculationScaleId?: number, calculationRuleId?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CalculationRuleScale;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/calculation-rule-scales`,
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
   * Create a calculation-rule-scale.
   * @param CalculationRuleScale A calculation-rule-scale.
   */
  createCalculationRuleScale(CalculationRuleScale: {calculationScaleId?: number, calculationRuleId?: number}): __Observable<null> {
    return this.createCalculationRuleScaleResponse(CalculationRuleScale).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a calculation-rule-scale.
   * @param params The `CalculationRuleScalesService.GetCalculationRuleScaleByIdParams` containing the following parameters:
   *
   * - `calculationRuleId`: The calculation rule ID.
   *
   * - `calculationScaleId`: The calculation scale ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A calculation-rule-scale.
   */
  getCalculationRuleScaleByIdResponse(params: CalculationRuleScalesService.GetCalculationRuleScaleByIdParams): __Observable<__StrictHttpResponse<{calculationScaleId?: number, calculationRuleId?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/calculation-rule-scales/calculationRuleId:${params.calculationRuleId},calculationScaleId:${params.calculationScaleId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{calculationScaleId?: number, calculationRuleId?: number}>;
      })
    );
  }

  /**
   * Get a calculation-rule-scale.
   * @param params The `CalculationRuleScalesService.GetCalculationRuleScaleByIdParams` containing the following parameters:
   *
   * - `calculationRuleId`: The calculation rule ID.
   *
   * - `calculationScaleId`: The calculation scale ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A calculation-rule-scale.
   */
  getCalculationRuleScaleById(params: CalculationRuleScalesService.GetCalculationRuleScaleByIdParams): __Observable<{calculationScaleId?: number, calculationRuleId?: number}> {
    return this.getCalculationRuleScaleByIdResponse(params).pipe(
      __map(_r => _r.body as {calculationScaleId?: number, calculationRuleId?: number})
    );
  }

  /**
   * Delete a calculation-rule-scale.
   * @param params The `CalculationRuleScalesService.DeleteCalculationRuleScaleByIdParams` containing the following parameters:
   *
   * - `calculationRuleId`: The calculation rule ID.
   *
   * - `calculationScaleId`: The calculation scale ID.
   */
  deleteCalculationRuleScaleByIdResponse(params: CalculationRuleScalesService.DeleteCalculationRuleScaleByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/calculation-rule-scales/calculationRuleId:${params.calculationRuleId},calculationScaleId:${params.calculationScaleId}`,
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
   * Delete a calculation-rule-scale.
   * @param params The `CalculationRuleScalesService.DeleteCalculationRuleScaleByIdParams` containing the following parameters:
   *
   * - `calculationRuleId`: The calculation rule ID.
   *
   * - `calculationScaleId`: The calculation scale ID.
   */
  deleteCalculationRuleScaleById(params: CalculationRuleScalesService.DeleteCalculationRuleScaleByIdParams): __Observable<null> {
    return this.deleteCalculationRuleScaleByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CalculationRuleScalesService {

  /**
   * Parameters for getCalculationRuleScales
   */
  export interface GetCalculationRuleScalesParams {

    /**
     * The calculation scale ID.
     */
    calculationScaleId?: Array<number>;

    /**
     * The calculation rule ID.
     */
    calculationRuleId?: Array<number>;

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
   * Parameters for getCalculationRuleScaleById
   */
  export interface GetCalculationRuleScaleByIdParams {

    /**
     * The calculation rule ID.
     */
    calculationRuleId: number;

    /**
     * The calculation scale ID.
     */
    calculationScaleId: number;

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
   * Parameters for deleteCalculationRuleScaleById
   */
  export interface DeleteCalculationRuleScaleByIdParams {

    /**
     * The calculation rule ID.
     */
    calculationRuleId: number;

    /**
     * The calculation scale ID.
     */
    calculationScaleId: number;
  }
}

export { CalculationRuleScalesService }
