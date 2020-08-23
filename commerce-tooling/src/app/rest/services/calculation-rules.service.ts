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
class CalculationRulesService extends __BaseService {
  static readonly getCalculationRulesPath = '/rest/admin/v2/calculation-rules';
  static readonly createCalculationRulePath = '/rest/admin/v2/calculation-rules';
  static readonly getCalculationRuleByIdPath = '/rest/admin/v2/calculation-rules/{id}';
  static readonly deleteCalculationRuleByIdPath = '/rest/admin/v2/calculation-rules/{id}';
  static readonly updateCalculationRuleByIdPath = '/rest/admin/v2/calculation-rules/{id}';
  static readonly getCalculationScalesOfCalculationRulePath = '/rest/admin/v2/calculation-rules/{id}/calculation-scales';
  static readonly getShippingJurisdictionCalculationRulesOfCalculationRulePath = '/rest/admin/v2/calculation-rules/{id}/shipping-jurisdiction-calculation-rules';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of Calculation Rule.
   * @param params The `CalculationRulesService.GetCalculationRulesParams` containing the following parameters:
   *
   * - `id`: The calculation rule ID.
   *
   * - `combination`: Specify the bit flag to determine how this calculation rule can be combined with other calculation rules, 0 = The rule can be combined with any other rule. 1 = The rule can only be combined with rules that have the combination type 0 rules. 2 = The rule cannot be combined with rules that have the combination type 1.
   *
   * - `endDate`: The time this calculation rule stops being effective. This is a SQL TIMESTAMP value. You can specify a null value. If you do not specify a value, the default value is 9999-12-31 23 59 59.0, which means that the calculation code never expires.
   *
   * - `sequence`: Calculation rules for the same calculation code are processed in sequence from lowest to highest value.
   *
   * - `startDate`: The time this calculation rule begins being effective. This is a SQL TIMESTAMP value formatted as, YYYY-MM-DD HH MM SS.ff.
   *
   * - `taxCategoryId`: For TaxType CalculationUsages, the TaxCategory for which this CalculationRule is effective.
   *
   * - `field1`: Customizable.
   *
   * - `field2`: Customizable.
   *
   * - `flags`: Use to determine how this calculation rule may be combined with other calculation rules. Contains the following bit flag indicating special processing to be performed by the defaulti implementation, 1 = restricted - certain conditions must be met before the calculation rule qualifies. If this flag is not 1, then the calculation rule always qualifies. Example 1, For discount calculation rules, the customer must be in one of the associated member groups recognized by the Store as customer groups. Example 2, For shipping calculation rules, the shipping address, shipping mode and fulfillment center must match one of the shipping jurisdiction group calculation rules. Example 3, For tax calculation rules the shipping address and fulfillment center must match one of the tax jurisdiction group calculation rules.
   *
   * - `identifier`: Uniquely identifies this Calculation Rule, along with its Calculation Code.
   *
   * - `calculationCodeId`: The calculationCodeId of which this calculation rule is a part. You can get all the calculation codes by calling, /store/{storeId}/calculation-codes
   *
   * - `calculationMethodId`: The calculationMethodId calculates a monetary result for a set of order items.
   *
   * - `calculationRuleQualifyMethodId`: The CalculationRuleQualifyMethod that determines which of a set of OrderItems should be sent to the CalculationRuleCalculateMethod.
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
   * @return A collection of Calculation Rules.
   */
  getCalculationRulesResponse(params: CalculationRulesService.GetCalculationRulesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, combination?: number, endDate?: string, sequence?: number, startDate?: string, taxCategoryId?: number, field1?: number, field2?: string, flags?: number, identifier?: number, calculationCodeId?: number, calculationMethodId?: number, calculationRuleQualifyMethodId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.id || []).forEach(val => {if (val != null) __params = __params.append('id', val.toString())});
    if (params.combination != null) __params = __params.set('combination', params.combination.toString());
    if (params.endDate != null) __params = __params.set('endDate', params.endDate.toString());
    if (params.sequence != null) __params = __params.set('sequence', params.sequence.toString());
    if (params.startDate != null) __params = __params.set('startDate', params.startDate.toString());
    if (params.taxCategoryId != null) __params = __params.set('taxCategoryId', params.taxCategoryId.toString());
    if (params.field1 != null) __params = __params.set('field1', params.field1.toString());
    if (params.field2 != null) __params = __params.set('field2', params.field2.toString());
    if (params.flags != null) __params = __params.set('flags', params.flags.toString());
    if (params.identifier != null) __params = __params.set('identifier', params.identifier.toString());
    if (params.calculationCodeId != null) __params = __params.set('calculationCodeId', params.calculationCodeId.toString());
    if (params.calculationMethodId != null) __params = __params.set('calculationMethodId', params.calculationMethodId.toString());
    if (params.calculationRuleQualifyMethodId != null) __params = __params.set('calculationRuleQualifyMethodId', params.calculationRuleQualifyMethodId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/calculation-rules`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, combination?: number, endDate?: string, sequence?: number, startDate?: string, taxCategoryId?: number, field1?: number, field2?: string, flags?: number, identifier?: number, calculationCodeId?: number, calculationMethodId?: number, calculationRuleQualifyMethodId?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of Calculation Rule.
   * @param params The `CalculationRulesService.GetCalculationRulesParams` containing the following parameters:
   *
   * - `id`: The calculation rule ID.
   *
   * - `combination`: Specify the bit flag to determine how this calculation rule can be combined with other calculation rules, 0 = The rule can be combined with any other rule. 1 = The rule can only be combined with rules that have the combination type 0 rules. 2 = The rule cannot be combined with rules that have the combination type 1.
   *
   * - `endDate`: The time this calculation rule stops being effective. This is a SQL TIMESTAMP value. You can specify a null value. If you do not specify a value, the default value is 9999-12-31 23 59 59.0, which means that the calculation code never expires.
   *
   * - `sequence`: Calculation rules for the same calculation code are processed in sequence from lowest to highest value.
   *
   * - `startDate`: The time this calculation rule begins being effective. This is a SQL TIMESTAMP value formatted as, YYYY-MM-DD HH MM SS.ff.
   *
   * - `taxCategoryId`: For TaxType CalculationUsages, the TaxCategory for which this CalculationRule is effective.
   *
   * - `field1`: Customizable.
   *
   * - `field2`: Customizable.
   *
   * - `flags`: Use to determine how this calculation rule may be combined with other calculation rules. Contains the following bit flag indicating special processing to be performed by the defaulti implementation, 1 = restricted - certain conditions must be met before the calculation rule qualifies. If this flag is not 1, then the calculation rule always qualifies. Example 1, For discount calculation rules, the customer must be in one of the associated member groups recognized by the Store as customer groups. Example 2, For shipping calculation rules, the shipping address, shipping mode and fulfillment center must match one of the shipping jurisdiction group calculation rules. Example 3, For tax calculation rules the shipping address and fulfillment center must match one of the tax jurisdiction group calculation rules.
   *
   * - `identifier`: Uniquely identifies this Calculation Rule, along with its Calculation Code.
   *
   * - `calculationCodeId`: The calculationCodeId of which this calculation rule is a part. You can get all the calculation codes by calling, /store/{storeId}/calculation-codes
   *
   * - `calculationMethodId`: The calculationMethodId calculates a monetary result for a set of order items.
   *
   * - `calculationRuleQualifyMethodId`: The CalculationRuleQualifyMethod that determines which of a set of OrderItems should be sent to the CalculationRuleCalculateMethod.
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
   * @return A collection of Calculation Rules.
   */
  getCalculationRules(params: CalculationRulesService.GetCalculationRulesParams): __Observable<{count?: number, items?: Array<{id?: number, combination?: number, endDate?: string, sequence?: number, startDate?: string, taxCategoryId?: number, field1?: number, field2?: string, flags?: number, identifier?: number, calculationCodeId?: number, calculationMethodId?: number, calculationRuleQualifyMethodId?: number}>}> {
    return this.getCalculationRulesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, combination?: number, endDate?: string, sequence?: number, startDate?: string, taxCategoryId?: number, field1?: number, field2?: string, flags?: number, identifier?: number, calculationCodeId?: number, calculationMethodId?: number, calculationRuleQualifyMethodId?: number}>})
    );
  }

  /**
   * Create a calculation rule.
   * @param CalculationRule A calculation rule defines how to arrive at a monetary amount for a set of order items.
   */
  createCalculationRuleResponse(CalculationRule: {id?: number, combination?: number, endDate?: string, sequence?: number, startDate?: string, taxCategoryId?: number, field1?: number, field2?: string, flags?: number, identifier?: number, calculationCodeId?: number, calculationMethodId?: number, calculationRuleQualifyMethodId?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CalculationRule;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/calculation-rules`,
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
   * Create a calculation rule.
   * @param CalculationRule A calculation rule defines how to arrive at a monetary amount for a set of order items.
   */
  createCalculationRule(CalculationRule: {id?: number, combination?: number, endDate?: string, sequence?: number, startDate?: string, taxCategoryId?: number, field1?: number, field2?: string, flags?: number, identifier?: number, calculationCodeId?: number, calculationMethodId?: number, calculationRuleQualifyMethodId?: number}): __Observable<null> {
    return this.createCalculationRuleResponse(CalculationRule).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a calculation rule.
   * @param params The `CalculationRulesService.GetCalculationRuleByIdParams` containing the following parameters:
   *
   * - `id`: The calculation rule ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A calculation rule defines how to arrive at a monetary amount for a set of order items.
   */
  getCalculationRuleByIdResponse(params: CalculationRulesService.GetCalculationRuleByIdParams): __Observable<__StrictHttpResponse<{id?: number, combination?: number, endDate?: string, sequence?: number, startDate?: string, taxCategoryId?: number, field1?: number, field2?: string, flags?: number, identifier?: number, calculationCodeId?: number, calculationMethodId?: number, calculationRuleQualifyMethodId?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/calculation-rules/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, combination?: number, endDate?: string, sequence?: number, startDate?: string, taxCategoryId?: number, field1?: number, field2?: string, flags?: number, identifier?: number, calculationCodeId?: number, calculationMethodId?: number, calculationRuleQualifyMethodId?: number}>;
      })
    );
  }

  /**
   * Get a calculation rule.
   * @param params The `CalculationRulesService.GetCalculationRuleByIdParams` containing the following parameters:
   *
   * - `id`: The calculation rule ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A calculation rule defines how to arrive at a monetary amount for a set of order items.
   */
  getCalculationRuleById(params: CalculationRulesService.GetCalculationRuleByIdParams): __Observable<{id?: number, combination?: number, endDate?: string, sequence?: number, startDate?: string, taxCategoryId?: number, field1?: number, field2?: string, flags?: number, identifier?: number, calculationCodeId?: number, calculationMethodId?: number, calculationRuleQualifyMethodId?: number}> {
    return this.getCalculationRuleByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, combination?: number, endDate?: string, sequence?: number, startDate?: string, taxCategoryId?: number, field1?: number, field2?: string, flags?: number, identifier?: number, calculationCodeId?: number, calculationMethodId?: number, calculationRuleQualifyMethodId?: number})
    );
  }

  /**
   * Delete a calculation rule.
   * @param id The calculation rule ID.
   */
  deleteCalculationRuleByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/calculation-rules/${id}`,
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
   * Delete a calculation rule.
   * @param id The calculation rule ID.
   */
  deleteCalculationRuleById(id: number): __Observable<null> {
    return this.deleteCalculationRuleByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a calculation rule.
   * @param params The `CalculationRulesService.UpdateCalculationRuleByIdParams` containing the following parameters:
   *
   * - `CalculationRule`: A calculation rule defines how to arrive at a monetary amount for a set of order items.
   *
   * - `id`: The calculation rule ID.
   */
  updateCalculationRuleByIdResponse(params: CalculationRulesService.UpdateCalculationRuleByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.CalculationRule;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/calculation-rules/${params.id}`,
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
   * Update a calculation rule.
   * @param params The `CalculationRulesService.UpdateCalculationRuleByIdParams` containing the following parameters:
   *
   * - `CalculationRule`: A calculation rule defines how to arrive at a monetary amount for a set of order items.
   *
   * - `id`: The calculation rule ID.
   */
  updateCalculationRuleById(params: CalculationRulesService.UpdateCalculationRuleByIdParams): __Observable<null> {
    return this.updateCalculationRuleByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CalculationRulesService.GetCalculationScalesOfCalculationRuleParams` containing the following parameters:
   *
   * - `id`: The calculation rule ID.
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
  getCalculationScalesOfCalculationRuleResponse(params: CalculationRulesService.GetCalculationScalesOfCalculationRuleParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{calculationScaleId?: number, calculationRuleId?: number}>}>> {
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
      this.rootUrl + `/rest/admin/v2/calculation-rules/${params.id}/calculation-scales`,
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
   * @param params The `CalculationRulesService.GetCalculationScalesOfCalculationRuleParams` containing the following parameters:
   *
   * - `id`: The calculation rule ID.
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
  getCalculationScalesOfCalculationRule(params: CalculationRulesService.GetCalculationScalesOfCalculationRuleParams): __Observable<{count?: number, items?: Array<{calculationScaleId?: number, calculationRuleId?: number}>}> {
    return this.getCalculationScalesOfCalculationRuleResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{calculationScaleId?: number, calculationRuleId?: number}>})
    );
  }

  /**
   * @param params The `CalculationRulesService.GetShippingJurisdictionCalculationRulesOfCalculationRuleParams` containing the following parameters:
   *
   * - `id`: The calculation rule ID.
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
  getShippingJurisdictionCalculationRulesOfCalculationRuleResponse(params: CalculationRulesService.GetShippingJurisdictionCalculationRulesOfCalculationRuleParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number, shippingModeId?: number}>}>> {
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
      this.rootUrl + `/rest/admin/v2/calculation-rules/${params.id}/shipping-jurisdiction-calculation-rules`,
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
   * @param params The `CalculationRulesService.GetShippingJurisdictionCalculationRulesOfCalculationRuleParams` containing the following parameters:
   *
   * - `id`: The calculation rule ID.
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
  getShippingJurisdictionCalculationRulesOfCalculationRule(params: CalculationRulesService.GetShippingJurisdictionCalculationRulesOfCalculationRuleParams): __Observable<{count?: number, items?: Array<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number, shippingModeId?: number}>}> {
    return this.getShippingJurisdictionCalculationRulesOfCalculationRuleResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, precedence?: number, calculationRuleId?: number, jurisdictionGroupId?: number, fulfillmentCenterId?: number, shippingModeId?: number}>})
    );
  }
}

module CalculationRulesService {

  /**
   * Parameters for getCalculationRules
   */
  export interface GetCalculationRulesParams {

    /**
     * The calculation rule ID.
     */
    id?: Array<number>;

    /**
     * Specify the bit flag to determine how this calculation rule can be combined with other calculation rules, 0 = The rule can be combined with any other rule. 1 = The rule can only be combined with rules that have the combination type 0 rules. 2 = The rule cannot be combined with rules that have the combination type 1.
     */
    combination?: number;

    /**
     * The time this calculation rule stops being effective. This is a SQL TIMESTAMP value. You can specify a null value. If you do not specify a value, the default value is 9999-12-31 23 59 59.0, which means that the calculation code never expires.
     */
    endDate?: string;

    /**
     * Calculation rules for the same calculation code are processed in sequence from lowest to highest value.
     */
    sequence?: number;

    /**
     * The time this calculation rule begins being effective. This is a SQL TIMESTAMP value formatted as, YYYY-MM-DD HH MM SS.ff.
     */
    startDate?: string;

    /**
     * For TaxType CalculationUsages, the TaxCategory for which this CalculationRule is effective.
     */
    taxCategoryId?: number;

    /**
     * Customizable.
     */
    field1?: number;

    /**
     * Customizable.
     */
    field2?: string;

    /**
     * Use to determine how this calculation rule may be combined with other calculation rules. Contains the following bit flag indicating special processing to be performed by the defaulti implementation, 1 = restricted - certain conditions must be met before the calculation rule qualifies. If this flag is not 1, then the calculation rule always qualifies. Example 1, For discount calculation rules, the customer must be in one of the associated member groups recognized by the Store as customer groups. Example 2, For shipping calculation rules, the shipping address, shipping mode and fulfillment center must match one of the shipping jurisdiction group calculation rules. Example 3, For tax calculation rules the shipping address and fulfillment center must match one of the tax jurisdiction group calculation rules.
     */
    flags?: number;

    /**
     * Uniquely identifies this Calculation Rule, along with its Calculation Code.
     */
    identifier?: number;

    /**
     * The calculationCodeId of which this calculation rule is a part. You can get all the calculation codes by calling, /store/{storeId}/calculation-codes
     */
    calculationCodeId?: number;

    /**
     * The calculationMethodId calculates a monetary result for a set of order items.
     */
    calculationMethodId?: number;

    /**
     * The CalculationRuleQualifyMethod that determines which of a set of OrderItems should be sent to the CalculationRuleCalculateMethod.
     */
    calculationRuleQualifyMethodId?: number;

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
   * Parameters for getCalculationRuleById
   */
  export interface GetCalculationRuleByIdParams {

    /**
     * The calculation rule ID.
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
   * Parameters for updateCalculationRuleById
   */
  export interface UpdateCalculationRuleByIdParams {

    /**
     * A calculation rule defines how to arrive at a monetary amount for a set of order items.
     */
    CalculationRule: {id?: number, combination?: number, endDate?: string, sequence?: number, startDate?: string, taxCategoryId?: number, field1?: number, field2?: string, flags?: number, identifier?: number, calculationCodeId?: number, calculationMethodId?: number, calculationRuleQualifyMethodId?: number};

    /**
     * The calculation rule ID.
     */
    id: number;
  }

  /**
   * Parameters for getCalculationScalesOfCalculationRule
   */
  export interface GetCalculationScalesOfCalculationRuleParams {

    /**
     * The calculation rule ID.
     */
    id: number;

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
   * Parameters for getShippingJurisdictionCalculationRulesOfCalculationRule
   */
  export interface GetShippingJurisdictionCalculationRulesOfCalculationRuleParams {

    /**
     * The calculation rule ID.
     */
    id: number;

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

export { CalculationRulesService }
