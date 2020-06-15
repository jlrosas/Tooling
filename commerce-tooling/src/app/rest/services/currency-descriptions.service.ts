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
class CurrencyDescriptionsService extends __BaseService {
  static readonly getCurrencyDescriptionsPath = '/rest/admin/v2/currency-descriptions';
  static readonly createCurrencyDescriptionPath = '/rest/admin/v2/currency-descriptions';
  static readonly getCurrencyDescriptionByIdPath = '/rest/admin/v2/currency-descriptions/code:{code},languageId:{languageId}';
  static readonly deleteCurrencyDescriptionByIdPath = '/rest/admin/v2/currency-descriptions/code:{code},languageId:{languageId}';
  static readonly updateCurrencyDescriptionByIdPath = '/rest/admin/v2/currency-descriptions/code:{code},languageId:{languageId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of currency descriptions.
   * @param params The `CurrencyDescriptionsService.GetCurrencyDescriptionsParams` containing the following parameters:
   *
   * - `code`: This is a currency code as per ISO 4217 standards. Foreign key that references column SETCCURR in the SETCURR table.
   *
   * - `languageId`: Language ID of the Language. Foreign key that references the LANGUAGE_ID column in the Language table. For a list of language components, see the LANGUAGE table.
   *
   * - `description`: The text description of the currency in the language identified by LANGUAGE_ID.
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
   * @return A collection of currency descriptions.
   */
  getCurrencyDescriptionsResponse(params: CurrencyDescriptionsService.GetCurrencyDescriptionsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{code?: string, languageId?: number, description?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.code != null) __params = __params.set('code', params.code.toString());
    if (params.languageId != null) __params = __params.set('languageId', params.languageId.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/currency-descriptions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{code?: string, languageId?: number, description?: string}>}>;
      })
    );
  }

  /**
   * Get a collection of currency descriptions.
   * @param params The `CurrencyDescriptionsService.GetCurrencyDescriptionsParams` containing the following parameters:
   *
   * - `code`: This is a currency code as per ISO 4217 standards. Foreign key that references column SETCCURR in the SETCURR table.
   *
   * - `languageId`: Language ID of the Language. Foreign key that references the LANGUAGE_ID column in the Language table. For a list of language components, see the LANGUAGE table.
   *
   * - `description`: The text description of the currency in the language identified by LANGUAGE_ID.
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
   * @return A collection of currency descriptions.
   */
  getCurrencyDescriptions(params: CurrencyDescriptionsService.GetCurrencyDescriptionsParams): __Observable<{count?: number, items?: Array<{code?: string, languageId?: number, description?: string}>}> {
    return this.getCurrencyDescriptionsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{code?: string, languageId?: number, description?: string}>})
    );
  }

  /**
   * Create a currency description.
   * @param CurrencyDescription Text descriptions for each of the currency.
   */
  createCurrencyDescriptionResponse(CurrencyDescription: {code?: string, languageId?: number, description?: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CurrencyDescription;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/currency-descriptions`,
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
   * Create a currency description.
   * @param CurrencyDescription Text descriptions for each of the currency.
   */
  createCurrencyDescription(CurrencyDescription: {code?: string, languageId?: number, description?: string}): __Observable<null> {
    return this.createCurrencyDescriptionResponse(CurrencyDescription).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a currency description.
   * @param params The `CurrencyDescriptionsService.GetCurrencyDescriptionByIdParams` containing the following parameters:
   *
   * - `code`: This is a currency code as per ISO 4217 standards. Foreign key that references column SETCCURR in the SETCURR table.
   *
   * - `languageId`: Language ID of the Language. Foreign key that references the LANGUAGE_ID column in the Language table. For a list of language components, see the LANGUAGE table.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Text descriptions for each of the currency.
   */
  getCurrencyDescriptionByIdResponse(params: CurrencyDescriptionsService.GetCurrencyDescriptionByIdParams): __Observable<__StrictHttpResponse<{code?: string, languageId?: number, description?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/currency-descriptions/code:${params.code},languageId:${params.languageId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{code?: string, languageId?: number, description?: string}>;
      })
    );
  }

  /**
   * Get a currency description.
   * @param params The `CurrencyDescriptionsService.GetCurrencyDescriptionByIdParams` containing the following parameters:
   *
   * - `code`: This is a currency code as per ISO 4217 standards. Foreign key that references column SETCCURR in the SETCURR table.
   *
   * - `languageId`: Language ID of the Language. Foreign key that references the LANGUAGE_ID column in the Language table. For a list of language components, see the LANGUAGE table.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Text descriptions for each of the currency.
   */
  getCurrencyDescriptionById(params: CurrencyDescriptionsService.GetCurrencyDescriptionByIdParams): __Observable<{code?: string, languageId?: number, description?: string}> {
    return this.getCurrencyDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as {code?: string, languageId?: number, description?: string})
    );
  }

  /**
   * Delete a currency description.
   * @param params The `CurrencyDescriptionsService.DeleteCurrencyDescriptionByIdParams` containing the following parameters:
   *
   * - `code`: This is a currency code as per ISO 4217 standards. Foreign key that references column SETCCURR in the SETCURR table.
   *
   * - `languageId`: Language ID of the Language. Foreign key that references the LANGUAGE_ID column in the Language table. For a list of language components, see the LANGUAGE table.
   */
  deleteCurrencyDescriptionByIdResponse(params: CurrencyDescriptionsService.DeleteCurrencyDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/currency-descriptions/code:${params.code},languageId:${params.languageId}`,
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
   * Delete a currency description.
   * @param params The `CurrencyDescriptionsService.DeleteCurrencyDescriptionByIdParams` containing the following parameters:
   *
   * - `code`: This is a currency code as per ISO 4217 standards. Foreign key that references column SETCCURR in the SETCURR table.
   *
   * - `languageId`: Language ID of the Language. Foreign key that references the LANGUAGE_ID column in the Language table. For a list of language components, see the LANGUAGE table.
   */
  deleteCurrencyDescriptionById(params: CurrencyDescriptionsService.DeleteCurrencyDescriptionByIdParams): __Observable<null> {
    return this.deleteCurrencyDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a currency description.
   * @param params The `CurrencyDescriptionsService.UpdateCurrencyDescriptionByIdParams` containing the following parameters:
   *
   * - `CurrencyDescription`: Text descriptions for each of the currency.
   *
   * - `code`: This is a currency code as per ISO 4217 standards. Foreign key that references column SETCCURR in the SETCURR table.
   *
   * - `languageId`: Language ID of the Language. Foreign key that references the LANGUAGE_ID column in the Language table. For a list of language components, see the LANGUAGE table.
   */
  updateCurrencyDescriptionByIdResponse(params: CurrencyDescriptionsService.UpdateCurrencyDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.CurrencyDescription;


    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/currency-descriptions/code:${params.code},languageId:${params.languageId}`,
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
   * Update a currency description.
   * @param params The `CurrencyDescriptionsService.UpdateCurrencyDescriptionByIdParams` containing the following parameters:
   *
   * - `CurrencyDescription`: Text descriptions for each of the currency.
   *
   * - `code`: This is a currency code as per ISO 4217 standards. Foreign key that references column SETCCURR in the SETCURR table.
   *
   * - `languageId`: Language ID of the Language. Foreign key that references the LANGUAGE_ID column in the Language table. For a list of language components, see the LANGUAGE table.
   */
  updateCurrencyDescriptionById(params: CurrencyDescriptionsService.UpdateCurrencyDescriptionByIdParams): __Observable<null> {
    return this.updateCurrencyDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CurrencyDescriptionsService {

  /**
   * Parameters for getCurrencyDescriptions
   */
  export interface GetCurrencyDescriptionsParams {

    /**
     * This is a currency code as per ISO 4217 standards. Foreign key that references column SETCCURR in the SETCURR table.
     */
    code?: string;

    /**
     * Language ID of the Language. Foreign key that references the LANGUAGE_ID column in the Language table. For a list of language components, see the LANGUAGE table.
     */
    languageId?: number;

    /**
     * The text description of the currency in the language identified by LANGUAGE_ID.
     */
    description?: string;

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
   * Parameters for getCurrencyDescriptionById
   */
  export interface GetCurrencyDescriptionByIdParams {

    /**
     * This is a currency code as per ISO 4217 standards. Foreign key that references column SETCCURR in the SETCURR table.
     */
    code: string;

    /**
     * Language ID of the Language. Foreign key that references the LANGUAGE_ID column in the Language table. For a list of language components, see the LANGUAGE table.
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
   * Parameters for deleteCurrencyDescriptionById
   */
  export interface DeleteCurrencyDescriptionByIdParams {

    /**
     * This is a currency code as per ISO 4217 standards. Foreign key that references column SETCCURR in the SETCURR table.
     */
    code: string;

    /**
     * Language ID of the Language. Foreign key that references the LANGUAGE_ID column in the Language table. For a list of language components, see the LANGUAGE table.
     */
    languageId: number;
  }

  /**
   * Parameters for updateCurrencyDescriptionById
   */
  export interface UpdateCurrencyDescriptionByIdParams {

    /**
     * Text descriptions for each of the currency.
     */
    CurrencyDescription: {code?: string, languageId?: number, description?: string};

    /**
     * This is a currency code as per ISO 4217 standards. Foreign key that references column SETCCURR in the SETCURR table.
     */
    code: string;

    /**
     * Language ID of the Language. Foreign key that references the LANGUAGE_ID column in the Language table. For a list of language components, see the LANGUAGE table.
     */
    languageId: number;
  }
}

export { CurrencyDescriptionsService }
