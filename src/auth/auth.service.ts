import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { comparePassword } from 'src/utils/bcrypt';


@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService
    ) { }

    async signin(signinDto: SigninDto): Promise<string> {
        let user = await this.userService.findOneUser({ email: signinDto.email }, ["password"]);
        if (!user) throw new UnauthorizedException();
        let hashed_password = user.password;
        let password = signinDto.password;

        let isCorrect = await comparePassword(password, hashed_password);

        if (isCorrect) {
            let payload = { email: signinDto.email, userId: user._id.toString() };
            return await this.jwtService.signAsync(payload);
        } else {
            throw new UnauthorizedException();
        }
    }
}