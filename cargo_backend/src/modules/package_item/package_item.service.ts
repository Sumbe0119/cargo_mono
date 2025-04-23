import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePackageItemDto } from './dto/create-package_item.dto';
import { UpdatePackageItemDto } from './dto/update-package_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageItem } from './entities/package_item.entity';
import { Repository } from 'typeorm';
import { OrgMemberService } from '../org_member/org_member.service';
import { WarehouseService } from '../warehouse/warehouse.service';
import { OrganizationService } from '../organization/organization.service';
import { OrgMemberEntity } from '../org_member/entities/org_member.entity';
import { CommonState } from 'src/common/enum';

@Injectable()
export class PackageItemService {

  constructor(
    @InjectRepository(PackageItem)
    private readonly packageRepo: Repository<PackageItem>,
    
    @Inject(forwardRef(() => WarehouseService)) private readonly wareHouseService: WarehouseService,
    @Inject(forwardRef(() => OrganizationService)) private readonly orgService: OrganizationService,

  ) {}

  async create(input: CreatePackageItemDto, orgMember: OrgMemberEntity):Promise<PackageItem> {
 
    
    const existing = await this.packageRepo.findOne({ where: { trackCode: input.trackCode,state: CommonState.ACTIVE } });
    if (existing) throw new BadRequestException('Track code давхардаж байна');
  
    // const registeredBy = await this.orgMemberService.getOrgMember({ id: input.registeredById });
  
    const warehouse = await this.wareHouseService.getOne({ id: input.warehouseId, organizationId: input?.organizationId, state: CommonState.ACTIVE });
    if (!warehouse) throw new BadRequestException('Агуулах олдсонгүй');
    

  const item = this.packageRepo.create({
      ...input,
      registeredBy: orgMember,
      warehouse,
      registeredAt: new Date(),
    });

    return await this.packageRepo.save(item);
  }

  findAll() {
    return `This action returns all packageItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} packageItem`;
  }

  update(id: number, updatePackageItemDto: UpdatePackageItemDto) {
    return `This action updates a #${id} packageItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} packageItem`;
  }
}
