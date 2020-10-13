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
class CalculationCodesService extends __BaseService {
  static readonly getCalculationCodesPath = '/rest/admin/v2/calculation-codes';
  static readonly createCalculationCodePath = '/rest/admin/v2/calculation-codes';
  static readonly getCalculationCodeByIdPath = '/rest/admin/v2/calculation-codes/{id}';
  static readonly deleteCalculationCodeByIdPath = '/rest/admin/v2/calculation-codes/{id}';
  static readonly updateCalculationCodeByIdPath = '/rest/admin/v2/calculation-codes/{id}';
  static readonly getDescriptionsOfCalculationCodePath = '/rest/admin/v2/calculation-codes/{id}/descriptions';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of calculation codes.
   * @param params The `CalculationCodesService.GetCalculationCodesParams` containing the following parameters:
   *
   * - `searchString`: Limits search results to only include calculation codes with a calculationCode that matches the value of this parameter. Searches are case-insensitive.
   *
   * - `id`: The unique numeric ID for identifying the calculation Code.
   *
   * - `excludeId`: The unique numeric ID for identifying calculation codes to be excluded from the result set.
   *
   * - `calculationCode`: The external identifier or name for identifying the calculation code, given a particular calculation usage and store ID.
   *
   * - `combination`: Specify the bit flag to determine how this calculation rule can be combined with other calculation rules, 0 = The rule can be combined with any other rule. 1 = The rule can only be combined with rules that have the combination type 0 rules. 2 = The rule cannot be combined with rules that have the combination type 1.
   *
   * - `groupBy`: A Bit flag to indicate how the calculation method groups order items when performing calculations. Each group of order itmes is used to calculate a monetary amount, which is applied separately. The default calculation method recognizes the following groupings, 1 by product - Order items with different catalog entries should be grouped separately. When a catalog entry has a parent catalog entry, then the parent catalog entry is used instead. 2 by trading agreement - Order items with different trading agreements should be grouped separately. 4 by offer - Order items with different Offers should be grouped separately. 8 by address - Order items with different shipping addresses should be grouped separately. Bit flags can be added together to combine groupings. For example, 0 = No grouping. Place all applicable order items in a single group. 1 = Use for product grouping. 2 = Use for trading agreement grouping. 3 = Use for product and for trading agreement grouping. 4 = Use for offer grouping. 6 = Use for offer and for trading agreement grouping. 9 = Use for product and for address grouping.
   *
   * - `published`: Specifies whether or not the calculation code is published, 0 = not published (temporarily disabled). 1 = published.
   *
   * - `sequence`: When multiple calculation codes with the same calculation usage are processed, they are processed in ascending order based on the numeric values of this property.
   *
   * - `storeId`: The store ID this calculation code is associated with.
   *
   * - `taxCodeClassId`: If this calculation code is used to calculate taxes, then it can be grouped together with other tax calculation codes into a tax code classification. When the calculation code is used for shipping, this value can be null.
   *
   * - `updatedDate`: The time this calculation code was most recently updated.
   *
   * - `field1`: A customizable field.
   *
   * - `description`: A brief description of this calculation code, suitable for display by a user interface that manages calculation codes.
   *
   * - `displayLevel`: Amounts calculated by this calculation code should be displayed with each, 0 = OrderItem, 1 = Order, 2 = Product, 3 = Item, 4 = Contract.
   *
   * - `startDate`: The date and time this calculation code begins being effective.
   *
   * - `endDate`: The date and time this calculation code stops being effective.
   *
   * - `precedence`: Reserved for HCL Internal use.
   *
   * - `calculationUsageId`: default is, -2. The calculation usage identifier. Indicates the kind of calculation this calculation code is used for. For example, the calculation code may be used to calculate one of the following monetary amounts, discounts, shipping charges, sales tax, or shipping tax. Out of box, -1 is for Discount, -2 is for Shipping, -3 is for Sales Tax. -4 is for Shipping Tax, -5 is for Coupon and -6 is for surcharge. For shipping always use the value -2.
   *
   * - `calculationMethodId`: default is, -23. The calculation code calculate method that defines how to calculate a monetary amount for this calculation code. For shipping, the calculation method ID must be -23.
   *
   * - `calculationCodeApplyMethodId`: default is, -24. The calculation code apply method that stores the calculated amount for the associated order items. For shipping, the calculation code apply method ID must be -24.
   *
   * - `calculationCodeQualifyMethodId`: default is, -22. The calculation code qualify method that defines which order items are associated with this valculation code. For shipping, the calculation code qualify methodID must be -22.
   *
   * - `calculationCodeQualifyMethodMode`: The mode which controls whether the qualify calculation method ID (calculationCodeQualifyMethodId) of this calculation code should be invoked. Allowed values are, 0 = unrestricted, the method will not be invoked, and 1 = restricted, the method will be invoked. Default is 0.
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
   * @return A collection of calculation Codes.
   */
  getCalculationCodesResponse(params: CalculationCodesService.GetCalculationCodesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, calculationCode?: string, combination?: number, groupBy?: number, published?: number, sequence?: number, storeId?: number, taxCodeClassId?: number, updatedDate?: string, field1?: string, description?: string, displayLevel?: number, startDate?: string, endDate?: string, precedence?: number, calculationUsageId?: number, calculationMethodId?: number, calculationCodeApplyMethodId?: number, calculationCodeQualifyMethodId?: number, calculationCodeQualifyMethodMode?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    (params.id || []).forEach(val => {if (val != null) __params = __params.append('id', val.toString())});
    (params.excludeId || []).forEach(val => {if (val != null) __params = __params.append('excludeId', val.toString())});
    if (params.calculationCode != null) __params = __params.set('calculationCode', params.calculationCode.toString());
    if (params.combination != null) __params = __params.set('combination', params.combination.toString());
    if (params.groupBy != null) __params = __params.set('groupBy', params.groupBy.toString());
    if (params.published != null) __params = __params.set('published', params.published.toString());
    if (params.sequence != null) __params = __params.set('sequence', params.sequence.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.taxCodeClassId != null) __params = __params.set('taxCodeClassId', params.taxCodeClassId.toString());
    if (params.updatedDate != null) __params = __params.set('updatedDate', params.updatedDate.toString());
    if (params.field1 != null) __params = __params.set('field1', params.field1.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.displayLevel != null) __params = __params.set('displayLevel', params.displayLevel.toString());
    if (params.startDate != null) __params = __params.set('startDate', params.startDate.toString());
    if (params.endDate != null) __params = __params.set('endDate', params.endDate.toString());
    if (params.precedence != null) __params = __params.set('precedence', params.precedence.toString());
    (params.calculationUsageId || []).forEach(val => {if (val != null) __params = __params.append('calculationUsageId', val.toString())});
    if (params.calculationMethodId != null) __params = __params.set('calculationMethodId', params.calculationMethodId.toString());
    if (params.calculationCodeApplyMethodId != null) __params = __params.set('calculationCodeApplyMethodId', params.calculationCodeApplyMethodId.toString());
    if (params.calculationCodeQualifyMethodId != null) __params = __params.set('calculationCodeQualifyMethodId', params.calculationCodeQualifyMethodId.toString());
    if (params.calculationCodeQualifyMethodMode != null) __params = __params.set('calculationCodeQualifyMethodMode', params.calculationCodeQualifyMethodMode.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/calculation-codes`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, calculationCode?: string, combination?: number, groupBy?: number, published?: number, sequence?: number, storeId?: number, taxCodeClassId?: number, updatedDate?: string, field1?: string, description?: string, displayLevel?: number, startDate?: string, endDate?: string, precedence?: number, calculationUsageId?: number, calculationMethodId?: number, calculationCodeApplyMethodId?: number, calculationCodeQualifyMethodId?: number, calculationCodeQualifyMethodMode?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of calculation codes.
   * @param params The `CalculationCodesService.GetCalculationCodesParams` containing the following parameters:
   *
   * - `searchString`: Limits search results to only include calculation codes with a calculationCode that matches the value of this parameter. Searches are case-insensitive.
   *
   * - `id`: The unique numeric ID for identifying the calculation Code.
   *
   * - `excludeId`: The unique numeric ID for identifying calculation codes to be excluded from the result set.
   *
   * - `calculationCode`: The external identifier or name for identifying the calculation code, given a particular calculation usage and store ID.
   *
   * - `combination`: Specify the bit flag to determine how this calculation rule can be combined with other calculation rules, 0 = The rule can be combined with any other rule. 1 = The rule can only be combined with rules that have the combination type 0 rules. 2 = The rule cannot be combined with rules that have the combination type 1.
   *
   * - `groupBy`: A Bit flag to indicate how the calculation method groups order items when performing calculations. Each group of order itmes is used to calculate a monetary amount, which is applied separately. The default calculation method recognizes the following groupings, 1 by product - Order items with different catalog entries should be grouped separately. When a catalog entry has a parent catalog entry, then the parent catalog entry is used instead. 2 by trading agreement - Order items with different trading agreements should be grouped separately. 4 by offer - Order items with different Offers should be grouped separately. 8 by address - Order items with different shipping addresses should be grouped separately. Bit flags can be added together to combine groupings. For example, 0 = No grouping. Place all applicable order items in a single group. 1 = Use for product grouping. 2 = Use for trading agreement grouping. 3 = Use for product and for trading agreement grouping. 4 = Use for offer grouping. 6 = Use for offer and for trading agreement grouping. 9 = Use for product and for address grouping.
   *
   * - `published`: Specifies whether or not the calculation code is published, 0 = not published (temporarily disabled). 1 = published.
   *
   * - `sequence`: When multiple calculation codes with the same calculation usage are processed, they are processed in ascending order based on the numeric values of this property.
   *
   * - `storeId`: The store ID this calculation code is associated with.
   *
   * - `taxCodeClassId`: If this calculation code is used to calculate taxes, then it can be grouped together with other tax calculation codes into a tax code classification. When the calculation code is used for shipping, this value can be null.
   *
   * - `updatedDate`: The time this calculation code was most recently updated.
   *
   * - `field1`: A customizable field.
   *
   * - `description`: A brief description of this calculation code, suitable for display by a user interface that manages calculation codes.
   *
   * - `displayLevel`: Amounts calculated by this calculation code should be displayed with each, 0 = OrderItem, 1 = Order, 2 = Product, 3 = Item, 4 = Contract.
   *
   * - `startDate`: The date and time this calculation code begins being effective.
   *
   * - `endDate`: The date and time this calculation code stops being effective.
   *
   * - `precedence`: Reserved for HCL Internal use.
   *
   * - `calculationUsageId`: default is, -2. The calculation usage identifier. Indicates the kind of calculation this calculation code is used for. For example, the calculation code may be used to calculate one of the following monetary amounts, discounts, shipping charges, sales tax, or shipping tax. Out of box, -1 is for Discount, -2 is for Shipping, -3 is for Sales Tax. -4 is for Shipping Tax, -5 is for Coupon and -6 is for surcharge. For shipping always use the value -2.
   *
   * - `calculationMethodId`: default is, -23. The calculation code calculate method that defines how to calculate a monetary amount for this calculation code. For shipping, the calculation method ID must be -23.
   *
   * - `calculationCodeApplyMethodId`: default is, -24. The calculation code apply method that stores the calculated amount for the associated order items. For shipping, the calculation code apply method ID must be -24.
   *
   * - `calculationCodeQualifyMethodId`: default is, -22. The calculation code qualify method that defines which order items are associated with this valculation code. For shipping, the calculation code qualify methodID must be -22.
   *
   * - `calculationCodeQualifyMethodMode`: The mode which controls whether the qualify calculation method ID (calculationCodeQualifyMethodId) of this calculation code should be invoked. Allowed values are, 0 = unrestricted, the method will not be invoked, and 1 = restricted, the method will be invoked. Default is 0.
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
   * @return A collection of calculation Codes.
   */
  getCalculationCodes(params: CalculationCodesService.GetCalculationCodesParams): __Observable<{count?: number, items?: Array<{id?: number, calculationCode?: string, combination?: number, groupBy?: number, published?: number, sequence?: number, storeId?: number, taxCodeClassId?: number, updatedDate?: string, field1?: string, description?: string, displayLevel?: number, startDate?: string, endDate?: string, precedence?: number, calculationUsageId?: number, calculationMethodId?: number, calculationCodeApplyMethodId?: number, calculationCodeQualifyMethodId?: number, calculationCodeQualifyMethodMode?: number}>}> {
    return this.getCalculationCodesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, calculationCode?: string, combination?: number, groupBy?: number, published?: number, sequence?: number, storeId?: number, taxCodeClassId?: number, updatedDate?: string, field1?: string, description?: string, displayLevel?: number, startDate?: string, endDate?: string, precedence?: number, calculationUsageId?: number, calculationMethodId?: number, calculationCodeApplyMethodId?: number, calculationCodeQualifyMethodId?: number, calculationCodeQualifyMethodMode?: number}>})
    );
  }

  /**
   * Create a calculation code.
   * @param CalculationCode The calculation code.
   */
  createCalculationCodeResponse(CalculationCode: {id?: number, calculationCode?: string, combination?: number, groupBy?: number, published?: number, sequence?: number, storeId?: number, taxCodeClassId?: number, updatedDate?: string, field1?: string, description?: string, displayLevel?: number, startDate?: string, endDate?: string, precedence?: number, calculationUsageId?: number, calculationMethodId?: number, calculationCodeApplyMethodId?: number, calculationCodeQualifyMethodId?: number, calculationCodeQualifyMethodMode?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CalculationCode;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/calculation-codes`,
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
   * Create a calculation code.
   * @param CalculationCode The calculation code.
   */
  createCalculationCode(CalculationCode: {id?: number, calculationCode?: string, combination?: number, groupBy?: number, published?: number, sequence?: number, storeId?: number, taxCodeClassId?: number, updatedDate?: string, field1?: string, description?: string, displayLevel?: number, startDate?: string, endDate?: string, precedence?: number, calculationUsageId?: number, calculationMethodId?: number, calculationCodeApplyMethodId?: number, calculationCodeQualifyMethodId?: number, calculationCodeQualifyMethodMode?: number}): __Observable<null> {
    return this.createCalculationCodeResponse(CalculationCode).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a calculation code.
   * @param params The `CalculationCodesService.GetCalculationCodeByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the calculation Code.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The calculation code.
   */
  getCalculationCodeByIdResponse(params: CalculationCodesService.GetCalculationCodeByIdParams): __Observable<__StrictHttpResponse<{id?: number, calculationCode?: string, combination?: number, groupBy?: number, published?: number, sequence?: number, storeId?: number, taxCodeClassId?: number, updatedDate?: string, field1?: string, description?: string, displayLevel?: number, startDate?: string, endDate?: string, precedence?: number, calculationUsageId?: number, calculationMethodId?: number, calculationCodeApplyMethodId?: number, calculationCodeQualifyMethodId?: number, calculationCodeQualifyMethodMode?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/calculation-codes/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, calculationCode?: string, combination?: number, groupBy?: number, published?: number, sequence?: number, storeId?: number, taxCodeClassId?: number, updatedDate?: string, field1?: string, description?: string, displayLevel?: number, startDate?: string, endDate?: string, precedence?: number, calculationUsageId?: number, calculationMethodId?: number, calculationCodeApplyMethodId?: number, calculationCodeQualifyMethodId?: number, calculationCodeQualifyMethodMode?: number}>;
      })
    );
  }

  /**
   * Get a calculation code.
   * @param params The `CalculationCodesService.GetCalculationCodeByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the calculation Code.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The calculation code.
   */
  getCalculationCodeById(params: CalculationCodesService.GetCalculationCodeByIdParams): __Observable<{id?: number, calculationCode?: string, combination?: number, groupBy?: number, published?: number, sequence?: number, storeId?: number, taxCodeClassId?: number, updatedDate?: string, field1?: string, description?: string, displayLevel?: number, startDate?: string, endDate?: string, precedence?: number, calculationUsageId?: number, calculationMethodId?: number, calculationCodeApplyMethodId?: number, calculationCodeQualifyMethodId?: number, calculationCodeQualifyMethodMode?: number}> {
    return this.getCalculationCodeByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, calculationCode?: string, combination?: number, groupBy?: number, published?: number, sequence?: number, storeId?: number, taxCodeClassId?: number, updatedDate?: string, field1?: string, description?: string, displayLevel?: number, startDate?: string, endDate?: string, precedence?: number, calculationUsageId?: number, calculationMethodId?: number, calculationCodeApplyMethodId?: number, calculationCodeQualifyMethodId?: number, calculationCodeQualifyMethodMode?: number})
    );
  }

  /**
   * Delete a calculation code.
   * @param id The unique numeric ID for identifying the calculation Code.
   */
  deleteCalculationCodeByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/calculation-codes/${id}`,
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
   * Delete a calculation code.
   * @param id The unique numeric ID for identifying the calculation Code.
   */
  deleteCalculationCodeById(id: number): __Observable<null> {
    return this.deleteCalculationCodeByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a calculation code.
   * @param params The `CalculationCodesService.UpdateCalculationCodeByIdParams` containing the following parameters:
   *
   * - `CalculationCode`: The calculation code.
   *
   * - `id`: The unique numeric ID for identifying the calculation Code.
   */
  updateCalculationCodeByIdResponse(params: CalculationCodesService.UpdateCalculationCodeByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.CalculationCode;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/calculation-codes/${params.id}`,
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
   * Update a calculation code.
   * @param params The `CalculationCodesService.UpdateCalculationCodeByIdParams` containing the following parameters:
   *
   * - `CalculationCode`: The calculation code.
   *
   * - `id`: The unique numeric ID for identifying the calculation Code.
   */
  updateCalculationCodeById(params: CalculationCodesService.UpdateCalculationCodeByIdParams): __Observable<null> {
    return this.updateCalculationCodeByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CalculationCodesService.GetDescriptionsOfCalculationCodeParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the calculation Code.
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
   * @return A collection of calculation code descriptions.
   */
  getDescriptionsOfCalculationCodeResponse(params: CalculationCodesService.GetDescriptionsOfCalculationCodeParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{calculationCodeId?: number, languageId?: number, description?: string, longDescription?: string}>}>> {
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
      this.rootUrl + `/rest/admin/v2/calculation-codes/${params.id}/descriptions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{calculationCodeId?: number, languageId?: number, description?: string, longDescription?: string}>}>;
      })
    );
  }

  /**
   * @param params The `CalculationCodesService.GetDescriptionsOfCalculationCodeParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the calculation Code.
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
   * @return A collection of calculation code descriptions.
   */
  getDescriptionsOfCalculationCode(params: CalculationCodesService.GetDescriptionsOfCalculationCodeParams): __Observable<{count?: number, items?: Array<{calculationCodeId?: number, languageId?: number, description?: string, longDescription?: string}>}> {
    return this.getDescriptionsOfCalculationCodeResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{calculationCodeId?: number, languageId?: number, description?: string, longDescription?: string}>})
    );
  }
}

module CalculationCodesService {

  /**
   * Parameters for getCalculationCodes
   */
  export interface GetCalculationCodesParams {

    /**
     * Limits search results to only include calculation codes with a calculationCode that matches the value of this parameter. Searches are case-insensitive.
     */
    searchString?: string;

    /**
     * The unique numeric ID for identifying the calculation Code.
     */
    id?: Array<number>;

    /**
     * The unique numeric ID for identifying calculation codes to be excluded from the result set.
     */
    excludeId?: Array<number>;

    /**
     * The external identifier or name for identifying the calculation code, given a particular calculation usage and store ID.
     */
    calculationCode?: string;

    /**
     * Specify the bit flag to determine how this calculation rule can be combined with other calculation rules, 0 = The rule can be combined with any other rule. 1 = The rule can only be combined with rules that have the combination type 0 rules. 2 = The rule cannot be combined with rules that have the combination type 1.
     */
    combination?: number;

    /**
     * A Bit flag to indicate how the calculation method groups order items when performing calculations. Each group of order itmes is used to calculate a monetary amount, which is applied separately. The default calculation method recognizes the following groupings, 1 by product - Order items with different catalog entries should be grouped separately. When a catalog entry has a parent catalog entry, then the parent catalog entry is used instead. 2 by trading agreement - Order items with different trading agreements should be grouped separately. 4 by offer - Order items with different Offers should be grouped separately. 8 by address - Order items with different shipping addresses should be grouped separately. Bit flags can be added together to combine groupings. For example, 0 = No grouping. Place all applicable order items in a single group. 1 = Use for product grouping. 2 = Use for trading agreement grouping. 3 = Use for product and for trading agreement grouping. 4 = Use for offer grouping. 6 = Use for offer and for trading agreement grouping. 9 = Use for product and for address grouping.
     */
    groupBy?: number;

    /**
     * Specifies whether or not the calculation code is published, 0 = not published (temporarily disabled). 1 = published.
     */
    published?: number;

    /**
     * When multiple calculation codes with the same calculation usage are processed, they are processed in ascending order based on the numeric values of this property.
     */
    sequence?: number;

    /**
     * The store ID this calculation code is associated with.
     */
    storeId?: number;

    /**
     * If this calculation code is used to calculate taxes, then it can be grouped together with other tax calculation codes into a tax code classification. When the calculation code is used for shipping, this value can be null.
     */
    taxCodeClassId?: number;

    /**
     * The time this calculation code was most recently updated.
     */
    updatedDate?: string;

    /**
     * A customizable field.
     */
    field1?: string;

    /**
     * A brief description of this calculation code, suitable for display by a user interface that manages calculation codes.
     */
    description?: string;

    /**
     * Amounts calculated by this calculation code should be displayed with each, 0 = OrderItem, 1 = Order, 2 = Product, 3 = Item, 4 = Contract.
     */
    displayLevel?: number;

    /**
     * The date and time this calculation code begins being effective.
     */
    startDate?: string;

    /**
     * The date and time this calculation code stops being effective.
     */
    endDate?: string;

    /**
     * Reserved for HCL Internal use.
     */
    precedence?: number;

    /**
     * default is, -2. The calculation usage identifier. Indicates the kind of calculation this calculation code is used for. For example, the calculation code may be used to calculate one of the following monetary amounts, discounts, shipping charges, sales tax, or shipping tax. Out of box, -1 is for Discount, -2 is for Shipping, -3 is for Sales Tax. -4 is for Shipping Tax, -5 is for Coupon and -6 is for surcharge. For shipping always use the value -2.
     */
    calculationUsageId?: Array<number>;

    /**
     * default is, -23. The calculation code calculate method that defines how to calculate a monetary amount for this calculation code. For shipping, the calculation method ID must be -23.
     */
    calculationMethodId?: number;

    /**
     * default is, -24. The calculation code apply method that stores the calculated amount for the associated order items. For shipping, the calculation code apply method ID must be -24.
     */
    calculationCodeApplyMethodId?: number;

    /**
     * default is, -22. The calculation code qualify method that defines which order items are associated with this valculation code. For shipping, the calculation code qualify methodID must be -22.
     */
    calculationCodeQualifyMethodId?: number;

    /**
     * The mode which controls whether the qualify calculation method ID (calculationCodeQualifyMethodId) of this calculation code should be invoked. Allowed values are, 0 = unrestricted, the method will not be invoked, and 1 = restricted, the method will be invoked. Default is 0.
     */
    calculationCodeQualifyMethodMode?: number;

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
   * Parameters for getCalculationCodeById
   */
  export interface GetCalculationCodeByIdParams {

    /**
     * The unique numeric ID for identifying the calculation Code.
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
   * Parameters for updateCalculationCodeById
   */
  export interface UpdateCalculationCodeByIdParams {

    /**
     * The calculation code.
     */
    CalculationCode: {id?: number, calculationCode?: string, combination?: number, groupBy?: number, published?: number, sequence?: number, storeId?: number, taxCodeClassId?: number, updatedDate?: string, field1?: string, description?: string, displayLevel?: number, startDate?: string, endDate?: string, precedence?: number, calculationUsageId?: number, calculationMethodId?: number, calculationCodeApplyMethodId?: number, calculationCodeQualifyMethodId?: number, calculationCodeQualifyMethodMode?: number};

    /**
     * The unique numeric ID for identifying the calculation Code.
     */
    id: number;
  }

  /**
   * Parameters for getDescriptionsOfCalculationCode
   */
  export interface GetDescriptionsOfCalculationCodeParams {

    /**
     * The unique numeric ID for identifying the calculation Code.
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

export { CalculationCodesService }
