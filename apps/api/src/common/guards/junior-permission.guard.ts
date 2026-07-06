import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Session } from "@thallesp/nestjs-better-auth";
import { Observable } from "rxjs";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class JuniorPermission implements CanActivate {
	constructor(private readonly prisma: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const session = request.session as UserSession;

		try {
			const seniorUser = await this.prisma.client.user.findUnique({
				where: {
					id: session.user.id,
					joiner_fyuser: {
						some: {},
					},
				},
			});

			if (!seniorUser) return false;

			return true;
		} catch (e) {
			return false;
		}
	}
}
