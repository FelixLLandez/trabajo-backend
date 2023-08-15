import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';
import { Repository } from 'typeorm/repository/Repository';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DireccionService {

  constructor( 
    @InjectRepository(Direccion) private direccionRepository: Repository<Direccion>,
  @InjectRepository(User) private userRepository: Repository<User>
  ){}

  async create(createDireccionDto: CreateDireccionDto, userid:number) {
    const user = await this.userRepository.findOne({
      relations: ['user'],
      where: { id:createDireccionDto.userId },
      // where: { id:CreateTaskDto.uId },
      //: CreateTaskDto.userId
    });
    console.log("usuario creador")
    console.log(user)
    //console.log(CreateTaskDto.id);
    const direccion = this.direccionRepository.create({ ...createDireccionDto, user: user });
    await this.direccionRepository.save(direccion);
    return direccion;
    // return 'This action adds a new direccion';
  }

  async xuser(uid:number) {
    const user = await this.userRepository.findOne({
      where: { id:uid},
      //: CreateTaskDto.userId
    });

    const direcciones = await this.direccionRepository.find({
      where: { user: user },
    });
    return direcciones;
  }


  findAll() {
    const direcciones = this.direccionRepository.find({
      relations: ['user'],
    });
    return direcciones;
    // return `This action returns all direccion`;
  }

  findOne(id: number) {
    const direccion = this.direccionRepository.findOne({
      where: { id },
    });
    if (!direccion) {
      throw new BadRequestException('direccion no encontrado');
    }
    return direccion;  
  }

  async update(id: number, updateDireccionDto: UpdateDireccionDto) {
    await this.direccionRepository.update(id, updateDireccionDto);
    const direccion = this.direccionRepository.findOne({ where: { id } });
    if (!direccion) {
      throw new BadRequestException('No se puede actualizar');
    }
    return direccion;  
  }

  remove(id: number) {
    return  this.direccionRepository.delete(id);
  }  
}

 
