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
class PriceRulesService extends __BaseService {
  static readonly getPriceRulesPath = '/rest/admin/v2/price-rules';
  static readonly createPriceRulePath = '/rest/admin/v2/price-rules';
  static readonly getPriceRuleByNameOrDescriptionPath = '/rest/admin/v2/price-rules/by-name-or-description';
  static readonly getPriceRulesByPriceConstantPath = '/rest/admin/v2/price-rules/by-price-constant-id/{priceConstantId}';
  static readonly getPriceRulesByPriceEquationPath = '/rest/admin/v2/price-rules/by-price-equation-id/{priceEquationId}';
  static readonly getPriceRulesByPriceListPath = '/rest/admin/v2/price-rules/by-price-list-id/{priceListId}';
  static readonly deletePriceRulePath = '/rest/admin/v2/price-rules/{id}';
  static readonly getPriceRuleByIdPath = '/rest/admin/v2/price-rules/{id}';
  static readonly updatePriceRulePath = '/rest/admin/v2/price-rules/{id}';
  static readonly getPriceRuleElementsPath = '/rest/admin/v2/price-rules/{id}/elements';
  static readonly createPriceRuleElementPath = '/rest/admin/v2/price-rules/{id}/elements';
  static readonly deletePriceRuleElementPath = '/rest/admin/v2/price-rules/{id}/elements/{name}';
  static readonly updatePriceRuleElementPath = '/rest/admin/v2/price-rules/{id}/elements/{name}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `PriceRulesService.GetPriceRulesParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getPriceRulesResponse(params: PriceRulesService.GetPriceRulesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/price-rules`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}>;
      })
    );
  }

  /**
   * @param params The `PriceRulesService.GetPriceRulesParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getPriceRules(params: PriceRulesService.GetPriceRulesParams): __Observable<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}> {
    return this.getPriceRulesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>})
    );
  }

  /**
   * @param params The `PriceRulesService.CreatePriceRuleParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createPriceRuleResponse(params: PriceRulesService.CreatePriceRuleParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/price-rules`,
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
   * @param params The `PriceRulesService.CreatePriceRuleParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body.
   */
  createPriceRule(params: PriceRulesService.CreatePriceRuleParams): __Observable<null> {
    return this.createPriceRuleResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `PriceRulesService.GetPriceRuleByNameOrDescriptionParams` containing the following parameters:
   *
   * - `storeId`: The store ID.
   *
   * - `searchText`: The name pattern to search.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getPriceRuleByNameOrDescriptionResponse(params: PriceRulesService.GetPriceRuleByNameOrDescriptionParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.searchText != null) __params = __params.set('searchText', params.searchText.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/price-rules/by-name-or-description`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}>;
      })
    );
  }

  /**
   * @param params The `PriceRulesService.GetPriceRuleByNameOrDescriptionParams` containing the following parameters:
   *
   * - `storeId`: The store ID.
   *
   * - `searchText`: The name pattern to search.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getPriceRuleByNameOrDescription(params: PriceRulesService.GetPriceRuleByNameOrDescriptionParams): __Observable<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}> {
    return this.getPriceRuleByNameOrDescriptionResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>})
    );
  }

  /**
   * @param params The `PriceRulesService.GetPriceRulesByPriceConstantParams` containing the following parameters:
   *
   * - `priceConstantId`: The price constant ID.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getPriceRulesByPriceConstantResponse(params: PriceRulesService.GetPriceRulesByPriceConstantParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/price-rules/by-price-constant-id/${params.priceConstantId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}>;
      })
    );
  }

  /**
   * @param params The `PriceRulesService.GetPriceRulesByPriceConstantParams` containing the following parameters:
   *
   * - `priceConstantId`: The price constant ID.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getPriceRulesByPriceConstant(params: PriceRulesService.GetPriceRulesByPriceConstantParams): __Observable<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}> {
    return this.getPriceRulesByPriceConstantResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>})
    );
  }

  /**
   * @param params The `PriceRulesService.GetPriceRulesByPriceEquationParams` containing the following parameters:
   *
   * - `priceEquationId`: The price equation ID.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getPriceRulesByPriceEquationResponse(params: PriceRulesService.GetPriceRulesByPriceEquationParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/price-rules/by-price-equation-id/${params.priceEquationId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}>;
      })
    );
  }

  /**
   * @param params The `PriceRulesService.GetPriceRulesByPriceEquationParams` containing the following parameters:
   *
   * - `priceEquationId`: The price equation ID.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getPriceRulesByPriceEquation(params: PriceRulesService.GetPriceRulesByPriceEquationParams): __Observable<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}> {
    return this.getPriceRulesByPriceEquationResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>})
    );
  }

  /**
   * @param params The `PriceRulesService.GetPriceRulesByPriceListParams` containing the following parameters:
   *
   * - `priceListId`: The price list ID.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getPriceRulesByPriceListResponse(params: PriceRulesService.GetPriceRulesByPriceListParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/price-rules/by-price-list-id/${params.priceListId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}>;
      })
    );
  }

  /**
   * @param params The `PriceRulesService.GetPriceRulesByPriceListParams` containing the following parameters:
   *
   * - `priceListId`: The price list ID.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getPriceRulesByPriceList(params: PriceRulesService.GetPriceRulesByPriceListParams): __Observable<{count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>}> {
    return this.getPriceRulesByPriceListResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>})
    );
  }

  /**
   * @param id The unique numeric ID for identifying the price rule.
   */
  deletePriceRuleResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/price-rules/${id}`,
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
   * @param id The unique numeric ID for identifying the price rule.
   */
  deletePriceRule(id: string): __Observable<null> {
    return this.deletePriceRuleResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `PriceRulesService.GetPriceRuleByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the price rule.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getPriceRuleByIdResponse(params: PriceRulesService.GetPriceRuleByIdParams): __Observable<__StrictHttpResponse<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/price-rules/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}>;
      })
    );
  }

  /**
   * @param params The `PriceRulesService.GetPriceRuleByIdParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the price rule.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getPriceRuleById(params: PriceRulesService.GetPriceRuleByIdParams): __Observable<{createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number}> {
    return this.getPriceRuleByIdResponse(params).pipe(
      __map(_r => _r.body as {createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number})
    );
  }

  /**
   * @param params The `PriceRulesService.UpdatePriceRuleParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the price rule.
   *
   * - `body`: The request body.
   */
  updatePriceRuleResponse(params: PriceRulesService.UpdatePriceRuleParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/price-rules/${params.id}`,
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
   * @param params The `PriceRulesService.UpdatePriceRuleParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the price rule.
   *
   * - `body`: The request body.
   */
  updatePriceRule(params: PriceRulesService.UpdatePriceRuleParams): __Observable<null> {
    return this.updatePriceRuleResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id The unique numeric ID for identifying the price rule.
   */
  getPriceRuleElementsResponse(id: string): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/price-rules/${id}/elements`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>}>;
      })
    );
  }

  /**
   * @param id The unique numeric ID for identifying the price rule.
   */
  getPriceRuleElements(id: string): __Observable<{count?: number, items?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>}> {
    return this.getPriceRuleElementsResponse(id).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>})
    );
  }

  /**
   * @param params The `PriceRulesService.CreatePriceRuleElementParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the price rule.
   *
   * - `body`: The request body.
   */
  createPriceRuleElementResponse(params: PriceRulesService.CreatePriceRuleElementParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/price-rules/${params.id}/elements`,
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
   * @param params The `PriceRulesService.CreatePriceRuleElementParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the price rule.
   *
   * - `body`: The request body.
   */
  createPriceRuleElement(params: PriceRulesService.CreatePriceRuleElementParams): __Observable<null> {
    return this.createPriceRuleElementResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `PriceRulesService.DeletePriceRuleElementParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the price rule.
   *
   * - `name`: The name of the price rule element.
   */
  deletePriceRuleElementResponse(params: PriceRulesService.DeletePriceRuleElementParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/price-rules/${params.id}/elements/${params.name}`,
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
   * @param params The `PriceRulesService.DeletePriceRuleElementParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the price rule.
   *
   * - `name`: The name of the price rule element.
   */
  deletePriceRuleElement(params: PriceRulesService.DeletePriceRuleElementParams): __Observable<null> {
    return this.deletePriceRuleElementResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `PriceRulesService.UpdatePriceRuleElementParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the price rule.
   *
   * - `name`: The name of the price rule element.
   *
   * - `body`: The request body.
   */
  updatePriceRuleElementResponse(params: PriceRulesService.UpdatePriceRuleElementParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/price-rules/${params.id}/elements/${params.name}`,
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
   * @param params The `PriceRulesService.UpdatePriceRuleElementParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the price rule.
   *
   * - `name`: The name of the price rule element.
   *
   * - `body`: The request body.
   */
  updatePriceRuleElement(params: PriceRulesService.UpdatePriceRuleElementParams): __Observable<null> {
    return this.updatePriceRuleElementResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module PriceRulesService {

  /**
   * Parameters for getPriceRules
   */
  export interface GetPriceRulesParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for createPriceRule
   */
  export interface CreatePriceRuleParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body.
     */
    body: {createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number};
  }

  /**
   * Parameters for getPriceRuleByNameOrDescription
   */
  export interface GetPriceRuleByNameOrDescriptionParams {

    /**
     * The store ID.
     */
    storeId: number;

    /**
     * The name pattern to search.
     */
    searchText: string;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for getPriceRulesByPriceConstant
   */
  export interface GetPriceRulesByPriceConstantParams {

    /**
     * The price constant ID.
     */
    priceConstantId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for getPriceRulesByPriceEquation
   */
  export interface GetPriceRulesByPriceEquationParams {

    /**
     * The price equation ID.
     */
    priceEquationId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for getPriceRulesByPriceList
   */
  export interface GetPriceRulesByPriceListParams {

    /**
     * The price list ID.
     */
    priceListId: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is 5, the records that returned begin with the sixth record that matches the query parameters. If the offset is 0, the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for getPriceRuleById
   */
  export interface GetPriceRuleByIdParams {

    /**
     * The unique numeric ID for identifying the price rule.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }

  /**
   * Parameters for updatePriceRule
   */
  export interface UpdatePriceRuleParams {

    /**
     * The unique numeric ID for identifying the price rule.
     */
    id: string;

    /**
     * The request body.
     */
    body: {createdDate?: string, dependent?: boolean, description?: string, elements?: Array<{attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string}>, format?: string, id?: string, name?: string, state?: string, storeId?: number, updatedDate?: string, version?: number};
  }

  /**
   * Parameters for createPriceRuleElement
   */
  export interface CreatePriceRuleElementParams {

    /**
     * The unique numeric ID for identifying the price rule.
     */
    id: string;

    /**
     * The request body.
     */
    body: {attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string};
  }

  /**
   * Parameters for deletePriceRuleElement
   */
  export interface DeletePriceRuleElementParams {

    /**
     * The unique numeric ID for identifying the price rule.
     */
    id: string;

    /**
     * The name of the price rule element.
     */
    name: string;
  }

  /**
   * Parameters for updatePriceRuleElement
   */
  export interface UpdatePriceRuleElementParams {

    /**
     * The unique numeric ID for identifying the price rule.
     */
    id: string;

    /**
     * The name of the price rule element.
     */
    name: string;

    /**
     * The request body.
     */
    body: {attributes?: Array<{name?: string, value?: string}>, name?: string, parentElementName?: string, sequence?: number, templateGroup?: string, templateId?: string, templateName?: string};
  }
}

export { PriceRulesService }
