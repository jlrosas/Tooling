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
class CatalogEntryCalculationCodesService extends __BaseService {
  static readonly getCatalogEntryCalculationCodesPath = '/rest/admin/v2/catalog-entry-calculation-codes';
  static readonly createCatalogEntryCalculationCodePath = '/rest/admin/v2/catalog-entry-calculation-codes';
  static readonly getCatalogEntryCalculationCodeByIdPath = '/rest/admin/v2/catalog-entry-calculation-codes/{id}';
  static readonly deleteCatalogEntryCalculationCodeByIdPath = '/rest/admin/v2/catalog-entry-calculation-codes/{id}';
  static readonly updateCatalogEntryCalculationCodeByIdPath = '/rest/admin/v2/catalog-entry-calculation-codes/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of relationships between catalog entries and calculation codes.
   * @param params The `CatalogEntryCalculationCodesService.GetCatalogEntryCalculationCodesParams` containing the following parameters:
   *
   * - `storeId`: The store ID that is associated with the relationship between the catalog entry and the calculation code.
   *
   * - `catalogEntryId`: The catalog entry id.
   *
   * - `calculationCodeId`: The calculation code id.
   *
   * - `id`: The unique numeric ID for identifying the relationship between the catalog entry and the calculation code.
   *
   * - `contractId`: The contract id.
   *
   * - `calculationFlags`: The flags for the relationship between the catalog entry and the calculation code.
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
   * @return A collection of relationships between catalog entries and calculation codes.
   */
  getCatalogEntryCalculationCodesResponse(params: CatalogEntryCalculationCodesService.GetCatalogEntryCalculationCodesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{storeId?: number, catalogEntryId?: string, calculationCodeId?: number, id?: string, contractId?: string, calculationFlags?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.catalogEntryId != null) __params = __params.set('catalogEntryId', params.catalogEntryId.toString());
    if (params.calculationCodeId != null) __params = __params.set('calculationCodeId', params.calculationCodeId.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.contractId != null) __params = __params.set('contractId', params.contractId.toString());
    if (params.calculationFlags != null) __params = __params.set('calculationFlags', params.calculationFlags.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalog-entry-calculation-codes`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{storeId?: number, catalogEntryId?: string, calculationCodeId?: number, id?: string, contractId?: string, calculationFlags?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of relationships between catalog entries and calculation codes.
   * @param params The `CatalogEntryCalculationCodesService.GetCatalogEntryCalculationCodesParams` containing the following parameters:
   *
   * - `storeId`: The store ID that is associated with the relationship between the catalog entry and the calculation code.
   *
   * - `catalogEntryId`: The catalog entry id.
   *
   * - `calculationCodeId`: The calculation code id.
   *
   * - `id`: The unique numeric ID for identifying the relationship between the catalog entry and the calculation code.
   *
   * - `contractId`: The contract id.
   *
   * - `calculationFlags`: The flags for the relationship between the catalog entry and the calculation code.
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
   * @return A collection of relationships between catalog entries and calculation codes.
   */
  getCatalogEntryCalculationCodes(params: CatalogEntryCalculationCodesService.GetCatalogEntryCalculationCodesParams): __Observable<{count?: number, items?: Array<{storeId?: number, catalogEntryId?: string, calculationCodeId?: number, id?: string, contractId?: string, calculationFlags?: number}>}> {
    return this.getCatalogEntryCalculationCodesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{storeId?: number, catalogEntryId?: string, calculationCodeId?: number, id?: string, contractId?: string, calculationFlags?: number}>})
    );
  }

  /**
   * Create a relationship between a catalog entry and a calculation code.
   * @param CatalogEntryCalculationCode The relationship between a catalog entry and a calculation code.
   */
  createCatalogEntryCalculationCodeResponse(CatalogEntryCalculationCode: {storeId?: number, catalogEntryId?: string, calculationCodeId?: number, id?: string, contractId?: string, calculationFlags?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CatalogEntryCalculationCode;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/catalog-entry-calculation-codes`,
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
   * Create a relationship between a catalog entry and a calculation code.
   * @param CatalogEntryCalculationCode The relationship between a catalog entry and a calculation code.
   */
  createCatalogEntryCalculationCode(CatalogEntryCalculationCode: {storeId?: number, catalogEntryId?: string, calculationCodeId?: number, id?: string, contractId?: string, calculationFlags?: number}): __Observable<null> {
    return this.createCatalogEntryCalculationCodeResponse(CatalogEntryCalculationCode).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a relationship between a catalog entry and a calculation code.
   * @param params The `CatalogEntryCalculationCodesService.GetCatalogEntryCalculationCodeByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the relationship between the catalog entry and the calculation code.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The relationship between a catalog entry and a calculation code.
   */
  getCatalogEntryCalculationCodeByIdResponse(params: CatalogEntryCalculationCodesService.GetCatalogEntryCalculationCodeByIdParams): __Observable<__StrictHttpResponse<{storeId?: number, catalogEntryId?: string, calculationCodeId?: number, id?: string, contractId?: string, calculationFlags?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalog-entry-calculation-codes/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{storeId?: number, catalogEntryId?: string, calculationCodeId?: number, id?: string, contractId?: string, calculationFlags?: number}>;
      })
    );
  }

  /**
   * Get a relationship between a catalog entry and a calculation code.
   * @param params The `CatalogEntryCalculationCodesService.GetCatalogEntryCalculationCodeByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the relationship between the catalog entry and the calculation code.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The relationship between a catalog entry and a calculation code.
   */
  getCatalogEntryCalculationCodeById(params: CatalogEntryCalculationCodesService.GetCatalogEntryCalculationCodeByIdParams): __Observable<{storeId?: number, catalogEntryId?: string, calculationCodeId?: number, id?: string, contractId?: string, calculationFlags?: number}> {
    return this.getCatalogEntryCalculationCodeByIdResponse(params).pipe(
      __map(_r => _r.body as {storeId?: number, catalogEntryId?: string, calculationCodeId?: number, id?: string, contractId?: string, calculationFlags?: number})
    );
  }

  /**
   * Delete a relationship between a catalog entry and a calculation code.
   * @param id The unique numeric ID for identifying the relationship between the catalog entry and the calculation code.
   */
  deleteCatalogEntryCalculationCodeByIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/catalog-entry-calculation-codes/${id}`,
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
   * Delete a relationship between a catalog entry and a calculation code.
   * @param id The unique numeric ID for identifying the relationship between the catalog entry and the calculation code.
   */
  deleteCatalogEntryCalculationCodeById(id: string): __Observable<null> {
    return this.deleteCatalogEntryCalculationCodeByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a relationship between a catalog entry and a calculation code.
   * @param params The `CatalogEntryCalculationCodesService.UpdateCatalogEntryCalculationCodeByIdParams` containing the following parameters:
   *
   * - `CatalogEntryCalculationCode`: The relationship between a catalog entry and a calculation code.
   *
   * - `id`: The unique numeric ID for identifying the relationship between the catalog entry and the calculation code.
   */
  updateCatalogEntryCalculationCodeByIdResponse(params: CatalogEntryCalculationCodesService.UpdateCatalogEntryCalculationCodeByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.CatalogEntryCalculationCode;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/catalog-entry-calculation-codes/${params.id}`,
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
   * Update a relationship between a catalog entry and a calculation code.
   * @param params The `CatalogEntryCalculationCodesService.UpdateCatalogEntryCalculationCodeByIdParams` containing the following parameters:
   *
   * - `CatalogEntryCalculationCode`: The relationship between a catalog entry and a calculation code.
   *
   * - `id`: The unique numeric ID for identifying the relationship between the catalog entry and the calculation code.
   */
  updateCatalogEntryCalculationCodeById(params: CatalogEntryCalculationCodesService.UpdateCatalogEntryCalculationCodeByIdParams): __Observable<null> {
    return this.updateCatalogEntryCalculationCodeByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CatalogEntryCalculationCodesService {

  /**
   * Parameters for getCatalogEntryCalculationCodes
   */
  export interface GetCatalogEntryCalculationCodesParams {

    /**
     * The store ID that is associated with the relationship between the catalog entry and the calculation code.
     */
    storeId?: number;

    /**
     * The catalog entry id.
     */
    catalogEntryId?: string;

    /**
     * The calculation code id.
     */
    calculationCodeId?: number;

    /**
     * The unique numeric ID for identifying the relationship between the catalog entry and the calculation code.
     */
    id?: string;

    /**
     * The contract id.
     */
    contractId?: string;

    /**
     * The flags for the relationship between the catalog entry and the calculation code.
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
   * Parameters for getCatalogEntryCalculationCodeById
   */
  export interface GetCatalogEntryCalculationCodeByIdParams {

    /**
     * The unique numeric ID for identifying the relationship between the catalog entry and the calculation code.
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
   * Parameters for updateCatalogEntryCalculationCodeById
   */
  export interface UpdateCatalogEntryCalculationCodeByIdParams {

    /**
     * The relationship between a catalog entry and a calculation code.
     */
    CatalogEntryCalculationCode: {storeId?: number, catalogEntryId?: string, calculationCodeId?: number, id?: string, contractId?: string, calculationFlags?: number};

    /**
     * The unique numeric ID for identifying the relationship between the catalog entry and the calculation code.
     */
    id: string;
  }
}

export { CatalogEntryCalculationCodesService }
