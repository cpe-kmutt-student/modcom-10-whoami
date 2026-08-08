import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { HttpException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { config } from "@repo/config";
import { getPreSignUrl } from "@repo/storage";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class FySyContactService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly logger: Logger = new Logger(FySyContactService.name);

	async getAllContact() {
		try {
			const getAllContact = await this.prisma.client.secondYearUser.findMany({
				where: {
					deprecated: false,
				},
				orderBy: {
					syuser_firstname: "asc",
				},
				omit: {
					syuser_email: true,
				},
				include: {
					sycontact: {
						omit: {
							syuser_id: true,
						},
					},
				},
			});

			const mapImageUrl = await Promise.all(
				getAllContact.map(async (c) => {
					return {
						...c,
						syuser_id: null,
						sycontact_url: c.syuser_profile_key ? await getPreSignUrl(config.backend.s3.bucket, c.syuser_profile_key) : null,
						sycontact_department: c.syuser_id.slice(7, 9) === "10" ? "Reg" : c.syuser_id.slice(7, 9) === "34" ? "Inter" : c.syuser_id.slice(7, 9) === "52" ? "HDS" : null,
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

	async getContactById(userUUID: string) {
		try {
			const getContact = await this.prisma.client.secondYearUser.findUnique({
				where: {
					syuser_uuid: userUUID,
				},
				omit: {
					syuser_email: true,
					syuser_id: true,
				},
				include: {
					sycontact: {
						omit: {
							syuser_id: true,
						},
					},
				},
			});

			if (!getContact) throw new NotFoundException();

			return {
				...getContact,
				sycontact_url: getContact.syuser_profile_key ? await getPreSignUrl(config.backend.s3.bucket, getContact.syuser_profile_key) : null,
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
