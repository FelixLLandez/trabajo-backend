import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;
  @IsString()
  apellidos: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  sexo: string;
  @IsNumber()
  edad: number;
}
