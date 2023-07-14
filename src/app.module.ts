import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/entities/task.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { LibroModule } from './libro/libro.module';
import { AutorModule } from './autor/autor.module';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forFeature([Task, User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      //password: '',
      database: 'trabajitos',
      autoLoadEntities: true,
      synchronize: true,
      // port: 5432,
      // username: 'postgres',
      // password: 'Melh180899',
    }),
    UsersModule,
    LibroModule,
    AutorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
