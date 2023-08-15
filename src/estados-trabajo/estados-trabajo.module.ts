import { Module } from '@nestjs/common';
import { EstadosTrabajoService } from './estados-trabajo.service';
import { EstadosTrabajoController } from './estados-trabajo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadosTrabajo } from './entities/estados-trabajo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadosTrabajo])], 
  controllers: [EstadosTrabajoController],
  providers: [EstadosTrabajoService],
})
export class EstadosTrabajoModule {}
