import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  nombre: string;
  @IsString()
  apellidos: string;
  @IsString()
  password: string;
  @IsString()
  sexo: string;
  @IsString()
  telefono: string;
  @IsNumber()
  edad: number;
}
