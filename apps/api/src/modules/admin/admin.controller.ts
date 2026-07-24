import { Body, Controller, Get, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { AdminPermission } from "src/common/guards/admin-permission.guard";
import { AdminService } from "./admin.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AboutDto, HintDto, ProfileDto } from "./dto/admin.dto";

@Controller("/_/admin")
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Get("/sy/account")
	@UseGuards(AdminPermission)
	getSyAccount(@Session() session: UserSession) {
		return this.adminService.getSyAccount();
	}

	@Get("/get-permission")
	@UseGuards(AdminPermission)
	getPermission() {
		return "OK";
	}

	@Post("/sy/update/hint")
	@UseGuards(AdminPermission)
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
		return this.adminService.updateSyHint(session.user.id, hintDto, file);
	}

	@Post("/sy/update/profile")
	@UseGuards(AdminPermission)
	@UseInterceptors(FileInterceptor("file"))
	updateProfile(
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
		@Body() profileDto: ProfileDto,
	) {
		return this.adminService.updateSyProfile(profileDto, file);
	}

	@Post("/sy/update/about")
	@UseGuards(AdminPermission)
	updateContact(@Body() aboutDto: AboutDto) {
		return this.adminService.updateSyContact(aboutDto);
	}
}
