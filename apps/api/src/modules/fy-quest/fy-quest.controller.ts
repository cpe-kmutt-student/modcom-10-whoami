import { Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { FyQuestService } from "./fy-quest.service";
import { QuestAllow, QuestPeriodGuard } from "src/common/guards/quest-period.guard";
import { Request } from "express";
import { JuniorPermission } from "src/common/guards/junior-permission.guard";

@Controller("/_/fy/quest")
export class FyQuestController {
	constructor(private readonly fyQuestService: FyQuestService) {}

	@Get("/")
	@UseGuards(JuniorPermission)
	@UseGuards(QuestPeriodGuard)
	getQuest(@Session() session: UserSession, @Req() req: Request & { questAllow: QuestAllow }) {
		return this.fyQuestService.getQuest(session.user.id, req);
	}

	@Get("/:id")
	@UseGuards(JuniorPermission)
	@UseGuards(QuestPeriodGuard)
	getQuestById(@Session() session: UserSession, @Req() req: Request & { questAllow: QuestAllow }, @Param("id") questId: string) {
		return this.fyQuestService.getQuestById(session.user.id, req, questId);
	}

	@Post("/opened/:hintIndex")
	@UseGuards(JuniorPermission)
	@UseGuards(QuestPeriodGuard)
	setOpenedBox(@Session() session: UserSession, @Param("hintIndex") hintIndex: string) {
		return this.fyQuestService.setOpenedBox(session.user.id, hintIndex);
	}
}
