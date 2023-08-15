import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LibroService } from './libro.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Controller('libro')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Get('buscar')
  buscar(@Query('clas') clasificacion: string) {
    return this.libroService.buscar(clasificacion);
  }

  @Post('createLibro')
  create(@Body() createLibroDto: CreateLibroDto, id:number) {
  // create(@Body() createLibroDto: CreateLibroDto, @Query('autor') id: number) {
    return this.libroService.create(createLibroDto, id);
  }

  @Get('allLibros')
  findAll() {
    return this.libroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.libroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLibroDto: UpdateLibroDto) {
    return this.libroService.update(+id, updateLibroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libroService.remove(+id);
  }
}
