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
class MemberGroupsService extends __BaseService {
  static readonly getMemberGroupsPath = '/rest/admin/v2/member-groups';
  static readonly createMemberGroupPath = '/rest/admin/v2/member-groups';
  static readonly deleteMemberGroupPath = '/rest/admin/v2/member-groups/{id}';
  static readonly getMemberGroupPath = '/rest/admin/v2/member-groups/{id}';
  static readonly updateMemberGroupPath = '/rest/admin/v2/member-groups/{id}';
  static readonly activateMemberGroupPath = '/rest/admin/v2/member-groups/{id}/activate';
  static readonly getMemberGroupConditionElementsPath = '/rest/admin/v2/member-groups/{id}/condition-elements';
  static readonly createMemberGroupConditionElementPath = '/rest/admin/v2/member-groups/{id}/condition-elements';
  static readonly deleteMemberGroupConditionElementPath = '/rest/admin/v2/member-groups/{id}/condition-elements/{elementId}';
  static readonly updateMemberGroupConditionElementPath = '/rest/admin/v2/member-groups/{id}/condition-elements/{elementId}';
  static readonly getMemberGroupDescriptionsPath = '/rest/admin/v2/member-groups/{id}/descriptions';
  static readonly createMemberGroupDescriptionPath = '/rest/admin/v2/member-groups/{id}/descriptions';
  static readonly deleteMemberGroupDescriptionPath = '/rest/admin/v2/member-groups/{id}/descriptions/{languageId}';
  static readonly getMemberGroupDescriptionPath = '/rest/admin/v2/member-groups/{id}/descriptions/{languageId}';
  static readonly updateMemberGroupDescriptionPath = '/rest/admin/v2/member-groups/{id}/descriptions/{languageId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `MemberGroupsService.GetMemberGroupsParams` containing the following parameters:
   *
   * - `usage`: The member group's usage. Available values:
   *   * GeneralPurpose - A general grouping of persons and/or organizations.
   *   * AccessControl - A group of persons specified as part of an access control policy.
   *   * CustomerTerritory - A group of customers, typically by territory.
   *   * CustomerServiceRepresentative - A group of customer service representatives, which in turn can have customer territory groups or customer accounts assigned to them.
   *   * RegisteredCustomer - A group of buyer organizations that have registered to a seller organization.
   *   * CustomerPrice - A group of customers that are entitled to get a contract's terms and conditions; often used to enforce custom pricing for the group. Customer price groups can comprise any user, who can be included and excluded explicitly.
   *   * CustomerSegment - A group of persons based on common attributes, for example demographics or purchase history. This group is used in marketing campaigns.
   *   * RFQResponseApproval - An organization that wants request for quote (RFQ) response approvals owns a member group of this usage. The group contains persons that are able to approve RFQ responses.
   *   * DisableInheritedRFQResponseApproval - An organization that does not want request for quote (RFQ) response approvals owns a member group of this usage.
   *   * OrderProcessApproval - An organization that wants order approvals owns a member group of this usage. The group contains persons that are able to approve orders.
   *   * DisableInheritedOrderProcessApproval - An organization that does not want order approvals owns a member group of this usage.
   *   * ContractSubmitApproval - An organization that wants contract approvals owns a member group of this usage. The group contains persons that are able to approve contracts.
   *   * DisableInheritedContractSubmitApproval - An organization that does not want contract approvals owns a member group of this usage.
   *   * UserRegistrationApproval - An organization that wants user registration approvals owns a member group of this usage. The group contains persons that are able to approve user registration requests.
   *   * DisableInheritedUserRegistrationApproval - An organization that does not want user registration approvals owns a member group of this usage.
   *   * ResellerRegistrationApproval - An organization that wants reseller registration approvals owns a member group of this usage. The group contains persons that are able to approve reseller registration requests.
   *   * DisableInheritedResellerRegistrationApproval - An organization that does not want reseller registration approvals owns a member group of this usage.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `searchString`: The search string used to search for member groups.
   *
   * - `ownerId`: The parent organization id used to filter the member groups.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name,-type will order the items first based on the name value in ascending order, and then by their type value in descending order. |
   *   Available values:
   *   * +name
   *   * -name
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getMemberGroupsResponse(params: MemberGroupsService.GetMemberGroupsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{allowExport?: boolean, description?: string, exportAll?: boolean, id?: string, name?: string, ownerId?: string, storeId?: number, updatedBy?: string, updatedDateTime?: string, usage?: 'GeneralPurpose' | 'AccessControl' | 'CustomerTerritory' | 'CustomerServiceRepresentative' | 'RegisteredCustomer' | 'CustomerPrice' | 'CustomerSegment' | 'RFQResponseApproval' | 'DisableInheritedRFQResponseApproval' | 'OrderProcessApproval' | 'DisableInheritedOrderProcessApproval' | 'ContractSubmitApproval' | 'DisableInheritedContractSubmitApproval' | 'UserRegistrationApproval' | 'DisableInheritedUserRegistrationApproval' | 'ResellerRegistrationApproval' | 'DisableInheritedResellerRegistrationApproval'}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.usage || []).forEach(val => {if (val != null) __params = __params.append('usage', val.toString())});
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.searchString != null) __params = __params.set('searchString', params.searchString.toString());
    if (params.ownerId != null) __params = __params.set('ownerId', params.ownerId.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/member-groups`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{allowExport?: boolean, description?: string, exportAll?: boolean, id?: string, name?: string, ownerId?: string, storeId?: number, updatedBy?: string, updatedDateTime?: string, usage?: 'GeneralPurpose' | 'AccessControl' | 'CustomerTerritory' | 'CustomerServiceRepresentative' | 'RegisteredCustomer' | 'CustomerPrice' | 'CustomerSegment' | 'RFQResponseApproval' | 'DisableInheritedRFQResponseApproval' | 'OrderProcessApproval' | 'DisableInheritedOrderProcessApproval' | 'ContractSubmitApproval' | 'DisableInheritedContractSubmitApproval' | 'UserRegistrationApproval' | 'DisableInheritedUserRegistrationApproval' | 'ResellerRegistrationApproval' | 'DisableInheritedResellerRegistrationApproval'}>}>;
      })
    );
  }

  /**
   * @param params The `MemberGroupsService.GetMemberGroupsParams` containing the following parameters:
   *
   * - `usage`: The member group's usage. Available values:
   *   * GeneralPurpose - A general grouping of persons and/or organizations.
   *   * AccessControl - A group of persons specified as part of an access control policy.
   *   * CustomerTerritory - A group of customers, typically by territory.
   *   * CustomerServiceRepresentative - A group of customer service representatives, which in turn can have customer territory groups or customer accounts assigned to them.
   *   * RegisteredCustomer - A group of buyer organizations that have registered to a seller organization.
   *   * CustomerPrice - A group of customers that are entitled to get a contract's terms and conditions; often used to enforce custom pricing for the group. Customer price groups can comprise any user, who can be included and excluded explicitly.
   *   * CustomerSegment - A group of persons based on common attributes, for example demographics or purchase history. This group is used in marketing campaigns.
   *   * RFQResponseApproval - An organization that wants request for quote (RFQ) response approvals owns a member group of this usage. The group contains persons that are able to approve RFQ responses.
   *   * DisableInheritedRFQResponseApproval - An organization that does not want request for quote (RFQ) response approvals owns a member group of this usage.
   *   * OrderProcessApproval - An organization that wants order approvals owns a member group of this usage. The group contains persons that are able to approve orders.
   *   * DisableInheritedOrderProcessApproval - An organization that does not want order approvals owns a member group of this usage.
   *   * ContractSubmitApproval - An organization that wants contract approvals owns a member group of this usage. The group contains persons that are able to approve contracts.
   *   * DisableInheritedContractSubmitApproval - An organization that does not want contract approvals owns a member group of this usage.
   *   * UserRegistrationApproval - An organization that wants user registration approvals owns a member group of this usage. The group contains persons that are able to approve user registration requests.
   *   * DisableInheritedUserRegistrationApproval - An organization that does not want user registration approvals owns a member group of this usage.
   *   * ResellerRegistrationApproval - An organization that wants reseller registration approvals owns a member group of this usage. The group contains persons that are able to approve reseller registration requests.
   *   * DisableInheritedResellerRegistrationApproval - An organization that does not want reseller registration approvals owns a member group of this usage.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * - `searchString`: The search string used to search for member groups.
   *
   * - `ownerId`: The parent organization id used to filter the member groups.
   *
   * - `sort`: The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name,-type will order the items first based on the name value in ascending order, and then by their type value in descending order. |
   *   Available values:
   *   * +name
   *   * -name
   *
   * - `offset`: The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
   *
   * - `limit`: The maximum number of records to return.
   *
   * @return The operation is successful.
   */
  getMemberGroups(params: MemberGroupsService.GetMemberGroupsParams): __Observable<{count?: number, items?: Array<{allowExport?: boolean, description?: string, exportAll?: boolean, id?: string, name?: string, ownerId?: string, storeId?: number, updatedBy?: string, updatedDateTime?: string, usage?: 'GeneralPurpose' | 'AccessControl' | 'CustomerTerritory' | 'CustomerServiceRepresentative' | 'RegisteredCustomer' | 'CustomerPrice' | 'CustomerSegment' | 'RFQResponseApproval' | 'DisableInheritedRFQResponseApproval' | 'OrderProcessApproval' | 'DisableInheritedOrderProcessApproval' | 'ContractSubmitApproval' | 'DisableInheritedContractSubmitApproval' | 'UserRegistrationApproval' | 'DisableInheritedUserRegistrationApproval' | 'ResellerRegistrationApproval' | 'DisableInheritedResellerRegistrationApproval'}>}> {
    return this.getMemberGroupsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{allowExport?: boolean, description?: string, exportAll?: boolean, id?: string, name?: string, ownerId?: string, storeId?: number, updatedBy?: string, updatedDateTime?: string, usage?: 'GeneralPurpose' | 'AccessControl' | 'CustomerTerritory' | 'CustomerServiceRepresentative' | 'RegisteredCustomer' | 'CustomerPrice' | 'CustomerSegment' | 'RFQResponseApproval' | 'DisableInheritedRFQResponseApproval' | 'OrderProcessApproval' | 'DisableInheritedOrderProcessApproval' | 'ContractSubmitApproval' | 'DisableInheritedContractSubmitApproval' | 'UserRegistrationApproval' | 'DisableInheritedUserRegistrationApproval' | 'ResellerRegistrationApproval' | 'DisableInheritedResellerRegistrationApproval'}>})
    );
  }

  /**
   * @param params The `MemberGroupsService.CreateMemberGroupParams` containing the following parameters:
   *
   * - `body`: The request body.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  createMemberGroupResponse(params: MemberGroupsService.CreateMemberGroupParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.body;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/member-groups`,
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
   * @param params The `MemberGroupsService.CreateMemberGroupParams` containing the following parameters:
   *
   * - `body`: The request body.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  createMemberGroup(params: MemberGroupsService.CreateMemberGroupParams): __Observable<null> {
    return this.createMemberGroupResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MemberGroupsService.DeleteMemberGroupParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteMemberGroupResponse(params: MemberGroupsService.DeleteMemberGroupParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/member-groups/${params.id}`,
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
   * @param params The `MemberGroupsService.DeleteMemberGroupParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteMemberGroup(params: MemberGroupsService.DeleteMemberGroupParams): __Observable<null> {
    return this.deleteMemberGroupResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MemberGroupsService.GetMemberGroupParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getMemberGroupResponse(params: MemberGroupsService.GetMemberGroupParams): __Observable<__StrictHttpResponse<{allowExport?: boolean, description?: string, exportAll?: boolean, id?: string, name?: string, ownerId?: string, storeId?: number, updatedBy?: string, updatedDateTime?: string, usage?: 'GeneralPurpose' | 'AccessControl' | 'CustomerTerritory' | 'CustomerServiceRepresentative' | 'RegisteredCustomer' | 'CustomerPrice' | 'CustomerSegment' | 'RFQResponseApproval' | 'DisableInheritedRFQResponseApproval' | 'OrderProcessApproval' | 'DisableInheritedOrderProcessApproval' | 'ContractSubmitApproval' | 'DisableInheritedContractSubmitApproval' | 'UserRegistrationApproval' | 'DisableInheritedUserRegistrationApproval' | 'ResellerRegistrationApproval' | 'DisableInheritedResellerRegistrationApproval'}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/member-groups/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{allowExport?: boolean, description?: string, exportAll?: boolean, id?: string, name?: string, ownerId?: string, storeId?: number, updatedBy?: string, updatedDateTime?: string, usage?: 'GeneralPurpose' | 'AccessControl' | 'CustomerTerritory' | 'CustomerServiceRepresentative' | 'RegisteredCustomer' | 'CustomerPrice' | 'CustomerSegment' | 'RFQResponseApproval' | 'DisableInheritedRFQResponseApproval' | 'OrderProcessApproval' | 'DisableInheritedOrderProcessApproval' | 'ContractSubmitApproval' | 'DisableInheritedContractSubmitApproval' | 'UserRegistrationApproval' | 'DisableInheritedUserRegistrationApproval' | 'ResellerRegistrationApproval' | 'DisableInheritedResellerRegistrationApproval'}>;
      })
    );
  }

  /**
   * @param params The `MemberGroupsService.GetMemberGroupParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getMemberGroup(params: MemberGroupsService.GetMemberGroupParams): __Observable<{allowExport?: boolean, description?: string, exportAll?: boolean, id?: string, name?: string, ownerId?: string, storeId?: number, updatedBy?: string, updatedDateTime?: string, usage?: 'GeneralPurpose' | 'AccessControl' | 'CustomerTerritory' | 'CustomerServiceRepresentative' | 'RegisteredCustomer' | 'CustomerPrice' | 'CustomerSegment' | 'RFQResponseApproval' | 'DisableInheritedRFQResponseApproval' | 'OrderProcessApproval' | 'DisableInheritedOrderProcessApproval' | 'ContractSubmitApproval' | 'DisableInheritedContractSubmitApproval' | 'UserRegistrationApproval' | 'DisableInheritedUserRegistrationApproval' | 'ResellerRegistrationApproval' | 'DisableInheritedResellerRegistrationApproval'}> {
    return this.getMemberGroupResponse(params).pipe(
      __map(_r => _r.body as {allowExport?: boolean, description?: string, exportAll?: boolean, id?: string, name?: string, ownerId?: string, storeId?: number, updatedBy?: string, updatedDateTime?: string, usage?: 'GeneralPurpose' | 'AccessControl' | 'CustomerTerritory' | 'CustomerServiceRepresentative' | 'RegisteredCustomer' | 'CustomerPrice' | 'CustomerSegment' | 'RFQResponseApproval' | 'DisableInheritedRFQResponseApproval' | 'OrderProcessApproval' | 'DisableInheritedOrderProcessApproval' | 'ContractSubmitApproval' | 'DisableInheritedContractSubmitApproval' | 'UserRegistrationApproval' | 'DisableInheritedUserRegistrationApproval' | 'ResellerRegistrationApproval' | 'DisableInheritedResellerRegistrationApproval'})
    );
  }

  /**
   * @param params The `MemberGroupsService.UpdateMemberGroupParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `body`: The request body.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  updateMemberGroupResponse(params: MemberGroupsService.UpdateMemberGroupParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/member-groups/${params.id}`,
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
   * @param params The `MemberGroupsService.UpdateMemberGroupParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `body`: The request body.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  updateMemberGroup(params: MemberGroupsService.UpdateMemberGroupParams): __Observable<null> {
    return this.updateMemberGroupResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MemberGroupsService.ActivateMemberGroupParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  activateMemberGroupResponse(params: MemberGroupsService.ActivateMemberGroupParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/member-groups/${params.id}/activate`,
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
   * @param params The `MemberGroupsService.ActivateMemberGroupParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  activateMemberGroup(params: MemberGroupsService.ActivateMemberGroupParams): __Observable<null> {
    return this.activateMemberGroupResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MemberGroupsService.GetMemberGroupConditionElementsParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getMemberGroupConditionElementsResponse(params: MemberGroupsService.GetMemberGroupConditionElementsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{id?: string, name?: string, nameValuePairVariable?: Array<{id?: string, name?: string, value?: string}>, negate?: boolean, parentElementName?: string, simpleConditionOperator?: string, simpleConditionValue?: string, simpleConditionVariable?: string, type?: 'andListCondition' | 'orListCondition' | 'simpleCondition' | 'trueCondition'}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/member-groups/${params.id}/condition-elements`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{id?: string, name?: string, nameValuePairVariable?: Array<{id?: string, name?: string, value?: string}>, negate?: boolean, parentElementName?: string, simpleConditionOperator?: string, simpleConditionValue?: string, simpleConditionVariable?: string, type?: 'andListCondition' | 'orListCondition' | 'simpleCondition' | 'trueCondition'}>}>;
      })
    );
  }

  /**
   * @param params The `MemberGroupsService.GetMemberGroupConditionElementsParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getMemberGroupConditionElements(params: MemberGroupsService.GetMemberGroupConditionElementsParams): __Observable<{count?: number, items?: Array<{id?: string, name?: string, nameValuePairVariable?: Array<{id?: string, name?: string, value?: string}>, negate?: boolean, parentElementName?: string, simpleConditionOperator?: string, simpleConditionValue?: string, simpleConditionVariable?: string, type?: 'andListCondition' | 'orListCondition' | 'simpleCondition' | 'trueCondition'}>}> {
    return this.getMemberGroupConditionElementsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{id?: string, name?: string, nameValuePairVariable?: Array<{id?: string, name?: string, value?: string}>, negate?: boolean, parentElementName?: string, simpleConditionOperator?: string, simpleConditionValue?: string, simpleConditionVariable?: string, type?: 'andListCondition' | 'orListCondition' | 'simpleCondition' | 'trueCondition'}>})
    );
  }

  /**
   * @param params The `MemberGroupsService.CreateMemberGroupConditionElementParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `body`: The request body.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  createMemberGroupConditionElementResponse(params: MemberGroupsService.CreateMemberGroupConditionElementParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/member-groups/${params.id}/condition-elements`,
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
   * @param params The `MemberGroupsService.CreateMemberGroupConditionElementParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `body`: The request body.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  createMemberGroupConditionElement(params: MemberGroupsService.CreateMemberGroupConditionElementParams): __Observable<null> {
    return this.createMemberGroupConditionElementResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MemberGroupsService.DeleteMemberGroupConditionElementParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `elementId`: The unique numeric ID for identifying the condition element.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteMemberGroupConditionElementResponse(params: MemberGroupsService.DeleteMemberGroupConditionElementParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/member-groups/${params.id}/condition-elements/${params.elementId}`,
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
   * @param params The `MemberGroupsService.DeleteMemberGroupConditionElementParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `elementId`: The unique numeric ID for identifying the condition element.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteMemberGroupConditionElement(params: MemberGroupsService.DeleteMemberGroupConditionElementParams): __Observable<null> {
    return this.deleteMemberGroupConditionElementResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MemberGroupsService.UpdateMemberGroupConditionElementParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `elementId`: The unique numeric ID for identifying the condition element.
   *
   * - `body`: The request body.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  updateMemberGroupConditionElementResponse(params: MemberGroupsService.UpdateMemberGroupConditionElementParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = params.body;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/member-groups/${params.id}/condition-elements/${params.elementId}`,
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
   * @param params The `MemberGroupsService.UpdateMemberGroupConditionElementParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `elementId`: The unique numeric ID for identifying the condition element.
   *
   * - `body`: The request body.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  updateMemberGroupConditionElement(params: MemberGroupsService.UpdateMemberGroupConditionElementParams): __Observable<null> {
    return this.updateMemberGroupConditionElementResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MemberGroupsService.GetMemberGroupDescriptionsParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getMemberGroupDescriptionsResponse(params: MemberGroupsService.GetMemberGroupDescriptionsParams): __Observable<__StrictHttpResponse<{count?: number, items?: Array<{languageId?: number, longDescription?: string, shortDescription?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.dataLanguageIds != null) __params = __params.set('dataLanguageIds', params.dataLanguageIds.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/member-groups/${params.id}/descriptions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count?: number, items?: Array<{languageId?: number, longDescription?: string, shortDescription?: string}>}>;
      })
    );
  }

  /**
   * @param params The `MemberGroupsService.GetMemberGroupDescriptionsParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `dataLanguageIds`: The integer(s) for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getMemberGroupDescriptions(params: MemberGroupsService.GetMemberGroupDescriptionsParams): __Observable<{count?: number, items?: Array<{languageId?: number, longDescription?: string, shortDescription?: string}>}> {
    return this.getMemberGroupDescriptionsResponse(params).pipe(
      __map(_r => _r.body as {count?: number, items?: Array<{languageId?: number, longDescription?: string, shortDescription?: string}>})
    );
  }

  /**
   * @param params The `MemberGroupsService.CreateMemberGroupDescriptionParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `body`: The request body.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  createMemberGroupDescriptionResponse(params: MemberGroupsService.CreateMemberGroupDescriptionParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/member-groups/${params.id}/descriptions`,
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
   * @param params The `MemberGroupsService.CreateMemberGroupDescriptionParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `body`: The request body.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  createMemberGroupDescription(params: MemberGroupsService.CreateMemberGroupDescriptionParams): __Observable<null> {
    return this.createMemberGroupDescriptionResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MemberGroupsService.DeleteMemberGroupDescriptionParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `languageId`: The integer for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteMemberGroupDescriptionResponse(params: MemberGroupsService.DeleteMemberGroupDescriptionParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/member-groups/${params.id}/descriptions/${params.languageId}`,
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
   * @param params The `MemberGroupsService.DeleteMemberGroupDescriptionParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `languageId`: The integer for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  deleteMemberGroupDescription(params: MemberGroupsService.DeleteMemberGroupDescriptionParams): __Observable<null> {
    return this.deleteMemberGroupDescriptionResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MemberGroupsService.GetMemberGroupDescriptionParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `languageId`: The integer for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getMemberGroupDescriptionResponse(params: MemberGroupsService.GetMemberGroupDescriptionParams): __Observable<__StrictHttpResponse<{languageId?: number, longDescription?: string, shortDescription?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/member-groups/${params.id}/descriptions/${params.languageId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{languageId?: number, longDescription?: string, shortDescription?: string}>;
      })
    );
  }

  /**
   * @param params The `MemberGroupsService.GetMemberGroupDescriptionParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `languageId`: The integer for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   *
   * @return The operation is successful.
   */
  getMemberGroupDescription(params: MemberGroupsService.GetMemberGroupDescriptionParams): __Observable<{languageId?: number, longDescription?: string, shortDescription?: string}> {
    return this.getMemberGroupDescriptionResponse(params).pipe(
      __map(_r => _r.body as {languageId?: number, longDescription?: string, shortDescription?: string})
    );
  }

  /**
   * @param params The `MemberGroupsService.UpdateMemberGroupDescriptionParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `languageId`: The integer for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center.
   *
   * - `body`: The request body.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  updateMemberGroupDescriptionResponse(params: MemberGroupsService.UpdateMemberGroupDescriptionParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = params.body;
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/member-groups/${params.id}/descriptions/${params.languageId}`,
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
   * @param params The `MemberGroupsService.UpdateMemberGroupDescriptionParams` containing the following parameters:
   *
   * - `id`: The unique numeric ID for identifying the member group.
   *
   * - `languageId`: The integer for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center.
   *
   * - `body`: The request body.
   *
   * - `storeId`: The unique numeric ID for identifying the store.
   */
  updateMemberGroupDescription(params: MemberGroupsService.UpdateMemberGroupDescriptionParams): __Observable<null> {
    return this.updateMemberGroupDescriptionResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module MemberGroupsService {

  /**
   * Parameters for getMemberGroups
   */
  export interface GetMemberGroupsParams {

    /**
     * The member group's usage. Available values:
     * * GeneralPurpose - A general grouping of persons and/or organizations.
     * * AccessControl - A group of persons specified as part of an access control policy.
     * * CustomerTerritory - A group of customers, typically by territory.
     * * CustomerServiceRepresentative - A group of customer service representatives, which in turn can have customer territory groups or customer accounts assigned to them.
     * * RegisteredCustomer - A group of buyer organizations that have registered to a seller organization.
     * * CustomerPrice - A group of customers that are entitled to get a contract's terms and conditions; often used to enforce custom pricing for the group. Customer price groups can comprise any user, who can be included and excluded explicitly.
     * * CustomerSegment - A group of persons based on common attributes, for example demographics or purchase history. This group is used in marketing campaigns.
     * * RFQResponseApproval - An organization that wants request for quote (RFQ) response approvals owns a member group of this usage. The group contains persons that are able to approve RFQ responses.
     * * DisableInheritedRFQResponseApproval - An organization that does not want request for quote (RFQ) response approvals owns a member group of this usage.
     * * OrderProcessApproval - An organization that wants order approvals owns a member group of this usage. The group contains persons that are able to approve orders.
     * * DisableInheritedOrderProcessApproval - An organization that does not want order approvals owns a member group of this usage.
     * * ContractSubmitApproval - An organization that wants contract approvals owns a member group of this usage. The group contains persons that are able to approve contracts.
     * * DisableInheritedContractSubmitApproval - An organization that does not want contract approvals owns a member group of this usage.
     * * UserRegistrationApproval - An organization that wants user registration approvals owns a member group of this usage. The group contains persons that are able to approve user registration requests.
     * * DisableInheritedUserRegistrationApproval - An organization that does not want user registration approvals owns a member group of this usage.
     * * ResellerRegistrationApproval - An organization that wants reseller registration approvals owns a member group of this usage. The group contains persons that are able to approve reseller registration requests.
     * * DisableInheritedResellerRegistrationApproval - An organization that does not want reseller registration approvals owns a member group of this usage.
     */
    usage: Array<string>;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;

    /**
     * The search string used to search for member groups.
     */
    searchString?: string;

    /**
     * The parent organization id used to filter the member groups.
     */
    ownerId?: string;

    /**
     * The comma-separated set of properties that control the order of the listed items. Properties can be prefixed by either (-) to sort in descending order, or (+) to sort in ascending order. By default, properties are sorted in ascending order. For example, sort=name,-type will order the items first based on the name value in ascending order, and then by their type value in descending order. |
     * Available values:
     * * +name
     * * -name
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
   * Parameters for createMemberGroup
   */
  export interface CreateMemberGroupParams {

    /**
     * The request body.
     */
    body: {allowExport?: boolean, description?: string, exportAll?: boolean, id?: string, name?: string, ownerId?: string, storeId?: number, updatedBy?: string, updatedDateTime?: string, usage?: 'GeneralPurpose' | 'AccessControl' | 'CustomerTerritory' | 'CustomerServiceRepresentative' | 'RegisteredCustomer' | 'CustomerPrice' | 'CustomerSegment' | 'RFQResponseApproval' | 'DisableInheritedRFQResponseApproval' | 'OrderProcessApproval' | 'DisableInheritedOrderProcessApproval' | 'ContractSubmitApproval' | 'DisableInheritedContractSubmitApproval' | 'UserRegistrationApproval' | 'DisableInheritedUserRegistrationApproval' | 'ResellerRegistrationApproval' | 'DisableInheritedResellerRegistrationApproval'};

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }

  /**
   * Parameters for deleteMemberGroup
   */
  export interface DeleteMemberGroupParams {

    /**
     * The unique numeric ID for identifying the member group.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }

  /**
   * Parameters for getMemberGroup
   */
  export interface GetMemberGroupParams {

    /**
     * The unique numeric ID for identifying the member group.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }

  /**
   * Parameters for updateMemberGroup
   */
  export interface UpdateMemberGroupParams {

    /**
     * The unique numeric ID for identifying the member group.
     */
    id: string;

    /**
     * The request body.
     */
    body: {allowExport?: boolean, description?: string, exportAll?: boolean, id?: string, name?: string, ownerId?: string, storeId?: number, updatedBy?: string, updatedDateTime?: string, usage?: 'GeneralPurpose' | 'AccessControl' | 'CustomerTerritory' | 'CustomerServiceRepresentative' | 'RegisteredCustomer' | 'CustomerPrice' | 'CustomerSegment' | 'RFQResponseApproval' | 'DisableInheritedRFQResponseApproval' | 'OrderProcessApproval' | 'DisableInheritedOrderProcessApproval' | 'ContractSubmitApproval' | 'DisableInheritedContractSubmitApproval' | 'UserRegistrationApproval' | 'DisableInheritedUserRegistrationApproval' | 'ResellerRegistrationApproval' | 'DisableInheritedResellerRegistrationApproval'};

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }

  /**
   * Parameters for activateMemberGroup
   */
  export interface ActivateMemberGroupParams {

    /**
     * The unique numeric ID for identifying the member group.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }

  /**
   * Parameters for getMemberGroupConditionElements
   */
  export interface GetMemberGroupConditionElementsParams {

    /**
     * The unique numeric ID for identifying the member group.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }

  /**
   * Parameters for createMemberGroupConditionElement
   */
  export interface CreateMemberGroupConditionElementParams {

    /**
     * The unique numeric ID for identifying the member group.
     */
    id: string;

    /**
     * The request body.
     */
    body: {id?: string, name?: string, nameValuePairVariable?: Array<{id?: string, name?: string, value?: string}>, negate?: boolean, parentElementName?: string, simpleConditionOperator?: string, simpleConditionValue?: string, simpleConditionVariable?: string, type?: 'andListCondition' | 'orListCondition' | 'simpleCondition' | 'trueCondition'};

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }

  /**
   * Parameters for deleteMemberGroupConditionElement
   */
  export interface DeleteMemberGroupConditionElementParams {

    /**
     * The unique numeric ID for identifying the member group.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the condition element.
     */
    elementId: number;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }

  /**
   * Parameters for updateMemberGroupConditionElement
   */
  export interface UpdateMemberGroupConditionElementParams {

    /**
     * The unique numeric ID for identifying the member group.
     */
    id: string;

    /**
     * The unique numeric ID for identifying the condition element.
     */
    elementId: number;

    /**
     * The request body.
     */
    body: {id?: string, name?: string, nameValuePairVariable?: Array<{id?: string, name?: string, value?: string}>, negate?: boolean, parentElementName?: string, simpleConditionOperator?: string, simpleConditionValue?: string, simpleConditionVariable?: string, type?: 'andListCondition' | 'orListCondition' | 'simpleCondition' | 'trueCondition'};

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }

  /**
   * Parameters for getMemberGroupDescriptions
   */
  export interface GetMemberGroupDescriptionsParams {

    /**
     * The unique numeric ID for identifying the member group.
     */
    id: string;

    /**
     * The integer(s) for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center. Multiple identifiers should be specified as a comma-separated list.
     */
    dataLanguageIds: string;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }

  /**
   * Parameters for createMemberGroupDescription
   */
  export interface CreateMemberGroupDescriptionParams {

    /**
     * The unique numeric ID for identifying the member group.
     */
    id: string;

    /**
     * The request body.
     */
    body: {languageId?: number, longDescription?: string, shortDescription?: string};

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }

  /**
   * Parameters for deleteMemberGroupDescription
   */
  export interface DeleteMemberGroupDescriptionParams {

    /**
     * The unique numeric ID for identifying the member group.
     */
    id: string;

    /**
     * The integer for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center.
     */
    languageId: number;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }

  /**
   * Parameters for getMemberGroupDescription
   */
  export interface GetMemberGroupDescriptionParams {

    /**
     * The unique numeric ID for identifying the member group.
     */
    id: string;

    /**
     * The integer for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center.
     */
    languageId: number;

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }

  /**
   * Parameters for updateMemberGroupDescription
   */
  export interface UpdateMemberGroupDescriptionParams {

    /**
     * The unique numeric ID for identifying the member group.
     */
    id: string;

    /**
     * The integer for identifying the language of the member group description. For a list of the integers that map to the supported default languages, refer to the Knowledge Center.
     */
    languageId: number;

    /**
     * The request body.
     */
    body: {languageId?: number, longDescription?: string, shortDescription?: string};

    /**
     * The unique numeric ID for identifying the store.
     */
    storeId?: number;
  }
}

export { MemberGroupsService }
