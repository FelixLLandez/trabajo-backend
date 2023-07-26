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
    calle: string;
    @IsString()
    estado: string;
    @IsString()
    municipio: string;
    @IsString()
    localidad: string;
    @IsNumber()
    numero: string;

}
