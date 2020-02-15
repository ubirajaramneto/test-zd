import { Test, TestingModule } from '@nestjs/testing';
import { PosController } from './pos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pos } from './pos.entity';
import { PosService } from './pos.service';
import { PosValidation } from './pos.validation';

describe('Pos Controller', () => {
  let controller: PosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Pos])],
      controllers: [PosController],
      providers: [PosService, PosValidation],
    }).compile();

    controller = module.get<PosController>(PosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
