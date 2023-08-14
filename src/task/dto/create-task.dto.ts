import { IsNumber, IsString } from 'class-validator';
import { FindOperator } from 'typeorm/find-options/FindOperator';

export class CreateTaskDto {
  @IsString()
  nombre: string;
  @IsString()
  direccion: string;
  @IsString()
  descripcion: string;
  @IsNumber()
  precio: number;
  static uId: number | FindOperator<number>;
}
