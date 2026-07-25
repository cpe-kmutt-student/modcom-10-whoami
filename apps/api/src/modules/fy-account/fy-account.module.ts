import { Module } from "@nestjs/common";
import { FyAccountService } from "./fy-account.service";
import { FyAccountController } from "./fy-account.controller";

@Module({
	providers: [FyAccountService],
	controllers: [FyAccountController],
})
export class FyAccountModule {}
