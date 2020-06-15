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
class PreviewTokenService extends __BaseService {
  static readonly checkIsPasswordValidPath = '/wcs/resources/store/{storeId}/previewToken/isvalid';
  static readonly generatePreviewTokenPath = '/wcs/resources/store/{storeId}/previewToken';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Checks if the password is valid.
   * @param params The `PreviewTokenService.CheckIsPasswordValidParams` containing the following parameters:
   *
   * - `storeId`: The store identifier.
   *
   * - `body`: The request body to validate a preview token password.
   *
   * @return The requested completed successfully.
   */
  checkIsPasswordValidResponse(params: PreviewTokenService.CheckIsPasswordValidParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/wcs/resources/store/${params.storeId}/previewToken/isvalid`,
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
   * Checks if the password is valid.
   * @param params The `PreviewTokenService.CheckIsPasswordValidParams` containing the following parameters:
   *
   * - `storeId`: The store identifier.
   *
   * - `body`: The request body to validate a preview token password.
   *
   * @return The requested completed successfully.
   */
  checkIsPasswordValid(params: PreviewTokenService.CheckIsPasswordValidParams): __Observable<any> {
    return this.checkIsPasswordValidResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Requests the preview token.
   * @param params The `PreviewTokenService.GeneratePreviewTokenParams` containing the following parameters:
   *
   * - `storeId`: The store identifier.
   *
   * - `responseFormat`: The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
   *
   * - `body`: Request body.
   *
   * @return No response was specified.
   */
  generatePreviewTokenResponse(params: PreviewTokenService.GeneratePreviewTokenParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.responseFormat != null) __params = __params.set('responseFormat', params.responseFormat.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/wcs/resources/store/${params.storeId}/previewToken`,
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
   * Requests the preview token.
   * @param params The `PreviewTokenService.GeneratePreviewTokenParams` containing the following parameters:
   *
   * - `storeId`: The store identifier.
   *
   * - `responseFormat`: The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
   *
   * - `body`: Request body.
   *
   * @return No response was specified.
   */
  generatePreviewToken(params: PreviewTokenService.GeneratePreviewTokenParams): __Observable<any> {
    return this.generatePreviewTokenResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }
}

module PreviewTokenService {

  /**
   * Parameters for checkIsPasswordValid
   */
  export interface CheckIsPasswordValidParams {

    /**
     * The store identifier.
     */
    storeId: string;

    /**
     * The request body to validate a preview token password.
     */
    body: any;
  }

  /**
   * Parameters for generatePreviewToken
   */
  export interface GeneratePreviewTokenParams {

    /**
     * The store identifier.
     */
    storeId: string;

    /**
     * The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     */
    responseFormat?: 'xml' | 'json';

    /**
     * Request body.
     */
    body?: any;
  }
}

export { PreviewTokenService }
