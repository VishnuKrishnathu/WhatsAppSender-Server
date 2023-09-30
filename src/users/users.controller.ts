import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }
    @Post("register")
    async register(@Body() userDto: CreateUserDto) {
        try {
            let user = await this.userService.createUser(userDto);
            return { data: user };
        }
        catch (err) {
            if (err.message.includes("duplicate key error")) {
                throw new HttpException("User already exists.", HttpStatus.BAD_REQUEST);
            } else {
                throw new Error(err.message);
            }
        }
    }
}
