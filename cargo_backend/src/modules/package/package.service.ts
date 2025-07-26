import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreatePackageItemDto,
  PackageItemFilterDto,
} from './dto/createPackage.dto';
import { UpdatePackageItemDto } from './dto/updatePackage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageItem } from './entities/package.entity';
import {
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { OrgMemberService } from '../org_member/org_member.service';
import { WarehouseService } from '../warehouse/warehouse.service';
import { OrganizationService } from '../organization/organization.service';
import { OrgMemberEntity } from '../org_member/entities/org_member.entity';
import { CommonState, ItemStatus } from 'src/common/enum';
import { Pagination } from 'src/common/pagination.dto';

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

  async getOne(
    where?: FindOptionsWhere<PackageItem>,
    relations?: FindOptionsRelations<PackageItem>,
  ) {
    where = {
      ...where,
      state: CommonState.ACTIVE,
    };

    return this.packageRepo.findOne({ where, relations });
  }

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
  async findAllAdmin(
    warehouseId: number,
    input: PackageItemFilterDto,
    pagination: Pagination,
  ) {
    const queryBuilder = this.packageRepo
      .createQueryBuilder('main')
      .where('main.warehouseId = :warehouseId', { warehouseId })
      .orderBy('main.createdAt', 'DESC');
    if (input.phone) {
      queryBuilder.andWhere('main.phone LIKE :phone', {
        phone: `%${input.phone}%`,
      });
    }

    if (input.trackCode) {
      queryBuilder.andWhere('main.trackCode LIKE :trackCode', {
        trackCode: `%${input.trackCode}%`,
      });
    }

    if (input.status) {
      queryBuilder.andWhere('main.status = :status', {
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

  public async update(id: number, input: UpdatePackageItemDto) {
    const result = await this.packageRepo.update(id, {
      ...input,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Package not updated');
    }
    const updated = await this.packageRepo.findOne({
      where: { id },
    });

    return updated;
  }
  public async multipleStatusUpdate(
    ids: number[],
    status: ItemStatus,
  ): Promise<PackageItem[]> {
    await this.packageRepo.update(ids, { status });

    // Шинэчилсэн бараануудыг буцаах
    const update = await this.packageRepo.findBy({ id: In(ids) });
    return update;
  }

  remove(id: number) {
    return `This action removes a #${id} packageItem`;
  }
}
