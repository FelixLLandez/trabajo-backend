import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadosTrabajoService } from './estados-trabajo.service';
import { CreateEstadosTrabajoDto } from './dto/create-estados-trabajo.dto';
import { UpdateEstadosTrabajoDto } from './dto/update-estados-trabajo.dto';

@Controller('estados-trabajo')
export class EstadosTrabajoController {
  constructor(private readonly estadosTrabajoService: EstadosTrabajoService) {}

  @Post()
  create(@Body() createEstadosTrabajoDto: CreateEstadosTrabajoDto) {
    return this.estadosTrabajoService.create(createEstadosTrabajoDto);
  }

  @Get('/estados')
  findAll() {
    return this.estadosTrabajoService.findAll();
  }

  @Get('allEstados') 
  async getEstadosTrabajo() {
    const estados = await this.estadosTrabajoService.getAllEstados();
    return estados;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadosTrabajoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadosTrabajoDto: UpdateEstadosTrabajoDto) {
    return this.estadosTrabajoService.update(+id, updateEstadosTrabajoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadosTrabajoService.remove(+id);
  }
}
