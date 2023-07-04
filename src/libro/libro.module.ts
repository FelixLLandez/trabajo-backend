import { Module } from '@nestjs/common';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';

@Module({
  controllers: [LibroController],
  providers: [LibroService],
  imports: [TypeOrmModule.forFeature([Libro])],
})
export class LibroModule {}
