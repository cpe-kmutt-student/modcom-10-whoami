import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { SyContactService } from "./sy-contact.service";
import { LaunchPeriodGuard } from "src/common/guards/launch-period.guard";
import { SeniorPermission } from "src/common/guards/senior-permission.guard";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { ContactUpdateDto } from "./dto/sy-contact-update.dto";

@Controller("/_/sy/contact")
export class SyContactController {
	constructor(private readonly syContactService: SyContactService) {}

	@Get("/")
	@UseGuards(LaunchPeriodGuard)
	getContact() {
		return this.syContactService.getContactAll();
	}

	@Get("info")
	@UseGuards(SeniorPermission)
	getContactInfo(@Session() session: UserSession) {}

	@Post("/upload")
	@UseGuards(SeniorPermission)
	updateContactInfo(@Session() session: UserSession, @Body() contactUpdateDto: ContactUpdateDto) {
		return this.syContactService.updateContactInfo(session.user.id, contactUpdateDto);
	}
}
