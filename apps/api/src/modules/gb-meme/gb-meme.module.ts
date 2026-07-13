import { Module } from "@nestjs/common";
import { GbMemeController } from "./gb-meme.controller";
import { GbMemeService } from "./gb-meme.service";

@Module({
	controllers: [GbMemeController],
	providers: [GbMemeService],
})
export class GbMemeModule {}
