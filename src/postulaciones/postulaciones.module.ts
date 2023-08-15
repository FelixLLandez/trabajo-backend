import { Module } from '@nestjs/common';
import { PostulacionesService } from './postulaciones.service';
import { PostulacionesController } from './postulaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';
import { User } from 'src/users/entities/user.entity';
import { Postulacione } from './entities/postulacione.entity';

@Module({
  controllers: [PostulacionesController],
  providers: [PostulacionesService],
  imports: [TypeOrmModule.forFeature([Anuncio]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Postulacione])],

})
export class PostulacionesModule {}
 