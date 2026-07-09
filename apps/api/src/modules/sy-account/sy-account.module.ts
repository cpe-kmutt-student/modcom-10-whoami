import { Module } from "@nestjs/common";
import { SyAccountController } from "./sy-account.controller";
import { SyAccountService } from "./sy-account.service";

@Module({
	controllers: [SyAccountController],
	providers: [SyAccountService],
})
export class SyAccountModule {}
