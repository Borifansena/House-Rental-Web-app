import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { user } from './schemas/user.schema';
import { Model } from 'mongoose';


import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/singUp.dto';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    login(user: any) {
        throw new Error('Method not implemented.');
    }
    constructor(

        @InjectModel(user.name)
        private userModel: Model<user>,
        private jwtsService: JwtService
    ){}

    async signUp(singUpDto: signUpDto) promise<{token: string}>{
        const {name, email, password}=singUpDto

        const hashedPassword = await bcrypt.hash(password, 8)


        const user = await this.userModel.create({ 
            name,
            email,
            password: hashedPassword
        })


        const token= this.jwtsService.sign({id: user._id});

        return {token}


    })


    async login(loginDto: loginDto) promise<{ token: string}>{
        const(email, password) = loginDto,

        cosnt user = await this.userModel.findOne({email})


        if(!user){
            throw new UnauthorizedException('User not found with this email address')
        }

        const isPasswordMatched= await bcrypt.compare( password, user.password)

        if(!ispasswordMatched){
            throw new UnauthorizedException('pleae use correct password')
        }

        const token= this.jwtsService.sign({id: user._id}),

        return {token}



    }


}
