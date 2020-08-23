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
class JurisdictionsService extends __BaseService {
  static readonly getJurisdictionsPath = '/rest/admin/v2/jurisdictions';
  static readonly createJurisdictionPath = '/rest/admin/v2/jurisdictions';
  static readonly getJurisdictionByIdPath = '/rest/admin/v2/jurisdictions/{id}';
  static readonly deleteJurisdictionByIdPath = '/rest/admin/v2/jurisdictions/{id}';
  static readonly updateJurisdictionByIdPath = '/rest/admin/v2/jurisdictions/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of jurisdictions.
   * @param params The `JurisdictionsService.GetJurisdictionsParams` containing the following parameters:
   *
   * - `searchString`: Limits search results to only include jurisdictions that match the value of this parameter. Searches are case-insensitive.
   *
   * - `id`: The unique ID for the jurisdiction.
   *
   * - `code`: A code which, together with its storeId and subclass, uniquely identifies this jurisdiction.
   *
   * - `storeId`: The reference number of the store this jurisdiction associated with.
   *
   * - `subclass`: Indicates the jurisdiction types as follows: 1 = ShippingJurisdiction. 2 = TaxJurisdiction.
   *
   * - `description`: A brief description of the jurisdiction, suitable for display by a user interface that manages jurisdiction definitions.
   *
   * - `country`: The country or region.
   *
   * - `countryAbbreviation`: An optional ISO standard abbreviation code for the country or region.
   *
   * - `state`: The state, province, or other equivalent region.
   *
   * - `stateAbbreviation`: An optional country specific abbreviation code for the state or province.
   *
   * - `city`: The city or an equivalent.
   *
   * - `district`: The district or an equivalent.
   *
   * - `county`: The county or an equivalent.
   *
   * - `zipcodeStart`: The starting ZIP code or postal code of a range of ZIP codes or postal codes.
   *
   * - `zipcodeEnd`: The ending ZIP code or postal code of a range of ZIP codes or postal codes.
   *
   * - `geoCode`: A tax code that is based on geographic region. This code is used to support Taxware integration.
   *
   * - `markForDelete`: Indicates if this jurisdiction has been marked for deletion: 0 = No. 1 = Yes.
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
   * @return A collection of jurisdictions.
   */
  getJurisdictionsResponse(params: JurisdictionsService.GetJurisdictionsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, country?: string, countryAbbreviation?: string, state?: string, stateAbbreviation?: string, city?: string, district?: string, county?: string, zipcodeStart?: string, zipcodeEnd?: string, geoCode?: string, markForDelete?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.code != null) __params = __params.set('code', params.code.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.subclass != null) __params = __params.set('subclass', params.subclass.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.country != null) __params = __params.set('country', params.country.toString());
    if (params.countryAbbreviation != null) __params = __params.set('countryAbbreviation', params.countryAbbreviation.toString());
    if (params.state != null) __params = __params.set('state', params.state.toString());
    if (params.stateAbbreviation != null) __params = __params.set('stateAbbreviation', params.stateAbbreviation.toString());
    if (params.city != null) __params = __params.set('city', params.city.toString());
    if (params.district != null) __params = __params.set('district', params.district.toString());
    if (params.county != null) __params = __params.set('county', params.county.toString());
    if (params.zipcodeStart != null) __params = __params.set('zipcodeStart', params.zipcodeStart.toString());
    if (params.zipcodeEnd != null) __params = __params.set('zipcodeEnd', params.zipcodeEnd.toString());
    if (params.geoCode != null) __params = __params.set('geoCode', params.geoCode.toString());
    if (params.markForDelete != null) __params = __params.set('markForDelete', params.markForDelete.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/jurisdictions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, country?: string, countryAbbreviation?: string, state?: string, stateAbbreviation?: string, city?: string, district?: string, county?: string, zipcodeStart?: string, zipcodeEnd?: string, geoCode?: string, markForDelete?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of jurisdictions.
   * @param params The `JurisdictionsService.GetJurisdictionsParams` containing the following parameters:
   *
   * - `searchString`: Limits search results to only include jurisdictions that match the value of this parameter. Searches are case-insensitive.
   *
   * - `id`: The unique ID for the jurisdiction.
   *
   * - `code`: A code which, together with its storeId and subclass, uniquely identifies this jurisdiction.
   *
   * - `storeId`: The reference number of the store this jurisdiction associated with.
   *
   * - `subclass`: Indicates the jurisdiction types as follows: 1 = ShippingJurisdiction. 2 = TaxJurisdiction.
   *
   * - `description`: A brief description of the jurisdiction, suitable for display by a user interface that manages jurisdiction definitions.
   *
   * - `country`: The country or region.
   *
   * - `countryAbbreviation`: An optional ISO standard abbreviation code for the country or region.
   *
   * - `state`: The state, province, or other equivalent region.
   *
   * - `stateAbbreviation`: An optional country specific abbreviation code for the state or province.
   *
   * - `city`: The city or an equivalent.
   *
   * - `district`: The district or an equivalent.
   *
   * - `county`: The county or an equivalent.
   *
   * - `zipcodeStart`: The starting ZIP code or postal code of a range of ZIP codes or postal codes.
   *
   * - `zipcodeEnd`: The ending ZIP code or postal code of a range of ZIP codes or postal codes.
   *
   * - `geoCode`: A tax code that is based on geographic region. This code is used to support Taxware integration.
   *
   * - `markForDelete`: Indicates if this jurisdiction has been marked for deletion: 0 = No. 1 = Yes.
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
   * @return A collection of jurisdictions.
   */
  getJurisdictions(params: JurisdictionsService.GetJurisdictionsParams): __Observable<{count?: number, items?: Array<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, country?: string, countryAbbreviation?: string, state?: string, stateAbbreviation?: string, city?: string, district?: string, county?: string, zipcodeStart?: string, zipcodeEnd?: string, geoCode?: string, markForDelete?: number}>}> {
    return this.getJurisdictionsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, country?: string, countryAbbreviation?: string, state?: string, stateAbbreviation?: string, city?: string, district?: string, county?: string, zipcodeStart?: string, zipcodeEnd?: string, geoCode?: string, markForDelete?: number}>})
    );
  }

  /**
   * Create a jurisdiction.
   * @param Jurisdiction Provides RESTful services to manage jurisdictions. Jurisdictions are geographical regions or zones that represent a country, region, province, territory, or ZIP code range in which you sell goods.
   */
  createJurisdictionResponse(Jurisdiction: {id?: number, code?: string, storeId?: number, subclass?: number, description?: string, country?: string, countryAbbreviation?: string, state?: string, stateAbbreviation?: string, city?: string, district?: string, county?: string, zipcodeStart?: string, zipcodeEnd?: string, geoCode?: string, markForDelete?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Jurisdiction;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/jurisdictions`,
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
   * Create a jurisdiction.
   * @param Jurisdiction Provides RESTful services to manage jurisdictions. Jurisdictions are geographical regions or zones that represent a country, region, province, territory, or ZIP code range in which you sell goods.
   */
  createJurisdiction(Jurisdiction: {id?: number, code?: string, storeId?: number, subclass?: number, description?: string, country?: string, countryAbbreviation?: string, state?: string, stateAbbreviation?: string, city?: string, district?: string, county?: string, zipcodeStart?: string, zipcodeEnd?: string, geoCode?: string, markForDelete?: number}): __Observable<null> {
    return this.createJurisdictionResponse(Jurisdiction).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a jurisdiction.
   * @param params The `JurisdictionsService.GetJurisdictionByIdParams` containing the following parameters:
   *
   * - `id`: The unique ID for the jurisdiction.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Provides RESTful services to manage jurisdictions. Jurisdictions are geographical regions or zones that represent a country, region, province, territory, or ZIP code range in which you sell goods.
   */
  getJurisdictionByIdResponse(params: JurisdictionsService.GetJurisdictionByIdParams): __Observable<__StrictHttpResponse<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, country?: string, countryAbbreviation?: string, state?: string, stateAbbreviation?: string, city?: string, district?: string, county?: string, zipcodeStart?: string, zipcodeEnd?: string, geoCode?: string, markForDelete?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/jurisdictions/${params.id}`,
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
   * Get a jurisdiction.
   * @param params The `JurisdictionsService.GetJurisdictionByIdParams` containing the following parameters:
   *
   * - `id`: The unique ID for the jurisdiction.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Provides RESTful services to manage jurisdictions. Jurisdictions are geographical regions or zones that represent a country, region, province, territory, or ZIP code range in which you sell goods.
   */
  getJurisdictionById(params: JurisdictionsService.GetJurisdictionByIdParams): __Observable<{id?: number, code?: string, storeId?: number, subclass?: number, description?: string, country?: string, countryAbbreviation?: string, state?: string, stateAbbreviation?: string, city?: string, district?: string, county?: string, zipcodeStart?: string, zipcodeEnd?: string, geoCode?: string, markForDelete?: number}> {
    return this.getJurisdictionByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, code?: string, storeId?: number, subclass?: number, description?: string, country?: string, countryAbbreviation?: string, state?: string, stateAbbreviation?: string, city?: string, district?: string, county?: string, zipcodeStart?: string, zipcodeEnd?: string, geoCode?: string, markForDelete?: number})
    );
  }

  /**
   * Delete a jurisdiction.
   * @param id The unique ID for the jurisdiction.
   */
  deleteJurisdictionByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/jurisdictions/${id}`,
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
   * Delete a jurisdiction.
   * @param id The unique ID for the jurisdiction.
   */
  deleteJurisdictionById(id: number): __Observable<null> {
    return this.deleteJurisdictionByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a jurisdiction.
   * @param params The `JurisdictionsService.UpdateJurisdictionByIdParams` containing the following parameters:
   *
   * - `Jurisdiction`: Provides RESTful services to manage jurisdictions. Jurisdictions are geographical regions or zones that represent a country, region, province, territory, or ZIP code range in which you sell goods.
   *
   * - `id`: The unique ID for the jurisdiction.
   */
  updateJurisdictionByIdResponse(params: JurisdictionsService.UpdateJurisdictionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.Jurisdiction;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/jurisdictions/${params.id}`,
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
   * Update a jurisdiction.
   * @param params The `JurisdictionsService.UpdateJurisdictionByIdParams` containing the following parameters:
   *
   * - `Jurisdiction`: Provides RESTful services to manage jurisdictions. Jurisdictions are geographical regions or zones that represent a country, region, province, territory, or ZIP code range in which you sell goods.
   *
   * - `id`: The unique ID for the jurisdiction.
   */
  updateJurisdictionById(params: JurisdictionsService.UpdateJurisdictionByIdParams): __Observable<null> {
    return this.updateJurisdictionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module JurisdictionsService {

  /**
   * Parameters for getJurisdictions
   */
  export interface GetJurisdictionsParams {

    /**
     * Limits search results to only include jurisdictions that match the value of this parameter. Searches are case-insensitive.
     */
    searchString?: string;

    /**
     * The unique ID for the jurisdiction.
     */
    id?: number;

    /**
     * A code which, together with its storeId and subclass, uniquely identifies this jurisdiction.
     */
    code?: string;

    /**
     * The reference number of the store this jurisdiction associated with.
     */
    storeId?: number;

    /**
     * Indicates the jurisdiction types as follows: 1 = ShippingJurisdiction. 2 = TaxJurisdiction.
     */
    subclass?: number;

    /**
     * A brief description of the jurisdiction, suitable for display by a user interface that manages jurisdiction definitions.
     */
    description?: string;

    /**
     * The country or region.
     */
    country?: string;

    /**
     * An optional ISO standard abbreviation code for the country or region.
     */
    countryAbbreviation?: string;

    /**
     * The state, province, or other equivalent region.
     */
    state?: string;

    /**
     * An optional country specific abbreviation code for the state or province.
     */
    stateAbbreviation?: string;

    /**
     * The city or an equivalent.
     */
    city?: string;

    /**
     * The district or an equivalent.
     */
    district?: string;

    /**
     * The county or an equivalent.
     */
    county?: string;

    /**
     * The starting ZIP code or postal code of a range of ZIP codes or postal codes.
     */
    zipcodeStart?: string;

    /**
     * The ending ZIP code or postal code of a range of ZIP codes or postal codes.
     */
    zipcodeEnd?: string;

    /**
     * A tax code that is based on geographic region. This code is used to support Taxware integration.
     */
    geoCode?: string;

    /**
     * Indicates if this jurisdiction has been marked for deletion: 0 = No. 1 = Yes.
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
   * Parameters for getJurisdictionById
   */
  export interface GetJurisdictionByIdParams {

    /**
     * The unique ID for the jurisdiction.
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
   * Parameters for updateJurisdictionById
   */
  export interface UpdateJurisdictionByIdParams {

    /**
     * Provides RESTful services to manage jurisdictions. Jurisdictions are geographical regions or zones that represent a country, region, province, territory, or ZIP code range in which you sell goods.
     */
    Jurisdiction: {id?: number, code?: string, storeId?: number, subclass?: number, description?: string, country?: string, countryAbbreviation?: string, state?: string, stateAbbreviation?: string, city?: string, district?: string, county?: string, zipcodeStart?: string, zipcodeEnd?: string, geoCode?: string, markForDelete?: number};

    /**
     * The unique ID for the jurisdiction.
     */
    id: number;
  }
}

export { JurisdictionsService }
