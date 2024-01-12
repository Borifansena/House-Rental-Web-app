

import { Injectable, BadRequestException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashService } from './hash.service';
import { User, UserDocument } from './user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async getUserByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async registerUser(createUserDto: CreateUserDto) {
    // Validate DTO
    const createUser = new this.userModel(createUserDto);

    // Check if user exists
    const user = await this.getUserByUsername(createUser.username);
    if (user) {
      throw new ConflictException("The user already exists");
    }

    // Hash Password
    createUser.password = await this.hashService.hashPassword(createUser.password);

    // Save user
    await createUser.save();

    // Generate JWT access token
    const payload = {
      username: createUser.username,
      sub: createUser.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}