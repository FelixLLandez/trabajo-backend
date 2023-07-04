import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Libro {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  titulo: string;
  @Column('text')
  sinopsis: string;
  @Column()
  numero_paginas: number;
  @Column('text')
  autor: string;
  @Column('text')
  clasificacion: string;
}
