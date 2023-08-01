import { Direccion } from 'src/direccion/entities/direccion.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, ManyToOne, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  title: string;
  @Column('text')
  description: string;
  // @Column('text')
  // direccion: string
  @Column('bool', { default: false })
  estate: boolean;
  @Column()
  precio: number;
  @Column()
  important: number;
  @ManyToOne(() => User, (u) => u.task)
  user: User;
  @ManyToOne(() => Direccion, (dir) => dir.task)
  direccion: Direccion;
}
