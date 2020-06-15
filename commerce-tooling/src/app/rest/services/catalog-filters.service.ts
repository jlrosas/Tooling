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
class CatalogFiltersService extends __BaseService {
  static readonly getCatalogFiltersPath = '/rest/admin/v2/catalog-filters';
  static readonly createCatalogFiltersPath = '/rest/admin/v2/catalog-filters';
  static readonly getCatalogFiltersByNamePath = '/rest/admin/v2/catalog-filters/by-name';
  static readonly createCatalogFilterCatalogEntryPath = '/rest/admin/v2/catalog-filters/{catalogFilterId}/catalog-entries';
  static readonly deleteCatalogFilterCatalogEntryPath = '/rest/admin/v2/catalog-filters/{catalogFilterId}/catalog-entries/{catalogEntryId}';
  static readonly deleteCatalogFilterCategorySelectionPath = '/rest/admin/v2/catalog-filters/{catalogFilterId}/category-selections/{catalogGroupSelectionId}';
  static readonly updateCatalogFilterCategorySelectionPath = '/rest/admin/v2/catalog-filters/{catalogFilterId}/category-selections/{catalogGroupSelectionId}';
  static readonly createCatalogFilterCategorySelectionConditionGroupPath = '/rest/admin/v2/catalog-filters/{catalogFilterId}/category-selections/{catalogGroupSelectionId}/condition-groups';
  static readonly deleteCatalogFilterCategorySelectionConditionGroupPath = '/rest/admin/v2/catalog-filters/{catalogFilterId}/category-selections/{catalogGroupSelectionId}/condition-groups/{conditionGroupId}';
  static readonly createCatalogFilterCategorySelectionConditionGroup_1Path = '/rest/admin/v2/catalog-filters/{catalogFilterId}/category-selections/{catalogGroupSelectionId}/condition-groups/{conditionGroupId}';
  static readonly createCatalogFilterCategorySelectionConditionGroupAttributePath = '/rest/admin/v2/catalog-filters/{catalogFilterId}/category-selections/{catalogGroupSelectionId}/condition-groups/{conditionGroupId}/attributes';
  static readonly deleteCatalogFilterCategorySelectionConditionGroupAttributePath = '/rest/admin/v2/catalog-filters/{catalogFilterId}/category-selections/{catalogGroupSelectionId}/condition-groups/{conditionGroupId}/attributes/{conditionId}';
  static readonly updateCatalogFilterCategorySelectionConditionGroupAttributePath = '/rest/admin/v2/catalog-filters/{catalogFilterId}/category-selections/{catalogGroupSelectionId}/condition-groups/{conditionGroupId}/attributes/{conditionId}';
  static readonly createCatalogFilterCategorySelectionConditionGroupAttributeValuePath = '/rest/admin/v2/catalog-filters/{catalogFilterId}/category-selections/{catalogGroupSelectionId}/condition-groups/{conditionGroupId}/attributes/{conditionId}/attribute-values';
  static readonly deleteCatalogFilterCategorySelectionConditionGroupAttributeValuePath = '/rest/admin/v2/catalog-filters/{catalogFilterId}/category-selections/{catalogGroupSelectionId}/condition-groups/{conditionGroupId}/attributes/{conditionId}/attribute-values/{conditionAttributeValueId}';
  static readonly updateCatalogFilterCategorySelectionConditionGroupAttributeValuePath = '/rest/admin/v2/catalog-filters/{catalogFilterId}/category-selections/{catalogGroupSelectionId}/condition-groups/{conditionGroupId}/attributes/{conditionId}/attribute-values/{conditionAttributeValueId}';
  static readonly deleteCatalogFilterPath = '/rest/admin/v2/catalog-filters/{id}';
  static readonly getCatalogFilterByIdPath = '/rest/admin/v2/catalog-filters/{id}';
  static readonly updateCatalogFilterPath = '/rest/admin/v2/catalog-filters/{id}';
  static readonly getCatalogFilterCategorySelectionsPath = '/rest/admin/v2/catalog-filters/{id}/category-selections';
  static readonly createCatalogFilterCategorySelectionPath = '/rest/admin/v2/catalog-filters/{id}/category-selections';
  static readonly getCatalogFilterProductSetSelectionsPath = '/rest/admin/v2/catalog-filters/{id}/product-set-selections';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `CatalogFiltersService.GetCatalogFiltersParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `offset`: The offset.
   *
   * - `limit`: The limit.
   *
   * @return The operation is successful.
   */
  getCatalogFiltersResponse(params: CatalogFiltersService.GetCatalogFiltersParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{catalogId?: string, description?: string, id?: string, name?: string, storeId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalog-filters`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{catalogId?: string, description?: string, id?: string, name?: string, storeId?: number}>}>;
      })
    );
  }

  /**
   * @param params The `CatalogFiltersService.GetCatalogFiltersParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `offset`: The offset.
   *
   * - `limit`: The limit.
   *
   * @return The operation is successful.
   */
  getCatalogFilters(params: CatalogFiltersService.GetCatalogFiltersParams): __Observable<{count?: number, items?: Array<{catalogId?: string, description?: string, id?: string, name?: string, storeId?: number}>}> {
    return this.getCatalogFiltersResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{catalogId?: string, description?: string, id?: string, name?: string, storeId?: number}>})
    );
  }

  /**
   * @param params The `CatalogFiltersService.CreateCatalogFiltersParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogFiltersResponse(params: CatalogFiltersService.CreateCatalogFiltersParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/catalog-filters`,
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
   * @param params The `CatalogFiltersService.CreateCatalogFiltersParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogFilters(params: CatalogFiltersService.CreateCatalogFiltersParams): __Observable<null> {
    return this.createCatalogFiltersResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.GetCatalogFiltersByNameParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `name`: The catalog filter name.
   *
   * @return The operation is successful.
   */
  getCatalogFiltersByNameResponse(params: CatalogFiltersService.GetCatalogFiltersByNameParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{catalogId?: string, description?: string, id?: string, name?: string, storeId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalog-filters/by-name`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{catalogId?: string, description?: string, id?: string, name?: string, storeId?: number}>}>;
      })
    );
  }

  /**
   * @param params The `CatalogFiltersService.GetCatalogFiltersByNameParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `name`: The catalog filter name.
   *
   * @return The operation is successful.
   */
  getCatalogFiltersByName(params: CatalogFiltersService.GetCatalogFiltersByNameParams): __Observable<{count?: number, items?: Array<{catalogId?: string, description?: string, id?: string, name?: string, storeId?: number}>}> {
    return this.getCatalogFiltersByNameResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{catalogId?: string, description?: string, id?: string, name?: string, storeId?: number}>})
    );
  }

  /**
   * @param params The `CatalogFiltersService.CreateCatalogFilterCatalogEntryParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `selection`: The catalog entry selection.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogFilterCatalogEntryResponse(params: CatalogFiltersService.CreateCatalogFilterCatalogEntryParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.selection != null) __params = __params.set('selection', params.selection.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.catalogFilterId}/catalog-entries`,
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
   * @param params The `CatalogFiltersService.CreateCatalogFilterCatalogEntryParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `selection`: The catalog entry selection.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogFilterCatalogEntry(params: CatalogFiltersService.CreateCatalogFilterCatalogEntryParams): __Observable<null> {
    return this.createCatalogFilterCatalogEntryResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.DeleteCatalogFilterCatalogEntryParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `selection`: The selection of catalog entry ID.
   *
   * - `catalogEntryId`: The catalog entry ID.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogFilterCatalogEntryResponse(params: CatalogFiltersService.DeleteCatalogFilterCatalogEntryParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.selection != null) __params = __params.set('selection', params.selection.toString());

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.catalogFilterId}/catalog-entries/${params.catalogEntryId}`,
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
   * @param params The `CatalogFiltersService.DeleteCatalogFilterCatalogEntryParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `selection`: The selection of catalog entry ID.
   *
   * - `catalogEntryId`: The catalog entry ID.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogFilterCatalogEntry(params: CatalogFiltersService.DeleteCatalogFilterCatalogEntryParams): __Observable<null> {
    return this.deleteCatalogFilterCatalogEntryResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.DeleteCatalogFilterCategorySelectionParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogFilterCategorySelectionResponse(params: CatalogFiltersService.DeleteCatalogFilterCategorySelectionParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.catalogFilterId}/category-selections/${params.catalogGroupSelectionId}`,
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
   * @param params The `CatalogFiltersService.DeleteCatalogFilterCategorySelectionParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogFilterCategorySelection(params: CatalogFiltersService.DeleteCatalogFilterCategorySelectionParams): __Observable<null> {
    return this.deleteCatalogFilterCategorySelectionResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.UpdateCatalogFilterCategorySelectionParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogFilterCategorySelectionResponse(params: CatalogFiltersService.UpdateCatalogFilterCategorySelectionParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.catalogFilterId}/category-selections/${params.catalogGroupSelectionId}`,
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
   * @param params The `CatalogFiltersService.UpdateCatalogFilterCategorySelectionParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogFilterCategorySelection(params: CatalogFiltersService.UpdateCatalogFilterCategorySelectionParams): __Observable<null> {
    return this.updateCatalogFilterCategorySelectionResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroupParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogFilterCategorySelectionConditionGroupResponse(params: CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroupParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.catalogFilterId}/category-selections/${params.catalogGroupSelectionId}/condition-groups`,
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
   * @param params The `CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroupParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogFilterCategorySelectionConditionGroup(params: CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroupParams): __Observable<null> {
    return this.createCatalogFilterCategorySelectionConditionGroupResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.DeleteCatalogFilterCategorySelectionConditionGroupParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `storeId`: The store id.
   */
  deleteCatalogFilterCategorySelectionConditionGroupResponse(params: CatalogFiltersService.DeleteCatalogFilterCategorySelectionConditionGroupParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.catalogFilterId}/category-selections/${params.catalogGroupSelectionId}/condition-groups/${params.conditionGroupId}`,
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
   * @param params The `CatalogFiltersService.DeleteCatalogFilterCategorySelectionConditionGroupParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `storeId`: The store id.
   */
  deleteCatalogFilterCategorySelectionConditionGroup(params: CatalogFiltersService.DeleteCatalogFilterCategorySelectionConditionGroupParams): __Observable<null> {
    return this.deleteCatalogFilterCategorySelectionConditionGroupResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroup_1Params` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogFilterCategorySelectionConditionGroup_1Response(params: CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroup_1Params): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.catalogFilterId}/category-selections/${params.catalogGroupSelectionId}/condition-groups/${params.conditionGroupId}`,
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
   * @param params The `CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroup_1Params` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogFilterCategorySelectionConditionGroup_1(params: CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroup_1Params): __Observable<null> {
    return this.createCatalogFilterCategorySelectionConditionGroup_1Response(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroupAttributeParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogFilterCategorySelectionConditionGroupAttributeResponse(params: CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroupAttributeParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.catalogFilterId}/category-selections/${params.catalogGroupSelectionId}/condition-groups/${params.conditionGroupId}/attributes`,
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
   * @param params The `CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroupAttributeParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogFilterCategorySelectionConditionGroupAttribute(params: CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroupAttributeParams): __Observable<null> {
    return this.createCatalogFilterCategorySelectionConditionGroupAttributeResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.DeleteCatalogFilterCategorySelectionConditionGroupAttributeParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `conditionId`: The unique numeric ID for identifying the condition.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogFilterCategorySelectionConditionGroupAttributeResponse(params: CatalogFiltersService.DeleteCatalogFilterCategorySelectionConditionGroupAttributeParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;




    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.catalogFilterId}/category-selections/${params.catalogGroupSelectionId}/condition-groups/${params.conditionGroupId}/attributes/${params.conditionId}`,
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
   * @param params The `CatalogFiltersService.DeleteCatalogFilterCategorySelectionConditionGroupAttributeParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `conditionId`: The unique numeric ID for identifying the condition.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogFilterCategorySelectionConditionGroupAttribute(params: CatalogFiltersService.DeleteCatalogFilterCategorySelectionConditionGroupAttributeParams): __Observable<null> {
    return this.deleteCatalogFilterCategorySelectionConditionGroupAttributeResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.UpdateCatalogFilterCategorySelectionConditionGroupAttributeParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `conditionId`: The unique numeric ID for identifying the condition.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogFilterCategorySelectionConditionGroupAttributeResponse(params: CatalogFiltersService.UpdateCatalogFilterCategorySelectionConditionGroupAttributeParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;




    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.catalogFilterId}/category-selections/${params.catalogGroupSelectionId}/condition-groups/${params.conditionGroupId}/attributes/${params.conditionId}`,
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
   * @param params The `CatalogFiltersService.UpdateCatalogFilterCategorySelectionConditionGroupAttributeParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `conditionId`: The unique numeric ID for identifying the condition.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogFilterCategorySelectionConditionGroupAttribute(params: CatalogFiltersService.UpdateCatalogFilterCategorySelectionConditionGroupAttributeParams): __Observable<null> {
    return this.updateCatalogFilterCategorySelectionConditionGroupAttributeResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroupAttributeValueParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `conditionId`: The condition attribute ID.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogFilterCategorySelectionConditionGroupAttributeValueResponse(params: CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroupAttributeValueParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;




    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.catalogFilterId}/category-selections/${params.catalogGroupSelectionId}/condition-groups/${params.conditionGroupId}/attributes/${params.conditionId}/attribute-values`,
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
   * @param params The `CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroupAttributeValueParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `conditionId`: The condition attribute ID.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogFilterCategorySelectionConditionGroupAttributeValue(params: CatalogFiltersService.CreateCatalogFilterCategorySelectionConditionGroupAttributeValueParams): __Observable<null> {
    return this.createCatalogFilterCategorySelectionConditionGroupAttributeValueResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.DeleteCatalogFilterCategorySelectionConditionGroupAttributeValueParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `conditionId`: The unique numeric ID for identifying the condition.
   *
   * - `conditionAttributeValueId`: The unique numeric ID for identifying the condition attribute value.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogFilterCategorySelectionConditionGroupAttributeValueResponse(params: CatalogFiltersService.DeleteCatalogFilterCategorySelectionConditionGroupAttributeValueParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;





    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.catalogFilterId}/category-selections/${params.catalogGroupSelectionId}/condition-groups/${params.conditionGroupId}/attributes/${params.conditionId}/attribute-values/${params.conditionAttributeValueId}`,
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
   * @param params The `CatalogFiltersService.DeleteCatalogFilterCategorySelectionConditionGroupAttributeValueParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `conditionId`: The unique numeric ID for identifying the condition.
   *
   * - `conditionAttributeValueId`: The unique numeric ID for identifying the condition attribute value.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogFilterCategorySelectionConditionGroupAttributeValue(params: CatalogFiltersService.DeleteCatalogFilterCategorySelectionConditionGroupAttributeValueParams): __Observable<null> {
    return this.deleteCatalogFilterCategorySelectionConditionGroupAttributeValueResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.UpdateCatalogFilterCategorySelectionConditionGroupAttributeValueParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `conditionId`: The unique numeric ID for identifying the condition.
   *
   * - `conditionAttributeValueId`: The unique numeric ID for identifying the condition attribute value.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogFilterCategorySelectionConditionGroupAttributeValueResponse(params: CatalogFiltersService.UpdateCatalogFilterCategorySelectionConditionGroupAttributeValueParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;





    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.catalogFilterId}/category-selections/${params.catalogGroupSelectionId}/condition-groups/${params.conditionGroupId}/attributes/${params.conditionId}/attribute-values/${params.conditionAttributeValueId}`,
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
   * @param params The `CatalogFiltersService.UpdateCatalogFilterCategorySelectionConditionGroupAttributeValueParams` containing the following parameters:
   *
   * - `catalogFilterId`: The unique numeric ID for identifying the catalog filter.
   *
   * - `catalogGroupSelectionId`: The unique numeric ID for identifying the catalog group selection.
   *
   * - `conditionGroupId`: The unique numeric ID for identifying the condition group.
   *
   * - `conditionId`: The unique numeric ID for identifying the condition.
   *
   * - `conditionAttributeValueId`: The unique numeric ID for identifying the condition attribute value.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogFilterCategorySelectionConditionGroupAttributeValue(params: CatalogFiltersService.UpdateCatalogFilterCategorySelectionConditionGroupAttributeValueParams): __Observable<null> {
    return this.updateCatalogFilterCategorySelectionConditionGroupAttributeValueResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.DeleteCatalogFilterParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog filter.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogFilterResponse(params: CatalogFiltersService.DeleteCatalogFilterParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.id}`,
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
   * @param params The `CatalogFiltersService.DeleteCatalogFilterParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog filter.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteCatalogFilter(params: CatalogFiltersService.DeleteCatalogFilterParams): __Observable<null> {
    return this.deleteCatalogFilterResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.GetCatalogFilterByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog filter
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getCatalogFilterByIdResponse(params: CatalogFiltersService.GetCatalogFilterByIdParams): __Observable<__StrictHttpResponse<{catalogId?: string, description?: string, id?: string, name?: string, storeId?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{catalogId?: string, description?: string, id?: string, name?: string, storeId?: number}>;
      })
    );
  }

  /**
   * @param params The `CatalogFiltersService.GetCatalogFilterByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog filter
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getCatalogFilterById(params: CatalogFiltersService.GetCatalogFilterByIdParams): __Observable<{catalogId?: string, description?: string, id?: string, name?: string, storeId?: number}> {
    return this.getCatalogFilterByIdResponse(params).pipe(
      __map(_r => _r.body as {catalogId?: string, description?: string, id?: string, name?: string, storeId?: number})
    );
  }

  /**
   * @param params The `CatalogFiltersService.UpdateCatalogFilterParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog filter.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogFilterResponse(params: CatalogFiltersService.UpdateCatalogFilterParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.id}`,
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
   * @param params The `CatalogFiltersService.UpdateCatalogFilterParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog filter.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  updateCatalogFilter(params: CatalogFiltersService.UpdateCatalogFilterParams): __Observable<null> {
    return this.updateCatalogFilterResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.GetCatalogFilterCategorySelectionsParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog filter.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getCatalogFilterCategorySelectionsResponse(params: CatalogFiltersService.GetCatalogFilterCategorySelectionsParams): __Observable<__StrictHttpResponse<{items?: Array<{catalogFilterId?: string, catalogGroupId?: string, catalogGroupSelectionId?: string, conditionGroups?: Array<{catalogGroupSelectionId?: string, conditionGroupId?: string, conditionName?: string, conditionRelation?: string, conditions?: Array<{catalogFilterConditionGroupId?: string, conditionAttributeAllowedValueId?: string, conditionAttributeName?: string, conditionAttributeValues?: Array<{conditionAttributeValueId?: string, conditionValue?: string, identifier?: string}>, conditionId?: string, conditionOperator?: string, conditionType?: string}>}>, selection?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.id}/category-selections`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{items?: Array<{catalogFilterId?: string, catalogGroupId?: string, catalogGroupSelectionId?: string, conditionGroups?: Array<{catalogGroupSelectionId?: string, conditionGroupId?: string, conditionName?: string, conditionRelation?: string, conditions?: Array<{catalogFilterConditionGroupId?: string, conditionAttributeAllowedValueId?: string, conditionAttributeName?: string, conditionAttributeValues?: Array<{conditionAttributeValueId?: string, conditionValue?: string, identifier?: string}>, conditionId?: string, conditionOperator?: string, conditionType?: string}>}>, selection?: string}>}>;
      })
    );
  }

  /**
   * @param params The `CatalogFiltersService.GetCatalogFilterCategorySelectionsParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog filter.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getCatalogFilterCategorySelections(params: CatalogFiltersService.GetCatalogFilterCategorySelectionsParams): __Observable<{items?: Array<{catalogFilterId?: string, catalogGroupId?: string, catalogGroupSelectionId?: string, conditionGroups?: Array<{catalogGroupSelectionId?: string, conditionGroupId?: string, conditionName?: string, conditionRelation?: string, conditions?: Array<{catalogFilterConditionGroupId?: string, conditionAttributeAllowedValueId?: string, conditionAttributeName?: string, conditionAttributeValues?: Array<{conditionAttributeValueId?: string, conditionValue?: string, identifier?: string}>, conditionId?: string, conditionOperator?: string, conditionType?: string}>}>, selection?: string}>}> {
    return this.getCatalogFilterCategorySelectionsResponse(params).pipe(
      __map(_r => _r.body as {items?: Array<{catalogFilterId?: string, catalogGroupId?: string, catalogGroupSelectionId?: string, conditionGroups?: Array<{catalogGroupSelectionId?: string, conditionGroupId?: string, conditionName?: string, conditionRelation?: string, conditions?: Array<{catalogFilterConditionGroupId?: string, conditionAttributeAllowedValueId?: string, conditionAttributeName?: string, conditionAttributeValues?: Array<{conditionAttributeValueId?: string, conditionValue?: string, identifier?: string}>, conditionId?: string, conditionOperator?: string, conditionType?: string}>}>, selection?: string}>})
    );
  }

  /**
   * @param params The `CatalogFiltersService.CreateCatalogFilterCategorySelectionParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog filter.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogFilterCategorySelectionResponse(params: CatalogFiltersService.CreateCatalogFilterCategorySelectionParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.id}/category-selections`,
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
   * @param params The `CatalogFiltersService.CreateCatalogFilterCategorySelectionParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog filter.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createCatalogFilterCategorySelection(params: CatalogFiltersService.CreateCatalogFilterCategorySelectionParams): __Observable<null> {
    return this.createCatalogFilterCategorySelectionResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CatalogFiltersService.GetCatalogFilterProductSetSelectionsParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog filter.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getCatalogFilterProductSetSelectionsResponse(params: CatalogFiltersService.GetCatalogFilterProductSetSelectionsParams): __Observable<__StrictHttpResponse<{items?: Array<{catalogEntryReferences?: Array<{id?: string, ownerId?: string, partNumber?: string, storeId?: number}>, productSetId?: string, selection?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/catalog-filters/${params.id}/product-set-selections`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{items?: Array<{catalogEntryReferences?: Array<{id?: string, ownerId?: string, partNumber?: string, storeId?: number}>, productSetId?: string, selection?: string}>}>;
      })
    );
  }

  /**
   * @param params The `CatalogFiltersService.GetCatalogFilterProductSetSelectionsParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the catalog filter.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getCatalogFilterProductSetSelections(params: CatalogFiltersService.GetCatalogFilterProductSetSelectionsParams): __Observable<{items?: Array<{catalogEntryReferences?: Array<{id?: string, ownerId?: string, partNumber?: string, storeId?: number}>, productSetId?: string, selection?: string}>}> {
    return this.getCatalogFilterProductSetSelectionsResponse(params).pipe(
      __map(_r => _r.body as {items?: Array<{catalogEntryReferences?: Array<{id?: string, ownerId?: string, partNumber?: string, storeId?: number}>, productSetId?: string, selection?: string}>})
    );
  }
}

module CatalogFiltersService {

  /**
   * Parameters for getCatalogFilters
   */
  export interface GetCatalogFiltersParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The offset.
     */
    offset?: number;

    /**
     * The limit.
     */
    limit?: number;
  }

  /**
   * Parameters for createCatalogFilters
   */
  export interface CreateCatalogFiltersParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {catalogId?: string, description?: string, id?: string, name?: string, storeId?: number};
  }

  /**
   * Parameters for getCatalogFiltersByName
   */
  export interface GetCatalogFiltersByNameParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The catalog filter name.
     */
    name?: string;
  }

  /**
   * Parameters for createCatalogFilterCatalogEntry
   */
  export interface CreateCatalogFilterCatalogEntryParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    catalogFilterId: string;

    /**
     * The catalog entry selection.
     */
    selection: 'Include' | 'Exclude';

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {id?: string, ownerId?: string, partNumber?: string, storeId?: number};
  }

  /**
   * Parameters for deleteCatalogFilterCatalogEntry
   */
  export interface DeleteCatalogFilterCatalogEntryParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    catalogFilterId: string;

    /**
     * The selection of catalog entry ID.
     */
    selection: 'Include' | 'Exclude';

    /**
     * The catalog entry ID.
     */
    catalogEntryId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;
  }

  /**
   * Parameters for deleteCatalogFilterCategorySelection
   */
  export interface DeleteCatalogFilterCategorySelectionParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    catalogFilterId: string;

    /**
     * The unique numeric ID for identifying the catalog group selection.
     */
    catalogGroupSelectionId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;
  }

  /**
   * Parameters for updateCatalogFilterCategorySelection
   */
  export interface UpdateCatalogFilterCategorySelectionParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    catalogFilterId: string;

    /**
     * The unique numeric ID for identifying the catalog group selection.
     */
    catalogGroupSelectionId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {catalogFilterId?: string, catalogGroupId?: string, catalogGroupSelectionId?: string, conditionGroups?: Array<{catalogGroupSelectionId?: string, conditionGroupId?: string, conditionName?: string, conditionRelation?: string, conditions?: Array<{catalogFilterConditionGroupId?: string, conditionAttributeAllowedValueId?: string, conditionAttributeName?: string, conditionAttributeValues?: Array<{conditionAttributeValueId?: string, conditionValue?: string, identifier?: string}>, conditionId?: string, conditionOperator?: string, conditionType?: string}>}>, selection?: string};
  }

  /**
   * Parameters for createCatalogFilterCategorySelectionConditionGroup
   */
  export interface CreateCatalogFilterCategorySelectionConditionGroupParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    catalogFilterId: string;

    /**
     * The unique numeric ID for identifying the catalog group selection.
     */
    catalogGroupSelectionId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {catalogGroupSelectionId?: string, conditionGroupId?: string, conditionName?: string, conditionRelation?: string, conditions?: Array<{catalogFilterConditionGroupId?: string, conditionAttributeAllowedValueId?: string, conditionAttributeName?: string, conditionAttributeValues?: Array<{conditionAttributeValueId?: string, conditionValue?: string, identifier?: string}>, conditionId?: string, conditionOperator?: string, conditionType?: string}>};
  }

  /**
   * Parameters for deleteCatalogFilterCategorySelectionConditionGroup
   */
  export interface DeleteCatalogFilterCategorySelectionConditionGroupParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    catalogFilterId: string;

    /**
     * The unique numeric ID for identifying the catalog group selection.
     */
    catalogGroupSelectionId: string;

    /**
     * The unique numeric ID for identifying the condition group.
     */
    conditionGroupId: string;

    /**
     * The store id.
     */
    storeId: number;
  }

  /**
   * Parameters for createCatalogFilterCategorySelectionConditionGroup_1
   */
  export interface CreateCatalogFilterCategorySelectionConditionGroup_1Params {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    catalogFilterId: string;

    /**
     * The unique numeric ID for identifying the catalog group selection.
     */
    catalogGroupSelectionId: string;

    /**
     * The unique numeric ID for identifying the condition group.
     */
    conditionGroupId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {catalogGroupSelectionId?: string, conditionGroupId?: string, conditionName?: string, conditionRelation?: string, conditions?: Array<{catalogFilterConditionGroupId?: string, conditionAttributeAllowedValueId?: string, conditionAttributeName?: string, conditionAttributeValues?: Array<{conditionAttributeValueId?: string, conditionValue?: string, identifier?: string}>, conditionId?: string, conditionOperator?: string, conditionType?: string}>};
  }

  /**
   * Parameters for createCatalogFilterCategorySelectionConditionGroupAttribute
   */
  export interface CreateCatalogFilterCategorySelectionConditionGroupAttributeParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    catalogFilterId: string;

    /**
     * The unique numeric ID for identifying the catalog group selection.
     */
    catalogGroupSelectionId: string;

    /**
     * The unique numeric ID for identifying the condition group.
     */
    conditionGroupId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {catalogFilterConditionGroupId?: string, conditionAttributeAllowedValueId?: string, conditionAttributeName?: string, conditionAttributeValues?: Array<{conditionAttributeValueId?: string, conditionValue?: string, identifier?: string}>, conditionId?: string, conditionOperator?: string, conditionType?: string};
  }

  /**
   * Parameters for deleteCatalogFilterCategorySelectionConditionGroupAttribute
   */
  export interface DeleteCatalogFilterCategorySelectionConditionGroupAttributeParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    catalogFilterId: string;

    /**
     * The unique numeric ID for identifying the catalog group selection.
     */
    catalogGroupSelectionId: string;

    /**
     * The unique numeric ID for identifying the condition group.
     */
    conditionGroupId: string;

    /**
     * The unique numeric ID for identifying the condition.
     */
    conditionId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;
  }

  /**
   * Parameters for updateCatalogFilterCategorySelectionConditionGroupAttribute
   */
  export interface UpdateCatalogFilterCategorySelectionConditionGroupAttributeParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    catalogFilterId: string;

    /**
     * The unique numeric ID for identifying the catalog group selection.
     */
    catalogGroupSelectionId: string;

    /**
     * The unique numeric ID for identifying the condition group.
     */
    conditionGroupId: string;

    /**
     * The unique numeric ID for identifying the condition.
     */
    conditionId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {catalogFilterConditionGroupId?: string, conditionAttributeAllowedValueId?: string, conditionAttributeName?: string, conditionAttributeValues?: Array<{conditionAttributeValueId?: string, conditionValue?: string, identifier?: string}>, conditionId?: string, conditionOperator?: string, conditionType?: string};
  }

  /**
   * Parameters for createCatalogFilterCategorySelectionConditionGroupAttributeValue
   */
  export interface CreateCatalogFilterCategorySelectionConditionGroupAttributeValueParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    catalogFilterId: string;

    /**
     * The unique numeric ID for identifying the catalog group selection.
     */
    catalogGroupSelectionId: string;

    /**
     * The unique numeric ID for identifying the condition group.
     */
    conditionGroupId: string;

    /**
     * The condition attribute ID.
     */
    conditionId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {conditionAttributeValueId?: string, conditionValue?: string, identifier?: string};
  }

  /**
   * Parameters for deleteCatalogFilterCategorySelectionConditionGroupAttributeValue
   */
  export interface DeleteCatalogFilterCategorySelectionConditionGroupAttributeValueParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    catalogFilterId: string;

    /**
     * The unique numeric ID for identifying the catalog group selection.
     */
    catalogGroupSelectionId: string;

    /**
     * The unique numeric ID for identifying the condition group.
     */
    conditionGroupId: string;

    /**
     * The unique numeric ID for identifying the condition.
     */
    conditionId: string;

    /**
     * The unique numeric ID for identifying the condition attribute value.
     */
    conditionAttributeValueId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;
  }

  /**
   * Parameters for updateCatalogFilterCategorySelectionConditionGroupAttributeValue
   */
  export interface UpdateCatalogFilterCategorySelectionConditionGroupAttributeValueParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    catalogFilterId: string;

    /**
     * The unique numeric ID for identifying the catalog group selection.
     */
    catalogGroupSelectionId: string;

    /**
     * The unique numeric ID for identifying the condition group.
     */
    conditionGroupId: string;

    /**
     * The unique numeric ID for identifying the condition.
     */
    conditionId: string;

    /**
     * The unique numeric ID for identifying the condition attribute value.
     */
    conditionAttributeValueId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {conditionAttributeValueId?: string, conditionValue?: string, identifier?: string};
  }

  /**
   * Parameters for deleteCatalogFilter
   */
  export interface DeleteCatalogFilterParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;
  }

  /**
   * Parameters for getCatalogFilterById
   */
  export interface GetCatalogFilterByIdParams {

    /**
     * The unique numeric ID for identifying the catalog filter
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;
  }

  /**
   * Parameters for updateCatalogFilter
   */
  export interface UpdateCatalogFilterParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {catalogId?: string, description?: string, id?: string, name?: string, storeId?: number};
  }

  /**
   * Parameters for getCatalogFilterCategorySelections
   */
  export interface GetCatalogFilterCategorySelectionsParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;
  }

  /**
   * Parameters for createCatalogFilterCategorySelection
   */
  export interface CreateCatalogFilterCategorySelectionParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {catalogFilterId?: string, catalogGroupId?: string, catalogGroupSelectionId?: string, conditionGroups?: Array<{catalogGroupSelectionId?: string, conditionGroupId?: string, conditionName?: string, conditionRelation?: string, conditions?: Array<{catalogFilterConditionGroupId?: string, conditionAttributeAllowedValueId?: string, conditionAttributeName?: string, conditionAttributeValues?: Array<{conditionAttributeValueId?: string, conditionValue?: string, identifier?: string}>, conditionId?: string, conditionOperator?: string, conditionType?: string}>}>, selection?: string};
  }

  /**
   * Parameters for getCatalogFilterProductSetSelections
   */
  export interface GetCatalogFilterProductSetSelectionsParams {

    /**
     * The unique numeric ID for identifying the catalog filter.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;
  }
}

export { CatalogFiltersService }
