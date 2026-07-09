import { ForbiddenException, HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { LinkAccountDto } from "./dto/link-account.dto";
import { getPreSignUrl } from "@repo/storage";
import { config } from "@repo/config";

@Injectable()
export class SyAccountService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly logger = new Logger(SyAccountService.name);

	async linkAccount(userEmail: string, linkAccountDto: LinkAccountDto) {
		console.log(linkAccountDto.student_id);
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

			if (findLinked.length !== 0) {
				const deleteLink = await this.prisma.client.secondYearUserAndUserJoiner.deleteMany({
					where: {
						user_email: validateAccount.syuser_email,
					},
				});
			}

			const upsertLinkAccount = await this.prisma.client.secondYearUserAndUserJoiner.create({
				data: {
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

	async accountProfile(userId: string) {
		try {
			const user = await this.prisma.client.user.findUnique({
				where: {
					id: userId,
				},
				include: {
					joiner_syuser: {
						omit: {
							user_email: true,
							syuser_email: true,
						},
						include: {
							syuser: {
								include: {
									sycontact: {
										omit: {
											syuser_id: true,
										},
									},
								},
							},
						},
					},
				},
			});

			if (user?.joiner_syuser?.[0]?.syuser) {
				const syuser: any = user.joiner_syuser[0].syuser;
				if (syuser.syuser_profile_key) {
					syuser.syuser_profile_url = await getPreSignUrl(config.backend.s3.bucket, syuser.syuser_profile_key);
				} else {
					syuser.syuser_profile_url = null;
				}
			}

			console.log(user?.joiner_syuser[0].syuser);

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
