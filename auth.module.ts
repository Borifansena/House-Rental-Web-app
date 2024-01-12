import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Schema } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({ 
      Inject: [ConfigService],
      useFactory: (config: ConfigService)=>{
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: config.get<string>('JWT_EXPIRATION')
        }
      }
    }),
    MongooseModule.forFeature([{ name: 'User', schema: 'userSchema' }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, jwtStrategy],
  exports: [jwtStrategy, PassportModule],
})
export class AuthModule {}
