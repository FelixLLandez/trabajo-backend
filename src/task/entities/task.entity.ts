import { EstadosTrabajo } from 'src/estados-trabajo/entities/estados-trabajo.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, ManyToMany, ManyToOne } from 'typeorm';
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
  @CreateDateColumn()
  fechaTrabajoRegistro: Date;
  @Column({ nullable: true }) 
  estadoTrabajoId: number;
  @Column({ nullable: true }) 
  userId: number;

  @ManyToOne(() => User, (u) => u.task)
  user: User;

  @ManyToOne(() => EstadosTrabajo, estadoTrabajo => estadoTrabajo.trabajos)
  estadoTrabajo: EstadosTrabajo; 

}
