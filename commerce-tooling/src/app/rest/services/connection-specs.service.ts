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
class ConnectionSpecsService extends __BaseService {
  static readonly getTransportConnectionSpecsPath = '/rest/admin/v2/connection-specs/transportId:{transportId},storeId:{storeId}';
  static readonly updateTransportConnectionSpecsPath = '/rest/admin/v2/connection-specs/transportId:{transportId},storeId:{storeId}';
  static readonly getMessageTransportConnectionSpecsPath = '/rest/admin/v2/connection-specs/transportId:{transportId},storeId:{storeId},profileId:{profileId}';
  static readonly updateMessageTransportConnectionSpecsPath = '/rest/admin/v2/connection-specs/transportId:{transportId},storeId:{storeId},profileId:{profileId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `ConnectionSpecsService.GetTransportConnectionSpecsParams` containing the following parameters:
   *
   * - `transportId`: The unique numeric ID of the transport.
   *
   * - `storeId`: The unique numeric ID of the store.
   *
   * @return The requested completed successfully.
   */
  getTransportConnectionSpecsResponse(params: ConnectionSpecsService.GetTransportConnectionSpecsParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/connection-specs/transportId:${params.transportId},storeId:${params.storeId}`,
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
   * @param params The `ConnectionSpecsService.GetTransportConnectionSpecsParams` containing the following parameters:
   *
   * - `transportId`: The unique numeric ID of the transport.
   *
   * - `storeId`: The unique numeric ID of the store.
   *
   * @return The requested completed successfully.
   */
  getTransportConnectionSpecs(params: ConnectionSpecsService.GetTransportConnectionSpecsParams): __Observable<any> {
    return this.getTransportConnectionSpecsResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * @param params The `ConnectionSpecsService.UpdateTransportConnectionSpecsParams` containing the following parameters:
   *
   * - `transportId`: The unique numeric ID of the transport.
   *
   * - `storeId`: The unique numeric ID of the store.
   *
   * - `body`: The request body for updating the connection specifications.
   */
  updateTransportConnectionSpecsResponse(params: ConnectionSpecsService.UpdateTransportConnectionSpecsParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/connection-specs/transportId:${params.transportId},storeId:${params.storeId}`,
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
   * @param params The `ConnectionSpecsService.UpdateTransportConnectionSpecsParams` containing the following parameters:
   *
   * - `transportId`: The unique numeric ID of the transport.
   *
   * - `storeId`: The unique numeric ID of the store.
   *
   * - `body`: The request body for updating the connection specifications.
   */
  updateTransportConnectionSpecs(params: ConnectionSpecsService.UpdateTransportConnectionSpecsParams): __Observable<null> {
    return this.updateTransportConnectionSpecsResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ConnectionSpecsService.GetMessageTransportConnectionSpecsParams` containing the following parameters:
   *
   * - `transportId`: The unique numeric ID of the transport.
   *
   * - `storeId`: The unique numeric ID of the store.
   *
   * - `profileId`: The unique numeric ID of the profile.
   *
   * @return The requested completed successfully.
   */
  getMessageTransportConnectionSpecsResponse(params: ConnectionSpecsService.GetMessageTransportConnectionSpecsParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/connection-specs/transportId:${params.transportId},storeId:${params.storeId},profileId:${params.profileId}`,
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
   * @param params The `ConnectionSpecsService.GetMessageTransportConnectionSpecsParams` containing the following parameters:
   *
   * - `transportId`: The unique numeric ID of the transport.
   *
   * - `storeId`: The unique numeric ID of the store.
   *
   * - `profileId`: The unique numeric ID of the profile.
   *
   * @return The requested completed successfully.
   */
  getMessageTransportConnectionSpecs(params: ConnectionSpecsService.GetMessageTransportConnectionSpecsParams): __Observable<any> {
    return this.getMessageTransportConnectionSpecsResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * @param params The `ConnectionSpecsService.UpdateMessageTransportConnectionSpecsParams` containing the following parameters:
   *
   * - `transportId`: The unique numeric ID of the transport.
   *
   * - `storeId`: The unique numeric ID of the store.
   *
   * - `profileId`: The unique numeric ID of the profile.
   *
   * - `body`: The request body for updating the connection specifications.
   */
  updateMessageTransportConnectionSpecsResponse(params: ConnectionSpecsService.UpdateMessageTransportConnectionSpecsParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/connection-specs/transportId:${params.transportId},storeId:${params.storeId},profileId:${params.profileId}`,
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
   * @param params The `ConnectionSpecsService.UpdateMessageTransportConnectionSpecsParams` containing the following parameters:
   *
   * - `transportId`: The unique numeric ID of the transport.
   *
   * - `storeId`: The unique numeric ID of the store.
   *
   * - `profileId`: The unique numeric ID of the profile.
   *
   * - `body`: The request body for updating the connection specifications.
   */
  updateMessageTransportConnectionSpecs(params: ConnectionSpecsService.UpdateMessageTransportConnectionSpecsParams): __Observable<null> {
    return this.updateMessageTransportConnectionSpecsResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ConnectionSpecsService {

  /**
   * Parameters for getTransportConnectionSpecs
   */
  export interface GetTransportConnectionSpecsParams {

    /**
     * The unique numeric ID of the transport.
     */
    transportId: number;

    /**
     * The unique numeric ID of the store.
     */
    storeId: number;
  }

  /**
   * Parameters for updateTransportConnectionSpecs
   */
  export interface UpdateTransportConnectionSpecsParams {

    /**
     * The unique numeric ID of the transport.
     */
    transportId: number;

    /**
     * The unique numeric ID of the store.
     */
    storeId: number;

    /**
     * The request body for updating the connection specifications.
     */
    body: any;
  }

  /**
   * Parameters for getMessageTransportConnectionSpecs
   */
  export interface GetMessageTransportConnectionSpecsParams {

    /**
     * The unique numeric ID of the transport.
     */
    transportId: number;

    /**
     * The unique numeric ID of the store.
     */
    storeId: number;

    /**
     * The unique numeric ID of the profile.
     */
    profileId: number;
  }

  /**
   * Parameters for updateMessageTransportConnectionSpecs
   */
  export interface UpdateMessageTransportConnectionSpecsParams {

    /**
     * The unique numeric ID of the transport.
     */
    transportId: number;

    /**
     * The unique numeric ID of the store.
     */
    storeId: number;

    /**
     * The unique numeric ID of the profile.
     */
    profileId: number;

    /**
     * The request body for updating the connection specifications.
     */
    body: any;
  }
}

export { ConnectionSpecsService }
