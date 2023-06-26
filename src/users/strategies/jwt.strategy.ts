/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrkey: 'sword',
        });
    }
    async validate(payload: {
        id: number;
        nombre: string;
        apellidos: string;
    }): Promise<User> {
        const { id } = payload;
        const user = await this.userRepo.findOneBy({ id });
        if (!user) {
            throw new UnauthorizedException('Token No Valido');
        }
        if (!user.estado) {
            throw new UnauthorizedException('No activo');
        }
        return user;
    }
}
