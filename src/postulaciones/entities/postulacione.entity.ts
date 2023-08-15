import { Anuncio } from 'src/anuncios/entities/anuncio.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { Realizado } from 'src/realizados/entities/realizado.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity()
export class Postulacione {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text')
    title: string;
    @Column('text')
    description: string;
    @Column('bool', { default: true })
    status: boolean;
    @ManyToOne(() => User, (u) => u.postulacion)
    user: User;
    @ManyToOne(() => Anuncio, (dir) => dir.postulacion)
    anuncio: Anuncio;
    // @OneToOne(() => Realizado, (rea) => rea.anuncio, {nullable:true})
    // realizado: Realizado;

}
