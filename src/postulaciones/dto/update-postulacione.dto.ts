import { PartialType } from '@nestjs/mapped-types';
import { CreatePostulacioneDto } from './create-postulacione.dto';

export class UpdatePostulacioneDto extends PartialType(CreatePostulacioneDto) {}
