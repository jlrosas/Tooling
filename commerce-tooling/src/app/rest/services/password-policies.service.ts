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
class PasswordPoliciesService extends __BaseService {
  static readonly getPasswordPoliciesPath = '/rest/admin/v2/password-policies';
  static readonly createPasswordPolicyPath = '/rest/admin/v2/password-policies';
  static readonly getPasswordPolicyByIdPath = '/rest/admin/v2/password-policies/{id}';
  static readonly deletePasswordPolicyByIdPath = '/rest/admin/v2/password-policies/{id}';
  static readonly updatePasswordPolicyByIdPath = '/rest/admin/v2/password-policies/{id}';
  static readonly getDescriptionsOfPasswordPolicyPath = '/rest/admin/v2/password-policies/{id}/descriptions';
  static readonly getUserAccountPoliciesOfPasswordPolicyPath = '/rest/admin/v2/password-policies/{id}/user-account-policies';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of password policies.
   * @param params The `PasswordPoliciesService.GetPasswordPoliciesParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying a password policy.
   *
   * - `matchUserId`: Specifies whether the user ID and password can match. A value of 0 indicates that they cannot match. A value of 1 indicates that they can match. Default value is 0.
   *
   * - `maximumConsecutiveType`: The maximum number of consecutive character type allowed in a password. Default value is 4.
   *
   * - `maximumInstances`: The maximum number of times a character can occur in a password. Default value is 3.
   *
   * - `maximumLifetime`: The maximum number of days for which a password is valid, from the last time it is updated. Default value is 90.
   *
   * - `minimumAlphabetic`: The minimum number of alphabetic characters that should be in a password. Default value is 1.
   *
   * - `minimumNumeric`: The minimum number of numeric characters that should be in a password. Default value is 1.
   *
   * - `minimumPasswordLength`: The minimum password length in characters. Default value is 8.
   *
   * - `reusePassword`: Specifies whether the user's previous password(s) can be reused. A value of 0 indicates that the previous password cannot be reused. A value of 1 or greater indicates that the previous password can be reused. A negative integer, n, indicates that the last n passwords cannot be reused. For example, if the value is set to -4, it means that the last 4 passwords cannot be reused. Note that a value of -1 or 0 both indicate that the previous password cannot be reused. Default value is -1.
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
   * @return A collection of password policies.
   */
  getPasswordPoliciesResponse(params: PasswordPoliciesService.GetPasswordPoliciesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: string, matchUserId?: number, maximumConsecutiveType?: number, maximumInstances?: number, maximumLifetime?: number, minimumAlphabetic?: number, minimumNumeric?: number, minimumPasswordLength?: number, reusePassword?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.matchUserId != null) __params = __params.set('matchUserId', params.matchUserId.toString());
    if (params.maximumConsecutiveType != null) __params = __params.set('maximumConsecutiveType', params.maximumConsecutiveType.toString());
    if (params.maximumInstances != null) __params = __params.set('maximumInstances', params.maximumInstances.toString());
    if (params.maximumLifetime != null) __params = __params.set('maximumLifetime', params.maximumLifetime.toString());
    if (params.minimumAlphabetic != null) __params = __params.set('minimumAlphabetic', params.minimumAlphabetic.toString());
    if (params.minimumNumeric != null) __params = __params.set('minimumNumeric', params.minimumNumeric.toString());
    if (params.minimumPasswordLength != null) __params = __params.set('minimumPasswordLength', params.minimumPasswordLength.toString());
    if (params.reusePassword != null) __params = __params.set('reusePassword', params.reusePassword.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/password-policies`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: string, matchUserId?: number, maximumConsecutiveType?: number, maximumInstances?: number, maximumLifetime?: number, minimumAlphabetic?: number, minimumNumeric?: number, minimumPasswordLength?: number, reusePassword?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of password policies.
   * @param params The `PasswordPoliciesService.GetPasswordPoliciesParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying a password policy.
   *
   * - `matchUserId`: Specifies whether the user ID and password can match. A value of 0 indicates that they cannot match. A value of 1 indicates that they can match. Default value is 0.
   *
   * - `maximumConsecutiveType`: The maximum number of consecutive character type allowed in a password. Default value is 4.
   *
   * - `maximumInstances`: The maximum number of times a character can occur in a password. Default value is 3.
   *
   * - `maximumLifetime`: The maximum number of days for which a password is valid, from the last time it is updated. Default value is 90.
   *
   * - `minimumAlphabetic`: The minimum number of alphabetic characters that should be in a password. Default value is 1.
   *
   * - `minimumNumeric`: The minimum number of numeric characters that should be in a password. Default value is 1.
   *
   * - `minimumPasswordLength`: The minimum password length in characters. Default value is 8.
   *
   * - `reusePassword`: Specifies whether the user's previous password(s) can be reused. A value of 0 indicates that the previous password cannot be reused. A value of 1 or greater indicates that the previous password can be reused. A negative integer, n, indicates that the last n passwords cannot be reused. For example, if the value is set to -4, it means that the last 4 passwords cannot be reused. Note that a value of -1 or 0 both indicate that the previous password cannot be reused. Default value is -1.
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
   * @return A collection of password policies.
   */
  getPasswordPolicies(params: PasswordPoliciesService.GetPasswordPoliciesParams): __Observable<{count?: number, items?: Array<{id?: string, matchUserId?: number, maximumConsecutiveType?: number, maximumInstances?: number, maximumLifetime?: number, minimumAlphabetic?: number, minimumNumeric?: number, minimumPasswordLength?: number, reusePassword?: number}>}> {
    return this.getPasswordPoliciesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: string, matchUserId?: number, maximumConsecutiveType?: number, maximumInstances?: number, maximumLifetime?: number, minimumAlphabetic?: number, minimumNumeric?: number, minimumPasswordLength?: number, reusePassword?: number}>})
    );
  }

  /**
   * Create a password policy.
   * @param PasswordPolicy The password policy.
   */
  createPasswordPolicyResponse(PasswordPolicy: {id?: string, matchUserId?: number, maximumConsecutiveType?: number, maximumInstances?: number, maximumLifetime?: number, minimumAlphabetic?: number, minimumNumeric?: number, minimumPasswordLength?: number, reusePassword?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = PasswordPolicy;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/password-policies`,
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
   * Create a password policy.
   * @param PasswordPolicy The password policy.
   */
  createPasswordPolicy(PasswordPolicy: {id?: string, matchUserId?: number, maximumConsecutiveType?: number, maximumInstances?: number, maximumLifetime?: number, minimumAlphabetic?: number, minimumNumeric?: number, minimumPasswordLength?: number, reusePassword?: number}): __Observable<null> {
    return this.createPasswordPolicyResponse(PasswordPolicy).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a password policy.
   * @param params The `PasswordPoliciesService.GetPasswordPolicyByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying a password policy.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The password policy.
   */
  getPasswordPolicyByIdResponse(params: PasswordPoliciesService.GetPasswordPolicyByIdParams): __Observable<__StrictHttpResponse<{id?: string, matchUserId?: number, maximumConsecutiveType?: number, maximumInstances?: number, maximumLifetime?: number, minimumAlphabetic?: number, minimumNumeric?: number, minimumPasswordLength?: number, reusePassword?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/password-policies/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: string, matchUserId?: number, maximumConsecutiveType?: number, maximumInstances?: number, maximumLifetime?: number, minimumAlphabetic?: number, minimumNumeric?: number, minimumPasswordLength?: number, reusePassword?: number}>;
      })
    );
  }

  /**
   * Get a password policy.
   * @param params The `PasswordPoliciesService.GetPasswordPolicyByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying a password policy.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The password policy.
   */
  getPasswordPolicyById(params: PasswordPoliciesService.GetPasswordPolicyByIdParams): __Observable<{id?: string, matchUserId?: number, maximumConsecutiveType?: number, maximumInstances?: number, maximumLifetime?: number, minimumAlphabetic?: number, minimumNumeric?: number, minimumPasswordLength?: number, reusePassword?: number}> {
    return this.getPasswordPolicyByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: string, matchUserId?: number, maximumConsecutiveType?: number, maximumInstances?: number, maximumLifetime?: number, minimumAlphabetic?: number, minimumNumeric?: number, minimumPasswordLength?: number, reusePassword?: number})
    );
  }

  /**
   * Delete a password policy.
   * @param id The unique numeric ID for identifying a password policy.
   */
  deletePasswordPolicyByIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/password-policies/${id}`,
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
   * Delete a password policy.
   * @param id The unique numeric ID for identifying a password policy.
   */
  deletePasswordPolicyById(id: string): __Observable<null> {
    return this.deletePasswordPolicyByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a password policy.
   * @param params The `PasswordPoliciesService.UpdatePasswordPolicyByIdParams` containing the following parameters:
   *
   * - `PasswordPolicy`: The password policy.
   *
   * - `id`: The unique numeric ID for identifying a password policy.
   */
  updatePasswordPolicyByIdResponse(params: PasswordPoliciesService.UpdatePasswordPolicyByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.PasswordPolicy;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/password-policies/${params.id}`,
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
   * Update a password policy.
   * @param params The `PasswordPoliciesService.UpdatePasswordPolicyByIdParams` containing the following parameters:
   *
   * - `PasswordPolicy`: The password policy.
   *
   * - `id`: The unique numeric ID for identifying a password policy.
   */
  updatePasswordPolicyById(params: PasswordPoliciesService.UpdatePasswordPolicyByIdParams): __Observable<null> {
    return this.updatePasswordPolicyByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `PasswordPoliciesService.GetDescriptionsOfPasswordPolicyParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying a password policy.
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
   * @return A collection of password policy descriptions.
   */
  getDescriptionsOfPasswordPolicyResponse(params: PasswordPoliciesService.GetDescriptionsOfPasswordPolicyParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{passwordPolicyId?: string, description?: string, languageId?: number}>}>> {
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
      this.rootUrl + `/rest/admin/v2/password-policies/${params.id}/descriptions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{passwordPolicyId?: string, description?: string, languageId?: number}>}>;
      })
    );
  }

  /**
   * @param params The `PasswordPoliciesService.GetDescriptionsOfPasswordPolicyParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying a password policy.
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
   * @return A collection of password policy descriptions.
   */
  getDescriptionsOfPasswordPolicy(params: PasswordPoliciesService.GetDescriptionsOfPasswordPolicyParams): __Observable<{count?: number, items?: Array<{passwordPolicyId?: string, description?: string, languageId?: number}>}> {
    return this.getDescriptionsOfPasswordPolicyResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{passwordPolicyId?: string, description?: string, languageId?: number}>})
    );
  }

  /**
   * @param params The `PasswordPoliciesService.GetUserAccountPoliciesOfPasswordPolicyParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying a password policy.
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
  getUserAccountPoliciesOfPasswordPolicyResponse(params: PasswordPoliciesService.GetUserAccountPoliciesOfPasswordPolicyParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, userAccountLockoutPolicyId?: string, passwordPolicyId?: string}>}>> {
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
      this.rootUrl + `/rest/admin/v2/password-policies/${params.id}/user-account-policies`,
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
   * @param params The `PasswordPoliciesService.GetUserAccountPoliciesOfPasswordPolicyParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying a password policy.
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
  getUserAccountPoliciesOfPasswordPolicy(params: PasswordPoliciesService.GetUserAccountPoliciesOfPasswordPolicyParams): __Observable<{count?: number, items?: Array<{id?: number, userAccountLockoutPolicyId?: string, passwordPolicyId?: string}>}> {
    return this.getUserAccountPoliciesOfPasswordPolicyResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, userAccountLockoutPolicyId?: string, passwordPolicyId?: string}>})
    );
  }
}

module PasswordPoliciesService {

  /**
   * Parameters for getPasswordPolicies
   */
  export interface GetPasswordPoliciesParams {

    /**
     * The unique numeric ID for identifying a password policy.
     */
    id?: string;

    /**
     * Specifies whether the user ID and password can match. A value of 0 indicates that they cannot match. A value of 1 indicates that they can match. Default value is 0.
     */
    matchUserId?: number;

    /**
     * The maximum number of consecutive character type allowed in a password. Default value is 4.
     */
    maximumConsecutiveType?: number;

    /**
     * The maximum number of times a character can occur in a password. Default value is 3.
     */
    maximumInstances?: number;

    /**
     * The maximum number of days for which a password is valid, from the last time it is updated. Default value is 90.
     */
    maximumLifetime?: number;

    /**
     * The minimum number of alphabetic characters that should be in a password. Default value is 1.
     */
    minimumAlphabetic?: number;

    /**
     * The minimum number of numeric characters that should be in a password. Default value is 1.
     */
    minimumNumeric?: number;

    /**
     * The minimum password length in characters. Default value is 8.
     */
    minimumPasswordLength?: number;

    /**
     * Specifies whether the user's previous password(s) can be reused. A value of 0 indicates that the previous password cannot be reused. A value of 1 or greater indicates that the previous password can be reused. A negative integer, n, indicates that the last n passwords cannot be reused. For example, if the value is set to -4, it means that the last 4 passwords cannot be reused. Note that a value of -1 or 0 both indicate that the previous password cannot be reused. Default value is -1.
     */
    reusePassword?: number;

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
   * Parameters for getPasswordPolicyById
   */
  export interface GetPasswordPolicyByIdParams {

    /**
     * The unique numeric ID for identifying a password policy.
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
   * Parameters for updatePasswordPolicyById
   */
  export interface UpdatePasswordPolicyByIdParams {

    /**
     * The password policy.
     */
    PasswordPolicy: {id?: string, matchUserId?: number, maximumConsecutiveType?: number, maximumInstances?: number, maximumLifetime?: number, minimumAlphabetic?: number, minimumNumeric?: number, minimumPasswordLength?: number, reusePassword?: number};

    /**
     * The unique numeric ID for identifying a password policy.
     */
    id: string;
  }

  /**
   * Parameters for getDescriptionsOfPasswordPolicy
   */
  export interface GetDescriptionsOfPasswordPolicyParams {

    /**
     * The unique numeric ID for identifying a password policy.
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
   * Parameters for getUserAccountPoliciesOfPasswordPolicy
   */
  export interface GetUserAccountPoliciesOfPasswordPolicyParams {

    /**
     * The unique numeric ID for identifying a password policy.
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

export { PasswordPoliciesService }
