import { ContactPlatform } from "@repo/database";
import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsInt, IsNotEmpty, IsString, MaxLength, Min, ValidateNested } from "class-validator";

export class ContactDto {
	@IsEnum(ContactPlatform)
	platform: ContactPlatform;

	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	value: string;
}

export class HintDto {
	@IsInt()
	@Min(0)
	index: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	value: string;
}

export class ContactUpdateDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	nickname: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	firstname: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	lastname: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	profileKey: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ContactDto)
	@ArrayMinSize(1)
	@ArrayMaxSize(10)
	contacts: ContactDto[];

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => HintDto)
	@ArrayMaxSize(20)
	hints: HintDto[];
}
