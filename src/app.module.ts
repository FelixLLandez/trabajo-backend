import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/entities/task.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { RolModule } from './rol/rol.module';
import { Rol } from './rol/entities/rol.entity';
import { EstadosTrabajoModule } from './estados-trabajo/estados-trabajo.module';
import { EstadosTrabajo } from './estados-trabajo/entities/estados-trabajo.entity';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forFeature([Task, User, Rol, EstadosTrabajo]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'trabajitos',
      autoLoadEntities: true,
      synchronize: true,
      // port: 5432,
      // username: 'postgres',
      // password: 'Melh180899',
    }),
    UsersModule,
    RolModule,
    EstadosTrabajoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
