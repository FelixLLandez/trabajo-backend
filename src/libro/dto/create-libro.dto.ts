import { IsNumber, IsString } from 'class-validator';

export class CreateLibroDto {
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
