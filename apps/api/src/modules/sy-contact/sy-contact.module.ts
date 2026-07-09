import { Module } from "@nestjs/common";
import { SyContactController } from "./sy-contact.controller";
import { SyContactService } from "./sy-contact.service";

@Module({
	controllers: [SyContactController],
	providers: [SyContactService],
})
export class SyContactModule {}
