import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCargoAddressDto,
  UpdateCargoAddressDto,
} from './dto/createCargoAddress.dto';
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
  @Get(':id/all')
  async findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      where: { warehouse: { id: id } },
      skip,
      take: limit,
    });

    return {
      total,
      page,
      limit,
      data,
    };
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.repository
      .createQueryBuilder('address')
      .leftJoin('address.warehouse', 'warehouse')
      .addSelect(['warehouse.name'])
      .where('address.id = :id', { id })
      .getOne();
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateCargoAddressDto,
  ) {
    const existing = await this.repository.findOne({ where: { id } });

    if (!existing) {
      throw new Error('Cargo address not found');
    }
    const updateAddress = this.repository.create({
      id: existing.id, // ID-г хадгална
      ...input,
    });

    const data = await this.repository.save(updateAddress);

    return data;
  }
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const existing = await this.repository.findOne({ where: { id } });

    if (!existing) {
      throw new NotFoundException('Cargo address not found');
    }

    await this.repository.remove(existing);

    return { message: 'Cargo address deleted successfully' };
  }
}
