import { Module } from '@nestjs/common';
import { PostulacionesService } from './postulaciones.service';
import { PostulacionesController } from './postulaciones.controller';

@Module({
  controllers: [PostulacionesController],
  providers: [PostulacionesService]
})
export class PostulacionesModule {}
