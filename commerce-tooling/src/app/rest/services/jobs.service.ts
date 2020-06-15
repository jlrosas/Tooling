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
class JobsService extends __BaseService {
  static readonly JobGetPath = '/rest/admin/v2/jobs';
  static readonly JobPostPath = '/rest/admin/v2/jobs';
  static readonly JobCreateNewVersionJobPath = '/rest/admin/v2/jobs/{id}/new-version';
  static readonly JobDeletePath = '/rest/admin/v2/jobs/{id}';
  static readonly JobGetByIdPath = '/rest/admin/v2/jobs/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of scheduler jobs.
   * @param params The `JobsService.JobGetParams` containing the following parameters:
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `storeId`: The unique numeric ID for identifying the store of the scheduler job. This field can only be assigned during job creation time.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * @return The requested completed successfully.
   */
  JobGetResponse(params: JobsService.JobGetParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.fields || []).forEach(val => {if (val != null) __params = __params.append('fields', val.toString())});
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/jobs`,
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
   * Get a collection of scheduler jobs.
   * @param params The `JobsService.JobGetParams` containing the following parameters:
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `storeId`: The unique numeric ID for identifying the store of the scheduler job. This field can only be assigned during job creation time.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * @return The requested completed successfully.
   */
  JobGet(params: JobsService.JobGetParams): __Observable<any> {
    return this.JobGetResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Create a scheduler job.
   * @param body Request body. The "id" field will be generated and it should not be part of the request body. The "userId" and "activeState" fields are managed and it cannot be specified.
   */
  JobPostResponse(body: any): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/jobs`,
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
   * Create a scheduler job.
   * @param body Request body. The "id" field will be generated and it should not be part of the request body. The "userId" and "activeState" fields are managed and it cannot be specified.
   */
  JobPost(body: any): __Observable<null> {
    return this.JobPostResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Edit a scheduler job.
   * @param params The `JobsService.JobCreateNewVersionJobParams` containing the following parameters:
   *
   * - `body`: Request body. The "userId" and "activeState" fields are managed and it cannot be specified.
   *
   * - `id`: The unique numeric ID for identifying the scheduler job.
   */
  JobCreateNewVersionJobResponse(params: JobsService.JobCreateNewVersionJobParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.body;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/jobs/${params.id}/new-version`,
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
   * Edit a scheduler job.
   * @param params The `JobsService.JobCreateNewVersionJobParams` containing the following parameters:
   *
   * - `body`: Request body. The "userId" and "activeState" fields are managed and it cannot be specified.
   *
   * - `id`: The unique numeric ID for identifying the scheduler job.
   */
  JobCreateNewVersionJob(params: JobsService.JobCreateNewVersionJobParams): __Observable<null> {
    return this.JobCreateNewVersionJobResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Delete a scheduler job by ID
   * @param id The unique numeric ID for identifying the scheduler job.
   */
  JobDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/jobs/${id}`,
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
   * Delete a scheduler job by ID
   * @param id The unique numeric ID for identifying the scheduler job.
   */
  JobDelete(id: string): __Observable<null> {
    return this.JobDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a scheduler job by ID.
   * @param params The `JobsService.JobGetByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the scheduler job.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * @return The requested completed successfully.
   */
  JobGetByIdResponse(params: JobsService.JobGetByIdParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.fields || []).forEach(val => {if (val != null) __params = __params.append('fields', val.toString())});
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/jobs/${params.id}`,
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
   * Get a scheduler job by ID.
   * @param params The `JobsService.JobGetByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the scheduler job.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * @return The requested completed successfully.
   */
  JobGetById(params: JobsService.JobGetByIdParams): __Observable<any> {
    return this.JobGetByIdResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }
}

module JobsService {

  /**
   * Parameters for JobGet
   */
  export interface JobGetParams {

    /**
     * The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
     */
    fields?: Array<string>;

    /**
     * The maximum number of records to return.
     */
    limit?: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The unique numeric ID for identifying the store of the scheduler job. This field can only be assigned during job creation time.
     */
    storeId?: number;

    /**
     * The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
     */
    expand?: string;
  }

  /**
   * Parameters for JobCreateNewVersionJob
   */
  export interface JobCreateNewVersionJobParams {

    /**
     * Request body. The "userId" and "activeState" fields are managed and it cannot be specified.
     */
    body: any;

    /**
     * The unique numeric ID for identifying the scheduler job.
     */
    id: string;
  }

  /**
   * Parameters for JobGetById
   */
  export interface JobGetByIdParams {

    /**
     * The unique numeric ID for identifying the scheduler job.
     */
    id: string;

    /**
     * The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
     */
    fields?: Array<string>;

    /**
     * The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
     */
    expand?: string;
  }
}

export { JobsService }
