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
class JobTypesService extends __BaseService {
  static readonly JobGetJobTypesPath = '/rest/admin/v2/job-types';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of scheduler job types.
   * @param params The `JobTypesService.JobGetJobTypesParams` containing the following parameters:
   *
   * - `Content-Type`: This is the content type to be placed in the header
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * @return The requested completed successfully.
   */
  JobGetJobTypesResponse(params: JobTypesService.JobGetJobTypesParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ContentType != null) __headers = __headers.set('Content-Type', params.ContentType.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/job-types`,
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
   * Get a collection of scheduler job types.
   * @param params The `JobTypesService.JobGetJobTypesParams` containing the following parameters:
   *
   * - `Content-Type`: This is the content type to be placed in the header
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * @return The requested completed successfully.
   */
  JobGetJobTypes(params: JobTypesService.JobGetJobTypesParams): __Observable<any> {
    return this.JobGetJobTypesResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }
}

module JobTypesService {

  /**
   * Parameters for JobGetJobTypes
   */
  export interface JobGetJobTypesParams {

    /**
     * This is the content type to be placed in the header
     */
    ContentType: string;

    /**
     * The maximum number of records to return.
     */
    limit?: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;
  }
}

export { JobTypesService }
