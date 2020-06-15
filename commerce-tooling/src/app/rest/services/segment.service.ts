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
class SegmentService extends __BaseService {
  static readonly getCustomerSegmentByIdPath = '/wcs/resources/store/{storeId}/segment/{segmentId}';
  static readonly checkIsInSegmentByUserIdPath = '/wcs/resources/store/{storeId}/segment/{segmentId}/isMember';
  static readonly getCustomerSegmentsPath = '/wcs/resources/store/{storeId}/segment';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Gets customer segment by segmentId.
   * @param params The `SegmentService.GetCustomerSegmentByIdParams` containing the following parameters:
   *
   * - `storeId`: The store identifier.
   *
   * - `segmentId`: The segment identifier.
   *
   * - `responseFormat`: The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
   *
   * @return The requested completed successfully.
   */
  getCustomerSegmentByIdResponse(params: SegmentService.GetCustomerSegmentByIdParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.responseFormat != null) __params = __params.set('responseFormat', params.responseFormat.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/wcs/resources/store/${params.storeId}/segment/${params.segmentId}`,
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
   * Gets customer segment by segmentId.
   * @param params The `SegmentService.GetCustomerSegmentByIdParams` containing the following parameters:
   *
   * - `storeId`: The store identifier.
   *
   * - `segmentId`: The segment identifier.
   *
   * - `responseFormat`: The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
   *
   * @return The requested completed successfully.
   */
  getCustomerSegmentById(params: SegmentService.GetCustomerSegmentByIdParams): __Observable<any> {
    return this.getCustomerSegmentByIdResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Checks if the customer identified by userId or personalizationId is part of given customer segment.
   * @param params The `SegmentService.CheckIsInSegmentByUserIdParams` containing the following parameters:
   *
   * - `storeId`: The store identifier.
   *
   * - `segmentId`: Segment identifier.
   *
   * - `userId`: User unique identifier.
   *
   * - `personalizationId`: The user's personalization id. Note : this parameter is ignored if the userId parameter is specified.
   *
   * - `responseFormat`: The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
   *
   * @return The requested completed successfully.
   */
  checkIsInSegmentByUserIdResponse(params: SegmentService.CheckIsInSegmentByUserIdParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.userId != null) __params = __params.set('userId', params.userId.toString());
    if (params.personalizationId != null) __params = __params.set('personalizationId', params.personalizationId.toString());
    if (params.responseFormat != null) __params = __params.set('responseFormat', params.responseFormat.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/wcs/resources/store/${params.storeId}/segment/${params.segmentId}/isMember`,
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
   * Checks if the customer identified by userId or personalizationId is part of given customer segment.
   * @param params The `SegmentService.CheckIsInSegmentByUserIdParams` containing the following parameters:
   *
   * - `storeId`: The store identifier.
   *
   * - `segmentId`: Segment identifier.
   *
   * - `userId`: User unique identifier.
   *
   * - `personalizationId`: The user's personalization id. Note : this parameter is ignored if the userId parameter is specified.
   *
   * - `responseFormat`: The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
   *
   * @return The requested completed successfully.
   */
  checkIsInSegmentByUserId(params: SegmentService.CheckIsInSegmentByUserIdParams): __Observable<any> {
    return this.checkIsInSegmentByUserIdResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Gets all customer segments by a specified storeId or get segment by userId or personalizationId or byName.
   * @param params The `SegmentService.GetCustomerSegmentsParams` containing the following parameters:
   *
   * - `storeId`: The store identifier.
   *
   * - `q`: The query name.
   *
   * - `qUserId`: The user identifier. Required if the query is set to byUserId.
   *
   * - `qPersonalizationId`: The user's personalization identifier. Required if the query is set to byPersonalizationId.
   *
   * - `qName`: The user's name. Required if the query is set to byName.
   *
   * - `pageNumber`: Page number. Valid values are positive integers starting at 1. Use pageNumber with pageSize.
   *
   * - `pageSize`: Page size. Used to limit the amount of data returned by a query. Valid values are integers starting with 1. Use pageSize with pageNumber.
   *
   * - `responseFormat`: The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
   *
   * @return The requested completed successfully.
   */
  getCustomerSegmentsResponse(params: SegmentService.GetCustomerSegmentsParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.q != null) __params = __params.set('q', params.q.toString());
    if (params.qUserId != null) __params = __params.set('qUserId', params.qUserId.toString());
    if (params.qPersonalizationId != null) __params = __params.set('qPersonalizationId', params.qPersonalizationId.toString());
    if (params.qName != null) __params = __params.set('qName', params.qName.toString());
    if (params.pageNumber != null) __params = __params.set('pageNumber', params.pageNumber.toString());
    if (params.pageSize != null) __params = __params.set('pageSize', params.pageSize.toString());
    if (params.responseFormat != null) __params = __params.set('responseFormat', params.responseFormat.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/wcs/resources/store/${params.storeId}/segment`,
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
   * Gets all customer segments by a specified storeId or get segment by userId or personalizationId or byName.
   * @param params The `SegmentService.GetCustomerSegmentsParams` containing the following parameters:
   *
   * - `storeId`: The store identifier.
   *
   * - `q`: The query name.
   *
   * - `qUserId`: The user identifier. Required if the query is set to byUserId.
   *
   * - `qPersonalizationId`: The user's personalization identifier. Required if the query is set to byPersonalizationId.
   *
   * - `qName`: The user's name. Required if the query is set to byName.
   *
   * - `pageNumber`: Page number. Valid values are positive integers starting at 1. Use pageNumber with pageSize.
   *
   * - `pageSize`: Page size. Used to limit the amount of data returned by a query. Valid values are integers starting with 1. Use pageSize with pageNumber.
   *
   * - `responseFormat`: The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
   *
   * @return The requested completed successfully.
   */
  getCustomerSegments(params: SegmentService.GetCustomerSegmentsParams): __Observable<any> {
    return this.getCustomerSegmentsResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }
}

module SegmentService {

  /**
   * Parameters for getCustomerSegmentById
   */
  export interface GetCustomerSegmentByIdParams {

    /**
     * The store identifier.
     */
    storeId: string;

    /**
     * The segment identifier.
     */
    segmentId: string;

    /**
     * The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     */
    responseFormat?: 'xml' | 'json';
  }

  /**
   * Parameters for checkIsInSegmentByUserId
   */
  export interface CheckIsInSegmentByUserIdParams {

    /**
     * The store identifier.
     */
    storeId: string;

    /**
     * Segment identifier.
     */
    segmentId: string;

    /**
     * User unique identifier.
     */
    userId?: number;

    /**
     * The user's personalization id. Note : this parameter is ignored if the userId parameter is specified.
     */
    personalizationId?: string;

    /**
     * The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     */
    responseFormat?: 'xml' | 'json';
  }

  /**
   * Parameters for getCustomerSegments
   */
  export interface GetCustomerSegmentsParams {

    /**
     * The store identifier.
     */
    storeId: string;

    /**
     * The query name.
     */
    q: 'byUserId' | 'byPersonalizationId' | 'byName' | 'all';

    /**
     * The user identifier. Required if the query is set to byUserId.
     */
    qUserId?: number;

    /**
     * The user's personalization identifier. Required if the query is set to byPersonalizationId.
     */
    qPersonalizationId?: string;

    /**
     * The user's name. Required if the query is set to byName.
     */
    qName?: string;

    /**
     * Page number. Valid values are positive integers starting at 1. Use pageNumber with pageSize.
     */
    pageNumber?: number;

    /**
     * Page size. Used to limit the amount of data returned by a query. Valid values are integers starting with 1. Use pageSize with pageNumber.
     */
    pageSize?: number;

    /**
     * The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     */
    responseFormat?: 'xml' | 'json';
  }
}

export { SegmentService }
