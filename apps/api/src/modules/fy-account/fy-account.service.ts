import { ForbiddenException, HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { LinkAccountDto } from "./dto/link-account.dto";

@Injectable()
export class FyAccountService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly logger = new Logger(FyAccountService.name);

	async linkAccount(userEmail: string, linkAccountDto: LinkAccountDto) {
		try {
			const validateAccount = await this.prisma.client.firstYearUser.findUnique({
				where: {
					fyuser_id: linkAccountDto.student_id,
					fyuser_email: userEmail,
				},
			});

			if (!validateAccount) {
				throw new ForbiddenException("Cannot link your kmutt account, please contact dev for help");
			}

			const findLinked = await this.prisma.client.firstYearUserAndUserJoiner.deleteMany({
				where: {
					fyuser_email: validateAccount.fyuser_email,
					user_email: validateAccount.fyuser_email,
				},
			});

			const upsertLinkAccount = await this.prisma.client.firstYearUserAndUserJoiner.create({
				data: {
					fyuser_email: validateAccount.fyuser_email,
					user_email: validateAccount.fyuser_email,
				},
			});

			return validateAccount;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async accountProfile(userId: string) {
		try {
			const user = await this.prisma.client.user.findUnique({
				where: {
					id: userId,
					joiner_fyuser: {
						some: {},
					},
				},
				include: {
					joiner_fyuser: {
						include: {
							fyuser: true,
						},
					},
				},
			});

			return user;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
