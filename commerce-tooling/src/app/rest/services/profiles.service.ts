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
class ProfilesService extends __BaseService {
  static readonly getProfilesPath = '/rest/admin/v2/profiles';
  static readonly createProfilePath = '/rest/admin/v2/profiles';
  static readonly getProfileByIdPath = '/rest/admin/v2/profiles/{id}';
  static readonly deleteProfileByIdPath = '/rest/admin/v2/profiles/{id}';
  static readonly updateProfileByIdPath = '/rest/admin/v2/profiles/{id}';
  static readonly getTransportsOfProfilePath = '/rest/admin/v2/profiles/{id}/transports';
  static readonly getMessageTypesOfProfilePath = '/rest/admin/v2/profiles/{id}/message-types';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of profiles.
   * @param params The `ProfilesService.GetProfilesParams` containing the following parameters:
   *
   * - `id`: The profile id
   *
   * - `storeId`: The Store ID.
   *
   * - `deviceFormatId`: Indicates what default format to use for this profile element.
   *
   * - `usersView`: Specifying whether USER view preferences are available and should be accessed for this profile.
   *
   * - `lowPriority`: The lowest priority for which this profile entry is valid (default is 0).
   *
   * - `highPriority`: The highest priority for which this profile entry is valid (default is 0).
   *
   * - `archive`: If set to 1, messages of this message type will be archived after being successfully sent.
   *
   * - `transportId`: The transport.
   *
   * - `messageTypeId`: The message type
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
   * @return A collection of profiles.
   */
  getProfilesResponse(params: ProfilesService.GetProfilesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, storeId?: number, deviceFormatId?: number, usersView?: string, lowPriority?: number, highPriority?: number, archive?: number, transportId?: number, messageTypeId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.deviceFormatId != null) __params = __params.set('deviceFormatId', params.deviceFormatId.toString());
    if (params.usersView != null) __params = __params.set('usersView', params.usersView.toString());
    if (params.lowPriority != null) __params = __params.set('lowPriority', params.lowPriority.toString());
    if (params.highPriority != null) __params = __params.set('highPriority', params.highPriority.toString());
    if (params.archive != null) __params = __params.set('archive', params.archive.toString());
    if (params.transportId != null) __params = __params.set('transportId', params.transportId.toString());
    if (params.messageTypeId != null) __params = __params.set('messageTypeId', params.messageTypeId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/profiles`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, storeId?: number, deviceFormatId?: number, usersView?: string, lowPriority?: number, highPriority?: number, archive?: number, transportId?: number, messageTypeId?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of profiles.
   * @param params The `ProfilesService.GetProfilesParams` containing the following parameters:
   *
   * - `id`: The profile id
   *
   * - `storeId`: The Store ID.
   *
   * - `deviceFormatId`: Indicates what default format to use for this profile element.
   *
   * - `usersView`: Specifying whether USER view preferences are available and should be accessed for this profile.
   *
   * - `lowPriority`: The lowest priority for which this profile entry is valid (default is 0).
   *
   * - `highPriority`: The highest priority for which this profile entry is valid (default is 0).
   *
   * - `archive`: If set to 1, messages of this message type will be archived after being successfully sent.
   *
   * - `transportId`: The transport.
   *
   * - `messageTypeId`: The message type
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
   * @return A collection of profiles.
   */
  getProfiles(params: ProfilesService.GetProfilesParams): __Observable<{count?: number, items?: Array<{id?: number, storeId?: number, deviceFormatId?: number, usersView?: string, lowPriority?: number, highPriority?: number, archive?: number, transportId?: number, messageTypeId?: number}>}> {
    return this.getProfilesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, storeId?: number, deviceFormatId?: number, usersView?: string, lowPriority?: number, highPriority?: number, archive?: number, transportId?: number, messageTypeId?: number}>})
    );
  }

  /**
   * Create a profile.
   * @param Profile A profile.
   */
  createProfileResponse(Profile: {id?: number, storeId?: number, deviceFormatId?: number, usersView?: string, lowPriority?: number, highPriority?: number, archive?: number, transportId?: number, messageTypeId?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Profile;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/profiles`,
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
   * Create a profile.
   * @param Profile A profile.
   */
  createProfile(Profile: {id?: number, storeId?: number, deviceFormatId?: number, usersView?: string, lowPriority?: number, highPriority?: number, archive?: number, transportId?: number, messageTypeId?: number}): __Observable<null> {
    return this.createProfileResponse(Profile).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a profile.
   * @param params The `ProfilesService.GetProfileByIdParams` containing the following parameters:
   *
   * - `id`: The profile id
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A profile.
   */
  getProfileByIdResponse(params: ProfilesService.GetProfileByIdParams): __Observable<__StrictHttpResponse<{id?: number, storeId?: number, deviceFormatId?: number, usersView?: string, lowPriority?: number, highPriority?: number, archive?: number, transportId?: number, messageTypeId?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/profiles/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, storeId?: number, deviceFormatId?: number, usersView?: string, lowPriority?: number, highPriority?: number, archive?: number, transportId?: number, messageTypeId?: number}>;
      })
    );
  }

  /**
   * Get a profile.
   * @param params The `ProfilesService.GetProfileByIdParams` containing the following parameters:
   *
   * - `id`: The profile id
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A profile.
   */
  getProfileById(params: ProfilesService.GetProfileByIdParams): __Observable<{id?: number, storeId?: number, deviceFormatId?: number, usersView?: string, lowPriority?: number, highPriority?: number, archive?: number, transportId?: number, messageTypeId?: number}> {
    return this.getProfileByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, storeId?: number, deviceFormatId?: number, usersView?: string, lowPriority?: number, highPriority?: number, archive?: number, transportId?: number, messageTypeId?: number})
    );
  }

  /**
   * Delete a profile.
   * @param id The profile id
   */
  deleteProfileByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/profiles/${id}`,
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
   * Delete a profile.
   * @param id The profile id
   */
  deleteProfileById(id: number): __Observable<null> {
    return this.deleteProfileByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a profile.
   * @param params The `ProfilesService.UpdateProfileByIdParams` containing the following parameters:
   *
   * - `Profile`: A profile.
   *
   * - `id`: The profile id
   */
  updateProfileByIdResponse(params: ProfilesService.UpdateProfileByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.Profile;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/profiles/${params.id}`,
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
   * Update a profile.
   * @param params The `ProfilesService.UpdateProfileByIdParams` containing the following parameters:
   *
   * - `Profile`: A profile.
   *
   * - `id`: The profile id
   */
  updateProfileById(params: ProfilesService.UpdateProfileByIdParams): __Observable<null> {
    return this.updateProfileByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Finds the transport in a profile.
   * @param params The `ProfilesService.GetTransportsOfProfileParams` containing the following parameters:
   *
   * - `id`: The profile id
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return An store transport.
   */
  getTransportsOfProfileResponse(params: ProfilesService.GetTransportsOfProfileParams): __Observable<__StrictHttpResponse<{id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/profiles/${params.id}/transports`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string}>;
      })
    );
  }

  /**
   * Finds the transport in a profile.
   * @param params The `ProfilesService.GetTransportsOfProfileParams` containing the following parameters:
   *
   * - `id`: The profile id
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return An store transport.
   */
  getTransportsOfProfile(params: ProfilesService.GetTransportsOfProfileParams): __Observable<{id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string}> {
    return this.getTransportsOfProfileResponse(params).pipe(
      __map(_r => _r.body as {id?: number, code?: string, name?: string, description?: string, timeout?: number, implemented?: string, addressable?: string})
    );
  }

  /**
   * Finds the message type in a profile.
   * @param params The `ProfilesService.GetMessageTypesOfProfileParams` containing the following parameters:
   *
   * - `id`: The profile id
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A message type
   */
  getMessageTypesOfProfileResponse(params: ProfilesService.GetMessageTypesOfProfileParams): __Observable<__StrictHttpResponse<{id?: number, direction?: number, name?: string, viewName?: string, description?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/profiles/${params.id}/message-types`,
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
   * Finds the message type in a profile.
   * @param params The `ProfilesService.GetMessageTypesOfProfileParams` containing the following parameters:
   *
   * - `id`: The profile id
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A message type
   */
  getMessageTypesOfProfile(params: ProfilesService.GetMessageTypesOfProfileParams): __Observable<{id?: number, direction?: number, name?: string, viewName?: string, description?: string}> {
    return this.getMessageTypesOfProfileResponse(params).pipe(
      __map(_r => _r.body as {id?: number, direction?: number, name?: string, viewName?: string, description?: string})
    );
  }
}

module ProfilesService {

  /**
   * Parameters for getProfiles
   */
  export interface GetProfilesParams {

    /**
     * The profile id
     */
    id?: number;

    /**
     * The Store ID.
     */
    storeId?: number;

    /**
     * Indicates what default format to use for this profile element.
     */
    deviceFormatId?: number;

    /**
     * Specifying whether USER view preferences are available and should be accessed for this profile.
     */
    usersView?: string;

    /**
     * The lowest priority for which this profile entry is valid (default is 0).
     */
    lowPriority?: number;

    /**
     * The highest priority for which this profile entry is valid (default is 0).
     */
    highPriority?: number;

    /**
     * If set to 1, messages of this message type will be archived after being successfully sent.
     */
    archive?: number;

    /**
     * The transport.
     */
    transportId?: number;

    /**
     * The message type
     */
    messageTypeId?: number;

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
   * Parameters for getProfileById
   */
  export interface GetProfileByIdParams {

    /**
     * The profile id
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
   * Parameters for updateProfileById
   */
  export interface UpdateProfileByIdParams {

    /**
     * A profile.
     */
    Profile: {id?: number, storeId?: number, deviceFormatId?: number, usersView?: string, lowPriority?: number, highPriority?: number, archive?: number, transportId?: number, messageTypeId?: number};

    /**
     * The profile id
     */
    id: number;
  }

  /**
   * Parameters for getTransportsOfProfile
   */
  export interface GetTransportsOfProfileParams {

    /**
     * The profile id
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
   * Parameters for getMessageTypesOfProfile
   */
  export interface GetMessageTypesOfProfileParams {

    /**
     * The profile id
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
}

export { ProfilesService }
