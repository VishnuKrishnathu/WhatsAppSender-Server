import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post("signin")
    async signin(@Body() signinDto: SigninDto) {
        let token = await this.authService.signin(signinDto);
        return { data: token };
    }
    
}
