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
class PasswordPolicyDescriptionsService extends __BaseService {
  static readonly getPasswordPolicyDescriptionsPath = '/rest/admin/v2/password-policy-descriptions';
  static readonly createPasswordPolicyDescriptionPath = '/rest/admin/v2/password-policy-descriptions';
  static readonly getPasswordPolicyDescriptionByIdPath = '/rest/admin/v2/password-policy-descriptions/passwordPolicyId:{passwordPolicyId},languageId:{languageId}';
  static readonly deletePasswordPolicyDescriptionByIdPath = '/rest/admin/v2/password-policy-descriptions/passwordPolicyId:{passwordPolicyId},languageId:{languageId}';
  static readonly updatePasswordPolicyDescriptionByIdPath = '/rest/admin/v2/password-policy-descriptions/passwordPolicyId:{passwordPolicyId},languageId:{languageId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of password policy descriptions.
   * @param params The `PasswordPolicyDescriptionsService.GetPasswordPolicyDescriptionsParams` containing the following parameters:
   *
   * - `passwordPolicyId`: The unique numeric ID for identifying the password policy.
   *
   * - `description`: The description of the password policy.
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
   * @return A collection of password policy descriptions.
   */
  getPasswordPolicyDescriptionsResponse(params: PasswordPolicyDescriptionsService.GetPasswordPolicyDescriptionsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{passwordPolicyId?: string, description?: string, languageId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.passwordPolicyId != null) __params = __params.set('passwordPolicyId', params.passwordPolicyId.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.languageId != null) __params = __params.set('languageId', params.languageId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/password-policy-descriptions`,
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
   * Get a collection of password policy descriptions.
   * @param params The `PasswordPolicyDescriptionsService.GetPasswordPolicyDescriptionsParams` containing the following parameters:
   *
   * - `passwordPolicyId`: The unique numeric ID for identifying the password policy.
   *
   * - `description`: The description of the password policy.
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
   * @return A collection of password policy descriptions.
   */
  getPasswordPolicyDescriptions(params: PasswordPolicyDescriptionsService.GetPasswordPolicyDescriptionsParams): __Observable<{count?: number, items?: Array<{passwordPolicyId?: string, description?: string, languageId?: number}>}> {
    return this.getPasswordPolicyDescriptionsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{passwordPolicyId?: string, description?: string, languageId?: number}>})
    );
  }

  /**
   * Create a description for a password policy.
   * @param PasswordPolicyDescription The description of a password policy.
   */
  createPasswordPolicyDescriptionResponse(PasswordPolicyDescription: {passwordPolicyId?: string, description?: string, languageId?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = PasswordPolicyDescription;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/password-policy-descriptions`,
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
   * Create a description for a password policy.
   * @param PasswordPolicyDescription The description of a password policy.
   */
  createPasswordPolicyDescription(PasswordPolicyDescription: {passwordPolicyId?: string, description?: string, languageId?: number}): __Observable<null> {
    return this.createPasswordPolicyDescriptionResponse(PasswordPolicyDescription).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a description for a password policy.
   * @param params The `PasswordPolicyDescriptionsService.GetPasswordPolicyDescriptionByIdParams` containing the following parameters:
   *
   * - `passwordPolicyId`: The unique numeric ID for identifying the password policy.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The description of a password policy.
   */
  getPasswordPolicyDescriptionByIdResponse(params: PasswordPolicyDescriptionsService.GetPasswordPolicyDescriptionByIdParams): __Observable<__StrictHttpResponse<{passwordPolicyId?: string, description?: string, languageId?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/password-policy-descriptions/passwordPolicyId:${params.passwordPolicyId},languageId:${params.languageId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{passwordPolicyId?: string, description?: string, languageId?: number}>;
      })
    );
  }

  /**
   * Get a description for a password policy.
   * @param params The `PasswordPolicyDescriptionsService.GetPasswordPolicyDescriptionByIdParams` containing the following parameters:
   *
   * - `passwordPolicyId`: The unique numeric ID for identifying the password policy.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return The description of a password policy.
   */
  getPasswordPolicyDescriptionById(params: PasswordPolicyDescriptionsService.GetPasswordPolicyDescriptionByIdParams): __Observable<{passwordPolicyId?: string, description?: string, languageId?: number}> {
    return this.getPasswordPolicyDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as {passwordPolicyId?: string, description?: string, languageId?: number})
    );
  }

  /**
   * Delete a description for a password policy.
   * @param params The `PasswordPolicyDescriptionsService.DeletePasswordPolicyDescriptionByIdParams` containing the following parameters:
   *
   * - `passwordPolicyId`: The unique numeric ID for identifying the password policy.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   */
  deletePasswordPolicyDescriptionByIdResponse(params: PasswordPolicyDescriptionsService.DeletePasswordPolicyDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/password-policy-descriptions/passwordPolicyId:${params.passwordPolicyId},languageId:${params.languageId}`,
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
   * Delete a description for a password policy.
   * @param params The `PasswordPolicyDescriptionsService.DeletePasswordPolicyDescriptionByIdParams` containing the following parameters:
   *
   * - `passwordPolicyId`: The unique numeric ID for identifying the password policy.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   */
  deletePasswordPolicyDescriptionById(params: PasswordPolicyDescriptionsService.DeletePasswordPolicyDescriptionByIdParams): __Observable<null> {
    return this.deletePasswordPolicyDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a description for a password policy.
   * @param params The `PasswordPolicyDescriptionsService.UpdatePasswordPolicyDescriptionByIdParams` containing the following parameters:
   *
   * - `PasswordPolicyDescription`: The description of a password policy.
   *
   * - `passwordPolicyId`: The unique numeric ID for identifying the password policy.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   */
  updatePasswordPolicyDescriptionByIdResponse(params: PasswordPolicyDescriptionsService.UpdatePasswordPolicyDescriptionByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.PasswordPolicyDescription;


    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/password-policy-descriptions/passwordPolicyId:${params.passwordPolicyId},languageId:${params.languageId}`,
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
   * Update a description for a password policy.
   * @param params The `PasswordPolicyDescriptionsService.UpdatePasswordPolicyDescriptionByIdParams` containing the following parameters:
   *
   * - `PasswordPolicyDescription`: The description of a password policy.
   *
   * - `passwordPolicyId`: The unique numeric ID for identifying the password policy.
   *
   * - `languageId`: The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
   */
  updatePasswordPolicyDescriptionById(params: PasswordPolicyDescriptionsService.UpdatePasswordPolicyDescriptionByIdParams): __Observable<null> {
    return this.updatePasswordPolicyDescriptionByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module PasswordPolicyDescriptionsService {

  /**
   * Parameters for getPasswordPolicyDescriptions
   */
  export interface GetPasswordPolicyDescriptionsParams {

    /**
     * The unique numeric ID for identifying the password policy.
     */
    passwordPolicyId?: string;

    /**
     * The description of the password policy.
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
   * Parameters for getPasswordPolicyDescriptionById
   */
  export interface GetPasswordPolicyDescriptionByIdParams {

    /**
     * The unique numeric ID for identifying the password policy.
     */
    passwordPolicyId: string;

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
   * Parameters for deletePasswordPolicyDescriptionById
   */
  export interface DeletePasswordPolicyDescriptionByIdParams {

    /**
     * The unique numeric ID for identifying the password policy.
     */
    passwordPolicyId: string;

    /**
     * The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
     */
    languageId: number;
  }

  /**
   * Parameters for updatePasswordPolicyDescriptionById
   */
  export interface UpdatePasswordPolicyDescriptionByIdParams {

    /**
     * The description of a password policy.
     */
    PasswordPolicyDescription: {passwordPolicyId?: string, description?: string, languageId?: number};

    /**
     * The unique numeric ID for identifying the password policy.
     */
    passwordPolicyId: string;

    /**
     * The language of the description. For a list of integer language identifiers, please refer to the Knowledge Center.
     */
    languageId: number;
  }
}

export { PasswordPolicyDescriptionsService }
