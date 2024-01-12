

import { IsNotEmpty, IsString, IsEmail } from 'class.validator';

export class signUpDto {
  @IsNotEmpty()
  @IsString()

  readonly name: string;


  @IsNotEmpty()
  @IsEmail({}, { message: 'Please use valid email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

}
