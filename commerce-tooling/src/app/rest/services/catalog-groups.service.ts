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
class CatalogGroupsService extends __BaseService {
  static readonly getCatalogGroupsPath = '/rest/admin/v2/catalog-groups';
  static readonly createCatalogGroupsPath = '/rest/admin/v2/catalog-groups';
  static readonly deleteCatalogGroupPath = '/rest/admin/v2/catalog-groups/{id}';
  static readonly getCatalogGroupByIdPath = '/rest/admin/v2/catalog-groups/{id}';
  static readonly updateCatalogGroupPath = '/rest/admin/v2/catalog-groups/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `CatalogGroupsService.GetCatalogGroupsParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `catalogId`: The unique numeric ID for identifying the catalog.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the catalog group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * - `searchText`: The name pattern to search.
   *
   * - `topCatalogGroup`: The top category indicator used to search for top level catalog groups.
   *
   * - `parentCatalogGroupId`: The unique numeric ID for identifying the parent catalog group.
   *
   * - `id`: The unique numeric ID for identifying the catalog group.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getCatalogGroupsResponse(params: CatalogGroupsService.GetCatalogGroupsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{displaySequence?: number, id?: string, longDescription?: string, name?: string, ownerId?: string, owningStoreDirectory?: string, parentCatalogGroupId?: string, shortDescription?: string, storeId?: number, topCatalogGroup?: boolean}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.catalogId != null) __params = __params.set('catalogId', params.catalogId.toString());
    if (params.dataLanguageIds != null) __params = __params.set('dataLanguageIds', params.dataLanguageIds.toString());
    if (params.searchText != null) __params = __params.set('searchText', params.searchText.toString());
    if (params.topCatalogGroup != null) __params = __params.set('topCatalogGroup', params.topCatalogGroup.toString());
    if (params.parentCatalogGroupId != null) __params = __params.set('parentCatalogGroupId', params.parentCatalogGroupId.toString());
    (params.id || []).forEach(val => {if (val != null) __params = __params.append('id', val.toString())});
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalog-groups`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{displaySequence?: number, id?: string, longDescription?: string, name?: string, ownerId?: string, owningStoreDirectory?: string, parentCatalogGroupId?: string, shortDescription?: string, storeId?: number, topCatalogGroup?: boolean}>}>;
      })
    );
  }

  /**
   * @param params The `CatalogGroupsService.GetCatalogGroupsParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `catalogId`: The unique numeric ID for identifying the catalog.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the catalog group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * - `searchText`: The name pattern to search.
   *
   * - `topCatalogGroup`: The top category indicator used to search for top level catalog groups.
   *
   * - `parentCatalogGroupId`: The unique numeric ID for identifying the parent catalog group.
   *
   * - `id`: The unique numeric ID for identifying the catalog group.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getCatalogGroups(params: CatalogGroupsService.GetCatalogGroupsParams): __Observable<{count?: number, items?: Array<{displaySequence?: number, id?: string, longDescription?: string, name?: string, ownerId?: string, owningStoreDirectory?: string, parentCatalogGroupId?: string, shortDescription?: string, storeId?: number, topCatalogGroup?: boolean}>}> {
    return this.getCatalogGroupsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{displaySequence?: number, id?: string, longDescription?: string, name?: string, ownerId?: string, owningStoreDirectory?: string, parentCatalogGroupId?: string, shortDescription?: string, storeId?: number, topCatalogGroup?: boolean}>})
    );
  }

  /**
   * @param params The `CatalogGroupsService.CreateCatalogGroupsParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `catalogId`: The unique numeric ID for identifying the catalog .
   *
   * - `body`: The request body.
   */
  createCatalogGroupsResponse(params: CatalogGroupsService.CreateCatalogGroupsParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.catalogId != null) __params = __params.set('catalogId', params.catalogId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/catalog-groups`,
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
   * @param params The `CatalogGroupsService.CreateCatalogGroupsParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `catalogId`: The unique numeric ID for identifying the catalog .
   *
   * - `body`: The request body.
   */
  createCatalogGroups(params: CatalogGroupsService.CreateCatalogGroupsParams): __Observable<null> {
    return this.createCatalogGroupsResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogGroupsService.DeleteCatalogGroupParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogGroupResponse(params: CatalogGroupsService.DeleteCatalogGroupParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/catalog-groups/${params.id}`,
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
   * @param params The `CatalogGroupsService.DeleteCatalogGroupParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogGroup(params: CatalogGroupsService.DeleteCatalogGroupParams): __Observable<null> {
    return this.deleteCatalogGroupResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogGroupsService.GetCatalogGroupByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The data language IDs.
   *
   * @return The operation is successful.
   */
  getCatalogGroupByIdResponse(params: CatalogGroupsService.GetCatalogGroupByIdParams): __Observable<__StrictHttpResponse<{displaySequence?: number, id?: string, longDescription?: string, name?: string, ownerId?: string, owningStoreDirectory?: string, parentCatalogGroupId?: string, shortDescription?: string, storeId?: number, topCatalogGroup?: boolean}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.dataLanguageIds != null) __params = __params.set('dataLanguageIds', params.dataLanguageIds.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalog-groups/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{displaySequence?: number, id?: string, longDescription?: string, name?: string, ownerId?: string, owningStoreDirectory?: string, parentCatalogGroupId?: string, shortDescription?: string, storeId?: number, topCatalogGroup?: boolean}>;
      })
    );
  }

  /**
   * @param params The `CatalogGroupsService.GetCatalogGroupByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The data language IDs.
   *
   * @return The operation is successful.
   */
  getCatalogGroupById(params: CatalogGroupsService.GetCatalogGroupByIdParams): __Observable<{displaySequence?: number, id?: string, longDescription?: string, name?: string, ownerId?: string, owningStoreDirectory?: string, parentCatalogGroupId?: string, shortDescription?: string, storeId?: number, topCatalogGroup?: boolean}> {
    return this.getCatalogGroupByIdResponse(params).pipe(
      __map(_r => _r.body as {displaySequence?: number, id?: string, longDescription?: string, name?: string, ownerId?: string, owningStoreDirectory?: string, parentCatalogGroupId?: string, shortDescription?: string, storeId?: number, topCatalogGroup?: boolean})
    );
  }

  /**
   * @param params The `CatalogGroupsService.UpdateCatalogGroupParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog group.
   *
   * - `catalogId`: The unique numeric ID for identifying the catalog .
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogGroupResponse(params: CatalogGroupsService.UpdateCatalogGroupParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.catalogId != null) __params = __params.set('catalogId', params.catalogId.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/catalog-groups/${params.id}`,
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
   * @param params The `CatalogGroupsService.UpdateCatalogGroupParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog group.
   *
   * - `catalogId`: The unique numeric ID for identifying the catalog .
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogGroup(params: CatalogGroupsService.UpdateCatalogGroupParams): __Observable<null> {
    return this.updateCatalogGroupResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CatalogGroupsService {

  /**
   * Parameters for getCatalogGroups
   */
  export interface GetCatalogGroupsParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The unique numeric ID for identifying the catalog.
     */
    catalogId: string;

    /**
     * The integer(s) for identifying the language of the catalog group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
     */
    dataLanguageIds: string;

    /**
     * The name pattern to search.
     */
    searchText?: string;

    /**
     * The top category indicator used to search for top level catalog groups.
     */
    topCatalogGroup?: boolean;

    /**
     * The unique numeric ID for identifying the parent catalog group.
     */
    parentCatalogGroupId?: string;

    /**
     * The unique numeric ID for identifying the catalog group.
     */
    id?: Array<string>;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for createCatalogGroups
   */
  export interface CreateCatalogGroupsParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The unique numeric ID for identifying the catalog .
     */
    catalogId: string;

    /**
     * The request body.
     */
    body: {displaySequence?: number, id?: string, longDescription?: string, name?: string, ownerId?: string, owningStoreDirectory?: string, parentCatalogGroupId?: string, shortDescription?: string, storeId?: number, topCatalogGroup?: boolean};
  }

  /**
   * Parameters for deleteCatalogGroup
   */
  export interface DeleteCatalogGroupParams {

    /**
     * The unique numeric ID for identifying the catalog group.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;
  }

  /**
   * Parameters for getCatalogGroupById
   */
  export interface GetCatalogGroupByIdParams {

    /**
     * The unique numeric ID for identifying the catalog group.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The data language IDs.
     */
    dataLanguageIds: string;
  }

  /**
   * Parameters for updateCatalogGroup
   */
  export interface UpdateCatalogGroupParams {

    /**
     * The unique numeric ID for identifying the catalog group.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the catalog .
     */
    catalogId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {displaySequence?: number, id?: string, longDescription?: string, name?: string, ownerId?: string, owningStoreDirectory?: string, parentCatalogGroupId?: string, shortDescription?: string, storeId?: number, topCatalogGroup?: boolean};
  }
}

export { CatalogGroupsService }
