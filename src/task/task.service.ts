import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Like } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { EstadosTrabajo } from 'src/estados-trabajo/entities/estados-trabajo.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private trabajosRepository: Repository<Task>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(EstadosTrabajo) private estadosTrabajoRepository: Repository<EstadosTrabajo>,
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
    const estadoDisponible = await this.estadosTrabajoRepository.findOne({ where: { nombre: 'Disponible' } });
    const task = this.trabajosRepository.create({ ...createTaskDto, user, estadoTrabajo: estadoDisponible });
    user.fecharegistro = new Date();
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

  async findOne(id: number) {
    const task = await this.trabajosRepository.findOne({
      where: { id },
      relations: ['estadoTrabajo'], // Cargar la relación estadoTrabajo
      select: ['id', 'nombre', 'direccion', 'descripcion', 'estate', 'precio', 'fechaTrabajoRegistro', 'userId'], 
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
    const estadoDesactivado = await this.estadosTrabajoRepository.findOne({ where: { nombre: 'Desactivado' } });
    task.estadoTrabajo = estadoDesactivado;
    await this.trabajosRepository.save(task);
    return true;
  }

  async activar_trabajo(id: number): Promise<boolean> {
    const task = await this.trabajosRepository.findOne({ where: { id } });
    if (!task) {
      return false;
    }

    task.estate = true;
    const estadoDisponible = await this.estadosTrabajoRepository.findOne({ where: { nombre: 'Disponible' } });
    task.estadoTrabajo = estadoDisponible;

    await this.trabajosRepository.save(task);
    return true;
  }

}
