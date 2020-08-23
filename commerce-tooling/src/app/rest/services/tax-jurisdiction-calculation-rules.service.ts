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
class TaxJurisdictionCalculationRulesService extends __BaseService {
  static readonly getTaxJurisdictionCalculationRulesPath = '/rest/admin/v2/tax-jurisdiction-calculation-rules';
  static readonly createTaxJurisdictionCalculationRulePath = '/rest/admin/v2/tax-jurisdiction-calculation-rules';
  static readonly getTaxJurisdictionCalculationRuleByIdPath = '/rest/admin/v2/tax-jurisdiction-calculation-rules/{id}';
  static readonly deleteTaxJurisdictionCalculationRuleByIdPath = '/rest/admin/v2/tax-jurisdiction-calculation-rules/{id}';
  static readonly updateTaxJurisdictionCalculationRuleByIdPath = '/rest/admin/v2/tax-jurisdiction-calculation-rules/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of tax jurisdiction calculation rule.
   * @param params The `TaxJurisdictionCalculationRulesService.GetTaxJurisdictionCalculationRulesParams` containing the following parameters:
   *
   * - `id`: The tax jurisdiction calculation rule ID.
   *
   * - `precedence`: When a shipping address falls within more than one of the specified TaxJurisdictionGroups, for the same FulfillmentCenter, only the CalculationRule with the highest TAXJCRULE.PRECEDENCE value qualifies.
   *
   * - `calculationRuleId`: The calculation rule ID.
   *
   * - `jurisdictionGroupId`: The jurisdiction group ID.
   *
   * - `fulfillmentCenterId`: The fulfillment center ID.
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
   * @return A collection of tax jurisdiction calculation rule.
   */
  getTaxJurisdictionCalculationRulesResponse(params: TaxJurisdictionCalculationRulesService.GetTaxJurisdictionCalculationRulesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.id || []).forEach(val => {if (val != null) __params = __params.append('id', val.toString())});
    if (params.precedence != null) __params = __params.set('precedence', params.precedence.toString());
    (params.calculationRuleId || []).forEach(val => {if (val != null) __params = __params.append('calculationRuleId', val.toString())});
    if (params.jurisdictionGroupId != null) __params = __params.set('jurisdictionGroupId', params.jurisdictionGroupId.toString());
    if (params.fulfillmentCenterId != null) __params = __params.set('fulfillmentCenterId', params.fulfillmentCenterId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/tax-jurisdiction-calculation-rules`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of tax jurisdiction calculation rule.
   * @param params The `TaxJurisdictionCalculationRulesService.GetTaxJurisdictionCalculationRulesParams` containing the following parameters:
   *
   * - `id`: The tax jurisdiction calculation rule ID.
   *
   * - `precedence`: When a shipping address falls within more than one of the specified TaxJurisdictionGroups, for the same FulfillmentCenter, only the CalculationRule with the highest TAXJCRULE.PRECEDENCE value qualifies.
   *
   * - `calculationRuleId`: The calculation rule ID.
   *
   * - `jurisdictionGroupId`: The jurisdiction group ID.
   *
   * - `fulfillmentCenterId`: The fulfillment center ID.
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
   * @return A collection of tax jurisdiction calculation rule.
   */
  getTaxJurisdictionCalculationRules(params: TaxJurisdictionCalculationRulesService.GetTaxJurisdictionCalculationRulesParams): __Observable<{count?: number, items?: Array<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number}>}> {
    return this.getTaxJurisdictionCalculationRulesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number}>})
    );
  }

  /**
   * Create a tax jurisdiction calculation rule.
   * @param TaxJurisdictionCalculationRule A Tax jurisdiction calculation rule.
   */
  createTaxJurisdictionCalculationRuleResponse(TaxJurisdictionCalculationRule: {id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = TaxJurisdictionCalculationRule;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/tax-jurisdiction-calculation-rules`,
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
   * Create a tax jurisdiction calculation rule.
   * @param TaxJurisdictionCalculationRule A Tax jurisdiction calculation rule.
   */
  createTaxJurisdictionCalculationRule(TaxJurisdictionCalculationRule: {id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number}): __Observable<null> {
    return this.createTaxJurisdictionCalculationRuleResponse(TaxJurisdictionCalculationRule).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a tax jurisdiction calculation rule.
   * @param params The `TaxJurisdictionCalculationRulesService.GetTaxJurisdictionCalculationRuleByIdParams` containing the following parameters:
   *
   * - `id`: The tax jurisdiction calculation rule ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Tax jurisdiction calculation rule.
   */
  getTaxJurisdictionCalculationRuleByIdResponse(params: TaxJurisdictionCalculationRulesService.GetTaxJurisdictionCalculationRuleByIdParams): __Observable<__StrictHttpResponse<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/tax-jurisdiction-calculation-rules/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number}>;
      })
    );
  }

  /**
   * Get a tax jurisdiction calculation rule.
   * @param params The `TaxJurisdictionCalculationRulesService.GetTaxJurisdictionCalculationRuleByIdParams` containing the following parameters:
   *
   * - `id`: The tax jurisdiction calculation rule ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Tax jurisdiction calculation rule.
   */
  getTaxJurisdictionCalculationRuleById(params: TaxJurisdictionCalculationRulesService.GetTaxJurisdictionCalculationRuleByIdParams): __Observable<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number}> {
    return this.getTaxJurisdictionCalculationRuleByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number})
    );
  }

  /**
   * Delete a tax jurisdiction calculation rule.
   * @param id The tax jurisdiction calculation rule ID.
   */
  deleteTaxJurisdictionCalculationRuleByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/tax-jurisdiction-calculation-rules/${id}`,
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
   * Delete a tax jurisdiction calculation rule.
   * @param id The tax jurisdiction calculation rule ID.
   */
  deleteTaxJurisdictionCalculationRuleById(id: number): __Observable<null> {
    return this.deleteTaxJurisdictionCalculationRuleByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a tax jurisdiction calculation rule.
   * @param params The `TaxJurisdictionCalculationRulesService.UpdateTaxJurisdictionCalculationRuleByIdParams` containing the following parameters:
   *
   * - `TaxJurisdictionCalculationRule`: A Tax jurisdiction calculation rule.
   *
   * - `id`: The tax jurisdiction calculation rule ID.
   */
  updateTaxJurisdictionCalculationRuleByIdResponse(params: TaxJurisdictionCalculationRulesService.UpdateTaxJurisdictionCalculationRuleByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.TaxJurisdictionCalculationRule;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/tax-jurisdiction-calculation-rules/${params.id}`,
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
   * Update a tax jurisdiction calculation rule.
   * @param params The `TaxJurisdictionCalculationRulesService.UpdateTaxJurisdictionCalculationRuleByIdParams` containing the following parameters:
   *
   * - `TaxJurisdictionCalculationRule`: A Tax jurisdiction calculation rule.
   *
   * - `id`: The tax jurisdiction calculation rule ID.
   */
  updateTaxJurisdictionCalculationRuleById(params: TaxJurisdictionCalculationRulesService.UpdateTaxJurisdictionCalculationRuleByIdParams): __Observable<null> {
    return this.updateTaxJurisdictionCalculationRuleByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module TaxJurisdictionCalculationRulesService {

  /**
   * Parameters for getTaxJurisdictionCalculationRules
   */
  export interface GetTaxJurisdictionCalculationRulesParams {

    /**
     * The tax jurisdiction calculation rule ID.
     */
    id?: Array<number>;

    /**
     * When a shipping address falls within more than one of the specified TaxJurisdictionGroups, for the same FulfillmentCenter, only the CalculationRule with the highest TAXJCRULE.PRECEDENCE value qualifies.
     */
    precedence?: number;

    /**
     * The calculation rule ID.
     */
    calculationRuleId?: Array<number>;

    /**
     * The jurisdiction group ID.
     */
    jurisdictionGroupId?: number;

    /**
     * The fulfillment center ID.
     */
    fulfillmentCenterId?: number;

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
   * Parameters for getTaxJurisdictionCalculationRuleById
   */
  export interface GetTaxJurisdictionCalculationRuleByIdParams {

    /**
     * The tax jurisdiction calculation rule ID.
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
   * Parameters for updateTaxJurisdictionCalculationRuleById
   */
  export interface UpdateTaxJurisdictionCalculationRuleByIdParams {

    /**
     * A Tax jurisdiction calculation rule.
     */
    TaxJurisdictionCalculationRule: {id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number};

    /**
     * The tax jurisdiction calculation rule ID.
     */
    id: number;
  }
}

export { TaxJurisdictionCalculationRulesService }
