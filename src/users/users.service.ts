import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwts: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    //return 'This action adds a new user';
    try {
      const { password, ...useData } = createUserDto;
      const user = this.userRepository.create({
        ...useData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      return { ...user };
    } catch (error) {
      return error;
    }
    //const user = this.userRepository.create(createUserDto);
    //await this.userRepository.save(user);
    //return user;
  }

  findAll() {
    //return `This action returns all users`;
    const users = this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    //return `This action returns a #${id} user`;
    const user = await this.userRepository.findOne({
      relations: ['task'],
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('User no encontrado');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    //return `This action updates a #${id} user`;
    await this.userRepository.update(id, updateUserDto);
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('No se puede actualizar');
    }
    return user;
  }

  remove(id: number) {
    this.userRepository.delete(id);
    return `This action removes a #${id} user`;
  }

  async login(user: loginDto) {
    const { password, email } = user;
    const userFind = await this.userRepository.findOne({
      where: { email },
      select: {
        password: true,
        edad: true,
        email: true,
        nombre: true,
        apellidos: true,
        sexo: true,
        estado: true,
      },
    });
    if (!userFind) {
      throw new UnauthorizedException('Credentials not found');
    }
    if (!bcrypt.compareSync(password, userFind.password)) {
      throw new UnauthorizedException('Credentials not found');
    }
    delete userFind.password;
    return {
      ...userFind,
      token: this.getJWToken({
        id: userFind.id,
        nombre: userFind.nombre,
        apellidos: userFind.apellidos,
      }),
    };
    //console.log(userFind);
    //return userFind;
  }
  private getJWToken(payload: {
    id: number;
    nombre: string;
    apellidos: string;
  }) {
    const token = this.jwts.sign(payload);
    return token;
  }
}
