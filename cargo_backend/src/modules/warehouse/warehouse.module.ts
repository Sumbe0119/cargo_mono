import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse]),
  OrganizationModule
],
  controllers: [WarehouseController],
  providers: [WarehouseService],
  exports: [WarehouseService]
})
export class WarehouseModule {}
