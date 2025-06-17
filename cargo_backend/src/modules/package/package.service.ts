import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  CreatePackageItemDto,
  PackageItemFilterDto,
} from './dto/createPackage.dto';
import { UpdatePackageItemDto } from './dto/updatePackage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageItem } from './entities/package.entity';
import { Repository } from 'typeorm';
import { OrgMemberService } from '../org_member/org_member.service';
import { WarehouseService } from '../warehouse/warehouse.service';
import { OrganizationService } from '../organization/organization.service';
import { OrgMemberEntity } from '../org_member/entities/org_member.entity';
import { CommonState } from 'src/common/enum';
import { Pagination } from 'src/common/commonReturnTyp.dto';

@Injectable()
export class PackageItemService {
  constructor(
    @InjectRepository(PackageItem)
    private readonly packageRepo: Repository<PackageItem>,

    @Inject(forwardRef(() => WarehouseService))
    private readonly wareHouseService: WarehouseService,
    @Inject(forwardRef(() => OrganizationService))
    private readonly orgService: OrganizationService,
  ) {}

  async create(
    input: CreatePackageItemDto,
    orgMember: OrgMemberEntity,
  ): Promise<PackageItem> {
    const existing = await this.packageRepo.findOne({
      where: { trackCode: input.trackCode, state: CommonState.ACTIVE },
    });
    if (existing) throw new BadRequestException('Track code давхардаж байна');

    // const registeredBy = await this.orgMemberService.getOrgMember({ id: input.registeredById });

    const warehouse = await this.wareHouseService.getOne({
      id: input.warehouseId,
      organizationId: input?.organizationId,
      state: CommonState.ACTIVE,
    });
    if (!warehouse) throw new BadRequestException('Агуулах олдсонгүй');

    const item = this.packageRepo.create({
      ...input,
      registeredBy: orgMember,
      warehouse,
      registeredAt: new Date(),
    });

    return await this.packageRepo.save(item);
  }

  async findAll(input: PackageItemFilterDto, pagination: Pagination) {
    const queryBuilder = this.packageRepo
      .createQueryBuilder('main')
      .orderBy('main.createdAt', 'DESC');

    if (input.phone) {
      queryBuilder.where('main.phone = :phone', { phone: input.phone });
    }
    if (input.trackCode) {
      queryBuilder.where('main.trackCode = :trackCode', {
        trackCode: input.trackCode,
      });
    }
    if (input.status) {
      queryBuilder.where('main.status = :status', {
        status: input.status,
      });
    }

    const [list, total] = await queryBuilder
      .skip(pagination.offset)
      .take(pagination.size)
      .getManyAndCount();

    return {
      list,
      total,
    };
  }

  async checkPackage(input: PackageItemFilterDto) {
    const queryBuilder = this.packageRepo
      .createQueryBuilder('main')
      .orderBy('main.createdAt', 'DESC');

    if (input.phone) {
      queryBuilder.where('main.phone = :phone', { phone: input.phone });
    } else if (input.trackCode) {
      queryBuilder.where('main.trackCode = :trackCode', {
        trackCode: input.trackCode,
      });
    } else {
      throw new Error('phone эсвэл trackCode -ыг заавал оруулах шаардлагатай');
    }
    const list = await queryBuilder.getMany();

    return {
      list,
      total: list.length,
    };
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
