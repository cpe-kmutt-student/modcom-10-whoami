import { Body, Controller, Logger, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { SyUpdateService } from "./sy-update.service";
import { SeniorPermission } from "src/common/guards/senior-permission.guard";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { AboutDto, HintDto } from "./dto/sy-contact-update.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("/_/sy/update")
export class SyUpdateController {
	constructor(private readonly syUpdateService: SyUpdateService) {}

	@Post("/about")
	@UseGuards(SeniorPermission)
	updateContact(@Session() session: UserSession, @Body() aboutDto: AboutDto) {
		return this.syUpdateService.updateContact(session.user.id, aboutDto);
	}

	@Post("/hint")
	@UseGuards(SeniorPermission)
	@UseInterceptors(FileInterceptor("file"))
	updateHint(
		@Session() session: UserSession,
		@Body() hintDto: HintDto,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: 3 * 1024 * 1024,
					}),
				],
			}),
		)
		file: Express.Multer.File,
	) {
		return this.syUpdateService.updateHint(session.user.id, hintDto, file);
	}

	@Post("/profile")
	@UseGuards(SeniorPermission)
	@UseInterceptors(FileInterceptor("file"))
	updateProfile(
		@Session() session: UserSession,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: 3 * 1024 * 1024,
					}),
				],
			}),
		)
		file: Express.Multer.File,
	) {
		return this.syUpdateService.updateProfile(session.user.id, file);
	}
}
