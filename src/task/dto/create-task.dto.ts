import { IsNumber, IsString } from 'class-validator';
import { FindOperator } from 'typeorm/find-options/FindOperator';

export class CreateTaskDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  important: number;
  static id: number | FindOperator<number>;
}
