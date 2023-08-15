import { Direccion } from 'src/direccion/entities/direccion.entity';
import { Postulacione } from 'src/postulaciones/entities/postulacione.entity';
import { Realizado } from 'src/realizados/entities/realizado.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity()
export class Anuncio {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  title: string;
  @Column('text')
  description: string;
  // @Column('text')
  // direccion: string
  @Column('bool', { default: true })
  status: boolean;
  @Column('bool', { default: false })
  realizado: boolean;
  @Column()
  precio: number;
  @ManyToOne(() => User, (u) => u.anuncio)
  user: User;
  @ManyToOne(() => Direccion, (dir) => dir.anuncio)
  direccion: Direccion;
  @OneToMany(() => Postulacione, (postulacion) => postulacion.anuncio)
  postulacion: Postulacione;
  // @OneToOne(() => Realizado, (rea) => rea.anuncio, {nullable:true})
  // realizado: Realizado;
}
