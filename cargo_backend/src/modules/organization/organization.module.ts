import { forwardRef, Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { WarehouseModule } from '../warehouse/warehouse.module';
import { Warehouse } from '../warehouse/entities/warehouse.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization, Warehouse]),
    forwardRef(() => WarehouseModule),
  ],
  providers: [OrganizationService],
  controllers: [OrganizationController],
  exports: [OrganizationService],
})
export class OrganizationModule {}
