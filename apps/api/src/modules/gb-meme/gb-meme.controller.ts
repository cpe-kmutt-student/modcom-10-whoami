import { Controller, Get, Res } from "@nestjs/common";
import { GbMemeService } from "./gb-meme.service";
import { type Response } from "express";

@Controller("_/gb/meme")
export class GbMemeController {
	constructor(private readonly gbMemeService: GbMemeService) {}

	@Get("/random/:n")
	getRandomMeme(@Res() res: Response) {
		return this.gbMemeService.getRandomMeme(res);
	}
}
