import { ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { AboutDto, HintDto } from "./dto/sy-contact-update.dto";
import { uploadFile, uploadFileOptimize } from "@repo/storage";
import { config } from "@repo/config";
import sharp from "sharp";

@Injectable()
export class SyUpdateService {
	private readonly logger: Logger = new Logger(SyUpdateService.name);

	constructor(private readonly prisma: PrismaService) {}

	async updateContact(userId: string, aboutDto: AboutDto) {
		try {
			// update nickname
			const getSyUser = await this.prisma.client.user.findUnique({
				where: {
					id: userId,
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

			if (!getSyUser) throw new ForbiddenException("Account not link");

			// update nickname
			const updateSyUserNickname = await this.prisma.client.secondYearUser.update({
				where: {
					syuser_id: getSyUser.joiner_syuser[0].syuser.syuser_id,
				},
				data: {
					syuser_nickname: aboutDto.nickname,
				},
			});

			// delete old
			const deleteOldContact = await this.prisma.client.secondYearContact.deleteMany({
				where: {
					syuser: {
						joiner_user: {
							some: {
								user: {
									id: userId,
								},
							},
						},
					},
				},
			});

			// getInternalUserId
			const getInternal = await this.prisma.client.user.findUnique({
				where: {
					id: userId,
				},
				include: {
					joiner_syuser: {
						include: {
							syuser: true,
						},
					},
				},
			});

			if (!getInternal) {
				throw new ForbiddenException();
			}

			// create new
			const createContact = await this.prisma.client.secondYearContact.createMany({
				data: aboutDto.contact.map((c) => {
					return {
						sycontact_platform: c.platform,
						sycontact_detail: c.value,
						syuser_id: getInternal.joiner_syuser[0].syuser.syuser_id,
					};
				}),
			});

			const getUpdatedContact = await this.prisma.client.secondYearContact.findMany({
				where: {
					syuser_id: getInternal.joiner_syuser[0].syuser.syuser_id,
				},
				omit: {
					syuser_id: true,
				},
			});

			return getUpdatedContact;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async updateHint(userId: string, hintDto: HintDto, file: Express.Multer.File) {
		try {
			const checkPermission = await this.prisma.client.user.findUnique({
				where: {
					id: userId,
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

			if (!checkPermission) throw new ForbiddenException();

			const syStudentId = checkPermission.joiner_syuser[0].syuser.syuser_id;

			// is this user is him buddy
			const checkBuddy = await this.prisma.client.firstYearUser.findUnique({
				where: {
					fyuser_id: hintDto.fyUserId,
					syuser: {
						some: {
							syuser_id: syStudentId,
						},
					},
				},
			});

			if (!checkBuddy) throw new ForbiddenException();

			const fileKey = `hint-${hintDto.hintIndex}-${new Date().getTime()}`;

			// upload
			await uploadFileOptimize(config.backend.s3.bucket, fileKey, file.buffer);

			const deleteOldFyHint = await this.prisma.client.firstYearQuest.deleteMany({
				where: {
					fyuser_id: hintDto.fyUserId,
					fyquest_index: parseInt(hintDto.hintIndex),
				},
			});

			const createNewFyHint = await this.prisma.client.firstYearQuest.createMany({
				data: {
					fyuser_id: hintDto.fyUserId,
					fyquest_index: parseInt(hintDto.hintIndex),
					fyquest_detail: fileKey,
				},
			});

			const findHint = await this.prisma.client.firstYearQuest.findMany({
				where: {
					fyuser_id: hintDto.fyUserId,
				},
				omit: {
					fyuser_id: true,
				},
			});

			return findHint;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async updateProfile(userId: string, file: Express.Multer.File) {
		try {
			const fileKey = `profile-${new Date().getTime()}`;

			// upload
			await uploadFileOptimize(config.backend.s3.bucket, fileKey, file.buffer);

			const getSyUserId = await this.prisma.client.user.findUnique({
				where: {
					id: userId,
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

			if (!getSyUserId) throw new ForbiddenException();

			const updateProfile = await this.prisma.client.secondYearUser.update({
				where: {
					syuser_id: getSyUserId.joiner_syuser[0].syuser.syuser_id,
				},
				data: {
					syuser_profile_key: fileKey,
				},
				omit: {
					syuser_id: true,
				},
			});

			return updateProfile;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
