import { Controller, Get, Req, Session, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AllowAnonymous, type UserSession } from "@thallesp/nestjs-better-auth";
import { QuestAllow, QuestPeriodGuard } from "./common/guards/quest-period.guard";
import { Request } from "express";

@Controller("/")
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get("/")
	@AllowAnonymous()
	root() {
		return this.appService.getRoot();
	}
}
