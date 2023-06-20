import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  nombre: string;
  @Column('text')
  apellidos: string;
  @Column('text', { unique: true }) //para no repetir los correos
  email: string;
  @Column('text', { select: false })
  password: string;
  @Column('bool', { default: true })
  estado: boolean;
  @Column('text')
  sexo: string;
  @Column('int', { nullable: true })
  edad: number;
}
