import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Like } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private trabajosRepository: Repository<Task>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }
  async search(termino: string) {
    const tasks = await this.trabajosRepository.find({
      where: { nombre: Like(`%${termino}%`) },
    });
    return tasks;
  }
  async buscar(precio: number) {
    const tasks = await this.trabajosRepository.find({
      where: { precio: precio },
    });
    return tasks;
  }

  async xuser(uid: number) {
    const user = await this.userRepository.findOne({
      where: { id: uid },
    });

    const tasks = await this.trabajosRepository.find({
      where: { user: user },
    });
    return tasks;
  }

  async create(createTaskDto: CreateTaskDto, userid: number) {
    const user = await this.userRepository.findOne({
      where: { id: userid },
    });
    const task = this.trabajosRepository.create({ ...createTaskDto, user: user });
    await this.trabajosRepository.save(task);
    return task;
  }

  findAll() {
    const tasks = this.trabajosRepository.find();
    return tasks;
  }
  findAllByUser(id: number) {
    const tasks = this.trabajosRepository.find({
    });
    return tasks;
  }

  findOne(id: number) {
    const task = this.trabajosRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new BadRequestException('Task no encontrado');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.trabajosRepository.update(id, updateTaskDto);
    const task = this.trabajosRepository.findOne({ where: { id } });
    if (!task) {
      throw new BadRequestException('No se puede actualizar');
    }
    return task;
  }

  async desactivar_trabajo(id: number): Promise<boolean> {
    const task = await this.trabajosRepository.findOne({ where: { id } });
    if (!task) {
      return false;
    }

    task.estate = false;
    await this.trabajosRepository.save(task);
    return true;
  }

  async activar_trabajo(id: number): Promise<boolean> {
    const task = await this.trabajosRepository.findOne({ where: { id } });
    if (!task) {
      return false;
    }

    task.estate = true;
    await this.trabajosRepository.save(task);
    return true;
  }

}
