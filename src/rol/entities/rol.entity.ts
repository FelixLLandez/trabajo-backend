import { User } from "src/users/entities/user.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @OneToOne(() => User, (user) => user.rol) // specify inverse side as a second parameter
    user: User
}
