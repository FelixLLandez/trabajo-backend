import { Module } from '@nestjs/common';
import { RealizadosService } from './realizados.service';
import { RealizadosController } from './realizados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';
import { User } from 'src/users/entities/user.entity';
import { Realizado } from './entities/realizado.entity';

@Module({
  controllers: [RealizadosController],
  providers: [RealizadosService],
  imports: [TypeOrmModule.forFeature([Anuncio]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Realizado])],
})
export class RealizadosModule {}
