import { Test, TestingModule } from '@nestjs/testing';
import { RealizadosService } from './realizados.service';

describe('RealizadosService', () => {
  let service: RealizadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealizadosService],
    }).compile();

    service = module.get<RealizadosService>(RealizadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
