import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsString() 
  password: string;
}
