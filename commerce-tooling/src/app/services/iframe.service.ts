/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Injectable } from "@angular/core";

@Injectable()
export class IframeService {

	parentEventHandler(e) {
		const message = e.data;
		// use dispatch here to propagate iframe messages
	}

	subscribeParentPostedMessages() {
		window.addEventListener("message", this.parentEventHandler, false);
	}

	sendMessagesToContainer(msg: any) {
		window.parent.postMessage(msg, "*");
	}

	postStatusMsg(content: any,  statusType: any) {
		// statusTypes are 'error' or 'success'
		if (statusType === "error" || statusType === "success") {
			const params: any = {};
			params["statusType"] = statusType.toString();
			params["statusContent"] = content.toString();
			const messageBody: any = {};
			messageBody["action"] = "POST_STATUS";
			messageBody["data"] = params;
			this.sendMessagesToContainer(messageBody);
		}
	}

	startProgressIndicator() {
		const header = {};
		header["action"] = "START_PROGRESS_INDICATOR";
		this.sendMessagesToContainer(header);
	}

	stopProgressIndicator() {
		const header = {};
		header["action"] = "STOP_PROGRESS_INDICATOR";
		this.sendMessagesToContainer(header);
	}

}
