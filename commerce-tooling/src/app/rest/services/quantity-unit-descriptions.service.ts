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
class QuantityUnitDescriptionsService extends __BaseService {
  static readonly getQuantityUnitDescriptionsPath = '/rest/admin/v2/quantity-unit-descriptions';
  static readonly createQuantityUnitDescriptionPath = '/rest/admin/v2/quantity-unit-descriptions';
  static readonly getQuantityUnitDescriptionByIdPath = '/rest/admin/v2/quantity-unit-descriptions/quantityUnitId:{quantityUnitId},languageId:{languageId}';
  static readonly deleteQuantityUnitDescriptionByIdPath = '/rest/admin/v2/quantity-unit-descriptions/quantityUnitId:{quantityUnitId},languageId:{languageId}';
  static readonly updateQuantityUnitDescriptionByIdPath = '/rest/admin/v2/quantity-unit-descriptions/quantityUnitId:{quantityUnitId},languageId:{languageId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of Quantity Unit descriptions.
   * @param params The `QuantityUnitDescriptionsService.GetQuantityUnitDescriptionsParams` containing the following parameters:
   *
   * - `quantityUnitId`: The Quantity Unit ID.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   *
   * - `description`: The Quantity Unit description in the language.
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
   * @return A collection of Quantity Unit descriptions.
   */
  getQuantityUnitDescriptionsResponse(params: QuantityUnitDescriptionsService.GetQuantityUnitDescriptionsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{quantityUnitId?: string, languageId?: number, description?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.quantityUnitId != null) __params = __params.set('quantityUnitId', params.quantityUnitId.toString());
    if (params.languageId != null) __params = __params.set('languageId', params.languageId.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/quantity-unit-descriptions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{quantityUnitId?: string, languageId?: number, description?: string}>}>;
      })
    );
  }

  /**
   * Get a collection of Quantity Unit descriptions.
   * @param params The `QuantityUnitDescriptionsService.GetQuantityUnitDescriptionsParams` containing the following parameters:
   *
   * - `quantityUnitId`: The Quantity Unit ID.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   *
   * - `description`: The Quantity Unit description in the language.
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
   * @return A collection of Quantity Unit descriptions.
   */
  getQuantityUnitDescriptions(params: QuantityUnitDescriptionsService.GetQuantityUnitDescriptionsParams): __Observable<{count?: number, items?: Array<{quantityUnitId?: string, languageId?: number, description?: string}>}> {
    return this.getQuantityUnitDescriptionsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{quantityUnitId?: string, languageId?: number, description?: string}>})
    );
  }

  /**
   * Create a Quantity Unit description.
   * @param QuantityUnitDescription A Quantity Unit description.
   */
  createQuantityUnitDescriptionResponse(QuantityUnitDescription: {quantityUnitId?: string, languageId?: number, description?: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = QuantityUnitDescription;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/quantity-unit-descriptions`,
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
   * Create a Quantity Unit description.
   * @param QuantityUnitDescription A Quantity Unit description.
   */
  createQuantityUnitDescription(QuantityUnitDescription: {quantityUnitId?: string, languageId?: number, description?: string}): __Observable<null> {
    return this.createQuantityUnitDescriptionResponse(QuantityUnitDescription).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a Quantity Unit description.
   * @param params The `QuantityUnitDescriptionsService.GetQuantityUnitDescriptionByIdParams` containing the following parameters:
   *
   * - `quantityUnitId`: The Quantity Unit ID.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Quantity Unit description.
   */
  getQuantityUnitDescriptionByIdResponse(params: QuantityUnitDescriptionsService.GetQuantityUnitDescriptionByIdParams): __Observable<__StrictHttpResponse<{quantityUnitId?: string, languageId?: number, description?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/quantity-unit-descriptions/quantityUnitId:${params.quantityUnitId},languageId:${params.languageId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{quantityUnitId?: string, languageId?: number, description?: string}>;
      })
    );
  }

  /**
   * Get a Quantity Unit description.
   * @param params The `QuantityUnitDescriptionsService.GetQuantityUnitDescriptionByIdParams` containing the following parameters:
   *
   * - `quantityUnitId`: The Quantity Unit ID.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Quantity Unit description.
   */
  getQuantityUnitDescriptionById(params: QuantityUnitDescriptionsService.GetQuantityUnitDescriptionByIdParams): __Observable<{quantityUnitId?: string, languageId?: number, description?: string}> {
    return this.getQuantityUnitDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as {quantityUnitId?: string, languageId?: number, description?: string})
    );
  }

  /**
   * Delete a Quantity Unit description.
   * @param params The `QuantityUnitDescriptionsService.DeleteQuantityUnitDescriptionByIdParams` containing the following parameters:
   *
   * - `quantityUnitId`: The Quantity Unit ID.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   */
  deleteQuantityUnitDescriptionByIdResponse(params: QuantityUnitDescriptionsService.DeleteQuantityUnitDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/quantity-unit-descriptions/quantityUnitId:${params.quantityUnitId},languageId:${params.languageId}`,
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
   * Delete a Quantity Unit description.
   * @param params The `QuantityUnitDescriptionsService.DeleteQuantityUnitDescriptionByIdParams` containing the following parameters:
   *
   * - `quantityUnitId`: The Quantity Unit ID.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   */
  deleteQuantityUnitDescriptionById(params: QuantityUnitDescriptionsService.DeleteQuantityUnitDescriptionByIdParams): __Observable<null> {
    return this.deleteQuantityUnitDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a Quantity Unit description.
   * @param params The `QuantityUnitDescriptionsService.UpdateQuantityUnitDescriptionByIdParams` containing the following parameters:
   *
   * - `QuantityUnitDescription`: A Quantity Unit description.
   *
   * - `quantityUnitId`: The Quantity Unit ID.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   */
  updateQuantityUnitDescriptionByIdResponse(params: QuantityUnitDescriptionsService.UpdateQuantityUnitDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.QuantityUnitDescription;


    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/quantity-unit-descriptions/quantityUnitId:${params.quantityUnitId},languageId:${params.languageId}`,
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
   * Update a Quantity Unit description.
   * @param params The `QuantityUnitDescriptionsService.UpdateQuantityUnitDescriptionByIdParams` containing the following parameters:
   *
   * - `QuantityUnitDescription`: A Quantity Unit description.
   *
   * - `quantityUnitId`: The Quantity Unit ID.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   */
  updateQuantityUnitDescriptionById(params: QuantityUnitDescriptionsService.UpdateQuantityUnitDescriptionByIdParams): __Observable<null> {
    return this.updateQuantityUnitDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module QuantityUnitDescriptionsService {

  /**
   * Parameters for getQuantityUnitDescriptions
   */
  export interface GetQuantityUnitDescriptionsParams {

    /**
     * The Quantity Unit ID.
     */
    quantityUnitId?: string;

    /**
     * The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
     */
    languageId?: number;

    /**
     * The Quantity Unit description in the language.
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
   * Parameters for getQuantityUnitDescriptionById
   */
  export interface GetQuantityUnitDescriptionByIdParams {

    /**
     * The Quantity Unit ID.
     */
    quantityUnitId: string;

    /**
     * The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
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
   * Parameters for deleteQuantityUnitDescriptionById
   */
  export interface DeleteQuantityUnitDescriptionByIdParams {

    /**
     * The Quantity Unit ID.
     */
    quantityUnitId: string;

    /**
     * The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
     */
    languageId: number;
  }

  /**
   * Parameters for updateQuantityUnitDescriptionById
   */
  export interface UpdateQuantityUnitDescriptionByIdParams {

    /**
     * A Quantity Unit description.
     */
    QuantityUnitDescription: {quantityUnitId?: string, languageId?: number, description?: string};

    /**
     * The Quantity Unit ID.
     */
    quantityUnitId: string;

    /**
     * The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
     */
    languageId: number;
  }
}

export { QuantityUnitDescriptionsService }
