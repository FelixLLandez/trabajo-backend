import { User } from 'src/users/entities/user.entity';
import { Column, ManyToMany, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  nombre: string;
  @Column('text')
  direccion: string;
  @Column('text')
  descripcion: string;
  @Column('bool', { default: true })
  estate: boolean;
  @Column()
  precio: number;
  @Column('text')
  estado: string;

  @ManyToOne(() => User, (u) => u.task)
  user: User;

}
