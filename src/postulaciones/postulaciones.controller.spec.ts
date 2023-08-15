import { Test, TestingModule } from '@nestjs/testing';
import { PostulacionesController } from './postulaciones.controller';
import { PostulacionesService } from './postulaciones.service';

describe('PostulacionesController', () => {
  let controller: PostulacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostulacionesController],
      providers: [PostulacionesService],
    }).compile();

    controller = module.get<PostulacionesController>(PostulacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
