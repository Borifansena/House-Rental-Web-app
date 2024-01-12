import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { HashService } from './hash.service';
import { AuthService } from '../auth.service';
import { JwtStrategy } from '../strategy/jwt.strategy';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, HashService, AuthService, JwtStrategy],
})
export class UserModule {}