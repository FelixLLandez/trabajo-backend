import { Libro } from 'src/libro/entities/libro.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()

export class Autor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  nombre: string;
  @Column('text')
  apellidos: string;
//   @Column('text')
//   //, { unique: true }) //para no repetir los correos
//   email: string;
//   @Column('text', { select: false })
//   password: string;
  @Column('bool', { default: true })
  activo: boolean;
  @Column('text')
  sexo: string;
  @Column('int', { nullable: true })
  edad: number;
  @OneToMany(() => Libro, (l) => l.autor)
  libro: Libro[];
}
