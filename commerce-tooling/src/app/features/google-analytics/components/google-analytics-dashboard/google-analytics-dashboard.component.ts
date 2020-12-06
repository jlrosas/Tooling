/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020
 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { debounceTime } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { Subject, Subscription } from "rxjs";
import { FormGroup, FormControl } from "@angular/forms";
import { GoogleAnalyticsService } from "../../../../rest/services/google-analytics.service";
import { OnlineStoresService } from "../../../../rest/services/online-stores.service";
import { CurrentUserService } from "../../../../services/current-user.service";

declare const gapi: any;
declare const google: any;
const START_DATE_90_DAYS_AGO: any = "90daysAgo";
const END_DATE_TODAY: any = "today";

@Component({
	templateUrl: "./google-analytics-dashboard.component.html",
	styleUrls: ["./google-analytics-dashboard.component.scss"]
})
export class GoogleAnalyticsDashboardComponent implements OnInit, OnDestroy, AfterViewInit {
	dashboardStoreForm: FormGroup;
	store: FormControl;
	startDatePicker: FormControl;
	endDatePicker: FormControl;

	isLoading = false;
	isAuthenticated = false;
	isConfigured = false;

	storeList: Array<any> = [];
	selectedStore;
	showFilters = false;
	selectedStartDate = null;
	selectedEndDate = null;
	dashboardElementsSize = null;

	private translations = null;
	private accessToken = null;
	private clientId = null;
	private viewId = null;
	private scopes = null;

	private getGoogleAccessTokenSubscription: Subscription = null;
	private getGoogleAnalyticsConfigurationSubscription: Subscription = null;
	private getStoresSubscription: Subscription = null;
	private getStoreNameSubscription: Subscription = null;
	private storeSearchString: Subject<string> = new Subject<string>();
	private onLangChangeSubscription: Subscription = null;

	constructor(private translateService: TranslateService,
		private onlineStoresService: OnlineStoresService,
		private currentUserService: CurrentUserService,
		private googleAnalyticsService: GoogleAnalyticsService) {}

	ngOnInit() {
		this.isLoading = true;

		this.createFormControls();
		this.createForm();
		this.loadTranslatables();

		this.storeSearchString.pipe(debounceTime(250)).subscribe(searchString => {
			this.getStores(searchString);
		});
		this.onLangChangeSubscription = this.translateService.onLangChange.subscribe(() => {
			this.loadTranslatables();
		});
	}

	ngOnDestroy() {
		this.storeSearchString.unsubscribe();
		this.onLangChangeSubscription.unsubscribe();
	}

	ngAfterViewInit() {

		this.getStoreNameSubscription = this.currentUserService.getStoreName().subscribe((storeName: string) => {
			if (storeName) {
				this.onlineStoresService.getOnlineStoresByIdentifier({
					identifier: storeName,
					usage: "HCL_GoogleAnalyticsTool",
					limit: 1
				}).subscribe(onlineStoreResponse => {
					if (this.getStoreNameSubscription) {
						this.getStoreNameSubscription.unsubscribe();
						this.getStoreNameSubscription = null;
					}
					const storeArray = onlineStoreResponse.items;
					for (let i = 0; i < storeArray.length; i++) {
						const store = storeArray[i];
						if (storeName === store.identifier) {
							this.selectStore(store);
							break;
						}
					}
					if (this.selectedStore === null) {
						this.getFirstStore();
					}
				});
			} else {
				this.getFirstStore();
			}
		});

	}

	toggleShowFilters(e: any) {
		this.showFilters = e.checked;
	}

	startDateFilter = (d: Date | null): boolean => {
		let includeDate = true;
		if (this.endDatePicker.value && this.startDatePicker.value && new Date(this.endDatePicker.value) < new Date(this.startDatePicker.value)) {
			includeDate = true;
		} else if (d && this.endDatePicker.value) {
			includeDate = d <= new Date(this.endDatePicker.value);
		}
		return includeDate && d <= new Date();
	}

	endDateFilter = (d: Date | null): boolean => {
		let includeDate = true;
		if (this.endDatePicker.value && this.startDatePicker.value && new Date(this.endDatePicker.value) < new Date(this.startDatePicker.value)) {
			includeDate = true;
		} else if (d && this.startDatePicker.value) {
			includeDate = d >= new Date(this.startDatePicker.value);
		}
		return includeDate && d <= new Date();
	}

	selectStartDate(startDate: string) {
		if (!startDate) {
			startDate = START_DATE_90_DAYS_AGO;
		}
		if (this.selectedStartDate !== startDate) {
			const start = new Date(startDate);
			if (start instanceof Date && !isNaN(start.getTime())) {
				const year = start.getFullYear();
				let month: any = start.getMonth() + 1;
				if (month < 10) {
					month = "0" + month;
				}
				let day: any = start.getDate();
				if (day < 10) {
					day = "0" + day;
				}
				this.selectedStartDate = year + "-" + month + "-" + day;
			} else {
				this.startDatePicker.setValue(null);
				this.selectedStartDate = START_DATE_90_DAYS_AGO;
			}
		}
		this.getGoogleOAuthToken();
	}

	selectEndDate(endDate: string) {
		if (!endDate) {
			endDate = END_DATE_TODAY;
		}
		if (this.selectedEndDate !== endDate) {
			const end = new Date(endDate);
			if (end instanceof Date && !isNaN(end.getTime())) {
				const year = end.getFullYear();
				let month: any = end.getMonth() + 1;
				if (month < 10) {
					month = "0" + month;
				}
				let day: any = end.getDate();
				if (day < 10) {
					day = "0" + day;
				}
				this.selectedEndDate = year + "-" + month + "-" + day;
			} else {
				this.endDatePicker.setValue(null);
				this.selectedEndDate = END_DATE_TODAY;
			}
		}
		this.getGoogleOAuthToken();
	}

	clearStartDate($event) {
		$event.stopPropagation();

		this.selectedStartDate = START_DATE_90_DAYS_AGO;
		this.startDatePicker.setValue(null);
		this.getGoogleOAuthToken();
	}

	clearEndDate($event) {
		$event.stopPropagation();

		this.selectedEndDate = END_DATE_TODAY;
		this.endDatePicker.setValue(null);
		this.getGoogleOAuthToken();
	}

	getGoogleOAuthToken() {
		if (this.getGoogleAccessTokenSubscription !== null) {
			this.getGoogleAccessTokenSubscription.unsubscribe();
			this.getGoogleAccessTokenSubscription = null;
		}
		this.isAuthenticated = false;
		this.accessToken = null;
		this.scopes = null;
		this.getGoogleAccessTokenSubscription = this.googleAnalyticsService.getGoogleOAuthAccessToken().subscribe((body: any) => {
			this.getGoogleAccessTokenSubscription.unsubscribe();
			this.getGoogleAccessTokenSubscription = null;
			this.accessToken = body.response.token;
			this.scopes = body.response.scopes;

			if (this.accessToken) {
				this.isAuthenticated = true;
				this.queryGoogleAnalytics();
			}
		});
	}

	getGoogleAnalyticsConfiguration() {
		if (this.getGoogleAnalyticsConfigurationSubscription !== null) {
			this.getGoogleAnalyticsConfigurationSubscription.unsubscribe();
			this.getGoogleAnalyticsConfigurationSubscription = null;
		}
		this.isConfigured = false;
		this.isLoading = true;
		this.clientId = null;
		this.viewId = null;

		this.getGoogleAnalyticsConfigurationSubscription = this.googleAnalyticsService.
				getGoogleAnalyticsConfiguration(this.selectedStore.id).subscribe((body: any) => {
			this.getGoogleAnalyticsConfigurationSubscription.unsubscribe();
			this.getGoogleAnalyticsConfigurationSubscription = null;

			this.clientId = body.response.clientId ? body.response.clientId : null;
			this.viewId = body.response.viewId ? body.response.viewId : null;

			if (this.clientId && this.viewId) {
				this.isConfigured = true;
				this.getGoogleOAuthToken();
			}
			this.isLoading = false;
		});
	}

	searchStores(searchString: string) {
		this.storeSearchString.next(searchString);
	}

	getStores(searchString: string) {
		if (this.getStoresSubscription != null) {
			this.getStoresSubscription.unsubscribe();
			this.getStoresSubscription = null;
		}
		this.getStoresSubscription = this.onlineStoresService.getOnlineStoresByIdentifier({
			usage: "HCL_GoogleAnalyticsTool",
			identifier: "*" + searchString + "*",
			limit: 10
		}).subscribe(response => {
			this.getStoresSubscription = null;
			if (response.items.length === 1 && response.items[0].identifier === this.store.value) {
				this.selectStore(response.items[0]);
			} else {
				this.storeList = response.items;
			}
		},
		error => {
			this.getStoresSubscription = null;
		});
	}

	selectStore(store: any) {
		if (this.getStoreNameSubscription) {
			this.getStoreNameSubscription.unsubscribe();
			this.getStoreNameSubscription = null;
		}
		const currentStoreId = this.selectedStore ? this.selectedStore.id : null;
		this.currentUserService.setPreferredStore(store.identifier);
		this.selectedStore = store;
		this.store.setValue(store.identifier);
		if (currentStoreId !== store.id) {
			this.storeList = [];
			this.searchStores("");
		}
		this.getGoogleAnalyticsConfiguration();
	}

	resetSelectedStore() {
		if (this.selectedStore) {
			this.store.setValue(this.selectedStore.identifier);
		}
	}

	refresh() {
		this.getGoogleOAuthToken();
	}

	queryGoogleAnalytics() {
		if (this.translations && this.accessToken && this.clientId && this.viewId) {
			const accessToken = this.accessToken;
			const clientId = this.clientId;
			const viewId = "ga:" + this.viewId;
			const scopes = this.scopes;
			let startDate = this.selectedStartDate;
			if (!startDate) {
				startDate = START_DATE_90_DAYS_AGO;
				this.selectedStartDate = startDate;
			}
			let endDate = this.selectedEndDate;
			if (!endDate) {
				endDate = END_DATE_TODAY;
				this.selectedEndDate = endDate;
			}

			gapi.analytics.auth.authorize({
				container: "auth-button",
				clientId,
				scopes,
				"serverAuth": {
					"access_token": accessToken
				}
			});

			console.log("Is Google Session Authorized...");
			const isAuthorized = gapi.analytics.auth.isAuthorized();
			console.log(isAuthorized);

			// console.log("Authentication response...");
			const authResponse = gapi.analytics.auth.getAuthResponse();
			// console.log(authResponse);

			if (isAuthorized) {
				const dashboardItems = this.createDashboardItems();
				const newIds = {
					query: {
						ids: viewId,
						"start-date": startDate,
						"end-date": endDate
					}
				};
				dashboardItems.forEach(element => {
					element.set(newIds).execute();
				});
			}
		}
	}

	createDashboardItems() {

		let el = {
			salesFunnel: null,
			topSearches: null,
			revenueCategory: null,
			productPerformance: null,
		};

		const dashboardItems = [];

		const sales = this.getData("ga:transactionRevenue").on("success", response => {
			if (response.rows) {
				const salesValue = parseFloat(response.rows[0][0]).toFixed(2);
				document.getElementById("total_revenue").innerHTML = this.translations["GOOGLE_ANALYTICS.DOLLAR_SIGN"] + salesValue;
			}
		});

		const orders = this.getData("ga:transactions").on("success", response => {
			if (response.rows) {
				document.getElementById("orders").innerHTML = response.rows[0][0];
			}
		});

		const averageOrderValue = this.getData("ga:revenuePerTransaction").on("success", response => {
			if (response.rows) {
				const averageOrder = parseFloat(response.rows[0][0]).toFixed(2);
				document.getElementById("avg_order").innerHTML = this.translations["GOOGLE_ANALYTICS.DOLLAR_SIGN"] + averageOrder;
			}
		});

		const visitors = this.getData("ga:sessions").on("success", response => {
			if (response.rows) {
				document.getElementById("visits").innerHTML = response.rows[0][0];
			}
		});

		const salesFunnelData = this.getData("ga:sessions,ga:productAddsToCart,ga:productCheckouts,ga:transactions")
			.on("success", response => {

			if (response.rows) {

				const sessions: number = response.rows[0][0];
				const productAddsToCart: number = response.rows[0][1];
				const productCheckouts: number = response.rows[0][2];
				const transactions: number = response.rows[0][3];

				const percentageSessions = ((sessions / sessions * 100).toFixed(2)) + this.translations["GOOGLE_ANALYTICS.PERCENT_SIGN"];
				const percentageAddsToCart = ((productAddsToCart / sessions * 100).toFixed(2)) + this.translations["GOOGLE_ANALYTICS.PERCENT_SIGN"];
				const percentageProductCheckouts = ((productCheckouts / sessions * 100).toFixed(2)) +
					this.translations["GOOGLE_ANALYTICS.PERCENT_SIGN"];
				const percentageTransactions = ((transactions / sessions * 100).toFixed(2)) + this.translations["GOOGLE_ANALYTICS.PERCENT_SIGN"];

				google.charts.load("current", { "packages": ["corechart"] });
				// This doesn't seem to work, so waiting a few seconds for the library to load.
				// google.charts.setOnLoadCallback(...)

				setTimeout(() => {
					el = this.getDashboardElements();

					const barStyle = "stroke-color: #6699CC; stroke-opacity: 0.8; stroke-width: 2; fill-color: #6699CC; fill-opacity: 0.2";
					const data = new google.visualization.arrayToDataTable([
						[
							this.translations["GOOGLE_ANALYTICS.STAGE"],
							this.translations["GOOGLE_ANALYTICS.VISITORS"],
							{ role: "annotation" },
							{ role: "style" }
						],
						[
							this.translations["GOOGLE_ANALYTICS.TOTAL_SESSIONS"],
							Number(sessions),
							percentageSessions,
							barStyle
						],
						[
							this.translations["GOOGLE_ANALYTICS.ADDED_TO_CART"],
							Number(productAddsToCart),
							percentageAddsToCart,
							barStyle
						],
						[
							this.translations["GOOGLE_ANALYTICS.CHECKOUT"],
							Number(productCheckouts),
							percentageProductCheckouts,
							barStyle
						],
						[
							this.translations["GOOGLE_ANALYTICS.ORDER_PLACED"],
							Number(transactions),
							percentageTransactions,
							barStyle
						]
					]);

					const options = {
						height: (el.salesFunnel && el.salesFunnel.clientHeight && el.salesFunnel.clientHeight > 300) ? el.salesFunnel.clientHeight - 64 : 320,
						width: (el.salesFunnel && el.salesFunnel.clientWidth && el.salesFunnel.clientWidth > 300) ? el.salesFunnel.clientWidth - 32 : 450,
						legend: { position: "none" },
						bar: { groupWidth: "65%" },
						bars: "horizontal",
						hAxis: {
							title: this.translations["GOOGLE_ANALYTICS.VISITORS"],
							textStyle: {
								color: "black",
								fontSize: 12
							}
						},
						vAxis: {
							title: this.translations["GOOGLE_ANALYTICS.STAGE"],
							textStyle: {
								color: "black",
								fontSize: 10
							}
						},
						annotations: {
							alwaysOutside: true,
							textStyle: {
								fontName: "Roboto",
								fontSize: 12,
								bold: false,
								italic: true,
								color: "#525252",
								opacity: 1
							}
						}
					};

					const chart = new google.visualization.BarChart(document.getElementById("barchart"));
					chart.draw(data, options);

				}, 2500);
			}

		});

		const searchKeywordTableOptions = {
			width: "100%",
			page: true,
			pageSize: 10,
		};

		const searchKeywordTable = this.createTable("ga:searchKeyword", "ga:searchUniques", "TABLE", "ga_searchTable",
			"-ga:searchUniques", 50, searchKeywordTableOptions);

		const revenuePerCategoryOptions = {
			is3D: false,
			pieSliceText: "percentage",
			pieSliceBorderColor: "#6699CC",
			pieSliceTextStyle: {
				color: "#6699CC",
				fontSize: 12
			},
			colors: [
				"LightCyan", "PowderBlue", "Azure", "Lavender", "Thistle", "Gainsboro", "Cornsilk", "WhiteSmoke"
			],
			legend: {
				position: "bottom",
				alignment: "center",
				textStyle: {
					color: "black",
					fontSize: 12
				}
			}
		};
		const revenueByCategoryQueryOptions = {
			"filters" : "ga:productCategoryHierarchy!=(not set)",
			"sort": "-ga:itemRevenue"
		};
		const revenuePerCategory = this.createChart("ga:productCategoryHierarchy", "ga:itemRevenue", "PIE", "ga_category",
			revenueByCategoryQueryOptions,
			revenuePerCategoryOptions,
			"revenueCategory");

		const productTableOptions = {
			width: "100%",
			page: true,
			pageSize: 10,
			frozenColumns: 0
		};
		const productData = this.createTable("ga:productName",
			"ga:itemRevenue,ga:productAddsToCart,ga:productRemovesFromCart,ga:productCheckouts,ga:productDetailViews,ga:productListClicks,ga:productListViews",
			"TABLE", "productData", "-ga:itemRevenue", 50, productTableOptions);

		dashboardItems.push(sales, orders, averageOrderValue, visitors, revenuePerCategory, productData, salesFunnelData, searchKeywordTable);

		return dashboardItems;
	}

	getData(metrics) {
		return new gapi.analytics.report.Data({
			query: {
				"start-date": this.selectedStartDate,
				"end-date": this.selectedEndDate,
				metrics
			}
		});
	}

	createChart(dimensions, metrics, chartType, container, queryOpt, opt, name) {
		const elements = this.getDashboardElements();

		return new gapi.analytics.googleCharts.DataChart({
			reportType: "ga",
			query: {
				metrics,
				dimensions,
				"start-date": this.selectedStartDate,
				"end-date": this.selectedEndDate,
				...queryOpt
			},
			chart: {
				container,
				type: chartType,
				options: {
					fontSize: 12,
					height: (elements[name] && elements[name].clientHeight) ? elements[name].clientHeight : 300,
					width: (elements[name] && elements[name].clientWidth) ? elements[name].clientWidth : 350,
					...opt
				}
			}
		});
	}

	createTable(dimensions, metrics, chartType, container, sortOption, maxResults, opt) {
		return new gapi.analytics.googleCharts.DataChart({
			reportType: "ga",
			query: {
				"start-date": this.selectedStartDate,
				"end-date": this.selectedEndDate,
				"metrics": metrics,
				"dimensions": dimensions,
				"sort": sortOption,
				"max-results": maxResults
			},
			chart: {
				container,
				type: chartType,
				options: {
					fontSize: 12,
					...opt
				}
			}
		});
	}

	private getDashboardElements() {
		const elements = {
			salesFunnel: document.querySelector(".ga-chart-sales-funnel"),
			topSearches: document.querySelector(".ga-chart-top-searches"),
			revenueCategory: document.querySelector(".ga-chart-revenue-category"),
			productPerformance: document.querySelector(".ga-product-performance"),
		};

		return elements;
	}

	private loadTranslatables() {
		this.translateService.get([
			"GOOGLE_ANALYTICS.DOLLAR_SIGN",
			"GOOGLE_ANALYTICS.PERCENT_SIGN",
			"GOOGLE_ANALYTICS.STAGE",
			"GOOGLE_ANALYTICS.VISITORS",
			"GOOGLE_ANALYTICS.ADDED_TO_CART",
			"GOOGLE_ANALYTICS.CHECKOUT",
			"GOOGLE_ANALYTICS.ORDER_PLACED",
			"GOOGLE_ANALYTICS.TOTAL_SESSIONS"
		]).subscribe(translations => {
			this.translations = translations;
			this.queryGoogleAnalytics();
		});
	}

	private getFirstStore() {
		this.onlineStoresService.getOnlineStores({
			usage: "HCL_GoogleAnalyticsTool",
			limit: 1
		}).subscribe(onlineStoreResponse => {
			const storeArray = onlineStoreResponse.items;
			for (let index = 0; index < storeArray.length; index++) {
				const store = storeArray[index];
				this.selectStore(store);
				break;
			}
		});
	}

	private createFormControls() {
		this.store = new FormControl("");
		this.startDatePicker = new FormControl(this.selectedStartDate);
		this.endDatePicker = new FormControl(this.selectedEndDate);
	}

	private createForm() {
		this.dashboardStoreForm = new FormGroup({
			store: this.store,
			startDatePicker: this.startDatePicker,
			endDatePicker: this.endDatePicker
		});
	}
}
