import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Like } from 'typeorm';
import { Libro } from './entities/libro.entity';
import { Autor } from 'src/autor/entities/autor.entity';


@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro) private libroRepository: Repository<Libro>,
    @InjectRepository(Autor) private autorRepository: Repository<Autor>,
  ) {}

  async buscar(clas: string) {
    const libros = await this.libroRepository.find({
      where: { clasificacion: Like(`%${clas}%`) },
    });
    return libros;
  }

  async create(createLibroDto: CreateLibroDto, autorid: number) {
    const autor = await this.autorRepository.findOne({
      where: { id:autorid },
      // where: { id:CreateTaskDto.uId },
      //: CreateTaskDto.userId
    });
    // console.log("usuario creador")
    // console.log(autor)
    //console.log(CreateTaskDto.id);
    const libro = this.libroRepository.create({ ...createLibroDto, autor: autor });
    await this.libroRepository.save(libro);
    return libro;
  }

  findAll() {
    const libros = this.libroRepository.find();
    return libros;
    }

  findOne(id: number) {
    const libro = this.libroRepository.findOne({
      where: { id },
    });
    if (!libro) {
      throw new BadRequestException('Libro no encontrado');
    }
    return libro;
  }

  async update(id: number, updateLibroDto: UpdateLibroDto) {
    await this.libroRepository.update(id, updateLibroDto);
    const libro = this.libroRepository.findOne({ where: { id } });
    if (!libro) {
      throw new BadRequestException('No se puede actualizar');
    }
    return libro;  }

  remove(id: number) {
    return  this.libroRepository.delete(id);
  }
}
