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
class OrderItemsService extends __BaseService {
  static readonly createOrderItemPath = '/rest/admin/v2/order-items';
  static readonly updateOrderItemPath = '/rest/admin/v2/order-items/{id}';
  static readonly deleteOrderItemPath = '/rest/admin/v2/order-items/{id}';
  static readonly getOrderItemByIdPath = '/rest/admin/v2/order-items/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Create a new order item.
   * @param params The `OrderItemsService.CreateOrderItemParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  createOrderItemResponse(params: OrderItemsService.CreateOrderItemParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/order-items`,
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
   * Create a new order item.
   * @param params The `OrderItemsService.CreateOrderItemParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  createOrderItem(params: OrderItemsService.CreateOrderItemParams): __Observable<null> {
    return this.createOrderItemResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Update an existing order item by its ID.
   * @param params The `OrderItemsService.UpdateOrderItemParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order item.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body for creating an order item.
   */
  updateOrderItemResponse(params: OrderItemsService.UpdateOrderItemParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/order-items/${params.id}`,
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
   * Update an existing order item by its ID.
   * @param params The `OrderItemsService.UpdateOrderItemParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order item.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: The request body for creating an order item.
   */
  updateOrderItem(params: OrderItemsService.UpdateOrderItemParams): __Observable<null> {
    return this.updateOrderItemResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Delete an order item by ID
   * @param params The `OrderItemsService.DeleteOrderItemParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order item.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteOrderItemResponse(params: OrderItemsService.DeleteOrderItemParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/order-items/${params.id}`,
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
   * Delete an order item by ID
   * @param params The `OrderItemsService.DeleteOrderItemParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order item.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteOrderItem(params: OrderItemsService.DeleteOrderItemParams): __Observable<null> {
    return this.deleteOrderItemResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get an order item by ID.
   * @param id The unique numeric ID for identifying the order item.
   * @return The requested completed successfully.
   */
  getOrderItemByIdResponse(id: string): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/order-items/${id}`,
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
   * Get an order item by ID.
   * @param id The unique numeric ID for identifying the order item.
   * @return The requested completed successfully.
   */
  getOrderItemById(id: string): __Observable<any> {
    return this.getOrderItemByIdResponse(id).pipe(
      __map(_r => _r.body as any)
    );
  }
}

module OrderItemsService {

  /**
   * Parameters for createOrderItem
   */
  export interface CreateOrderItemParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * Request body.
     */
    body: any;
  }

  /**
   * Parameters for updateOrderItem
   */
  export interface UpdateOrderItemParams {

    /**
     * The unique numeric ID for identifying the order item.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The request body for creating an order item.
     */
    body: any;
  }

  /**
   * Parameters for deleteOrderItem
   */
  export interface DeleteOrderItemParams {

    /**
     * The unique numeric ID for identifying the order item.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;
  }
}

export { OrderItemsService }
