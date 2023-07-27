import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    MinLength,
  } from 'class-validator';
export class CreateDireccionDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nombre: string;
}
