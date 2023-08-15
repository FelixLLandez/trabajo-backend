import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadosTrabajoDto } from './create-estados-trabajo.dto';

export class UpdateEstadosTrabajoDto extends PartialType(CreateEstadosTrabajoDto) {}
