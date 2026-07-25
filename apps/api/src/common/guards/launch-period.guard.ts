import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { config } from "@repo/config";
import { Observable } from "rxjs";

@Injectable()
export class LaunchPeriodGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		try {
			if (config.backend.period.launch.bypass) {
				return true;
			}

			if (!config.backend.period.launch.startDate) {
				throw new Error("Lauch date not set, please contact dev fix it, maybe he forgot, LMAO");
			}

			const startTime = new Date(config.backend.period.launch.startDate).getTime(); // UTC
			const currentTime = Date.now(); // UTC

			if (currentTime < startTime) {
				throw new Error();
			}

			return true;
		} catch (e) {
			throw new ForbiddenException("The app is not available yet. The launch period has not started.");
		}
	}
}
