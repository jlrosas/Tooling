/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, AfterViewInit, Input, Output, EventEmitter, Injectable, OnChanges, OnInit } from "@angular/core";
import { Subscription, BehaviorSubject, merge, Observable, forkJoin } from "rxjs";
import { CollectionViewer, SelectionChange, DataSource, SelectionModel } from "@angular/cdk/collections";
import { ActivatedRoute } from "@angular/router";
import { FlatTreeControl } from "@angular/cdk/tree";
import { map } from "rxjs/operators";
import { CatalogGroupsService } from "../../../../rest/services/catalog-groups.service";
import { CatalogEntriesService } from "../../../../rest/services/catalog-entries.service";
import { LanguageService } from "../../../../services/language.service";
import { Product, Category } from "../../services/shipping-code-main.service";

@Component({
	selector: "hc-shipping-catalog-browser",
	templateUrl: "./shipping-catalog-browser.component.html",
	styleUrls: ["./shipping-catalog-browser.component.scss"]
})
export class ShippingCatalogBrowserComponent implements OnInit, AfterViewInit, OnChanges {
	@Input() catalogs: Array<any> = null;
	@Input() selectedCategories: Array<Category> = null;
	@Input() selectedProducts: Array<Product> = null;

	@Output() onSelectCategory: EventEmitter<any> = new EventEmitter<any>();
	@Output() onUnselectCategory: EventEmitter<any> = new EventEmitter<any>();
	@Output() onSelectProduct: EventEmitter<any> = new EventEmitter<any>();
	@Output() onUnselectProduct: EventEmitter<any> = new EventEmitter<any>();

	topLevelNodes: Array<RootNode> = [];

	treeControl: FlatTreeControl<DynamicFlatNode>;

	dataSource: DynamicDataSource;

	checklistSelection = new SelectionModel<DynamicFlatNode>(true /* multiple */);
	storeId: number;

	private currentParentNode = null;

	constructor(private route: ActivatedRoute,
			private database: DynamicDatabase,
			private languageService: LanguageService) {
		this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
		this.dataSource = new DynamicDataSource(this.treeControl, database);
		this.dataSource.dataChange.subscribe(() => this.markSelectedNodes());
	}

	ngOnInit() {
		this.storeId = Number(this.route.snapshot.params.storeId);
	}

	getLevel = (node: DynamicFlatNode) => node.level;

	isExpandable = (node: DynamicFlatNode) => node.expandable;

	hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

	ngAfterViewInit() {
		this.initializeCatalogs();
	}

	ngOnChanges(simpleDataChange) {
		/* Detect selection changes */
		if (this.dataSource.data && (simpleDataChange.selectedCategories || simpleDataChange.selectedProducts)) {
			const selectedCategoryIds = this.selectedCategories.map(category => category.id);
			const selectedProductIds = this.selectedProducts.map(product => product.id);
			this.dataSource.data.forEach(node => {
				if (node.item.category) {
					if (selectedCategoryIds.includes(node.item.id)) {
						if (!this.checklistSelection.isSelected(node)) {
							this.checklistSelection.select(node);
						}
					} else {
						if (this.checklistSelection.isSelected(node)) {
							this.checklistSelection.deselect(node);
						}
					}
				} else if (node.item.product) {
					if (selectedProductIds.includes(node.item.id)) {
						if (!this.checklistSelection.isSelected(node)) {
							this.checklistSelection.select(node);
						}
					} else {
						if (this.checklistSelection.isSelected(node)) {
							this.checklistSelection.deselect(node);
						}
					}
				}
			});
		}
		/* Detect change in catalog selection */
		if (simpleDataChange.catalogs) {
			this.initializeCatalogs();
		}
	}

	nodeSelectionToggle(node: DynamicFlatNode): void {
		this.checklistSelection.toggle(node);
		if (this.checklistSelection.isSelected(node)) {
			if (node.item.category) {
				this.onSelectCategory.emit(node.item.category);
			} else if (node.item.product) {
				this.onSelectProduct.emit(node.item.product);
			}
		} else {
			if (node.item.category) {
				this.onUnselectCategory.emit(node.item.category);
			} else if (node.item.product) {
				this.onUnselectProduct.emit(node.item.product);
			}
		}
	}

	nodeLeafItemSelectionToggle(node: DynamicFlatNode): void {
		this.checklistSelection.toggle(node);
		if (this.checklistSelection.isSelected(node)) {
			if (node.item.category) {
				this.onSelectCategory.emit(node.item.category);
			} else if (node.item.product) {
				this.onSelectProduct.emit(node.item.product);
			}
		} else {
			if (node.item.category) {
				this.onUnselectCategory.emit(node.item.category);
			} else if (node.item.product) {
				this.onUnselectProduct.emit(node.item.product);
			}
		}
	}

	private markSelectedNodes() {
		if (this.dataSource.data && (this.selectedProducts || this.selectedCategories)) {
			const selectedCategoryIds = this.selectedCategories ? this.selectedCategories.map(category => category.id) : [];
			const selectedProductIds = this.selectedProducts ? this.selectedProducts.map(product => product.id) : [];
			this.checklistSelection.clear();
			this.checklistSelection.select(...this.dataSource.data.filter(
				node => [...selectedCategoryIds, ...selectedProductIds].includes(node.item.id)));
		}
	}

	private initializeCatalogs() {
		const dataMap = new Map<string, Node[]>([[this.currentParentNode, []]]);
		this.topLevelNodes = this.catalogs.map(catalog => {
			return {
				id: catalog.id,
				catalogId: catalog.id,
				name: catalog.identifier,
				isCatalog: true
			};
		});
		this.dataSource.data = this.database.initialData(dataMap, this.topLevelNodes, {storeId: this.storeId});
		this.markSelectedNodes();
	}
}

export class DynamicFlatNode {
	constructor(public item: Node | RootNode, public level = 1, public expandable = false,
							public isLoading = false) {}
}

@Injectable({providedIn: "root"})
export class DynamicDatabase {
	dataMap: Map<string, Node[]>;
	rootLevelNodes: RootNode[];
	params: any;

	constructor(private catalogGroupsService: CatalogGroupsService,
		private catalogEntriesService: CatalogEntriesService) {}

	initialData(dataMap: Map<string, Node[]>, rootLevelNodes: RootNode[], params): DynamicFlatNode[] {
		this.dataMap = dataMap;
		this.rootLevelNodes =  rootLevelNodes;
		this.params = params;
		return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
	}

	getChildren(node: any): Observable<Node[] | undefined> {
		return new Observable(subscriber => {
			let children: Node[] | undefined = this.dataMap.get(node.id);
			if (children === undefined) {
				setTimeout(() => {
					if (node.isCatalog) {
						this.catalogGroupsService.getCatalogGroups({
							catalogId: node.catalogId,
							storeId: this.params.storeId,
							dataLanguageIds: LanguageService.languageId.toString(),
							topCatalogGroup: true
						}).subscribe(body => {
							const data: Node[] = [];
							for (let i = 0; i < body.items.length; i++) {
								const catalogGroup = body.items[i];
								const node1: Node = {
									id: catalogGroup.id,
									category: {
										id: catalogGroup.id,
										name: catalogGroup.name,
										shortDescription: catalogGroup.shortDescription,
										parentCatalogGroupId: catalogGroup.parentCatalogGroupId,
										storeId: this.params.storeId
									},
									name: catalogGroup.name,
									catalogId: node.catalogId,
									hasChildren: true
								};
								data.push(node1);
							}
							this.dataMap.set(node.id, data);
							children = data;
							subscriber.next(children);
						});
					} else if (node.category) {
						const requests = [
							this.catalogGroupsService.getCatalogGroups({
								catalogId: node.catalogId,
								storeId: this.params.storeId,
								dataLanguageIds: LanguageService.languageId.toString(),
								parentCatalogGroupId: node.id
							}),
							this.catalogEntriesService.getCatalogEntries({
								catalogId: node.catalogId,
								storeId: this.params.storeId,
								dataLanguageIds: LanguageService.languageId.toString(),
								parentCatalogGroupId: node.id,
								catalogEntryType: ["ItemBean", "ProductBean"]
							})
						];
						forkJoin(requests).subscribe((responseList: Array<any>) => {
							const data: Node[] = [];
							for (let i = 0; i < responseList[0].items.length; i++) {
								const catalogGroup = responseList[0].items[i];
								const node1: Node = {
									id: catalogGroup.id,
									category: {
										id: catalogGroup.id,
										name: catalogGroup.name,
										shortDescription: catalogGroup.shortDescription,
										parentCatalogGroupId: catalogGroup.parentCatalogGroupId,
										storeId: this.params.storeId
									},
									name: catalogGroup.name,
									catalogId: node.catalogId,
									hasChildren: true
								};
								data.push(node1);
							}
							for (let i = 0; i < responseList[1].items.length; i++) {
								const catalogEntry = responseList[1].items[i];
								let name = "";
								let shortDescription = "";
								if (catalogEntry.descriptions && catalogEntry.descriptions.length > 0) {
									name = catalogEntry.descriptions[0].name;
									shortDescription = catalogEntry.descriptions[0].shortDescription;
								}
								const node1: Node = {
									id: catalogEntry.id,
									product: {
										id: catalogEntry.id,
										sku: catalogEntry.partNumber,
										name,
										type: catalogEntry.typeCode,
										shortDescription,
										storeId: this.params.storeId
									},
									name: catalogEntry.partNumber,
									catalogId: node.catalogId,
									hasChildren: (catalogEntry.typeCode === "ProductBean") ? true : false
								};
								data.push(node1);
							}
							this.dataMap.set(node.id, data);
							children = data;
							subscriber.next(children);
						});
					} else if (node.hasChildren) {
						const requests = [];
						this.catalogEntriesService.getCatalogEntries({
							catalogId: node.catalogId,
							storeId: this.params.storeId,
							dataLanguageIds: LanguageService.languageId.toString(),
							parentCatalogEntryId: node.id,
							catalogEntryType: ["ItemBean", "ProductBean"]
						}).subscribe(body => {
							const data: Node[] = [];
							for (let i = 0; i < body.items.length; i++) {
								const catalogEntry = body.items[i];
								let name = "";
								let shortDescription = "";
								if (catalogEntry.descriptions && catalogEntry.descriptions.length > 0) {
									name = catalogEntry.descriptions[0].name;
									shortDescription = catalogEntry.descriptions[0].shortDescription;
								}
								const node1: Node = {
									id: catalogEntry.id,
									product: {
										id: catalogEntry.id,
										sku: catalogEntry.partNumber,
										name,
										shortDescription,
										storeId: this.params.storeId
									},
									name: catalogEntry.partNumber,
									catalogId: node.catalogId,
									hasChildren: (catalogEntry.typeCode === "ProductBean") ? true : false
								};
								data.push(node1);
							}
							this.dataMap.set(node.id, data);
							children = data;
							subscriber.next(children);
						});
					}
				}, 1000);
			} else {
				subscriber.next(children);
			}
		});
	}

	isExpandable(node: any): boolean {
		return this.dataMap.has(node.id);
	}
}

export class DynamicDataSource implements DataSource<DynamicFlatNode> {

	dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

	get data(): DynamicFlatNode[] { return this.dataChange.value; }
	set data(value: DynamicFlatNode[]) {
		this._treeControl.dataNodes = value;
		this.dataChange.next(value);
	}

	constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>,
							private _database: DynamicDatabase) {}

	connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
		this._treeControl.expansionModel.changed.subscribe(change => {
			if ((change as SelectionChange<DynamicFlatNode>).added ||
				(change as SelectionChange<DynamicFlatNode>).removed) {
				this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
			}
		});

		return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
	}

	disconnect(collectionViewer: CollectionViewer): void {}

	handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
		if (change.added) {
			change.added.forEach(node => this.toggleNode(node, true));
		}
		if (change.removed) {
			change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
		}
	}

	toggleNode(node: DynamicFlatNode, expand: boolean) {
		node.isLoading = true;
		this._database.getChildren(node.item).subscribe((children: Node[] | undefined) => {
			const index = this.data.indexOf(node);
			if (!children || index < 0) {
				node.isLoading = false;
				return;
			}
			setTimeout(() => {
				if (expand) {
					const nodes = children.map(name =>
						new DynamicFlatNode(name, node.level + 1, this._database.isExpandable(name)));
					this.data.splice(index + 1, 0, ...nodes);
				} else {
					let count = 0;
					for (let i = index + 1; i < this.data.length
						&& this.data[i].level > node.level; i++, count++) {}
					this.data.splice(index + 1, count);
				}
				this.dataChange.next(this.data);
				node.isLoading = false;
			}, 0);
		});
	}
}

// Tree Node
interface Node {
	id: string;
	product?: Product;
	category?: Category;
	name: string;
	catalogId: string;
	hasChildren: boolean;
}

// Top Node
interface RootNode {
	id: string;
	product?: Product;
	category?: Category;
	catalogId: string;
	name: string;
	isCatalog: boolean;
}
