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
class ApprovalTypesService extends __BaseService {
  static readonly getApprovalTypesPath = '/rest/admin/v2/approval-types';
  static readonly getApprovalTypeByIdPath = '/rest/admin/v2/approval-types/{id}';
  static readonly getApprovalTypeAssignmentsPath = '/rest/admin/v2/approval-type-assignments';
  static readonly createApprovalTypeAssignmentPath = '/rest/admin/v2/approval-type-assignments';
  static readonly getApprovalTypeAssignmentsByIdPath = '/rest/admin/v2/approval-type-assignments/organizationId:{organizationId},approvalTypeId:{approvalTypeId}';
  static readonly deleteApprovalTypeAssignmentPath = '/rest/admin/v2/approval-type-assignments/organizationId:{organizationId},approvalTypeId:{approvalTypeId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of approval types.
   * @param params The `ApprovalTypesService.GetApprovalTypesParams` containing the following parameters:
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name,-description will order the items first based on the name value in ascending order, and then by their description value in descending order.
   *
   * - `searchString`: Limits search results to only include approval types with a description that matches the value of this parameter.
   *
   * @return The request completed successfully.
   */
  getApprovalTypesResponse(params: ApprovalTypesService.GetApprovalTypesParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/approval-types`,
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
   * Get a collection of approval types.
   * @param params The `ApprovalTypesService.GetApprovalTypesParams` containing the following parameters:
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name,-description will order the items first based on the name value in ascending order, and then by their description value in descending order.
   *
   * - `searchString`: Limits search results to only include approval types with a description that matches the value of this parameter.
   *
   * @return The request completed successfully.
   */
  getApprovalTypes(params: ApprovalTypesService.GetApprovalTypesParams): __Observable<any> {
    return this.getApprovalTypesResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Get an approval type by ID.
   * @param id The unique numeric ID for identifying the approval type.
   * @return The requested completed successfully.
   */
  getApprovalTypeByIdResponse(id: string): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/approval-types/${id}`,
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
   * Get an approval type by ID.
   * @param id The unique numeric ID for identifying the approval type.
   * @return The requested completed successfully.
   */
  getApprovalTypeById(id: string): __Observable<any> {
    return this.getApprovalTypeByIdResponse(id).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Gets a collection of approval type assignments.
   * @param params The `ApprovalTypesService.GetApprovalTypeAssignmentsParams` containing the following parameters:
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `organizationId`: Limits results to only include approval type assignments with the specified organization ID
   *
   * - `approvalTypeId`: Limits results to only include approval type assignments with the specified approval type ID.
   *
   * @return The requested completed successfully.
   */
  getApprovalTypeAssignmentsResponse(params: ApprovalTypesService.GetApprovalTypeAssignmentsParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.organizationId != null) __params = __params.set('organizationId', params.organizationId.toString());
    if (params.approvalTypeId != null) __params = __params.set('approvalTypeId', params.approvalTypeId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/approval-type-assignments`,
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
   * Gets a collection of approval type assignments.
   * @param params The `ApprovalTypesService.GetApprovalTypeAssignmentsParams` containing the following parameters:
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `organizationId`: Limits results to only include approval type assignments with the specified organization ID
   *
   * - `approvalTypeId`: Limits results to only include approval type assignments with the specified approval type ID.
   *
   * @return The requested completed successfully.
   */
  getApprovalTypeAssignments(params: ApprovalTypesService.GetApprovalTypeAssignmentsParams): __Observable<any> {
    return this.getApprovalTypeAssignmentsResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Create an approval type assignment.
   * @param body Request body.
   */
  createApprovalTypeAssignmentResponse(body: any): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/approval-type-assignments`,
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
   * Create an approval type assignment.
   * @param body Request body.
   */
  createApprovalTypeAssignment(body: any): __Observable<null> {
    return this.createApprovalTypeAssignmentResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get an approval type assignment by ID.
   * @param params The `ApprovalTypesService.GetApprovalTypeAssignmentsByIdParams` containing the following parameters:
   *
   * - `organizationId`: The unique numeric ID of the organization to which the approval type is assigned.
   *
   * - `approvalTypeId`: The unique numeric ID of the approval type that is assigned to the organization.
   *
   * @return The requested completed successfully.
   */
  getApprovalTypeAssignmentsByIdResponse(params: ApprovalTypesService.GetApprovalTypeAssignmentsByIdParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/approval-type-assignments/organizationId:${params.organizationId},approvalTypeId:${params.approvalTypeId}`,
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
   * Get an approval type assignment by ID.
   * @param params The `ApprovalTypesService.GetApprovalTypeAssignmentsByIdParams` containing the following parameters:
   *
   * - `organizationId`: The unique numeric ID of the organization to which the approval type is assigned.
   *
   * - `approvalTypeId`: The unique numeric ID of the approval type that is assigned to the organization.
   *
   * @return The requested completed successfully.
   */
  getApprovalTypeAssignmentsById(params: ApprovalTypesService.GetApprovalTypeAssignmentsByIdParams): __Observable<any> {
    return this.getApprovalTypeAssignmentsByIdResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Delete an approval type assignment.
   * @param params The `ApprovalTypesService.DeleteApprovalTypeAssignmentParams` containing the following parameters:
   *
   * - `organizationId`: The unique numeric ID of the organization to which the approval type is assigned.
   *
   * - `approvalTypeId`: The unique numeric ID of the approval type that is assigned to the organization.
   */
  deleteApprovalTypeAssignmentResponse(params: ApprovalTypesService.DeleteApprovalTypeAssignmentParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/approval-type-assignments/organizationId:${params.organizationId},approvalTypeId:${params.approvalTypeId}`,
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
   * Delete an approval type assignment.
   * @param params The `ApprovalTypesService.DeleteApprovalTypeAssignmentParams` containing the following parameters:
   *
   * - `organizationId`: The unique numeric ID of the organization to which the approval type is assigned.
   *
   * - `approvalTypeId`: The unique numeric ID of the approval type that is assigned to the organization.
   */
  deleteApprovalTypeAssignment(params: ApprovalTypesService.DeleteApprovalTypeAssignmentParams): __Observable<null> {
    return this.deleteApprovalTypeAssignmentResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ApprovalTypesService {

  /**
   * Parameters for getApprovalTypes
   */
  export interface GetApprovalTypesParams {

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;

    /**
     * The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name,-description will order the items first based on the name value in ascending order, and then by their description value in descending order.
     */
    sort?: string;

    /**
     * Limits search results to only include approval types with a description that matches the value of this parameter.
     */
    searchString?: string;
  }

  /**
   * Parameters for getApprovalTypeAssignments
   */
  export interface GetApprovalTypeAssignmentsParams {

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;

    /**
     * Limits results to only include approval type assignments with the specified organization ID
     */
    organizationId?: string;

    /**
     * Limits results to only include approval type assignments with the specified approval type ID.
     */
    approvalTypeId?: string;
  }

  /**
   * Parameters for getApprovalTypeAssignmentsById
   */
  export interface GetApprovalTypeAssignmentsByIdParams {

    /**
     * The unique numeric ID of the organization to which the approval type is assigned.
     */
    organizationId: string;

    /**
     * The unique numeric ID of the approval type that is assigned to the organization.
     */
    approvalTypeId: string;
  }

  /**
   * Parameters for deleteApprovalTypeAssignment
   */
  export interface DeleteApprovalTypeAssignmentParams {

    /**
     * The unique numeric ID of the organization to which the approval type is assigned.
     */
    organizationId: string;

    /**
     * The unique numeric ID of the approval type that is assigned to the organization.
     */
    approvalTypeId: string;
  }
}

export { ApprovalTypesService }
