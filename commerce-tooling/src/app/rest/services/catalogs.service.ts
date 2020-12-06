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
class CatalogsService extends __BaseService {
  static readonly getCatalogsPath = '/rest/admin/v2/catalogs';
  static readonly createCatalogPath = '/rest/admin/v2/catalogs';
  static readonly getCatalogByAttachmentIdPath = '/rest/admin/v2/catalogs/by-attachment-id';
  static readonly getCatalogByIdentifierOrNamePath = '/rest/admin/v2/catalogs/by-identifier-or-name';
  static readonly updateCatalogDescriptionPath = '/rest/admin/v2/catalogs/{catalogId}/descriptions/{id}';
  static readonly deleteCatalogPath = '/rest/admin/v2/catalogs/{id}';
  static readonly getCatalogByIdPath = '/rest/admin/v2/catalogs/{id}';
  static readonly updateCatalogPath = '/rest/admin/v2/catalogs/{id}';
  static readonly getCatalogDescriptionsPath = '/rest/admin/v2/catalogs/{id}/descriptions';
  static readonly createCatalogDescriptionPath = '/rest/admin/v2/catalogs/{id}/descriptions';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `CatalogsService.GetCatalogsParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * - `masterCatalog`: A boolean value selecting the master catalog.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is '5', the records that returned begin with the sixth record that matches the query parameters. If the offset is '0', the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getCatalogsResponse(params: CatalogsService.GetCatalogsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.dataLanguageIds != null) __params = __params.set('dataLanguageIds', params.dataLanguageIds.toString());
    if (params.masterCatalog != null) __params = __params.set('masterCatalog', params.masterCatalog.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalogs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}>}>;
      })
    );
  }

  /**
   * @param params The `CatalogsService.GetCatalogsParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * - `masterCatalog`: A boolean value selecting the master catalog.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is '5', the records that returned begin with the sixth record that matches the query parameters. If the offset is '0', the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getCatalogs(params: CatalogsService.GetCatalogsParams): __Observable<{count?: number, items?: Array<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}>}> {
    return this.getCatalogsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}>})
    );
  }

  /**
   * @param params The `CatalogsService.CreateCatalogParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogResponse(params: CatalogsService.CreateCatalogParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/catalogs`,
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
   * @param params The `CatalogsService.CreateCatalogParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalog(params: CatalogsService.CreateCatalogParams): __Observable<null> {
    return this.createCatalogResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogsService.GetCatalogByAttachmentIdParams` containing the following parameters:
   *
   * - `attachmentId`: The unique numeric ID for identifying the attachment.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is '5', the records that returned begin with the sixth record that matches the query parameters. If the offset is '0', the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getCatalogByAttachmentIdResponse(params: CatalogsService.GetCatalogByAttachmentIdParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.attachmentId != null) __params = __params.set('attachmentId', params.attachmentId.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.dataLanguageIds != null) __params = __params.set('dataLanguageIds', params.dataLanguageIds.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalogs/by-attachment-id`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}>}>;
      })
    );
  }

  /**
   * @param params The `CatalogsService.GetCatalogByAttachmentIdParams` containing the following parameters:
   *
   * - `attachmentId`: The unique numeric ID for identifying the attachment.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is '5', the records that returned begin with the sixth record that matches the query parameters. If the offset is '0', the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getCatalogByAttachmentId(params: CatalogsService.GetCatalogByAttachmentIdParams): __Observable<{count?: number, items?: Array<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}>}> {
    return this.getCatalogByAttachmentIdResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}>})
    );
  }

  /**
   * @param params The `CatalogsService.GetCatalogByIdentifierOrNameParams` containing the following parameters:
   *
   * - `searchText`: The identifier or the description name of the catalog.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is '5', the records that returned begin with the sixth record that matches the query parameters. If the offset is '0', the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getCatalogByIdentifierOrNameResponse(params: CatalogsService.GetCatalogByIdentifierOrNameParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.searchText != null) __params = __params.set('searchText', params.searchText.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.dataLanguageIds != null) __params = __params.set('dataLanguageIds', params.dataLanguageIds.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalogs/by-identifier-or-name`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}>}>;
      })
    );
  }

  /**
   * @param params The `CatalogsService.GetCatalogByIdentifierOrNameParams` containing the following parameters:
   *
   * - `searchText`: The identifier or the description name of the catalog.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is '5', the records that returned begin with the sixth record that matches the query parameters. If the offset is '0', the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getCatalogByIdentifierOrName(params: CatalogsService.GetCatalogByIdentifierOrNameParams): __Observable<{count?: number, items?: Array<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}>}> {
    return this.getCatalogByIdentifierOrNameResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}>})
    );
  }

  /**
   * @param params The `CatalogsService.UpdateCatalogDescriptionParams` containing the following parameters:
   *
   * - `catalogId`: The unique numeric ID for identifying the catalog.
   *
   * - `id`: The unique numeric ID for identifying the language.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogDescriptionResponse(params: CatalogsService.UpdateCatalogDescriptionParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/catalogs/${params.catalogId}/descriptions/${params.id}`,
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
   * @param params The `CatalogsService.UpdateCatalogDescriptionParams` containing the following parameters:
   *
   * - `catalogId`: The unique numeric ID for identifying the catalog.
   *
   * - `id`: The unique numeric ID for identifying the language.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogDescription(params: CatalogsService.UpdateCatalogDescriptionParams): __Observable<null> {
    return this.updateCatalogDescriptionResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogsService.DeleteCatalogParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogResponse(params: CatalogsService.DeleteCatalogParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/catalogs/${params.id}`,
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
   * @param params The `CatalogsService.DeleteCatalogParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalog(params: CatalogsService.DeleteCatalogParams): __Observable<null> {
    return this.deleteCatalogResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogsService.GetCatalogByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * @return The operation is successful.
   */
  getCatalogByIdResponse(params: CatalogsService.GetCatalogByIdParams): __Observable<__StrictHttpResponse<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.dataLanguageIds != null) __params = __params.set('dataLanguageIds', params.dataLanguageIds.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalogs/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}>;
      })
    );
  }

  /**
   * @param params The `CatalogsService.GetCatalogByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * @return The operation is successful.
   */
  getCatalogById(params: CatalogsService.GetCatalogByIdParams): __Observable<{attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number}> {
    return this.getCatalogByIdResponse(params).pipe(
      __map(_r => _r.body as {attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number})
    );
  }

  /**
   * @param params The `CatalogsService.UpdateCatalogParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogResponse(params: CatalogsService.UpdateCatalogParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/catalogs/${params.id}`,
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
   * @param params The `CatalogsService.UpdateCatalogParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalog(params: CatalogsService.UpdateCatalogParams): __Observable<null> {
    return this.updateCatalogResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogsService.GetCatalogDescriptionsParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * @return The operation is successful.
   */
  getCatalogDescriptionsResponse(params: CatalogsService.GetCatalogDescriptionsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.dataLanguageIds != null) __params = __params.set('dataLanguageIds', params.dataLanguageIds.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalogs/${params.id}/descriptions`,
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
   * @param params The `CatalogsService.GetCatalogDescriptionsParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * @return The operation is successful.
   */
  getCatalogDescriptions(params: CatalogsService.GetCatalogDescriptionsParams): __Observable<{count?: number, items?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>}> {
    return this.getCatalogDescriptionsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>})
    );
  }

  /**
   * @param params The `CatalogsService.CreateCatalogDescriptionParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogDescriptionResponse(params: CatalogsService.CreateCatalogDescriptionParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/catalogs/${params.id}/descriptions`,
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
   * @param params The `CatalogsService.CreateCatalogDescriptionParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogDescription(params: CatalogsService.CreateCatalogDescriptionParams): __Observable<null> {
    return this.createCatalogDescriptionResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CatalogsService {

  /**
   * Parameters for getCatalogs
   */
  export interface GetCatalogsParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
     */
    dataLanguageIds: string;

    /**
     * A boolean value selecting the master catalog.
     */
    masterCatalog: boolean;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is '5', the records that returned begin with the sixth record that matches the query parameters. If the offset is '0', the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for createCatalog
   */
  export interface CreateCatalogParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number};
  }

  /**
   * Parameters for getCatalogByAttachmentId
   */
  export interface GetCatalogByAttachmentIdParams {

    /**
     * The unique numeric ID for identifying the attachment.
     */
    attachmentId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
     */
    dataLanguageIds: string;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is '5', the records that returned begin with the sixth record that matches the query parameters. If the offset is '0', the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for getCatalogByIdentifierOrName
   */
  export interface GetCatalogByIdentifierOrNameParams {

    /**
     * The identifier or the description name of the catalog.
     */
    searchText: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
     */
    dataLanguageIds: string;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is '5', the records that returned begin with the sixth record that matches the query parameters. If the offset is '0', the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for updateCatalogDescription
   */
  export interface UpdateCatalogDescriptionParams {

    /**
     * The unique numeric ID for identifying the catalog.
     */
    catalogId: string;

    /**
     * The unique numeric ID for identifying the language.
     */
    id: number;

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
   * Parameters for deleteCatalog
   */
  export interface DeleteCatalogParams {

    /**
     * The unique numeric ID for identifying the catalog.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;
  }

  /**
   * Parameters for getCatalogById
   */
  export interface GetCatalogByIdParams {

    /**
     * The unique numeric ID for identifying the catalog.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
     */
    dataLanguageIds: string;
  }

  /**
   * Parameters for updateCatalog
   */
  export interface UpdateCatalogParams {

    /**
     * The unique numeric ID for identifying the catalog.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {attributes?: {[key: string]: string}, default?: boolean, descriptions?: Array<{available?: number, breadcrumbs?: Array<string>, fullImage?: string, keyword?: string, languageId?: number, longDescription?: string, name?: string, override?: Array<{fullImage?: string, id?: string, keyword?: string, longDescription?: string, name?: string, shortDescription?: string, thumbnail?: string}>, published?: 0 | 1, shortDescription?: string, thumbnail?: string}>, id?: string, identifier?: string, organizationId?: string, masterCatalog?: boolean, storeId?: number};
  }

  /**
   * Parameters for getCatalogDescriptions
   */
  export interface GetCatalogDescriptionsParams {

    /**
     * The unique numeric ID for identifying the catalog.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The integer(s) for identifying the language of the catalog description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
     */
    dataLanguageIds: string;
  }

  /**
   * Parameters for createCatalogDescription
   */
  export interface CreateCatalogDescriptionParams {

    /**
     * The unique numeric ID for identifying the catalog.
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
}

export { CatalogsService }
