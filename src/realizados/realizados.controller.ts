import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RealizadosService } from './realizados.service';
import { CreateRealizadoDto } from './dto/create-realizado.dto';
import { UpdateRealizadoDto } from './dto/update-realizado.dto';

@Controller('realizados')
export class RealizadosController {
  constructor(private readonly realizadosService: RealizadosService) {}

  @Post('createRealizado')
  create(@Body() createRealizadoDto: CreateRealizadoDto, anuncioId:number, @Query('usuario') id: number) {
    return this.realizadosService.create(createRealizadoDto, anuncioId, id);
  }

  // @Get('xuser')
  // xuser(@Query('usuario') id: number) {
  //   return this.realizadosService.xuser(id);
  // }

  @Get('allRealizados')
  findAll() {
    return this.realizadosService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realizadosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRealizadoDto: UpdateRealizadoDto) {
    return this.realizadosService.update(+id, updateRealizadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realizadosService.remove(+id);
  }
}
