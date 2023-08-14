import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('trabajos')
@UsePipes(new ValidationPipe())
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get('search')
  search(@Query('termino') termino: string) {
    return this.taskService.search(termino);
  }

  @Get('buscar')
  buscar(@Query('precio') precio: number) {
    return this.taskService.buscar(precio);
  }
  @Get('xuser')
  xuser(@Query('usuario') id: number) {
    return this.taskService.xuser(id);
  }

  @Post('crearTrabajo')
  create(@Body() createTaskDto: CreateTaskDto, @Query('usuario') id: number) {
    return this.taskService.create(createTaskDto, id);
  }

  @Get('allTrabajos')
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Patch('desactivar_trabajo/:id')
  async desactivarT(@Param('id') id: number) {
    const success = await this.taskService.desactivar_trabajo(id);
    if (success) {
      return { message: 'Trabajo desactivado correctamente' };
    } else {
      return { message: 'No se pudo desactivar el trabajo. Trabajo no encontrado.' };
    }
  }

  @Patch('activar_trabajo/:id')
  async activarT(@Param('id') id: number) {
    const success = await this.taskService.activar_trabajo(id);
    if (success) {
      return { message: 'Trabajo activado correctamente' };
    } else {
      return { message: 'No se pudo activar el trabajo. Trabajo no encontrado.' };
    }
  }

}
