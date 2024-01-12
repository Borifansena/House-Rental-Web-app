import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HouseModule } from './house/house.module';
//import { HouseNoSpecService } from './house--no-spec/house--no-spec.service';
import { AuthModule } from './auth/auth.module';
import { AuthNoSpecController } from './auth--no-spec/auth--no-spec.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    HouseModule,
    AuthModule,
  ],
  controllers: [AppController, AuthNoSpecController],
  providers: [AppService, HouseNoSpecService],
})
export class AppModule {}