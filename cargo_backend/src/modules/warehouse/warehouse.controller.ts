import { Controller, Get, Post, Body,  Param, Delete, Put, Query } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto, UpdateWarehouseDto, WareHouseFilterDto } from './dto/create-warehouse.dto';
import { Pagination } from 'src/common/commonReturnTyp.dto';


@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.create(createWarehouseDto);
  }

  @Get()
  findAll(@Query() input: WareHouseFilterDto, @Query() pagination: Pagination) {
    return this.warehouseService.findAll(input,pagination);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehouseService.update(+id, updateWarehouseDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehouseService.remove(+id);
  }
}
