import { HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { config } from "@repo/config";
import { getPreSignUrl } from "@repo/storage";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class SyJuniorHintService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly logger: Logger = new Logger(SyJuniorHintService.name);

	async getJuniorHint(userId: string) {
		try {
			const getQuest = await this.prisma.client.user.findUnique({
				where: {
					id: userId,
				},
				include: {
					joiner_syuser: {
						include: {
							syuser: {
								include: {
									fyuser: {
										include: {
											fyuser: {
												include: {
													fyquest: true,
												},
											},
										},
									},
								},
							},
						},
					},
				},
			});

			return getQuest;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async getHintById(fyUserId: string, hintIndex: string) {
		try {
			const getFyHint = await this.prisma.client.firstYearQuest.findMany({
				where: {
					fyquest_index: parseInt(hintIndex),
					fyuser_id: fyUserId,
				},
			});

			if (getFyHint.length === 0) throw new NotFoundException();

			return {
				...getFyHint[0],
				fyquest_url: getFyHint[0].fyquest_detail ? await getPreSignUrl(config.backend.s3.bucket, getFyHint[0].fyquest_detail) : null,
			};
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
