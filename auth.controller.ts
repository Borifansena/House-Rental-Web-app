import { AuthService } from './auth.service';
import { Controller, Request, UseGuards, Post, Body, Get } from '@nestjs/common';
import { signUpDto } from './dto/singUp.dto';
import { loginDto } from './dto/login.dto';
  
// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}
//   @UseGuards(AuthGuard('local'))
//   @Post('signin')
//   async login(@Request() req) {
//     return this.authService.login(req.user);
//     }
// }


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Post('/signUp')
    signUp(@Body() signUpDto: signUpDto) Promise<{token: String}> {
        return this.authService.singUp(signUpDto)
    }


    @Get('/login')
    login(@Body() loginDto: LoginDto) Promise<{token: String}> {
        return this.authService.login(loginDtoDto)
    }
}
