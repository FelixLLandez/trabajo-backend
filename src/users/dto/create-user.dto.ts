import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nombre: string;
  @IsString()
  apellidos: string;
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  sexo: string;
  @IsString()
  telefono: string;
  @IsString()
  calle: string;
  @IsString()
  estado: string;
  @IsString()
  municipio: string;
  @IsNumber()
  edad: number;
  rolId: number;
}
