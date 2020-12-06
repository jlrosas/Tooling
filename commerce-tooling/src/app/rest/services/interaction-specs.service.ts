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
class InteractionSpecsService extends __BaseService {
  static readonly getInteractionSpecsPath = '/rest/admin/v2/interaction-specs/{profileId}';
  static readonly updateInteractionSpecsPath = '/rest/admin/v2/interaction-specs/{profileId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param profileId The unique numeric ID of the profile.
   * @return The requested completed successfully.
   */
  getInteractionSpecsResponse(profileId: number): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/interaction-specs/${profileId}`,
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
   * @param profileId The unique numeric ID of the profile.
   * @return The requested completed successfully.
   */
  getInteractionSpecs(profileId: number): __Observable<any> {
    return this.getInteractionSpecsResponse(profileId).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * @param params The `InteractionSpecsService.UpdateInteractionSpecsParams` containing the following parameters:
   *
   * - `profileId`: The unique numeric ID of the profile.
   *
   * - `body`: The request body for updating the interaction specifications.
   */
  updateInteractionSpecsResponse(params: InteractionSpecsService.UpdateInteractionSpecsParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/interaction-specs/${params.profileId}`,
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
   * @param params The `InteractionSpecsService.UpdateInteractionSpecsParams` containing the following parameters:
   *
   * - `profileId`: The unique numeric ID of the profile.
   *
   * - `body`: The request body for updating the interaction specifications.
   */
  updateInteractionSpecs(params: InteractionSpecsService.UpdateInteractionSpecsParams): __Observable<null> {
    return this.updateInteractionSpecsResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module InteractionSpecsService {

  /**
   * Parameters for updateInteractionSpecs
   */
  export interface UpdateInteractionSpecsParams {

    /**
     * The unique numeric ID of the profile.
     */
    profileId: number;

    /**
     * The request body for updating the interaction specifications.
     */
    body: any;
  }
}

export { InteractionSpecsService }
