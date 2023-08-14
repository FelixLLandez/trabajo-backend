import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  nombre: string;
  @IsString()
  direccion: string;
  @IsString()
  descripcion: string;
  @IsNumber()
  precio: number;
}
