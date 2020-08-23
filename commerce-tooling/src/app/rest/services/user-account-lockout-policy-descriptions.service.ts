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
class UserAccountLockoutPolicyDescriptionsService extends __BaseService {
  static readonly getUserAccountLockoutPolicyDescriptionsPath = '/rest/admin/v2/user-account-lockout-policy-descriptions';
  static readonly createUserAccountLockoutPolicyDescriptionPath = '/rest/admin/v2/user-account-lockout-policy-descriptions';
  static readonly getUserAccountLockoutPolicyDescriptionByIdPath = '/rest/admin/v2/user-account-lockout-policy-descriptions/userAccountLockoutPolicyId:{userAccountLockoutPolicyId},languageId:{languageId}';
  static readonly deleteUserAccountLockoutPolicyDescriptionByIdPath = '/rest/admin/v2/user-account-lockout-policy-descriptions/userAccountLockoutPolicyId:{userAccountLockoutPolicyId},languageId:{languageId}';
  static readonly updateUserAccountLockoutPolicyDescriptionByIdPath = '/rest/admin/v2/user-account-lockout-policy-descriptions/userAccountLockoutPolicyId:{userAccountLockoutPolicyId},languageId:{languageId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of user account lockout policy descriptions.
   * @param params The `UserAccountLockoutPolicyDescriptionsService.GetUserAccountLockoutPolicyDescriptionsParams` containing the following parameters:
   *
   * - `userAccountLockoutPolicyId`: The unique numeric ID for identifying the user account lockout policy.
   *
   * - `description`: The description of the user account lockout policy.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
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
   * @return A collection of user account lockout policy descriptions.
   */
  getUserAccountLockoutPolicyDescriptionsResponse(params: UserAccountLockoutPolicyDescriptionsService.GetUserAccountLockoutPolicyDescriptionsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{userAccountLockoutPolicyId?: string, description?: string, languageId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.userAccountLockoutPolicyId != null) __params = __params.set('userAccountLockoutPolicyId', params.userAccountLockoutPolicyId.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.languageId != null) __params = __params.set('languageId', params.languageId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/user-account-lockout-policy-descriptions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{userAccountLockoutPolicyId?: string, description?: string, languageId?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of user account lockout policy descriptions.
   * @param params The `UserAccountLockoutPolicyDescriptionsService.GetUserAccountLockoutPolicyDescriptionsParams` containing the following parameters:
   *
   * - `userAccountLockoutPolicyId`: The unique numeric ID for identifying the user account lockout policy.
   *
   * - `description`: The description of the user account lockout policy.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
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
   * @return A collection of user account lockout policy descriptions.
   */
  getUserAccountLockoutPolicyDescriptions(params: UserAccountLockoutPolicyDescriptionsService.GetUserAccountLockoutPolicyDescriptionsParams): __Observable<{count?: number, items?: Array<{userAccountLockoutPolicyId?: string, description?: string, languageId?: number}>}> {
    return this.getUserAccountLockoutPolicyDescriptionsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{userAccountLockoutPolicyId?: string, description?: string, languageId?: number}>})
    );
  }

  /**
   * Create a description for a user account lockout policy.
   * @param UserAccountLockoutPolicyDescription The description of a user account lockout policy.
   */
  createUserAccountLockoutPolicyDescriptionResponse(UserAccountLockoutPolicyDescription: {userAccountLockoutPolicyId?: string, description?: string, languageId?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = UserAccountLockoutPolicyDescription;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/user-account-lockout-policy-descriptions`,
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
   * Create a description for a user account lockout policy.
   * @param UserAccountLockoutPolicyDescription The description of a user account lockout policy.
   */
  createUserAccountLockoutPolicyDescription(UserAccountLockoutPolicyDescription: {userAccountLockoutPolicyId?: string, description?: string, languageId?: number}): __Observable<null> {
    return this.createUserAccountLockoutPolicyDescriptionResponse(UserAccountLockoutPolicyDescription).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a description for a user account lockout policy.
   * @param params The `UserAccountLockoutPolicyDescriptionsService.GetUserAccountLockoutPolicyDescriptionByIdParams` containing the following parameters:
   *
   * - `userAccountLockoutPolicyId`: The unique numeric ID for identifying the user account lockout policy.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The description of a user account lockout policy.
   */
  getUserAccountLockoutPolicyDescriptionByIdResponse(params: UserAccountLockoutPolicyDescriptionsService.GetUserAccountLockoutPolicyDescriptionByIdParams): __Observable<__StrictHttpResponse<{userAccountLockoutPolicyId?: string, description?: string, languageId?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/user-account-lockout-policy-descriptions/userAccountLockoutPolicyId:${params.userAccountLockoutPolicyId},languageId:${params.languageId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{userAccountLockoutPolicyId?: string, description?: string, languageId?: number}>;
      })
    );
  }

  /**
   * Get a description for a user account lockout policy.
   * @param params The `UserAccountLockoutPolicyDescriptionsService.GetUserAccountLockoutPolicyDescriptionByIdParams` containing the following parameters:
   *
   * - `userAccountLockoutPolicyId`: The unique numeric ID for identifying the user account lockout policy.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The description of a user account lockout policy.
   */
  getUserAccountLockoutPolicyDescriptionById(params: UserAccountLockoutPolicyDescriptionsService.GetUserAccountLockoutPolicyDescriptionByIdParams): __Observable<{userAccountLockoutPolicyId?: string, description?: string, languageId?: number}> {
    return this.getUserAccountLockoutPolicyDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as {userAccountLockoutPolicyId?: string, description?: string, languageId?: number})
    );
  }

  /**
   * Delete a description for a user account lockout policy.
   * @param params The `UserAccountLockoutPolicyDescriptionsService.DeleteUserAccountLockoutPolicyDescriptionByIdParams` containing the following parameters:
   *
   * - `userAccountLockoutPolicyId`: The unique numeric ID for identifying the user account lockout policy.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   */
  deleteUserAccountLockoutPolicyDescriptionByIdResponse(params: UserAccountLockoutPolicyDescriptionsService.DeleteUserAccountLockoutPolicyDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/user-account-lockout-policy-descriptions/userAccountLockoutPolicyId:${params.userAccountLockoutPolicyId},languageId:${params.languageId}`,
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
   * Delete a description for a user account lockout policy.
   * @param params The `UserAccountLockoutPolicyDescriptionsService.DeleteUserAccountLockoutPolicyDescriptionByIdParams` containing the following parameters:
   *
   * - `userAccountLockoutPolicyId`: The unique numeric ID for identifying the user account lockout policy.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   */
  deleteUserAccountLockoutPolicyDescriptionById(params: UserAccountLockoutPolicyDescriptionsService.DeleteUserAccountLockoutPolicyDescriptionByIdParams): __Observable<null> {
    return this.deleteUserAccountLockoutPolicyDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a description for a user account lockout policy.
   * @param params The `UserAccountLockoutPolicyDescriptionsService.UpdateUserAccountLockoutPolicyDescriptionByIdParams` containing the following parameters:
   *
   * - `UserAccountLockoutPolicyDescription`: The description of a user account lockout policy.
   *
   * - `userAccountLockoutPolicyId`: The unique numeric ID for identifying the user account lockout policy.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   */
  updateUserAccountLockoutPolicyDescriptionByIdResponse(params: UserAccountLockoutPolicyDescriptionsService.UpdateUserAccountLockoutPolicyDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.UserAccountLockoutPolicyDescription;


    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/user-account-lockout-policy-descriptions/userAccountLockoutPolicyId:${params.userAccountLockoutPolicyId},languageId:${params.languageId}`,
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
   * Update a description for a user account lockout policy.
   * @param params The `UserAccountLockoutPolicyDescriptionsService.UpdateUserAccountLockoutPolicyDescriptionByIdParams` containing the following parameters:
   *
   * - `UserAccountLockoutPolicyDescription`: The description of a user account lockout policy.
   *
   * - `userAccountLockoutPolicyId`: The unique numeric ID for identifying the user account lockout policy.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   */
  updateUserAccountLockoutPolicyDescriptionById(params: UserAccountLockoutPolicyDescriptionsService.UpdateUserAccountLockoutPolicyDescriptionByIdParams): __Observable<null> {
    return this.updateUserAccountLockoutPolicyDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module UserAccountLockoutPolicyDescriptionsService {

  /**
   * Parameters for getUserAccountLockoutPolicyDescriptions
   */
  export interface GetUserAccountLockoutPolicyDescriptionsParams {

    /**
     * The unique numeric ID for identifying the user account lockout policy.
     */
    userAccountLockoutPolicyId?: string;

    /**
     * The description of the user account lockout policy.
     */
    description?: string;

    /**
     * The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
     */
    languageId?: number;

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
   * Parameters for getUserAccountLockoutPolicyDescriptionById
   */
  export interface GetUserAccountLockoutPolicyDescriptionByIdParams {

    /**
     * The unique numeric ID for identifying the user account lockout policy.
     */
    userAccountLockoutPolicyId: string;

    /**
     * The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
     */
    languageId: number;

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
   * Parameters for deleteUserAccountLockoutPolicyDescriptionById
   */
  export interface DeleteUserAccountLockoutPolicyDescriptionByIdParams {

    /**
     * The unique numeric ID for identifying the user account lockout policy.
     */
    userAccountLockoutPolicyId: string;

    /**
     * The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
     */
    languageId: number;
  }

  /**
   * Parameters for updateUserAccountLockoutPolicyDescriptionById
   */
  export interface UpdateUserAccountLockoutPolicyDescriptionByIdParams {

    /**
     * The description of a user account lockout policy.
     */
    UserAccountLockoutPolicyDescription: {userAccountLockoutPolicyId?: string, description?: string, languageId?: number};

    /**
     * The unique numeric ID for identifying the user account lockout policy.
     */
    userAccountLockoutPolicyId: string;

    /**
     * The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
     */
    languageId: number;
  }
}

export { UserAccountLockoutPolicyDescriptionsService }
