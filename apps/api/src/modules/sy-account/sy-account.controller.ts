import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { LaunchPeriodGuard } from "src/common/guards/launch-period.guard";
import { SyAccountService } from "./sy-account.service";
import { LinkAccountDto } from "./dto/link-account.dto";

@Controller("_/sy/account")
export class SyAccountController {
	constructor(private readonly syAccountService: SyAccountService) {}

	@Post("/link")
	@UseGuards(LaunchPeriodGuard)
	linkFirstYearAccount(@Session() session: UserSession, @Body() linkAccountDto: LinkAccountDto) {
		return this.syAccountService.linkSeniorYearAccount(session.user.email, linkAccountDto);
	}
}
