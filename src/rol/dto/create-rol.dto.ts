import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    MinLength,
  } from 'class-validator';

export class CreateRolDto {
    @IsString()
  @IsNotEmpty()
  @MinLength(3)
  calle: string;
}
