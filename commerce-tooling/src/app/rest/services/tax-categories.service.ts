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
class TaxCategoriesService extends __BaseService {
  static readonly getTaxCategoriesPath = '/rest/admin/v2/tax-categories';
  static readonly createTaxCategoryPath = '/rest/admin/v2/tax-categories';
  static readonly getTaxCategoryByIdPath = '/rest/admin/v2/tax-categories/{id}';
  static readonly deleteTaxCategoryByIdPath = '/rest/admin/v2/tax-categories/{id}';
  static readonly updateTaxCategoryByIdPath = '/rest/admin/v2/tax-categories/{id}';
  static readonly getDescriptionsOfTaxCategoryPath = '/rest/admin/v2/tax-categories/{id}/descriptions';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of tax category.
   * @param params The `TaxCategoriesService.GetTaxCategoriesParams` containing the following parameters:
   *
   * - `searchString`: Limits search results to only include tax categories with a name that matches the value of this parameter. Searches are case-insensitive.
   *
   * - `id`: The unique numeric ID for identifying the tax category.
   *
   * - `calculationSequence`: Tax amounts are calculated in ascending order of calculationSequence.
   *
   * - `displaySequence`: A user interface can use this field to control the sequence of tax amounts displayed for an Order.
   *
   * - `displayUsage`: Specifies that this tax category in relation to the PriceDataBean, 0 is not calculated, 1 is calculated.
   *
   * - `field1`: Customizable.
   *
   * - `field2`: Customizable.
   *
   * - `field3`: Customizable.
   *
   * - `markForDelete`: Reserved for HCL Internal use.
   *
   * - `name`: A name that, along with the StoreEntity, uniquely identifies this Tax Category.
   *
   * - `storeId`: The StoreEntity of which this Tax Category is a part.
   *
   * - `taxTypeId`: The TaxType of this Tax category.
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
   * @return A collection of tax category.
   */
  getTaxCategoriesResponse(params: TaxCategoriesService.GetTaxCategoriesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, calculationSequence?: number, displaySequence?: number, displayUsage?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, name?: string, storeId?: number, taxTypeId?: number, links?: {descriptions?: {href?: string}}}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.calculationSequence != null) __params = __params.set('calculationSequence', params.calculationSequence.toString());
    if (params.displaySequence != null) __params = __params.set('displaySequence', params.displaySequence.toString());
    if (params.displayUsage != null) __params = __params.set('displayUsage', params.displayUsage.toString());
    if (params.field1 != null) __params = __params.set('field1', params.field1.toString());
    if (params.field2 != null) __params = __params.set('field2', params.field2.toString());
    if (params.field3 != null) __params = __params.set('field3', params.field3.toString());
    if (params.markForDelete != null) __params = __params.set('markForDelete', params.markForDelete.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.taxTypeId != null) __params = __params.set('taxTypeId', params.taxTypeId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/tax-categories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, calculationSequence?: number, displaySequence?: number, displayUsage?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, name?: string, storeId?: number, taxTypeId?: number, links?: {descriptions?: {href?: string}}}>}>;
      })
    );
  }

  /**
   * Get a collection of tax category.
   * @param params The `TaxCategoriesService.GetTaxCategoriesParams` containing the following parameters:
   *
   * - `searchString`: Limits search results to only include tax categories with a name that matches the value of this parameter. Searches are case-insensitive.
   *
   * - `id`: The unique numeric ID for identifying the tax category.
   *
   * - `calculationSequence`: Tax amounts are calculated in ascending order of calculationSequence.
   *
   * - `displaySequence`: A user interface can use this field to control the sequence of tax amounts displayed for an Order.
   *
   * - `displayUsage`: Specifies that this tax category in relation to the PriceDataBean, 0 is not calculated, 1 is calculated.
   *
   * - `field1`: Customizable.
   *
   * - `field2`: Customizable.
   *
   * - `field3`: Customizable.
   *
   * - `markForDelete`: Reserved for HCL Internal use.
   *
   * - `name`: A name that, along with the StoreEntity, uniquely identifies this Tax Category.
   *
   * - `storeId`: The StoreEntity of which this Tax Category is a part.
   *
   * - `taxTypeId`: The TaxType of this Tax category.
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
   * @return A collection of tax category.
   */
  getTaxCategories(params: TaxCategoriesService.GetTaxCategoriesParams): __Observable<{count?: number, items?: Array<{id?: number, calculationSequence?: number, displaySequence?: number, displayUsage?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, name?: string, storeId?: number, taxTypeId?: number, links?: {descriptions?: {href?: string}}}>}> {
    return this.getTaxCategoriesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, calculationSequence?: number, displaySequence?: number, displayUsage?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, name?: string, storeId?: number, taxTypeId?: number, links?: {descriptions?: {href?: string}}}>})
    );
  }

  /**
   * Create a tax category.
   * @param TaxCategory A tax category.
   */
  createTaxCategoryResponse(TaxCategory: {id?: number, calculationSequence?: number, displaySequence?: number, displayUsage?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, name?: string, storeId?: number, taxTypeId?: number, links?: {descriptions?: {href?: string}}}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = TaxCategory;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/tax-categories`,
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
   * Create a tax category.
   * @param TaxCategory A tax category.
   */
  createTaxCategory(TaxCategory: {id?: number, calculationSequence?: number, displaySequence?: number, displayUsage?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, name?: string, storeId?: number, taxTypeId?: number, links?: {descriptions?: {href?: string}}}): __Observable<null> {
    return this.createTaxCategoryResponse(TaxCategory).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a tax category.
   * @param params The `TaxCategoriesService.GetTaxCategoryByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the tax category.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A tax category.
   */
  getTaxCategoryByIdResponse(params: TaxCategoriesService.GetTaxCategoryByIdParams): __Observable<__StrictHttpResponse<{id?: number, calculationSequence?: number, displaySequence?: number, displayUsage?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, name?: string, storeId?: number, taxTypeId?: number, links?: {descriptions?: {href?: string}}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/tax-categories/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, calculationSequence?: number, displaySequence?: number, displayUsage?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, name?: string, storeId?: number, taxTypeId?: number, links?: {descriptions?: {href?: string}}}>;
      })
    );
  }

  /**
   * Get a tax category.
   * @param params The `TaxCategoriesService.GetTaxCategoryByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the tax category.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A tax category.
   */
  getTaxCategoryById(params: TaxCategoriesService.GetTaxCategoryByIdParams): __Observable<{id?: number, calculationSequence?: number, displaySequence?: number, displayUsage?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, name?: string, storeId?: number, taxTypeId?: number, links?: {descriptions?: {href?: string}}}> {
    return this.getTaxCategoryByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, calculationSequence?: number, displaySequence?: number, displayUsage?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, name?: string, storeId?: number, taxTypeId?: number, links?: {descriptions?: {href?: string}}})
    );
  }

  /**
   * Delete a tax category.
   * @param id The unique numeric ID for identifying the tax category.
   */
  deleteTaxCategoryByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/tax-categories/${id}`,
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
   * Delete a tax category.
   * @param id The unique numeric ID for identifying the tax category.
   */
  deleteTaxCategoryById(id: number): __Observable<null> {
    return this.deleteTaxCategoryByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a tax category.
   * @param params The `TaxCategoriesService.UpdateTaxCategoryByIdParams` containing the following parameters:
   *
   * - `TaxCategory`: A tax category.
   *
   * - `id`: The unique numeric ID for identifying the tax category.
   */
  updateTaxCategoryByIdResponse(params: TaxCategoriesService.UpdateTaxCategoryByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.TaxCategory;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/tax-categories/${params.id}`,
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
   * Update a tax category.
   * @param params The `TaxCategoriesService.UpdateTaxCategoryByIdParams` containing the following parameters:
   *
   * - `TaxCategory`: A tax category.
   *
   * - `id`: The unique numeric ID for identifying the tax category.
   */
  updateTaxCategoryById(params: TaxCategoriesService.UpdateTaxCategoryByIdParams): __Observable<null> {
    return this.updateTaxCategoryByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `TaxCategoriesService.GetDescriptionsOfTaxCategoryParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the tax category.
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
  getDescriptionsOfTaxCategoryResponse(params: TaxCategoriesService.GetDescriptionsOfTaxCategoryParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, languageId?: number, description?: string}>}>> {
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
      this.rootUrl + `/rest/admin/v2/tax-categories/${params.id}/descriptions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, languageId?: number, description?: string}>}>;
      })
    );
  }

  /**
   * @param params The `TaxCategoriesService.GetDescriptionsOfTaxCategoryParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the tax category.
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
  getDescriptionsOfTaxCategory(params: TaxCategoriesService.GetDescriptionsOfTaxCategoryParams): __Observable<{count?: number, items?: Array<{id?: number, languageId?: number, description?: string}>}> {
    return this.getDescriptionsOfTaxCategoryResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, languageId?: number, description?: string}>})
    );
  }
}

module TaxCategoriesService {

  /**
   * Parameters for getTaxCategories
   */
  export interface GetTaxCategoriesParams {

    /**
     * Limits search results to only include tax categories with a name that matches the value of this parameter. Searches are case-insensitive.
     */
    searchString?: string;

    /**
     * The unique numeric ID for identifying the tax category.
     */
    id?: number;

    /**
     * Tax amounts are calculated in ascending order of calculationSequence.
     */
    calculationSequence?: number;

    /**
     * A user interface can use this field to control the sequence of tax amounts displayed for an Order.
     */
    displaySequence?: number;

    /**
     * Specifies that this tax category in relation to the PriceDataBean, 0 is not calculated, 1 is calculated.
     */
    displayUsage?: number;

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
     * A name that, along with the StoreEntity, uniquely identifies this Tax Category.
     */
    name?: string;

    /**
     * The StoreEntity of which this Tax Category is a part.
     */
    storeId?: number;

    /**
     * The TaxType of this Tax category.
     */
    taxTypeId?: number;

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
   * Parameters for getTaxCategoryById
   */
  export interface GetTaxCategoryByIdParams {

    /**
     * The unique numeric ID for identifying the tax category.
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
   * Parameters for updateTaxCategoryById
   */
  export interface UpdateTaxCategoryByIdParams {

    /**
     * A tax category.
     */
    TaxCategory: {id?: number, calculationSequence?: number, displaySequence?: number, displayUsage?: number, field1?: number, field2?: number, field3?: string, markForDelete?: number, name?: string, storeId?: number, taxTypeId?: number, links?: {descriptions?: {href?: string}}};

    /**
     * The unique numeric ID for identifying the tax category.
     */
    id: number;
  }

  /**
   * Parameters for getDescriptionsOfTaxCategory
   */
  export interface GetDescriptionsOfTaxCategoryParams {

    /**
     * The unique numeric ID for identifying the tax category.
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

export { TaxCategoriesService }
