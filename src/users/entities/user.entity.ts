import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()

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
  @OneToMany(() => Task, (t) => t.user)
  task: Task[];
}
