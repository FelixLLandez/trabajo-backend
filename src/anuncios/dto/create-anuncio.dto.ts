import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { FindOperator } from 'typeorm/find-options/FindOperator';

export class CreateAnuncioDto {
    @IsString()
  title: string;
  @IsString()
  description: string;
//   @IsString()
  static direccionId: number
  @IsNumber()
  precio: number;
  static uId: number | FindOperator<number>;
}
