import { Test, TestingModule } from '@nestjs/testing';
import { EstadosTrabajoController } from './estados-trabajo.controller';
import { EstadosTrabajoService } from './estados-trabajo.service';

describe('EstadosTrabajoController', () => {
  let controller: EstadosTrabajoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadosTrabajoController],
      providers: [EstadosTrabajoService],
    }).compile();

    controller = module.get<EstadosTrabajoController>(EstadosTrabajoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
