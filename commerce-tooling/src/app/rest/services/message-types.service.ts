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
class MessageTypesService extends __BaseService {
  static readonly getMessageTypesPath = '/rest/admin/v2/message-types';
  static readonly createMessageTypePath = '/rest/admin/v2/message-types';
  static readonly getMessageTypeByIdPath = '/rest/admin/v2/message-types/{id}';
  static readonly deleteMessageTypeByIdPath = '/rest/admin/v2/message-types/{id}';
  static readonly updateMessageTypeByIdPath = '/rest/admin/v2/message-types/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of message types.
   * @param params The `MessageTypesService.GetMessageTypesParams` containing the following parameters:
   *
   * - `id`: The message type id.
   *
   * - `direction`: The direction of transmission this message is valid for, 1=outgoing, 2=incoming, or 3=send-receive.
   *
   * - `name`: Short name for message type.
   *
   * - `viewName`: Name of view associated with this message type. This view must be registered to be usable in message transmission. This is a mandatory field.
   *
   * - `description`: Description of the message type.
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
   * @return A collection of message types.
   */
  getMessageTypesResponse(params: MessageTypesService.GetMessageTypesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, direction?: number, name?: string, viewName?: string, description?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.direction != null) __params = __params.set('direction', params.direction.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.viewName != null) __params = __params.set('viewName', params.viewName.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/message-types`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, direction?: number, name?: string, viewName?: string, description?: string}>}>;
      })
    );
  }

  /**
   * Get a collection of message types.
   * @param params The `MessageTypesService.GetMessageTypesParams` containing the following parameters:
   *
   * - `id`: The message type id.
   *
   * - `direction`: The direction of transmission this message is valid for, 1=outgoing, 2=incoming, or 3=send-receive.
   *
   * - `name`: Short name for message type.
   *
   * - `viewName`: Name of view associated with this message type. This view must be registered to be usable in message transmission. This is a mandatory field.
   *
   * - `description`: Description of the message type.
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
   * @return A collection of message types.
   */
  getMessageTypes(params: MessageTypesService.GetMessageTypesParams): __Observable<{count?: number, items?: Array<{id?: number, direction?: number, name?: string, viewName?: string, description?: string}>}> {
    return this.getMessageTypesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, direction?: number, name?: string, viewName?: string, description?: string}>})
    );
  }

  /**
   * Create a message type.
   * @param MessageType A message type
   */
  createMessageTypeResponse(MessageType: {id?: number, direction?: number, name?: string, viewName?: string, description?: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = MessageType;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/message-types`,
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
   * Create a message type.
   * @param MessageType A message type
   */
  createMessageType(MessageType: {id?: number, direction?: number, name?: string, viewName?: string, description?: string}): __Observable<null> {
    return this.createMessageTypeResponse(MessageType).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a message type.
   * @param params The `MessageTypesService.GetMessageTypeByIdParams` containing the following parameters:
   *
   * - `id`: The message type id.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A message type
   */
  getMessageTypeByIdResponse(params: MessageTypesService.GetMessageTypeByIdParams): __Observable<__StrictHttpResponse<{id?: number, direction?: number, name?: string, viewName?: string, description?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/message-types/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, direction?: number, name?: string, viewName?: string, description?: string}>;
      })
    );
  }

  /**
   * Get a message type.
   * @param params The `MessageTypesService.GetMessageTypeByIdParams` containing the following parameters:
   *
   * - `id`: The message type id.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A message type
   */
  getMessageTypeById(params: MessageTypesService.GetMessageTypeByIdParams): __Observable<{id?: number, direction?: number, name?: string, viewName?: string, description?: string}> {
    return this.getMessageTypeByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, direction?: number, name?: string, viewName?: string, description?: string})
    );
  }

  /**
   * Delete a message type.
   * @param id The message type id.
   */
  deleteMessageTypeByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/message-types/${id}`,
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
   * Delete a message type.
   * @param id The message type id.
   */
  deleteMessageTypeById(id: number): __Observable<null> {
    return this.deleteMessageTypeByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a message type.
   * @param params The `MessageTypesService.UpdateMessageTypeByIdParams` containing the following parameters:
   *
   * - `MessageType`: A message type
   *
   * - `id`: The message type id.
   */
  updateMessageTypeByIdResponse(params: MessageTypesService.UpdateMessageTypeByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.MessageType;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/message-types/${params.id}`,
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
   * Update a message type.
   * @param params The `MessageTypesService.UpdateMessageTypeByIdParams` containing the following parameters:
   *
   * - `MessageType`: A message type
   *
   * - `id`: The message type id.
   */
  updateMessageTypeById(params: MessageTypesService.UpdateMessageTypeByIdParams): __Observable<null> {
    return this.updateMessageTypeByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module MessageTypesService {

  /**
   * Parameters for getMessageTypes
   */
  export interface GetMessageTypesParams {

    /**
     * The message type id.
     */
    id?: number;

    /**
     * The direction of transmission this message is valid for, 1=outgoing, 2=incoming, or 3=send-receive.
     */
    direction?: number;

    /**
     * Short name for message type.
     */
    name?: string;

    /**
     * Name of view associated with this message type. This view must be registered to be usable in message transmission. This is a mandatory field.
     */
    viewName?: string;

    /**
     * Description of the message type.
     */
    description?: string;

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
   * Parameters for getMessageTypeById
   */
  export interface GetMessageTypeByIdParams {

    /**
     * The message type id.
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
   * Parameters for updateMessageTypeById
   */
  export interface UpdateMessageTypeByIdParams {

    /**
     * A message type
     */
    MessageType: {id?: number, direction?: number, name?: string, viewName?: string, description?: string};

    /**
     * The message type id.
     */
    id: number;
  }
}

export { MessageTypesService }
