import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true
  })
  password: string;

  @Prop({ enum: ['admin', 'user'] })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);