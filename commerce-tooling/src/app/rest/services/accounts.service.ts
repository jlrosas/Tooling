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
class AccountsService extends __BaseService {
  static readonly getAccountsPath = '/rest/admin/v2/accounts';
  static readonly createAccountPath = '/rest/admin/v2/accounts';
  static readonly getAccountByIdPath = '/rest/admin/v2/accounts/{id}';
  static readonly updateAccountPath = '/rest/admin/v2/accounts/{id}';
  static readonly deleteAccountPath = '/rest/admin/v2/accounts/{id}';
  static readonly getAccountShippingAddressesPath = '/rest/admin/v2/accounts/{accountId}/shipping-addresses';
  static readonly createAccountShippingAddressPath = '/rest/admin/v2/accounts/{accountId}/shipping-addresses';
  static readonly getAccountShippingAddressByIdPath = '/rest/admin/v2/accounts/{accountId}/shipping-addresses/{id}';
  static readonly deleteAccountShippingAddressPath = '/rest/admin/v2/accounts/{accountId}/shipping-addresses/{id}';
  static readonly getAccountShippingChargesPath = '/rest/admin/v2/accounts/{accountId}/shipping-charges';
  static readonly createAccountShippingChargePath = '/rest/admin/v2/accounts/{accountId}/shipping-charges';
  static readonly getAccountShippingChargeByIdPath = '/rest/admin/v2/accounts/{accountId}/shipping-charges/{id}';
  static readonly deleteAccountShippingChargePath = '/rest/admin/v2/accounts/{accountId}/shipping-charges/{id}';
  static readonly getAccountShippingMethodsPath = '/rest/admin/v2/accounts/{accountId}/shipping-methods';
  static readonly createAccountShippingMethodPath = '/rest/admin/v2/accounts/{accountId}/shipping-methods';
  static readonly getAccountShippingMethodByIdPath = '/rest/admin/v2/accounts/{accountId}/shipping-methods/{id}';
  static readonly deleteAccountShippingMethodPath = '/rest/admin/v2/accounts/{accountId}/shipping-methods/{id}';
  static readonly getAccountPaymentMethodsPath = '/rest/admin/v2/accounts/{accountId}/payment-methods';
  static readonly createAccountPaymentMethodPath = '/rest/admin/v2/accounts/{accountId}/payment-methods';
  static readonly getAccountPaymentMethodByIdPath = '/rest/admin/v2/accounts/{accountId}/payment-methods/{id}';
  static readonly updateAccountPaymentMethodPath = '/rest/admin/v2/accounts/{accountId}/payment-methods/{id}';
  static readonly deleteAccountPaymentMethodPath = '/rest/admin/v2/accounts/{accountId}/payment-methods/{id}';
  static readonly getAccountPurchaseOrdersPath = '/rest/admin/v2/accounts/{accountId}/purchase-orders';
  static readonly createAccountPurchaseOrderPath = '/rest/admin/v2/accounts/{accountId}/purchase-orders';
  static readonly getAccountPurchaseOrderByIdPath = '/rest/admin/v2/accounts/{accountId}/purchase-orders/{id}';
  static readonly updateAccountPurchaseOrderPath = '/rest/admin/v2/accounts/{accountId}/purchase-orders/{id}';
  static readonly deleteAccountPurchaseOrderPath = '/rest/admin/v2/accounts/{accountId}/purchase-orders/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Gets a collection of business accounts in a store.
   * @param params The `AccountsService.GetAccountsParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `searchString`: Limits search results to only include accounts with a name that matches the value of this parameter.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getAccountsResponse(params: AccountsService.GetAccountsParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/accounts`,
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
   * Gets a collection of business accounts in a store.
   * @param params The `AccountsService.GetAccountsParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `searchString`: Limits search results to only include accounts with a name that matches the value of this parameter.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getAccounts(params: AccountsService.GetAccountsParams): __Observable<any> {
    return this.getAccountsResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Create a new business account.
   * @param body The request body for account creation.
   */
  createAccountResponse(body: any): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/accounts`,
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
   * Create a new business account.
   * @param body The request body for account creation.
   */
  createAccount(body: any): __Observable<null> {
    return this.createAccountResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Finds a business account by its ID.
   * @param id The unique numeric ID for identifying the account.
   * @return The requested completed successfully.
   */
  getAccountByIdResponse(id: string): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/accounts/${id}`,
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
   * Finds a business account by its ID.
   * @param id The unique numeric ID for identifying the account.
   * @return The requested completed successfully.
   */
  getAccountById(id: string): __Observable<any> {
    return this.getAccountByIdResponse(id).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Updates an existing business account.
   * @param params The `AccountsService.UpdateAccountParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the account.
   *
   * - `body`: The request body for creating an account.
   */
  updateAccountResponse(params: AccountsService.UpdateAccountParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/accounts/${params.id}`,
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
   * Updates an existing business account.
   * @param params The `AccountsService.UpdateAccountParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the account.
   *
   * - `body`: The request body for creating an account.
   */
  updateAccount(params: AccountsService.UpdateAccountParams): __Observable<null> {
    return this.updateAccountResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Deletes an existing business account.
   * @param id The unique numeric ID for identifying the account.
   */
  deleteAccountResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/accounts/${id}`,
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
   * Deletes an existing business account.
   * @param id The unique numeric ID for identifying the account.
   */
  deleteAccount(id: string): __Observable<null> {
    return this.deleteAccountResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a collection of account shipping addresses.
   * @param params The `AccountsService.GetAccountShippingAddressesParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getAccountShippingAddressesResponse(params: AccountsService.GetAccountShippingAddressesParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/shipping-addresses`,
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
   * Gets a collection of account shipping addresses.
   * @param params The `AccountsService.GetAccountShippingAddressesParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getAccountShippingAddresses(params: AccountsService.GetAccountShippingAddressesParams): __Observable<any> {
    return this.getAccountShippingAddressesResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Create a new account shipping address.
   * @param params The `AccountsService.CreateAccountShippingAddressParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `body`: The request body for account shipping address creation.
   */
  createAccountShippingAddressResponse(params: AccountsService.CreateAccountShippingAddressParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/shipping-addresses`,
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
   * Create a new account shipping address.
   * @param params The `AccountsService.CreateAccountShippingAddressParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `body`: The request body for account shipping address creation.
   */
  createAccountShippingAddress(params: AccountsService.CreateAccountShippingAddressParams): __Observable<null> {
    return this.createAccountShippingAddressResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets an account shipping address by its ID.
   * @param params The `AccountsService.GetAccountShippingAddressByIdParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account shipping address.
   *
   * @return The requested completed successfully.
   */
  getAccountShippingAddressByIdResponse(params: AccountsService.GetAccountShippingAddressByIdParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/shipping-addresses/${params.id}`,
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
   * Gets an account shipping address by its ID.
   * @param params The `AccountsService.GetAccountShippingAddressByIdParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account shipping address.
   *
   * @return The requested completed successfully.
   */
  getAccountShippingAddressById(params: AccountsService.GetAccountShippingAddressByIdParams): __Observable<any> {
    return this.getAccountShippingAddressByIdResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Deletes an existing account shipping address.
   * @param params The `AccountsService.DeleteAccountShippingAddressParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account shipping address.
   */
  deleteAccountShippingAddressResponse(params: AccountsService.DeleteAccountShippingAddressParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/shipping-addresses/${params.id}`,
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
   * Deletes an existing account shipping address.
   * @param params The `AccountsService.DeleteAccountShippingAddressParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account shipping address.
   */
  deleteAccountShippingAddress(params: AccountsService.DeleteAccountShippingAddressParams): __Observable<null> {
    return this.deleteAccountShippingAddressResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a collection of account shipping charges.
   * @param params The `AccountsService.GetAccountShippingChargesParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getAccountShippingChargesResponse(params: AccountsService.GetAccountShippingChargesParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/shipping-charges`,
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
   * Gets a collection of account shipping charges.
   * @param params The `AccountsService.GetAccountShippingChargesParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getAccountShippingCharges(params: AccountsService.GetAccountShippingChargesParams): __Observable<any> {
    return this.getAccountShippingChargesResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Create a new account shipping charge.
   * @param params The `AccountsService.CreateAccountShippingChargeParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `body`: The request body for account shipping charge creation.
   */
  createAccountShippingChargeResponse(params: AccountsService.CreateAccountShippingChargeParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/shipping-charges`,
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
   * Create a new account shipping charge.
   * @param params The `AccountsService.CreateAccountShippingChargeParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `body`: The request body for account shipping charge creation.
   */
  createAccountShippingCharge(params: AccountsService.CreateAccountShippingChargeParams): __Observable<null> {
    return this.createAccountShippingChargeResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets an account shipping charge by its ID.
   * @param params The `AccountsService.GetAccountShippingChargeByIdParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account shipping charge.
   *
   * @return The requested completed successfully.
   */
  getAccountShippingChargeByIdResponse(params: AccountsService.GetAccountShippingChargeByIdParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/shipping-charges/${params.id}`,
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
   * Gets an account shipping charge by its ID.
   * @param params The `AccountsService.GetAccountShippingChargeByIdParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account shipping charge.
   *
   * @return The requested completed successfully.
   */
  getAccountShippingChargeById(params: AccountsService.GetAccountShippingChargeByIdParams): __Observable<any> {
    return this.getAccountShippingChargeByIdResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Deletes an existing account shipping charge.
   * @param params The `AccountsService.DeleteAccountShippingChargeParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account shipping charge.
   */
  deleteAccountShippingChargeResponse(params: AccountsService.DeleteAccountShippingChargeParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/shipping-charges/${params.id}`,
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
   * Deletes an existing account shipping charge.
   * @param params The `AccountsService.DeleteAccountShippingChargeParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account shipping charge.
   */
  deleteAccountShippingCharge(params: AccountsService.DeleteAccountShippingChargeParams): __Observable<null> {
    return this.deleteAccountShippingChargeResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a collection of account shipping methods.
   * @param params The `AccountsService.GetAccountShippingMethodsParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getAccountShippingMethodsResponse(params: AccountsService.GetAccountShippingMethodsParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/shipping-methods`,
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
   * Gets a collection of account shipping methods.
   * @param params The `AccountsService.GetAccountShippingMethodsParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getAccountShippingMethods(params: AccountsService.GetAccountShippingMethodsParams): __Observable<any> {
    return this.getAccountShippingMethodsResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Create a new account shipping method.
   * @param params The `AccountsService.CreateAccountShippingMethodParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `body`: The request body for account shipping method creation.
   */
  createAccountShippingMethodResponse(params: AccountsService.CreateAccountShippingMethodParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/shipping-methods`,
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
   * Create a new account shipping method.
   * @param params The `AccountsService.CreateAccountShippingMethodParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `body`: The request body for account shipping method creation.
   */
  createAccountShippingMethod(params: AccountsService.CreateAccountShippingMethodParams): __Observable<null> {
    return this.createAccountShippingMethodResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets an account shipping method by its ID.
   * @param params The `AccountsService.GetAccountShippingMethodByIdParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account shipping method.
   *
   * @return The requested completed successfully.
   */
  getAccountShippingMethodByIdResponse(params: AccountsService.GetAccountShippingMethodByIdParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/shipping-methods/${params.id}`,
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
   * Gets an account shipping method by its ID.
   * @param params The `AccountsService.GetAccountShippingMethodByIdParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account shipping method.
   *
   * @return The requested completed successfully.
   */
  getAccountShippingMethodById(params: AccountsService.GetAccountShippingMethodByIdParams): __Observable<any> {
    return this.getAccountShippingMethodByIdResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Deletes an existing account shipping method.
   * @param params The `AccountsService.DeleteAccountShippingMethodParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account shipping method.
   */
  deleteAccountShippingMethodResponse(params: AccountsService.DeleteAccountShippingMethodParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/shipping-methods/${params.id}`,
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
   * Deletes an existing account shipping method.
   * @param params The `AccountsService.DeleteAccountShippingMethodParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account shipping method.
   */
  deleteAccountShippingMethod(params: AccountsService.DeleteAccountShippingMethodParams): __Observable<null> {
    return this.deleteAccountShippingMethodResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a collection of account payment methods.
   * @param params The `AccountsService.GetAccountPaymentMethodsParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getAccountPaymentMethodsResponse(params: AccountsService.GetAccountPaymentMethodsParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/payment-methods`,
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
   * Gets a collection of account payment methods.
   * @param params The `AccountsService.GetAccountPaymentMethodsParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getAccountPaymentMethods(params: AccountsService.GetAccountPaymentMethodsParams): __Observable<any> {
    return this.getAccountPaymentMethodsResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Create a new account payment method.
   * @param params The `AccountsService.CreateAccountPaymentMethodParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `body`: The request body for account payment method creation.
   */
  createAccountPaymentMethodResponse(params: AccountsService.CreateAccountPaymentMethodParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/payment-methods`,
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
   * Create a new account payment method.
   * @param params The `AccountsService.CreateAccountPaymentMethodParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `body`: The request body for account payment method creation.
   */
  createAccountPaymentMethod(params: AccountsService.CreateAccountPaymentMethodParams): __Observable<null> {
    return this.createAccountPaymentMethodResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets an account payment method by its ID.
   * @param params The `AccountsService.GetAccountPaymentMethodByIdParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account payment method.
   *
   * @return The requested completed successfully.
   */
  getAccountPaymentMethodByIdResponse(params: AccountsService.GetAccountPaymentMethodByIdParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/payment-methods/${params.id}`,
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
   * Gets an account payment method by its ID.
   * @param params The `AccountsService.GetAccountPaymentMethodByIdParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account payment method.
   *
   * @return The requested completed successfully.
   */
  getAccountPaymentMethodById(params: AccountsService.GetAccountPaymentMethodByIdParams): __Observable<any> {
    return this.getAccountPaymentMethodByIdResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Updates an existing account payment method.
   * @param params The `AccountsService.UpdateAccountPaymentMethodParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account payment method.
   *
   * - `body`: The request body for creating an account payment method.
   */
  updateAccountPaymentMethodResponse(params: AccountsService.UpdateAccountPaymentMethodParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/payment-methods/${params.id}`,
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
   * Updates an existing account payment method.
   * @param params The `AccountsService.UpdateAccountPaymentMethodParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account payment method.
   *
   * - `body`: The request body for creating an account payment method.
   */
  updateAccountPaymentMethod(params: AccountsService.UpdateAccountPaymentMethodParams): __Observable<null> {
    return this.updateAccountPaymentMethodResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Deletes an existing account payment method.
   * @param params The `AccountsService.DeleteAccountPaymentMethodParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account payment method.
   */
  deleteAccountPaymentMethodResponse(params: AccountsService.DeleteAccountPaymentMethodParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/payment-methods/${params.id}`,
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
   * Deletes an existing account payment method.
   * @param params The `AccountsService.DeleteAccountPaymentMethodParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account payment method.
   */
  deleteAccountPaymentMethod(params: AccountsService.DeleteAccountPaymentMethodParams): __Observable<null> {
    return this.deleteAccountPaymentMethodResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a collection of account purchase orders.
   * @param params The `AccountsService.GetAccountPurchaseOrdersParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getAccountPurchaseOrdersResponse(params: AccountsService.GetAccountPurchaseOrdersParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/purchase-orders`,
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
   * Gets a collection of account purchase orders.
   * @param params The `AccountsService.GetAccountPurchaseOrdersParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getAccountPurchaseOrders(params: AccountsService.GetAccountPurchaseOrdersParams): __Observable<any> {
    return this.getAccountPurchaseOrdersResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Create a new account purchase order.
   * @param params The `AccountsService.CreateAccountPurchaseOrderParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `body`: The request body for account purchase order creation.
   */
  createAccountPurchaseOrderResponse(params: AccountsService.CreateAccountPurchaseOrderParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/purchase-orders`,
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
   * Create a new account purchase order.
   * @param params The `AccountsService.CreateAccountPurchaseOrderParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `body`: The request body for account purchase order creation.
   */
  createAccountPurchaseOrder(params: AccountsService.CreateAccountPurchaseOrderParams): __Observable<null> {
    return this.createAccountPurchaseOrderResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets an account purchase order by its ID.
   * @param params The `AccountsService.GetAccountPurchaseOrderByIdParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account purchase orders.
   *
   * @return The requested completed successfully.
   */
  getAccountPurchaseOrderByIdResponse(params: AccountsService.GetAccountPurchaseOrderByIdParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/purchase-orders/${params.id}`,
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
   * Gets an account purchase order by its ID.
   * @param params The `AccountsService.GetAccountPurchaseOrderByIdParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account purchase orders.
   *
   * @return The requested completed successfully.
   */
  getAccountPurchaseOrderById(params: AccountsService.GetAccountPurchaseOrderByIdParams): __Observable<any> {
    return this.getAccountPurchaseOrderByIdResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Updates an existing account purchase order.
   * @param params The `AccountsService.UpdateAccountPurchaseOrderParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account purchase order.
   *
   * - `id`: The unique numeric ID for identifying the account purchase order.
   *
   * - `body`: The request body for creating an account purchase order.
   */
  updateAccountPurchaseOrderResponse(params: AccountsService.UpdateAccountPurchaseOrderParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/purchase-orders/${params.id}`,
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
   * Updates an existing account purchase order.
   * @param params The `AccountsService.UpdateAccountPurchaseOrderParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account purchase order.
   *
   * - `id`: The unique numeric ID for identifying the account purchase order.
   *
   * - `body`: The request body for creating an account purchase order.
   */
  updateAccountPurchaseOrder(params: AccountsService.UpdateAccountPurchaseOrderParams): __Observable<null> {
    return this.updateAccountPurchaseOrderResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Deletes an existing account purchase order.
   * @param params The `AccountsService.DeleteAccountPurchaseOrderParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account purchase order.
   */
  deleteAccountPurchaseOrderResponse(params: AccountsService.DeleteAccountPurchaseOrderParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/accounts/${params.accountId}/purchase-orders/${params.id}`,
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
   * Deletes an existing account purchase order.
   * @param params The `AccountsService.DeleteAccountPurchaseOrderParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the account.
   *
   * - `id`: The unique numeric ID for identifying the account purchase order.
   */
  deleteAccountPurchaseOrder(params: AccountsService.DeleteAccountPurchaseOrderParams): __Observable<null> {
    return this.deleteAccountPurchaseOrderResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module AccountsService {

  /**
   * Parameters for getAccounts
   */
  export interface GetAccountsParams {

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId: number;

    /**
     * Limits search results to only include accounts with a name that matches the value of this parameter.
     */
    searchString?: string;

    /**
     * The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
     */
    sort?: string;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for updateAccount
   */
  export interface UpdateAccountParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    id: string;

    /**
     * The request body for creating an account.
     */
    body: any;
  }

  /**
   * Parameters for getAccountShippingAddresses
   */
  export interface GetAccountShippingAddressesParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for createAccountShippingAddress
   */
  export interface CreateAccountShippingAddressParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The request body for account shipping address creation.
     */
    body: any;
  }

  /**
   * Parameters for getAccountShippingAddressById
   */
  export interface GetAccountShippingAddressByIdParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The unique numeric ID for identifying the account shipping address.
     */
    id: string;
  }

  /**
   * Parameters for deleteAccountShippingAddress
   */
  export interface DeleteAccountShippingAddressParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The unique numeric ID for identifying the account shipping address.
     */
    id: string;
  }

  /**
   * Parameters for getAccountShippingCharges
   */
  export interface GetAccountShippingChargesParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for createAccountShippingCharge
   */
  export interface CreateAccountShippingChargeParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The request body for account shipping charge creation.
     */
    body: any;
  }

  /**
   * Parameters for getAccountShippingChargeById
   */
  export interface GetAccountShippingChargeByIdParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The unique numeric ID for identifying the account shipping charge.
     */
    id: string;
  }

  /**
   * Parameters for deleteAccountShippingCharge
   */
  export interface DeleteAccountShippingChargeParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The unique numeric ID for identifying the account shipping charge.
     */
    id: string;
  }

  /**
   * Parameters for getAccountShippingMethods
   */
  export interface GetAccountShippingMethodsParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for createAccountShippingMethod
   */
  export interface CreateAccountShippingMethodParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The request body for account shipping method creation.
     */
    body: any;
  }

  /**
   * Parameters for getAccountShippingMethodById
   */
  export interface GetAccountShippingMethodByIdParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The unique numeric ID for identifying the account shipping method.
     */
    id: string;
  }

  /**
   * Parameters for deleteAccountShippingMethod
   */
  export interface DeleteAccountShippingMethodParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The unique numeric ID for identifying the account shipping method.
     */
    id: string;
  }

  /**
   * Parameters for getAccountPaymentMethods
   */
  export interface GetAccountPaymentMethodsParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for createAccountPaymentMethod
   */
  export interface CreateAccountPaymentMethodParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The request body for account payment method creation.
     */
    body: any;
  }

  /**
   * Parameters for getAccountPaymentMethodById
   */
  export interface GetAccountPaymentMethodByIdParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The unique numeric ID for identifying the account payment method.
     */
    id: string;
  }

  /**
   * Parameters for updateAccountPaymentMethod
   */
  export interface UpdateAccountPaymentMethodParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The unique numeric ID for identifying the account payment method.
     */
    id: string;

    /**
     * The request body for creating an account payment method.
     */
    body: any;
  }

  /**
   * Parameters for deleteAccountPaymentMethod
   */
  export interface DeleteAccountPaymentMethodParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The unique numeric ID for identifying the account payment method.
     */
    id: string;
  }

  /**
   * Parameters for getAccountPurchaseOrders
   */
  export interface GetAccountPurchaseOrdersParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
     */
    offset?: number;

    /**
     * The maximum number of records to return.
     */
    limit?: number;
  }

  /**
   * Parameters for createAccountPurchaseOrder
   */
  export interface CreateAccountPurchaseOrderParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The request body for account purchase order creation.
     */
    body: any;
  }

  /**
   * Parameters for getAccountPurchaseOrderById
   */
  export interface GetAccountPurchaseOrderByIdParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The unique numeric ID for identifying the account purchase orders.
     */
    id: string;
  }

  /**
   * Parameters for updateAccountPurchaseOrder
   */
  export interface UpdateAccountPurchaseOrderParams {

    /**
     * The unique numeric ID for identifying the account purchase order.
     */
    accountId: string;

    /**
     * The unique numeric ID for identifying the account purchase order.
     */
    id: string;

    /**
     * The request body for creating an account purchase order.
     */
    body: any;
  }

  /**
   * Parameters for deleteAccountPurchaseOrder
   */
  export interface DeleteAccountPurchaseOrderParams {

    /**
     * The unique numeric ID for identifying the account.
     */
    accountId: string;

    /**
     * The unique numeric ID for identifying the account purchase order.
     */
    id: string;
  }
}

export { AccountsService }
