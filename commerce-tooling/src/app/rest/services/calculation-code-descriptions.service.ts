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
class CalculationCodeDescriptionsService extends __BaseService {
  static readonly getCalculationCodeDescriptionsPath = '/rest/admin/v2/calculation-code-descriptions';
  static readonly createCalculationCodeDescriptionPath = '/rest/admin/v2/calculation-code-descriptions';
  static readonly getCalculationCodeDescriptionByIdPath = '/rest/admin/v2/calculation-code-descriptions/calculationCodeId:{calculationCodeId},languageId:{languageId}';
  static readonly deleteCalculationCodeDescriptionByIdPath = '/rest/admin/v2/calculation-code-descriptions/calculationCodeId:{calculationCodeId},languageId:{languageId}';
  static readonly updateCalculationCodeDescriptionByIdPath = '/rest/admin/v2/calculation-code-descriptions/calculationCodeId:{calculationCodeId},languageId:{languageId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of calculation code descriptions.
   * @param params The `CalculationCodeDescriptionsService.GetCalculationCodeDescriptionsParams` containing the following parameters:
   *
   * - `calculationCodeId`: The calculation code ID.
   *
   * - `languageId`: The language ID for which this information applies.
   *
   * - `description`: A short description of the calculation code.
   *
   * - `longDescription`: A detailed description of the calculation code.
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
  getCalculationCodeDescriptionsResponse(params: CalculationCodeDescriptionsService.GetCalculationCodeDescriptionsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{calculationCodeId?: number, languageId?: number, description?: string, longDescription?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.calculationCodeId != null) __params = __params.set('calculationCodeId', params.calculationCodeId.toString());
    if (params.languageId != null) __params = __params.set('languageId', params.languageId.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.longDescription != null) __params = __params.set('longDescription', params.longDescription.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/calculation-code-descriptions`,
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
   * Get a collection of calculation code descriptions.
   * @param params The `CalculationCodeDescriptionsService.GetCalculationCodeDescriptionsParams` containing the following parameters:
   *
   * - `calculationCodeId`: The calculation code ID.
   *
   * - `languageId`: The language ID for which this information applies.
   *
   * - `description`: A short description of the calculation code.
   *
   * - `longDescription`: A detailed description of the calculation code.
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
  getCalculationCodeDescriptions(params: CalculationCodeDescriptionsService.GetCalculationCodeDescriptionsParams): __Observable<{count?: number, items?: Array<{calculationCodeId?: number, languageId?: number, description?: string, longDescription?: string}>}> {
    return this.getCalculationCodeDescriptionsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{calculationCodeId?: number, languageId?: number, description?: string, longDescription?: string}>})
    );
  }

  /**
   * Create a calculation code description.
   * @param CalculationCodeDescription The calculation code description.
   */
  createCalculationCodeDescriptionResponse(CalculationCodeDescription: {calculationCodeId?: number, languageId?: number, description?: string, longDescription?: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CalculationCodeDescription;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/calculation-code-descriptions`,
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
   * Create a calculation code description.
   * @param CalculationCodeDescription The calculation code description.
   */
  createCalculationCodeDescription(CalculationCodeDescription: {calculationCodeId?: number, languageId?: number, description?: string, longDescription?: string}): __Observable<null> {
    return this.createCalculationCodeDescriptionResponse(CalculationCodeDescription).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a calculation code description.
   * @param params The `CalculationCodeDescriptionsService.GetCalculationCodeDescriptionByIdParams` containing the following parameters:
   *
   * - `calculationCodeId`: The calculation code ID.
   *
   * - `languageId`: The language ID for which this information applies.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The calculation code description.
   */
  getCalculationCodeDescriptionByIdResponse(params: CalculationCodeDescriptionsService.GetCalculationCodeDescriptionByIdParams): __Observable<__StrictHttpResponse<{calculationCodeId?: number, languageId?: number, description?: string, longDescription?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/calculation-code-descriptions/calculationCodeId:${params.calculationCodeId},languageId:${params.languageId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{calculationCodeId?: number, languageId?: number, description?: string, longDescription?: string}>;
      })
    );
  }

  /**
   * Get a calculation code description.
   * @param params The `CalculationCodeDescriptionsService.GetCalculationCodeDescriptionByIdParams` containing the following parameters:
   *
   * - `calculationCodeId`: The calculation code ID.
   *
   * - `languageId`: The language ID for which this information applies.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The calculation code description.
   */
  getCalculationCodeDescriptionById(params: CalculationCodeDescriptionsService.GetCalculationCodeDescriptionByIdParams): __Observable<{calculationCodeId?: number, languageId?: number, description?: string, longDescription?: string}> {
    return this.getCalculationCodeDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as {calculationCodeId?: number, languageId?: number, description?: string, longDescription?: string})
    );
  }

  /**
   * Delete a calculation code description.
   * @param params The `CalculationCodeDescriptionsService.DeleteCalculationCodeDescriptionByIdParams` containing the following parameters:
   *
   * - `calculationCodeId`: The calculation code ID.
   *
   * - `languageId`: The language ID for which this information applies.
   */
  deleteCalculationCodeDescriptionByIdResponse(params: CalculationCodeDescriptionsService.DeleteCalculationCodeDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/calculation-code-descriptions/calculationCodeId:${params.calculationCodeId},languageId:${params.languageId}`,
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
   * Delete a calculation code description.
   * @param params The `CalculationCodeDescriptionsService.DeleteCalculationCodeDescriptionByIdParams` containing the following parameters:
   *
   * - `calculationCodeId`: The calculation code ID.
   *
   * - `languageId`: The language ID for which this information applies.
   */
  deleteCalculationCodeDescriptionById(params: CalculationCodeDescriptionsService.DeleteCalculationCodeDescriptionByIdParams): __Observable<null> {
    return this.deleteCalculationCodeDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a calculation code description.
   * @param params The `CalculationCodeDescriptionsService.UpdateCalculationCodeDescriptionByIdParams` containing the following parameters:
   *
   * - `CalculationCodeDescription`: The calculation code description.
   *
   * - `calculationCodeId`: The calculation code ID.
   *
   * - `languageId`: The language ID for which this information applies.
   */
  updateCalculationCodeDescriptionByIdResponse(params: CalculationCodeDescriptionsService.UpdateCalculationCodeDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.CalculationCodeDescription;


    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/calculation-code-descriptions/calculationCodeId:${params.calculationCodeId},languageId:${params.languageId}`,
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
   * Update a calculation code description.
   * @param params The `CalculationCodeDescriptionsService.UpdateCalculationCodeDescriptionByIdParams` containing the following parameters:
   *
   * - `CalculationCodeDescription`: The calculation code description.
   *
   * - `calculationCodeId`: The calculation code ID.
   *
   * - `languageId`: The language ID for which this information applies.
   */
  updateCalculationCodeDescriptionById(params: CalculationCodeDescriptionsService.UpdateCalculationCodeDescriptionByIdParams): __Observable<null> {
    return this.updateCalculationCodeDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CalculationCodeDescriptionsService {

  /**
   * Parameters for getCalculationCodeDescriptions
   */
  export interface GetCalculationCodeDescriptionsParams {

    /**
     * The calculation code ID.
     */
    calculationCodeId?: number;

    /**
     * The language ID for which this information applies.
     */
    languageId?: number;

    /**
     * A short description of the calculation code.
     */
    description?: string;

    /**
     * A detailed description of the calculation code.
     */
    longDescription?: string;

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
   * Parameters for getCalculationCodeDescriptionById
   */
  export interface GetCalculationCodeDescriptionByIdParams {

    /**
     * The calculation code ID.
     */
    calculationCodeId: number;

    /**
     * The language ID for which this information applies.
     */
    languageId: number;

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
   * Parameters for deleteCalculationCodeDescriptionById
   */
  export interface DeleteCalculationCodeDescriptionByIdParams {

    /**
     * The calculation code ID.
     */
    calculationCodeId: number;

    /**
     * The language ID for which this information applies.
     */
    languageId: number;
  }

  /**
   * Parameters for updateCalculationCodeDescriptionById
   */
  export interface UpdateCalculationCodeDescriptionByIdParams {

    /**
     * The calculation code description.
     */
    CalculationCodeDescription: {calculationCodeId?: number, languageId?: number, description?: string, longDescription?: string};

    /**
     * The calculation code ID.
     */
    calculationCodeId: number;

    /**
     * The language ID for which this information applies.
     */
    languageId: number;
  }
}

export { CalculationCodeDescriptionsService }
