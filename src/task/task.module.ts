import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { EstadosTrabajo } from 'src/estados-trabajo/entities/estados-trabajo.entity';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [TypeOrmModule.forFeature([Task]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([EstadosTrabajo])],
})
export class TaskModule {}
