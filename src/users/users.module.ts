import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Rol } from 'src/rol/entities/rol.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [PassportModule, JwtModule],
  imports: [
    TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Rol]),TypeOrmModule.forFeature([Direccion]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretword',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class UsersModule {}
