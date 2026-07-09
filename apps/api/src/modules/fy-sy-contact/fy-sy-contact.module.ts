import { Module } from "@nestjs/common";
import { FySyContactController } from "./fy-sy-contact.controller";
import { FySyContactService } from "./fy-sy-contact.service";

@Module({
	controllers: [FySyContactController],
	providers: [FySyContactService],
})
export class FySyContactModule {}
