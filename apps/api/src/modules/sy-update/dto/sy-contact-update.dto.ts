import { ContactPlatform } from "@repo/database";
import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsString, Max, MaxLength, Min, ValidateNested } from "class-validator";

export class AboutDto {
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

export class HintDto {
	@IsNumberString()
	hintIndex: string;

	@IsString()
	fyUserId: string;
}
