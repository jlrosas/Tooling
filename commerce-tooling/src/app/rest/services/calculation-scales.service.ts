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
class CalculationScalesService extends __BaseService {
  static readonly getCalculationScalesPath = '/rest/admin/v2/calculation-scales';
  static readonly createCalculationScalePath = '/rest/admin/v2/calculation-scales';
  static readonly getCalculationScaleByIdPath = '/rest/admin/v2/calculation-scales/{id}';
  static readonly deleteCalculationScaleByIdPath = '/rest/admin/v2/calculation-scales/{id}';
  static readonly updateCalculationScaleByIdPath = '/rest/admin/v2/calculation-scales/{id}';
  static readonly getDescriptionsOfCalculationScalePath = '/rest/admin/v2/calculation-scales/{id}/descriptions';
  static readonly getCalculationRulesOfCalculationScalePath = '/rest/admin/v2/calculation-scales/{id}/calculation-rules';
  static readonly getCalculationRangesOfCalculationScalePath = '/rest/admin/v2/calculation-scales/{id}/calculation-ranges';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of Calculation Scales.
   * @param params The `CalculationScalesService.GetCalculationScalesParams` containing the following parameters:
   *
   * - `id`: The calculation scale ID.
   *
   * - `scaleCode`: A character string that uniquely identifies this Calculation Scale.
   *
   * - `unitOfMeasure`: The Unit of measure for the range start values of the Calculation Range for this Calculation Scale.
   *
   * - `currency`: The currency for the range start values of the Calculation Range for this Calculation Scale.
   *
   * - `storeId`: The reference number of the store this Calculation Scale associated with.
   *
   * - `scaleDescription`: The detailed description of the Calculation Scale.
   *
   * - `field1`: Customizable.
   *
   * - `scaleLookupMethod`: The Calculation Scale lookup method can be used by the Calculation Scale to calculate a monetary amount. -28 for a shipping scale based on quantity. -29 for a shipping scale based on weight. -33 for a shipping range returning a fixed shipping.
   *
   * - `calculationUsageId`: Indicates the kind of calculation this Calculation Scale is used for. For example, the Calculation Scale may be used to calculate one of the monetary amounts, discounts, shipping charges, sales tax, or shipping tax.
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
   * @return A collection of Calculation Scales.
   */
  getCalculationScalesResponse(params: CalculationScalesService.GetCalculationScalesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, scaleCode?: string, unitOfMeasure?: string, currency?: string, storeId?: number, scaleDescription?: string, field1?: string, scaleLookupMethod?: number, calculationUsageId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.scaleCode != null) __params = __params.set('scaleCode', params.scaleCode.toString());
    if (params.unitOfMeasure != null) __params = __params.set('unitOfMeasure', params.unitOfMeasure.toString());
    if (params.currency != null) __params = __params.set('currency', params.currency.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.scaleDescription != null) __params = __params.set('scaleDescription', params.scaleDescription.toString());
    if (params.field1 != null) __params = __params.set('field1', params.field1.toString());
    if (params.scaleLookupMethod != null) __params = __params.set('scaleLookupMethod', params.scaleLookupMethod.toString());
    if (params.calculationUsageId != null) __params = __params.set('calculationUsageId', params.calculationUsageId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/calculation-scales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, scaleCode?: string, unitOfMeasure?: string, currency?: string, storeId?: number, scaleDescription?: string, field1?: string, scaleLookupMethod?: number, calculationUsageId?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of Calculation Scales.
   * @param params The `CalculationScalesService.GetCalculationScalesParams` containing the following parameters:
   *
   * - `id`: The calculation scale ID.
   *
   * - `scaleCode`: A character string that uniquely identifies this Calculation Scale.
   *
   * - `unitOfMeasure`: The Unit of measure for the range start values of the Calculation Range for this Calculation Scale.
   *
   * - `currency`: The currency for the range start values of the Calculation Range for this Calculation Scale.
   *
   * - `storeId`: The reference number of the store this Calculation Scale associated with.
   *
   * - `scaleDescription`: The detailed description of the Calculation Scale.
   *
   * - `field1`: Customizable.
   *
   * - `scaleLookupMethod`: The Calculation Scale lookup method can be used by the Calculation Scale to calculate a monetary amount. -28 for a shipping scale based on quantity. -29 for a shipping scale based on weight. -33 for a shipping range returning a fixed shipping.
   *
   * - `calculationUsageId`: Indicates the kind of calculation this Calculation Scale is used for. For example, the Calculation Scale may be used to calculate one of the monetary amounts, discounts, shipping charges, sales tax, or shipping tax.
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
   * @return A collection of Calculation Scales.
   */
  getCalculationScales(params: CalculationScalesService.GetCalculationScalesParams): __Observable<{count?: number, items?: Array<{id?: number, scaleCode?: string, unitOfMeasure?: string, currency?: string, storeId?: number, scaleDescription?: string, field1?: string, scaleLookupMethod?: number, calculationUsageId?: number}>}> {
    return this.getCalculationScalesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, scaleCode?: string, unitOfMeasure?: string, currency?: string, storeId?: number, scaleDescription?: string, field1?: string, scaleLookupMethod?: number, calculationUsageId?: number}>})
    );
  }

  /**
   * Create a calculation scale.
   * @param CalculationScale A calculation scale defines what the charge is based on when calculating different kinds of charges. For example, the shipping charge can be charged by total price, weight, quantity, etc.
   */
  createCalculationScaleResponse(CalculationScale: {id?: number, scaleCode?: string, unitOfMeasure?: string, currency?: string, storeId?: number, scaleDescription?: string, field1?: string, scaleLookupMethod?: number, calculationUsageId?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CalculationScale;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/calculation-scales`,
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
   * Create a calculation scale.
   * @param CalculationScale A calculation scale defines what the charge is based on when calculating different kinds of charges. For example, the shipping charge can be charged by total price, weight, quantity, etc.
   */
  createCalculationScale(CalculationScale: {id?: number, scaleCode?: string, unitOfMeasure?: string, currency?: string, storeId?: number, scaleDescription?: string, field1?: string, scaleLookupMethod?: number, calculationUsageId?: number}): __Observable<null> {
    return this.createCalculationScaleResponse(CalculationScale).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a calculation scale.
   * @param params The `CalculationScalesService.GetCalculationScaleByIdParams` containing the following parameters:
   *
   * - `id`: The calculation scale ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A calculation scale defines what the charge is based on when calculating different kinds of charges. For example, the shipping charge can be charged by total price, weight, quantity, etc.
   */
  getCalculationScaleByIdResponse(params: CalculationScalesService.GetCalculationScaleByIdParams): __Observable<__StrictHttpResponse<{id?: number, scaleCode?: string, unitOfMeasure?: string, currency?: string, storeId?: number, scaleDescription?: string, field1?: string, scaleLookupMethod?: number, calculationUsageId?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/calculation-scales/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, scaleCode?: string, unitOfMeasure?: string, currency?: string, storeId?: number, scaleDescription?: string, field1?: string, scaleLookupMethod?: number, calculationUsageId?: number}>;
      })
    );
  }

  /**
   * Get a calculation scale.
   * @param params The `CalculationScalesService.GetCalculationScaleByIdParams` containing the following parameters:
   *
   * - `id`: The calculation scale ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A calculation scale defines what the charge is based on when calculating different kinds of charges. For example, the shipping charge can be charged by total price, weight, quantity, etc.
   */
  getCalculationScaleById(params: CalculationScalesService.GetCalculationScaleByIdParams): __Observable<{id?: number, scaleCode?: string, unitOfMeasure?: string, currency?: string, storeId?: number, scaleDescription?: string, field1?: string, scaleLookupMethod?: number, calculationUsageId?: number}> {
    return this.getCalculationScaleByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, scaleCode?: string, unitOfMeasure?: string, currency?: string, storeId?: number, scaleDescription?: string, field1?: string, scaleLookupMethod?: number, calculationUsageId?: number})
    );
  }

  /**
   * Delete a calculation Scale.
   * @param id The calculation scale ID.
   */
  deleteCalculationScaleByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/calculation-scales/${id}`,
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
   * Delete a calculation Scale.
   * @param id The calculation scale ID.
   */
  deleteCalculationScaleById(id: number): __Observable<null> {
    return this.deleteCalculationScaleByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a calculation scale.
   * @param params The `CalculationScalesService.UpdateCalculationScaleByIdParams` containing the following parameters:
   *
   * - `CalculationScale`: A calculation scale defines what the charge is based on when calculating different kinds of charges. For example, the shipping charge can be charged by total price, weight, quantity, etc.
   *
   * - `id`: The calculation scale ID.
   */
  updateCalculationScaleByIdResponse(params: CalculationScalesService.UpdateCalculationScaleByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.CalculationScale;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/calculation-scales/${params.id}`,
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
   * Update a calculation scale.
   * @param params The `CalculationScalesService.UpdateCalculationScaleByIdParams` containing the following parameters:
   *
   * - `CalculationScale`: A calculation scale defines what the charge is based on when calculating different kinds of charges. For example, the shipping charge can be charged by total price, weight, quantity, etc.
   *
   * - `id`: The calculation scale ID.
   */
  updateCalculationScaleById(params: CalculationScalesService.UpdateCalculationScaleByIdParams): __Observable<null> {
    return this.updateCalculationScaleByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CalculationScalesService.GetDescriptionsOfCalculationScaleParams` containing the following parameters:
   *
   * - `id`: The calculation scale ID.
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
   * @return A collection of language-dependent Calculation Scale Description.
   */
  getDescriptionsOfCalculationScaleResponse(params: CalculationScalesService.GetDescriptionsOfCalculationScaleParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{calculationScaleId?: number, languageId?: number, description?: string}>}>> {
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
      this.rootUrl + `/rest/admin/v2/calculation-scales/${params.id}/descriptions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{calculationScaleId?: number, languageId?: number, description?: string}>}>;
      })
    );
  }

  /**
   * @param params The `CalculationScalesService.GetDescriptionsOfCalculationScaleParams` containing the following parameters:
   *
   * - `id`: The calculation scale ID.
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
   * @return A collection of language-dependent Calculation Scale Description.
   */
  getDescriptionsOfCalculationScale(params: CalculationScalesService.GetDescriptionsOfCalculationScaleParams): __Observable<{count?: number, items?: Array<{calculationScaleId?: number, languageId?: number, description?: string}>}> {
    return this.getDescriptionsOfCalculationScaleResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{calculationScaleId?: number, languageId?: number, description?: string}>})
    );
  }

  /**
   * @param params The `CalculationScalesService.GetCalculationRulesOfCalculationScaleParams` containing the following parameters:
   *
   * - `id`: The calculation scale ID.
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
  getCalculationRulesOfCalculationScaleResponse(params: CalculationScalesService.GetCalculationRulesOfCalculationScaleParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{calculationScaleId?: number, calculationRuleId?: number}>}>> {
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
      this.rootUrl + `/rest/admin/v2/calculation-scales/${params.id}/calculation-rules`,
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
   * @param params The `CalculationScalesService.GetCalculationRulesOfCalculationScaleParams` containing the following parameters:
   *
   * - `id`: The calculation scale ID.
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
  getCalculationRulesOfCalculationScale(params: CalculationScalesService.GetCalculationRulesOfCalculationScaleParams): __Observable<{count?: number, items?: Array<{calculationScaleId?: number, calculationRuleId?: number}>}> {
    return this.getCalculationRulesOfCalculationScaleResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{calculationScaleId?: number, calculationRuleId?: number}>})
    );
  }

  /**
   * @param params The `CalculationScalesService.GetCalculationRangesOfCalculationScaleParams` containing the following parameters:
   *
   * - `id`: The calculation scale ID.
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
  getCalculationRangesOfCalculationScaleResponse(params: CalculationScalesService.GetCalculationRangesOfCalculationScaleParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, cumulative?: number, rangeStart?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, calculationMethodId?: number, calculationScaleId?: number}>}>> {
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
      this.rootUrl + `/rest/admin/v2/calculation-scales/${params.id}/calculation-ranges`,
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
   * @param params The `CalculationScalesService.GetCalculationRangesOfCalculationScaleParams` containing the following parameters:
   *
   * - `id`: The calculation scale ID.
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
  getCalculationRangesOfCalculationScale(params: CalculationScalesService.GetCalculationRangesOfCalculationScaleParams): __Observable<{count?: number, items?: Array<{id?: number, cumulative?: number, rangeStart?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, calculationMethodId?: number, calculationScaleId?: number}>}> {
    return this.getCalculationRangesOfCalculationScaleResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, cumulative?: number, rangeStart?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, calculationMethodId?: number, calculationScaleId?: number}>})
    );
  }
}

module CalculationScalesService {

  /**
   * Parameters for getCalculationScales
   */
  export interface GetCalculationScalesParams {

    /**
     * The calculation scale ID.
     */
    id?: number;

    /**
     * A character string that uniquely identifies this Calculation Scale.
     */
    scaleCode?: string;

    /**
     * The Unit of measure for the range start values of the Calculation Range for this Calculation Scale.
     */
    unitOfMeasure?: string;

    /**
     * The currency for the range start values of the Calculation Range for this Calculation Scale.
     */
    currency?: string;

    /**
     * The reference number of the store this Calculation Scale associated with.
     */
    storeId?: number;

    /**
     * The detailed description of the Calculation Scale.
     */
    scaleDescription?: string;

    /**
     * Customizable.
     */
    field1?: string;

    /**
     * The Calculation Scale lookup method can be used by the Calculation Scale to calculate a monetary amount. -28 for a shipping scale based on quantity. -29 for a shipping scale based on weight. -33 for a shipping range returning a fixed shipping.
     */
    scaleLookupMethod?: number;

    /**
     * Indicates the kind of calculation this Calculation Scale is used for. For example, the Calculation Scale may be used to calculate one of the monetary amounts, discounts, shipping charges, sales tax, or shipping tax.
     */
    calculationUsageId?: number;

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
   * Parameters for getCalculationScaleById
   */
  export interface GetCalculationScaleByIdParams {

    /**
     * The calculation scale ID.
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
   * Parameters for updateCalculationScaleById
   */
  export interface UpdateCalculationScaleByIdParams {

    /**
     * A calculation scale defines what the charge is based on when calculating different kinds of charges. For example, the shipping charge can be charged by total price, weight, quantity, etc.
     */
    CalculationScale: {id?: number, scaleCode?: string, unitOfMeasure?: string, currency?: string, storeId?: number, scaleDescription?: string, field1?: string, scaleLookupMethod?: number, calculationUsageId?: number};

    /**
     * The calculation scale ID.
     */
    id: number;
  }

  /**
   * Parameters for getDescriptionsOfCalculationScale
   */
  export interface GetDescriptionsOfCalculationScaleParams {

    /**
     * The calculation scale ID.
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
   * Parameters for getCalculationRulesOfCalculationScale
   */
  export interface GetCalculationRulesOfCalculationScaleParams {

    /**
     * The calculation scale ID.
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
   * Parameters for getCalculationRangesOfCalculationScale
   */
  export interface GetCalculationRangesOfCalculationScaleParams {

    /**
     * The calculation scale ID.
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

export { CalculationScalesService }
