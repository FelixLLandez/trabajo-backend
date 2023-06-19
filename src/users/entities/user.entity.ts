import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  nombre: string;
  @Column('text')
  apellidos: string;
  @Column('text')
  email: string;
  @Column('text')
  password: string;
  @Column('bool', { default: false })
  estado: boolean;
  @Column('text')
  sexo: string;
  @Column()
  edad: number;
}
