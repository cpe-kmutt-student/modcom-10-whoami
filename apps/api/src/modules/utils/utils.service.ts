import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { Logger } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class UtilsService {
	private readonly logger = new Logger(UtilsService.name);

	constructor(private readonly prisma: PrismaService) {}

	async getStudentId(userId: string) {
		try {
			const user = await this.prisma.client.user.findUnique({
				where: {
					id: userId,
				},
				include: {
					accounts: true,
				},
			});

			if (!user) throw new NotFoundException();

			const accessToken = user.accounts.find((ac) => ac.providerId === "microsoft")?.accessToken;

			if (!accessToken) throw new NotFoundException();

			const response = await axios.get("https://graph.microsoft.com/v1.0/me?$select=onPremisesSamAccountName", {
				headers: {
					Authorization: `Bearer ${user.accounts.find((ac) => ac.providerId === "microsoft")?.accessToken}`,
				},
			});

			return response.data.onPremisesSamAccountName;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
