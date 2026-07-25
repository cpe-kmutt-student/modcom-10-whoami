import { CanActivate, createParamDecorator, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { config } from "@repo/config";
import { Observable } from "rxjs";

export interface QuestAllow {
	quest1: boolean;
	quest2: boolean;
	quest3: boolean;
}

@Injectable()
export class QuestPeriodGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		try {
			if (!config.backend.period.quest1.startDate || !config.backend.period.quest2.startDate || !config.backend.period.quest1.startDate) {
				throw new Error("Quest Period date not set, please contact dev fix it, maybe he forgot, LMAO");
			}

			const request = context.switchToHttp().getRequest();
			const quest1StartTime = new Date(config.backend.period.quest1.startDate).getTime(); // UTC
			const quest2StartTime = new Date(config.backend.period.quest2.startDate).getTime(); // UTC
			const quest3StartTime = new Date(config.backend.period.quest3.startDate).getTime(); // UTC
			const currentTime = Date.now(); // UTC

			const questAllow: QuestAllow = {
				quest1: false,
				quest2: false,
				quest3: false,
			};

			if (currentTime > quest1StartTime || config.backend.period.quest1.bypass) {
				questAllow.quest1 = true;
			}
			if (currentTime > quest2StartTime || config.backend.period.quest2.bypass) {
				questAllow.quest2 = true;
			}
			if (currentTime > quest3StartTime || config.backend.period.quest3.bypass) {
				questAllow.quest3 = true;
			}

			if (!questAllow.quest1 && !questAllow.quest2 && !questAllow.quest3) {
				throw new Error();
			}

			request.questAllow = questAllow;
			return true;
		} catch (e) {
			throw new ForbiddenException("The app is not available yet. The quest period has not started.");
		}
	}
}
