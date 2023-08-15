import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { FindOperator } from 'typeorm/find-options/FindOperator';

export class CreatePostulacioneDto {
    @IsString()
    title: string;
    @IsString()
    description: string;
  //   @IsString()
    anuncioId: number
    uId: number | FindOperator<number>;
}
