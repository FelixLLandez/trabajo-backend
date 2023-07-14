import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class CreateAutorDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nombre: string;
    @IsString()
    apellidos: string;
    // @IsEmail()
    // @IsNotEmpty()
    // @IsString()
    // email: string;
    // @IsString()
    // password: string;
    @IsString()
    sexo: string;
    @IsNumber()
    edad: number;
  }
