/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { MatStep } from "@angular/material/stepper";
import { OrganizationsService } from "../../../../rest/services/organizations.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { ExtendedSiteMainService } from "../../services/extended-site-main.service";
import { AlertService } from "../../../../services/alert.service";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
	templateUrl: "./extended-site-setup.component.html",
	styleUrls: ["./extended-site-setup.component.scss"],
	selector: "hc-extended-site-setup"
})
export class ExtendedSiteSetupComponent implements OnInit, AfterViewInit {
	@Input() step: MatStep;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	setupForm: any;
	organization: FormControl;
	storefrontAssetStore: FormControl;
	catalogAssetStore: FormControl;
	sharedOwnerOrganization: FormControl;

	organizationList: Array<any> = [];
	storefrontAssetStoreList: Array<any> = [];
	catalogAssetStoreList: Array<any> = [];
	sharedOwnerOrganizationList: Array<any> = [];

	sharedOwner = false;

	@ViewChild("organizationInput", {static: false}) organizationInput: ElementRef<HTMLInputElement>;

	private organizationSearchString: Subject<string> = new Subject<string>();
	private getOrganizationsSubscription: Subscription = null;
	private storefrontAssetStoreSearchString: Subject<string> = new Subject<string>();
	private getStorefrontAssetStoresSubscription: Subscription = null;
	private catalogAssetStoreSearchString: Subject<string> = new Subject<string>();
	private getCatalogAssetStoresSubscription: Subscription = null;
	private sharedOwnerOrganizationSearchString: Subject<string> = new Subject<string>();
	private getSharedOwnerOrganizationsSubscription: Subscription = null;

	constructor(private router: Router,
			private route: ActivatedRoute,
			private translateService: TranslateService,
			private extendedSiteMainService: ExtendedSiteMainService,
			private organizationsService: OrganizationsService,
			private onlineStoresService: OnlineStoresService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.extendedSiteMainService.extendedSiteData !== null) {
			const extendedSiteData = this.extendedSiteMainService.extendedSiteData;
			this.organization.setValue(extendedSiteData.organizationName);
			this.storefrontAssetStore.setValue(extendedSiteData.storefrontAssetStoreIdentifier);
			this.catalogAssetStore.setValue(extendedSiteData.catalogAssetStoreIdentifier);
			if (extendedSiteData.sharedOwnerOrganizationId) {
				this.sharedOwner = true;
				this.sharedOwnerOrganization.setValue(extendedSiteData.sharedOwnerOrganizationName);
				this.sharedOwnerOrganization.enable();
			} else {
				this.sharedOwnerOrganization.disable();
			}
		} else {
			this.extendedSiteMainService.extendedSiteData = {
			};
			this.sharedOwnerOrganization.disable();
		}
		if (!this.extendedSiteMainService.extendedSiteData.organizationId) {
			this.getDefaultOrganization();
		}
		this.organizationSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getOrganizations(searchString);
		});
		this.storefrontAssetStoreSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getStorefrontAssetStores(searchString);
		});
		this.catalogAssetStoreSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getCatalogAssetStores(searchString);
		});
		this.sharedOwnerOrganizationSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getSharedOwnerOrganizations(searchString);
		});
		if (!this.extendedSiteMainService.extendedSiteData.storefrontAssetStoreId) {
			this.searchStorefrontAssetStores("");
		}
		if (!this.extendedSiteMainService.extendedSiteData.catalogAssetStoreId) {
			this.searchCatalogAssetStores("");
		}
	}

	ngAfterViewInit() {
		this.step.stepControl = this.setupForm;
		setTimeout(() => {
			this.organizationInput.nativeElement.focus();
		}, 250);
	}

	triggerSave() {
		this.save.emit(null);
	}

	getOrganizations(searchString: string) {
		if (this.getOrganizationsSubscription !== null) {
			this.getOrganizationsSubscription.unsubscribe();
			this.getOrganizationsSubscription = null;
		}
		this.extendedSiteMainService.extendedSiteData.organizationId = null;
		this.extendedSiteMainService.extendedSiteData.organizationName = null;
		this.getOrganizationsSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
			organizationName: searchString,
			limit: 10
		}).subscribe(
			response => {
				if (response.items.length === 1 && response.items[0].organizationName === this.organization.value) {
					this.selectOrganization(response.items[0]);
				} else {
					response.items.sort((org1, org2) => {
						let result = 0;
						if (org1.organizationName < org2.organizationName) {
							result = -1;
						} else if (org1.organizationName > org2.organizationName) {
							result = 1;
						}
						return result;
					});
					this.organizationList = response.items;
				}
				this.getOrganizationsSubscription = null;
			},
			error => {
				this.getOrganizationsSubscription = null;
				console.log(error);
			}
		);
	}

	searchOrganizations(value) {
		this.organizationSearchString.next(value);
	}

	selectOrganization(org: any) {
		this.extendedSiteMainService.extendedSiteData.organizationId = org.id;
		this.extendedSiteMainService.extendedSiteData.organizationName = org.organizationName;
		this.organization.setValue(org.organizationName);
		this.extendedSiteMainService.extendedSiteData.sharedOwnerOrganizationId = null;
		this.extendedSiteMainService.extendedSiteData.sharedOwnerOrganizationName = null;
		this.sharedOwnerOrganization.setValue("");
		this.searchSharedOwnerOrganizations("");
	}

	getStorefrontAssetStores(searchString: string) {
		if (this.getStorefrontAssetStoresSubscription !== null) {
			this.getStorefrontAssetStoresSubscription.unsubscribe();
			this.getStorefrontAssetStoresSubscription = null;
		}
		this.extendedSiteMainService.extendedSiteData.storefrontAssetStoreId = null;
		this.extendedSiteMainService.extendedSiteData.storefrontAssetStoreIdentifier = null;
		this.getStorefrontAssetStoresSubscription = this.onlineStoresService.getOnlineStoresByIdentifier({
			identifier: "*" + searchString + "*",
			usage: "HCL_ESiteToolStorefrontAssetStores",
			limit: 10
		}).subscribe(
			response => {
				if (response.items.length === 1 && response.items[0].identifier === this.storefrontAssetStore.value) {
					this.selectStorefrontAssetStore(response.items[0]);
				} else {
					response.items.sort((store1, store2) => {
						let result = 0;
						if (store1.identifier < store2.identifier) {
							result = -1;
						} else if (store1.identifier > store2.identifier) {
							result = 1;
						}
						return result;
					});
					this.storefrontAssetStoreList = response.items;
				}
				this.getStorefrontAssetStoresSubscription = null;
			},
			error => {
				this.getStorefrontAssetStoresSubscription = null;
				console.log(error);
			}
		);
	}

	searchStorefrontAssetStores(value) {
		this.storefrontAssetStoreSearchString.next(value);
	}

	selectStorefrontAssetStore(store: any) {
		this.extendedSiteMainService.extendedSiteData.storefrontAssetStoreId = store.id;
		this.extendedSiteMainService.extendedSiteData.storefrontAssetStoreIdentifier = store.identifier;
		this.storefrontAssetStore.setValue(store.identifier);
	}

	getCatalogAssetStores(searchString: string) {
		if (this.getCatalogAssetStoresSubscription !== null) {
			this.getCatalogAssetStoresSubscription.unsubscribe();
			this.getCatalogAssetStoresSubscription = null;
		}
		this.extendedSiteMainService.extendedSiteData.catalogAssetStoreId = null;
		this.extendedSiteMainService.extendedSiteData.catalogAssetStoreIdentifier = null;
		this.getStorefrontAssetStoresSubscription = this.onlineStoresService.getOnlineStoresByIdentifier({
			identifier: "*" + searchString + "*",
			usage: "HCL_ESiteToolCatalogAssetStores",
			limit: 10
		}).subscribe(
			response => {
				if (response.items.length === 1 && response.items[0].identifier === this.catalogAssetStore.value) {
					this.selectCatalogAssetStore(response.items[0]);
				} else {
					response.items.sort((store1, store2) => {
						let result = 0;
						if (store1.identifier < store2.identifier) {
							result = -1;
						} else if (store1.identifier > store2.identifier) {
							result = 1;
						}
						return result;
					});
					this.catalogAssetStoreList = response.items;
				}
				this.getCatalogAssetStoresSubscription = null;
			},
			error => {
				this.getCatalogAssetStoresSubscription = null;
				console.log(error);
			}
		);
	}

	searchCatalogAssetStores(value) {
		this.catalogAssetStoreSearchString.next(value);
	}

	selectCatalogAssetStore(store: any) {
		this.extendedSiteMainService.extendedSiteData.catalogAssetStoreId = store.id;
		this.extendedSiteMainService.extendedSiteData.catalogAssetStoreIdentifier = store.identifier;
		this.catalogAssetStore.setValue(store.identifier);
	}

	sharedOwnerChecked(e: any) {
		if (e.checked) {
			this.sharedOwner = true;
			this.sharedOwnerOrganization.enable();
		} else {
			this.sharedOwner = false;
			this.sharedOwnerOrganization.disable();
			if (this.extendedSiteMainService.extendedSiteData.sharedOwnerOrganizationId) {
				this.extendedSiteMainService.extendedSiteData.sharedOwnerOrganizationId = null;
				this.extendedSiteMainService.extendedSiteData.sharedOwnerOrganizationName = null;
				this.sharedOwnerOrganization.setValue("");
				this.searchSharedOwnerOrganizations("");
			}
		}
	}

	searchSharedOwnerOrganizations(value) {
		this.sharedOwnerOrganizationSearchString.next(value);
	}

	getSharedOwnerOrganizations(searchString) {
		if (this.extendedSiteMainService.extendedSiteData.organizationId) {
			if (this.getSharedOwnerOrganizationsSubscription != null) {
				this.getSharedOwnerOrganizationsSubscription.unsubscribe();
				this.getSharedOwnerOrganizationsSubscription = null;
			}
			this.getSharedOwnerOrganizationsSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
				organizationName: searchString,
				ancestorOrganizationId: this.extendedSiteMainService.extendedSiteData.organizationId,
				limit: 11
			}).subscribe(response => {
				response.items = response.items.filter(organization =>
						organization.id !== this.extendedSiteMainService.extendedSiteData.organizationId);
				if (response.items.length === 1 && response.items[0].organizationName === this.sharedOwnerOrganization.value) {
					this.selectSharedOwnerOrganization(response.items[0]);
				} else {
					response.items.sort((org1, org2) => {
						let result = 0;
						if (org1.organizationName < org2.organizationName) {
							result = -1;
						} else if (org1.organizationName > org2.organizationName) {
							result = 1;
						}
						return result;
					});
					this.sharedOwnerOrganizationList = response.items;
				}
				this.getSharedOwnerOrganizationsSubscription = null;
			},
			error => {
				this.getSharedOwnerOrganizationsSubscription = null;
				console.log(error);
			});
		}
	}

	selectSharedOwnerOrganization(org: any) {
		if (org) {
			this.extendedSiteMainService.extendedSiteData.sharedOwnerOrganizationName = org.organizationName;
			this.extendedSiteMainService.extendedSiteData.sharedOwnerOrganizationId = org.id;
			this.sharedOwnerOrganization.setValue(org.organizationName);
		}
	}

	private createFormControls() {
		this.organization = new FormControl("", [
			Validators.required,
			organization => {
				const value = organization.value;
				const extendedSiteData = this.extendedSiteMainService.extendedSiteData;
				let errors = null;
				if (value !== "" &&
						(value !== extendedSiteData.organizationName ||
						extendedSiteData.organizationId === null)) {
					errors = {
						invalidOrganization: true
					};
				}
				return errors;
			}
		]);
		this.storefrontAssetStore = new FormControl("", [
			Validators.required,
			storefrontAssetStore => {
				const value = storefrontAssetStore.value;
				const extendedSiteData = this.extendedSiteMainService.extendedSiteData;
				let errors = null;
				if (value !== "" &&
						(value !== extendedSiteData.storefrontAssetStoreIdentifier ||
						extendedSiteData.storefrontAssetStoreId === null)) {
					errors = {
						invalidStore: true
					};
				}
				return errors;
			}
		]);
		this.catalogAssetStore = new FormControl("",
			catalogAssetStore => {
				const value = catalogAssetStore.value;
				const extendedSiteData = this.extendedSiteMainService.extendedSiteData;
				let errors = null;
				if (value !== "" &&
						(value !== extendedSiteData.catalogAssetStoreIdentifier ||
						extendedSiteData.catalogAssetStoreId === null)) {
					errors = {
						invalidStore: true
					};
				}
				return errors;
			}
		);
		this.sharedOwnerOrganization = new FormControl("", [
			Validators.required,
			sharedOwnerOrganization => {
				const value = sharedOwnerOrganization.value;
				const extendedSiteData = this.extendedSiteMainService.extendedSiteData;
				let errors = null;
				if (value !== "" &&
						(value !== extendedSiteData.sharedOwnerOrganizationName ||
						extendedSiteData.sharedOwnerOrganizationId === null)) {
					errors = {
						invalidSharedOwnerOrganization: true
					};
				}
				return errors;
			}
		]);
	}

	private createForm() {
		this.setupForm = new FormGroup({
			organization: this.organization,
			storefrontAssetStore: this.storefrontAssetStore,
			catalogAssetStore: this.catalogAssetStore,
			sharedOwnerOrganization: this.sharedOwnerOrganization
		});
	}

	private getDefaultOrganization() {
		const defaultOrganizationName = "Extended Sites Seller Organization";
		if (this.getOrganizationsSubscription !== null) {
			this.getOrganizationsSubscription.unsubscribe();
			this.getOrganizationsSubscription = null;
		}
		this.extendedSiteMainService.extendedSiteData.organizationId = null;
		this.extendedSiteMainService.extendedSiteData.organizationName = null;
		this.getOrganizationsSubscription = this.organizationsService.OrganizationGetManageableOrganizations({
			organizationName: defaultOrganizationName,
			limit: 1
		}).subscribe(
			response => {
				if (response.items.length > 0 && response.items[0].organizationName === defaultOrganizationName) {
					this.selectOrganization(response.items[0]);
				}
				this.getOrganizationsSubscription = null;
			},
			error => {
				this.getOrganizationsSubscription = null;
				console.log(error);
			}
		);
	}
}
