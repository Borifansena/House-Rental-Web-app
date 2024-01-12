import { user } from 'src/auth/schemas/user.schema';
import { category } from '../schemas/house.schema';
import { IsNotEmpty, IsString } from 'class.validator';
import { isEmpty } from 'rxjs';

export class CreateHouseDto {
  @IsNotEmpty()
  @IsString()

  readonly title: string;


  @IsOPtional()
  @IsString()
  readonly description: string;
  @isEmpty(message: 'use can not pass user Id')
  readonly user: user;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
  
  readonly standard: string;
  @IsNotEmpty()
  @IsNumber()
  readonly rooms: number;
 
  readonly location: string;
  
  readonly category: category;
    
}

function IsNotEmpty(): (target: CreateHouseDto, propertyKey: "description") => void {
  throw new Error('Function not implemented.');
}
