import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pos } from './pos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PosValidation {
  constructor(
    @InjectRepository(Pos)
    private readonly PosRepo: Repository<Pos>,
  ) {}

  async isDocumentUnique(document) {
    const recordsWithSameDocument = await this.PosRepo.find({ document });
    if (recordsWithSameDocument.length > 0) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Já existe um pdv com o mesmo CNPJ',
        },
        409,
      );
    }
  }
}
