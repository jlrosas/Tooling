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
class JurisdictionGroupRelationshipsService extends __BaseService {
  static readonly getJurisdictionGroupRelationshipsPath = '/rest/admin/v2/jurisdiction-group-relationships';
  static readonly createJurisdictionGroupRelationshipPath = '/rest/admin/v2/jurisdiction-group-relationships';
  static readonly getJurisdictionGroupRelationshipByIdPath = '/rest/admin/v2/jurisdiction-group-relationships/jurisdictionId:{jurisdictionId},jurisdictionGroupId:{jurisdictionGroupId}';
  static readonly deleteJurisdictionGroupRelationshipByIdPath = '/rest/admin/v2/jurisdiction-group-relationships/jurisdictionId:{jurisdictionId},jurisdictionGroupId:{jurisdictionGroupId}';
  static readonly updateJurisdictionGroupRelationshipByIdPath = '/rest/admin/v2/jurisdiction-group-relationships/jurisdictionId:{jurisdictionId},jurisdictionGroupId:{jurisdictionGroupId}';
  static readonly getJurisdictionGroupOfJurisdictionGroupRelationshipPath = '/rest/admin/v2/jurisdiction-group-relationships/jurisdictionId:{jurisdictionId},jurisdictionGroupId:{jurisdictionGroupId}/jurisdiction-group';
  static readonly getJurisdictionOfJurisdictionGroupRelationshipPath = '/rest/admin/v2/jurisdiction-group-relationships/jurisdictionId:{jurisdictionId},jurisdictionGroupId:{jurisdictionGroupId}/jurisdiction';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of jurisdiction group to jurisdiction relationships.
   * @param params The `JurisdictionGroupRelationshipsService.GetJurisdictionGroupRelationshipsParams` containing the following parameters:
   *
   * - `jurisdictionId`: The unique ID for the jurisdiction.
   *
   * - `jurisdictionGroupId`: The unique ID for the jurisdiction group.
   *
   * - `subclass`: The subclass of the jurisdiction and of the jurisdiction group should match as follows: 1 = ShippingJurisdiction[Group]. 2 = TaxJurisdiction[Group].
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
  getJurisdictionGroupRelationshipsResponse(params: JurisdictionGroupRelationshipsService.GetJurisdictionGroupRelationshipsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.jurisdictionId != null) __params = __params.set('jurisdictionId', params.jurisdictionId.toString());
    if (params.jurisdictionGroupId != null) __params = __params.set('jurisdictionGroupId', params.jurisdictionGroupId.toString());
    if (params.subclass != null) __params = __params.set('subclass', params.subclass.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/jurisdiction-group-relationships`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of jurisdiction group to jurisdiction relationships.
   * @param params The `JurisdictionGroupRelationshipsService.GetJurisdictionGroupRelationshipsParams` containing the following parameters:
   *
   * - `jurisdictionId`: The unique ID for the jurisdiction.
   *
   * - `jurisdictionGroupId`: The unique ID for the jurisdiction group.
   *
   * - `subclass`: The subclass of the jurisdiction and of the jurisdiction group should match as follows: 1 = ShippingJurisdiction[Group]. 2 = TaxJurisdiction[Group].
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
  getJurisdictionGroupRelationships(params: JurisdictionGroupRelationshipsService.GetJurisdictionGroupRelationshipsParams): __Observable<{count?: number, items?: Array<{jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number}>}> {
    return this.getJurisdictionGroupRelationshipsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number}>})
    );
  }

  /**
   * Create a jurisdiction group to jurisdiction relationship.
   * @param JurisdictionGroupRelationship Relate jurisdiction groups to the jurisdictions that are inside them.
   */
  createJurisdictionGroupRelationshipResponse(JurisdictionGroupRelationship: {jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = JurisdictionGroupRelationship;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/jurisdiction-group-relationships`,
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
   * Create a jurisdiction group to jurisdiction relationship.
   * @param JurisdictionGroupRelationship Relate jurisdiction groups to the jurisdictions that are inside them.
   */
  createJurisdictionGroupRelationship(JurisdictionGroupRelationship: {jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number}): __Observable<null> {
    return this.createJurisdictionGroupRelationshipResponse(JurisdictionGroupRelationship).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a jurisdiction group to jurisdiction relationship.
   * @param params The `JurisdictionGroupRelationshipsService.GetJurisdictionGroupRelationshipByIdParams` containing the following parameters:
   *
   * - `jurisdictionId`: The unique ID for the jurisdiction.
   *
   * - `jurisdictionGroupId`: The unique ID for the jurisdiction group.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Relate jurisdiction groups to the jurisdictions that are inside them.
   */
  getJurisdictionGroupRelationshipByIdResponse(params: JurisdictionGroupRelationshipsService.GetJurisdictionGroupRelationshipByIdParams): __Observable<__StrictHttpResponse<{jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/jurisdiction-group-relationships/jurisdictionId:${params.jurisdictionId},jurisdictionGroupId:${params.jurisdictionGroupId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number}>;
      })
    );
  }

  /**
   * Get a jurisdiction group to jurisdiction relationship.
   * @param params The `JurisdictionGroupRelationshipsService.GetJurisdictionGroupRelationshipByIdParams` containing the following parameters:
   *
   * - `jurisdictionId`: The unique ID for the jurisdiction.
   *
   * - `jurisdictionGroupId`: The unique ID for the jurisdiction group.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Relate jurisdiction groups to the jurisdictions that are inside them.
   */
  getJurisdictionGroupRelationshipById(params: JurisdictionGroupRelationshipsService.GetJurisdictionGroupRelationshipByIdParams): __Observable<{jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number}> {
    return this.getJurisdictionGroupRelationshipByIdResponse(params).pipe(
      __map(_r => _r.body as {jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number})
    );
  }

  /**
   * Delete a jurisdiction group to jurisdiction relationship.
   * @param params The `JurisdictionGroupRelationshipsService.DeleteJurisdictionGroupRelationshipByIdParams` containing the following parameters:
   *
   * - `jurisdictionId`: The unique ID for the jurisdiction.
   *
   * - `jurisdictionGroupId`: The unique ID for the jurisdiction group.
   */
  deleteJurisdictionGroupRelationshipByIdResponse(params: JurisdictionGroupRelationshipsService.DeleteJurisdictionGroupRelationshipByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/jurisdiction-group-relationships/jurisdictionId:${params.jurisdictionId},jurisdictionGroupId:${params.jurisdictionGroupId}`,
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
   * Delete a jurisdiction group to jurisdiction relationship.
   * @param params The `JurisdictionGroupRelationshipsService.DeleteJurisdictionGroupRelationshipByIdParams` containing the following parameters:
   *
   * - `jurisdictionId`: The unique ID for the jurisdiction.
   *
   * - `jurisdictionGroupId`: The unique ID for the jurisdiction group.
   */
  deleteJurisdictionGroupRelationshipById(params: JurisdictionGroupRelationshipsService.DeleteJurisdictionGroupRelationshipByIdParams): __Observable<null> {
    return this.deleteJurisdictionGroupRelationshipByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a jurisdiction group to jurisdiction relationship.
   * @param params The `JurisdictionGroupRelationshipsService.UpdateJurisdictionGroupRelationshipByIdParams` containing the following parameters:
   *
   * - `JurisdictionGroupRelationship`: Relate jurisdiction groups to the jurisdictions that are inside them.
   *
   * - `jurisdictionId`: The unique ID for the jurisdiction.
   *
   * - `jurisdictionGroupId`: The unique ID for the jurisdiction group.
   */
  updateJurisdictionGroupRelationshipByIdResponse(params: JurisdictionGroupRelationshipsService.UpdateJurisdictionGroupRelationshipByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.JurisdictionGroupRelationship;


    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/jurisdiction-group-relationships/jurisdictionId:${params.jurisdictionId},jurisdictionGroupId:${params.jurisdictionGroupId}`,
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
   * Update a jurisdiction group to jurisdiction relationship.
   * @param params The `JurisdictionGroupRelationshipsService.UpdateJurisdictionGroupRelationshipByIdParams` containing the following parameters:
   *
   * - `JurisdictionGroupRelationship`: Relate jurisdiction groups to the jurisdictions that are inside them.
   *
   * - `jurisdictionId`: The unique ID for the jurisdiction.
   *
   * - `jurisdictionGroupId`: The unique ID for the jurisdiction group.
   */
  updateJurisdictionGroupRelationshipById(params: JurisdictionGroupRelationshipsService.UpdateJurisdictionGroupRelationshipByIdParams): __Observable<null> {
    return this.updateJurisdictionGroupRelationshipByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Finds the jurisdiction group in a jurisdiction group relationship.
   * @param params The `JurisdictionGroupRelationshipsService.GetJurisdictionGroupOfJurisdictionGroupRelationshipParams` containing the following parameters:
   *
   * - `jurisdictionId`: The unique ID for the jurisdiction.
   *
   * - `jurisdictionGroupId`: The unique ID for the jurisdiction group.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Provides RESTful services to manage jurisdiction groups. Jurisdiction groups are used for grouping of Jurisdictions.
   */
  getJurisdictionGroupOfJurisdictionGroupRelationshipResponse(params: JurisdictionGroupRelationshipsService.GetJurisdictionGroupOfJurisdictionGroupRelationshipParams): __Observable<__StrictHttpResponse<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/jurisdiction-group-relationships/jurisdictionId:${params.jurisdictionId},jurisdictionGroupId:${params.jurisdictionGroupId}/jurisdiction-group`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number}>;
      })
    );
  }

  /**
   * Finds the jurisdiction group in a jurisdiction group relationship.
   * @param params The `JurisdictionGroupRelationshipsService.GetJurisdictionGroupOfJurisdictionGroupRelationshipParams` containing the following parameters:
   *
   * - `jurisdictionId`: The unique ID for the jurisdiction.
   *
   * - `jurisdictionGroupId`: The unique ID for the jurisdiction group.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Provides RESTful services to manage jurisdiction groups. Jurisdiction groups are used for grouping of Jurisdictions.
   */
  getJurisdictionGroupOfJurisdictionGroupRelationship(params: JurisdictionGroupRelationshipsService.GetJurisdictionGroupOfJurisdictionGroupRelationshipParams): __Observable<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number}> {
    return this.getJurisdictionGroupOfJurisdictionGroupRelationshipResponse(params).pipe(
      __map(_r => _r.body as {id?: number, code?: string, storeId?: number, subclass?: number, description?: string, markForDelete?: number})
    );
  }

  /**
   * Finds the jurisdiction group in a jurisdiction group relationship.
   * @param params The `JurisdictionGroupRelationshipsService.GetJurisdictionOfJurisdictionGroupRelationshipParams` containing the following parameters:
   *
   * - `jurisdictionId`: The unique ID for the jurisdiction.
   *
   * - `jurisdictionGroupId`: The unique ID for the jurisdiction group.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Provides RESTful services to manage jurisdictions. Jurisdictions are geographical regions or zones that represent a country, region, province, territory, or ZIP code range in which you sell goods.
   */
  getJurisdictionOfJurisdictionGroupRelationshipResponse(params: JurisdictionGroupRelationshipsService.GetJurisdictionOfJurisdictionGroupRelationshipParams): __Observable<__StrictHttpResponse<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, country?: string, countryAbbreviation?: string, state?: string, stateAbbreviation?: string, city?: string, district?: string, county?: string, zipcodeStart?: string, zipcodeEnd?: string, geoCode?: string, markForDelete?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/jurisdiction-group-relationships/jurisdictionId:${params.jurisdictionId},jurisdictionGroupId:${params.jurisdictionGroupId}/jurisdiction`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, country?: string, countryAbbreviation?: string, state?: string, stateAbbreviation?: string, city?: string, district?: string, county?: string, zipcodeStart?: string, zipcodeEnd?: string, geoCode?: string, markForDelete?: number}>;
      })
    );
  }

  /**
   * Finds the jurisdiction group in a jurisdiction group relationship.
   * @param params The `JurisdictionGroupRelationshipsService.GetJurisdictionOfJurisdictionGroupRelationshipParams` containing the following parameters:
   *
   * - `jurisdictionId`: The unique ID for the jurisdiction.
   *
   * - `jurisdictionGroupId`: The unique ID for the jurisdiction group.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Provides RESTful services to manage jurisdictions. Jurisdictions are geographical regions or zones that represent a country, region, province, territory, or ZIP code range in which you sell goods.
   */
  getJurisdictionOfJurisdictionGroupRelationship(params: JurisdictionGroupRelationshipsService.GetJurisdictionOfJurisdictionGroupRelationshipParams): __Observable<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, country?: string, countryAbbreviation?: string, state?: string, stateAbbreviation?: string, city?: string, district?: string, county?: string, zipcodeStart?: string, zipcodeEnd?: string, geoCode?: string, markForDelete?: number}> {
    return this.getJurisdictionOfJurisdictionGroupRelationshipResponse(params).pipe(
      __map(_r => _r.body as {id?: number, code?: string, storeId?: number, subclass?: number, description?: string, country?: string, countryAbbreviation?: string, state?: string, stateAbbreviation?: string, city?: string, district?: string, county?: string, zipcodeStart?: string, zipcodeEnd?: string, geoCode?: string, markForDelete?: number})
    );
  }
}

module JurisdictionGroupRelationshipsService {

  /**
   * Parameters for getJurisdictionGroupRelationships
   */
  export interface GetJurisdictionGroupRelationshipsParams {

    /**
     * The unique ID for the jurisdiction.
     */
    jurisdictionId?: number;

    /**
     * The unique ID for the jurisdiction group.
     */
    jurisdictionGroupId?: number;

    /**
     * The subclass of the jurisdiction and of the jurisdiction group should match as follows: 1 = ShippingJurisdiction[Group]. 2 = TaxJurisdiction[Group].
     */
    subclass?: number;

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
   * Parameters for getJurisdictionGroupRelationshipById
   */
  export interface GetJurisdictionGroupRelationshipByIdParams {

    /**
     * The unique ID for the jurisdiction.
     */
    jurisdictionId: number;

    /**
     * The unique ID for the jurisdiction group.
     */
    jurisdictionGroupId: number;

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
   * Parameters for deleteJurisdictionGroupRelationshipById
   */
  export interface DeleteJurisdictionGroupRelationshipByIdParams {

    /**
     * The unique ID for the jurisdiction.
     */
    jurisdictionId: number;

    /**
     * The unique ID for the jurisdiction group.
     */
    jurisdictionGroupId: number;
  }

  /**
   * Parameters for updateJurisdictionGroupRelationshipById
   */
  export interface UpdateJurisdictionGroupRelationshipByIdParams {

    /**
     * Relate jurisdiction groups to the jurisdictions that are inside them.
     */
    JurisdictionGroupRelationship: {jurisdictionId?: number, jurisdictionGroupId?: number, subclass?: number};

    /**
     * The unique ID for the jurisdiction.
     */
    jurisdictionId: number;

    /**
     * The unique ID for the jurisdiction group.
     */
    jurisdictionGroupId: number;
  }

  /**
   * Parameters for getJurisdictionGroupOfJurisdictionGroupRelationship
   */
  export interface GetJurisdictionGroupOfJurisdictionGroupRelationshipParams {

    /**
     * The unique ID for the jurisdiction.
     */
    jurisdictionId: number;

    /**
     * The unique ID for the jurisdiction group.
     */
    jurisdictionGroupId: number;

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
   * Parameters for getJurisdictionOfJurisdictionGroupRelationship
   */
  export interface GetJurisdictionOfJurisdictionGroupRelationshipParams {

    /**
     * The unique ID for the jurisdiction.
     */
    jurisdictionId: number;

    /**
     * The unique ID for the jurisdiction group.
     */
    jurisdictionGroupId: number;

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

export { JurisdictionGroupRelationshipsService }
