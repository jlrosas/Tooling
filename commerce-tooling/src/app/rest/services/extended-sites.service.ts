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
class ExtendedSitesService extends __BaseService {
  static readonly getExtendedSitesPath = '/rest/admin/v2/extended-sites';
  static readonly createExtendedSitePath = '/rest/admin/v2/extended-sites';
  static readonly getExtendedSiteByIdPath = '/rest/admin/v2/extended-sites/{id}';
  static readonly deleteExtendedSitePath = '/rest/admin/v2/extended-sites/{id}';
  static readonly exportExtendedSitePath = '/rest/admin/v2/extended-sites/{id}/export';
  static readonly importExtendedSitePath = '/rest/admin/v2/extended-sites/import';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of extended sites.
   * @param params The `ExtendedSitesService.GetExtendedSitesParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID of the hub store that owns the extended sites.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
   *
   * - `searchString`: Limits search results to only include extended sites with a name that matches the value of this parameter.
   *
   * - `status`: Limits search results to only include extended sites with the specified status. Possible values are
   *    * open
   *    * closed
   *    * suspended
   *    * deploying
   *    * deployFailed
   *
   * @return The request completed successfully.
   */
  getExtendedSitesResponse(params: ExtendedSitesService.GetExtendedSitesParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    if (params.status != null) __params = __params.set('status', params.status.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/extended-sites`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Get a collection of extended sites.
   * @param params The `ExtendedSitesService.GetExtendedSitesParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID of the hub store that owns the extended sites.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
   *
   * - `searchString`: Limits search results to only include extended sites with a name that matches the value of this parameter.
   *
   * - `status`: Limits search results to only include extended sites with the specified status. Possible values are
   *    * open
   *    * closed
   *    * suspended
   *    * deploying
   *    * deployFailed
   *
   * @return The request completed successfully.
   */
  getExtendedSites(params: ExtendedSitesService.GetExtendedSitesParams): __Observable<any> {
    return this.getExtendedSitesResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Create an extended site.
   * @param body Request body.
   */
  createExtendedSiteResponse(body: any): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/extended-sites`,
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
   * Create an extended site.
   * @param body Request body.
   */
  createExtendedSite(body: any): __Observable<null> {
    return this.createExtendedSiteResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get an extended site by its ID.
   * @param id The unique numeric ID for identifying the extended site.
   * @return The requested completed successfully.
   */
  getExtendedSiteByIdResponse(id: string): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/extended-sites/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Get an extended site by its ID.
   * @param id The unique numeric ID for identifying the extended site.
   * @return The requested completed successfully.
   */
  getExtendedSiteById(id: string): __Observable<any> {
    return this.getExtendedSiteByIdResponse(id).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Delete an extended site.
   * @param id The unique numeric ID of the extended site.
   */
  deleteExtendedSiteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/extended-sites/${id}`,
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
   * Delete an extended site.
   * @param id The unique numeric ID of the extended site.
   */
  deleteExtendedSite(id: string): __Observable<null> {
    return this.deleteExtendedSiteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Export an extended site.
   * @param id The unique numeric ID for identifying the extended site.
   * @return The extended site was exported successfully.
   */
  exportExtendedSiteResponse(id: string): __Observable<__StrictHttpResponse<Blob>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/extended-sites/${id}/export`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'blob'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Export an extended site.
   * @param id The unique numeric ID for identifying the extended site.
   * @return The extended site was exported successfully.
   */
  exportExtendedSite(id: string): __Observable<Blob> {
    return this.exportExtendedSiteResponse(id).pipe(
      __map(_r => _r.body as Blob)
    );
  }

  /**
   * Import an extended site.
   * @param params The `ExtendedSitesService.ImportExtendedSiteParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID of the hub store that owns the extended sites.
   *
   * - `body`: Extended site XML.
   */
  importExtendedSiteResponse(params: ExtendedSitesService.ImportExtendedSiteParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/extended-sites/import`,
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
   * Import an extended site.
   * @param params The `ExtendedSitesService.ImportExtendedSiteParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID of the hub store that owns the extended sites.
   *
   * - `body`: Extended site XML.
   */
  importExtendedSite(params: ExtendedSitesService.ImportExtendedSiteParams): __Observable<null> {
    return this.importExtendedSiteResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ExtendedSitesService {

  /**
   * Parameters for getExtendedSites
   */
  export interface GetExtendedSitesParams {

    /**
     * The unique numeric ID of the hub store that owns the extended sites.
     */
    storeId: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;

    /**
     * The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
     */
    sort?: string;

    /**
     * Limits search results to only include extended sites with a name that matches the value of this parameter.
     */
    searchString?: string;

    /**
     * Limits search results to only include extended sites with the specified status. Possible values are
     *  * open
     *  * closed
     *  * suspended
     *  * deploying
     *  * deployFailed
     */
    status?: string;
  }

  /**
   * Parameters for importExtendedSite
   */
  export interface ImportExtendedSiteParams {

    /**
     * The unique numeric ID of the hub store that owns the extended sites.
     */
    storeId: number;

    /**
     * Extended site XML.
     */
    body: string;
  }
}

export { ExtendedSitesService }
