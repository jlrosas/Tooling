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
class OrdersService extends __BaseService {
  static readonly createOrderPath = '/rest/admin/v2/orders';
  static readonly getOrdersPath = '/rest/admin/v2/orders';
  static readonly updateOrderPath = '/rest/admin/v2/orders/{id}/update-description';
  static readonly getOrderByIdPath = '/rest/admin/v2/orders/{id}';
  static readonly cancelOrderPath = '/rest/admin/v2/orders/{id}/cancel';
  static readonly getOrderItemsByOrderIdPath = '/rest/admin/v2/orders/{id}/items';
  static readonly addOrderCommentPath = '/rest/admin/v2/orders/{id}/comments';
  static readonly getOrderCommentsPath = '/rest/admin/v2/orders/{id}/comments';
  static readonly addOrderPromotionCodePath = '/rest/admin/v2/orders/{id}/add-promotion-code';
  static readonly deleteOrderPromotionCodePath = '/rest/admin/v2/orders/{id}/delete-promotion-code';
  static readonly blockOrderPath = '/rest/admin/v2/orders/{id}/block';
  static readonly unblockOrderPath = '/rest/admin/v2/orders/{id}/unblock';
  static readonly calculateOrderPath = '/rest/admin/v2/orders/{id}/calculate';
  static readonly processOrderPath = '/rest/admin/v2/orders/{id}/process';
  static readonly overrideOrderPath = '/rest/admin/v2/orders/{id}/override';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Create a new order.
   * @param params The `OrdersService.CreateOrderParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  createOrderResponse(params: OrdersService.CreateOrderParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/orders`,
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
   * Create a new order.
   * @param params The `OrdersService.CreateOrderParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  createOrder(params: OrdersService.CreateOrderParams): __Observable<null> {
    return this.createOrderResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get all the orders based on provided parameters. <BR> <BR> To search orders, at least one query parameter is required. <BR> Please note that storeId is a mandatory parameter as well. <BR> offset and limit are not the part of search order parameters.
   * @param params The `OrdersService.GetOrdersParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `userId`: The unique string ID for identifying the user.
   *
   * - `usage`: The usage specifies the search method.
   *
   * - `orderBy`: The orderBy value is used to sort the response.
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `customerLogonId`: The order owner user ID.
   *
   * - `userLogonSearchType`: The criteria for searching customerLogonId. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `orderStatus`: The status of the order.
   *
   * - `orderItemStatus`: The status of the order item.
   *
   * - `sku`: The sku.
   *
   * - `ordersNotFulFilled`: The order has not shipped.
   *
   * - `blockedStatus`: The order is blocked or not blocked.
   *
   * - `fulfillmentCenterId`: The fulfillment center ID.
   *
   * - `orderStartDateTime`: The order create start date and time.
   *
   * - `orderEndDateTime`: The order create end date and time.
   *
   * - `orderLastUpdateStartDateTime`: The order last update start date and time.
   *
   * - `orderLastUpdateEndDateTime`: The order last update end date and time.
   *
   * - `firstName`: The customer first name.
   *
   * - `firstNameSearchType`: The criteria for searching customer first name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `lastName`: The customer last name.
   *
   * - `lastNameSearchType`: The criteria for searching customer last name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `address`: The customer address.
   *
   * - `addressSearchType`: The criteria for searching customer address. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `city`: The customer city.
   *
   * - `citySearchType`: The criteria for searching customer city. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `zipCode`: The customer zip code.
   *
   * - `zipCodeSearchType`: The criteria for searching customer zip code. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `email`: The customer email address.
   *
   * - `emailSearchType`: The criteria for searching customer email address. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `phone`: The customer phone number.
   *
   * - `billFirstName`: The customer billing first name.
   *
   * - `billFirstNameSearchType`: The criteria for searching customer billing first name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `billLastName`: The customer billing last name.
   *
   * - `billLastNameSearchType`: The criteria for searching customer billing last name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `billAddress`: The customer billing address.
   *
   * - `billAddressSearchType`: The criteria for searching customer billing address. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `billCity`: The customer billing city.
   *
   * - `billCitySearchType`: The criteria for searching customer billing city. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `billZipCode`: The customer billing zip code.
   *
   * - `billZipCodeSearchType`: The criteria for searching customer billing zip code. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `shipFirstName`: The customer shipping first name.
   *
   * - `shipFirstNameSearchType`: The criteria for searching customer shipping first name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `shipLastName`: The customer shipping last name.
   *
   * - `shipLastNameSearchType`: The criteria for searching customer shipping last name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `shipAddress`: The customer shipping address.
   *
   * - `shipAddressSearchType`: The criteria for searching customer shipping address. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `shipCity`: The customer shipping city.
   *
   * - `shipCitySearchType`: The criteria for searching customer shipping city. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `shipZipCode`: The customer shipping zip code.
   *
   * - `shipZipCodeSearchType`: The criteria for searching customer shipping zip code. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * @return The requested completed successfully.
   */
  getOrdersResponse(params: OrdersService.GetOrdersParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.userId != null) __params = __params.set('userId', params.userId.toString());
    if (params.usage != null) __params = __params.set('usage', params.usage.toString());
    if (params.orderBy != null) __params = __params.set('orderBy', params.orderBy.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.customerLogonId != null) __params = __params.set('customerLogonId', params.customerLogonId.toString());
    if (params.userLogonSearchType != null) __params = __params.set('userLogonSearchType', params.userLogonSearchType.toString());
    if (params.orderStatus != null) __params = __params.set('orderStatus', params.orderStatus.toString());
    if (params.orderItemStatus != null) __params = __params.set('orderItemStatus', params.orderItemStatus.toString());
    if (params.sku != null) __params = __params.set('sku', params.sku.toString());
    if (params.ordersNotFulFilled != null) __params = __params.set('ordersNotFulFilled', params.ordersNotFulFilled.toString());
    if (params.blockedStatus != null) __params = __params.set('blockedStatus', params.blockedStatus.toString());
    if (params.fulfillmentCenterId != null) __params = __params.set('fulfillmentCenterId', params.fulfillmentCenterId.toString());
    if (params.orderStartDateTime != null) __params = __params.set('orderStartDateTime', params.orderStartDateTime.toString());
    if (params.orderEndDateTime != null) __params = __params.set('orderEndDateTime', params.orderEndDateTime.toString());
    if (params.orderLastUpdateStartDateTime != null) __params = __params.set('orderLastUpdateStartDateTime', params.orderLastUpdateStartDateTime.toString());
    if (params.orderLastUpdateEndDateTime != null) __params = __params.set('orderLastUpdateEndDateTime', params.orderLastUpdateEndDateTime.toString());
    if (params.firstName != null) __params = __params.set('firstName', params.firstName.toString());
    if (params.firstNameSearchType != null) __params = __params.set('firstNameSearchType', params.firstNameSearchType.toString());
    if (params.lastName != null) __params = __params.set('lastName', params.lastName.toString());
    if (params.lastNameSearchType != null) __params = __params.set('lastNameSearchType', params.lastNameSearchType.toString());
    if (params.address != null) __params = __params.set('address', params.address.toString());
    if (params.addressSearchType != null) __params = __params.set('addressSearchType', params.addressSearchType.toString());
    if (params.city != null) __params = __params.set('city', params.city.toString());
    if (params.citySearchType != null) __params = __params.set('citySearchType', params.citySearchType.toString());
    if (params.zipCode != null) __params = __params.set('zipCode', params.zipCode.toString());
    if (params.zipCodeSearchType != null) __params = __params.set('zipCodeSearchType', params.zipCodeSearchType.toString());
    if (params.email != null) __params = __params.set('email', params.email.toString());
    if (params.emailSearchType != null) __params = __params.set('emailSearchType', params.emailSearchType.toString());
    if (params.phone != null) __params = __params.set('phone', params.phone.toString());
    if (params.billFirstName != null) __params = __params.set('billFirstName', params.billFirstName.toString());
    if (params.billFirstNameSearchType != null) __params = __params.set('billFirstNameSearchType', params.billFirstNameSearchType.toString());
    if (params.billLastName != null) __params = __params.set('billLastName', params.billLastName.toString());
    if (params.billLastNameSearchType != null) __params = __params.set('billLastNameSearchType', params.billLastNameSearchType.toString());
    if (params.billAddress != null) __params = __params.set('billAddress', params.billAddress.toString());
    if (params.billAddressSearchType != null) __params = __params.set('billAddressSearchType', params.billAddressSearchType.toString());
    if (params.billCity != null) __params = __params.set('billCity', params.billCity.toString());
    if (params.billCitySearchType != null) __params = __params.set('billCitySearchType', params.billCitySearchType.toString());
    if (params.billZipCode != null) __params = __params.set('billZipCode', params.billZipCode.toString());
    if (params.billZipCodeSearchType != null) __params = __params.set('billZipCodeSearchType', params.billZipCodeSearchType.toString());
    if (params.shipFirstName != null) __params = __params.set('shipFirstName', params.shipFirstName.toString());
    if (params.shipFirstNameSearchType != null) __params = __params.set('shipFirstNameSearchType', params.shipFirstNameSearchType.toString());
    if (params.shipLastName != null) __params = __params.set('shipLastName', params.shipLastName.toString());
    if (params.shipLastNameSearchType != null) __params = __params.set('shipLastNameSearchType', params.shipLastNameSearchType.toString());
    if (params.shipAddress != null) __params = __params.set('shipAddress', params.shipAddress.toString());
    if (params.shipAddressSearchType != null) __params = __params.set('shipAddressSearchType', params.shipAddressSearchType.toString());
    if (params.shipCity != null) __params = __params.set('shipCity', params.shipCity.toString());
    if (params.shipCitySearchType != null) __params = __params.set('shipCitySearchType', params.shipCitySearchType.toString());
    if (params.shipZipCode != null) __params = __params.set('shipZipCode', params.shipZipCode.toString());
    if (params.shipZipCodeSearchType != null) __params = __params.set('shipZipCodeSearchType', params.shipZipCodeSearchType.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/orders`,
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
   * Get all the orders based on provided parameters. <BR> <BR> To search orders, at least one query parameter is required. <BR> Please note that storeId is a mandatory parameter as well. <BR> offset and limit are not the part of search order parameters.
   * @param params The `OrdersService.GetOrdersParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * - `userId`: The unique string ID for identifying the user.
   *
   * - `usage`: The usage specifies the search method.
   *
   * - `orderBy`: The orderBy value is used to sort the response.
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `customerLogonId`: The order owner user ID.
   *
   * - `userLogonSearchType`: The criteria for searching customerLogonId. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `orderStatus`: The status of the order.
   *
   * - `orderItemStatus`: The status of the order item.
   *
   * - `sku`: The sku.
   *
   * - `ordersNotFulFilled`: The order has not shipped.
   *
   * - `blockedStatus`: The order is blocked or not blocked.
   *
   * - `fulfillmentCenterId`: The fulfillment center ID.
   *
   * - `orderStartDateTime`: The order create start date and time.
   *
   * - `orderEndDateTime`: The order create end date and time.
   *
   * - `orderLastUpdateStartDateTime`: The order last update start date and time.
   *
   * - `orderLastUpdateEndDateTime`: The order last update end date and time.
   *
   * - `firstName`: The customer first name.
   *
   * - `firstNameSearchType`: The criteria for searching customer first name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `lastName`: The customer last name.
   *
   * - `lastNameSearchType`: The criteria for searching customer last name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `address`: The customer address.
   *
   * - `addressSearchType`: The criteria for searching customer address. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `city`: The customer city.
   *
   * - `citySearchType`: The criteria for searching customer city. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `zipCode`: The customer zip code.
   *
   * - `zipCodeSearchType`: The criteria for searching customer zip code. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `email`: The customer email address.
   *
   * - `emailSearchType`: The criteria for searching customer email address. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `phone`: The customer phone number.
   *
   * - `billFirstName`: The customer billing first name.
   *
   * - `billFirstNameSearchType`: The criteria for searching customer billing first name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `billLastName`: The customer billing last name.
   *
   * - `billLastNameSearchType`: The criteria for searching customer billing last name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `billAddress`: The customer billing address.
   *
   * - `billAddressSearchType`: The criteria for searching customer billing address. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `billCity`: The customer billing city.
   *
   * - `billCitySearchType`: The criteria for searching customer billing city. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `billZipCode`: The customer billing zip code.
   *
   * - `billZipCodeSearchType`: The criteria for searching customer billing zip code. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `shipFirstName`: The customer shipping first name.
   *
   * - `shipFirstNameSearchType`: The criteria for searching customer shipping first name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `shipLastName`: The customer shipping last name.
   *
   * - `shipLastNameSearchType`: The criteria for searching customer shipping last name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `shipAddress`: The customer shipping address.
   *
   * - `shipAddressSearchType`: The criteria for searching customer shipping address. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `shipCity`: The customer shipping city.
   *
   * - `shipCitySearchType`: The criteria for searching customer shipping city. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * - `shipZipCode`: The customer shipping zip code.
   *
   * - `shipZipCodeSearchType`: The criteria for searching customer shipping zip code. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
   *
   * @return The requested completed successfully.
   */
  getOrders(params: OrdersService.GetOrdersParams): __Observable<any> {
    return this.getOrdersResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Update an existing order by its ID.
   * @param params The `OrdersService.UpdateOrderParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  updateOrderResponse(params: OrdersService.UpdateOrderParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/orders/${params.id}/update-description`,
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
   * Update an existing order by its ID.
   * @param params The `OrdersService.UpdateOrderParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  updateOrder(params: OrdersService.UpdateOrderParams): __Observable<null> {
    return this.updateOrderResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get an order by ID.
   * @param id The unique numeric ID for identifying the order.
   * @return The requested completed successfully.
   */
  getOrderByIdResponse(id: string): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/orders/${id}`,
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
   * Get an order by ID.
   * @param id The unique numeric ID for identifying the order.
   * @return The requested completed successfully.
   */
  getOrderById(id: string): __Observable<any> {
    return this.getOrderByIdResponse(id).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Cancel an order.
   * @param params The `OrdersService.CancelOrderParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  cancelOrderResponse(params: OrdersService.CancelOrderParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/orders/${params.id}/cancel`,
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
   * Cancel an order.
   * @param params The `OrdersService.CancelOrderParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  cancelOrder(params: OrdersService.CancelOrderParams): __Observable<null> {
    return this.cancelOrderResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get all the order items by an order ID.
   * @param id The unique numeric ID for identifying the order.
   * @return The requested completed successfully.
   */
  getOrderItemsByOrderIdResponse(id: string): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/orders/${id}/items`,
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
   * Get all the order items by an order ID.
   * @param id The unique numeric ID for identifying the order.
   * @return The requested completed successfully.
   */
  getOrderItemsByOrderId(id: string): __Observable<any> {
    return this.getOrderItemsByOrderIdResponse(id).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Add a comment to an order.
   * @param params The `OrdersService.AddOrderCommentParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  addOrderCommentResponse(params: OrdersService.AddOrderCommentParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/orders/${params.id}/comments`,
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
   * Add a comment to an order.
   * @param params The `OrdersService.AddOrderCommentParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  addOrderComment(params: OrdersService.AddOrderCommentParams): __Observable<null> {
    return this.addOrderCommentResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get all the order comments by an order ID.
   * @param id The unique numeric ID for identifying the order.
   * @return The requested completed successfully.
   */
  getOrderCommentsResponse(id: string): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/orders/${id}/comments`,
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
   * Get all the order comments by an order ID.
   * @param id The unique numeric ID for identifying the order.
   * @return The requested completed successfully.
   */
  getOrderComments(id: string): __Observable<any> {
    return this.getOrderCommentsResponse(id).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Add a promotion code to an order.
   * @param params The `OrdersService.AddOrderPromotionCodeParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  addOrderPromotionCodeResponse(params: OrdersService.AddOrderPromotionCodeParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/orders/${params.id}/add-promotion-code`,
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
   * Add a promotion code to an order.
   * @param params The `OrdersService.AddOrderPromotionCodeParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  addOrderPromotionCode(params: OrdersService.AddOrderPromotionCodeParams): __Observable<null> {
    return this.addOrderPromotionCodeResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Delete a promotion code from an order.
   * @param params The `OrdersService.DeleteOrderPromotionCodeParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  deleteOrderPromotionCodeResponse(params: OrdersService.DeleteOrderPromotionCodeParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/orders/${params.id}/delete-promotion-code`,
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
   * Delete a promotion code from an order.
   * @param params The `OrdersService.DeleteOrderPromotionCodeParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  deleteOrderPromotionCode(params: OrdersService.DeleteOrderPromotionCodeParams): __Observable<null> {
    return this.deleteOrderPromotionCodeResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Block an order.
   * @param params The `OrdersService.BlockOrderParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  blockOrderResponse(params: OrdersService.BlockOrderParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/orders/${params.id}/block`,
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
   * Block an order.
   * @param params The `OrdersService.BlockOrderParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  blockOrder(params: OrdersService.BlockOrderParams): __Observable<null> {
    return this.blockOrderResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Unblock an order.
   * @param params The `OrdersService.UnblockOrderParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  unblockOrderResponse(params: OrdersService.UnblockOrderParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/orders/${params.id}/unblock`,
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
   * Unblock an order.
   * @param params The `OrdersService.UnblockOrderParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  unblockOrder(params: OrdersService.UnblockOrderParams): __Observable<null> {
    return this.unblockOrderResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Calculate an order.
   * @param params The `OrdersService.CalculateOrderParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  calculateOrderResponse(params: OrdersService.CalculateOrderParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/orders/${params.id}/calculate`,
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
   * Calculate an order.
   * @param params The `OrdersService.CalculateOrderParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  calculateOrder(params: OrdersService.CalculateOrderParams): __Observable<null> {
    return this.calculateOrderResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Process an order.
   * @param params The `OrdersService.ProcessOrderParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  processOrderResponse(params: OrdersService.ProcessOrderParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/orders/${params.id}/process`,
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
   * Process an order.
   * @param params The `OrdersService.ProcessOrderParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  processOrder(params: OrdersService.ProcessOrderParams): __Observable<null> {
    return this.processOrderResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Override order shipping charges and order adjustments.
   * @param params The `OrdersService.OverrideOrderParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  overrideOrderResponse(params: OrdersService.OverrideOrderParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/orders/${params.id}/override`,
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
   * Override order shipping charges and order adjustments.
   * @param params The `OrdersService.OverrideOrderParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the order.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `body`: Request body.
   */
  overrideOrder(params: OrdersService.OverrideOrderParams): __Observable<null> {
    return this.overrideOrderResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module OrdersService {

  /**
   * Parameters for createOrder
   */
  export interface CreateOrderParams {

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
   * Parameters for getOrders
   */
  export interface GetOrdersParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;

    /**
     * The unique string ID for identifying the user.
     */
    userId?: string;

    /**
     * The usage specifies the search method.
     */
    usage?: string;

    /**
     * The orderBy value is used to sort the response.
     */
    orderBy?: string;

    /**
     * The unique numeric ID for identifying the order.
     */
    id?: string;

    /**
     * The order owner user ID.
     */
    customerLogonId?: string;

    /**
     * The criteria for searching customerLogonId. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    userLogonSearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The status of the order.
     */
    orderStatus?: string;

    /**
     * The status of the order item.
     */
    orderItemStatus?: string;

    /**
     * The sku.
     */
    sku?: string;

    /**
     * The order has not shipped.
     */
    ordersNotFulFilled?: 'false' | 'true';

    /**
     * The order is blocked or not blocked.
     */
    blockedStatus?: 'Y' | 'N';

    /**
     * The fulfillment center ID.
     */
    fulfillmentCenterId?: number;

    /**
     * The order create start date and time.
     */
    orderStartDateTime?: string;

    /**
     * The order create end date and time.
     */
    orderEndDateTime?: string;

    /**
     * The order last update start date and time.
     */
    orderLastUpdateStartDateTime?: string;

    /**
     * The order last update end date and time.
     */
    orderLastUpdateEndDateTime?: string;

    /**
     * The customer first name.
     */
    firstName?: string;

    /**
     * The criteria for searching customer first name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    firstNameSearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer last name.
     */
    lastName?: string;

    /**
     * The criteria for searching customer last name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    lastNameSearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer address.
     */
    address?: string;

    /**
     * The criteria for searching customer address. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    addressSearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer city.
     */
    city?: string;

    /**
     * The criteria for searching customer city. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    citySearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer zip code.
     */
    zipCode?: string;

    /**
     * The criteria for searching customer zip code. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    zipCodeSearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer email address.
     */
    email?: string;

    /**
     * The criteria for searching customer email address. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    emailSearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer phone number.
     */
    phone?: string;

    /**
     * The customer billing first name.
     */
    billFirstName?: string;

    /**
     * The criteria for searching customer billing first name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    billFirstNameSearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer billing last name.
     */
    billLastName?: string;

    /**
     * The criteria for searching customer billing last name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    billLastNameSearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer billing address.
     */
    billAddress?: string;

    /**
     * The criteria for searching customer billing address. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    billAddressSearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer billing city.
     */
    billCity?: string;

    /**
     * The criteria for searching customer billing city. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    billCitySearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer billing zip code.
     */
    billZipCode?: string;

    /**
     * The criteria for searching customer billing zip code. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    billZipCodeSearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer shipping first name.
     */
    shipFirstName?: string;

    /**
     * The criteria for searching customer shipping first name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    shipFirstNameSearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer shipping last name.
     */
    shipLastName?: string;

    /**
     * The criteria for searching customer shipping last name. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    shipLastNameSearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer shipping address.
     */
    shipAddress?: string;

    /**
     * The criteria for searching customer shipping address. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    shipAddressSearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer shipping city.
     */
    shipCity?: string;

    /**
     * The criteria for searching customer shipping city. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    shipCitySearchType?: '1' | '2' | '3' | '4' | '5';

    /**
     * The customer shipping zip code.
     */
    shipZipCode?: string;

    /**
     * The criteria for searching customer shipping zip code. Available values: <br> 1 - Match case, begining with. <br> 2 - Match case, containing. <br> 3 - Ignore case, begining with . <br> 4 - Ignore case, containing. <br> 5 - Exact match.
     */
    shipZipCodeSearchType?: '1' | '2' | '3' | '4' | '5';
  }

  /**
   * Parameters for updateOrder
   */
  export interface UpdateOrderParams {

    /**
     * The unique numeric ID for identifying the order.
     */
    id: string;

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
   * Parameters for cancelOrder
   */
  export interface CancelOrderParams {

    /**
     * The unique numeric ID for identifying the order.
     */
    id: string;

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
   * Parameters for addOrderComment
   */
  export interface AddOrderCommentParams {

    /**
     * The unique numeric ID for identifying the order.
     */
    id: string;

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
   * Parameters for addOrderPromotionCode
   */
  export interface AddOrderPromotionCodeParams {

    /**
     * The unique numeric ID for identifying the order.
     */
    id: string;

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
   * Parameters for deleteOrderPromotionCode
   */
  export interface DeleteOrderPromotionCodeParams {

    /**
     * The unique numeric ID for identifying the order.
     */
    id: string;

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
   * Parameters for blockOrder
   */
  export interface BlockOrderParams {

    /**
     * The unique numeric ID for identifying the order.
     */
    id: string;

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
   * Parameters for unblockOrder
   */
  export interface UnblockOrderParams {

    /**
     * The unique numeric ID for identifying the order.
     */
    id: string;

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
   * Parameters for calculateOrder
   */
  export interface CalculateOrderParams {

    /**
     * The unique numeric ID for identifying the order.
     */
    id: string;

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
   * Parameters for processOrder
   */
  export interface ProcessOrderParams {

    /**
     * The unique numeric ID for identifying the order.
     */
    id: string;

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
   * Parameters for overrideOrder
   */
  export interface OverrideOrderParams {

    /**
     * The unique numeric ID for identifying the order.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * Request body.
     */
    body: any;
  }
}

export { OrdersService }
