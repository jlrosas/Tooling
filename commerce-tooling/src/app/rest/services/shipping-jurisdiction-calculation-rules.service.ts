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
class ShippingJurisdictionCalculationRulesService extends __BaseService {
  static readonly getShippingJurisdictionCalculationRulesPath = '/rest/admin/v2/shipping-jurisdiction-calculation-rules';
  static readonly createShippingJurisdictionCalculationRulePath = '/rest/admin/v2/shipping-jurisdiction-calculation-rules';
  static readonly getShippingJurisdictionCalculationRuleByIdPath = '/rest/admin/v2/shipping-jurisdiction-calculation-rules/{id}';
  static readonly deleteShippingJurisdictionCalculationRuleByIdPath = '/rest/admin/v2/shipping-jurisdiction-calculation-rules/{id}';
  static readonly updateShippingJurisdictionCalculationRuleByIdPath = '/rest/admin/v2/shipping-jurisdiction-calculation-rules/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of shipping jurisdiction calculation rule.
   * @param params The `ShippingJurisdictionCalculationRulesService.GetShippingJurisdictionCalculationRulesParams` containing the following parameters:
   *
   * - `id`: The shipping jurisdiction calculation rule ID.
   *
   * - `precedence`: When a shipping address falls within more than one of the specified ShippingJurisdictionGroups, for the same FulfillmentCenter and ShippingMode, only the CalculationRule with the highest SHPJCRULE.PRECEDENCE value qualifies.
   *
   * - `calculationRuleId`: The calculation rule ID.
   *
   * - `jurisdictionGroupId`: The jurisdiction group ID.
   *
   * - `fulfillmentCenterId`: The fulfillment center ID.
   *
   * - `shippingModeId`: The shipping mode ID.
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
   * @return A collection of shipping jurisdiction calculation rule.
   */
  getShippingJurisdictionCalculationRulesResponse(params: ShippingJurisdictionCalculationRulesService.GetShippingJurisdictionCalculationRulesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number, shippingModeId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.precedence != null) __params = __params.set('precedence', params.precedence.toString());
    if (params.calculationRuleId != null) __params = __params.set('calculationRuleId', params.calculationRuleId.toString());
    if (params.jurisdictionGroupId != null) __params = __params.set('jurisdictionGroupId', params.jurisdictionGroupId.toString());
    if (params.fulfillmentCenterId != null) __params = __params.set('fulfillmentCenterId', params.fulfillmentCenterId.toString());
    if (params.shippingModeId != null) __params = __params.set('shippingModeId', params.shippingModeId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/shipping-jurisdiction-calculation-rules`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number, shippingModeId?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of shipping jurisdiction calculation rule.
   * @param params The `ShippingJurisdictionCalculationRulesService.GetShippingJurisdictionCalculationRulesParams` containing the following parameters:
   *
   * - `id`: The shipping jurisdiction calculation rule ID.
   *
   * - `precedence`: When a shipping address falls within more than one of the specified ShippingJurisdictionGroups, for the same FulfillmentCenter and ShippingMode, only the CalculationRule with the highest SHPJCRULE.PRECEDENCE value qualifies.
   *
   * - `calculationRuleId`: The calculation rule ID.
   *
   * - `jurisdictionGroupId`: The jurisdiction group ID.
   *
   * - `fulfillmentCenterId`: The fulfillment center ID.
   *
   * - `shippingModeId`: The shipping mode ID.
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
   * @return A collection of shipping jurisdiction calculation rule.
   */
  getShippingJurisdictionCalculationRules(params: ShippingJurisdictionCalculationRulesService.GetShippingJurisdictionCalculationRulesParams): __Observable<{count?: number, items?: Array<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number, shippingModeId?: number}>}> {
    return this.getShippingJurisdictionCalculationRulesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number, shippingModeId?: number}>})
    );
  }

  /**
   * Create a shipping jurisdiction calculation rule.
   * @param ShippingJurisdictionCalculationRule A Shipping jurisdiction calculation rule.
   */
  createShippingJurisdictionCalculationRuleResponse(ShippingJurisdictionCalculationRule: {id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number, shippingModeId?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ShippingJurisdictionCalculationRule;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/shipping-jurisdiction-calculation-rules`,
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
   * Create a shipping jurisdiction calculation rule.
   * @param ShippingJurisdictionCalculationRule A Shipping jurisdiction calculation rule.
   */
  createShippingJurisdictionCalculationRule(ShippingJurisdictionCalculationRule: {id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number, shippingModeId?: number}): __Observable<null> {
    return this.createShippingJurisdictionCalculationRuleResponse(ShippingJurisdictionCalculationRule).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a shipping jurisdiction calculation rule.
   * @param params The `ShippingJurisdictionCalculationRulesService.GetShippingJurisdictionCalculationRuleByIdParams` containing the following parameters:
   *
   * - `id`: The shipping jurisdiction calculation rule ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Shipping jurisdiction calculation rule.
   */
  getShippingJurisdictionCalculationRuleByIdResponse(params: ShippingJurisdictionCalculationRulesService.GetShippingJurisdictionCalculationRuleByIdParams): __Observable<__StrictHttpResponse<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number, shippingModeId?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/shipping-jurisdiction-calculation-rules/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number, shippingModeId?: number}>;
      })
    );
  }

  /**
   * Get a shipping jurisdiction calculation rule.
   * @param params The `ShippingJurisdictionCalculationRulesService.GetShippingJurisdictionCalculationRuleByIdParams` containing the following parameters:
   *
   * - `id`: The shipping jurisdiction calculation rule ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Shipping jurisdiction calculation rule.
   */
  getShippingJurisdictionCalculationRuleById(params: ShippingJurisdictionCalculationRulesService.GetShippingJurisdictionCalculationRuleByIdParams): __Observable<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number, shippingModeId?: number}> {
    return this.getShippingJurisdictionCalculationRuleByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number, shippingModeId?: number})
    );
  }

  /**
   * Delete a shipping jurisdiction calculation rule.
   * @param id The shipping jurisdiction calculation rule ID.
   */
  deleteShippingJurisdictionCalculationRuleByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/shipping-jurisdiction-calculation-rules/${id}`,
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
   * Delete a shipping jurisdiction calculation rule.
   * @param id The shipping jurisdiction calculation rule ID.
   */
  deleteShippingJurisdictionCalculationRuleById(id: number): __Observable<null> {
    return this.deleteShippingJurisdictionCalculationRuleByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a shipping jurisdiction calculation rule.
   * @param params The `ShippingJurisdictionCalculationRulesService.UpdateShippingJurisdictionCalculationRuleByIdParams` containing the following parameters:
   *
   * - `ShippingJurisdictionCalculationRule`: A Shipping jurisdiction calculation rule.
   *
   * - `id`: The shipping jurisdiction calculation rule ID.
   */
  updateShippingJurisdictionCalculationRuleByIdResponse(params: ShippingJurisdictionCalculationRulesService.UpdateShippingJurisdictionCalculationRuleByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.ShippingJurisdictionCalculationRule;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/shipping-jurisdiction-calculation-rules/${params.id}`,
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
   * Update a shipping jurisdiction calculation rule.
   * @param params The `ShippingJurisdictionCalculationRulesService.UpdateShippingJurisdictionCalculationRuleByIdParams` containing the following parameters:
   *
   * - `ShippingJurisdictionCalculationRule`: A Shipping jurisdiction calculation rule.
   *
   * - `id`: The shipping jurisdiction calculation rule ID.
   */
  updateShippingJurisdictionCalculationRuleById(params: ShippingJurisdictionCalculationRulesService.UpdateShippingJurisdictionCalculationRuleByIdParams): __Observable<null> {
    return this.updateShippingJurisdictionCalculationRuleByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ShippingJurisdictionCalculationRulesService {

  /**
   * Parameters for getShippingJurisdictionCalculationRules
   */
  export interface GetShippingJurisdictionCalculationRulesParams {

    /**
     * The shipping jurisdiction calculation rule ID.
     */
    id?: number;

    /**
     * When a shipping address falls within more than one of the specified ShippingJurisdictionGroups, for the same FulfillmentCenter and ShippingMode, only the CalculationRule with the highest SHPJCRULE.PRECEDENCE value qualifies.
     */
    precedence?: number;

    /**
     * The calculation rule ID.
     */
    calculationRuleId?: number;

    /**
     * The jurisdiction group ID.
     */
    jurisdictionGroupId?: number;

    /**
     * The fulfillment center ID.
     */
    fulfillmentCenterId?: number;

    /**
     * The shipping mode ID.
     */
    shippingModeId?: number;

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
   * Parameters for getShippingJurisdictionCalculationRuleById
   */
  export interface GetShippingJurisdictionCalculationRuleByIdParams {

    /**
     * The shipping jurisdiction calculation rule ID.
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
   * Parameters for updateShippingJurisdictionCalculationRuleById
   */
  export interface UpdateShippingJurisdictionCalculationRuleByIdParams {

    /**
     * A Shipping jurisdiction calculation rule.
     */
    ShippingJurisdictionCalculationRule: {id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number, shippingModeId?: number};

    /**
     * The shipping jurisdiction calculation rule ID.
     */
    id: number;
  }
}

export { ShippingJurisdictionCalculationRulesService }
