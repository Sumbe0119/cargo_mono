import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCargoAddressDto } from './dto/createCargoAddress.dto';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { CargoAddressEntity } from './entities/cargoAddress.entity';

@Controller('cargoAddress')
export class CargoAddressController {
  constructor(
    @InjectRepository(CargoAddressEntity)
    private readonly repository: Repository<CargoAddressEntity>,
  ) {}

  @Post()
  async create(@Body() createDto: CreateCargoAddressDto) {
    const entity = this.repository.create({
      ...createDto,
      warehouse: { id: createDto.warehouseId },
    });

    return await this.repository.save(entity);
  }
  // @Get('')
  // async findAll(@Param('id', ParseIntPipe) id: number) {
  //   return await this.repository.find({
  //     where: { warehouse: { id } },
  //     // relations: ['warehouse'],
  //   });
  // }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.repository.findOne({
      where: { warehouse: { id } },
      // relations: ['warehouse'],
    });
  }
}
