import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { LaunchPeriodGuard } from "src/common/guards/launch-period.guard";
import { SyAccountService } from "./sy-account.service";
import { LinkAccountDto } from "./dto/link-account.dto";
import { SeniorPermission } from "src/common/guards/senior-permission.guard";

@Controller("_/sy/account")
export class SyAccountController {
	constructor(private readonly syAccountService: SyAccountService) {}

	@Post("/link")
	@UseGuards(LaunchPeriodGuard)
	linkAccount(@Session() session: UserSession, @Body() linkAccountDto: LinkAccountDto) {
		return this.syAccountService.linkAccount(session.user.email, linkAccountDto);
	}

	@Get("/profile")
	@UseGuards(SeniorPermission)
	accountProfile(@Session() session: UserSession) {
		return this.syAccountService.accountProfile(session.user.id);
	}
}
