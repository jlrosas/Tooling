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
class JobSiteCommandsService extends __BaseService {
  static readonly getScheduledJobSiteCommandsPath = '/rest/admin/v2/job-site-commands';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of scheduled job site commands.
   * @param Content-Type This is the content type to be placed in the header
   * @return The request completed successfully.
   */
  getScheduledJobSiteCommandsResponse(ContentType: string): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (ContentType != null) __headers = __headers.set('Content-Type', ContentType.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/job-site-commands`,
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
   * Get a collection of scheduled job site commands.
   * @param Content-Type This is the content type to be placed in the header
   * @return The request completed successfully.
   */
  getScheduledJobSiteCommands(ContentType: string): __Observable<any> {
    return this.getScheduledJobSiteCommandsResponse(ContentType).pipe(
      __map(_r => _r.body as any)
    );
  }
}

module JobSiteCommandsService {
}

export { JobSiteCommandsService }
