import { Injectable } from '@nestjs/common';
import { CreateRealizadoDto } from './dto/create-realizado.dto';
import { UpdateRealizadoDto } from './dto/update-realizado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Realizado } from './entities/realizado.entity';

@Injectable()
export class RealizadosService {
  constructor(
    @InjectRepository(Anuncio) private anuncioRepository: Repository<Anuncio>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Realizado) private realizadoRepository: Repository<Realizado>,
  ){}
  async create(createRealizadoDto: CreateRealizadoDto, anuncioId:number, userid:number) {
    const user = await this.userRepository.findOne({
      where: { id:userid },
      // where: { id:CreateTaskDto.uId },
      //: CreateTaskDto.userId
    });
    const anuncio = await this.anuncioRepository.findOne({
      where: { id:anuncioId },
      // where: { id:CreateTaskDto.uId },
      //: CreateTaskDto.userId
    });
    console.log("usuario trabajador")
    console.log(user)
    console.log("anuncio realizado")
    console.log(anuncio)
    //console.log(CreateTaskDto.id);
    const realizado = this.realizadoRepository.create({ ...createRealizadoDto, user: user, anuncio:anuncio });
    await this.realizadoRepository.save(realizado);
    return anuncio;  }  


    async xuser(uid:number) {
      const user = await this.userRepository.findOne({
        where: { id:uid},
        //: CreateTaskDto.userId
      });
  
      const realizados = await this.realizadoRepository.find({
        where: { user: user },
      });
      return realizados;
    }
  
  findAll() {
    return `This action returns all realizados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} realizado`;
  }

  update(id: number, updateRealizadoDto: UpdateRealizadoDto) {
    return `This action updates a #${id} realizado`;
  }

  remove(id: number) {
    return `This action removes a #${id} realizado`;
  }
}
