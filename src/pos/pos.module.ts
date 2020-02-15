import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosService } from './pos.service';
import { PosController } from './pos.controller';
import { Pos } from './pos.entity';
import { PosValidation } from "./pos.validation";

@Module({
  imports: [TypeOrmModule.forFeature([Pos])],
  providers: [PosService, PosValidation],
  controllers: [PosController],
})
export class PosModule {}
