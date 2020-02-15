import { Test, TestingModule } from '@nestjs/testing';
import { PosService } from './pos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pos } from './pos.entity';
import { PosValidation } from './pos.validation';

describe('PosService', () => {
  let service: PosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Pos])],
      providers: [PosService, PosValidation],
    }).compile();

    service = module.get<PosService>(PosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
