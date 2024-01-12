import { Prop, Schema } from "@nestjs/mongoose";
import { House } from "../house/schemas/house.schema";
import { Document } from 'mongoose';


@Schema({
  timestamps: true,
})

export class user extends Document{
  id(House: House, user: user, id: any) {
    throw new Error('Method not implemented.');
  }
    static password(password: any, password1: any): any {
        throw new Error('Method not implemented.');
    }
  @Prop
  name: string;

  @Prop
  email: string;

  @Prop
  password: string;
    static _id: any;
}


export const userSchema = SchemaFactory.createForClass(User);

