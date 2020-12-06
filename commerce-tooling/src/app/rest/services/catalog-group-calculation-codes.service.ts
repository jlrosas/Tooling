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
class CatalogGroupCalculationCodesService extends __BaseService {
  static readonly getCatalogGroupCalculationCodesPath = '/rest/admin/v2/catalog-group-calculation-codes';
  static readonly createCatalogGroupCalculationCodePath = '/rest/admin/v2/catalog-group-calculation-codes';
  static readonly getCatalogGroupCalculationCodeByIdPath = '/rest/admin/v2/catalog-group-calculation-codes/{id}';
  static readonly deleteCatalogGroupCalculationCodeByIdPath = '/rest/admin/v2/catalog-group-calculation-codes/{id}';
  static readonly updateCatalogGroupCalculationCodeByIdPath = '/rest/admin/v2/catalog-group-calculation-codes/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of relationships between catalog groups and calculation codes.
   * @param params The `CatalogGroupCalculationCodesService.GetCatalogGroupCalculationCodesParams` containing the following parameters:
   *
   * - `storeId`: The store ID that is associated with the relationship between the catalog group and the calculation code.
   *
   * - `catalogGroupId`: The catalog group id.
   *
   * - `calculationCodeId`: The calculation code id.
   *
   * - `id`: The unique numeric ID for identifying the relationship between the catalog group and the calculation code.
   *
   * - `tradingId`: The trading agreement id.
   *
   * - `calculationFlags`: The flags for the relationship between the catalog group and the calculation code.
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
   * @return A collection of relationships between catalog groups and calculation codes.
   */
  getCatalogGroupCalculationCodesResponse(params: CatalogGroupCalculationCodesService.GetCatalogGroupCalculationCodesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{storeId?: number, catalogGroupId?: string, calculationCodeId?: number, id?: string, tradingId?: string, calculationFlags?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.catalogGroupId != null) __params = __params.set('catalogGroupId', params.catalogGroupId.toString());
    if (params.calculationCodeId != null) __params = __params.set('calculationCodeId', params.calculationCodeId.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.tradingId != null) __params = __params.set('tradingId', params.tradingId.toString());
    if (params.calculationFlags != null) __params = __params.set('calculationFlags', params.calculationFlags.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalog-group-calculation-codes`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{storeId?: number, catalogGroupId?: string, calculationCodeId?: number, id?: string, tradingId?: string, calculationFlags?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of relationships between catalog groups and calculation codes.
   * @param params The `CatalogGroupCalculationCodesService.GetCatalogGroupCalculationCodesParams` containing the following parameters:
   *
   * - `storeId`: The store ID that is associated with the relationship between the catalog group and the calculation code.
   *
   * - `catalogGroupId`: The catalog group id.
   *
   * - `calculationCodeId`: The calculation code id.
   *
   * - `id`: The unique numeric ID for identifying the relationship between the catalog group and the calculation code.
   *
   * - `tradingId`: The trading agreement id.
   *
   * - `calculationFlags`: The flags for the relationship between the catalog group and the calculation code.
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
   * @return A collection of relationships between catalog groups and calculation codes.
   */
  getCatalogGroupCalculationCodes(params: CatalogGroupCalculationCodesService.GetCatalogGroupCalculationCodesParams): __Observable<{count?: number, items?: Array<{storeId?: number, catalogGroupId?: string, calculationCodeId?: number, id?: string, tradingId?: string, calculationFlags?: number}>}> {
    return this.getCatalogGroupCalculationCodesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{storeId?: number, catalogGroupId?: string, calculationCodeId?: number, id?: string, tradingId?: string, calculationFlags?: number}>})
    );
  }

  /**
   * Create a relationship between a catalog group and a calculation code.
   * @param CatalogGroupCalculationCode The relationship between a catalog group and a calculation code.
   */
  createCatalogGroupCalculationCodeResponse(CatalogGroupCalculationCode: {storeId?: number, catalogGroupId?: string, calculationCodeId?: number, id?: string, tradingId?: string, calculationFlags?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CatalogGroupCalculationCode;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/catalog-group-calculation-codes`,
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
   * Create a relationship between a catalog group and a calculation code.
   * @param CatalogGroupCalculationCode The relationship between a catalog group and a calculation code.
   */
  createCatalogGroupCalculationCode(CatalogGroupCalculationCode: {storeId?: number, catalogGroupId?: string, calculationCodeId?: number, id?: string, tradingId?: string, calculationFlags?: number}): __Observable<null> {
    return this.createCatalogGroupCalculationCodeResponse(CatalogGroupCalculationCode).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a relationship between a catalog group and a calculation code.
   * @param params The `CatalogGroupCalculationCodesService.GetCatalogGroupCalculationCodeByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the relationship between the catalog group and the calculation code.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The relationship between a catalog group and a calculation code.
   */
  getCatalogGroupCalculationCodeByIdResponse(params: CatalogGroupCalculationCodesService.GetCatalogGroupCalculationCodeByIdParams): __Observable<__StrictHttpResponse<{storeId?: number, catalogGroupId?: string, calculationCodeId?: number, id?: string, tradingId?: string, calculationFlags?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalog-group-calculation-codes/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{storeId?: number, catalogGroupId?: string, calculationCodeId?: number, id?: string, tradingId?: string, calculationFlags?: number}>;
      })
    );
  }

  /**
   * Get a relationship between a catalog group and a calculation code.
   * @param params The `CatalogGroupCalculationCodesService.GetCatalogGroupCalculationCodeByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the relationship between the catalog group and the calculation code.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The relationship between a catalog group and a calculation code.
   */
  getCatalogGroupCalculationCodeById(params: CatalogGroupCalculationCodesService.GetCatalogGroupCalculationCodeByIdParams): __Observable<{storeId?: number, catalogGroupId?: string, calculationCodeId?: number, id?: string, tradingId?: string, calculationFlags?: number}> {
    return this.getCatalogGroupCalculationCodeByIdResponse(params).pipe(
      __map(_r => _r.body as {storeId?: number, catalogGroupId?: string, calculationCodeId?: number, id?: string, tradingId?: string, calculationFlags?: number})
    );
  }

  /**
   * Delete a relationship between a catalog group and a calculation code.
   * @param id The unique numeric ID for identifying the relationship between the catalog group and the calculation code.
   */
  deleteCatalogGroupCalculationCodeByIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/catalog-group-calculation-codes/${id}`,
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
   * Delete a relationship between a catalog group and a calculation code.
   * @param id The unique numeric ID for identifying the relationship between the catalog group and the calculation code.
   */
  deleteCatalogGroupCalculationCodeById(id: string): __Observable<null> {
    return this.deleteCatalogGroupCalculationCodeByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a relationship between a catalog group and a calculation code.
   * @param params The `CatalogGroupCalculationCodesService.UpdateCatalogGroupCalculationCodeByIdParams` containing the following parameters:
   *
   * - `CatalogGroupCalculationCode`: The relationship between a catalog group and a calculation code.
   *
   * - `id`: The unique numeric ID for identifying the relationship between the catalog group and the calculation code.
   */
  updateCatalogGroupCalculationCodeByIdResponse(params: CatalogGroupCalculationCodesService.UpdateCatalogGroupCalculationCodeByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.CatalogGroupCalculationCode;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/catalog-group-calculation-codes/${params.id}`,
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
   * Update a relationship between a catalog group and a calculation code.
   * @param params The `CatalogGroupCalculationCodesService.UpdateCatalogGroupCalculationCodeByIdParams` containing the following parameters:
   *
   * - `CatalogGroupCalculationCode`: The relationship between a catalog group and a calculation code.
   *
   * - `id`: The unique numeric ID for identifying the relationship between the catalog group and the calculation code.
   */
  updateCatalogGroupCalculationCodeById(params: CatalogGroupCalculationCodesService.UpdateCatalogGroupCalculationCodeByIdParams): __Observable<null> {
    return this.updateCatalogGroupCalculationCodeByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CatalogGroupCalculationCodesService {

  /**
   * Parameters for getCatalogGroupCalculationCodes
   */
  export interface GetCatalogGroupCalculationCodesParams {

    /**
     * The store ID that is associated with the relationship between the catalog group and the calculation code.
     */
    storeId?: number;

    /**
     * The catalog group id.
     */
    catalogGroupId?: string;

    /**
     * The calculation code id.
     */
    calculationCodeId?: number;

    /**
     * The unique numeric ID for identifying the relationship between the catalog group and the calculation code.
     */
    id?: string;

    /**
     * The trading agreement id.
     */
    tradingId?: string;

    /**
     * The flags for the relationship between the catalog group and the calculation code.
     */
    calculationFlags?: number;

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
   * Parameters for getCatalogGroupCalculationCodeById
   */
  export interface GetCatalogGroupCalculationCodeByIdParams {

    /**
     * The unique numeric ID for identifying the relationship between the catalog group and the calculation code.
     */
    id: string;

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
   * Parameters for updateCatalogGroupCalculationCodeById
   */
  export interface UpdateCatalogGroupCalculationCodeByIdParams {

    /**
     * The relationship between a catalog group and a calculation code.
     */
    CatalogGroupCalculationCode: {storeId?: number, catalogGroupId?: string, calculationCodeId?: number, id?: string, tradingId?: string, calculationFlags?: number};

    /**
     * The unique numeric ID for identifying the relationship between the catalog group and the calculation code.
     */
    id: string;
  }
}

export { CatalogGroupCalculationCodesService }
