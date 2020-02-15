import { Module } from '@nestjs/common';
import { PosModule } from './pos/pos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), PosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
