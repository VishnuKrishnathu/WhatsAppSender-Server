import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class SigninDto{
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    readonly password: string;
}