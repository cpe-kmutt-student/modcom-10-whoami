import { Module } from "@nestjs/common";
import { FyHintScheduleService } from "./fy-hint-schedule.service";

@Module({
	providers: [FyHintScheduleService],
})
export class FyHintScheduleModule {}
