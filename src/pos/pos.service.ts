import { Injectable, Query } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { EntityManager } from 'typeorm';
import { Pos } from './pos.entity';
import {
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { PosValidation } from './pos.validation';
import { FindNearestDto } from "./dto/findNearest.dto";

@Injectable()
export class PosService extends TypeOrmCrudService<Pos> {
  constructor(
    @InjectRepository(Pos) repo,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private validation: PosValidation,
  ) {
    super(repo);
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Pos,
  ): Promise<Pos> {
    await this.validation.isDocumentUnique(dto.document);
    return this.entityManager.query(
      'INSERT INTO pos("tradingName", "ownerName", "document", address, "coverageArea")\n' +
        '    VALUES (\n' +
        '    $1,\n' +
        '    $2,\n' +
        '    $3,\n' +
        '    ST_GeomFromGeoJSON($4),\n' +
        '    ST_GeomFromGeoJSON($5)) ON CONFLICT DO NOTHING;',
      [
        dto.tradingName,
        dto.ownerName,
        dto.document,
        dto.address,
        dto.coverageArea,
      ],
    );
  }

  async findNearestPos(@Query() query: FindNearestDto): Promise<Pos[]> {
    return this.entityManager.query(
      'select *,\n' +
      'ST_Distance(\n' +
      'ST_SetSRID(ST_MakePoint($1, $2), 4326), "address") as distance\n' +
      'from pos \n' +
      'where ST_Within(\n' +
      'ST_SetSRID(ST_MakePoint($1, $2), 4326), "coverageArea"\n' +
      ') order by distance asc limit 1',
      [query.long, query.lat],)
  }
}
