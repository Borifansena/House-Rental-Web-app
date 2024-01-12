import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './users.service';
import { Role } from './role.enum';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @Role
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
}