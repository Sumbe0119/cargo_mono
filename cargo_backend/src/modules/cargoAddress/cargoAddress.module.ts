import { Module } from '@nestjs/common';
import { CargoAddressController } from './cargoAddress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargoAddressEntity } from './entities/cargoAddress.entity';
import { WarehouseModule } from '../warehouse/warehouse.module';

@Module({
  imports: [TypeOrmModule.forFeature([CargoAddressEntity]), WarehouseModule],
  controllers: [CargoAddressController],
})
export class CargoAddressModule {}
