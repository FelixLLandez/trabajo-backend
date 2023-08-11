import { Anuncio } from 'src/anuncios/entities/anuncio.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity()
export class Realizado {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, (u) => u.realizado)
    user: User;
    @OneToOne(() => Anuncio)
    @JoinColumn()
    anuncio: Anuncio;
}
