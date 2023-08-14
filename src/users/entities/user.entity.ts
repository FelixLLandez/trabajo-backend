import { Direccion } from 'src/direccion/entities/direccion.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
@Entity()

export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  nombre: string;
  @Column('text')
  apellidos: string;
  @Column('text')
  email: string;
  @Column('text', { select: false })
  password: string;
  @Column('text')
  sexo: string;
  @Column('text')
  telefono: string;
  @Column('int', { nullable: true })
  edad: number;
  @Column()
  calle: string;
  @Column()
  estado: string;
  @Column()
  municipio: string;
  @Column('bool', { default: true })
  activo: boolean;

  @ManyToOne(() => Rol, (rol) => rol.user, { nullable: false })
  rol: Rol
  @OneToMany(() => Task, (t) => t.user)
  task: Task[];
  @OneToMany(() => Direccion, (direccion) => direccion.user)
  direccion: Direccion[];

}
