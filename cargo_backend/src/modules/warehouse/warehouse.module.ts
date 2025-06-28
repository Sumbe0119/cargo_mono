import { forwardRef, Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { OrganizationModule } from '../organization/organization.module';
import { CargoAddressEntity } from '../cargoAddress/entities/cargoAddress.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Warehouse, CargoAddressEntity]),
    forwardRef(() => OrganizationModule),
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService],
  exports: [WarehouseService],
})
export class WarehouseModule {}
