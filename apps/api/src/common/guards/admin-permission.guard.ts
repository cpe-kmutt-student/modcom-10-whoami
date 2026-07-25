import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Session } from "@thallesp/nestjs-better-auth";
import { Observable } from "rxjs";
import { PrismaService } from "src/core/prisma/prisma.service";
import { config } from "@repo/config";

@Injectable()
export class AdminPermission implements CanActivate {
	constructor(private readonly prisma: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const session = request.session as UserSession;

		try {
			const seniorUser = await this.prisma.client.user.findUnique({
				where: {
					id: session.user.id,
					joiner_syuser: {
						some: {},
					},
				},
				include: {
					joiner_syuser: {
						include: {
							syuser: true,
						},
					},
				},
			});

			if (!seniorUser) return false;

			if (!config.backend.permission.superUserIds.includes(seniorUser.joiner_syuser[0].syuser.syuser_id)) return false;

			return true;
		} catch (e) {
			return false;
		}
	}
}
