
import { IsNotEmpty, IsString, IsEmail } from 'class.validator';

export class loginDto {
  
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please use valid email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

}
