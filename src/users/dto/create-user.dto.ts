import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsStrongPassword()
    readonly password: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly fullName: string;

    @IsOptional()
    @IsMobilePhone(undefined, {
        strictMode: true
    })
    readonly phone: string;
}