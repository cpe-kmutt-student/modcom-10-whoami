import { BadRequestException, ForbiddenException, HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { config } from "@repo/config";
import { getPreSignUrl } from "@repo/storage";
import { Request } from "express";
import { QuestAllow } from "src/common/guards/quest-period.guard";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class FyQuestService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly logger = new Logger(FyQuestService.name);

	async getQuest(userId: string, req: Request & { questAllow: QuestAllow }) {
		try {
			const getUser = await this.prisma.client.user.findUnique({
				where: {
					id: userId,
					joiner_fyuser: {
						some: {},
					},
				},
				include: {
					joiner_fyuser: {
						include: {
							fyuser: {
								include: {
									fyquest: true,
								},
							},
						},
					},
				},
			});

			if (!getUser) {
				return []; // no user to link with case
			}

			const filterQuest = getUser.joiner_fyuser[0].fyuser.fyquest
				.filter((q) => (!req.questAllow.quest1 ? q.fyquest_index !== 1 : true))
				.filter((q) => (!req.questAllow.quest2 ? q.fyquest_index !== 2 : true))
				.filter((q) => (!req.questAllow.quest3 ? q.fyquest_index !== 3 : true));

			const mapQuestImageUrl = await Promise.all(
				filterQuest.map(async (q) => {
					return {
						...q,
						fyquest_url: q.fyquest_detail ? await getPreSignUrl(config.backend.s3.bucket, q.fyquest_detail) : null,
					};
				}),
			);

			return mapQuestImageUrl;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async getQuestById(userId: string, req: Request & { questAllow: QuestAllow }, questId: string) {
		try {
			const getUser = await this.prisma.client.user.findUnique({
				where: {
					id: userId,
					joiner_fyuser: {
						some: {},
					},
				},
				include: {
					joiner_fyuser: {
						include: {
							fyuser: {
								include: {
									fyquest: true,
								},
							},
						},
					},
				},
			});

			if (!getUser) {
				throw new ForbiddenException("This account is not linked to any first year user.");
			}

			const filterQuest = getUser.joiner_fyuser[0].fyuser.fyquest
				.filter((q) => (!req.questAllow.quest1 ? q.fyquest_index !== 1 : true))
				.filter((q) => (!req.questAllow.quest2 ? q.fyquest_index !== 2 : true))
				.filter((q) => (!req.questAllow.quest3 ? q.fyquest_index !== 3 : true));

			const filterById = filterQuest.find((q) => String(q.fyquest_index) === questId);

			if (!filterById) {
				throw new NotFoundException();
			}

			return filterById;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async setOpenedBox(userId: string, hintIndex: string) {
		try {
			// get studentId
			const getFyUser = await this.prisma.client.user.findUnique({
				where: {
					id: userId,
				},
				include: {
					joiner_fyuser: {
						include: {
							fyuser: true,
						},
					},
				},
			});

			const studentId = getFyUser!.joiner_fyuser[0].fyuser.fyuser_id;

			const getFyHint = await this.prisma.client.firstYearUser.findUnique({
				where: {
					fyuser_id: studentId,
				},
				include: {
					fyquest: true,
				},
			});

			const filterHintById = getFyHint?.fyquest.find((q) => q.fyquest_index === parseInt(hintIndex));

			if (!filterHintById) throw new NotFoundException(`No Hint index : ${hintIndex} : found in db`);

			const targetHintId = filterHintById.fyquest_id;

			// update hint box open status
			const updateBoxStatus = await this.prisma.client.firstYearQuest.update({
				where: {
					fyquest_id: targetHintId,
				},
				data: {
					fyquest_status_boxopen: true,
				},
			});

			return updateBoxStatus;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
