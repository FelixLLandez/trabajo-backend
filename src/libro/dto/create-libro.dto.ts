import { IsNumber, IsString } from 'class-validator';
import { FindOperator } from 'typeorm/find-options/FindOperator';

export class CreateLibroDto {
    @IsString()
    titulo: string;
    @IsString()
    sinopsis: string;
    @IsNumber()
    numPags: number;
    @IsString()
    clasificacion: string;
    static auId: number | FindOperator<number>;
}
