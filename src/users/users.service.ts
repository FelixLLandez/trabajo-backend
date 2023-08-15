import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
import { log } from 'console';
import { Rol } from 'src/rol/entities/rol.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Rol) private rolRepository: Repository<Rol>,
    @InjectRepository(Direccion) private direccionRepository: Repository<Direccion>,
    private jwts: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto, id: number) {
    //return 'This action adds a new user';
    console.log(id);
    console.log(createUserDto);
    // console.log(CreateUserDto.rolId);
    
    try {
      const rol = await this.rolRepository.findOne({
        where: { id:createUserDto.rolId },
        // where: { id:CreateTaskDto.uId },
        //: CreateTaskDto.userId
      });
      console.log(rol);
      
      const { password, ...useData } = createUserDto;
      console.log(useData);
      
      const user = this.userRepository.create({
        ...useData,
        password: bcrypt.hashSync(password, 10),
        rol: rol,
      });
      console.log(user);
      
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

  async updateProfileImage(id: number, imageName: string): Promise<User> {
    const user = await this.userRepository.findOne({where:{id}});
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.fotoPerfil = imageName;
    console.log(user);
    
    return this.userRepository.save(user);
  }

  findAll() {
    //return `This action returns all users`;
    const users = this.userRepository.find({
      relations: ['anuncio', 'realizado', 'rol'],
    });
    return users;
  }

  async findOne(id: number) {
    //return `This action returns a #${id} user`;
    const user = await this.userRepository.findOne({
      relations: ['anuncio', 'realizado', 'rol'],
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
    return //`This action removes a #${id} user`;
  }

  async login(user: loginDto) {
    const { password, email } = user;
    const userFind = await this.userRepository.findOne({
      relations: ['rol'],
      where: { email },
      select: {
        id:true,
        password: true,
        edad: true,
        email: true,
        nombre: true,
        apellidos: true,
        sexo: true,
        activo: true,
        // rolId: true,
      },
    });
    console.log(userFind);
    
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
        apellidos: userFind.apellidos,
      }),
    
    };
    //return userFind;
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

  validaToken(token:any){
    try{
      // console.log(token)
      // console.log(token.token)
      this.jwts.verify(token.token, {secret:'secretword'});
      return true
    }catch(error){
      throw new UnauthorizedException('Token no valido')
    }
  }
}
