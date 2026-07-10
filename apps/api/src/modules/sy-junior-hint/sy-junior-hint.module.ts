import { Module } from "@nestjs/common";
import { SyJuniorHintController } from "./sy-junior-hint.controller";
import { SyJuniorHintService } from "./sy-junior-hint.service";

@Module({
	controllers: [SyJuniorHintController],
	providers: [SyJuniorHintService],
})
export class SyJuniorHintModule {}
