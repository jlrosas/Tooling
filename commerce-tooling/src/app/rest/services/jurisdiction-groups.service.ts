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
class JurisdictionGroupsService extends __BaseService {
  static readonly getJurisdictionGroupsPath = '/rest/admin/v2/jurisdiction-groups';
  static readonly createJurisdictionGroupPath = '/rest/admin/v2/jurisdiction-groups';
  static readonly getJurisdictionGroupByIdPath = '/rest/admin/v2/jurisdiction-groups/{id}';
  static readonly deleteJurisdictionGroupByIdPath = '/rest/admin/v2/jurisdiction-groups/{id}';
  static readonly updateJurisdictionGroupByIdPath = '/rest/admin/v2/jurisdiction-groups/{id}';
  static readonly getJurisdictionGroupRelationshipsOfJurisdictionGroupPath = '/rest/admin/v2/jurisdiction-groups/{id}/jurisdiction-group-relationships';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of jurisdiction groups.
   * @param params The `JurisdictionGroupsService.GetJurisdictionGroupsParams` containing the following parameters:
   *
   * - `searchString`: Limits search results to only include jurisdiction groups with a code that matches the value of this parameter. Searches are case-insensitive.
   *
   * - `id`: The unique ID for the jurisdiction group.
   *
   * - `code`: A code which, together with its storeId and subclass, uniquely identifies this jurisdiction group.
   *
   * - `storeId`: The reference number of the store this jurisdiction associated with.
   *
   * - `subclass`: Indicates the jurisdiction group subclass as follows: 1 = ShippingJurisdictionGroup. 2 = TaxJurisdictionGroup.
   *
   * - `description`: A brief description of the jurisdiction group, suitable for display by a user interface that manages jurisdiction groups.
   *
   * - `markForDelete`: Indicates if this jurisdiction group has been marked for deletion: 0 = No. 1 = Yes.
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
   * @return A collection of jurisdiction groups.
   */
  getJurisdictionGroupsResponse(params: JurisdictionGroupsService.GetJurisdictionGroupsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number, links?: {groups?: {href?: string}}}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    (params.id || []).forEach(val => {if (val != null) __params = __params.append('id', val.toString())});
    if (params.code != null) __params = __params.set('code', params.code.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.subclass != null) __params = __params.set('subclass', params.subclass.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.markForDelete != null) __params = __params.set('markForDelete', params.markForDelete.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/jurisdiction-groups`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number, links?: {groups?: {href?: string}}}>}>;
      })
    );
  }

  /**
   * Get a collection of jurisdiction groups.
   * @param params The `JurisdictionGroupsService.GetJurisdictionGroupsParams` containing the following parameters:
   *
   * - `searchString`: Limits search results to only include jurisdiction groups with a code that matches the value of this parameter. Searches are case-insensitive.
   *
   * - `id`: The unique ID for the jurisdiction group.
   *
   * - `code`: A code which, together with its storeId and subclass, uniquely identifies this jurisdiction group.
   *
   * - `storeId`: The reference number of the store this jurisdiction associated with.
   *
   * - `subclass`: Indicates the jurisdiction group subclass as follows: 1 = ShippingJurisdictionGroup. 2 = TaxJurisdictionGroup.
   *
   * - `description`: A brief description of the jurisdiction group, suitable for display by a user interface that manages jurisdiction groups.
   *
   * - `markForDelete`: Indicates if this jurisdiction group has been marked for deletion: 0 = No. 1 = Yes.
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
   * @return A collection of jurisdiction groups.
   */
  getJurisdictionGroups(params: JurisdictionGroupsService.GetJurisdictionGroupsParams): __Observable<{count?: number, items?: Array<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number, links?: {groups?: {href?: string}}}>}> {
    return this.getJurisdictionGroupsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number, links?: {groups?: {href?: string}}}>})
    );
  }

  /**
   * Create a jurisdiction group.
   * @param JurisdictionGroup Provides RESTful services to manage jurisdiction groups. Jurisdiction groups are used for grouping of Jurisdictions.
   */
  createJurisdictionGroupResponse(JurisdictionGroup: {id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number, links?: {groups?: {href?: string}}}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = JurisdictionGroup;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/jurisdiction-groups`,
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
   * Create a jurisdiction group.
   * @param JurisdictionGroup Provides RESTful services to manage jurisdiction groups. Jurisdiction groups are used for grouping of Jurisdictions.
   */
  createJurisdictionGroup(JurisdictionGroup: {id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number, links?: {groups?: {href?: string}}}): __Observable<null> {
    return this.createJurisdictionGroupResponse(JurisdictionGroup).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a jurisdiction group.
   * @param params The `JurisdictionGroupsService.GetJurisdictionGroupByIdParams` containing the following parameters:
   *
   * - `id`: The unique ID for the jurisdiction group.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Provides RESTful services to manage jurisdiction groups. Jurisdiction groups are used for grouping of Jurisdictions.
   */
  getJurisdictionGroupByIdResponse(params: JurisdictionGroupsService.GetJurisdictionGroupByIdParams): __Observable<__StrictHttpResponse<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number, links?: {groups?: {href?: string}}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/jurisdiction-groups/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number, links?: {groups?: {href?: string}}}>;
      })
    );
  }

  /**
   * Get a jurisdiction group.
   * @param params The `JurisdictionGroupsService.GetJurisdictionGroupByIdParams` containing the following parameters:
   *
   * - `id`: The unique ID for the jurisdiction group.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Provides RESTful services to manage jurisdiction groups. Jurisdiction groups are used for grouping of Jurisdictions.
   */
  getJurisdictionGroupById(params: JurisdictionGroupsService.GetJurisdictionGroupByIdParams): __Observable<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number, links?: {groups?: {href?: string}}}> {
    return this.getJurisdictionGroupByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number, links?: {groups?: {href?: string}}})
    );
  }

  /**
   * Delete a jurisdiction group.
   * @param id The unique ID for the jurisdiction group.
   */
  deleteJurisdictionGroupByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/jurisdiction-groups/${id}`,
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
   * Delete a jurisdiction group.
   * @param id The unique ID for the jurisdiction group.
   */
  deleteJurisdictionGroupById(id: number): __Observable<null> {
    return this.deleteJurisdictionGroupByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a jurisdiction group.
   * @param params The `JurisdictionGroupsService.UpdateJurisdictionGroupByIdParams` containing the following parameters:
   *
   * - `JurisdictionGroup`: Provides RESTful services to manage jurisdiction groups. Jurisdiction groups are used for grouping of Jurisdictions.
   *
   * - `id`: The unique ID for the jurisdiction group.
   */
  updateJurisdictionGroupByIdResponse(params: JurisdictionGroupsService.UpdateJurisdictionGroupByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.JurisdictionGroup;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/jurisdiction-groups/${params.id}`,
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
   * Update a jurisdiction group.
   * @param params The `JurisdictionGroupsService.UpdateJurisdictionGroupByIdParams` containing the following parameters:
   *
   * - `JurisdictionGroup`: Provides RESTful services to manage jurisdiction groups. Jurisdiction groups are used for grouping of Jurisdictions.
   *
   * - `id`: The unique ID for the jurisdiction group.
   */
  updateJurisdictionGroupById(params: JurisdictionGroupsService.UpdateJurisdictionGroupByIdParams): __Observable<null> {
    return this.updateJurisdictionGroupByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Finds jurisdiction group relationships of a jurisdiction group.
   * @param params The `JurisdictionGroupsService.GetJurisdictionGroupRelationshipsOfJurisdictionGroupParams` containing the following parameters:
   *
   * - `id`: The unique ID for the jurisdiction group.
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
   * @return A collection of jurisdiction group to jurisdiction relationship.
   */
  getJurisdictionGroupRelationshipsOfJurisdictionGroupResponse(params: JurisdictionGroupsService.GetJurisdictionGroupRelationshipsOfJurisdictionGroupParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number, links?: {group?: {href?: string}, jurisdiction?: {href?: string}}}>}>> {
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
      this.rootUrl + `/rest/admin/v2/jurisdiction-groups/${params.id}/jurisdiction-group-relationships`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number, links?: {group?: {href?: string}, jurisdiction?: {href?: string}}}>}>;
      })
    );
  }

  /**
   * Finds jurisdiction group relationships of a jurisdiction group.
   * @param params The `JurisdictionGroupsService.GetJurisdictionGroupRelationshipsOfJurisdictionGroupParams` containing the following parameters:
   *
   * - `id`: The unique ID for the jurisdiction group.
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
   * @return A collection of jurisdiction group to jurisdiction relationship.
   */
  getJurisdictionGroupRelationshipsOfJurisdictionGroup(params: JurisdictionGroupsService.GetJurisdictionGroupRelationshipsOfJurisdictionGroupParams): __Observable<{count?: number, items?: Array<{jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number, links?: {group?: {href?: string}, jurisdiction?: {href?: string}}}>}> {
    return this.getJurisdictionGroupRelationshipsOfJurisdictionGroupResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number, links?: {group?: {href?: string}, jurisdiction?: {href?: string}}}>})
    );
  }
}

module JurisdictionGroupsService {

  /**
   * Parameters for getJurisdictionGroups
   */
  export interface GetJurisdictionGroupsParams {

    /**
     * Limits search results to only include jurisdiction groups with a code that matches the value of this parameter. Searches are case-insensitive.
     */
    searchString?: string;

    /**
     * The unique ID for the jurisdiction group.
     */
    id?: Array<number>;

    /**
     * A code which, together with its storeId and subclass, uniquely identifies this jurisdiction group.
     */
    code?: string;

    /**
     * The reference number of the store this jurisdiction associated with.
     */
    storeId?: number;

    /**
     * Indicates the jurisdiction group subclass as follows: 1 = ShippingJurisdictionGroup. 2 = TaxJurisdictionGroup.
     */
    subclass?: number;

    /**
     * A brief description of the jurisdiction group, suitable for display by a user interface that manages jurisdiction groups.
     */
    description?: string;

    /**
     * Indicates if this jurisdiction group has been marked for deletion: 0 = No. 1 = Yes.
     */
    markForDelete?: number;

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
   * Parameters for getJurisdictionGroupById
   */
  export interface GetJurisdictionGroupByIdParams {

    /**
     * The unique ID for the jurisdiction group.
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
   * Parameters for updateJurisdictionGroupById
   */
  export interface UpdateJurisdictionGroupByIdParams {

    /**
     * Provides RESTful services to manage jurisdiction groups. Jurisdiction groups are used for grouping of Jurisdictions.
     */
    JurisdictionGroup: {id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number, links?: {groups?: {href?: string}}};

    /**
     * The unique ID for the jurisdiction group.
     */
    id: number;
  }

  /**
   * Parameters for getJurisdictionGroupRelationshipsOfJurisdictionGroup
   */
  export interface GetJurisdictionGroupRelationshipsOfJurisdictionGroupParams {

    /**
     * The unique ID for the jurisdiction group.
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

export { JurisdictionGroupsService }
