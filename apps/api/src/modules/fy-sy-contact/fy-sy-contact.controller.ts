import { Controller, Get, Param, UseGuards, UseInterceptors } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { JuniorPermission } from "src/common/guards/junior-permission.guard";
import { FySyContactService } from "./fy-sy-contact.service";
import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";

@Controller("/_/fy/sy/contact")
export class FySyContactController {
	constructor(private readonly fySyContactService: FySyContactService) {}

	@Get("/")
	@UseInterceptors(CacheInterceptor)
	@CacheKey("sy_contacts")
	@CacheTTL(10 * 60 * 1000)
	@UseGuards(JuniorPermission)
	getAllContact() {
		return this.fySyContactService.getAllContact();
	}

	@Get("/:uuid")
	@UseGuards(JuniorPermission)
	getContactById(@Param("uuid") userUUID: string) {
		return this.fySyContactService.getContactById(userUUID);
	}
}
