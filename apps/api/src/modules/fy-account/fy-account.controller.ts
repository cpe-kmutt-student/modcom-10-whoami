import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { FyAccountService } from "./fy-account.service";
import { LaunchPeriodGuard } from "src/common/guards/launch-period.guard";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { LinkAccountDto } from "./dto/link-account.dto";
import { JuniorPermission } from "src/common/guards/junior-permission.guard";

@Controller("/_/fy/account")
export class FyAccountController {
	constructor(private readonly fyAccountService: FyAccountService) {}

	@Post("/link")
	@UseGuards(JuniorPermission)
	@UseGuards(LaunchPeriodGuard)
	linkFirstYearAccount(@Session() session: UserSession, @Body() linkAccountDto: LinkAccountDto) {
		return this.fyAccountService.linkFirstYearAccount(session.user.email, linkAccountDto);
	}

	@Get("/profile")
	@UseGuards(JuniorPermission)
	accountProfile(@Session() session: UserSession) {
		return this.fyAccountService.accountProfile(session.user.id);
	}
}
