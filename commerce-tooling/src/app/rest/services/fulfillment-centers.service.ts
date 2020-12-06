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
class FulfillmentCentersService extends __BaseService {
  static readonly getFulfillmentCentersPath = '/rest/admin/v2/fulfillment-centers';
  static readonly createFulfillmentCenterPath = '/rest/admin/v2/fulfillment-centers';
  static readonly getFulfillmentCenterByIdPath = '/rest/admin/v2/fulfillment-centers/{id}';
  static readonly deleteFulfillmentCenterByIdPath = '/rest/admin/v2/fulfillment-centers/{id}';
  static readonly updateFulfillmentCenterByIdPath = '/rest/admin/v2/fulfillment-centers/{id}';
  static readonly getFulfillmentCenterDescriptionsOfFulfillmentCenterPath = '/rest/admin/v2/fulfillment-centers/{id}/fulfillment-center-descriptions';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of fulfillment centers.
   * @param params The `FulfillmentCentersService.GetFulfillmentCentersParams` containing the following parameters:
   *
   * - `searchString`: Limits search results to only include fulfillment centers with a name that matches the value of this parameter. Searches are case-insensitive.
   *
   * - `id`: The fulfillment center ID.
   *
   * - `storeId`: The store ID.
   *
   * - `memberId`: The owning organization ID.
   *
   * - `name`: A string that, along with the owner, uniquely identifies this fulfillment center.
   *
   * - `defaultShipOffset`: An estimate of the number seconds it takes for an item to be shipped from this fulfillment center.
   *
   * - `markForDelete`: Indicates whether the fulfillment center should be deleted as follows, 0 = do not delete. 1 = delete if no longer in use. Refer to the Database Cleanup utility.
   *
   * - `externalFulfillmentStoreNumber`: A reference number that can be used to locate a store or external fulfillment system.
   *
   * - `inventoryOperationFlags`: Contains bit flags indicating how to perform inventory operations. Enter an integer that is the sum of the number of the flags that you want to turn on. Example, Enter "3" to turn on flags 1 and 2. 1 = multiItem - operations accept multiple order items. 2 = noCheck - inventory is never checked (the check operation always appears to succeed). 4 = noAllocation - the allocate operation checks inventory, but does not actually allocate it (the allocate operation appears to succeed if the check succeeds). 8 = noBackorder - inventory is never backordered (the backorder operation always fails).
   *
   * - `maxNumPick`: The maximum number of the releases per pick batch.
   *
   * - `pickDelayInMin`: The delay in minutes from the time an order is placed until one of its releases can be included.
   *
   * - `dropShip`: Indicates whether the fulfillment center is a drop-ship fulfillment center. Y means that it is. N indicates that it is not.
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
   * @return A collection of fulfillment centers.
   */
  getFulfillmentCentersResponse(params: FulfillmentCentersService.GetFulfillmentCentersParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: number, memberId?: string, name?: string, defaultShipOffset?: number, markForDelete?: number, externalFulfillmentStoreNumber?: string, inventoryOperationFlags?: number, maxNumPick?: number, pickDelayInMin?: number, dropShip?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    (params.id || []).forEach(val => {if (val != null) __params = __params.append('id', val.toString())});
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.memberId != null) __params = __params.set('memberId', params.memberId.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.defaultShipOffset != null) __params = __params.set('defaultShipOffset', params.defaultShipOffset.toString());
    if (params.markForDelete != null) __params = __params.set('markForDelete', params.markForDelete.toString());
    if (params.externalFulfillmentStoreNumber != null) __params = __params.set('externalFulfillmentStoreNumber', params.externalFulfillmentStoreNumber.toString());
    if (params.inventoryOperationFlags != null) __params = __params.set('inventoryOperationFlags', params.inventoryOperationFlags.toString());
    if (params.maxNumPick != null) __params = __params.set('maxNumPick', params.maxNumPick.toString());
    if (params.pickDelayInMin != null) __params = __params.set('pickDelayInMin', params.pickDelayInMin.toString());
    if (params.dropShip != null) __params = __params.set('dropShip', params.dropShip.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/fulfillment-centers`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: number, memberId?: string, name?: string, defaultShipOffset?: number, markForDelete?: number, externalFulfillmentStoreNumber?: string, inventoryOperationFlags?: number, maxNumPick?: number, pickDelayInMin?: number, dropShip?: string}>}>;
      })
    );
  }

  /**
   * Get a collection of fulfillment centers.
   * @param params The `FulfillmentCentersService.GetFulfillmentCentersParams` containing the following parameters:
   *
   * - `searchString`: Limits search results to only include fulfillment centers with a name that matches the value of this parameter. Searches are case-insensitive.
   *
   * - `id`: The fulfillment center ID.
   *
   * - `storeId`: The store ID.
   *
   * - `memberId`: The owning organization ID.
   *
   * - `name`: A string that, along with the owner, uniquely identifies this fulfillment center.
   *
   * - `defaultShipOffset`: An estimate of the number seconds it takes for an item to be shipped from this fulfillment center.
   *
   * - `markForDelete`: Indicates whether the fulfillment center should be deleted as follows, 0 = do not delete. 1 = delete if no longer in use. Refer to the Database Cleanup utility.
   *
   * - `externalFulfillmentStoreNumber`: A reference number that can be used to locate a store or external fulfillment system.
   *
   * - `inventoryOperationFlags`: Contains bit flags indicating how to perform inventory operations. Enter an integer that is the sum of the number of the flags that you want to turn on. Example, Enter "3" to turn on flags 1 and 2. 1 = multiItem - operations accept multiple order items. 2 = noCheck - inventory is never checked (the check operation always appears to succeed). 4 = noAllocation - the allocate operation checks inventory, but does not actually allocate it (the allocate operation appears to succeed if the check succeeds). 8 = noBackorder - inventory is never backordered (the backorder operation always fails).
   *
   * - `maxNumPick`: The maximum number of the releases per pick batch.
   *
   * - `pickDelayInMin`: The delay in minutes from the time an order is placed until one of its releases can be included.
   *
   * - `dropShip`: Indicates whether the fulfillment center is a drop-ship fulfillment center. Y means that it is. N indicates that it is not.
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
   * @return A collection of fulfillment centers.
   */
  getFulfillmentCenters(params: FulfillmentCentersService.GetFulfillmentCentersParams): __Observable<{count?: number, items?: Array<{id?: number, memberId?: string, name?: string, defaultShipOffset?: number, markForDelete?: number, externalFulfillmentStoreNumber?: string, inventoryOperationFlags?: number, maxNumPick?: number, pickDelayInMin?: number, dropShip?: string}>}> {
    return this.getFulfillmentCentersResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: number, memberId?: string, name?: string, defaultShipOffset?: number, markForDelete?: number, externalFulfillmentStoreNumber?: string, inventoryOperationFlags?: number, maxNumPick?: number, pickDelayInMin?: number, dropShip?: string}>})
    );
  }

  /**
   * Create a fulfillment center.
   * @param FulfillmentCenter Fulfillment center.
   */
  createFulfillmentCenterResponse(FulfillmentCenter: {id?: number, memberId?: string, name?: string, defaultShipOffset?: number, markForDelete?: number, externalFulfillmentStoreNumber?: string, inventoryOperationFlags?: number, maxNumPick?: number, pickDelayInMin?: number, dropShip?: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FulfillmentCenter;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/fulfillment-centers`,
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
   * Create a fulfillment center.
   * @param FulfillmentCenter Fulfillment center.
   */
  createFulfillmentCenter(FulfillmentCenter: {id?: number, memberId?: string, name?: string, defaultShipOffset?: number, markForDelete?: number, externalFulfillmentStoreNumber?: string, inventoryOperationFlags?: number, maxNumPick?: number, pickDelayInMin?: number, dropShip?: string}): __Observable<null> {
    return this.createFulfillmentCenterResponse(FulfillmentCenter).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a fulfillment center.
   * @param params The `FulfillmentCentersService.GetFulfillmentCenterByIdParams` containing the following parameters:
   *
   * - `id`: The fulfillment center ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Fulfillment center.
   */
  getFulfillmentCenterByIdResponse(params: FulfillmentCentersService.GetFulfillmentCenterByIdParams): __Observable<__StrictHttpResponse<{id?: number, memberId?: string, name?: string, defaultShipOffset?: number, markForDelete?: number, externalFulfillmentStoreNumber?: string, inventoryOperationFlags?: number, maxNumPick?: number, pickDelayInMin?: number, dropShip?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/fulfillment-centers/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{id?: number, memberId?: string, name?: string, defaultShipOffset?: number, markForDelete?: number, externalFulfillmentStoreNumber?: string, inventoryOperationFlags?: number, maxNumPick?: number, pickDelayInMin?: number, dropShip?: string}>;
      })
    );
  }

  /**
   * Get a fulfillment center.
   * @param params The `FulfillmentCentersService.GetFulfillmentCenterByIdParams` containing the following parameters:
   *
   * - `id`: The fulfillment center ID.
   *
   * - `fields`: The comma-separated set of properties to be returned. If no properties are specified, all properties are returned.
   *
   * - `expand`: The comma-separated set of related resources referenced in the links to be returned. If no related resources are specified, no related resources are returned.
   *
   * - `sort`: The comma-separated set of properties which controls the order of the items being listed, prefixed by either (-) to sort by descending order, or optionally (+) to sort by ascending order. For example, sort=name,-d which means, order the items based on the name value in ascending order, then by the id value in descending order.
   *
   * @return Fulfillment center.
   */
  getFulfillmentCenterById(params: FulfillmentCentersService.GetFulfillmentCenterByIdParams): __Observable<{id?: number, memberId?: string, name?: string, defaultShipOffset?: number, markForDelete?: number, externalFulfillmentStoreNumber?: string, inventoryOperationFlags?: number, maxNumPick?: number, pickDelayInMin?: number, dropShip?: string}> {
    return this.getFulfillmentCenterByIdResponse(params).pipe(
      __map(_r => _r.body as {id?: number, memberId?: string, name?: string, defaultShipOffset?: number, markForDelete?: number, externalFulfillmentStoreNumber?: string, inventoryOperationFlags?: number, maxNumPick?: number, pickDelayInMin?: number, dropShip?: string})
    );
  }

  /**
   * Delete a fulfillment center.
   * @param id The fulfillment center ID.
   */
  deleteFulfillmentCenterByIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/fulfillment-centers/${id}`,
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
   * Delete a fulfillment center.
   * @param id The fulfillment center ID.
   */
  deleteFulfillmentCenterById(id: number): __Observable<null> {
    return this.deleteFulfillmentCenterByIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update a fulfillment center.
   * @param params The `FulfillmentCentersService.UpdateFulfillmentCenterByIdParams` containing the following parameters:
   *
   * - `FulfillmentCenter`: Fulfillment center.
   *
   * - `id`: The fulfillment center ID.
   */
  updateFulfillmentCenterByIdResponse(params: FulfillmentCentersService.UpdateFulfillmentCenterByIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.FulfillmentCenter;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/fulfillment-centers/${params.id}`,
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
   * Update a fulfillment center.
   * @param params The `FulfillmentCentersService.UpdateFulfillmentCenterByIdParams` containing the following parameters:
   *
   * - `FulfillmentCenter`: Fulfillment center.
   *
   * - `id`: The fulfillment center ID.
   */
  updateFulfillmentCenterById(params: FulfillmentCentersService.UpdateFulfillmentCenterByIdParams): __Observable<null> {
    return this.updateFulfillmentCenterByIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `FulfillmentCentersService.GetFulfillmentCenterDescriptionsOfFulfillmentCenterParams` containing the following parameters:
   *
   * - `id`: The fulfillment center ID.
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
   * @return A collection of fulfillment center descriptions.
   */
  getFulfillmentCenterDescriptionsOfFulfillmentCenterResponse(params: FulfillmentCentersService.GetFulfillmentCenterDescriptionsOfFulfillmentCenterParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{fulfillmentCenterId?: number, displayName?: string, description?: string, storeAddressId?: number, languageId?: number}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.fields != null) __params = __params.set('fields', params.fields.toString());
    if (params.expand != null) __params = __params.set('expand', params.expand.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/fulfillment-centers/${params.id}/fulfillment-center-descriptions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{fulfillmentCenterId?: number, displayName?: string, description?: string, storeAddressId?: number, languageId?: number}>}>;
      })
    );
  }

  /**
   * @param params The `FulfillmentCentersService.GetFulfillmentCenterDescriptionsOfFulfillmentCenterParams` containing the following parameters:
   *
   * - `id`: The fulfillment center ID.
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
   * @return A collection of fulfillment center descriptions.
   */
  getFulfillmentCenterDescriptionsOfFulfillmentCenter(params: FulfillmentCentersService.GetFulfillmentCenterDescriptionsOfFulfillmentCenterParams): __Observable<{count?: number, items?: Array<{fulfillmentCenterId?: number, displayName?: string, description?: string, storeAddressId?: number, languageId?: number}>}> {
    return this.getFulfillmentCenterDescriptionsOfFulfillmentCenterResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{fulfillmentCenterId?: number, displayName?: string, description?: string, storeAddressId?: number, languageId?: number}>})
    );
  }
}

module FulfillmentCentersService {

  /**
   * Parameters for getFulfillmentCenters
   */
  export interface GetFulfillmentCentersParams {

    /**
     * Limits search results to only include fulfillment centers with a name that matches the value of this parameter. Searches are case-insensitive.
     */
    searchString?: string;

    /**
     * The fulfillment center ID.
     */
    id?: Array<number>;

    /**
     * The store ID.
     */
    storeId?: number;

    /**
     * The owning organization ID.
     */
    memberId?: string;

    /**
     * A string that, along with the owner, uniquely identifies this fulfillment center.
     */
    name?: string;

    /**
     * An estimate of the number seconds it takes for an item to be shipped from this fulfillment center.
     */
    defaultShipOffset?: number;

    /**
     * Indicates whether the fulfillment center should be deleted as follows, 0 = do not delete. 1 = delete if no longer in use. Refer to the Database Cleanup utility.
     */
    markForDelete?: number;

    /**
     * A reference number that can be used to locate a store or external fulfillment system.
     */
    externalFulfillmentStoreNumber?: string;

    /**
     * Contains bit flags indicating how to perform inventory operations. Enter an integer that is the sum of the number of the flags that you want to turn on. Example, Enter "3" to turn on flags 1 and 2. 1 = multiItem - operations accept multiple order items. 2 = noCheck - inventory is never checked (the check operation always appears to succeed). 4 = noAllocation - the allocate operation checks inventory, but does not actually allocate it (the allocate operation appears to succeed if the check succeeds). 8 = noBackorder - inventory is never backordered (the backorder operation always fails).
     */
    inventoryOperationFlags?: number;

    /**
     * The maximum number of the releases per pick batch.
     */
    maxNumPick?: number;

    /**
     * The delay in minutes from the time an order is placed until one of its releases can be included.
     */
    pickDelayInMin?: number;

    /**
     * Indicates whether the fulfillment center is a drop-ship fulfillment center. Y means that it is. N indicates that it is not.
     */
    dropShip?: string;

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
   * Parameters for getFulfillmentCenterById
   */
  export interface GetFulfillmentCenterByIdParams {

    /**
     * The fulfillment center ID.
     */
    id: number;

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
   * Parameters for updateFulfillmentCenterById
   */
  export interface UpdateFulfillmentCenterByIdParams {

    /**
     * Fulfillment center.
     */
    FulfillmentCenter: {id?: number, memberId?: string, name?: string, defaultShipOffset?: number, markForDelete?: number, externalFulfillmentStoreNumber?: string, inventoryOperationFlags?: number, maxNumPick?: number, pickDelayInMin?: number, dropShip?: string};

    /**
     * The fulfillment center ID.
     */
    id: number;
  }

  /**
   * Parameters for getFulfillmentCenterDescriptionsOfFulfillmentCenter
   */
  export interface GetFulfillmentCenterDescriptionsOfFulfillmentCenterParams {

    /**
     * The fulfillment center ID.
     */
    id: number;

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
}

export { FulfillmentCentersService }
