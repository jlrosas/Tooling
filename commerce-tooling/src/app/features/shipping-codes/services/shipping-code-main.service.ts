/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { EventEmitter, Injectable } from "@angular/core";
import { Observable, Observer, forkJoin } from "rxjs";
import { CalculationCodesService } from "../../../rest/services/calculation-codes.service";
import { CatalogEntryCalculationCodesService } from "../../../rest/services/catalog-entry-calculation-codes.service";
import { CatalogGroupCalculationCodesService } from "../../../rest/services/catalog-group-calculation-codes.service";
import { CatalogEntriesService } from "../../../rest/services/catalog-entries.service";
import { CatalogGroupsService } from "../../../rest/services/catalog-groups.service";
import { CatalogsService } from "../../../rest/services/catalogs.service";
import { LanguageService } from "../../../services/language.service";

export interface Category {
	id: string;
	storeId: number;
	name?: string;
	shortDescription?: string;
	parentCatalogGroupId?: string;
}
export interface Product {
	id: string;
	storeId: number;
	sku?: string;
	name?: string;
	type?: string;
	shortDescription?: string;
}

@Injectable({
	providedIn: "root"
})
export class ShippingCodeMainService {
	shippingCodeData: any = null;
	selectedCategories: Array<Category> = null;
	selectedProducts: Array<Product> = null;
	processing = false;
	currentShippingCodeId: number = null;
	currentProductsOrCategories: string = null;
	inheritedProductsOrCategories: string = null;
	readonly onSelectProductsOrCategories: EventEmitter<string> = new EventEmitter<string>();

	private currentShippingCode: any = null;
	private currentCatalogEntryCalculationCodes: Array<any> = null;
	private currentCatalogGroupCalculationCodes: Array<any> = null;
	private currentInheritedCatalogEntryCalculationCodes: Array<any> = null;
	private currentInheritedCatalogGroupCalculationCodes: Array<any> = null;

	constructor(private calculationCodeServices: CalculationCodesService,
			private catalogEntriesService: CatalogEntriesService,
			private catalogGroupsService: CatalogGroupsService,
			private catalogEntryCalculationCodesService: CatalogEntryCalculationCodesService,
			private catalogGroupCalculationCodesService: CatalogGroupCalculationCodesService,
			private catalogsService: CatalogsService,
			private languageService: LanguageService) { }

	clearData() {
		this.currentShippingCodeId = null;
		this.currentProductsOrCategories = null;
		this.inheritedProductsOrCategories = null;
		this.shippingCodeData = null;
		this.currentShippingCode = null;
		this.currentCatalogGroupCalculationCodes = null;
		this.currentCatalogEntryCalculationCodes = null;
		this.currentInheritedCatalogGroupCalculationCodes = null;
		this.currentInheritedCatalogEntryCalculationCodes = null;
		this.selectedCategories = null;
		this.selectedProducts = null;
	}

	createShippingCode(): Observable<string> {
		this.processing = true;
		return new Observable<string>((observer: Observer<string>) => {
			const args: any = {
				calculationCode: this.shippingCodeData.calculationCode,
				storeId: this.shippingCodeData.storeId,
				calculationUsageId: -2,
				combination: 0,
				groupBy: 0,
				published: 0,
				sequence: 0.0,
				displayLevel: 0,
				precedence: 0.0,
				calculationMethodId: -23,
				calculationCodeApplyMethodId: -24,
				calculationCodeQualifyMethodId: -22,
				calculationCodeQualifyMethodMode: 0
			};
			this.calculationCodeServices.createCalculationCodeResponse(args).subscribe(response => {
				const paths: Array<string> = response.headers.get("location").split("/");
				const id: string = paths[paths.length - 1];
				this.currentShippingCodeId = Number(id);
				const catalogEntryCalculationCodeRequests = this.getCreateCatalogEntryCalculationCodeRequests();
				const catalogGroupCalculationCodeRequests = this.getCreateCatalogGroupCalculationCodeRequests();
				const requests = catalogEntryCalculationCodeRequests
						.concat(catalogGroupCalculationCodeRequests);
				if (requests.length > 0) {
					forkJoin(requests).subscribe((responseList: Array<any>) => {
						observer.next(this.shippingCodeData.calculationCode);
						observer.complete();
						this.processing = false;
					},
					error => {
						observer.error(error);
						observer.complete();
						this.processing = false;
					});
				} else {
					observer.next(this.shippingCodeData.calculationCode);
					observer.complete();
					this.processing = false;
				}
			},
			error => {
				observer.error(error);
				observer.complete();
				this.processing = false;
			});
		});
	}

	updateShippingCode(storeId: number): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			if (this.currentShippingCodeId != null && this.currentShippingCode != null) {
				const data = this.shippingCodeData;
				const args: CalculationCodesService.UpdateCalculationCodeByIdParams = {
					id: this.currentShippingCodeId,
					CalculationCode: {}
				};
				if (data.calculationCode !== this.currentShippingCode.calculationCode) {
					args.CalculationCode.calculationCode = data.calculationCode;
				}
				this.calculationCodeServices.updateCalculationCodeByIdResponse(args).subscribe(response => {
					forkJoin([
						this.loadCurrentCatalogEntries(this.currentShippingCodeId, storeId),
						this.loadCurrentCatalogGroups(this.currentShippingCodeId, storeId)
					]).subscribe(loadResponseList => {
						const catalogEntryCalculationCodeRequests = this.getUpdateCatalogEntryCalculationCodeRequests(storeId);
						const catalogGroupCalculationCodeRequests = this.getUpdateCatalogGroupCalculationCodeRequests(storeId);
						const requests = catalogEntryCalculationCodeRequests
								.concat(catalogGroupCalculationCodeRequests);
						if (requests.length > 0) {
							forkJoin(requests).subscribe((responseList: Array<any>) => {
								observer.next(undefined);
								observer.complete();
								this.processing = false;
							},
							error => {
								observer.error(error);
								observer.complete();
								this.processing = false;
							});
						} else {
							observer.next(undefined);
							observer.complete();
							this.processing = false;
						}
					},
					error => {
						observer.error(error);
						observer.complete();
						this.processing = false;
					});
				}, error => {
					observer.error(error);
					observer.complete();
					this.processing = false;
				});
			} else {
				observer.next(undefined);
				observer.complete();
				this.processing = false;
			}
		});
	}

	loadCurrentShippingCode(id: number, storeId: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentShippingCode !== null && this.currentShippingCode.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentShippingCodeId) {
					this.clearData();
					this.currentShippingCodeId = id;
				}
				const requests = [
					this.calculationCodeServices.getCalculationCodeById({
						id
					}),
					this.catalogEntryCalculationCodesService.getCatalogEntryCalculationCodes({
						calculationCodeId: id,
						storeId,
						limit: 1
					}),
					this.catalogGroupCalculationCodesService.getCatalogGroupCalculationCodes({
						calculationCodeId: id,
						storeId,
						limit: 1
					})
				];
				forkJoin(requests).subscribe((responseList: Array<any>) => {
					this.currentShippingCode = responseList[0];
					let allProducts = false;
					let cancelInherited = false;
					let specificProducts = false;
					if (responseList[1].items.length === 1 && responseList[1].items[0].catalogEntryId == null) {
						if (responseList[1].items[0].calculationFlags === 1) {
							cancelInherited = true;
						} else {
							allProducts = true;
						}
					} else if (responseList[1].items.length > 0 || responseList[2].items.length > 0) {
						specificProducts = true;
					}
					if (this.currentShippingCode.storeId !== storeId) {
						this.catalogEntryCalculationCodesService.getCatalogEntryCalculationCodes({
							calculationCodeId: id,
							storeId: this.currentShippingCode.storeId,
							limit: 1
						}).subscribe((body: any) => {
							this.inheritedProductsOrCategories = "specificProducts";
							if (body.items.length === 1 && body.items[0].catalogEntryId == null) {
								this.inheritedProductsOrCategories = "allProducts";
							}
							if (!allProducts && !cancelInherited && !specificProducts) {
								this.currentProductsOrCategories = this.inheritedProductsOrCategories;
							} else {
								this.currentProductsOrCategories = "specificProducts";
								if (cancelInherited) {
									this.currentProductsOrCategories = "cancelInherited";
								} else if (allProducts) {
									this.currentProductsOrCategories = "allProducts";
								}
							}
							this.shippingCodeData = {
								id: responseList[0].id,
								storeId: responseList[0].storeId,
								calculationCode: responseList[0].calculationCode,
								productsOrCategories: this.currentProductsOrCategories
							};
							this.onSelectProductsOrCategories.emit(this.currentProductsOrCategories);
							observer.next(undefined);
							observer.complete();
						});
					} else {
						this.currentProductsOrCategories = "specificProducts";
						if (cancelInherited) {
							this.currentProductsOrCategories = "cancelInherited";
						} else if (allProducts) {
							this.currentProductsOrCategories = "allProducts";
						}
						this.shippingCodeData = {
							id: responseList[0].id,
							storeId: responseList[0].storeId,
							calculationCode: responseList[0].calculationCode,
							productsOrCategories: this.currentProductsOrCategories
						};
						this.onSelectProductsOrCategories.emit(this.currentProductsOrCategories);
						observer.next(undefined);
						observer.complete();
					}
				},
				error => {
					observer.next(undefined);
					observer.complete();
				});
			}
		});
	}

	loadCurrentCatalogEntries(id: number, storeId: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentCatalogEntryCalculationCodes !== null && this.currentShippingCodeId === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentShippingCodeId) {
					this.clearData();
					this.currentShippingCodeId = id;
				}
				const requests = [
					this.catalogEntryCalculationCodesService.getCatalogEntryCalculationCodes({
						calculationCodeId: id,
						storeId
					}),
					this.catalogsService.getCatalogs({
						storeId,
						dataLanguageIds: LanguageService.languageId.toString(),
						masterCatalog: true
					})
				];
				if (storeId !== this.currentShippingCode.storeId) {
					requests.push(this.catalogEntryCalculationCodesService.getCatalogEntryCalculationCodes({
						calculationCodeId: id,
						storeId: this.currentShippingCode.storeId
					}));
				}
				forkJoin(requests).subscribe((responseList: Array<any>) => {
					this.currentCatalogEntryCalculationCodes = responseList[0].items;
					const catalogEntryIds = [];
					responseList[0].items.forEach(catalogEntryCalculationCode => {
						if (catalogEntryCalculationCode.catalogEntryId) {
							catalogEntryIds.push(catalogEntryCalculationCode.catalogEntryId);
						}
					});
					if (responseList.length > 2) {
						this.currentInheritedCatalogEntryCalculationCodes = responseList[2].items;
						responseList[2].items.forEach(catalogEntryCalculationCode => {
							if (catalogEntryCalculationCode.catalogEntryId) {
								catalogEntryIds.push(catalogEntryCalculationCode.catalogEntryId);
							}
						});
					}
					if (catalogEntryIds.length > 0) {
						const catalogId = responseList[1].items[0].id;
						this.catalogEntriesService.getCatalogEntries({
							storeId,
							catalogId,
							dataLanguageIds: LanguageService.languageId.toString(),
							id: catalogEntryIds
						}).subscribe((body: any) => {
							this.selectedProducts = [];
							this.currentCatalogEntryCalculationCodes.forEach(catalogEntryCalculationCode => {
								for (let i = 0; i < body.items.length; i++) {
									const catalogEntry = body.items[i];
									if (catalogEntry.id === catalogEntryCalculationCode.catalogEntryId) {
										let name = "";
										let shortDescription = "";
										if (catalogEntry.descriptions && catalogEntry.descriptions.length > 0) {
											name = catalogEntry.descriptions[0].name;
											shortDescription = catalogEntry.descriptions[0].shortDescription;
										}
										this.selectedProducts.push({
											id: catalogEntry.id,
											sku: catalogEntry.partNumber,
											name,
											shortDescription,
											type: catalogEntry.typeCode,
											storeId: catalogEntryCalculationCode.storeId
										});
										break;
									}
								}
							});
							if (this.currentInheritedCatalogEntryCalculationCodes) {
								this.currentInheritedCatalogEntryCalculationCodes.forEach(catalogEntryCalculationCode => {
									for (let i = 0; i < body.items.length; i++) {
										const catalogEntry = body.items[i];
										if (catalogEntry.id === catalogEntryCalculationCode.catalogEntryId) {
											let name = "";
											let shortDescription = "";
											if (catalogEntry.descriptions && catalogEntry.descriptions.length > 0) {
												name = catalogEntry.descriptions[0].name;
												shortDescription = catalogEntry.descriptions[0].shortDescription;
											}
											this.selectedProducts.push({
												id: catalogEntry.id,
												sku: catalogEntry.partNumber,
												name,
												shortDescription,
												type: catalogEntry.typeCode,
												storeId: catalogEntryCalculationCode.storeId
											});
											break;
										}
									}
								});
							}
							observer.next(undefined);
							observer.complete();
						},
						error => {
							observer.error(error);
							observer.complete();
						});
					} else {
						this.selectedProducts = [];
						observer.next(undefined);
						observer.complete();
					}
				},
				error => {
					observer.error(error);
					observer.complete();
				});
			}
		});
	}

	loadCurrentCatalogGroups(id: number, storeId: number): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentCatalogGroupCalculationCodes !== null && this.currentShippingCodeId === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentShippingCodeId) {
					this.clearData();
					this.currentShippingCodeId = id;
				}
				const requests = [
					this.catalogGroupCalculationCodesService.getCatalogGroupCalculationCodes({
						calculationCodeId: id,
						storeId
					}),
					this.catalogsService.getCatalogs({
						storeId,
						dataLanguageIds: LanguageService.languageId.toString(),
						masterCatalog: true
					})
				];
				if (storeId !== this.currentShippingCode.storeId) {
					requests.push(this.catalogGroupCalculationCodesService.getCatalogGroupCalculationCodes({
						calculationCodeId: id,
						storeId: this.currentShippingCode.storeId
					}));
				}
				forkJoin(requests).subscribe((responseList: Array<any>) => {
					this.currentCatalogGroupCalculationCodes = responseList[0].items;
					const catalogGroupIds = [];
					responseList[0].items.forEach(catalogGroupCalculationCode => {
						if (catalogGroupCalculationCode.catalogGroupId) {
							catalogGroupIds.push(catalogGroupCalculationCode.catalogGroupId);
						}
					});
					if (responseList.length > 2) {
						this.currentInheritedCatalogGroupCalculationCodes = responseList[2].items;
						responseList[2].items.forEach(catalogGroupCalculationCode => {
							if (catalogGroupCalculationCode.catalogGroupId) {
								catalogGroupIds.push(catalogGroupCalculationCode.catalogGroupId);
							}
						});
					}
					if (catalogGroupIds.length > 0) {
						const catalogId = responseList[1].items[0].id;
						this.catalogGroupsService.getCatalogGroups({
							storeId,
							catalogId,
							dataLanguageIds: LanguageService.languageId.toString(),
							id: catalogGroupIds
						}).subscribe((body: any) => {
							this.selectedCategories = [];
							this.currentCatalogGroupCalculationCodes.forEach(catalogGroupCalculationCode => {
								for (let i = 0; i < body.items.length; i++) {
									const catalogGroup = body.items[i];
									if (catalogGroup.id === catalogGroupCalculationCode.catalogGroupId) {
										this.selectedCategories.push({
											id: catalogGroup.id,
											name: catalogGroup.name,
											parentCatalogGroupId: catalogGroup.parentCatalogGroupId,
											shortDescription: catalogGroup.shortDescription,
											storeId: catalogGroupCalculationCode.storeId
										});
										break;
									}
								}
							});
							if (this.currentInheritedCatalogGroupCalculationCodes) {
								this.currentInheritedCatalogGroupCalculationCodes.forEach(catalogGroupCalculationCode => {
									for (let i = 0; i < body.items.length; i++) {
										const catalogGroup = body.items[i];
										if (catalogGroup.id === catalogGroupCalculationCode.catalogGroupId) {
											this.selectedCategories.push({
												id: catalogGroup.id,
												name: catalogGroup.name,
												parentCatalogGroupId: catalogGroup.parentCatalogGroupId,
												shortDescription: catalogGroup.shortDescription,
												storeId: catalogGroupCalculationCode.storeId
											});
											break;
										}
									}
								});
							}
							observer.next(undefined);
							observer.complete();
						},
						error => {
							observer.error(error);
							observer.complete();
						});
					} else {
						this.selectedCategories = [];
						observer.next(undefined);
						observer.complete();
					}
				},
				error => {
					observer.error(error);
					observer.complete();
				});
			}
		});
	}

	private getCreateCatalogEntryCalculationCodeRequests(): Array<Observable<any>> {
		const requests: Array<Observable<any>> = [];
		const productsOrCategories = this.shippingCodeData.productsOrCategories;
		const allProducts = this.shippingCodeData.productsOrCategories === "allProducts" ||
				((this.selectedProducts == null || this.selectedProducts.length === 0) &&
				(this.selectedCategories == null || this.selectedCategories.length === 0));
		if (allProducts) {
			requests.push(this.catalogEntryCalculationCodesService.createCatalogEntryCalculationCodeResponse({
				storeId: this.shippingCodeData.storeId,
				catalogEntryId: null,
				calculationCodeId: this.currentShippingCodeId,
				calculationFlags: 0
			}));
		} else if (this.selectedProducts != null) {
			this.selectedProducts.forEach(selectedProduct => {
				requests.push(this.catalogEntryCalculationCodesService.createCatalogEntryCalculationCodeResponse({
					storeId: this.shippingCodeData.storeId,
					catalogEntryId:  selectedProduct.id,
					calculationCodeId: this.currentShippingCodeId,
					calculationFlags: 0
				}));
			});
		}
		return requests;
	}

	private getCreateCatalogGroupCalculationCodeRequests(): Array<Observable<any>> {
		const requests: Array<Observable<any>> = [];
		const productsOrCategories = this.shippingCodeData.productsOrCategories;
		const allProducts = this.shippingCodeData.productsOrCategories === "allProducts" ||
				((this.selectedProducts == null || this.selectedProducts.length === 0) &&
				(this.selectedCategories == null || this.selectedCategories.length === 0));
		if (!allProducts && this.selectedCategories != null) {
			this.selectedCategories.forEach(selectedCategory => {
				requests.push(this.catalogGroupCalculationCodesService.createCatalogGroupCalculationCodeResponse({
					storeId: this.shippingCodeData.storeId,
					catalogGroupId:  selectedCategory.id,
					calculationCodeId: this.currentShippingCodeId,
					calculationFlags: 0
				}));
			});
		}
		return requests;
	}

	private getUpdateCatalogGroupCalculationCodeRequests(storeId: number): Array<Observable<any>> {
		const requests: Array<Observable<any>> = [];
		const productsOrCategories = this.shippingCodeData.productsOrCategories;
		const cancelInherited = productsOrCategories === "cancelInherited";
		let allProducts = false;
		if (!cancelInherited) {
			allProducts = this.shippingCodeData.productsOrCategories === "allProducts" ||
					((this.selectedProducts == null || this.selectedProducts.length === 0) &&
					(this.selectedCategories == null || this.selectedCategories.length === 0));
		}
		let foundCancelInherited = false;
		if (this.currentCatalogGroupCalculationCodes != null) {
			this.currentCatalogGroupCalculationCodes.forEach(currentCatalogGroupCalculationCode => {
				let found = false;
				if (!cancelInherited && !allProducts && this.selectedCategories != null) {
					this.selectedCategories.forEach(selectedCategory => {
						if (selectedCategory.id === currentCatalogGroupCalculationCode.catalogGroupId &&
								selectedCategory.storeId === currentCatalogGroupCalculationCode.storeId) {
							found = true;
						}
					});
				} else if (cancelInherited && currentCatalogGroupCalculationCode.catalogGroupId == null &&
						currentCatalogGroupCalculationCode.calculationFlags === 1) {
					found = true;
					foundCancelInherited = true;
				}
				if (!found) {
					requests.push(this.catalogGroupCalculationCodesService.deleteCatalogGroupCalculationCodeByIdResponse(
						currentCatalogGroupCalculationCode.id
					));
				}
			});
		}
		if (!cancelInherited && !allProducts && this.selectedCategories != null) {
			this.selectedCategories.forEach(selectedCategory => {
				if (selectedCategory.storeId === storeId) {
					let found = false;
					if (this.currentCatalogGroupCalculationCodes != null) {
						this.currentCatalogGroupCalculationCodes.forEach(currentCatalogGroupCalculationCode => {
							if (currentCatalogGroupCalculationCode.catalogGroupId === selectedCategory.id &&
									currentCatalogGroupCalculationCode.storeId === selectedCategory.storeId) {
								found = true;
							}
						});
					}
					if (!found) {
						requests.push(this.catalogGroupCalculationCodesService.createCatalogGroupCalculationCodeResponse({
							storeId,
							catalogGroupId:  selectedCategory.id,
							calculationCodeId: this.currentShippingCodeId,
							calculationFlags: 0
						}));
					}
				}
			});
		}
// 		if (cancelInherited && !foundCancelInherited) {
// This currently doesn't work. The CATGROUP_ID column of CATGPCALCD is Not Null.
// 			requests.push(this.catalogGroupCalculationCodesService.createCatalogGroupCalculationCodeResponse({
// 				storeId,
// 				catalogGroupId:  null,
// 				calculationCodeId: this.currentShippingCodeId,
// 				calculationFlags: 1
// 			}));
// 		}
		return requests;
	}

	private getUpdateCatalogEntryCalculationCodeRequests(storeId: number): Array<Observable<any>> {
		const requests: Array<Observable<any>> = [];
		const productsOrCategories = this.shippingCodeData.productsOrCategories;
		const cancelInherited = productsOrCategories === "cancelInherited";
		let allProducts = false;
		if (!cancelInherited) {
			allProducts = this.shippingCodeData.productsOrCategories === "allProducts" ||
					((this.selectedProducts == null || this.selectedProducts.length === 0) &&
					(this.selectedCategories == null || this.selectedCategories.length === 0));
		}
		let foundAllProducts = false;
		let foundCancelInherited = false;
		if (this.currentCatalogEntryCalculationCodes != null) {
			this.currentCatalogEntryCalculationCodes.forEach(currentCatalogEntryCalculationCode => {
				let found = false;
				if (!cancelInherited && !allProducts && this.selectedProducts != null) {
					this.selectedProducts.forEach(selectedProduct => {
						if (selectedProduct.id === currentCatalogEntryCalculationCode.catalogEntryId &&
								selectedProduct.storeId === currentCatalogEntryCalculationCode.storeId) {
							found = true;
						}
					});
				} else if ((cancelInherited || allProducts) && currentCatalogEntryCalculationCode.catalogEntryId == null) {
					found = true;
					let calculationFlags = 0;
					if (cancelInherited) {
						foundCancelInherited = true;
						calculationFlags = 1;
					} else {
						foundAllProducts = true;
					}
					if (calculationFlags !== currentCatalogEntryCalculationCode.calculationFlags) {
						requests.push(this.catalogEntryCalculationCodesService.updateCatalogEntryCalculationCodeByIdResponse({
							id: currentCatalogEntryCalculationCode.id,
							CatalogEntryCalculationCode: {
								calculationFlags
							}
						}));
					}
				}
				if (!found) {
					requests.push(this.catalogEntryCalculationCodesService.deleteCatalogEntryCalculationCodeByIdResponse(
						currentCatalogEntryCalculationCode.id
					));
				}
			});
		}
		if (!cancelInherited && !allProducts && this.selectedProducts != null) {
			this.selectedProducts.forEach(selectedProduct => {
				if (selectedProduct.storeId === storeId) {
					let found = false;
					if (this.currentCatalogEntryCalculationCodes != null) {
						this.currentCatalogEntryCalculationCodes.forEach(currentCatalogEntryCalculationCode => {
							if (currentCatalogEntryCalculationCode.catalogEntryId === selectedProduct.id &&
									currentCatalogEntryCalculationCode.storeId === selectedProduct.storeId) {
								found = true;
							}
						});
					}
					if (!found) {
						requests.push(this.catalogEntryCalculationCodesService.createCatalogEntryCalculationCodeResponse({
							storeId,
							catalogEntryId:  selectedProduct.id,
							calculationCodeId: this.currentShippingCodeId,
							calculationFlags: 0
						}));
					}
				}
			});
		}
		if (allProducts && !foundAllProducts) {
			requests.push(this.catalogEntryCalculationCodesService.createCatalogEntryCalculationCodeResponse({
				storeId,
				catalogEntryId:  null,
				calculationCodeId: this.currentShippingCodeId,
				calculationFlags: 0
			}));
		} else if (cancelInherited && !foundCancelInherited) {
			requests.push(this.catalogEntryCalculationCodesService.createCatalogEntryCalculationCodeResponse({
				storeId,
				catalogEntryId:  null,
				calculationCodeId: this.currentShippingCodeId,
				calculationFlags: 1
			}));
		}
		return requests;
	}
}
