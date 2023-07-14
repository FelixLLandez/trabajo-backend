import { IsNumber, IsString } from 'class-validator';
import { FindOperator } from 'typeorm/find-options/FindOperator';

export class CreateTaskDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  direccion: string
  @IsNumber()
  precio: number;
  @IsNumber()
  important: number;
  static uId: number | FindOperator<number>;
}
