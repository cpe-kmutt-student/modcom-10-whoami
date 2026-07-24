import { ForbiddenException, HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { config } from "@repo/config";
import { getPreSignUrl, uploadFileOptimize } from "@repo/storage";
import { PrismaService } from "src/core/prisma/prisma.service";
import { AboutDto, HintDto, ProfileDto } from "./dto/admin.dto";

@Injectable()
export class AdminService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly logger: Logger = new Logger(AdminService.name);

	async getSyAccount() {
		try {
			const getAllSyUser = await this.prisma.client.secondYearUser.findMany({
				where: {
					deprecated: false,
				},
				include: {
					sycontact: true,
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
				orderBy: {
					syuser_id: "asc",
				},
			});

			const mapImageUrl = await Promise.all(
				getAllSyUser.map(async (sy) => {
					return {
						...sy,
						syuser_profile_url: sy.syuser_profile_key ? await getPreSignUrl(config.backend.s3.bucket, sy.syuser_profile_key) : null,
						syuser_department: sy.syuser_id.slice(7, 9) === "10" ? "Reg" : sy.syuser_id.slice(7, 9) === "34" ? "Inter" : sy.syuser_id.slice(7, 9) === "52" ? "HDS" : null,
					};
				}),
			);

			return mapImageUrl;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async updateSyHint(userId: string, hintDto: HintDto, file: Express.Multer.File) {
		try {
			const fileKey = `hint-a-${hintDto.hintIndex}-${new Date().getTime()}`;

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

	async updateSyProfile(profileDto: ProfileDto, file: Express.Multer.File) {
		try {
			const fileKey = `profile-a-${new Date().getTime()}`;

			// upload
			await uploadFileOptimize(config.backend.s3.bucket, fileKey, file.buffer);

			const updateProfile = await this.prisma.client.secondYearUser.update({
				where: {
					syuser_id: profileDto.syUserId,
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

	async updateSyContact(aboutDto: AboutDto) {
		try {
			// update nickname
			const updateSyUserNickname = await this.prisma.client.secondYearUser.update({
				where: {
					syuser_id: aboutDto.syUserId,
				},
				data: {
					syuser_nickname: aboutDto.nickname,
				},
			});

			// delete old
			const deleteOldContact = await this.prisma.client.secondYearContact.deleteMany({
				where: {
					syuser: {
						syuser_id: aboutDto.syUserId,
					},
				},
			});

			// create new
			const createContact = await this.prisma.client.secondYearContact.createMany({
				data: aboutDto.contact.map((c) => {
					return {
						sycontact_platform: c.platform,
						sycontact_detail: c.value,
						syuser_id: aboutDto.syUserId,
					};
				}),
			});

			const getUpdatedContact = await this.prisma.client.secondYearContact.findMany({
				where: {
					syuser_id: aboutDto.syUserId,
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
}
