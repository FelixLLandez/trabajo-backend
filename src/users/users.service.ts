import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
}
