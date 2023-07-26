import { Injectable } from '@nestjs/common';
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
    // @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createRolDto: CreateRolDto) {
    // const user = await this.rolRepository.findOne({
    //   where: { id:userid },
    //   // where: { id:CreateTaskDto.uId },
    //   //: CreateTaskDto.userId
    //  });
    // console.log("usuario creador")
    // console.log(user)
    //console.log(CreateTaskDto.id);
    const rol = this.rolRepository.create({ ...createRolDto });
    await this.rolRepository.save(rol);
    return rol;  
  }

  findAll() {
    return `This action returns all rol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rol`;
  }

  update(id: number, updateRolDto: UpdateRolDto) {
    return `This action updates a #${id} rol`;
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
