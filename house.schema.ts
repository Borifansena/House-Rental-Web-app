import { scheduled, timestamp } from "rxjs";
import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { user } from "src/auth/schemas/user.schema";
export enum category {
  ADVENTURE: 'Adventure',
  cLASSICS: 'Classics',
  CRIME: 'Crime',     
  FANTASY: 'Fantasy',


};

@scheduled({
    timestamps: true
})

export class House{
    @prop()
  title: string;

  @Prop(type: mongoose.Schema.Types.ObjectId, ref 'user')
  User: user;

    @prop()
  description: string;

  //   @prop()
  // author: string;

  category: category;
};


export const HouseSchema=SchemaFactory.createForClass(House)

function prop(): (target: House, propertyKey: "title") => void {
    throw new Error("Function not implemented.");
}
