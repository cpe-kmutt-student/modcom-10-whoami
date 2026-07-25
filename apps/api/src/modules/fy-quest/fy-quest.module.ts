import { Module } from "@nestjs/common";
import { FyQuestController } from "./fy-quest.controller";
import { FyQuestService } from "./fy-quest.service";

@Module({
	controllers: [FyQuestController],
	providers: [FyQuestService],
})
export class FyQuestModule {}
