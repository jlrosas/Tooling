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
class UserAccountLockoutPoliciesService extends __BaseService {
  static readonly getUserAccountLockoutPoliciesPath = '/rest/admin/v2/user-account-lockout-policies';
  static readonly createUserAccountLockoutPolicyPath = '/rest/admin/v2/user-account-lockout-policies';
  static readonly getUserAccountLockoutPolicyByIdPath = '/rest/admin/v2/user-account-lockout-policies/{id}';
  static readonly deleteUserAccountLockoutPolicyByIdPath = '/rest/admin/v2/user-account-lockout-policies/{id}';
  static readonly updateUserAccountLockoutPolicyByIdPath = '/rest/admin/v2/user-account-lockout-policies/{id}';
  static readonly getDescriptionsOfUserAccountLockoutPolicyPath = '/rest/admin/v2/user-account-lockout-policies/{id}/descriptions';
  static readonly getUserAccountPoliciesOfUserAccountLockoutPolicyPath = '/rest/admin/v2/user-account-lockout-policies/{id}/user-account-policies';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of user account lockout policies.
   * @param params The `UserAccountLockoutPoliciesService.GetUserAccountLockoutPoliciesParams` containing the following parameters:
   *
   * - `id`: The user account lockout policy ID.
   *
   * - `lockoutThreshold`: The number of times a user can consecutively enter an incorrect password before the system locks the users account. The default value is 6.
   *
   * - `waitTime`: The starting value (in seconds) of the time before the user is allowed to re-enter another password.
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
   * @return A collection of user account lockout policies.
   */
  getUserAccountLockoutPoliciesResponse(params: UserAccountLockoutPoliciesService.GetUserAccountLockoutPoliciesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: string, lockoutThreshold?: number, waitTime?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.lockoutThreshold != null) __params = __params.set('lockoutThreshold', params.lockoutThreshold.toString());
    if (params.waitTime != null) __params = __params.set('waitTime', params.waitTime.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/user-account-lockout-policies`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: string, lockoutThreshold?: number, waitTime?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of user account lockout policies.
   * @param params The `UserAccountLockoutPoliciesService.GetUserAccountLockoutPoliciesParams` containing the following parameters:
   *
   * - `id`: The user account lockout policy ID.
   *
   * - `lockoutThreshold`: The number of times a user can consecutively enter an incorrect password before the system locks the users account. The default value is 6.
   *
   * - `waitTime`: The starting value (in seconds) of the time before the user is allowed to re-enter another password.
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
   * @return A collection of user account lockout policies.
   */
  getUserAccountLockoutPolicies(params: UserAccountLockoutPoliciesService.GetUserAccountLockoutPoliciesParams): __Observable<{count?: number, items?: Array<{id?: string, lockoutThreshold?: number, waitTime?: number}>}> {
    return this.getUserAccountLockoutPoliciesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: string, lockoutThreshold?: number, waitTime?: number}>})
    );
  }

  /**
   * Create a user account lockout policy.
   * @param UserAccountLockoutPolicy The user account lockout policy.
   */
  createUserAccountLockoutPolicyResponse(UserAccountLockoutPolicy: {id?: string, lockoutThreshold?: number, waitTime?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = UserAccountLockoutPolicy;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/user-account-lockout-policies`,
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
   * Create a user account lockout policy.
   * @param UserAccountLockoutPolicy The user account lockout policy.
   */
  createUserAccountLockoutPolicy(UserAccountLockoutPolicy: {id?: string, lockoutThreshold?: number, waitTime?: number}): __Observable<null> {
    return this.createUserAccountLockoutPolicyResponse(UserAccountLockoutPolicy).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a user account lockout policy.
   * @param params The `UserAccountLockoutPoliciesService.GetUserAccountLockoutPolicyByIdParams` containing the following parameters:
   *
   * - `id`: The user account lockout policy ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The user account lockout policy.
   */
  getUserAccountLockoutPolicyByIdResponse(params: UserAccountLockoutPoliciesService.GetUserAccountLockoutPolicyByIdParams): __Observable<__StrictHttpResponse<{id?: string, lockoutThreshold?: number, waitTime?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/user-account-lockout-policies/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: string, lockoutThreshold?: number, waitTime?: number}>;
      })
    );
  }

  /**
   * Get a user account lockout policy.
   * @param params The `UserAccountLockoutPoliciesService.GetUserAccountLockoutPolicyByIdParams` containing the following parameters:
   *
   * - `id`: The user account lockout policy ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The user account lockout policy.
   */
  getUserAccountLockoutPolicyById(params: UserAccountLockoutPoliciesService.GetUserAccountLockoutPolicyByIdParams): __Observable<{id?: string, lockoutThreshold?: number, waitTime?: number}> {
    return this.getUserAccountLockoutPolicyByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: string, lockoutThreshold?: number, waitTime?: number})
    );
  }

  /**
   * Delete a user account lockout policy.
   * @param id The user account lockout policy ID.
   */
  deleteUserAccountLockoutPolicyByIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/user-account-lockout-policies/${id}`,
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
   * Delete a user account lockout policy.
   * @param id The user account lockout policy ID.
   */
  deleteUserAccountLockoutPolicyById(id: string): __Observable<null> {
    return this.deleteUserAccountLockoutPolicyByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a user account lockout policy.
   * @param params The `UserAccountLockoutPoliciesService.UpdateUserAccountLockoutPolicyByIdParams` containing the following parameters:
   *
   * - `UserAccountLockoutPolicy`: The user account lockout policy.
   *
   * - `id`: The user account lockout policy ID.
   */
  updateUserAccountLockoutPolicyByIdResponse(params: UserAccountLockoutPoliciesService.UpdateUserAccountLockoutPolicyByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.UserAccountLockoutPolicy;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/user-account-lockout-policies/${params.id}`,
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
   * Update a user account lockout policy.
   * @param params The `UserAccountLockoutPoliciesService.UpdateUserAccountLockoutPolicyByIdParams` containing the following parameters:
   *
   * - `UserAccountLockoutPolicy`: The user account lockout policy.
   *
   * - `id`: The user account lockout policy ID.
   */
  updateUserAccountLockoutPolicyById(params: UserAccountLockoutPoliciesService.UpdateUserAccountLockoutPolicyByIdParams): __Observable<null> {
    return this.updateUserAccountLockoutPolicyByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `UserAccountLockoutPoliciesService.GetDescriptionsOfUserAccountLockoutPolicyParams` containing the following parameters:
   *
   * - `id`: The user account lockout policy ID.
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
  getDescriptionsOfUserAccountLockoutPolicyResponse(params: UserAccountLockoutPoliciesService.GetDescriptionsOfUserAccountLockoutPolicyParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{userAccountLockoutPolicyId?: string, description?: string, languageId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/user-account-lockout-policies/${params.id}/descriptions`,
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
   * @param params The `UserAccountLockoutPoliciesService.GetDescriptionsOfUserAccountLockoutPolicyParams` containing the following parameters:
   *
   * - `id`: The user account lockout policy ID.
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
  getDescriptionsOfUserAccountLockoutPolicy(params: UserAccountLockoutPoliciesService.GetDescriptionsOfUserAccountLockoutPolicyParams): __Observable<{count?: number, items?: Array<{userAccountLockoutPolicyId?: string, description?: string, languageId?: number}>}> {
    return this.getDescriptionsOfUserAccountLockoutPolicyResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{userAccountLockoutPolicyId?: string, description?: string, languageId?: number}>})
    );
  }

  /**
   * @param params The `UserAccountLockoutPoliciesService.GetUserAccountPoliciesOfUserAccountLockoutPolicyParams` containing the following parameters:
   *
   * - `id`: The user account lockout policy ID.
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
   * @return A collection of user account policies records.
   */
  getUserAccountPoliciesOfUserAccountLockoutPolicyResponse(params: UserAccountLockoutPoliciesService.GetUserAccountPoliciesOfUserAccountLockoutPolicyParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, userAccountLockoutPolicyId?: string, passwordPolicyId?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/user-account-lockout-policies/${params.id}/user-account-policies`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, userAccountLockoutPolicyId?: string, passwordPolicyId?: string}>}>;
      })
    );
  }

  /**
   * @param params The `UserAccountLockoutPoliciesService.GetUserAccountPoliciesOfUserAccountLockoutPolicyParams` containing the following parameters:
   *
   * - `id`: The user account lockout policy ID.
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
   * @return A collection of user account policies records.
   */
  getUserAccountPoliciesOfUserAccountLockoutPolicy(params: UserAccountLockoutPoliciesService.GetUserAccountPoliciesOfUserAccountLockoutPolicyParams): __Observable<{count?: number, items?: Array<{id?: number, userAccountLockoutPolicyId?: string, passwordPolicyId?: string}>}> {
    return this.getUserAccountPoliciesOfUserAccountLockoutPolicyResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, userAccountLockoutPolicyId?: string, passwordPolicyId?: string}>})
    );
  }
}

module UserAccountLockoutPoliciesService {

  /**
   * Parameters for getUserAccountLockoutPolicies
   */
  export interface GetUserAccountLockoutPoliciesParams {

    /**
     * The user account lockout policy ID.
     */
    id?: string;

    /**
     * The number of times a user can consecutively enter an incorrect password before the system locks the users account. The default value is 6.
     */
    lockoutThreshold?: number;

    /**
     * The starting value (in seconds) of the time before the user is allowed to re-enter another password.
     */
    waitTime?: number;

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
   * Parameters for getUserAccountLockoutPolicyById
   */
  export interface GetUserAccountLockoutPolicyByIdParams {

    /**
     * The user account lockout policy ID.
     */
    id: string;

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
   * Parameters for updateUserAccountLockoutPolicyById
   */
  export interface UpdateUserAccountLockoutPolicyByIdParams {

    /**
     * The user account lockout policy.
     */
    UserAccountLockoutPolicy: {id?: string, lockoutThreshold?: number, waitTime?: number};

    /**
     * The user account lockout policy ID.
     */
    id: string;
  }

  /**
   * Parameters for getDescriptionsOfUserAccountLockoutPolicy
   */
  export interface GetDescriptionsOfUserAccountLockoutPolicyParams {

    /**
     * The user account lockout policy ID.
     */
    id: string;

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
   * Parameters for getUserAccountPoliciesOfUserAccountLockoutPolicy
   */
  export interface GetUserAccountPoliciesOfUserAccountLockoutPolicyParams {

    /**
     * The user account lockout policy ID.
     */
    id: string;

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
}

export { UserAccountLockoutPoliciesService }
