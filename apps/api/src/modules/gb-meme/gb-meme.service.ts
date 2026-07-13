import { HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import axios from "axios";
import { PrismaService } from "src/core/prisma/prisma.service";
import meme from "./meme.json";
import { Response } from "express";

@Injectable()
export class GbMemeService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly logger: Logger = new Logger(GbMemeService.name);

	async getRandomMeme(res: Response) {
		try {
			const getMemeData = meme[Math.floor(Math.random() * meme.length)];

			const response = await axios.get(`https://raw.githubusercontent.com/deep5050/programming-memes/main/${getMemeData.path}`, {
				responseType: "stream",
			});

			res.setHeader("Content-Type", String(response.headers["content-type"] ?? "image/png"));

			response.data.pipe(res);
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
