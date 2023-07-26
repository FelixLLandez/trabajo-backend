import { User } from "src/users/entities/user.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany } from "typeorm"

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @OneToMany(() => User, (user) => user.rol)
    user: User[]
}
