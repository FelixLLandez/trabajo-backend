import { Anuncio } from 'src/anuncios/entities/anuncio.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, ManyToOne, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
@Entity()
export class Direccion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  calle: string;
  @Column('text')
  estado: string;
  @Column('text')
  municipio: string;
  @Column('text')
  localidad: string;
  @Column('bool', { default: true })
  activo: boolean;
  @Column()
  numero: number;
  @ManyToOne(() => User, (user) => user.direccion, { nullable: false })
  user: User;
  @OneToMany(() => Anuncio, (anuncio) => anuncio.direccion)
  anuncio: Anuncio;
}