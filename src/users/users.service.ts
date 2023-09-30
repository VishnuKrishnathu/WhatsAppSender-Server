import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserKeys } from './schemas/user.schema';
import { Model, FilterQuery, Query } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    // async hashPassword(password: string): Promise<string> {
    //     const saltRounds = 10;
    //     return await bcrypt.hash(password, saltRounds);
    // }

    // async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    //     return await bcrypt.compare(plainPassword, hashedPassword);
    // }
    async createUser(createUserDto: CreateUserDto) {
        let user = new this.userModel({
            ...createUserDto,
            password: await hashPassword(createUserDto.password),
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return await user.save();
    }

    async findOneUser(query: FilterQuery<User>, keys: UserKeys[]) {

        let user = await this.userModel.findOne(query, keys);
        return user;
    }
}
