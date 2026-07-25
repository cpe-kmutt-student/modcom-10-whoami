import { Injectable, UseGuards } from "@nestjs/common";
import { PrismaService } from "./core/prisma/prisma.service";
import { UserSession } from "@thallesp/nestjs-better-auth";
import { UtilsService } from "./modules/utils/utils.service";
import { QuestPeriodGuard } from "./common/guards/quest-period.guard";

@Injectable()
export class AppService {
	constructor(private readonly prisma: PrismaService) {}

	async getRoot() {
		return {
			title: "ModCom 10 | Mentor-Mentee Backend RESTFul API",
			credits: "Made with 🧡 & ☕️ by CPE 39",
			greeting: ["เอ๋~~ เดี๋ยวนะ! นี่น้องเข้ามาได้่ไงเนี่ยยย", "ออกปายยน้าาาาา"],
		};
	}
}
