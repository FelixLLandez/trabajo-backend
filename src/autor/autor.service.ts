import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from './entities/autor.entity';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AutorService {

  constructor(
    @InjectRepository(Autor) private autorRepository: Repository<Autor>
  ) {}

  async create(createAutorDto: CreateAutorDto) {
    try {
      const { ...useData } = createAutorDto;
      const autor = this.autorRepository.create({
        ...useData
      });
      await this.autorRepository.save(autor);
      return { ...autor };
    } catch (error) {
      return error;
    }
  }

  findAll() {
    const autores = this.autorRepository.find();
    return autores;
  }

  async findOne(id: number) {
    const autor = await this.autorRepository.findOne({
      relations: ['libro'],
      where: { id },
    });
    if (!autor) {
      throw new BadRequestException('Autor no encontrado');
    }
    return autor;
  }

  async update(id: number, updateAutorDto: UpdateAutorDto) {
    await this.autorRepository.update(id, updateAutorDto);
    const autor = this.autorRepository.findOne({ where: { id } });
    if (!autor) {
      throw new BadRequestException('No se puede actualizar');
    }
    return autor;
  }

  remove(id: number) {
   
    return  this.autorRepository.delete(id);
  }
}
