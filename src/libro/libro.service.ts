import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './entities/libro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro) private libroRepository: Repository<Libro>,
  ) {}
  async create(createLibroDto: CreateLibroDto) {
    const libro = this.libroRepository.create({ ...createLibroDto });
    await this.libroRepository.save(libro);
    return libro;
    //return 'This action adds a new libro';
  }

  findAll() {
    //return `This action returns all libro`;
    const tasks = this.libroRepository.find();
    return tasks;
  }

  findOne(id: number) {
    const task = this.libroRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new BadRequestException('Task no encontrado');
    }
    return task;
  }

  clasi(clasificacion: string) {
    const task = this.libroRepository.findOne({
      where: { clasificacion },
    });
    if (!task) {
      throw new BadRequestException('clasificacion no encontrado');
    }
    return task;
  }

  async update(id: number, updateLibroDto: UpdateLibroDto) {
    await this.libroRepository.update(id, updateLibroDto);
    const task = this.libroRepository.findOne({ where: { id } });
    if (!task) {
      throw new BadRequestException('No se puede actualizar');
    }
    return task;
  }

  async remove(id: number) {
    this.libroRepository.delete(id);
    const task = await this.libroRepository.findOne({ where: { id } });
    if (!task) {
      throw new BadRequestException('No se puede eliminar el libro');
    }
    return `This action removes a #${id} libro`;
  }
}
