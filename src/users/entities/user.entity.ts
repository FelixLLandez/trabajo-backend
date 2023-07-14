import { Direccion } from 'src/direccion/entities/direccion.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
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
  @OneToOne(() => Rol, (rol) => rol.user) 
  @JoinColumn()
    rol: Rol
  @OneToMany(() => Task, (t) => t.user)
  task: Task[];
  @OneToMany(() => Direccion, (direccion) => direccion.user)
  direccion: Direccion[];
}
