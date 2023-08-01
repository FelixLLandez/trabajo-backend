import { Module } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { AnunciosController } from './anuncios.controller';
import { Anuncio } from './entities/anuncio.entity';
import { User } from 'src/users/entities/user.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AnunciosController],
  providers: [AnunciosService],
  imports: [TypeOrmModule.forFeature([Anuncio]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Direccion])],

})
export class AnunciosModule {}
