import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { config } from "@repo/config";
import { sendHintNotification } from "@repo/email";
import { CronJob } from "cron";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class FyHintScheduleService implements OnModuleInit {
	constructor(
		private readonly prisma: PrismaService,
		private readonly schedulerRegistry: SchedulerRegistry,
	) {}

	private readonly logger = new Logger(FyHintScheduleService.name);

	onModuleInit() {
		this.addJob("hint_1_notification", new Date(config.backend.period.quest1.startDate), () => this.processHint1Email());
		this.addJob("hint_2_notification", new Date(config.backend.period.quest2.startDate), () => this.processHint2Email());
		this.addJob("hint_3_notification", new Date(config.backend.period.quest3.startDate), () => this.processHint3Email());
	}

	private addJob(name: string, date: Date, callback: () => Promise<void>) {
		if (date <= new Date()) {
			this.logger.warn(`${name} skipped because date is in the past.`);
			return;
		}

		const job = new CronJob(date, callback);

		this.schedulerRegistry.addCronJob(name, job);
		job.start();
	}

	async processHint1Email() {
		const getLinkedUser = await this.prisma.client.firstYearUser.findMany({
			include: {
				fyquest: true,
			},
		});
		for (const { fyquest, fyuser_email, fyuser_firstname } of getLinkedUser) {
			const getFirstHint = fyquest.find((q) => q.fyquest_index === 1);
			if (!getFirstHint) continue;
			await sendHintNotification(fyuser_email, fyuser_firstname, getFirstHint.fyquest_detail);
		}
	}
	async processHint2Email() {
		const getLinkedUser = await this.prisma.client.firstYearUser.findMany({
			where: {
				joiner_user: {
					some: {},
				},
			},
			include: {
				fyquest: true,
			},
		});
		for (const { fyquest, fyuser_email, fyuser_firstname } of getLinkedUser) {
			const getFirstHint = fyquest.find((q) => q.fyquest_index === 2);
			if (!getFirstHint) continue;
			await sendHintNotification(fyuser_email, fyuser_firstname, getFirstHint.fyquest_detail);
		}
	}
	async processHint3Email() {
		const getLinkedUser = await this.prisma.client.firstYearUser.findMany({
			where: {
				joiner_user: {
					some: {},
				},
			},
			include: {
				fyquest: true,
			},
		});
		for (const { fyquest, fyuser_email, fyuser_firstname } of getLinkedUser) {
			const getFirstHint = fyquest.find((q) => q.fyquest_index === 3);
			if (!getFirstHint) continue;
			await sendHintNotification(fyuser_email, fyuser_firstname, getFirstHint.fyquest_detail);
		}
	}
}
