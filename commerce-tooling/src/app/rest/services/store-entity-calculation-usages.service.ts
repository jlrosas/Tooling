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
class StoreEntityCalculationUsagesService extends __BaseService {
  static readonly getStoreEntityCalculationUsagesPath = '/rest/admin/v2/store-entity-calculation-usages';
  static readonly createStoreEntityCalculationUsagePath = '/rest/admin/v2/store-entity-calculation-usages';
  static readonly getStoreEntityCalculationUsageByIdPath = '/rest/admin/v2/store-entity-calculation-usages/storeId:{storeId},calculationUsageId:{calculationUsageId}';
  static readonly deleteStoreEntityCalculationUsageByIdPath = '/rest/admin/v2/store-entity-calculation-usages/storeId:{storeId},calculationUsageId:{calculationUsageId}';
  static readonly updateStoreEntityCalculationUsageByIdPath = '/rest/admin/v2/store-entity-calculation-usages/storeId:{storeId},calculationUsageId:{calculationUsageId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of Store Entity Calculation Usages.
   * @param params The `StoreEntityCalculationUsagesService.GetStoreEntityCalculationUsagesParams` containing the following parameters:
   *
   * - `storeId`: The store entity id.
   *
   * - `usageFlags`: Bit flags to control how the OrderPrepare command uses this CalculationUsage.
   *
   * - `sequence`: The OrderPrepare command uses CalculationUsage in ascending order of this Sequence attribute.
   *
   * - `calculationCodeId`: The default CalculationCode, of the specified CalculationUsage, for the StoreEntity.
   *
   * - `calculationUsageId`: The CalculationUsage.
   *
   * - `activeCalculationCodeCombineMethodId`: The CalculationCodeCombineMethod for the StoreEntity and CalculationUsage.
   *
   * - `activeCalculationRuleCombineMethodId`: The CalculationRuleCombineMethod for the StoreEntity and CalculationUsage.
   *
   * - `applyCalculationUsageMethodId`: The ApplyCalculationUsageMethod for the StoreEntity and CalculationUsage.
   *
   * - `summarizeCalculationUsageMethodId`: The SummarizeCalculationUsageMethod for the StoreEntity and CalculationUsage.
   *
   * - `initializeCalculationUsageMethodId`: The InitializeCalculationUsageMethod for the StoreEntity and CalculationUsage.
   *
   * - `finalizeCalculationUsageMethodId`: The FinalizeCalculationUsageMethod for the StoreEntity and CalculationUsage.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A collection of Store Entity Calculation Usages.
   */
  getStoreEntityCalculationUsagesResponse(params: StoreEntityCalculationUsagesService.GetStoreEntityCalculationUsagesParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{storeId?: number, usageFlags?: number, sequence?: number, calculationCodeId?: number, calculationUsageId?: number, activeCalculationCodeCombineMethodId?: number, activeCalculationRuleCombineMethodId?: number, applyCalculationUsageMethodId?: number, summarizeCalculationUsageMethodId?: number, initializeCalculationUsageMethodId?: number, finalizeCalculationUsageMethodId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.usageFlags != null) __params = __params.set('usageFlags', params.usageFlags.toString());
    if (params.sequence != null) __params = __params.set('sequence', params.sequence.toString());
    if (params.calculationCodeId != null) __params = __params.set('calculationCodeId', params.calculationCodeId.toString());
    (params.calculationUsageId || []).forEach(val => {if (val != null) __params = __params.append('calculationUsageId', val.toString())});
    if (params.activeCalculationCodeCombineMethodId != null) __params = __params.set('activeCalculationCodeCombineMethodId', params.activeCalculationCodeCombineMethodId.toString());
    if (params.activeCalculationRuleCombineMethodId != null) __params = __params.set('activeCalculationRuleCombineMethodId', params.activeCalculationRuleCombineMethodId.toString());
    if (params.applyCalculationUsageMethodId != null) __params = __params.set('applyCalculationUsageMethodId', params.applyCalculationUsageMethodId.toString());
    if (params.summarizeCalculationUsageMethodId != null) __params = __params.set('summarizeCalculationUsageMethodId', params.summarizeCalculationUsageMethodId.toString());
    if (params.initializeCalculationUsageMethodId != null) __params = __params.set('initializeCalculationUsageMethodId', params.initializeCalculationUsageMethodId.toString());
    if (params.finalizeCalculationUsageMethodId != null) __params = __params.set('finalizeCalculationUsageMethodId', params.finalizeCalculationUsageMethodId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/store-entity-calculation-usages`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{storeId?: number, usageFlags?: number, sequence?: number, calculationCodeId?: number, calculationUsageId?: number, activeCalculationCodeCombineMethodId?: number, activeCalculationRuleCombineMethodId?: number, applyCalculationUsageMethodId?: number, summarizeCalculationUsageMethodId?: number, initializeCalculationUsageMethodId?: number, finalizeCalculationUsageMethodId?: number}>}>;
      })
    );
  }

  /**
   * Get a collection of Store Entity Calculation Usages.
   * @param params The `StoreEntityCalculationUsagesService.GetStoreEntityCalculationUsagesParams` containing the following parameters:
   *
   * - `storeId`: The store entity id.
   *
   * - `usageFlags`: Bit flags to control how the OrderPrepare command uses this CalculationUsage.
   *
   * - `sequence`: The OrderPrepare command uses CalculationUsage in ascending order of this Sequence attribute.
   *
   * - `calculationCodeId`: The default CalculationCode, of the specified CalculationUsage, for the StoreEntity.
   *
   * - `calculationUsageId`: The CalculationUsage.
   *
   * - `activeCalculationCodeCombineMethodId`: The CalculationCodeCombineMethod for the StoreEntity and CalculationUsage.
   *
   * - `activeCalculationRuleCombineMethodId`: The CalculationRuleCombineMethod for the StoreEntity and CalculationUsage.
   *
   * - `applyCalculationUsageMethodId`: The ApplyCalculationUsageMethod for the StoreEntity and CalculationUsage.
   *
   * - `summarizeCalculationUsageMethodId`: The SummarizeCalculationUsageMethod for the StoreEntity and CalculationUsage.
   *
   * - `initializeCalculationUsageMethodId`: The InitializeCalculationUsageMethod for the StoreEntity and CalculationUsage.
   *
   * - `finalizeCalculationUsageMethodId`: The FinalizeCalculationUsageMethod for the StoreEntity and CalculationUsage.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A collection of Store Entity Calculation Usages.
   */
  getStoreEntityCalculationUsages(params: StoreEntityCalculationUsagesService.GetStoreEntityCalculationUsagesParams): __Observable<{count?: number, items?: Array<{storeId?: number, usageFlags?: number, sequence?: number, calculationCodeId?: number, calculationUsageId?: number, activeCalculationCodeCombineMethodId?: number, activeCalculationRuleCombineMethodId?: number, applyCalculationUsageMethodId?: number, summarizeCalculationUsageMethodId?: number, initializeCalculationUsageMethodId?: number, finalizeCalculationUsageMethodId?: number}>}> {
    return this.getStoreEntityCalculationUsagesResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{storeId?: number, usageFlags?: number, sequence?: number, calculationCodeId?: number, calculationUsageId?: number, activeCalculationCodeCombineMethodId?: number, activeCalculationRuleCombineMethodId?: number, applyCalculationUsageMethodId?: number, summarizeCalculationUsageMethodId?: number, initializeCalculationUsageMethodId?: number, finalizeCalculationUsageMethodId?: number}>})
    );
  }

  /**
   * Create a Store Entity Calculation Usage.
   * @param StoreEntityCalculationUsage A Store Entity Calculation Usage.
   */
  createStoreEntityCalculationUsageResponse(StoreEntityCalculationUsage: {storeId?: number, usageFlags?: number, sequence?: number, calculationCodeId?: number, calculationUsageId?: number, activeCalculationCodeCombineMethodId?: number, activeCalculationRuleCombineMethodId?: number, applyCalculationUsageMethodId?: number, summarizeCalculationUsageMethodId?: number, initializeCalculationUsageMethodId?: number, finalizeCalculationUsageMethodId?: number}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = StoreEntityCalculationUsage;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/store-entity-calculation-usages`,
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
   * Create a Store Entity Calculation Usage.
   * @param StoreEntityCalculationUsage A Store Entity Calculation Usage.
   */
  createStoreEntityCalculationUsage(StoreEntityCalculationUsage: {storeId?: number, usageFlags?: number, sequence?: number, calculationCodeId?: number, calculationUsageId?: number, activeCalculationCodeCombineMethodId?: number, activeCalculationRuleCombineMethodId?: number, applyCalculationUsageMethodId?: number, summarizeCalculationUsageMethodId?: number, initializeCalculationUsageMethodId?: number, finalizeCalculationUsageMethodId?: number}): __Observable<null> {
    return this.createStoreEntityCalculationUsageResponse(StoreEntityCalculationUsage).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a Store Entity Calculation Usage.
   * @param params The `StoreEntityCalculationUsagesService.GetStoreEntityCalculationUsageByIdParams` containing the following parameters:
   *
   * - `storeId`: The store entity id.
   *
   * - `calculationUsageId`: The CalculationUsage.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Store Entity Calculation Usage.
   */
  getStoreEntityCalculationUsageByIdResponse(params: StoreEntityCalculationUsagesService.GetStoreEntityCalculationUsageByIdParams): __Observable<__StrictHttpResponse<{storeId?: number, usageFlags?: number, sequence?: number, calculationCodeId?: number, calculationUsageId?: number, activeCalculationCodeCombineMethodId?: number, activeCalculationRuleCombineMethodId?: number, applyCalculationUsageMethodId?: number, summarizeCalculationUsageMethodId?: number, initializeCalculationUsageMethodId?: number, finalizeCalculationUsageMethodId?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/store-entity-calculation-usages/storeId:${params.storeId},calculationUsageId:${params.calculationUsageId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{storeId?: number, usageFlags?: number, sequence?: number, calculationCodeId?: number, calculationUsageId?: number, activeCalculationCodeCombineMethodId?: number, activeCalculationRuleCombineMethodId?: number, applyCalculationUsageMethodId?: number, summarizeCalculationUsageMethodId?: number, initializeCalculationUsageMethodId?: number, finalizeCalculationUsageMethodId?: number}>;
      })
    );
  }

  /**
   * Get a Store Entity Calculation Usage.
   * @param params The `StoreEntityCalculationUsagesService.GetStoreEntityCalculationUsageByIdParams` containing the following parameters:
   *
   * - `storeId`: The store entity id.
   *
   * - `calculationUsageId`: The CalculationUsage.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return A Store Entity Calculation Usage.
   */
  getStoreEntityCalculationUsageById(params: StoreEntityCalculationUsagesService.GetStoreEntityCalculationUsageByIdParams): __Observable<{storeId?: number, usageFlags?: number, sequence?: number, calculationCodeId?: number, calculationUsageId?: number, activeCalculationCodeCombineMethodId?: number, activeCalculationRuleCombineMethodId?: number, applyCalculationUsageMethodId?: number, summarizeCalculationUsageMethodId?: number, initializeCalculationUsageMethodId?: number, finalizeCalculationUsageMethodId?: number}> {
    return this.getStoreEntityCalculationUsageByIdResponse(params).pipe(
      __map(_r => _r.body as {storeId?: number, usageFlags?: number, sequence?: number, calculationCodeId?: number, calculationUsageId?: number, activeCalculationCodeCombineMethodId?: number, activeCalculationRuleCombineMethodId?: number, applyCalculationUsageMethodId?: number, summarizeCalculationUsageMethodId?: number, initializeCalculationUsageMethodId?: number, finalizeCalculationUsageMethodId?: number})
    );
  }

  /**
   * Delete a Store Entity Calculation Usage.
   * @param params The `StoreEntityCalculationUsagesService.DeleteStoreEntityCalculationUsageByIdParams` containing the following parameters:
   *
   * - `storeId`: The store entity id.
   *
   * - `calculationUsageId`: The CalculationUsage.
   */
  deleteStoreEntityCalculationUsageByIdResponse(params: StoreEntityCalculationUsagesService.DeleteStoreEntityCalculationUsageByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/store-entity-calculation-usages/storeId:${params.storeId},calculationUsageId:${params.calculationUsageId}`,
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
   * Delete a Store Entity Calculation Usage.
   * @param params The `StoreEntityCalculationUsagesService.DeleteStoreEntityCalculationUsageByIdParams` containing the following parameters:
   *
   * - `storeId`: The store entity id.
   *
   * - `calculationUsageId`: The CalculationUsage.
   */
  deleteStoreEntityCalculationUsageById(params: StoreEntityCalculationUsagesService.DeleteStoreEntityCalculationUsageByIdParams): __Observable<null> {
    return this.deleteStoreEntityCalculationUsageByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a Store Entity Calculation Usage.
   * @param params The `StoreEntityCalculationUsagesService.UpdateStoreEntityCalculationUsageByIdParams` containing the following parameters:
   *
   * - `StoreEntityCalculationUsage`: A Store Entity Calculation Usage.
   *
   * - `storeId`: The store entity id.
   *
   * - `calculationUsageId`: The CalculationUsage.
   */
  updateStoreEntityCalculationUsageByIdResponse(params: StoreEntityCalculationUsagesService.UpdateStoreEntityCalculationUsageByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.StoreEntityCalculationUsage;


    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/store-entity-calculation-usages/storeId:${params.storeId},calculationUsageId:${params.calculationUsageId}`,
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
   * Update a Store Entity Calculation Usage.
   * @param params The `StoreEntityCalculationUsagesService.UpdateStoreEntityCalculationUsageByIdParams` containing the following parameters:
   *
   * - `StoreEntityCalculationUsage`: A Store Entity Calculation Usage.
   *
   * - `storeId`: The store entity id.
   *
   * - `calculationUsageId`: The CalculationUsage.
   */
  updateStoreEntityCalculationUsageById(params: StoreEntityCalculationUsagesService.UpdateStoreEntityCalculationUsageByIdParams): __Observable<null> {
    return this.updateStoreEntityCalculationUsageByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module StoreEntityCalculationUsagesService {

  /**
   * Parameters for getStoreEntityCalculationUsages
   */
  export interface GetStoreEntityCalculationUsagesParams {

    /**
     * The store entity id.
     */
    storeId?: number;

    /**
     * Bit flags to control how the OrderPrepare command uses this CalculationUsage.
     */
    usageFlags?: number;

    /**
     * The OrderPrepare command uses CalculationUsage in ascending order of this Sequence attribute.
     */
    sequence?: number;

    /**
     * The default CalculationCode, of the specified CalculationUsage, for the StoreEntity.
     */
    calculationCodeId?: number;

    /**
     * The CalculationUsage.
     */
    calculationUsageId?: Array<number>;

    /**
     * The CalculationCodeCombineMethod for the StoreEntity and CalculationUsage.
     */
    activeCalculationCodeCombineMethodId?: number;

    /**
     * The CalculationRuleCombineMethod for the StoreEntity and CalculationUsage.
     */
    activeCalculationRuleCombineMethodId?: number;

    /**
     * The ApplyCalculationUsageMethod for the StoreEntity and CalculationUsage.
     */
    applyCalculationUsageMethodId?: number;

    /**
     * The SummarizeCalculationUsageMethod for the StoreEntity and CalculationUsage.
     */
    summarizeCalculationUsageMethodId?: number;

    /**
     * The InitializeCalculationUsageMethod for the StoreEntity and CalculationUsage.
     */
    initializeCalculationUsageMethodId?: number;

    /**
     * The FinalizeCalculationUsageMethod for the StoreEntity and CalculationUsage.
     */
    finalizeCalculationUsageMethodId?: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;

    /**
     * The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
     */
    fields?: string;

    /**
     * The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
     */
    expand?: string;

    /**
     * The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
     */
    sort?: string;
  }

  /**
   * Parameters for getStoreEntityCalculationUsageById
   */
  export interface GetStoreEntityCalculationUsageByIdParams {

    /**
     * The store entity id.
     */
    storeId: number;

    /**
     * The CalculationUsage.
     */
    calculationUsageId: number;

    /**
     * The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
     */
    fields?: string;

    /**
     * The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
     */
    expand?: string;

    /**
     * The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
     */
    sort?: string;
  }

  /**
   * Parameters for deleteStoreEntityCalculationUsageById
   */
  export interface DeleteStoreEntityCalculationUsageByIdParams {

    /**
     * The store entity id.
     */
    storeId: number;

    /**
     * The CalculationUsage.
     */
    calculationUsageId: number;
  }

  /**
   * Parameters for updateStoreEntityCalculationUsageById
   */
  export interface UpdateStoreEntityCalculationUsageByIdParams {

    /**
     * A Store Entity Calculation Usage.
     */
    StoreEntityCalculationUsage: {storeId?: number, usageFlags?: number, sequence?: number, calculationCodeId?: number, calculationUsageId?: number, activeCalculationCodeCombineMethodId?: number, activeCalculationRuleCombineMethodId?: number, applyCalculationUsageMethodId?: number, summarizeCalculationUsageMethodId?: number, initializeCalculationUsageMethodId?: number, finalizeCalculationUsageMethodId?: number};

    /**
     * The store entity id.
     */
    storeId: number;

    /**
     * The CalculationUsage.
     */
    calculationUsageId: number;
  }
}

export { StoreEntityCalculationUsagesService }
