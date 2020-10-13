/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApprovalStatusService } from "../../../../rest/services/approval-status.service";
import { AlertService } from "../../../../services/alert.service";
import { DATE_FORMAT_OPTIONS } from "../../../../shared/constants";
import { LanguageService } from "../../../../services/language.service";

@Component({
	templateUrl: "./approval-summary.component.html",
	styleUrls: ["./approval-summary.component.scss"]
})
export class ApprovalSummaryComponent implements OnInit {
	flowTypeId: string;
	requestor: string;
	approver: string;
	status: number;
	statusTextKey: string;
	processTextKey: string;
	submitDate: string;
	approveDate: string;
	comment: string;
	entityId: string;

	private processing = false;
	private processTextKeys = {
		"10001": "APPROVALS.RFQ_RESPONSE",
		"10002": "APPROVALS.ORDER_PROCESSING",
		"10003": "APPROVALS.CONTRACT_SUBMIT",
		"10004": "APPROVALS.USER_REGISTRATION",
		"10005": "APPROVALS.ORGANIZATION_REGISTRATION",
		"10006": "APPROVALS.RESELLER_USER_REGISTRATION"
	};
	private statusTextKeys = {
		0: "APPROVALS.PENDING",
		1: "APPROVALS.APPROVED",
		2: "APPROVALS.REJECTED"
	};

	constructor(private router: Router,
			private route: ActivatedRoute,
			private approvalStatusService: ApprovalStatusService,
			private translateService: TranslateService,
			private alertService: AlertService) { }

	ngOnInit() {
		this.approvalStatusService.findByApprovalStatusId(this.route.snapshot.params.id).subscribe(approvalStatus => {
			this.requestor = approvalStatus.requestor;
			this.approver = approvalStatus.approver;
			this.status = approvalStatus.status;
			this.statusTextKey = this.statusTextKeys[approvalStatus.status];
			this.comment = approvalStatus.comment;
			this.submitDate = approvalStatus.submitDate === null ? null :
					new Intl.DateTimeFormat(LanguageService.language, DATE_FORMAT_OPTIONS).format((new Date(approvalStatus.submitDate)));
			this.approveDate = approvalStatus.approveDate === null ? null :
					new Intl.DateTimeFormat(LanguageService.language, DATE_FORMAT_OPTIONS).format((new Date(approvalStatus.approveDate)));
			this.requestor = this.formatName(approvalStatus.submitterLogonId, approvalStatus.submitterFirstName, approvalStatus.submitterLastName);
			this.approver = this.formatName(approvalStatus.approverLogonId, approvalStatus.approverFirstName, approvalStatus.approverLastName);
			this.entityId = approvalStatus.entityId;
			this.flowTypeId = approvalStatus.flowTypeId;
			this.processTextKey = this.processTextKeys[approvalStatus.flowTypeId];
		});
	}

	approve() {
		this.submit(1);
	}

	reject() {
		this.submit(2);
	}

	cancel() {
		this.alertService.clear();
		this.router.navigate(["/approvals"]);
	}

	private submit(status) {
		if (!this.processing) {
			this.processing = true;
			this.alertService.clear();
			this.approvalStatusService.updateApprovalStatus({
				id: this.route.snapshot.params.id,
				body: {
					status,
					comment: this.comment
				}
			}).subscribe(
				(response: any) => {
					this.processing = false;
					if (response && response.resultmsg === "approvalsFailed") {
						this.translateService.get("APPROVALS.UNAPPROVED_ORGANIZATION_ERROR_MESSAGE").subscribe((message: string) => {
							this.alertService.error({message});
						});
					} else {
						const messageKey = status === 1 ? "APPROVALS.APPROVED_SUCCESS_MESSAGE" : "APPROVALS.REJECTED_SUCCESS_MESSAGE";
						this.translateService.get(messageKey).subscribe((message: string) => {
							this.alertService.success({message});
						});
					}
					this.router.navigate(["/approvals"]);
				},
				errorResponse => {
					this.processing = false;
				}
			);
		}
	}

	private formatName(logonId: string, firstName: string, lastName: string): string {
		let name = logonId;
		if (lastName != null && lastName.length > 0) {
			name += " (";
			if (firstName != null && firstName.length > 0) {
				name += firstName + " ";
			}
			name += lastName + ")";
		}
		return name;
	}
}
