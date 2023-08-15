import { PartialType } from '@nestjs/mapped-types';
import { CreateRealizadoDto } from './create-realizado.dto';

export class UpdateRealizadoDto extends PartialType(CreateRealizadoDto) {}
