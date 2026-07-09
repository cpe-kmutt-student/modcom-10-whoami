import { Module } from "@nestjs/common";
import { DebugService } from "./debug.service";
import { DebugController } from "./debug.controller";

@Module({
	providers: [DebugService],
	controllers: [DebugController],
})
export class DebugModule {}
