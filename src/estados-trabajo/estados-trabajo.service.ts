import { Injectable } from '@nestjs/common';
import { CreateEstadosTrabajoDto } from './dto/create-estados-trabajo.dto';
import { UpdateEstadosTrabajoDto } from './dto/update-estados-trabajo.dto';
import { EstadosTrabajo } from './entities/estados-trabajo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class EstadosTrabajoService {

  constructor(
    @InjectRepository(EstadosTrabajo) private estadosTrabajoRepository: Repository<EstadosTrabajo>,
  ) { }

  create(createEstadosTrabajoDto: CreateEstadosTrabajoDto) {
    return 'This action adds a new estadosTrabajo';
  }

  findAll() {
    const estadosTrabajo = this.estadosTrabajoRepository.find();
    return estadosTrabajo;
  }
  findOne(id: number) {
    return `This action returns a #${id} estadosTrabajo`;
  }

  update(id: number, updateEstadosTrabajoDto: UpdateEstadosTrabajoDto) {
    return `This action updates a #${id} estadosTrabajo`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadosTrabajo`;
  }

  async getAllEstados() {
    return await this.estadosTrabajoRepository.find();
  }
}
