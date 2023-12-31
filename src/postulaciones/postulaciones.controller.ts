import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostulacionesService } from './postulaciones.service';
import { CreatePostulacioneDto } from './dto/create-postulacione.dto';
import { UpdatePostulacioneDto } from './dto/update-postulacione.dto';

@Controller('postulaciones')
export class PostulacionesController {
  constructor(private readonly postulacionesService: PostulacionesService) {}

  @Post('createPostulacion')
  create(
    @Body() createPostulacioneDto: CreatePostulacioneDto,
    @Query('usuario') id: number,
  ) {
    return this.postulacionesService.create(createPostulacioneDto, id);
  }

  @Get('xuser')
  xuser(@Query('usuario') id: number) {
    return this.postulacionesService.xuser(id);
  }

  @Get('xanuncio')
  xanuncio(@Query('anuncio') id: number) {
    return this.postulacionesService.xanuncio(id);
  }

  @Get('allPostulaciones')
  findAll() {
    return this.postulacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postulacionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostulacioneDto: UpdatePostulacioneDto,
  ) {
    return this.postulacionesService.update(+id, updatePostulacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postulacionesService.remove(+id);
  }
}
