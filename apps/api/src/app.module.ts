import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./core/prisma/prisma.module";
import { AuthModule as BetterAuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "@repo/auth/server";
import { UtilsModule } from "./modules/utils/utils.module";
import { DebugModule } from "./modules/debug/debug.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import path from "node:path";
import { FyQuestModule } from "./modules/fy-quest/fy-quest.module";
import { FyAccountModule } from "./modules/fy-account/fy-account.module";
import { SyContactModule } from "./modules/sy-contact/sy-contact.module";
import { FyHintScheduleModule } from "./modules/fy-hint-schedule/fy-hint-schedule.module";
import { ScheduleModule } from "@nestjs/schedule";
import { SyAccountModule } from "./modules/sy-account/sy-account.module";
import { FySyContactModule } from "./modules/fy-sy-contact/fy-sy-contact.module";
import { SyUpdateModule } from "./modules/sy-update/sy-update.module";
import { SyJuniorHintModule } from "./modules/sy-junior-hint/sy-junior-hint.module";
import { GbMemeModule } from "./modules/gb-meme/gb-meme.module";
import { AdSyAccountModule } from "./modules/admin/admin.module";
import { CacheModule } from "@nestjs/cache-manager";
import { createKeyv } from "@keyv/redis";
import { config } from "@repo/config";
import { redisClient } from "@repo/redis";

@Module({
	imports: [
		PrismaModule,
		BetterAuthModule.forRoot({ auth }),
		UtilsModule,
		DebugModule,
		ServeStaticModule.forRoot({
			rootPath: path.join(process.cwd(), "public"),
			exclude: ["/_/{*path}", "/docs/{*path}", "/{*path}"],
		}),
		FyQuestModule,
		FyAccountModule,
		SyContactModule,
		FyHintScheduleModule,
		ScheduleModule.forRoot(),
		SyAccountModule,
		FySyContactModule,
		SyUpdateModule,
		SyJuniorHintModule,
		GbMemeModule,
		AdSyAccountModule,
		CacheModule.registerAsync({
			isGlobal: true,
			useFactory: () => ({
				stores: [createKeyv(config.backend.redis.connectionUrl)],
			}),
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
