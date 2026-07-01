import { ForbiddenException, HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { LinkAccountDto } from "./dto/link-account.dto";

@Injectable()
export class SyAccountService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly logger = new Logger(SyAccountService.name);

	async linkSeniorYearAccount(userEmail: string, linkAccountDto: LinkAccountDto) {
		try {
			const validateAccount = await this.prisma.client.secondYearUser.findUnique({
				where: {
					syuser_id: linkAccountDto.student_id,
					syuser_email: userEmail,
				},
			});

			if (!validateAccount) {
				throw new ForbiddenException("Cannot link your kmutt account, please contact dev for help");
			}

			const findLinked = await this.prisma.client.secondYearUserAndUserJoiner.findMany({
				where: {
					syuser_email: validateAccount.syuser_email,
					user_email: validateAccount.syuser_email,
				},
			});

			const upsertLinkAccount = await this.prisma.client.secondYearUserAndUserJoiner.upsert({
				where: {
					id: findLinked[0].id,
				},
				create: {
					syuser_email: validateAccount.syuser_email,
					user_email: validateAccount.syuser_email,
				},
				update: {
					syuser_email: validateAccount.syuser_email,
					user_email: validateAccount.syuser_email,
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
}
