import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { HouseSchema } from './schemas/house.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'House', schema: HouseSchema }]),
  ],
  controllers: [HouseController],
  providers: [HouseService]
})
export class HouseModule {}
