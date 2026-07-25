import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { SeniorPermission } from "src/common/guards/senior-permission.guard";
import { SyJuniorHintService } from "./sy-junior-hint.service";

@Controller("/_/sy/junior-hint")
export class SyJuniorHintController {
	constructor(private readonly syJuniorHintService: SyJuniorHintService) {}

	@Get("/")
	@UseGuards(SeniorPermission)
	getJuniorHint(@Session() session: UserSession) {
		return this.syJuniorHintService.getJuniorHint(session.user.id);
	}

	@Get("/:fyUserId/:hintIndex")
	@UseGuards(SeniorPermission)
	getHintById(@Session() session: UserSession, @Param("fyUserId") fyUserId: string, @Param("hintIndex") hintIndex: string) {
		return this.syJuniorHintService.getHintById(fyUserId, hintIndex);
	}
}
