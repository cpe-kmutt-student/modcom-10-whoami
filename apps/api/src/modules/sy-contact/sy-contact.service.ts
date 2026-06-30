import { HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { getPreSignUrl } from "@repo/storage";
import { config } from "@repo/config";
import { ContactUpdateDto } from "./dto/sy-contact-update.dto";

@Injectable()
export class SyContactService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly logger = new Logger(SyContactService.name);

	async getContactAll() {
		try {
			const getContact = await this.prisma.client.secondYearUser.findMany({
				include: {
					sycontact: true,
				},
				omit: {
					syuser_email: true,
					syuser_id: true,
				},
			});

			return await Promise.all(
				getContact.map(async (c) => {
					return {
						...c,
						syuser_profile_url: c.syuser_profile_key ? await getPreSignUrl(config.backend.s3.bucket, "_.jpeg") : null,
					};
				}),
			);
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async getContactInfo(userId: string) {}

	async updateContactInfo(userId: string, contactUpdateDto: ContactUpdateDto) {}
}
