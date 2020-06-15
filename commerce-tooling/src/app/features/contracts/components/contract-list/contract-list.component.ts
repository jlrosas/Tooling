/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject, Subscription, Observable, merge, of, Observer } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ContractsService } from "../../../../rest/services/contracts.service";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DataSource } from "@angular/cdk/table";
import { saveAs } from "file-saver";
import { AlertService } from "../../../../services/alert.service";
import { AccountsService } from "../../../../rest/services/accounts.service";
import { ContractMainService } from "../../../contracts/services/contract-main.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import { DeleteContractDialogComponent } from "../delete-contract-dialog/delete-contract-dialog.component";
import { CopyContractDialogComponent } from "../copy-contract-dialog/copy-contract-dialog.component";
import { CurrentUserService } from "../../../../services/current-user.service";

@Component({
	templateUrl: "./contract-list.component.html",
	styleUrls: ["./contract-list.component.scss"]
})
export class ContractListComponent implements OnInit, OnDestroy, AfterViewInit {
	listFilterForm: FormGroup;
	listSearchForm: FormGroup;
	searchText: FormControl;
	statusSelect: FormControl;
	accountId = null;
	storeId = null;
	showFilters = false;
	currentSearchString = null;
	statusFilter = null;
	responsiveCols = 12;
	deployEnabled = false;

	model = new ContractListDataSource();

	displayedColumns: string[] = ["name", "description", "status", "createDate", "actions"];

	@ViewChild(MatPaginator, {static: false})
	paginator: MatPaginator;
	@ViewChild(MatSort, {static: false})
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "name";
	sortDirection = "asc";

	accountName: any;

	@ViewChild("importFileInput", {static: false}) importFileInput: ElementRef<HTMLInputElement>;

	private searchString: Subject<string> = new Subject<string>();
	private getContractsSubscription: Subscription = null;
	private dialogConfig = {
		maxWidth: "80%",
		maxHeight: "100vh",
		width: "400px",
		disableClose: true,
		autoFocus: true
	};

	private statusTextKeys = {
		"draft": "CONTRACTS.STATUS_DRAFT",
		"submitted": "CONTRACTS.STATUS_SUBMITTED",
		"approved": "CONTRACTS.STATUS_APPROVED",
		"active": "CONTRACTS.STATUS_ACTIVE",
		"rejected": "CONTRACTS.STATUS_REJECTED",
		"canceled": "CONTRACTS.STATUS_CANCELED",
		"closed": "CONTRACTS.STATUS_CLOSED",
		"suspended": "CONTRACTS.STATUS_SUSPENDED",
		"deploying": "CONTRACTS.STATUS_DEPLOYING",
		"deployFailed": "CONTRACTS.STATUS_DEPLOY_FAILED"
	};
	private statusTextIndices = Object.keys(this.statusTextKeys);

	constructor(private router: Router,
			private route: ActivatedRoute,
			private translateService: TranslateService,
			private contractsService: ContractsService,
			private accountsService: AccountsService,
			private contractMainService: ContractMainService,
			private alertService: AlertService,
			private dialog: MatDialog,
			private preferenceService: PreferenceService,
			private currentUserService: CurrentUserService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();
		this.accountId = this.route.snapshot.params.accountId;
		this.storeId = this.route.snapshot.params.storeId;
		this.accountsService.getAccountById(this.route.snapshot.params.accountId).subscribe(
			response => {
				this.accountName = response.customerOrganizationName;
			}
		);
		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.preferenceService.save(this.preferenceToken, { searchString });
			this.currentSearchString = searchString;
			this.paginator.pageIndex = 0;
			this.getContracts();
		});
	}

	ngAfterViewInit() {
		this.currentUserService.getRoles().subscribe((currentUserRoles: Array<number>) => {
			for (let index = 0; index < currentUserRoles.length; index++) {
				if (currentUserRoles[index] === -1 || currentUserRoles[index] === -4 || currentUserRoles[index] === -18) {
					this.deployEnabled = true;
					break;
				}
			}
			this.getContracts();
		});
		this.sort.sortChange.subscribe(sort => {
			this.preferenceService.save(this.preferenceToken, {sort: this.sort});
			this.paginator.pageIndex = 0;
			this.getContracts();
		});
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
	}

	toggleShowFilters(e: any) {
		this.preferenceService.save(this.preferenceToken, { showFilters: e.checked });
		this.showFilters = e.checked;
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	public handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.preferenceService.save(this.preferenceToken, {pageSize: this.pageSize});
		this.getContracts();
	}

	refresh() {
		this.alertService.clear();
		this.getContracts();
	}

	createContract() {
		this.contractMainService.clearData();
		this.router.navigate(["/contracts/create-contract", {accountId: this.accountId, storeId: this.storeId}]);
	}

	resumeContract(contractId: any) {
		this.contractsService.resumeContract(contractId).subscribe(resp => {
			this.getContracts();
			this.translateService.get("CONTRACTS.CONTRACT_RESUMED_MESSAGE").subscribe((message: string) => {
				this.alertService.success({message});
			});
		},
	 	errorResponse => {
	 		if (errorResponse.error && errorResponse.error.errors) {
	 			errorResponse.error.errors.forEach(error => {
	 				this.alertService.error({message: error.errorMessage});
	 			});
	 		} else {
	 			console.log(errorResponse);
	 		}
	 	});
	}

	suspendContract(contractId: any) {
		this.contractsService.suspendContract(contractId).subscribe(resp => {
			this.getContracts();
			this.translateService.get("CONTRACTS.CONTRACT_SUSPENDED_MESSAGE").subscribe((message: string) => {
				this.alertService.success({message});
			});
		},
	 	errorResponse => {
	 		if (errorResponse.error && errorResponse.error.errors) {
	 			errorResponse.error.errors.forEach(error => {
	 				this.alertService.error({message: error.errorMessage});
	 			});
	 		} else {
	 			console.log(errorResponse);
	 		}
	 	});
	}

	deleteContract(contract: any) {
		const { id, name } = contract;
		const dialogRef = this.dialog.open(DeleteContractDialogComponent, {
			...this.dialogConfig,
			data: {
				id,
				name
			}
		});
		dialogRef.afterClosed().subscribe(data => {
			if (data && data.contractDeleted) {
				this.getContracts();
			}
		});
	}

	cancelContract(contractId: any) {
		this.contractsService.cancelContract(contractId).subscribe(resp => {
			this.getContracts();
			this.translateService.get("CONTRACTS.CONTRACT_CANCELED_MESSAGE").subscribe((message: string) => {
				this.alertService.success({message});
			});
		},
	 	errorResponse => {
	 		if (errorResponse.error && errorResponse.error.errors) {
	 			errorResponse.error.errors.forEach(error => {
	 				this.alertService.error({message: error.errorMessage});
	 			});
	 		} else {
	 			console.log(errorResponse);
	 		}
	 	});
	}

	copyContract(contractId: any) {
		const dialogRef = this.dialog.open(CopyContractDialogComponent, {
			...this.dialogConfig,
			data: {
				id: contractId
			}
		});
		dialogRef.afterClosed().subscribe(data => {
			if (data && data.contractCopied) {
				this.getContracts();
			}
		});
	}

	createNewContractVersion(contractId: string) {
		this.contractsService.createNewContractVersion(contractId).subscribe(resp => {
			this.getContracts();
			this.translateService.get("CONTRACTS.CONTRACT_VERSIONED_MESSAGE").subscribe((message: string) => {
				this.alertService.success({message});
			});
		},
	 	errorResponse => {
	 		if (errorResponse.error && errorResponse.error.errors) {
	 			errorResponse.error.errors.forEach(error => {
	 				this.alertService.error({message: error.errorMessage});
	 			});
	 		} else {
	 			console.log(errorResponse);
	 		}
	 	});
	}

	deployContract(contractId: any) {
		this.contractsService.deployContract(contractId).subscribe(resp => {
			this.getContracts();
			this.translateService.get("CONTRACTS.CONTRACT_DEPLOYED_MESSAGE").subscribe((message: string) => {
				this.alertService.success({message});
			});
		},
	 	errorResponse => {
	 		if (errorResponse.error && errorResponse.error.errors) {
	 			errorResponse.error.errors.forEach(error => {
	 				this.alertService.error({message: error.errorMessage});
	 			});
	 		} else {
	 			console.log(errorResponse);
	 		}
	 	});
	}

	submitContract(contractId: any) {
		this.contractsService.submitContract(contractId).subscribe(resp => {
			this.getContracts();
			this.translateService.get("CONTRACTS.CONTRACT_SUBMITTED_MESSAGE").subscribe((message: string) => {
				this.alertService.success({message});
			});
		},
	 	errorResponse => {
	 		if (errorResponse.error && errorResponse.error.errors) {
	 			errorResponse.error.errors.forEach(error => {
	 				this.alertService.error({message: error.errorMessage});
	 			});
	 		} else {
	 			console.log(errorResponse);
	 		}
	 	});
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.save(this.preferenceToken, { searchString: ""});
		this.getContracts();
	}

	searchContracts(searchString: string) {
		this.searchString.next(searchString);
	}

	selectStatus(statusIndex: any) {
		if (this.statusFilter !== statusIndex) {
			this.preferenceService.saveFilter(this.preferenceToken,
				{statusFilter: statusIndex});
			this.statusFilter = statusIndex;
			this.paginator.pageIndex = 0;
			this.getContracts();
		}
	}

	clearStatus($event) {
		this.statusFilter = null;
		this.statusSelect.setValue(null);
		this.paginator.pageIndex = 0;
		this.preferenceService.saveFilter(this.preferenceToken,
			{statusFilter: null});
		this.getContracts();
		$event.stopPropagation();
	}

	editContract(contractId: any) {
		this.router.navigate(["/contracts/edit-contract", contractId, {accountId: this.accountId, storeId: this.storeId}]);
	}

	importContract() {
		this.alertService.clear();
		const files = this.importFileInput.nativeElement.files;
		for (let i = 0; i < files.length; i++) {
			const file: any = files[i];
			file.text().then(text => {
				this.contractsService.importContract({
					storeId: this.storeId,
				 	body: text
				 }).subscribe(
				 	 response => {
				 		 this.translateService.get("CONTRACTS.CONTRACT_IMPORTED_MESSAGE").subscribe((message: string) => {
				 			 this.alertService.success({message});
				 		 });
				 		 this.getContracts();
				 	 },
				 	 errorResponse => {
				 		 if (errorResponse.error && errorResponse.error.errors) {
				 			 errorResponse.error.errors.forEach(error => {
				 				 this.alertService.error({message: error.errorMessage});
				 			 });
				 		 } else {
				 			 console.log(errorResponse);
				 		 }
				 	 }
				 );
			});
		}
	}

	exportContract(contractId: string) {
		this.alertService.clear();
		this.contractsService.exportContractResponse(contractId).subscribe(
			response => {
				saveAs(response.body, "contractexport_" + contractId + ".xml");
				this.translateService.get("CONTRACTS.CONTRACT_EXPORTED_MESSAGE").subscribe((message: string) => {
					this.alertService.success({message});
				});
			},
			errorResponse => {
				if (errorResponse.error = errorResponse.error.errors) {
					errorResponse.error.errors.forEach(error => {
						this.alertService.error({message: error.errorMessage});
					});
				} else {
					console.log(errorResponse);
				}
			}
		);
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
		this.statusSelect = new FormControl(this.statusFilter);
	}

	private createForm() {
		this.listFilterForm = new FormGroup({
			statusSelect: this.statusSelect
		});
		this.listSearchForm = new FormGroup({
			searchText: this.searchText
		});
	}

	private getContracts() {
		const args: ContractsService.GetContractsParams = {
			accountId: this.accountId,
			offset: (this.paginator.pageIndex) * this.paginator.pageSize,
			limit: this.paginator.pageSize
		};
		if (this.currentSearchString) {
			args.searchString = this.currentSearchString;
		}
		if (this.statusFilter != null) {
			args.status = this.statusFilter;
		}
		let sort = this.sort.active;
		if (this.sort.direction === "asc") {
			sort = sort;
		} else if (this.sort.direction === "desc") {
			sort = "-" + sort;
		}
		args.sort = sort;
		if (this.getContractsSubscription != null) {
			this.getContractsSubscription.unsubscribe();
			this.getContractsSubscription = null;
		}
		this.getContractsSubscription = this.contractsService.getContracts(args).subscribe((body: any) => {
			this.getContractsSubscription.unsubscribe();
			this.getContractsSubscription = null;
			this.paginator.length = body.count;
			const data: Contract[] = [];
			for (let i = 0; i < body.items.length; i++) {
				const item = body.items[i];
				const contract: Contract = {
					id: item.id,
					name: item.name,
					description: item.description,
					createDate: (new Date(item.createDate)).toLocaleString(),
					status: item.status,
					statusTextKey: this.statusTextKeys[item.status] ? this.statusTextKeys[item.status] : item.status
				};
				data.push(contract);
			}
			this.model.setData(data);
		});
	}

	private getPreferenceData() {
		this.preferenceToken = this.router.url;
		const preference = this.preferenceService.get(this.preferenceToken);
		if (preference) {
			const {
				pageSize,
				sort,
				searchString,
				filter,
				showFilters
			} = preference;
			if (pageSize) {
				this.pageSize = pageSize;
			}
			if (sort) {
				this.sort = sort ? sort : this.sort;
				this.activeColumn = sort.active;
				this.sortDirection = sort.direction;
			}
			if (searchString) {
				this.currentSearchString = searchString;
			}
			if (filter) {
				const {statusFilter} = filter;
				this.statusFilter = statusFilter;
			}
			if (showFilters) {
				this.showFilters = showFilters;
			}
		}
	}
}

interface Contract {
	id: string;
	name: string;
	description: string;
	createDate: string;
	status: string;
	statusTextKey: string;
}

/**
 * Data source to provide data to be rendered in the table.
 */
class ContractListDataSource extends DataSource<Contract> {
	private contracts$: Subject<Contract[]> = new Subject<Contract[]>();

	setData(contracts: Contract[]) {
		this.contracts$.next(contracts);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<Contract[]> {
		return this.contracts$.asObservable();
	}

	disconnect() {}
}

