import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { FindOperator } from 'typeorm/find-options/FindOperator';

export class CreateAnuncioDto {
    @IsString()
  title: string;
  @IsString()
  description: string;
//   @IsString()
  direccionId: number
  @IsNumber()
  precio: number;
  uId: number | FindOperator<number>;
}
