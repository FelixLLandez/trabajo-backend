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
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async search(termino: string) {
    const tasks = await this.taskRepository.find({
      where: { title: Like(`%${termino}%`) },
    });
    return tasks;
  }
  async buscar(importante: number) {
    const tasks = await this.taskRepository.find({
      where: { important: importante },
    });
    return tasks;
  }

  async create(createTaskDto: CreateTaskDto) {
    //return 'This action adds a new task';
    const user = await this.userRepository.findOne({
      where: { id: CreateTaskDto.id },
    });
    console.log(user);
    const task = this.taskRepository.create({ ...createTaskDto, user: user });
    await this.taskRepository.save(task);
    return task;
  }

  findAll() {
    //return `This action returns all task`;
    const tasks = this.taskRepository.find();
    return tasks;
  }

  findOne(id: number) {
    //return `This action returns a #${id} task`;
    const task = this.taskRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new BadRequestException('Task no encontrado');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    //return `This action updates a #${id} task`;
    await this.taskRepository.update(id, updateTaskDto);
    const task = this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new BadRequestException('No se puede actualizar');
    }
    return task;
  }

  remove(id: number) {
    this.taskRepository.delete(id);
    return `This action removes a #${id} task`;
  }
}
