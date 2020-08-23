/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, ValidationErrors } from "@angular/forms";
import { Subject, Subscription, Observable, Observer } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { MatStepper, MatStep } from "@angular/material/stepper";
import { AlertService } from "../../../../services/alert.service";
import { SecurityPoliciesMainService } from "../../services/security-policies-main.service";
import { UserAccountPolicyDescriptionsService } from "../../../../rest/services/user-account-policy-descriptions.service";
import { HcValidators } from "../../../../shared/validators";

@Component({
	templateUrl: "./security-policy-details.component.html",
	styleUrls: ["./security-policy-details.component.scss"],
	selector: "hc-security-policy-details"
})
export class SecurityPolicyDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() stepper: MatStepper;
	@Input() step: MatStep;
	@Input() mode: String;
	@Output() save: EventEmitter<any> = new EventEmitter<any>();

	detailsForm: FormGroup | any;
	securityPolicyName: FormControl;

	@ViewChild("securityPolicyNameInput", {static: false}) securityPolicyNameInput: ElementRef<HTMLInputElement>;

	private statusChangesSubscription: Subscription = null;
	private getUserAccountsSubscription: Subscription = null;
	private searchString: Subject<string> = new Subject<string>();
	private matchingUserAccountDescription$: Subject<any> = new Subject<any>();

	constructor(
			private router: Router,
			private route: ActivatedRoute,
			private translateService: TranslateService,
			private alertService: AlertService,
			private securityPoliciesMainService: SecurityPoliciesMainService,
			private userAccountPolicyDescriptionsService: UserAccountPolicyDescriptionsService) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		if (this.mode === "edit") {
			this.securityPoliciesMainService.loadCurrentUserAccountPolicy(Number(this.route.snapshot.params.id)).subscribe(
				response => {
					this.setValues();
					this.step.ngOnChanges();
				}
			);
		} else {
			this.setValues();
		}
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getUserAccounts(searchString);
		});
	}

	ngAfterViewInit() {
		this.step.stepControl = this.detailsForm;
		setTimeout(() => {
			this.securityPolicyNameInput.nativeElement.focus();
		}, 250);
	}

	ngOnDestroy() {
		if (this.statusChangesSubscription) {
			this.statusChangesSubscription.unsubscribe();
			this.statusChangesSubscription = null;
		}
	}

	next() {
		if (this.statusChangesSubscription) {
			this.statusChangesSubscription.unsubscribe();
			this.statusChangesSubscription = null;
		}
		this.detailsForm.markAllAsTouched();
		this.alertService.clear();
		if (this.detailsForm.pending) {
			this.statusChangesSubscription = this.detailsForm.statusChanges.subscribe(statusChange => {
				this.statusChangesSubscription.unsubscribe();
				this.next();
			});
		} else {
			if (this.detailsForm.valid) {
				this.stepper.next();
			} else {
				this.translateService.get("SECURITY_POLICIES.INPUT_ERROR").subscribe((message: string) => {
					this.alertService.error({message});
				});
			}
		}
	}

	triggerSave() {
		this.detailsForm.markAllAsTouched();
		this.save.emit(null);
	}

	validateSecurityPolicyName() {
		this.securityPoliciesMainService.userAccountPolicyData.description = this.securityPolicyName.value;
	}

	private setValues() {
		if (this.securityPoliciesMainService.userAccountPolicyData !== null) {
			const userAccountPolicyData = this.securityPoliciesMainService.userAccountPolicyData;
			this.securityPolicyName.setValue(userAccountPolicyData.description);
		} else {
			this.securityPoliciesMainService.userAccountPolicyData = {};
		}
	}

	private getUserAccounts(searchString) {
		if (this.getUserAccountsSubscription != null) {
			this.getUserAccountsSubscription.unsubscribe();
			this.getUserAccountsSubscription = null;
		}
		this.getUserAccountsSubscription = this.userAccountPolicyDescriptionsService.getUserAccountPolicyDescriptions({
			description: searchString.trim(),
			languageId: -1
		}).subscribe((body: any) => {
			this.getUserAccountsSubscription.unsubscribe();
			this.getUserAccountsSubscription = null;
			this.matchingUserAccountDescription$.next(body.items.length > 0 ? body.items[0] : null);
		});
	}

	private createFormControls() {
		this.securityPolicyName = new FormControl("", HcValidators.required, control => {
			return new Observable<ValidationErrors | null>((observer: Observer<ValidationErrors | null>) => {
				if (!control.value) {
					observer.next(null);
					observer.complete();
				} else {
					this.matchingUserAccountDescription$.subscribe((matchingUserAccountDescription: any) => {
						let errors = null;
						if (matchingUserAccountDescription) {
							const currentUserAccountPolicyId = this.securityPoliciesMainService.currentUserAccountPolicyId;
							const id = matchingUserAccountDescription.userAccountPolicyId;
							const description = matchingUserAccountDescription.description;
							if (description === control.value.trim() && currentUserAccountPolicyId !== id) {
								errors = {
									duplicateName: true
								};
							}
						}
						observer.next(errors);
						observer.complete();
					});
					this.searchString.next(control.value);
				}
			});
		});
	}

	private createForm() {
		this.detailsForm = new FormGroup({
			securityPolicyName: this.securityPolicyName
		});
	}
}

