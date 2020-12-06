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
import { OrdersService } from './services/orders.service';
import { OrderItemsService } from './services/order-items.service';
import { RegistriesService } from './services/registries.service';
import { StoreTransportsService } from './services/store-transports.service';
import { PasswordPoliciesService } from './services/password-policies.service';
import { PasswordPolicyDescriptionsService } from './services/password-policy-descriptions.service';
import { UserAccountLockoutPoliciesService } from './services/user-account-lockout-policies.service';
import { UserAccountLockoutPolicyDescriptionsService } from './services/user-account-lockout-policy-descriptions.service';
import { UserAccountPoliciesService } from './services/user-account-policies.service';
import { TaxCategoriesService } from './services/tax-categories.service';
import { TaxCategoryDescriptionsService } from './services/tax-category-descriptions.service';
import { JurisdictionsService } from './services/jurisdictions.service';
import { JurisdictionGroupsService } from './services/jurisdiction-groups.service';
import { JurisdictionGroupRelationshipsService } from './services/jurisdiction-group-relationships.service';
import { FulfillmentCentersService } from './services/fulfillment-centers.service';
import { CalculationRulesService } from './services/calculation-rules.service';
import { CalculationScalesService } from './services/calculation-scales.service';
import { CalculationRuleScalesService } from './services/calculation-rule-scales.service';
import { CalculationRangesService } from './services/calculation-ranges.service';
import { CalculationRangeDetailsService } from './services/calculation-range-details.service';
import { CalculationCodesService } from './services/calculation-codes.service';
import { CalculationCodeDescriptionsService } from './services/calculation-code-descriptions.service';
import { QuantityUnitsService } from './services/quantity-units.service';
import { TaxJurisdictionCalculationRulesService } from './services/tax-jurisdiction-calculation-rules.service';
import { ShippingModesService } from './services/shipping-modes.service';
import { QuantityUnitDescriptionsService } from './services/quantity-unit-descriptions.service';
import { ShippingModeDescriptionsService } from './services/shipping-mode-descriptions.service';
import { ShippingModeCarriersService } from './services/shipping-mode-carriers.service';
import { ShippingModeCodesService } from './services/shipping-mode-codes.service';
import { ShippingJurisdictionCalculationRulesService } from './services/shipping-jurisdiction-calculation-rules.service';
import { ShippingArrangementsService } from './services/shipping-arrangements.service';
import { StoreEntityCalculationUsagesService } from './services/store-entity-calculation-usages.service';
import { StoreDefaultsService } from './services/store-defaults.service';
import { CatalogEntriesService } from './services/catalog-entries.service';
import { CatalogGroupsService } from './services/catalog-groups.service';
import { CatalogEntryCalculationCodesService } from './services/catalog-entry-calculation-codes.service';
import { CatalogGroupCalculationCodesService } from './services/catalog-group-calculation-codes.service';
import { CatalogsService } from './services/catalogs.service';
import { ConnectionSpecsService } from './services/connection-specs.service';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { InteractionSpecsService } from './services/interaction-specs.service';
import { ProfilesService } from './services/profiles.service';
import { MessageTypesService } from './services/message-types.service';
import { DeviceFormatsService } from './services/device-formats.service';

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
    CatalogFiltersService,
    OrdersService,
    OrderItemsService,
    RegistriesService,
    StoreTransportsService,
    PasswordPoliciesService,
    PasswordPolicyDescriptionsService,
    UserAccountLockoutPoliciesService,
    UserAccountLockoutPolicyDescriptionsService,
    UserAccountPoliciesService,
    TaxCategoriesService,
    TaxCategoryDescriptionsService,
    JurisdictionsService,
    JurisdictionGroupsService,
    JurisdictionGroupRelationshipsService,
    FulfillmentCentersService,
    CalculationRulesService,
    CalculationScalesService,
    CalculationRuleScalesService,
    CalculationRangesService,
    CalculationRangeDetailsService,
    CalculationCodesService,
    CalculationCodeDescriptionsService,
    QuantityUnitsService,
    TaxJurisdictionCalculationRulesService,
    ShippingModesService,
    QuantityUnitDescriptionsService,
    ShippingModeDescriptionsService,
    ShippingModeCarriersService,
    ShippingModeCodesService,
    ShippingJurisdictionCalculationRulesService,
    ShippingArrangementsService,
    StoreEntityCalculationUsagesService,
    StoreDefaultsService,
    CatalogEntriesService,
    CatalogGroupsService,
    CatalogEntryCalculationCodesService,
    CatalogGroupCalculationCodesService,
    CatalogsService,
    ConnectionSpecsService,
    GoogleAnalyticsService,
    InteractionSpecsService,
    ProfilesService,
    MessageTypesService,
    DeviceFormatsService
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
