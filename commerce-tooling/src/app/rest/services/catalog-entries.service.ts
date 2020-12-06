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
class CatalogEntriesService extends __BaseService {
  static readonly getCatalogEntriesPath = '/rest/admin/v2/catalog-entries';
  static readonly createCatalogEntryPath = '/rest/admin/v2/catalog-entries';
  static readonly getCatalogEntryDescriptionsPath = '/rest/admin/v2/catalog-entries/{catalogEntryId}/descriptions';
  static readonly createCatalogEntryDescriptionPath = '/rest/admin/v2/catalog-entries/{catalogEntryId}/descriptions';
  static readonly updateCatalogEntryDescriptionByIdPath = '/rest/admin/v2/catalog-entries/{catalogEntryId}/descriptions/{id}';
  static readonly updateCatalogEntryDescriptionOverrideByIdPath = '/rest/admin/v2/catalog-entries/{catalogEntryId}/descriptions/{languageId}/overrides/{id}';
  static readonly deleteCatalogEntryPath = '/rest/admin/v2/catalog-entries/{id}';
  static readonly getCatalogEntryByIdPath = '/rest/admin/v2/catalog-entries/{id}';
  static readonly updateCatalogEntryPath = '/rest/admin/v2/catalog-entries/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `CatalogEntriesService.GetCatalogEntriesParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `catalogId`: The unique numeric ID for identifying the catalog.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * - `catalogEntryType`: The catalog entry type codes. Available values:
   *   * CatalogEntryBean
   *   * ProductBean
   *   * ItemBean
   *   * PackageBean
   *   * BundleBean
   *   * DynamicKitBean
   *   * PredDynaKitBean
   *
   * - `parentCatalogGroupId`: The unique numeric ID for identifying the parent catalog group.
   *
   * - `parentCatalogEntryId`: The unique numeric ID for identifying the parent catalog entry.
   *
   * - `id`: The unique numeric ID for identifying the catalog entry.
   *
   * - `searchString`: The search string used to search for catalog entries.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getCatalogEntriesResponse(params: CatalogEntriesService.GetCatalogEntriesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{alternativeCurrencyPrices?: Array<{currency?: string, value?: number}>, currency?: string, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, displaySequence?: number, hasDefiningAttributes?: string, id?: string, listPrice?: number, ownerId?: string, owningStoreDirectory?: string, parentCatalogEntryId?: string, parentCatalogGroupId?: string, partNumber?: string, quantity?: number, quantityUnit?: string, storeId?: number, typeCode?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.catalogId != null) __params = __params.set('catalogId', params.catalogId.toString());
    if (params.dataLanguageIds != null) __params = __params.set('dataLanguageIds', params.dataLanguageIds.toString());
    (params.catalogEntryType || []).forEach(val => {if (val != null) __params = __params.append('catalogEntryType', val.toString())});
    if (params.parentCatalogGroupId != null) __params = __params.set('parentCatalogGroupId', params.parentCatalogGroupId.toString());
    if (params.parentCatalogEntryId != null) __params = __params.set('parentCatalogEntryId', params.parentCatalogEntryId.toString());
    (params.id || []).forEach(val => {if (val != null) __params = __params.append('id', val.toString())});
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalog-entries`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{alternativeCurrencyPrices?: Array<{currency?: string, value?: number}>, currency?: string, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, displaySequence?: number, hasDefiningAttributes?: string, id?: string, listPrice?: number, ownerId?: string, owningStoreDirectory?: string, parentCatalogEntryId?: string, parentCatalogGroupId?: string, partNumber?: string, quantity?: number, quantityUnit?: string, storeId?: number, typeCode?: string}>}>;
      })
    );
  }

  /**
   * @param params The `CatalogEntriesService.GetCatalogEntriesParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `catalogId`: The unique numeric ID for identifying the catalog.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * - `catalogEntryType`: The catalog entry type codes. Available values:
   *   * CatalogEntryBean
   *   * ProductBean
   *   * ItemBean
   *   * PackageBean
   *   * BundleBean
   *   * DynamicKitBean
   *   * PredDynaKitBean
   *
   * - `parentCatalogGroupId`: The unique numeric ID for identifying the parent catalog group.
   *
   * - `parentCatalogEntryId`: The unique numeric ID for identifying the parent catalog entry.
   *
   * - `id`: The unique numeric ID for identifying the catalog entry.
   *
   * - `searchString`: The search string used to search for catalog entries.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getCatalogEntries(params: CatalogEntriesService.GetCatalogEntriesParams): __Observable<{count?: number, items?: Array<{alternativeCurrencyPrices?: Array<{currency?: string, value?: number}>, currency?: string, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, displaySequence?: number, hasDefiningAttributes?: string, id?: string, listPrice?: number, ownerId?: string, owningStoreDirectory?: string, parentCatalogEntryId?: string, parentCatalogGroupId?: string, partNumber?: string, quantity?: number, quantityUnit?: string, storeId?: number, typeCode?: string}>}> {
    return this.getCatalogEntriesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{alternativeCurrencyPrices?: Array<{currency?: string, value?: number}>, currency?: string, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, displaySequence?: number, hasDefiningAttributes?: string, id?: string, listPrice?: number, ownerId?: string, owningStoreDirectory?: string, parentCatalogEntryId?: string, parentCatalogGroupId?: string, partNumber?: string, quantity?: number, quantityUnit?: string, storeId?: number, typeCode?: string}>})
    );
  }

  /**
   * @param params The `CatalogEntriesService.CreateCatalogEntryParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `catalogId`: The unique numeric ID for identifying the catalog .
   *
   * - `body`: The request body.
   */
  createCatalogEntryResponse(params: CatalogEntriesService.CreateCatalogEntryParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.catalogId != null) __params = __params.set('catalogId', params.catalogId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/catalog-entries`,
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
   * @param params The `CatalogEntriesService.CreateCatalogEntryParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `catalogId`: The unique numeric ID for identifying the catalog .
   *
   * - `body`: The request body.
   */
  createCatalogEntry(params: CatalogEntriesService.CreateCatalogEntryParams): __Observable<null> {
    return this.createCatalogEntryResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogEntriesService.GetCatalogEntryDescriptionsParams` containing the following parameters:
   *
   * - `catalogEntryId`: The unique numeric ID for identifying the catalog entry.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The data language IDs.
   *
   * @return The operation is successful.
   */
  getCatalogEntryDescriptionsResponse(params: CatalogEntriesService.GetCatalogEntryDescriptionsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.dataLanguageIds != null) __params = __params.set('dataLanguageIds', params.dataLanguageIds.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalog-entries/${params.catalogEntryId}/descriptions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>}>;
      })
    );
  }

  /**
   * @param params The `CatalogEntriesService.GetCatalogEntryDescriptionsParams` containing the following parameters:
   *
   * - `catalogEntryId`: The unique numeric ID for identifying the catalog entry.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The data language IDs.
   *
   * @return The operation is successful.
   */
  getCatalogEntryDescriptions(params: CatalogEntriesService.GetCatalogEntryDescriptionsParams): __Observable<{count?: number, items?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>}> {
    return this.getCatalogEntryDescriptionsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>})
    );
  }

  /**
   * @param params The `CatalogEntriesService.CreateCatalogEntryDescriptionParams` containing the following parameters:
   *
   * - `catalogEntryId`: The unique numeric ID for identifying the catalog entry.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogEntryDescriptionResponse(params: CatalogEntriesService.CreateCatalogEntryDescriptionParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/catalog-entries/${params.catalogEntryId}/descriptions`,
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
   * @param params The `CatalogEntriesService.CreateCatalogEntryDescriptionParams` containing the following parameters:
   *
   * - `catalogEntryId`: The unique numeric ID for identifying the catalog entry.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogEntryDescription(params: CatalogEntriesService.CreateCatalogEntryDescriptionParams): __Observable<null> {
    return this.createCatalogEntryDescriptionResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogEntriesService.UpdateCatalogEntryDescriptionByIdParams` containing the following parameters:
   *
   * - `catalogEntryId`: The unique numeric ID for identifying the catalog entry.
   *
   * - `id`: The unique numeric ID for identifying the catalog entry description.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogEntryDescriptionByIdResponse(params: CatalogEntriesService.UpdateCatalogEntryDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/catalog-entries/${params.catalogEntryId}/descriptions/${params.id}`,
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
   * @param params The `CatalogEntriesService.UpdateCatalogEntryDescriptionByIdParams` containing the following parameters:
   *
   * - `catalogEntryId`: The unique numeric ID for identifying the catalog entry.
   *
   * - `id`: The unique numeric ID for identifying the catalog entry description.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogEntryDescriptionById(params: CatalogEntriesService.UpdateCatalogEntryDescriptionByIdParams): __Observable<null> {
    return this.updateCatalogEntryDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogEntriesService.UpdateCatalogEntryDescriptionOverrideByIdParams` containing the following parameters:
   *
   * - `catalogEntryId`: The unique numeric ID for identifying the catalog entry.
   *
   * - `languageId`: The unique numeric ID for identifying the catalog entry description.
   *
   * - `id`: The unique numeric ID for identifying the catalog entry description override.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogEntryDescriptionOverrideByIdResponse(params: CatalogEntriesService.UpdateCatalogEntryDescriptionOverrideByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/catalog-entries/${params.catalogEntryId}/descriptions/${params.languageId}/overrides/${params.id}`,
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
   * @param params The `CatalogEntriesService.UpdateCatalogEntryDescriptionOverrideByIdParams` containing the following parameters:
   *
   * - `catalogEntryId`: The unique numeric ID for identifying the catalog entry.
   *
   * - `languageId`: The unique numeric ID for identifying the catalog entry description.
   *
   * - `id`: The unique numeric ID for identifying the catalog entry description override.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogEntryDescriptionOverrideById(params: CatalogEntriesService.UpdateCatalogEntryDescriptionOverrideByIdParams): __Observable<null> {
    return this.updateCatalogEntryDescriptionOverrideByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogEntriesService.DeleteCatalogEntryParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog entry.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogEntryResponse(params: CatalogEntriesService.DeleteCatalogEntryParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/catalog-entries/${params.id}`,
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
   * @param params The `CatalogEntriesService.DeleteCatalogEntryParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog entry.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogEntry(params: CatalogEntriesService.DeleteCatalogEntryParams): __Observable<null> {
    return this.deleteCatalogEntryResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogEntriesService.GetCatalogEntryByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog entry.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The data language IDs.
   *
   * @return The operation is successful.
   */
  getCatalogEntryByIdResponse(params: CatalogEntriesService.GetCatalogEntryByIdParams): __Observable<__StrictHttpResponse<{alternativeCurrencyPrices?: Array<{currency?: string, value?: number}>, currency?: string, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, displaySequence?: number, hasDefiningAttributes?: string, id?: string, listPrice?: number, ownerId?: string, owningStoreDirectory?: string, parentCatalogEntryId?: string, parentCatalogGroupId?: string, partNumber?: string, quantity?: number, quantityUnit?: string, storeId?: number, typeCode?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.dataLanguageIds != null) __params = __params.set('dataLanguageIds', params.dataLanguageIds.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalog-entries/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{alternativeCurrencyPrices?: Array<{currency?: string, value?: number}>, currency?: string, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, displaySequence?: number, hasDefiningAttributes?: string, id?: string, listPrice?: number, ownerId?: string, owningStoreDirectory?: string, parentCatalogEntryId?: string, parentCatalogGroupId?: string, partNumber?: string, quantity?: number, quantityUnit?: string, storeId?: number, typeCode?: string}>;
      })
    );
  }

  /**
   * @param params The `CatalogEntriesService.GetCatalogEntryByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog entry.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The data language IDs.
   *
   * @return The operation is successful.
   */
  getCatalogEntryById(params: CatalogEntriesService.GetCatalogEntryByIdParams): __Observable<{alternativeCurrencyPrices?: Array<{currency?: string, value?: number}>, currency?: string, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, displaySequence?: number, hasDefiningAttributes?: string, id?: string, listPrice?: number, ownerId?: string, owningStoreDirectory?: string, parentCatalogEntryId?: string, parentCatalogGroupId?: string, partNumber?: string, quantity?: number, quantityUnit?: string, storeId?: number, typeCode?: string}> {
    return this.getCatalogEntryByIdResponse(params).pipe(
      __map(_r => _r.body as {alternativeCurrencyPrices?: Array<{currency?: string, value?: number}>, currency?: string, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, displaySequence?: number, hasDefiningAttributes?: string, id?: string, listPrice?: number, ownerId?: string, owningStoreDirectory?: string, parentCatalogEntryId?: string, parentCatalogGroupId?: string, partNumber?: string, quantity?: number, quantityUnit?: string, storeId?: number, typeCode?: string})
    );
  }

  /**
   * @param params The `CatalogEntriesService.UpdateCatalogEntryParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog entry.
   *
   * - `catalogId`: The unique numeric ID for identifying the catalog .
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogEntryResponse(params: CatalogEntriesService.UpdateCatalogEntryParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.catalogId != null) __params = __params.set('catalogId', params.catalogId.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/catalog-entries/${params.id}`,
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
   * @param params The `CatalogEntriesService.UpdateCatalogEntryParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog entry.
   *
   * - `catalogId`: The unique numeric ID for identifying the catalog .
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogEntry(params: CatalogEntriesService.UpdateCatalogEntryParams): __Observable<null> {
    return this.updateCatalogEntryResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CatalogEntriesService {

  /**
   * Parameters for getCatalogEntries
   */
  export interface GetCatalogEntriesParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The unique numeric ID for identifying the catalog.
     */
    catalogId: string;

    /**
     * The integer(s) for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
     */
    dataLanguageIds: string;

    /**
     * The catalog entry type codes. Available values:
     * * CatalogEntryBean
     * * ProductBean
     * * ItemBean
     * * PackageBean
     * * BundleBean
     * * DynamicKitBean
     * * PredDynaKitBean
     */
    catalogEntryType?: Array<string>;

    /**
     * The unique numeric ID for identifying the parent catalog group.
     */
    parentCatalogGroupId?: string;

    /**
     * The unique numeric ID for identifying the parent catalog entry.
     */
    parentCatalogEntryId?: string;

    /**
     * The unique numeric ID for identifying the catalog entry.
     */
    id?: Array<string>;

    /**
     * The search string used to search for catalog entries.
     */
    searchString?: string;

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
   * Parameters for createCatalogEntry
   */
  export interface CreateCatalogEntryParams {

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
    body: {alternativeCurrencyPrices?: Array<{currency?: string, value?: number}>, currency?: string, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, displaySequence?: number, hasDefiningAttributes?: string, id?: string, listPrice?: number, ownerId?: string, owningStoreDirectory?: string, parentCatalogEntryId?: string, parentCatalogGroupId?: string, partNumber?: string, quantity?: number, quantityUnit?: string, storeId?: number, typeCode?: string};
  }

  /**
   * Parameters for getCatalogEntryDescriptions
   */
  export interface GetCatalogEntryDescriptionsParams {

    /**
     * The unique numeric ID for identifying the catalog entry.
     */
    catalogEntryId: string;

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
   * Parameters for createCatalogEntryDescription
   */
  export interface CreateCatalogEntryDescriptionParams {

    /**
     * The unique numeric ID for identifying the catalog entry.
     */
    catalogEntryId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string};
  }

  /**
   * Parameters for updateCatalogEntryDescriptionById
   */
  export interface UpdateCatalogEntryDescriptionByIdParams {

    /**
     * The unique numeric ID for identifying the catalog entry.
     */
    catalogEntryId: string;

    /**
     * The unique numeric ID for identifying the catalog entry description.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string};
  }

  /**
   * Parameters for updateCatalogEntryDescriptionOverrideById
   */
  export interface UpdateCatalogEntryDescriptionOverrideByIdParams {

    /**
     * The unique numeric ID for identifying the catalog entry.
     */
    catalogEntryId: string;

    /**
     * The unique numeric ID for identifying the catalog entry description.
     */
    languageId: string;

    /**
     * The unique numeric ID for identifying the catalog entry description override.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string};
  }

  /**
   * Parameters for deleteCatalogEntry
   */
  export interface DeleteCatalogEntryParams {

    /**
     * The unique numeric ID for identifying the catalog entry.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;
  }

  /**
   * Parameters for getCatalogEntryById
   */
  export interface GetCatalogEntryByIdParams {

    /**
     * The unique numeric ID for identifying the catalog entry.
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
   * Parameters for updateCatalogEntry
   */
  export interface UpdateCatalogEntryParams {

    /**
     * The unique numeric ID for identifying the catalog entry.
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
    body: {alternativeCurrencyPrices?: Array<{currency?: string, value?: number}>, currency?: string, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, displaySequence?: number, hasDefiningAttributes?: string, id?: string, listPrice?: number, ownerId?: string, owningStoreDirectory?: string, parentCatalogEntryId?: string, parentCatalogGroupId?: string, partNumber?: string, quantity?: number, quantityUnit?: string, storeId?: number, typeCode?: string};
  }
}

export { CatalogEntriesService }
