import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostulacioneDto } from './dto/create-postulacione.dto';
import { UpdatePostulacioneDto } from './dto/update-postulacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Postulacione } from './entities/postulacione.entity';

@Injectable()
export class PostulacionesService {
  constructor(
    @InjectRepository(Anuncio) private anuncioRepository: Repository<Anuncio>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Postulacione)
    private postulacionRepository: Repository<Postulacione>,
  ) {}

  async create(createPostulacioneDto: CreatePostulacioneDto, userid: number) {
    const user = await this.userRepository.findOne({
      where: { id: userid },
      // where: { id:CreateTaskDto.uId },
      //: CreateTaskDto.userId
    });
    const anuncio = await this.anuncioRepository.findOne({
      where: { id: createPostulacioneDto.anuncioId },
      // where: { id:CreateTaskDto.uId },
      //: CreateTaskDto.userId
    });
    console.log('usuario creador');
    console.log(user);
    console.log('anuncio ligado');
    console.log(anuncio);
    //console.log(CreateTaskDto.id);
    const postulacion = this.postulacionRepository.create({
      ...createPostulacioneDto,
      user: user,
      anuncio: anuncio,
    });
    await this.postulacionRepository.save(postulacion);
    return postulacion;
  }

  async xuser(uid: number) {
    const user = await this.userRepository.findOne({
      where: { id: uid },
      //: CreateTaskDto.userId
    });

    const postulaciones = await this.postulacionRepository.find({
      where: { user: user },
    });
    return postulaciones;
  }

  async xanuncio(uid: number) {
    const anuncio = await this.anuncioRepository.find({
      where: { id: uid },
      //: CreateTaskDto.userId
    });

    const postulaciones = await this.postulacionRepository.find({
      where: { anuncio: anuncio },
    });
    return postulaciones;
  }

  findAll() {
const postulaciones = this.postulacionRepository.find({
      relations: ['user', 'anuncio'],
    });
    return postulaciones;
    }

  findOne(id: number) {
    const postulacion = this.postulacionRepository.findOne({
      relations: ['user', 'anuncio'],
      where: { id },
    });
    if (!postulacion) {
      throw new BadRequestException('Postulación no encontrada');
    }
    return postulacion;  }

  update(id: number, updatePostulacioneDto: UpdatePostulacioneDto) {
    return `This action updates a #${id} postulacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} postulacione`;
  }
}
