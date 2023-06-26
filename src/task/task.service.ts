import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Like } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    //return 'This action adds a new task';
    const task = this.taskRepository.create(createTaskDto);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  async search(termino: string) {
    const tasks = await this.taskRepository.find({
      where: { title: Like(`%${termino}%`) },
    });
    return tasks;
  }
}
