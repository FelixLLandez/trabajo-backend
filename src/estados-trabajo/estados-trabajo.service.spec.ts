import { Test, TestingModule } from '@nestjs/testing';
import { EstadosTrabajoService } from './estados-trabajo.service';

describe('EstadosTrabajoService', () => {
  let service: EstadosTrabajoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadosTrabajoService],
    }).compile();

    service = module.get<EstadosTrabajoService>(EstadosTrabajoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
