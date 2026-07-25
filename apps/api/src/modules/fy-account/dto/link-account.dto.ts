import { IsNotEmpty, IsNumberString, IsString, Length, MaxLength, MinLength } from "class-validator";

export class LinkAccountDto {
	@IsNumberString()
	@IsNotEmpty()
	@MinLength(11, { message: "student id should have 11 characters length" })
	readonly student_id: string;
}
