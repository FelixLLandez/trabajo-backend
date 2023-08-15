import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Like } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { Anuncio } from './entities/anuncio.entity';

@Injectable()
export class AnunciosService {
  constructor(
    @InjectRepository(Anuncio) private anuncioRepository: Repository<Anuncio>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Direccion) private direccionRepository: Repository<Direccion>,
  ){}
  async create(createAnuncioDto: CreateAnuncioDto, direccionId:number, userid:number) {
    const user = await this.userRepository.findOne({
      where: { id:createAnuncioDto.uId },
      // where: { id:CreateTaskDto.uId },
      //: CreateTaskDto.userId
    });
    const direccion = await this.direccionRepository.findOne({
      where: { id:createAnuncioDto.direccionId },
      // where: { id:CreateTaskDto.uId },
      //: CreateTaskDto.userId
    });
    console.log("usuario creador")
    console.log(user)
    console.log("direccion creador")
    console.log(direccion)
    //console.log(CreateTaskDto.id);
    const anuncio = this.anuncioRepository.create({ ...createAnuncioDto, user: user, direccion:direccion });
    await this.anuncioRepository.save(anuncio);
    return anuncio;  }

  findAll() {
    const anuncios = this.anuncioRepository.find();
    return anuncios;  }

  findOne(id: number) {
    const anuncio = this.anuncioRepository.findOne({
      where: { id },
    });
    if (!anuncio) {
      throw new BadRequestException('Task no encontrado');
    }
    return anuncio;  }

    async xuser(uid:number) {
      const user = await this.userRepository.findOne({
        where: { id:uid},
        //: CreateTaskDto.userId
      });
  
      const anuncios = await this.anuncioRepository.find({
        where: { user: user },
      });
      return anuncios;
    }
  

  async update(id: number, updateAnuncioDto: UpdateAnuncioDto) {
    await this.anuncioRepository.update(id, updateAnuncioDto);
    const anuncio = this.anuncioRepository.findOne({ where: { id } });
    if (!anuncio) {
      throw new BadRequestException('No se puede actualizar');
    }
    return anuncio;  }

  remove(id: number) {
    this.anuncioRepository.delete(id);
    return `This action removes a #${id} anuncio`;
  }
}
