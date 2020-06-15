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
class ContractsService extends __BaseService {
  static readonly getContractsPath = '/rest/admin/v2/contracts';
  static readonly createContractPath = '/rest/admin/v2/contracts';
  static readonly getContractByIdPath = '/rest/admin/v2/contracts/{id}';
  static readonly updateContractPath = '/rest/admin/v2/contracts/{id}';
  static readonly deleteContractPath = '/rest/admin/v2/contracts/{id}';
  static readonly exportContractPath = '/rest/admin/v2/contracts/{id}/export';
  static readonly importContractPath = '/rest/admin/v2/contracts/import';
  static readonly copyContractPath = '/rest/admin/v2/contracts/{id}/copy';
  static readonly submitContractPath = '/rest/admin/v2/contracts/{id}/submit';
  static readonly deployContractPath = '/rest/admin/v2/contracts/{id}/deploy';
  static readonly createNewContractVersionPath = '/rest/admin/v2/contracts/{id}/new-version';
  static readonly suspendContractPath = '/rest/admin/v2/contracts/{id}/suspend';
  static readonly resumeContractPath = '/rest/admin/v2/contracts/{id}/resume';
  static readonly cancelContractPath = '/rest/admin/v2/contracts/{id}/cancel';
  static readonly getContractBuyersPath = '/rest/admin/v2/contracts/{contractId}/buyers';
  static readonly createContractBuyerPath = '/rest/admin/v2/contracts/{contractId}/buyers';
  static readonly getContractBuyerByIdPath = '/rest/admin/v2/contracts/{contractId}/buyers/{id}';
  static readonly deleteContractBuyerPath = '/rest/admin/v2/contracts/{contractId}/buyers/{id}';
  static readonly getContractShippingAddressesPath = '/rest/admin/v2/contracts/{contractId}/shipping-addresses';
  static readonly createContractShippingAddressPath = '/rest/admin/v2/contracts/{contractId}/shipping-addresses';
  static readonly getContractShippingAddressByIdPath = '/rest/admin/v2/contracts/{contractId}/shipping-addresses/{id}';
  static readonly deleteContractShippingAddressPath = '/rest/admin/v2/contracts/{contractId}/shipping-addresses/{id}';
  static readonly getContractShippingChargesPath = '/rest/admin/v2/contracts/{contractId}/shipping-charges';
  static readonly createContractShippingChargePath = '/rest/admin/v2/contracts/{contractId}/shipping-charges';
  static readonly getContractShippingChargeByIdPath = '/rest/admin/v2/contracts/{contractId}/shipping-charges/{id}';
  static readonly deleteContractShippingChargePath = '/rest/admin/v2/contracts/{contractId}/shipping-charges/{id}';
  static readonly getContractShippingMethodsPath = '/rest/admin/v2/contracts/{contractId}/shipping-methods';
  static readonly createContractShippingMethodPath = '/rest/admin/v2/contracts/{contractId}/shipping-methods';
  static readonly getContractShippingMethodByIdPath = '/rest/admin/v2/contracts/{contractId}/shipping-methods/{id}';
  static readonly deleteContractShippingMethodPath = '/rest/admin/v2/contracts/{contractId}/shipping-methods/{id}';
  static readonly getContractPaymentMethodsPath = '/rest/admin/v2/contracts/{contractId}/payment-methods';
  static readonly createContractPaymentMethodPath = '/rest/admin/v2/contracts/{contractId}/payment-methods';
  static readonly getContractPaymentMethodByIdPath = '/rest/admin/v2/contracts/{contractId}/payment-methods/{id}';
  static readonly updateContractPaymentMethodPath = '/rest/admin/v2/contracts/{contractId}/payment-methods/{id}';
  static readonly deleteContractPaymentMethodPath = '/rest/admin/v2/contracts/{contractId}/payment-methods/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get a collection of contracts.
   * @param params The `ContractsService.GetContractsParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the business account which contains the contract.
   *
   * - `searchString`: Limits search results to only include contracts with a name or description that matches the value of this parameter.
   *
   * - `status`: Limits search results to only include contracts with the specified status. Possible values are
   *    * draft
   *    * submitted
   *    * approved
   *    * active
   *    * rejected
   *    * canceled
   *    * suspended
   *    * deploying
   *    * deployFailed
   *
   * - `baseContracts`: Returns the list of contracts that can be used as base contracts for contracts in the specified account.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getContractsResponse(params: ContractsService.GetContractsParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.accountId != null) __params = __params.set('accountId', params.accountId.toString());
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    if (params.status != null) __params = __params.set('status', params.status.toString());
    if (params.baseContracts != null) __params = __params.set('baseContracts', params.baseContracts.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/contracts`,
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
   * Get a collection of contracts.
   * @param params The `ContractsService.GetContractsParams` containing the following parameters:
   *
   * - `accountId`: The unique numeric ID for identifying the business account which contains the contract.
   *
   * - `searchString`: Limits search results to only include contracts with a name or description that matches the value of this parameter.
   *
   * - `status`: Limits search results to only include contracts with the specified status. Possible values are
   *    * draft
   *    * submitted
   *    * approved
   *    * active
   *    * rejected
   *    * canceled
   *    * suspended
   *    * deploying
   *    * deployFailed
   *
   * - `baseContracts`: Returns the list of contracts that can be used as base contracts for contracts in the specified account.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name will order the items based on the name value in ascending order.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getContracts(params: ContractsService.GetContractsParams): __Observable<any> {
    return this.getContractsResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Creates a new contract.
   * @param body The request body for creating contract.
   */
  createContractResponse(body: any): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/contracts`,
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
   * Creates a new contract.
   * @param body The request body for creating contract.
   */
  createContract(body: any): __Observable<null> {
    return this.createContractResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a contract by its ID.
   * @param id The unique numeric ID for identifying the contract.
   * @return The requested completed successfully.
   */
  getContractByIdResponse(id: string): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/contracts/${id}`,
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
   * Gets a contract by its ID.
   * @param id The unique numeric ID for identifying the contract.
   * @return The requested completed successfully.
   */
  getContractById(id: string): __Observable<any> {
    return this.getContractByIdResponse(id).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Updates an existing contract.
   * @param params The `ContractsService.UpdateContractParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the contract.
   *
   * - `body`: The request body for updating a contract.
   */
  updateContractResponse(params: ContractsService.UpdateContractParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/contracts/${params.id}`,
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
   * Updates an existing contract.
   * @param params The `ContractsService.UpdateContractParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the contract.
   *
   * - `body`: The request body for updating a contract.
   */
  updateContract(params: ContractsService.UpdateContractParams): __Observable<null> {
    return this.updateContractResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Deletes the specified contracts by setting the contracts to mark for delete.<br>It does not remove the contract from the database immediately. A contract has to be in one of the following state to run this command - draft or canceled.
   * @param id The unique numeric ID for identifying the contract.
   */
  deleteContractResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/contracts/${id}`,
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
   * Deletes the specified contracts by setting the contracts to mark for delete.<br>It does not remove the contract from the database immediately. A contract has to be in one of the following state to run this command - draft or canceled.
   * @param id The unique numeric ID for identifying the contract.
   */
  deleteContract(id: string): __Observable<null> {
    return this.deleteContractResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Export a contract.
   * @param id The unique numeric ID for identifying the contract.
   * @return The contract was exported successfully.
   */
  exportContractResponse(id: string): __Observable<__StrictHttpResponse<Blob>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/contracts/${id}/export`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'blob'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Export a contract.
   * @param id The unique numeric ID for identifying the contract.
   * @return The contract was exported successfully.
   */
  exportContract(id: string): __Observable<Blob> {
    return this.exportContractResponse(id).pipe(
      __map(_r => _r.body as Blob)
    );
  }

  /**
   * Import a contract.
   * @param params The `ContractsService.ImportContractParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID of the store that owns the contract.
   *
   * - `body`: Contract XML.
   */
  importContractResponse(params: ContractsService.ImportContractParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/contracts/import`,
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
   * Import a contract.
   * @param params The `ContractsService.ImportContractParams` containing the following parameters:
   *
   * - `storeId`: The unique numeric ID of the store that owns the contract.
   *
   * - `body`: Contract XML.
   */
  importContract(params: ContractsService.ImportContractParams): __Observable<null> {
    return this.importContractResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Copies a contract. <br> If the command completes successfully, a new contract will be created. The contract will be in draft state with majorVersion set to 1 and minorVersion set to 0.
   * @param params The `ContractsService.CopyContractParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the contract to be copied.
   *
   * - `body`: The request body for copying a contract.
   */
  copyContractResponse(params: ContractsService.CopyContractParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/contracts/${params.id}/copy`,
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
   * Copies a contract. <br> If the command completes successfully, a new contract will be created. The contract will be in draft state with majorVersion set to 1 and minorVersion set to 0.
   * @param params The `ContractsService.CopyContractParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the contract to be copied.
   *
   * - `body`: The request body for copying a contract.
   */
  copyContract(params: ContractsService.CopyContractParams): __Observable<null> {
    return this.copyContractResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Submits a contract for approval. <br> If the designated approver for the contract decides a contract is complete and acceptable, he can move the contract into the approved state. The system will automatically attempt to deploy an approved contract.<br>If the designated approver decides a contract is not complete or is unacceptable, he can move the contract into the rejected state. A contract in the rejected state can be changed and re-submitted for approval, canceled, or marked for deletion.
   * @param id The unique numeric ID for identifying the contract.
   */
  submitContractResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/contracts/${id}/submit`,
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
   * Submits a contract for approval. <br> If the designated approver for the contract decides a contract is complete and acceptable, he can move the contract into the approved state. The system will automatically attempt to deploy an approved contract.<br>If the designated approver decides a contract is not complete or is unacceptable, he can move the contract into the rejected state. A contract in the rejected state can be changed and re-submitted for approval, canceled, or marked for deletion.
   * @param id The unique numeric ID for identifying the contract.
   */
  submitContract(id: string): __Observable<null> {
    return this.submitContractResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Deploys a contract.
   * @param id The unique numeric ID for identifying the contract.
   */
  deployContractResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/contracts/${id}/deploy`,
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
   * Deploys a contract.
   * @param id The unique numeric ID for identifying the contract.
   */
  deployContract(id: string): __Observable<null> {
    return this.deployContractResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Creates a new version of a specified contract. <br>The state of the specified contract has to be in one of the following states: Approved, Active, Suspended, DeploymentInProgress, and DeploymentFailed. <br>The new contract will have the same name as the specified one. <br>If both majorVersion and minorVersion are provided, the command respects the versions. Otherwise, the new contract will have the same major version number with the old contract. The minor version will be one plus the largest minor version with the same contract name,  origin, owner, majorVerion. <br>This new contract will be in draft version.
   * @param id The unique numeric ID for identifying the contract to be copied.
   */
  createNewContractVersionResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/contracts/${id}/new-version`,
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
   * Creates a new version of a specified contract. <br>The state of the specified contract has to be in one of the following states: Approved, Active, Suspended, DeploymentInProgress, and DeploymentFailed. <br>The new contract will have the same name as the specified one. <br>If both majorVersion and minorVersion are provided, the command respects the versions. Otherwise, the new contract will have the same major version number with the old contract. The minor version will be one plus the largest minor version with the same contract name,  origin, owner, majorVerion. <br>This new contract will be in draft version.
   * @param id The unique numeric ID for identifying the contract to be copied.
   */
  createNewContractVersion(id: string): __Observable<null> {
    return this.createNewContractVersionResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Suspends an active contract.
   * @param id The unique numeric ID for identifying the contract to be suspended.
   */
  suspendContractResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/contracts/${id}/suspend`,
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
   * Suspends an active contract.
   * @param id The unique numeric ID for identifying the contract to be suspended.
   */
  suspendContract(id: string): __Observable<null> {
    return this.suspendContractResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Resumes the specified contract to Active state. <br>The specified contract has to be in Suspended state.
   * @param id The unique numeric ID for identifying the contract to be resumed.
   */
  resumeContractResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/contracts/${id}/resume`,
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
   * Resumes the specified contract to Active state. <br>The specified contract has to be in Suspended state.
   * @param id The unique numeric ID for identifying the contract to be resumed.
   */
  resumeContract(id: string): __Observable<null> {
    return this.resumeContractResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Cancels the specified contract by changing its contract state to Canceled.<br>It does not remove the contract from the database. A contract can be canceled any time except if the contract has a status of draft or deploying.
   * @param id The unique numeric ID for identifying the contract to be canceled.
   */
  cancelContractResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/contracts/${id}/cancel`,
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
   * Cancels the specified contract by changing its contract state to Canceled.<br>It does not remove the contract from the database. A contract can be canceled any time except if the contract has a status of draft or deploying.
   * @param id The unique numeric ID for identifying the contract to be canceled.
   */
  cancelContract(id: string): __Observable<null> {
    return this.cancelContractResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a collection of contract buyers.
   * @param params The `ContractsService.GetContractBuyersParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getContractBuyersResponse(params: ContractsService.GetContractBuyersParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/buyers`,
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
   * Gets a collection of contract buyers.
   * @param params The `ContractsService.GetContractBuyersParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getContractBuyers(params: ContractsService.GetContractBuyersParams): __Observable<any> {
    return this.getContractBuyersResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Create a new contract buyer.
   * @param params The `ContractsService.CreateContractBuyerParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `body`: The request body for contract buyer creation.
   */
  createContractBuyerResponse(params: ContractsService.CreateContractBuyerParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/buyers`,
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
   * Create a new contract buyer.
   * @param params The `ContractsService.CreateContractBuyerParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `body`: The request body for contract buyer creation.
   */
  createContractBuyer(params: ContractsService.CreateContractBuyerParams): __Observable<null> {
    return this.createContractBuyerResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a contract buyer by its ID.
   * @param params The `ContractsService.GetContractBuyerByIdParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract buyer.
   *
   * @return The requested completed successfully.
   */
  getContractBuyerByIdResponse(params: ContractsService.GetContractBuyerByIdParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/buyers/${params.id}`,
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
   * Gets a contract buyer by its ID.
   * @param params The `ContractsService.GetContractBuyerByIdParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract buyer.
   *
   * @return The requested completed successfully.
   */
  getContractBuyerById(params: ContractsService.GetContractBuyerByIdParams): __Observable<any> {
    return this.getContractBuyerByIdResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Deletes an existing contract buyer.
   * @param params The `ContractsService.DeleteContractBuyerParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract buyer.
   */
  deleteContractBuyerResponse(params: ContractsService.DeleteContractBuyerParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/buyers/${params.id}`,
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
   * Deletes an existing contract buyer.
   * @param params The `ContractsService.DeleteContractBuyerParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract buyer.
   */
  deleteContractBuyer(params: ContractsService.DeleteContractBuyerParams): __Observable<null> {
    return this.deleteContractBuyerResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a collection of contract shipping addresses.
   * @param params The `ContractsService.GetContractShippingAddressesParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getContractShippingAddressesResponse(params: ContractsService.GetContractShippingAddressesParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/shipping-addresses`,
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
   * Gets a collection of contract shipping addresses.
   * @param params The `ContractsService.GetContractShippingAddressesParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getContractShippingAddresses(params: ContractsService.GetContractShippingAddressesParams): __Observable<any> {
    return this.getContractShippingAddressesResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Create a new contract shipping address.
   * @param params The `ContractsService.CreateContractShippingAddressParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `body`: The request body for contract shipping address creation.
   */
  createContractShippingAddressResponse(params: ContractsService.CreateContractShippingAddressParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/shipping-addresses`,
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
   * Create a new contract shipping address.
   * @param params The `ContractsService.CreateContractShippingAddressParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `body`: The request body for contract shipping address creation.
   */
  createContractShippingAddress(params: ContractsService.CreateContractShippingAddressParams): __Observable<null> {
    return this.createContractShippingAddressResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a contract shipping address by its ID.
   * @param params The `ContractsService.GetContractShippingAddressByIdParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract shipping address.
   *
   * @return The requested completed successfully.
   */
  getContractShippingAddressByIdResponse(params: ContractsService.GetContractShippingAddressByIdParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/shipping-addresses/${params.id}`,
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
   * Gets a contract shipping address by its ID.
   * @param params The `ContractsService.GetContractShippingAddressByIdParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract shipping address.
   *
   * @return The requested completed successfully.
   */
  getContractShippingAddressById(params: ContractsService.GetContractShippingAddressByIdParams): __Observable<any> {
    return this.getContractShippingAddressByIdResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Deletes an existing contract shipping address.
   * @param params The `ContractsService.DeleteContractShippingAddressParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract shipping address.
   */
  deleteContractShippingAddressResponse(params: ContractsService.DeleteContractShippingAddressParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/shipping-addresses/${params.id}`,
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
   * Deletes an existing contract shipping address.
   * @param params The `ContractsService.DeleteContractShippingAddressParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract shipping address.
   */
  deleteContractShippingAddress(params: ContractsService.DeleteContractShippingAddressParams): __Observable<null> {
    return this.deleteContractShippingAddressResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a collection of contract shipping charges.
   * @param params The `ContractsService.GetContractShippingChargesParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getContractShippingChargesResponse(params: ContractsService.GetContractShippingChargesParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/shipping-charges`,
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
   * Gets a collection of contract shipping charges.
   * @param params The `ContractsService.GetContractShippingChargesParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getContractShippingCharges(params: ContractsService.GetContractShippingChargesParams): __Observable<any> {
    return this.getContractShippingChargesResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Create a new contract shipping charge.
   * @param params The `ContractsService.CreateContractShippingChargeParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `body`: The request body for contract shipping charge creation.
   */
  createContractShippingChargeResponse(params: ContractsService.CreateContractShippingChargeParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/shipping-charges`,
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
   * Create a new contract shipping charge.
   * @param params The `ContractsService.CreateContractShippingChargeParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `body`: The request body for contract shipping charge creation.
   */
  createContractShippingCharge(params: ContractsService.CreateContractShippingChargeParams): __Observable<null> {
    return this.createContractShippingChargeResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a contract shipping charge by its ID.
   * @param params The `ContractsService.GetContractShippingChargeByIdParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract shipping charge.
   *
   * @return The requested completed successfully.
   */
  getContractShippingChargeByIdResponse(params: ContractsService.GetContractShippingChargeByIdParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/shipping-charges/${params.id}`,
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
   * Gets a contract shipping charge by its ID.
   * @param params The `ContractsService.GetContractShippingChargeByIdParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract shipping charge.
   *
   * @return The requested completed successfully.
   */
  getContractShippingChargeById(params: ContractsService.GetContractShippingChargeByIdParams): __Observable<any> {
    return this.getContractShippingChargeByIdResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Deletes an existing contract shipping charge.
   * @param params The `ContractsService.DeleteContractShippingChargeParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract shipping charge.
   */
  deleteContractShippingChargeResponse(params: ContractsService.DeleteContractShippingChargeParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/shipping-charges/${params.id}`,
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
   * Deletes an existing contract shipping charge.
   * @param params The `ContractsService.DeleteContractShippingChargeParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract shipping charge.
   */
  deleteContractShippingCharge(params: ContractsService.DeleteContractShippingChargeParams): __Observable<null> {
    return this.deleteContractShippingChargeResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a collection of contract shipping methods.
   * @param params The `ContractsService.GetContractShippingMethodsParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getContractShippingMethodsResponse(params: ContractsService.GetContractShippingMethodsParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/shipping-methods`,
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
   * Gets a collection of contract shipping methods.
   * @param params The `ContractsService.GetContractShippingMethodsParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getContractShippingMethods(params: ContractsService.GetContractShippingMethodsParams): __Observable<any> {
    return this.getContractShippingMethodsResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Create a new contract shipping method.
   * @param params The `ContractsService.CreateContractShippingMethodParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `body`: The request body for contract shipping method creation.
   */
  createContractShippingMethodResponse(params: ContractsService.CreateContractShippingMethodParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/shipping-methods`,
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
   * Create a new contract shipping method.
   * @param params The `ContractsService.CreateContractShippingMethodParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `body`: The request body for contract shipping method creation.
   */
  createContractShippingMethod(params: ContractsService.CreateContractShippingMethodParams): __Observable<null> {
    return this.createContractShippingMethodResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a contract shipping method by its ID.
   * @param params The `ContractsService.GetContractShippingMethodByIdParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract shipping method.
   *
   * @return The requested completed successfully.
   */
  getContractShippingMethodByIdResponse(params: ContractsService.GetContractShippingMethodByIdParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/shipping-methods/${params.id}`,
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
   * Gets a contract shipping method by its ID.
   * @param params The `ContractsService.GetContractShippingMethodByIdParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract shipping method.
   *
   * @return The requested completed successfully.
   */
  getContractShippingMethodById(params: ContractsService.GetContractShippingMethodByIdParams): __Observable<any> {
    return this.getContractShippingMethodByIdResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Deletes an existing contract shipping method.
   * @param params The `ContractsService.DeleteContractShippingMethodParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract shipping method.
   */
  deleteContractShippingMethodResponse(params: ContractsService.DeleteContractShippingMethodParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/shipping-methods/${params.id}`,
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
   * Deletes an existing contract shipping method.
   * @param params The `ContractsService.DeleteContractShippingMethodParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract shipping method.
   */
  deleteContractShippingMethod(params: ContractsService.DeleteContractShippingMethodParams): __Observable<null> {
    return this.deleteContractShippingMethodResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a collection of contract payment methods.
   * @param params The `ContractsService.GetContractPaymentMethodsParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getContractPaymentMethodsResponse(params: ContractsService.GetContractPaymentMethodsParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/payment-methods`,
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
   * Gets a collection of contract payment methods.
   * @param params The `ContractsService.GetContractPaymentMethodsParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The requested completed successfully.
   */
  getContractPaymentMethods(params: ContractsService.GetContractPaymentMethodsParams): __Observable<any> {
    return this.getContractPaymentMethodsResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Create a new contract payment method.
   * @param params The `ContractsService.CreateContractPaymentMethodParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `body`: The request body for contract payment method creation.
   */
  createContractPaymentMethodResponse(params: ContractsService.CreateContractPaymentMethodParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/payment-methods`,
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
   * Create a new contract payment method.
   * @param params The `ContractsService.CreateContractPaymentMethodParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `body`: The request body for contract payment method creation.
   */
  createContractPaymentMethod(params: ContractsService.CreateContractPaymentMethodParams): __Observable<null> {
    return this.createContractPaymentMethodResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Gets a contract payment method by its ID.
   * @param params The `ContractsService.GetContractPaymentMethodByIdParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract payment method.
   *
   * @return The requested completed successfully.
   */
  getContractPaymentMethodByIdResponse(params: ContractsService.GetContractPaymentMethodByIdParams): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/payment-methods/${params.id}`,
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
   * Gets a contract payment method by its ID.
   * @param params The `ContractsService.GetContractPaymentMethodByIdParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract payment method.
   *
   * @return The requested completed successfully.
   */
  getContractPaymentMethodById(params: ContractsService.GetContractPaymentMethodByIdParams): __Observable<any> {
    return this.getContractPaymentMethodByIdResponse(params).pipe(
      __map(_r => _r.body as any)
    );
  }

  /**
   * Updates an existing contract payment method.
   * @param params The `ContractsService.UpdateContractPaymentMethodParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract payment method.
   *
   * - `body`: The request body for creating a contract payment method.
   */
  updateContractPaymentMethodResponse(params: ContractsService.UpdateContractPaymentMethodParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = params.body;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/payment-methods/${params.id}`,
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
   * Updates an existing contract payment method.
   * @param params The `ContractsService.UpdateContractPaymentMethodParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract payment method.
   *
   * - `body`: The request body for creating a contract payment method.
   */
  updateContractPaymentMethod(params: ContractsService.UpdateContractPaymentMethodParams): __Observable<null> {
    return this.updateContractPaymentMethodResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Deletes an existing contract payment method.
   * @param params The `ContractsService.DeleteContractPaymentMethodParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract payment method.
   */
  deleteContractPaymentMethodResponse(params: ContractsService.DeleteContractPaymentMethodParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/contracts/${params.contractId}/payment-methods/${params.id}`,
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
   * Deletes an existing contract payment method.
   * @param params The `ContractsService.DeleteContractPaymentMethodParams` containing the following parameters:
   *
   * - `contractId`: The unique numeric ID for identifying the contract.
   *
   * - `id`: The unique numeric ID for identifying the contract payment method.
   */
  deleteContractPaymentMethod(params: ContractsService.DeleteContractPaymentMethodParams): __Observable<null> {
    return this.deleteContractPaymentMethodResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ContractsService {

  /**
   * Parameters for getContracts
   */
  export interface GetContractsParams {

    /**
     * The unique numeric ID for identifying the business account which contains the contract.
     */
    accountId: string;

    /**
     * Limits search results to only include contracts with a name or description that matches the value of this parameter.
     */
    searchString?: string;

    /**
     * Limits search results to only include contracts with the specified status. Possible values are
     *  * draft
     *  * submitted
     *  * approved
     *  * active
     *  * rejected
     *  * canceled
     *  * suspended
     *  * deploying
     *  * deployFailed
     */
    status?: string;

    /**
     * Returns the list of contracts that can be used as base contracts for contracts in the specified account.
     */
    baseContracts?: boolean;

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
   * Parameters for updateContract
   */
  export interface UpdateContractParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    id: string;

    /**
     * The request body for updating a contract.
     */
    body: any;
  }

  /**
   * Parameters for importContract
   */
  export interface ImportContractParams {

    /**
     * The unique numeric ID of the store that owns the contract.
     */
    storeId: number;

    /**
     * Contract XML.
     */
    body: string;
  }

  /**
   * Parameters for copyContract
   */
  export interface CopyContractParams {

    /**
     * The unique numeric ID for identifying the contract to be copied.
     */
    id: string;

    /**
     * The request body for copying a contract.
     */
    body: any;
  }

  /**
   * Parameters for getContractBuyers
   */
  export interface GetContractBuyersParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

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
   * Parameters for createContractBuyer
   */
  export interface CreateContractBuyerParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The request body for contract buyer creation.
     */
    body: any;
  }

  /**
   * Parameters for getContractBuyerById
   */
  export interface GetContractBuyerByIdParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The unique numeric ID for identifying the contract buyer.
     */
    id: string;
  }

  /**
   * Parameters for deleteContractBuyer
   */
  export interface DeleteContractBuyerParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The unique numeric ID for identifying the contract buyer.
     */
    id: string;
  }

  /**
   * Parameters for getContractShippingAddresses
   */
  export interface GetContractShippingAddressesParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

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
   * Parameters for createContractShippingAddress
   */
  export interface CreateContractShippingAddressParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The request body for contract shipping address creation.
     */
    body: any;
  }

  /**
   * Parameters for getContractShippingAddressById
   */
  export interface GetContractShippingAddressByIdParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The unique numeric ID for identifying the contract shipping address.
     */
    id: string;
  }

  /**
   * Parameters for deleteContractShippingAddress
   */
  export interface DeleteContractShippingAddressParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The unique numeric ID for identifying the contract shipping address.
     */
    id: string;
  }

  /**
   * Parameters for getContractShippingCharges
   */
  export interface GetContractShippingChargesParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

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
   * Parameters for createContractShippingCharge
   */
  export interface CreateContractShippingChargeParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The request body for contract shipping charge creation.
     */
    body: any;
  }

  /**
   * Parameters for getContractShippingChargeById
   */
  export interface GetContractShippingChargeByIdParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The unique numeric ID for identifying the contract shipping charge.
     */
    id: string;
  }

  /**
   * Parameters for deleteContractShippingCharge
   */
  export interface DeleteContractShippingChargeParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The unique numeric ID for identifying the contract shipping charge.
     */
    id: string;
  }

  /**
   * Parameters for getContractShippingMethods
   */
  export interface GetContractShippingMethodsParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

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
   * Parameters for createContractShippingMethod
   */
  export interface CreateContractShippingMethodParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The request body for contract shipping method creation.
     */
    body: any;
  }

  /**
   * Parameters for getContractShippingMethodById
   */
  export interface GetContractShippingMethodByIdParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The unique numeric ID for identifying the contract shipping method.
     */
    id: string;
  }

  /**
   * Parameters for deleteContractShippingMethod
   */
  export interface DeleteContractShippingMethodParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The unique numeric ID for identifying the contract shipping method.
     */
    id: string;
  }

  /**
   * Parameters for getContractPaymentMethods
   */
  export interface GetContractPaymentMethodsParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

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
   * Parameters for createContractPaymentMethod
   */
  export interface CreateContractPaymentMethodParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The request body for contract payment method creation.
     */
    body: any;
  }

  /**
   * Parameters for getContractPaymentMethodById
   */
  export interface GetContractPaymentMethodByIdParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The unique numeric ID for identifying the contract payment method.
     */
    id: string;
  }

  /**
   * Parameters for updateContractPaymentMethod
   */
  export interface UpdateContractPaymentMethodParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The unique numeric ID for identifying the contract payment method.
     */
    id: string;

    /**
     * The request body for creating a contract payment method.
     */
    body: any;
  }

  /**
   * Parameters for deleteContractPaymentMethod
   */
  export interface DeleteContractPaymentMethodParams {

    /**
     * The unique numeric ID for identifying the contract.
     */
    contractId: string;

    /**
     * The unique numeric ID for identifying the contract payment method.
     */
    id: string;
  }
}

export { ContractsService }
