import { user } from "src/auth/schemas/user.schema";
import { category } from "../schemas/house.schema";

export class updateHouseDto {

  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @IsOptional()
  @IsString()
  readonly description: string;
  
  @isEmpty(message: 'use can not pass user Id')
  readonly user: user;
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
  
  readonly location: string;
  
  readonly category: category;
    
  }