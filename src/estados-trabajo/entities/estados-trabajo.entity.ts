import { Task } from 'src/task/entities/task.entity';
import { Column, CreateDateColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity()
export class EstadosTrabajo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text')
    nombre: string;
    @Column('text')
    descripcion: string;

    @OneToMany(() => Task, trabajos => trabajos.estadoTrabajo)
    trabajos: Task[];
}
