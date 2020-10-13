/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { AlertService } from "../../../../services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { UsersService } from "../../../../rest/services/users.service";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";

@Component({
	templateUrl: "./password-reset-dialog.component.html",
	styleUrls: ["./password-reset-dialog.component.scss"]
})
export class PasswordResetDialogComponent implements OnInit, OnDestroy {
	passwordResetForm: FormGroup;
	storeDropdown:  FormControl;
	passwordResetName: string;
	passwordResetId: string;
	processing = false;

	storeOwnerIds: Array<any> = [];
	storeList: Array<any> = [];
	selectedStore = null;
	userHasMultipleStoreRegisteredCustomerRoles = false;
	storesLoading = false;

	private getStoresSubscription: Subscription = null;
	private storeSearchString: Subject<string> = new Subject<string>();

	constructor(private alertService: AlertService,
			private translateService: TranslateService,
			private usersService: UsersService,
			private fb: FormBuilder,
			private onlineStoresService: OnlineStoresService,
			private dialogRef: MatDialogRef<PasswordResetDialogComponent>,
			@Inject(MAT_DIALOG_DATA) data) {
		this.passwordResetName = data.name;
		this.passwordResetId = data.id;
		this.storeOwnerIds = data.storeOwnerIds;
	}

	ngOnInit() {
		this.storeDropdown = new FormControl("", [
			Validators.required,
			control => {
				const value = control.value;
				let errors = null;
				if (value !== "" && (!this.selectedStore || value !== this.selectedStore.identifier)) {
					errors = {
						invalidStore: true
					};
				}
				return errors;
			}
		]);
		this.passwordResetForm = this.fb.group({
			storeDropdown: this.storeDropdown
		});
		this.storeSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getStores(searchString);
		});

		this.getStores("");
	}

	ngOnDestroy() {
		this.storeSearchString.unsubscribe();
	}

	cancel() {
		if (!this.processing) {
			this.dialogRef.close();
		}
	}

	resetPassword() {
		this.passwordResetForm.markAllAsTouched();
		this.alertService.clear();
		if (this.passwordResetForm.valid) {
			if (!this.processing) {
				this.alertService.clear();
				this.processing = true;
				let storeId = 0;
				if (this.selectedStore != null) {
					storeId = this.selectedStore.id;
				}
				this.usersService.UsersResetUserPassword({
					id: this.passwordResetId,
					storeId
				}).subscribe(response => {
					this.translateService.get("USER_MANAGEMENT.PASSWORD_RESET_SUCCESS").subscribe((message: string) => {
						this.alertService.success({message});
					});
					this.processing = false;
					this.dialogRef.close({ passwordReset: true });
				},
				errorResponse => {
					this.processing = false;
				});
			}
		} else {
			this.translateService.get("USER_MANAGEMENT.INPUT_ERROR").subscribe((message: string) => {
				this.alertService.error({message, clear: true});
			});
		}
	}

	searchStores(searchString: string) {
		this.storeSearchString.next(searchString);
	}

	getStores(searchString: string) {
		this.storesLoading = true;
		this.storeList = [];
		if (this.getStoresSubscription !== null) {
			this.getStoresSubscription.unsubscribe();
			this.getStoresSubscription = null;
		}
		this.getStoresSubscription = this.onlineStoresService.getOnlineStores({
			usage: "HCL_UserTool",
			searchString,
			ownerId: this.storeOwnerIds,
			limit: 10
	 	}).subscribe(response => {
			this.getStoresSubscription = null;
			this.storeList = response.items;
			if (response.items.length > 0) {
				if (response.items.length === 1) {
					this.selectStore(response.items[0]);
				} else {
					this.userHasMultipleStoreRegisteredCustomerRoles = true;
				}
			}
			this.storesLoading = false;
		},
		error => {
			this.getStoresSubscription = null;
			this.storesLoading = false;
		});
	}

	selectStore(store: any) {
		this.selectedStore = store;
		this.storeDropdown.setValue(store.identifier);
	}
}
