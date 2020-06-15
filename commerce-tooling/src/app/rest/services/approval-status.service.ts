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
class ApprovalStatusService extends __BaseService {
  static readonly getApprovalStatusesPath = '/rest/admin/v2/approval-statuses';
  static readonly findByApprovalStatusIdPath = '/rest/admin/v2/approval-statuses/{id}';
  static readonly updateApprovalStatusPath = '/rest/admin/v2/approval-statuses/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `ApprovalStatusService.GetApprovalStatusesParams` containing the following parameters:
   *
   * - `flowTypeId`: Query by flow type identifier which must be one of the values listed below.
   *    * 10001 - RFQ response
   *    * 10002 - Order approval
   *    * 10003 - Contract approval
   *    * 10004 - Buyer approval
   *    * 10005 - Seller org approval
   *    * 10006 - Seller approval
   *
   * - `submitterFirstName`: Query by approval request submitter's first name.
   *
   * - `submitterMiddleName`: Query by approval request submitter's middle name.
   *
   * - `submitterLastName`: Query by approval request submitter's last name.
   *
   * - `startSubmitDate`: Query by approval request start time formatted as standard ISO date.
   *
   * - `endSubmitDate`: Query by approval request end time formatted as standard ISO date.
   *
   * - `status`: Query by approval request status.
   *
   * - `entityId`: Query by approval request entity ID, such as order ID.
   *
   * - `approverId`: Query by approver ID. Only returns approval requests that can be approved by the current user.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name,-id will order the items first based on the name value in ascending order, and then by their ID value in descending order.
   *
   * - `searchString`: Limits search results to only include users whose first name, last name or logon ID matches the value of this parameter.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getApprovalStatusesResponse(params: ApprovalStatusService.GetApprovalStatusesParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.flowTypeId != null) __params = __params.set('flowTypeId', params.flowTypeId.toString());
    if (params.submitterFirstName != null) __params = __params.set('submitterFirstName', params.submitterFirstName.toString());
    if (params.submitterMiddleName != null) __params = __params.set('submitterMiddleName', params.submitterMiddleName.toString());
    if (params.submitterLastName != null) __params = __params.set('submitterLastName', params.submitterLastName.toString());
    if (params.startSubmitDate != null) __params = __params.set('startSubmitDate', params.startSubmitDate.toString());
    if (params.endSubmitDate != null) __params = __params.set('endSubmitDate', params.endSubmitDate.toString());
    if (params.status != null) __params = __params.set('status', params.status.toString());
    if (params.entityId != null) __params = __params.set('entityId', params.entityId.toString());
    if (params.approverId != null) __params = __params.set('approverId', params.approverId.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/approval-statuses`,
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
   * @param params The `ApprovalStatusService.GetApprovalStatusesParams` containing the following parameters:
   *
   * - `flowTypeId`: Query by flow type identifier which must be one of the values listed below.
   *    * 10001 - RFQ response
   *    * 10002 - Order approval
   *    * 10003 - Contract approval
   *    * 10004 - Buyer approval
   *    * 10005 - Seller org approval
   *    * 10006 - Seller approval
   *
   * - `submitterFirstName`: Query by approval request submitter's first name.
   *
   * - `submitterMiddleName`: Query by approval request submitter's middle name.
   *
   * - `submitterLastName`: Query by approval request submitter's last name.
   *
   * - `startSubmitDate`: Query by approval request start time formatted as standard ISO date.
   *
   * - `endSubmitDate`: Query by approval request end time formatted as standard ISO date.
   *
   * - `status`: Query by approval request status.
   *
   * - `entityId`: Query by approval request entity ID, such as order ID.
   *
   * - `approverId`: Query by approver ID. Only returns approval requests that can be approved by the current user.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name,-id will order the items first based on the name value in ascending order, and then by their ID value in descending order.
   *
   * - `searchString`: Limits search results to only include users whose first name, last name or logon ID matches the value of this parameter.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getApprovalStatuses(params: ApprovalStatusService.GetApprovalStatusesParams): __Observable<any> {
    return this.getApprovalStatusesResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * @param id The unique numeric ID for identifying the approval status record.
   * @return The requested completed successfully.
   */
  findByApprovalStatusIdResponse(id: string): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/approval-statuses/${id}`,
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
   * @param id The unique numeric ID for identifying the approval status record.
   * @return The requested completed successfully.
   */
  findByApprovalStatusId(id: string): __Observable<any> {
    return this.findByApprovalStatusIdResponse(id).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * @param params The `ApprovalStatusService.UpdateApprovalStatusParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the approval status record.
   *
   * - `body`: The request body for updating an approval status record.
   */
  updateApprovalStatusResponse(params: ApprovalStatusService.UpdateApprovalStatusParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/approval-statuses/${params.id}`,
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
   * @param params The `ApprovalStatusService.UpdateApprovalStatusParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the approval status record.
   *
   * - `body`: The request body for updating an approval status record.
   */
  updateApprovalStatus(params: ApprovalStatusService.UpdateApprovalStatusParams): __Observable<null> {
    return this.updateApprovalStatusResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ApprovalStatusService {

  /**
   * Parameters for getApprovalStatuses
   */
  export interface GetApprovalStatusesParams {

    /**
     * Query by flow type identifier which must be one of the values listed below.
     *  * 10001 - RFQ response
     *  * 10002 - Order approval
     *  * 10003 - Contract approval
     *  * 10004 - Buyer approval
     *  * 10005 - Seller org approval
     *  * 10006 - Seller approval
     */
    flowTypeId?: '10001' | '10002' | '10003' | '10004' | '10005' | '10006';

    /**
     * Query by approval request submitter's first name.
     */
    submitterFirstName?: string;

    /**
     * Query by approval request submitter's middle name.
     */
    submitterMiddleName?: string;

    /**
     * Query by approval request submitter's last name.
     */
    submitterLastName?: string;

    /**
     * Query by approval request start time formatted as standard ISO date.
     */
    startSubmitDate?: string;

    /**
     * Query by approval request end time formatted as standard ISO date.
     */
    endSubmitDate?: string;

    /**
     * Query by approval request status.
     */
    status?: number;

    /**
     * Query by approval request entity ID, such as order ID.
     */
    entityId?: string;

    /**
     * Query by approver ID. Only returns approval requests that can be approved by the current user.
     */
    approverId?: string;

    /**
     * The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name,-id will order the items first based on the name value in ascending order, and then by their ID value in descending order.
     */
    sort?: string;

    /**
     * Limits search results to only include users whose first name, last name or logon ID matches the value of this parameter.
     */
    searchString?: string;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for updateApprovalStatus
   */
  export interface UpdateApprovalStatusParams {

    /**
     * The unique numeric ID for identifying the approval status record.
     */
    id: string;

    /**
     * The request body for updating an approval status record.
     */
    body: any;
  }
}

export { ApprovalStatusService }
