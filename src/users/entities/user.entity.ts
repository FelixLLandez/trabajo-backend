import { Anuncio } from 'src/anuncios/entities/anuncio.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { Realizado } from 'src/realizados/entities/realizado.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()

export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  nombre: string;
  @Column('text')
  apellidos: string;
  @Column('text')
  //, { unique: true }) //para no repetir los correos
  email: string;
  @Column('text', { select: false })
  password: string;
  @Column('bool', { default: true })
  activo: boolean;
  @Column('text')
  sexo: string;
  @Column('text')
  telefono: string;
  @Column('int', { nullable: true })
  edad: number;
  @Column({ nullable: true }) 
  fotoPerfil: string;
  @ManyToOne(() => Rol, (rol) => rol.user, { nullable: false })
  rol: Rol
  @OneToMany(() => Task, (t) => t.user)
  task: Task[];
  @OneToMany(() => Anuncio, (t) => t.user)
  anuncio: Anuncio[];
  @OneToMany(() => Direccion, (direccion) => direccion.user)
  direccion: Direccion[];
  @OneToMany(() => Realizado, (realizado) => realizado.user)
  realizado: Realizado[];
}
