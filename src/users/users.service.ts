import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { And, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Rol } from 'src/rol/entities/rol.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Rol) private rolRepository: Repository<Rol>,
    private jwts: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { rolId, ...userData } = createUserDto;

      const rol = await this.rolRepository.findOne({
        where: { id: rolId },
      });

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(userData.password, 10),
        rol: rol,
      });

      user.fecharegistro = new Date();
      console.log(user);

      await this.userRepository.save(user);
      delete user.password;
      return { ...user };
    } catch (error) {
      return error;
    }
  }

  findAll() {
    const users = this.userRepository.find({
      relations: ['rol'],
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      relations: ['task', 'rol'],
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('User no encontrado');
    }
    return user;
  }

  /*async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('No se puede actualizar');
    }
    return user;
  }*/

  remove(id: number) {
    this.userRepository.delete(id);
    return
  }

  async login(user: loginDto) {
    const { password, email } = user;
    const userFind = await this.userRepository.findOne({
      where: { email },
      relations: ['rol'],
      select: {
        id: true,
        password: true,
        edad: true,
        email: true,
        nombre: true,
        apellidos: true,
        sexo: true,
        activo: true,
        telefono: true,
        calle: true,
        estado: true,
        municipio: true,
        fecharegistro: true,
      },
    });
    if (!userFind) {
      throw new UnauthorizedException('Credentials not found');
    }
    if (!bcrypt.compareSync(password, userFind.password)) {
      throw new UnauthorizedException('Credentials not found');
    }
    delete userFind.password;
    console.log(userFind);
    console.log(userFind.id);
    return {
      ...userFind,
      token: this.getJWToken({
        id: userFind.id,
        nombre: userFind.nombre,
        apellidos: userFind.apellidos
      }),
    };
  }

  private getJWToken(payload: {
    id: number;
    nombre: string;
    apellidos: string;
  }) {
    console.log(payload)
    const token = this.jwts.sign(payload);
    console.log(token)

    return token;
  }

  validaToken(token: any) {
    try {
      this.jwts.verify(token.token, { secret: 'secretword' });
      return true
    } catch (error) {
      throw new UnauthorizedException('Token no valido')
    }
  }

  async getActivePostulantes(): Promise<User[]> {
    const postulantes = await this.userRepository.find({
      relations: ['rol'],
      where: {
        rol: { id: 3 },
        activo: true
      },
    });
    return postulantes;
  }

  async updateProfileImage(id: number, imageName: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.fotoPerfil = imageName;
    console.log(user);

    return this.userRepository.save(user);
  }

  /*async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, ...useData } = updateUserDto;
    console.log(useData);

    await this.userRepository.update(id, {
      ...useData,
      password: bcrypt.hashSync(password, 10),
    });
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('No se puede actualizar');
    }
    return user;

  }*///funcion de sivelli

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, ...userData } = updateUserDto;
  
    // se elimina la actualización de la contraseña
    await this.userRepository.update(id, userData);
  
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('No se puede actualizar');
    }
    return user;
  }
  

}
