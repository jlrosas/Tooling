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
class TaxCategoryDescriptionsService extends __BaseService {
  static readonly getTaxCategoryDescriptionsPath = '/rest/admin/v2/tax-category-descriptions';
  static readonly createTaxCategoryDescriptionPath = '/rest/admin/v2/tax-category-descriptions';
  static readonly getTaxCategoryDescriptionByIdPath = '/rest/admin/v2/tax-category-descriptions/languageId:{languageId},taxCategoryId:{taxCategoryId}';
  static readonly deleteTaxCategoryDescriptionByIdPath = '/rest/admin/v2/tax-category-descriptions/languageId:{languageId},taxCategoryId:{taxCategoryId}';
  static readonly updateTaxCategoryDescriptionByIdPath = '/rest/admin/v2/tax-category-descriptions/languageId:{languageId},taxCategoryId:{taxCategoryId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of tax category description.
   * @param params The `TaxCategoryDescriptionsService.GetTaxCategoryDescriptionsParams` containing the following parameters:
   *
   * - `taxCategoryId`: The Tax Category ID.
   *
   * - `languageId`: The Language ID.
   *
   * - `description`: A brief description of the tax category, suitable for display to a customer for selection. For example, Sales tax, Shipping tax.
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
   * @return A collection of tax category description.
   */
  getTaxCategoryDescriptionsResponse(params: TaxCategoryDescriptionsService.GetTaxCategoryDescriptionsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{taxCategoryId?: number, languageId?: number, description?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.taxCategoryId != null) __params = __params.set('taxCategoryId', params.taxCategoryId.toString());
    if (params.languageId != null) __params = __params.set('languageId', params.languageId.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/tax-category-descriptions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{taxCategoryId?: number, languageId?: number, description?: string}>}>;
      })
    );
  }

  /**
   * Get a collection of tax category description.
   * @param params The `TaxCategoryDescriptionsService.GetTaxCategoryDescriptionsParams` containing the following parameters:
   *
   * - `taxCategoryId`: The Tax Category ID.
   *
   * - `languageId`: The Language ID.
   *
   * - `description`: A brief description of the tax category, suitable for display to a customer for selection. For example, Sales tax, Shipping tax.
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
   * @return A collection of tax category description.
   */
  getTaxCategoryDescriptions(params: TaxCategoryDescriptionsService.GetTaxCategoryDescriptionsParams): __Observable<{count?: number, items?: Array<{taxCategoryId?: number, languageId?: number, description?: string}>}> {
    return this.getTaxCategoryDescriptionsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{taxCategoryId?: number, languageId?: number, description?: string}>})
    );
  }

  /**
   * Create a tax category description.
   * @param TaxCategoryDescription A tax category description.
   */
  createTaxCategoryDescriptionResponse(TaxCategoryDescription: {taxCategoryId?: number, languageId?: number, description?: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = TaxCategoryDescription;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/tax-category-descriptions`,
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
   * Create a tax category description.
   * @param TaxCategoryDescription A tax category description.
   */
  createTaxCategoryDescription(TaxCategoryDescription: {taxCategoryId?: number, languageId?: number, description?: string}): __Observable<null> {
    return this.createTaxCategoryDescriptionResponse(TaxCategoryDescription).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a tax category description.
   * @param params The `TaxCategoryDescriptionsService.GetTaxCategoryDescriptionByIdParams` containing the following parameters:
   *
   * - `languageId`: The Language ID.
   *
   * - `taxCategoryId`: The Tax Category ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A tax category description.
   */
  getTaxCategoryDescriptionByIdResponse(params: TaxCategoryDescriptionsService.GetTaxCategoryDescriptionByIdParams): __Observable<__StrictHttpResponse<{taxCategoryId?: number, languageId?: number, description?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/tax-category-descriptions/languageId:${params.languageId},taxCategoryId:${params.taxCategoryId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{taxCategoryId?: number, languageId?: number, description?: string}>;
      })
    );
  }

  /**
   * Get a tax category description.
   * @param params The `TaxCategoryDescriptionsService.GetTaxCategoryDescriptionByIdParams` containing the following parameters:
   *
   * - `languageId`: The Language ID.
   *
   * - `taxCategoryId`: The Tax Category ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A tax category description.
   */
  getTaxCategoryDescriptionById(params: TaxCategoryDescriptionsService.GetTaxCategoryDescriptionByIdParams): __Observable<{taxCategoryId?: number, languageId?: number, description?: string}> {
    return this.getTaxCategoryDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as {taxCategoryId?: number, languageId?: number, description?: string})
    );
  }

  /**
   * Delete a tax category description.
   * @param params The `TaxCategoryDescriptionsService.DeleteTaxCategoryDescriptionByIdParams` containing the following parameters:
   *
   * - `languageId`: The Language ID.
   *
   * - `taxCategoryId`: The Tax Category ID.
   */
  deleteTaxCategoryDescriptionByIdResponse(params: TaxCategoryDescriptionsService.DeleteTaxCategoryDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/tax-category-descriptions/languageId:${params.languageId},taxCategoryId:${params.taxCategoryId}`,
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
   * Delete a tax category description.
   * @param params The `TaxCategoryDescriptionsService.DeleteTaxCategoryDescriptionByIdParams` containing the following parameters:
   *
   * - `languageId`: The Language ID.
   *
   * - `taxCategoryId`: The Tax Category ID.
   */
  deleteTaxCategoryDescriptionById(params: TaxCategoryDescriptionsService.DeleteTaxCategoryDescriptionByIdParams): __Observable<null> {
    return this.deleteTaxCategoryDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a tax category description.
   * @param params The `TaxCategoryDescriptionsService.UpdateTaxCategoryDescriptionByIdParams` containing the following parameters:
   *
   * - `TaxCategoryDescription`: A tax category description.
   *
   * - `languageId`: The Language ID.
   *
   * - `taxCategoryId`: The Tax Category ID.
   */
  updateTaxCategoryDescriptionByIdResponse(params: TaxCategoryDescriptionsService.UpdateTaxCategoryDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.TaxCategoryDescription;


    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/tax-category-descriptions/languageId:${params.languageId},taxCategoryId:${params.taxCategoryId}`,
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
   * Update a tax category description.
   * @param params The `TaxCategoryDescriptionsService.UpdateTaxCategoryDescriptionByIdParams` containing the following parameters:
   *
   * - `TaxCategoryDescription`: A tax category description.
   *
   * - `languageId`: The Language ID.
   *
   * - `taxCategoryId`: The Tax Category ID.
   */
  updateTaxCategoryDescriptionById(params: TaxCategoryDescriptionsService.UpdateTaxCategoryDescriptionByIdParams): __Observable<null> {
    return this.updateTaxCategoryDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module TaxCategoryDescriptionsService {

  /**
   * Parameters for getTaxCategoryDescriptions
   */
  export interface GetTaxCategoryDescriptionsParams {

    /**
     * The Tax Category ID.
     */
    taxCategoryId?: number;

    /**
     * The Language ID.
     */
    languageId?: number;

    /**
     * A brief description of the tax category, suitable for display to a customer for selection. For example, Sales tax, Shipping tax.
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
   * Parameters for getTaxCategoryDescriptionById
   */
  export interface GetTaxCategoryDescriptionByIdParams {

    /**
     * The Language ID.
     */
    languageId: number;

    /**
     * The Tax Category ID.
     */
    taxCategoryId: number;

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
   * Parameters for deleteTaxCategoryDescriptionById
   */
  export interface DeleteTaxCategoryDescriptionByIdParams {

    /**
     * The Language ID.
     */
    languageId: number;

    /**
     * The Tax Category ID.
     */
    taxCategoryId: number;
  }

  /**
   * Parameters for updateTaxCategoryDescriptionById
   */
  export interface UpdateTaxCategoryDescriptionByIdParams {

    /**
     * A tax category description.
     */
    TaxCategoryDescription: {taxCategoryId?: number, languageId?: number, description?: string};

    /**
     * The Language ID.
     */
    languageId: number;

    /**
     * The Tax Category ID.
     */
    taxCategoryId: number;
  }
}

export { TaxCategoryDescriptionsService }
