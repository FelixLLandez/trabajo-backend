import { Module } from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { DireccionController } from './direccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [DireccionController],
  providers: [DireccionService],
  imports: [TypeOrmModule.forFeature([Direccion]), TypeOrmModule.forFeature([User])],

})
export class DireccionModule {}
