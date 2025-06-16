import { Module } from '@nestjs/common';
import { PackageItemService } from './package.service';
import { PackageItemController } from './package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from '../warehouse/entities/warehouse.entity';
import { OrgMemberEntity } from '../org_member/entities/org_member.entity';
import { Organization } from '../organization/entities/organization.entity';
import { PackageItem } from './entities/package.entity';
import { OrganizationModule } from '../organization/organization.module';
import { WarehouseModule } from '../warehouse/warehouse.module';
import { OrgMemberModule } from '../org_member/org_member.module';

@Module({
    imports: [TypeOrmModule.forFeature([PackageItem,Warehouse, OrgMemberEntity, Organization]),
    OrganizationModule,
    WarehouseModule,
    OrgMemberModule,
    
  ],
  controllers: [PackageItemController],
  providers: [PackageItemService],
})
export class PackageItemModule {}
