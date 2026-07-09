import { Controller, Get } from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import { DebugService } from "./debug.service";

@Controller("/debug")
export class DebugController {
	constructor(private readonly debugService: DebugService) {}

	@Get("/")
	@AllowAnonymous()
	configDebug() {
		return this.debugService.getConfigDebug();
	}

	@Get("/health")
	@AllowAnonymous()
	health() {
		return "ok";
	}

	@Get("/who")
	@AllowAnonymous()
	who() {
		return process.pid;
	}
}
