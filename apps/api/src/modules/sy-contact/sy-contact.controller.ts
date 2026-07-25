import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { SyContactService } from "./sy-contact.service";
import { LaunchPeriodGuard } from "src/common/guards/launch-period.guard";
import { SeniorPermission } from "src/common/guards/senior-permission.guard";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { ContactUpdateDto } from "./dto/sy-contact-update.dto";

@Controller("/_/sy/contact")
export class SyContactController {
	constructor(private readonly syContactService: SyContactService) {}

	@Post("/update")
	@UseGuards(SeniorPermission)
	updateContact(@Session() session: UserSession, @Body() contactUpdateDto: ContactUpdateDto) {
		return this.syContactService.updateContact(session.user.id, contactUpdateDto);
	}
}
