import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol) private rolRepository: Repository<Rol>,
  ) { }
  async create(createRolDto: CreateRolDto) {
    const rol = this.rolRepository.create({ ...createRolDto });
    await this.rolRepository.save(rol);
    return rol;
  }

  findAll() {
    const roles = this.rolRepository.find();
    return roles;
    // return `This action returns all rol`;
  }

  findOne(id: number) {
    const rol = this.rolRepository.findOne({
      where: { id },
    });
    if (!rol) {
      throw new BadRequestException('rol no encontrado');
    }
    return rol;
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    await this.rolRepository.update(id, updateRolDto);
    const rol = this.rolRepository.findOne({ where: { id } });
    if (!rol) {
      throw new BadRequestException('No se puede actualizar');
    }
    return rol;
  }

  remove(id: number) {
    return this.rolRepository.delete(id);
  }
}
