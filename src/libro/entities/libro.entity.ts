import { Autor } from 'src/autor/entities/autor.entity';
import { Column, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
@Entity()
export class Libro {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text')
    titulo: string;
    @Column('text')
    sinopsis: string;
    @Column('bool', { default: false })
    activo: boolean;
    @Column()
    numPags: number;
    @Column('text')
    clasificacion: string
    @ManyToOne(() => Autor, (a) => a.libro)
    autor: Autor;
}
