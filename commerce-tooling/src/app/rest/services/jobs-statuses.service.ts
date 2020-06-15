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
class JobsStatusesService extends __BaseService {
  static readonly getScheduledJobStatusesPath = '/rest/admin/v2/job-statuses';
  static readonly JobStatusesDeletePath = '/rest/admin/v2/job-statuses';
  static readonly JobStatusesByJobIdDeletePath = '/rest/admin/v2/job-statuses/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of scheduled job statuses.
   * @param params The `JobsStatusesService.GetScheduledJobStatusesParams` containing the following parameters:
   *
   * - `Content-Type`: This is the content type to be placed in the header
   *
   * - `criteriaStart`: The start date of the date range for the scheduled job status to return.  The value is the actual start date the job was run on the server's time zone.  The date format is yyyy-MM-dd'T'HH:mm:ss, ie. 2020-04-20T04:00:00.
   *
   * - `criteriaEnd`: The end date of the date range for the scheduled job status to return.  The value is the actual end date the job was run on the server's time zone.  The date format is yyyy-MM-dd'T'HH:mm:ss, ie. 2020-04-20T04:00:00.
   *
   * - `maxItems`: The maxiumum number of items to fetch from the database.  Default is 15000.
   *
   * - `storeId`: The unique numeric ID of the store that the jobs are running for.  If site, store ID must be 0.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
   *
   * - `searchString`: Limits search results to only include scheduled job status with a command name that matches the value of this parameter. Searches are case-insensitive.
   *
   * - `state`: Limits search results to only include scheduled job status with a state that matches the value of this parameter. Searches are case-sensitive.
   *
   * - `status`: Limits search results to only include scheduled job status with a status that matches the value of this parameter. Searches are case-sensitive.
   *
   * - `applicationType`: Limits search results to only include scheduled job status with an application type that matches the value of this parameter. Searches are case-sensitive.
   *
   * @return The request completed successfully.
   */
  getScheduledJobStatusesResponse(params: JobsStatusesService.GetScheduledJobStatusesParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ContentType != null) __headers = __headers.set('Content-Type', params.ContentType.toString());
    if (params.criteriaStart != null) __params = __params.set('criteriaStart', params.criteriaStart.toString());
    if (params.criteriaEnd != null) __params = __params.set('criteriaEnd', params.criteriaEnd.toString());
    if (params.maxItems != null) __params = __params.set('maxItems', params.maxItems.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    if (params.state != null) __params = __params.set('state', params.state.toString());
    if (params.status != null) __params = __params.set('status', params.status.toString());
    if (params.applicationType != null) __params = __params.set('applicationType', params.applicationType.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/job-statuses`,
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
   * Get a collection of scheduled job statuses.
   * @param params The `JobsStatusesService.GetScheduledJobStatusesParams` containing the following parameters:
   *
   * - `Content-Type`: This is the content type to be placed in the header
   *
   * - `criteriaStart`: The start date of the date range for the scheduled job status to return.  The value is the actual start date the job was run on the server's time zone.  The date format is yyyy-MM-dd'T'HH:mm:ss, ie. 2020-04-20T04:00:00.
   *
   * - `criteriaEnd`: The end date of the date range for the scheduled job status to return.  The value is the actual end date the job was run on the server's time zone.  The date format is yyyy-MM-dd'T'HH:mm:ss, ie. 2020-04-20T04:00:00.
   *
   * - `maxItems`: The maxiumum number of items to fetch from the database.  Default is 15000.
   *
   * - `storeId`: The unique numeric ID of the store that the jobs are running for.  If site, store ID must be 0.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
   *
   * - `searchString`: Limits search results to only include scheduled job status with a command name that matches the value of this parameter. Searches are case-insensitive.
   *
   * - `state`: Limits search results to only include scheduled job status with a state that matches the value of this parameter. Searches are case-sensitive.
   *
   * - `status`: Limits search results to only include scheduled job status with a status that matches the value of this parameter. Searches are case-sensitive.
   *
   * - `applicationType`: Limits search results to only include scheduled job status with an application type that matches the value of this parameter. Searches are case-sensitive.
   *
   * @return The request completed successfully.
   */
  getScheduledJobStatuses(params: JobsStatusesService.GetScheduledJobStatusesParams): __Observable<any> {
    return this.getScheduledJobStatusesResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Delete previous scheduler job status that has completed successfully, or failed.
   * @param params The `JobsStatusesService.JobStatusesDeleteParams` containing the following parameters:
   *
   * - `Content-Type`: This is the content type to be placed in the header
   *
   * - `endTime`: The end time of when the jobs were run, to remove status for.  The value is the end date that the job status should be removed for.  The date format is yyyy-MM-dd'T'HH:mm:ss, ie. 2020-04-20T04:00:00.
   *
   * - `storeId`: The unique numeric ID of the store that the jobs are running for.  If site, store ID must be 0.
   */
  JobStatusesDeleteResponse(params: JobsStatusesService.JobStatusesDeleteParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ContentType != null) __headers = __headers.set('Content-Type', params.ContentType.toString());
    if (params.endTime != null) __params = __params.set('endTime', params.endTime.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/job-statuses`,
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
   * Delete previous scheduler job status that has completed successfully, or failed.
   * @param params The `JobsStatusesService.JobStatusesDeleteParams` containing the following parameters:
   *
   * - `Content-Type`: This is the content type to be placed in the header
   *
   * - `endTime`: The end time of when the jobs were run, to remove status for.  The value is the end date that the job status should be removed for.  The date format is yyyy-MM-dd'T'HH:mm:ss, ie. 2020-04-20T04:00:00.
   *
   * - `storeId`: The unique numeric ID of the store that the jobs are running for.  If site, store ID must be 0.
   */
  JobStatusesDelete(params: JobsStatusesService.JobStatusesDeleteParams): __Observable<null> {
    return this.JobStatusesDeleteResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Delete previous scheduler job status for the Job specified, that has completed successfully, or failed.
   * @param params The `JobsStatusesService.JobStatusesByJobIdDeleteParams` containing the following parameters:
   *
   * - `Content-Type`: This is the content type to be placed in the header
   *
   * - `id`: The unique numeric ID for identifying the scheduler job.
   *
   * - `endTime`: The end time of when the jobs were run, to remove status for.  The value is the end date that the job status should be removed for.  The date format is yyyy-MM-dd'T'HH:mm:ss, ie. 2020-04-20T04:00:00.
   *
   * - `storeId`: The unique numeric ID of the store that the jobs are running for.  If site, store ID must be 0.
   */
  JobStatusesByJobIdDeleteResponse(params: JobsStatusesService.JobStatusesByJobIdDeleteParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ContentType != null) __headers = __headers.set('Content-Type', params.ContentType.toString());

    if (params.endTime != null) __params = __params.set('endTime', params.endTime.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/job-statuses/${params.id}`,
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
   * Delete previous scheduler job status for the Job specified, that has completed successfully, or failed.
   * @param params The `JobsStatusesService.JobStatusesByJobIdDeleteParams` containing the following parameters:
   *
   * - `Content-Type`: This is the content type to be placed in the header
   *
   * - `id`: The unique numeric ID for identifying the scheduler job.
   *
   * - `endTime`: The end time of when the jobs were run, to remove status for.  The value is the end date that the job status should be removed for.  The date format is yyyy-MM-dd'T'HH:mm:ss, ie. 2020-04-20T04:00:00.
   *
   * - `storeId`: The unique numeric ID of the store that the jobs are running for.  If site, store ID must be 0.
   */
  JobStatusesByJobIdDelete(params: JobsStatusesService.JobStatusesByJobIdDeleteParams): __Observable<null> {
    return this.JobStatusesByJobIdDeleteResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module JobsStatusesService {

  /**
   * Parameters for getScheduledJobStatuses
   */
  export interface GetScheduledJobStatusesParams {

    /**
     * This is the content type to be placed in the header
     */
    ContentType: string;

    /**
     * The start date of the date range for the scheduled job status to return.  The value is the actual start date the job was run on the server's time zone.  The date format is yyyy-MM-dd'T'HH:mm:ss, ie. 2020-04-20T04:00:00.
     */
    criteriaStart?: string;

    /**
     * The end date of the date range for the scheduled job status to return.  The value is the actual end date the job was run on the server's time zone.  The date format is yyyy-MM-dd'T'HH:mm:ss, ie. 2020-04-20T04:00:00.
     */
    criteriaEnd?: string;

    /**
     * The maxiumum number of items to fetch from the database.  Default is 15000.
     */
    maxItems?: number;

    /**
     * The unique numeric ID of the store that the jobs are running for.  If site, store ID must be 0.
     */
    storeId?: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;

    /**
     * The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
     */
    sort?: string;

    /**
     * Limits search results to only include scheduled job status with a command name that matches the value of this parameter. Searches are case-insensitive.
     */
    searchString?: string;

    /**
     * Limits search results to only include scheduled job status with a state that matches the value of this parameter. Searches are case-sensitive.
     */
    state?: string;

    /**
     * Limits search results to only include scheduled job status with a status that matches the value of this parameter. Searches are case-sensitive.
     */
    status?: string;

    /**
     * Limits search results to only include scheduled job status with an application type that matches the value of this parameter. Searches are case-sensitive.
     */
    applicationType?: string;
  }

  /**
   * Parameters for JobStatusesDelete
   */
  export interface JobStatusesDeleteParams {

    /**
     * This is the content type to be placed in the header
     */
    ContentType: string;

    /**
     * The end time of when the jobs were run, to remove status for.  The value is the end date that the job status should be removed for.  The date format is yyyy-MM-dd'T'HH:mm:ss, ie. 2020-04-20T04:00:00.
     */
    endTime: string;

    /**
     * The unique numeric ID of the store that the jobs are running for.  If site, store ID must be 0.
     */
    storeId?: number;
  }

  /**
   * Parameters for JobStatusesByJobIdDelete
   */
  export interface JobStatusesByJobIdDeleteParams {

    /**
     * This is the content type to be placed in the header
     */
    ContentType: string;

    /**
     * The unique numeric ID for identifying the scheduler job.
     */
    id: string;

    /**
     * The end time of when the jobs were run, to remove status for.  The value is the end date that the job status should be removed for.  The date format is yyyy-MM-dd'T'HH:mm:ss, ie. 2020-04-20T04:00:00.
     */
    endTime: string;

    /**
     * The unique numeric ID of the store that the jobs are running for.  If site, store ID must be 0.
     */
    storeId?: number;
  }
}

export { JobsStatusesService }
