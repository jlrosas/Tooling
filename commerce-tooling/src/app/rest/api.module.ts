/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { OrganizationsService } from './services/organizations.service';
import { UsersService } from './services/users.service';
import { AddressesService } from './services/addresses.service';
import { RolesService } from './services/roles.service';
import { RoleAssignmentsService } from './services/role-assignments.service';
import { ApprovalStatusService } from './services/approval-status.service';
import { ApprovalTypesService } from './services/approval-types.service';
import { UserAccountPolicyDescriptionsService } from './services/user-account-policy-descriptions.service';
import { StatesService } from './services/states.service';
import { CountriesService } from './services/countries.service';
import { MemberGroupsService } from './services/member-groups.service';
import { MemberGroupMembershipsService } from './services/member-group-memberships.service';
import { RoleDescriptionsService } from './services/role-descriptions.service';
import { OnlineStoresService } from './services/online-stores.service';
import { CurrencyDescriptionsService } from './services/currency-descriptions.service';
import { LanguageDescriptionsService } from './services/language-descriptions.service';
import { TransportsService } from './services/transports.service';
import { PendingMessagesService } from './services/pending-messages.service';
import { ArchivedMessagesService } from './services/archived-messages.service';
import { AccountsService } from './services/accounts.service';
import { ContractsService } from './services/contracts.service';
import { ExtendedSitesService } from './services/extended-sites.service';
import { ShippingChargesService } from './services/shipping-charges.service';
import { PaymentMethodsService } from './services/payment-methods.service';
import { ShippingMethodsService } from './services/shipping-methods.service';
import { JobsService } from './services/jobs.service';
import { JobTypesService } from './services/job-types.service';
import { JobsStatusesService } from './services/jobs-statuses.service';
import { JobStoreCommandsService } from './services/job-store-commands.service';
import { JobSiteCommandsService } from './services/job-site-commands.service';
import { PreviewTokenService } from './services/preview-token.service';
import { SegmentService } from './services/segment.service';
import { PriceRulesService } from './services/price-rules.service';
import { CatalogFiltersService } from './services/catalog-filters.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    OrganizationsService,
    UsersService,
    AddressesService,
    RolesService,
    RoleAssignmentsService,
    ApprovalStatusService,
    ApprovalTypesService,
    UserAccountPolicyDescriptionsService,
    StatesService,
    CountriesService,
    MemberGroupsService,
    MemberGroupMembershipsService,
    RoleDescriptionsService,
    OnlineStoresService,
    CurrencyDescriptionsService,
    LanguageDescriptionsService,
    TransportsService,
    PendingMessagesService,
    ArchivedMessagesService,
    AccountsService,
    ContractsService,
    ExtendedSitesService,
    ShippingChargesService,
    PaymentMethodsService,
    ShippingMethodsService,
    JobsService,
    JobTypesService,
    JobsStatusesService,
    JobStoreCommandsService,
    JobSiteCommandsService,
    PreviewTokenService,
    SegmentService,
    PriceRulesService,
    CatalogFiltersService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
