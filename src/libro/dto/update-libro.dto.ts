import { PartialType } from '@nestjs/mapped-types';
import { CreateLibroDto } from './create-libro.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateLibroDto extends PartialType(CreateLibroDto) {
  @IsString()
  titulo: string;
  @IsString()
  sinopsis: string;
  @IsNumber()
  numero_paginas: number;
  @IsString()
  autor: string;
  @IsString()
  clasificacion: string;
}
