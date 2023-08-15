import { Test, TestingModule } from '@nestjs/testing';
import { RealizadosController } from './realizados.controller';
import { RealizadosService } from './realizados.service';

describe('RealizadosController', () => {
  let controller: RealizadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealizadosController],
      providers: [RealizadosService],
    }).compile();

    controller = module.get<RealizadosController>(RealizadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
