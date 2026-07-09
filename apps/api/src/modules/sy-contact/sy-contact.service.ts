import { ForbiddenException, HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { getPreSignUrl } from "@repo/storage";
import { config } from "@repo/config";
import { ContactUpdateDto } from "./dto/sy-contact-update.dto";
import { ContactPlatform } from "@repo/database";

@Injectable()
export class SyContactService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly logger = new Logger(SyContactService.name);

	async updateContact(userId: string, contactUpdateDto: ContactUpdateDto) {
		try {
			const getSyUser = await this.prisma.client.user.findUnique({
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

			const syUser = getSyUser?.joiner_syuser[0].syuser;

			if (!syUser) throw new ForbiddenException();

			const updateSyUserData = await this.prisma.client.secondYearUser.update({
				where: {
					syuser_uuid: syUser.syuser_uuid,
				},
				data: {
					syuser_nickname: contactUpdateDto.firstname,
					syuser_firstname: contactUpdateDto.firstname,
					syuser_lastname: contactUpdateDto.lastname,
					syuser_profile_key: contactUpdateDto.profileKey,
					sycontact: {
						createMany: {
							data: contactUpdateDto.contacts.map((c) => {
								return {
									sycontact_platform: c.platform,
									sycontact_detail: c.value,
								};
							}),
						},
					},
				},
			});

			return updateSyUserData;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
