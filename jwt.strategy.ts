import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Extractjwt } from "passport-jwt";
import { user } from "./schemas/user.schema";




@Injectable()

export class jwtStrategy extends PassportStrategy(Strategy) {
    constructor( 
        @InjectModel(user.name)
        private userModel: Model<User>
    ) {
    super({
      jwtFromRequest: Extractjwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });

    }


    async validate(payload) {
        const { id} = payload;

        const user = await this.userModel.findById(id);

        if(!user) {
            throw new UnauthorizedException(`User don't foind with this id:${id} 
            and you have to login first`)
        }

        return user
}