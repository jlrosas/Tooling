/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { MatDialog } from "@angular/material/dialog";
import { PreviewSettingsDialogComponent } from "../preview-settings-dialog/preview-settings-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DatePipe } from "@angular/common";
import { StorePreviewOptionsService } from "../../../../services/store-preview-options.service";
import { PreviewTokenService } from "../../../../rest/services/preview-token.service";

@Component({
	templateUrl: "./store-preview.component.html",
	styleUrls: ["./store-preview.component.scss"]
})
export class StorePreviewComponent implements OnInit, OnDestroy {
	public storePreviewOptions = null;
	public storeURL = null;
	public dataURL: SafeUrl = null;
	public previewHeight = window.innerHeight;
	public previewWidth = window.innerWidth - 30;
	public viewportList: Array<any> = [
		{
			name: "Fit to screen",
			textKey: "STORE_PREVIEW.VIEWPORT_FIT_TO_SCREEN",
			width: 1920,
			height: 1080,
			resolution: "",
			orientation: "H"
		},
		{
			name: "Mobile",
			textKey: "STORE_PREVIEW.VIEWPORT_MOBILE",
			width: 640,
			height: 375,
			resolution: "(640 x 375)",
			orientation: "H"
		},
		{
			name: "Tablet",
			textKey: "STORE_PREVIEW.VIEWPORT_TABLET",
			width: 1024,
			height: 768,
			resolution: "(1024 x 768)",
			orientation: "H",
		},
		{
			name: "Desktop",
			textKey: "STORE_PREVIEW.VIEWPORT_DESKTOP",
			width: 1280,
			height: 720,
			resolution: "(1280 x 720)",
			orientation: "H"
		},
		{
			name: "Widescreen",
			textKey: "STORE_PREVIEW.VIEWPORT_WIDESCREEN",
			width: 1920,
			height: 1080,
			resolution: "(1920 x 1080)",
			orientation: "H"
		}
	];
	public currentViewport = null;
	public storePreviewDate: Date;
	public timeZone = null;
	public storePreviewDisplayDateFormat = "yyyy/MM/dd";
	public currentOrientation = "H";
	public elapseTimeInterval;
	public isNewPreviewSession = true;

	private onStorePreviewOptionsChangeSubscription: Subscription = null;

	constructor(public sanitizer: DomSanitizer,
			public dialog: MatDialog,
			private storePreviewOptionsService: StorePreviewOptionsService,
			private previewTokenService: PreviewTokenService,
			private translateService: TranslateService,
			private _snackBar: MatSnackBar,
			private datePipe: DatePipe) { }

	ngOnInit() {
		this.loadStorePreviewOptions();
		this.onStorePreviewOptionsChangeSubscription = this.storePreviewOptionsService.onStorePreviewOptionsChange.subscribe(() => {
			this.loadStorePreviewOptions();
		});
		this.setViewport(this.viewportList[0]); // default viewport is "Fit to screen" landscape mode (H)
		this.storePreviewOptions.isPreviewNewSession = this.isNewPreviewSession;
	}

	launchStorePreview() {
		this.dataURL = null;
		const previewOptions = this.storePreviewOptions;
		const previewTokenRequestBody: any = {
			tokenLife: "10080", // tokenLife = 10080 minutes = 1 week.
			timeZoneId: previewOptions.timeZone,
			status: !previewOptions.isTimeInPreviewElapsing,   // true = time static, false = time elapsing.
			invstatus: previewOptions.inventoryStatus
		};

		// The "start" timestamp here must be in the format YYYY/MM/DD HH:mm:ss (ie. "2020/12/31 13:00:00")
		if (previewOptions.startDateTime) {
			previewTokenRequestBody.start = this.datePipe.transform(previewOptions.startDateTime, "yyyy/MM/dd HH:mm:ss");
		}
		if (previewOptions.viewAsCustomerSegmentIds) {
			previewTokenRequestBody.includedMemberGroupIds = previewOptions.viewAsCustomerSegmentIds;
		}
		if (previewOptions.workspace) {
			if (previewOptions.workspace.workspaceId) {
				previewTokenRequestBody.workspaceId = previewOptions.workspace.workspaceId;
			}
			if (previewOptions.workspace.taskGroupId) {
				previewTokenRequestBody.taskGroupId = previewOptions.workspace.taskGroupId;
			}
			if (previewOptions.workspace.taskId) {
				previewTokenRequestBody.taskId = previewOptions.workspace.taskId;
			}
		}
		const previewTokenRequestParams: PreviewTokenService.GeneratePreviewTokenParams = {
			storeId: previewOptions.urlTokens.storeId,
			body: previewTokenRequestBody
		};
		this.previewTokenService.generatePreviewToken(previewTokenRequestParams).subscribe(result => {
			// DEVMODE only: uncomment 2 lines below.  manually obtain previewToken via PostMan REST call and use as an override
			// result.previewToken = "KsmqQ6ouqhSq0KrJrqCVnw";
			// console.log("DEVMODE OVERRIDE: previewToken="+result.previewToken);
			// END DEVMODE
			this.storeURL = this.getURLWithPreviewToken(previewOptions.storeURL, result.previewToken);
			this.dataURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.storeURL);
		});
	}

	getURLWithPreviewToken(storeURL: string, previewToken: string): string {
		let resultURL = "";
		if (storeURL.includes("?")) {
			resultURL = storeURL + "&WCPreviewToken=" + previewToken;
		} else {
			resultURL = storeURL + "?WCPreviewToken=" + previewToken;
		}
		if (this.isNewPreviewSession) {
			resultURL = resultURL + "&newPreviewSession=true";
		} else {
			if (resultURL.indexOf("&newPreviewSession=true") !== -1) {
				resultURL.replace("&newPreviewSession=true", "");
			}
		}
		return resultURL;
	}

	setPreviewDate() {
		let timeFormat = "HH:mm:ss";
		if (this.storePreviewOptions.timeFormat === "12HR") {
			timeFormat = "hh:mm:ss aaa";
		}
		this.storePreviewDisplayDateFormat = this.storePreviewOptions.dateFormat + " " + timeFormat;
		if (this.storePreviewOptions.startDateTime) {
			this.storePreviewDate = new Date(this.storePreviewOptions.startDateTime);
			if (typeof this.storePreviewOptions.startDateTime === "string") {
				this.storePreviewOptions.startDateTime = this.storePreviewDate;
			}
			this.timeZone = this.storePreviewOptions.timeZoneDisplayName ?
					this.storePreviewOptions.timeZoneDisplayName : this.storePreviewOptions.timeZone;
		} else {
			this.storePreviewDate = new Date();
			this.timeZone = null;
		}

		if (this.storePreviewOptions.isTimeInPreviewElapsing) {
			clearInterval(this.elapseTimeInterval);
			this.elapseTimeInterval = setInterval(() => {
				this.storePreviewDate = new Date(this.storePreviewDate.getTime() + 1000);
				this.storePreviewOptions.startDateTime = this.storePreviewDate;
			}, 1000);
		} else {
			clearInterval(this.elapseTimeInterval);
			this.elapseTimeInterval = null;
		}
	}

	ngOnDestroy() {
		if (this.onStorePreviewOptionsChangeSubscription) {
			this.onStorePreviewOptionsChangeSubscription.unsubscribe();
		}
		clearInterval(this.elapseTimeInterval);
	}

	setViewport(viewport: any) {
		if (viewport.name === "Fit to screen") {
			this.previewWidth = window.innerWidth - 30;
			this.previewHeight = window.innerWidth;
		} else {
			if (this.currentOrientation === "H") {
				this.previewWidth = viewport.width;
				this.previewHeight = viewport.height;
			} else {
				this.previewWidth = viewport.height;
				this.previewHeight = viewport.width;
			}
		}
		this.currentViewport = viewport;
	}

	rotateScreen(viewport: any, orientation: string) {
		if (this.currentViewport.name === "Fit to screen") {
			this.previewWidth = window.innerWidth - 30;
			this.previewHeight = window.innerHeight;
		} else {
			if (orientation === "H") {
				this.previewWidth = viewport.width;
				this.previewHeight = viewport.height;
			} else {
				this.previewWidth = viewport.height;
				this.previewHeight = viewport.width;
			}
		}
		viewport.orientation = orientation;
		this.currentOrientation = orientation;
	}

	shareUrl() {
		const selBox = document.createElement("textarea");
		const shareURLVal = this.storeURL;
		selBox.style.position = "fixed";
		selBox.style.left = "0";
		selBox.style.top = "0";
		selBox.style.opacity = "0";
		if (shareURLVal.indexOf("&newPreviewSession=true") === -1) {
			selBox.value = shareURLVal + "&newPreviewSession=true";
		} else {
			selBox.value = shareURLVal;
		}
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand("copy");
		document.body.removeChild(selBox);

		this.translateService.get("STORE_PREVIEW.PREVIEW_URL_COPIED").subscribe((text: string) => {
			this.openSnackBar(text, "");
		});
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(PreviewSettingsDialogComponent, {
			width: "500px",
			data: this.storePreviewOptions
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.isNewPreviewSession = false;
				this.storePreviewOptions.isPreviewNewSession = this.isNewPreviewSession;
				this.setPreviewDate();
				this.launchStorePreview();
			}
		});
	}

	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			duration: 2000
		});
	}

	onWindowResize(event) {
		this.previewWidth = event.target.innerWidth;
		this.previewWidth = event.target.innerHeight;
	}

	private loadStorePreviewOptions() {
		if (StorePreviewOptionsService.storePreviewOptions) {
			this.storePreviewOptions = StorePreviewOptionsService.storePreviewOptions;
			this.setPreviewDate();
			this.launchStorePreview();
		}
	}
}
