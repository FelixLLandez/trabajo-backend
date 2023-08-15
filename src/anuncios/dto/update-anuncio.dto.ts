import { PartialType } from '@nestjs/mapped-types';
import { CreateAnuncioDto } from './create-anuncio.dto';
import { IsBoolean, IsNumber, IsString } from 'class-validator';


export class UpdateAnuncioDto extends PartialType(CreateAnuncioDto) {

    realizado: boolean;
}
