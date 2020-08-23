/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020
 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { Subject, Subscription, Observable, of } from "rxjs";
import { debounceTime, delay } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { AlertService } from "../../../../services/alert.service";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../../../shared/constants";
import { PreferenceService } from "../../../../services/preference.service";
import { RegistriesService } from "../../../../rest/services/registries.service";

@Component({
	templateUrl: "./registry-list.component.html",
	styleUrls: ["./registry-list.component.scss"]
})
export class RegistryListComponent implements OnInit, OnDestroy, AfterViewInit {

	listSearchForm: FormGroup;
	searchText: FormControl;

	currentSearchString = null;

	responsiveCols = 12;

	// The list of columns that will be displayed
	displayedColumns: string[] = [
		"registry",
		"status",
		"actions"
	];

	// The table model
	model = new RegistryDataSource();

	@ViewChild(MatPaginator, { static: false })
	paginator: MatPaginator;
	@ViewChild(MatSort, { static: false })
	sort: MatSort;
	// MatPaginator Inputs
	pageSize = DEFAULT_PAGE_SIZE;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	preferenceToken: string;
	activeColumn = "registry";
	sortDirection = "asc";

	private statusTextKeys = {
		"C": "REGISTRIES.STATUS_COMPLETE",
		"R": "REGISTRIES.STATUS_REFRESH"
	};
	private statusTextIndices = Object.keys(this.statusTextKeys);

	private searchString: Subject<string> = new Subject<string>();
	private getRegistriesSubscription: Subscription = null;

	constructor(private router: Router,
			private alertService: AlertService,
			private translateService: TranslateService,
			private registriesService: RegistriesService,
			private preferenceService: PreferenceService) { }

	ngOnInit() {
		this.getPreferenceData();
		this.createFormControls();
		this.createForm();

		this.searchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.preferenceService.save(this.preferenceToken, { searchString });
			this.paginator.pageIndex = 0;
			this.currentSearchString = searchString;
			this.getRegistryList();
		});
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(sort => {
			this.paginator.pageIndex = 0;
			this.preferenceService.save(this.preferenceToken, {sort: this.sort});
			this.getRegistryList();
		});
		this.getRegistryList();
	}

	ngOnDestroy() {
		this.searchString.unsubscribe();
	}

	onResponsiveColsChange(cols: number) {
		this.responsiveCols = cols;
	}

	search(searchString: string) {
		this.searchString.next(searchString);
	}

	clearSearch() {
		this.currentSearchString = null;
		this.searchText.setValue("");
		this.paginator.pageIndex = 0;
		this.preferenceService.save(this.preferenceToken, { searchString: ""});
		this.getRegistryList();
	}

	refresh() {
		this.alertService.clear();
		this.paginator.pageIndex = 0;
		this.getRegistryList();
	}

	delayedRefresh() {
		this.getRegistriesSubscription = of(null).pipe(delay(2000)).subscribe(result => {
			this.refresh();
		});
	}

	public handlePage(e: any) {
		this.pageSize = e.pageSize;
		this.preferenceService.save(this.preferenceToken, {pageSize: this.pageSize});
		this.getRegistryList();
	}

	getRegistryList() {
		const args: RegistriesService.GetRegistriesParams = {
			offset: (this.paginator.pageIndex) * this.paginator.pageSize,
			limit: this.paginator.pageSize
		};
		if (this.currentSearchString) {
			args.searchString = this.currentSearchString;
		}
		let sort = this.sort.active;
		if (this.sort.direction === "asc") {
			sort = sort;
		} else if (this.sort.direction === "desc") {
			sort = "-" + sort;
		}
		args.sort = sort;
		if (this.getRegistriesSubscription !== null) {
			this.getRegistriesSubscription.unsubscribe();
			this.getRegistriesSubscription = null;
		}
		this.getRegistriesSubscription = this.registriesService.getRegistries(args).subscribe((body: any) => {
			this.getRegistriesSubscription.unsubscribe();
			this.getRegistriesSubscription = null;
			this.paginator.length = body.count;
			let updating = false;
			const data: RegistryEntry[] = [];
			for (let i = 0; i < body.items.length; i++) {
				const item = body.items[i];
				const statusTextKey = this.statusTextKeys[item.status];
				const registryEntry: RegistryEntry = {
					name: item.name,
					status: statusTextKey
				};
				data.push(registryEntry);
				if (item.status === "R") {
					updating = true;
				}
			}
			this.model.setData(data);
			if (updating) {
				this.delayedRefresh();
			}
		});

	}

	updateRegistry(registryEntry: any) {
		this.registriesService.updateRegistryResponse(registryEntry.name).subscribe(response => {
			this.translateService.get("REGISTRIES.UPDATING_REGISTRY", {
				name: registryEntry.name
			}).subscribe((message: string) => {
				this.alertService.success({message});
			});
			registryEntry.status = this.statusTextKeys["R"];
			this.model.refresh();
			this.delayedRefresh();
		},
		errorResponse => {
			if (errorResponse.error && errorResponse.error.errors) {
				errorResponse.error.errors.forEach(error => {
					this.alertService.error({message: error.message});
				});
			} else {
				console.log(errorResponse);
			}
		});
	}

	updateAllRegistries() {
		this.alertService.clear();
		this.registriesService.updateAllRegistriesResponse().subscribe(response => {
			this.translateService.get("REGISTRIES.UPDATING_ALL_REGISTRIES").subscribe((message: string) => {
				this.alertService.success({message});
			});
			this.model.getData().forEach(registryEntry => {
				registryEntry.status = this.statusTextKeys["R"];
			});
			this.model.refresh();
			this.delayedRefresh();
		},
		errorResponse => {
			if (errorResponse.error && errorResponse.error.errors) {
				errorResponse.error.errors.forEach(error => {
					this.alertService.error({message: error.message});
				});
			} else {
				console.log(errorResponse);
			}
		});
	}

	private createFormControls() {
		this.searchText = new FormControl(this.currentSearchString);
	}

	private createForm() {
		this.listSearchForm = new FormGroup({
			searchText: this.searchText
		});
	}

	private getPreferenceData() {
		this.preferenceToken = this.router.url;
		const preference = this.preferenceService.get(this.preferenceToken);
		if (preference) {
			const {
				pageSize,
				sort,
				searchString
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
		}
	}
}

interface RegistryEntry {
	name: string;
	status: string;
}

class RegistryDataSource extends DataSource<RegistryEntry> {

	private registries$: Subject<RegistryEntry[]> = new Subject<RegistryEntry[]>();
	private registries: RegistryEntry[] = null;

	setData(registries: RegistryEntry[]) {
		this.registries = registries;
		this.registries$.next(registries);
	}

	getData(): RegistryEntry[] {
		return this.registries;
	}

	refresh() {
		this.registries$.next(this.registries);
	}

	connect(): Observable<RegistryEntry[]> {
		return this.registries$.asObservable();
	}

	disconnect() {}
}
