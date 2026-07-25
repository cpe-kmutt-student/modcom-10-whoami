import { Module } from "@nestjs/common";
import { SyUpdateService } from "./sy-update.service";
import { SyUpdateController } from "./sy-update.controller";

@Module({
	providers: [SyUpdateService],
	controllers: [SyUpdateController],
})
export class SyUpdateModule {}
