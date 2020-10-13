/*
 *-------------------------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 1996, 2020

 *-------------------------------------------------------------------
 */

import { Injectable, EventEmitter } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { JobsService } from "../../../rest/services/jobs.service";

@Injectable({
	providedIn: "root"
})
export class JobMainService {
	jobData: any = null;
	processing = false;

	readonly onApplicationTypeChange: EventEmitter<string> = new EventEmitter<string>();

	private currentJob: any = null;
	private currentJobId: string = null;

	constructor(private jobsService: JobsService) { }

	clearData() {
		this.jobData = null;
		this.processing = false;
		this.currentJob = null;
		this.currentJobId = null;
	}

	createJob(): Observable<Array<any>> {
		this.processing = true;
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			this.jobsService.JobPostResponse(
				this.buildCreateJobBody()
			).subscribe(response => {
				const paths: Array<string> = response.headers.get("location").split("/");
				const id: string = paths[paths.length - 1];
				observer.next(undefined);
				observer.complete();
				this.processing = false;
			},
			error => {
				observer.error(error);
				observer.complete();
				this.processing = false;
			});
		});
	}

	newVersionJob(id: string): Observable<Array<any>> {
		this.processing = true;
		const args: JobsService.JobCreateNewVersionJobParams = {
			id,
			body: this.buildNewVersionJobBody()
		};
		return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
			this.jobsService.JobCreateNewVersionJobResponse(args).subscribe(response => {
				const paths: Array<string> = response.headers.get("location").split("/");
				const newJobId: string = paths[paths.length - 1];
				observer.next(undefined);
				observer.complete();
				this.processing = false;
			},
			error => {
				observer.error(error);
				observer.complete();
				this.processing = false;
			});
		});
	}

	loadCurrentJob(id: string): Observable<void> {
		return new Observable<undefined>((observer: Observer<void>) => {
			if (this.currentJob != null && this.currentJob.id === id) {
				observer.next(undefined);
				observer.complete();
			} else {
				if (id !== this.currentJobId) {
					this.clearData();
					this.currentJobId = id;
				}
				const args: JobsService.JobGetByIdParams = {
					id
				};

				this.jobsService.JobGetById(args).subscribe(
					body => {
						this.currentJob = body;
						this.jobData = {
							id,
							activeState: body.activeState,
							command: body.command,
							checkCommandInterface: body.interfaceName,
							host: body.host,
							interval: body.interval,
							applicationType: (body.jobType == null) ? "default" : body.jobType,
							startDate: body.preferredStartDateTime,
							priority: body.priority,
							query: body.query,
							retryAttempts: body.retryAttempts,
							retryDelay: body.retryDelay,
							sequence: body.sequence,
							storeId: body.storeId,
							userId: body.userId,
							description: body.description,
							fixedTime: body.fixedTime
						};
						this.onApplicationTypeChange.emit(this.jobData.applicationType);
						observer.next(undefined);
						observer.complete();
					},
					error => {
						observer.error(error);
						observer.complete();
					}
				);
			}
		});
	}

	private buildCreateJobBody(): any {
		const job = this.jobData;
		const newJob: any = {};
		if (job.host) {
			newJob.host = job.host;
		}
		if (job.applicationType) {
			newJob.jobType = job.applicationType;
		}
		if (job.associatedUser) {
			newJob.associatedUser = job.associatedUser;
		}
		if (job.retryAttempts) {
			newJob.retryAttempts = job.retryAttempts;
		}
		if (job.command) {
			newJob.command = job.command;
		}
		if (job.fixedTime) {
			newJob.fixedTime = job.fixedTime;
		}
		if (job.interval) {
			newJob.interval = job.interval;
		}
		if (job.sequence) {
			newJob.sequence = job.sequence;
		} else {
			newJob.sequence = 0;
		}
		if (job.priority) {
			newJob.priority = job.priority;
		}
		if (job.query) {
			newJob.query = job.query;
		}
		if (job.description) {
			newJob.description = job.description;
		}
		if (job.retryDelay) {
			newJob.retryDelay = job.retryDelay;
		}
		if (job.checkCommandName) {
			newJob.checkCommandName = job.checkCommandName;
		}
		if (job.checkCommandInterface) {
			newJob.checkCommandInterface = job.checkCommandInterface;
		}
		if (job.checkCommandId) {
			newJob.checkCmdId = job.checkCommandId;
		}
		if (job.preferredStartDateTime) {
			newJob.preferredStartDateTime = job.preferredStartDateTime;
		} else {
			const startDate = new Date();
			newJob.preferredStartDateTime = startDate.toISOString();
		}
		if (newJob.preferredStartDateTime) {
			if (job.startTime) {
				const startDate = new Date(newJob.preferredStartDateTime);
				const startTime = job.startTime;
				const splits: Array<any> = startTime.split(":", 2);
				startDate.setHours(splits[0]);
				startDate.setMinutes(splits[1]);
				newJob.preferredStartDateTime = startDate.toISOString();
			}
		}
		if (job.storeId) {
			newJob.storeId = job.storeId;
		} else {
			newJob.storeId = 0;
		}
		return newJob;
	}

	private buildNewVersionJobBody(): any {
		const job = this.jobData;
		const newJob: any = {
		};
		if (job.id) {
			newJob.id = job.id;
		}
		if (job.host) {
			newJob.host = job.host;
		}
		if (job.applicationType) {
			newJob.jobType = job.applicationType;
		}
		if (job.userId) {
			newJob.userId = job.userId;
		}
		if (job.retryAttempts) {
			newJob.retryAttempts = job.retryAttempts;
		}
		if (job.command) {
			newJob.command = job.command;
		}
		if (job.fixedTime) {
			newJob.fixedTime = job.fixedTime;
		}
		if (job.interval) {
			newJob.interval = job.interval;
		}
		if (job.sequence) {
			newJob.sequence = job.sequence;
		} else {
			newJob.sequence = 0;
		}
		if (job.priority) {
			newJob.priority = job.priority;
		}
		if (job.query) {
			newJob.query = job.query;
		}
		if (job.description) {
			newJob.description = job.description;
		}
		if (job.retryDelay) {
			newJob.retryDelay = job.retryDelay;
		}
		if (job.startDate) {
			newJob.preferredStartDateTime = job.startDate;
		}
		if (job.preferredStartDateTime) {
			newJob.preferredStartDateTime = job.preferredStartDateTime;
		} else {
			const startDate = new Date();
			newJob.preferredStartDateTime = startDate.toISOString();
		}
		if (newJob.preferredStartDateTime) {
			if (job.startTime) {
				const startDate = new Date(newJob.preferredStartDateTime);
				const startTime = job.startTime;
				const splits: Array<any> = startTime.split(":", 2);
				startDate.setHours(splits[0]);
				startDate.setMinutes(splits[1]);
				newJob.preferredStartDateTime = startDate.toISOString();
			}
		}
		newJob.storeId = job.storeId;

		return newJob;
	}
}
