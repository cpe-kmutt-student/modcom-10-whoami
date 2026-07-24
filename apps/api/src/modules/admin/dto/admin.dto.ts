import { ContactPlatform } from "@repo/database";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumberString, IsString, MaxLength, ValidateNested } from "class-validator";

export class HintDto {
	@IsNumberString()
	readonly hintIndex: string;

	@IsString()
	readonly fyUserId: string;
}

export class ProfileDto {
	@IsString()
	readonly syUserId: string;
}

export class AboutDto {
	@IsString()
	@IsNotEmpty()
	readonly syUserId: string;

	@IsString()
	@IsNotEmpty()
	readonly nickname: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ContactDto)
	readonly contact: ContactDto[];
}

export class ContactDto {
	@IsEnum(ContactPlatform)
	readonly platform: ContactPlatform;

	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	readonly value: string;
}
