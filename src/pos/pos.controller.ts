import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { Crud, CrudRequestInterceptor } from '@nestjsx/crud';
import { Pos } from './pos.entity';
import { PosService } from './pos.service';
import { FindNearestDto } from './dto/findNearest.dto';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';

@Crud({
  model: {
    type: Pos,
  },
})
@Controller('pos')
export class PosController {
  constructor(public service: PosService) {}

  @ApiQuery({ name: 'lat', type: 'string', description: 'Latitude' })
  @ApiQuery({ name: 'long', type: 'string', description: 'Longitude' })
  @ApiOkResponse({ description: 'Found the nearest available POS' })
  @UseInterceptors(CrudRequestInterceptor)
  @Get('/find-nearest')
  async findNearestPos(@Query() query: FindNearestDto) {
    return await this.service.findNearestPos(query);
  }
}
