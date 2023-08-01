import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Like } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Direccion) private direccionRepository: Repository<Direccion>,
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
  async xuser(uid:number) {
    const user = await this.userRepository.findOne({
      where: { id:uid},
      //: CreateTaskDto.userId
    });

    const tasks = await this.taskRepository.find({
      where: { user: user },
    });
    return tasks;
  }

  async create(createTaskDto: CreateTaskDto, direccionId:number, userid:number) {
    //return 'This action adds a new task';
    const user = await this.userRepository.findOne({
      where: { id:userid },
      // where: { id:CreateTaskDto.uId },
      //: CreateTaskDto.userId
    });
    const direccion = await this.direccionRepository.findOne({
      where: { id:direccionId },
      // where: { id:CreateTaskDto.uId },
      //: CreateTaskDto.userId
    });
    console.log("usuario creador")
    console.log(user)
    console.log("direccion creador")
    console.log(direccion)
    //console.log(CreateTaskDto.id);
    const task = this.taskRepository.create({ ...createTaskDto, user: user, direccion:direccion });
    await this.taskRepository.save(task);
    return task;
  }

  findAll() {
    //return `This action returns all task`;
    const tasks = this.taskRepository.find();
    return tasks;
  }
  findAllByUser(id:number) {
    //return `This action returns all task`;
    const tasks = this.taskRepository.find({
     // where:{user:id}
    });
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
}
