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
class ArchivedMessagesService extends __BaseService {
  static readonly getArchivedMessagesPath = '/rest/admin/v2/archived-messages';
  static readonly resendArchivedMessagePath = '/rest/admin/v2/archived-messages/{id}/resend';
  static readonly getArchivedMessageByIdPath = '/rest/admin/v2/archived-messages/{id}';
  static readonly deleteArchivedMessagePath = '/rest/admin/v2/archived-messages/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of archived messages.
   * @param params The `ArchivedMessagesService.GetArchivedMessagesParams` containing the following parameters:
   *
   * - `storeId`: The store ID for the store from which the archived messages originated.
   *
   * - `transportId`: The unique numeric ID for identifying the transport.
   *
   * - `searchString`: Limits search results to only include the message with an id that matches the value of this parameter.
   *
   * - `limit`: The maximum number of results to be returned.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name,-id will order the items first based on the name value in ascending order, and then by their ID value in descending order.
   *
   * @return The requested completed successfully.
   */
  getArchivedMessagesResponse(params: ArchivedMessagesService.GetArchivedMessagesParams): __Observable<__StrictHttpResponse<{count?: number, limit?: number, offset?: number, items?: Array<{id?: string, content?: string, transportId?: number, storeId?: number, connectionSpecifications?: {[key: string]: string}, interactionSpecifications?: {[key: string]: string}}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.transportId != null) __params = __params.set('transportId', params.transportId.toString());
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/archived-messages`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, limit?: number, offset?: number, items?: Array<{id?: string, content?: string, transportId?: number, storeId?: number, connectionSpecifications?: {[key: string]: string}, interactionSpecifications?: {[key: string]: string}}>}>;
      })
    );
  }

  /**
   * Get a collection of archived messages.
   * @param params The `ArchivedMessagesService.GetArchivedMessagesParams` containing the following parameters:
   *
   * - `storeId`: The store ID for the store from which the archived messages originated.
   *
   * - `transportId`: The unique numeric ID for identifying the transport.
   *
   * - `searchString`: Limits search results to only include the message with an id that matches the value of this parameter.
   *
   * - `limit`: The maximum number of results to be returned.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name,-id will order the items first based on the name value in ascending order, and then by their ID value in descending order.
   *
   * @return The requested completed successfully.
   */
  getArchivedMessages(params: ArchivedMessagesService.GetArchivedMessagesParams): __Observable<{count?: number, limit?: number, offset?: number, items?: Array<{id?: string, content?: string, transportId?: number, storeId?: number, connectionSpecifications?: {[key: string]: string}, interactionSpecifications?: {[key: string]: string}}>}> {
    return this.getArchivedMessagesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, limit?: number, offset?: number, items?: Array<{id?: string, content?: string, transportId?: number, storeId?: number, connectionSpecifications?: {[key: string]: string}, interactionSpecifications?: {[key: string]: string}}>})
    );
  }

  /**
   * Re-send the specified archived message. A copy of the specified archived message will be created as a pending message with a positive retry count. The new pending message will be attempted to be sent by a "SendTransactedMsg" job, if one is running.
   * @param params The `ArchivedMessagesService.ResendArchivedMessageParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the archived message.
   *
   * - `body`: Request body.
   */
  resendArchivedMessageResponse(params: ArchivedMessagesService.ResendArchivedMessageParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/archived-messages/${params.id}/resend`,
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
   * Re-send the specified archived message. A copy of the specified archived message will be created as a pending message with a positive retry count. The new pending message will be attempted to be sent by a "SendTransactedMsg" job, if one is running.
   * @param params The `ArchivedMessagesService.ResendArchivedMessageParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the archived message.
   *
   * - `body`: Request body.
   */
  resendArchivedMessage(params: ArchivedMessagesService.ResendArchivedMessageParams): __Observable<null> {
    return this.resendArchivedMessageResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get an archived message by ID.
   * @param id The unique numeric ID for identifying the archived message.
   * @return The requested completed successfully.
   */
  getArchivedMessageByIdResponse(id: string): __Observable<__StrictHttpResponse<{id?: string, content?: string, transportId?: number, storeId?: number, connectionSpecifications?: {[key: string]: string}, interactionSpecifications?: {[key: string]: string}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/archived-messages/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: string, content?: string, transportId?: number, storeId?: number, connectionSpecifications?: {[key: string]: string}, interactionSpecifications?: {[key: string]: string}}>;
      })
    );
  }

  /**
   * Get an archived message by ID.
   * @param id The unique numeric ID for identifying the archived message.
   * @return The requested completed successfully.
   */
  getArchivedMessageById(id: string): __Observable<{id?: string, content?: string, transportId?: number, storeId?: number, connectionSpecifications?: {[key: string]: string}, interactionSpecifications?: {[key: string]: string}}> {
    return this.getArchivedMessageByIdResponse(id).pipe(
      __map(_r => _r.body as {id?: string, content?: string, transportId?: number, storeId?: number, connectionSpecifications?: {[key: string]: string}, interactionSpecifications?: {[key: string]: string}})
    );
  }

  /**
   * Delete an archived message.
   * @param id The unique numeric ID for identifying the archived message.
   */
  deleteArchivedMessageResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/archived-messages/${id}`,
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
   * Delete an archived message.
   * @param id The unique numeric ID for identifying the archived message.
   */
  deleteArchivedMessage(id: string): __Observable<null> {
    return this.deleteArchivedMessageResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ArchivedMessagesService {

  /**
   * Parameters for getArchivedMessages
   */
  export interface GetArchivedMessagesParams {

    /**
     * The store ID for the store from which the archived messages originated.
     */
    storeId?: number;

    /**
     * The unique numeric ID for identifying the transport.
     */
    transportId?: number;

    /**
     * Limits search results to only include the message with an id that matches the value of this parameter.
     */
    searchString?: string;

    /**
     * The maximum number of results to be returned.
     */
    limit?: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name,-id will order the items first based on the name value in ascending order, and then by their ID value in descending order.
     */
    sort?: string;
  }

  /**
   * Parameters for resendArchivedMessage
   */
  export interface ResendArchivedMessageParams {

    /**
     * The unique numeric ID for identifying the archived message.
     */
    id: string;

    /**
     * Request body.
     */
    body?: {connectionSpecifications?: {[key: string]: string}, interactionSpecifications?: {[key: string]: string}};
  }
}

export { ArchivedMessagesService }
