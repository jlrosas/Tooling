/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Directive, Input, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { MatGridList } from "@angular/material";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

export interface GridColumns {
	xs: number;
	sm: number;
	md: number;
	lg: number;
	xl: number;
}
@Directive({
	selector: "[hcResponsiveGridCols]"
})
export class ResponsiveGridDirective implements OnInit, OnDestroy {
	@Output() responsiveColsChange: EventEmitter<number> = new EventEmitter<number>();

	private gridCols: GridColumns = {
		xs: 4,
		sm: 8,
		md: 12,
		lg: 12,
		xl: 12
	};
	private breakpointSubscription = null;

	public get cols(): GridColumns {
		return this.gridCols;
	}

	@Input("hcResponsiveGridCols")
	public set cols(map: GridColumns) {
		if (map && ("object" === (typeof map))) {
			this.gridCols = map;
		}
	}

	public constructor(private grid: MatGridList,
			private breakpointObserver: BreakpointObserver) {
		if (this.grid != null) {
			this.grid.cols = this.gridCols.md;
		}
	}

	public ngOnInit(): void {
		if (this.grid != null) {
			this.grid.cols = this.gridCols.md;
		}
		this.breakpointSubscription = this.breakpointObserver.observe([
			Breakpoints.XSmall,
			Breakpoints.Small,
			Breakpoints.Medium,
			Breakpoints.Large,
			Breakpoints.XLarge
		]).subscribe(result => {
			if (result.breakpoints[Breakpoints.XSmall]) {
				this.grid.cols = this.gridCols.xs;
			} else if (result.breakpoints[Breakpoints.Small]) {
				this.grid.cols = this.gridCols.sm;
			} else if (result.breakpoints[Breakpoints.Medium]) {
				this.grid.cols = this.gridCols.md;
			} else if (result.breakpoints[Breakpoints.Large]) {
				this.grid.cols = this.gridCols.lg;
			} else if (result.breakpoints[Breakpoints.XLarge]) {
				this.grid.cols = this.gridCols.xl;
			}
			this.responsiveColsChange.emit(this.grid.cols);
		});
	}

	public ngOnDestroy(): void {
		this.breakpointSubscription.unsubscribe();
	}
}
