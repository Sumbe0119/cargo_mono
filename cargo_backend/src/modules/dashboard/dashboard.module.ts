import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageItem } from '../package/entities/package.entity';
import { Warehouse } from '../warehouse/entities/warehouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageItem, Warehouse])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
