import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { PackageItem } from '../package/entities/package.entity';
import { Warehouse } from '../warehouse/entities/warehouse.entity';
import { CommonState } from 'src/common/enum';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(PackageItem)
    private readonly packageItemRepo: Repository<PackageItem>,

    @InjectRepository(Warehouse)
    private readonly warehouseRepo: Repository<Warehouse>,
  ) {}

  async findAllWarehouse(
    where?: FindOptionsWhere<Warehouse>,
    relations?: FindOptionsRelations<Warehouse>,
  ) {
    where = { ...where, state: CommonState.ACTIVE };
    return this.warehouseRepo.find({ where, relations });
  }

  /** Сар бүрийн борлуулалт, захиалгын тоо */
  async getMonthlySales(year: number) {
    const raw = await this.packageItemRepo
      .createQueryBuilder('package')
      .select("TO_CHAR(package.createdAt, 'YYYY-MM')", 'month')
      .addSelect('SUM(package.price)', 'totalPrice')
      .addSelect('COUNT(*)', 'count')
      .where('EXTRACT(YEAR FROM package.createdAt) = :year', { year })
      .groupBy('month')
      .orderBy('month')
      .getRawMany();

    const months = Array.from(
      { length: 12 },
      (_, i) => `${year}-${String(i + 1).padStart(2, '0')}`,
    );

    return months.map((month) => {
      const found = raw.find((r) => r.month === month);
      return {
        month,
        totalPrice: found ? Number(found.totalPrice) : 0,
        count: found ? Number(found.count) : 0,
      };
    });
  }

  /** Dashboard-т харуулах үндсэн статистик */
  async getSummary(orgId: number) {
    const warehouses = await this.findAllWarehouse({
      organizationId: orgId,
      state: CommonState.ACTIVE,
    });

    const warehouseIds = await warehouses.map((w) => w.id);

    const raw = await this.packageItemRepo
      .createQueryBuilder('package')
      .select('package.warehouseId', 'warehouseId')
      .addSelect("TO_CHAR(package.createdAt, 'YYYY-MM')", 'month')
      .addSelect('SUM(package.price)', 'totalPrice')
      .where('package.warehouseId IN (:...ids)', { ids: warehouseIds })
      .andWhere('package.state = :state', { state: CommonState.ACTIVE })
      .groupBy('package.warehouseId')
      .addGroupBy("TO_CHAR(package.createdAt, 'YYYY-MM')")
      .orderBy('package.warehouseId')
      .addOrderBy('month')
      .getRawMany();

    // Хариу форматыг агуулах тус бүрийн саруудтай бүтэц рүү хөрвүүлэх
    const result = warehouses.map((warehouse) => {
      const monthly = Array.from({ length: 12 }, (_, i) => {
        const year = new Date().getFullYear();
        const monthKey = `${year}-${String(i + 1).padStart(2, '0')}`;

        const found = raw.find(
          (r) => r.warehouseId === warehouse.id && r.month === monthKey,
        );

        return {
          month: monthKey,
          totalPrice: found ? Number(found.totalPrice) : 0,
        };
      });

      return {
        warehouseId: warehouse.id,
        warehouseName: warehouse.name,
        monthlySales: monthly,
      };
    });

    return result;
  }

  async getMonthlyPackageCountByWarehouse(orgId: number) {
    const warehouses = await this.findAllWarehouse({
      organizationId: orgId,
      state: CommonState.ACTIVE,
    });

    const warehouseIds = await warehouses.map((w) => w.id);
    const year = new Date().getFullYear();

    // Төлөв тус бүрийн тоо
    const statusRaw = await this.packageItemRepo
      .createQueryBuilder('package')
      .select('package.warehouseId', 'warehouseId')
      .addSelect("TO_CHAR(package.createdAt, 'YYYY-MM')", 'month')
      .addSelect('package.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('package.warehouseId IN (:...ids)', { ids: warehouseIds })
      .andWhere('EXTRACT(YEAR FROM package.createdAt) = :year', { year })
      .groupBy('package.warehouseId')
      .addGroupBy("TO_CHAR(package.createdAt, 'YYYY-MM')")
      .addGroupBy('package.status')
      .getRawMany();

    // Нийт тоо (төлөв хамаарахгүй)
    const totalRaw = await this.packageItemRepo
      .createQueryBuilder('package')
      .select('package.warehouseId', 'warehouseId')
      .addSelect("TO_CHAR(package.createdAt, 'YYYY-MM')", 'month')
      .addSelect('COUNT(*)', 'totalCount')
      .where('package.warehouseId IN (:...ids)', { ids: warehouseIds })
      .andWhere('EXTRACT(YEAR FROM package.createdAt) = :year', { year })
      .groupBy('package.warehouseId')
      .addGroupBy("TO_CHAR(package.createdAt, 'YYYY-MM')")
      .getRawMany();

    const result =  await warehouses.map((warehouse) => {
      const monthly = Array.from({ length: 12 }, (_, i) => {
        const monthKey = `${year}-${String(i + 1).padStart(2, '0')}`;

        const broken = statusRaw.find(
          (r) =>
            r.warehouseId === warehouse.id &&
            r.month === monthKey &&
            r.status === 'BROKEN',
        );

        const sent = statusRaw.find(
          (r) =>
            r.warehouseId === warehouse.id &&
            r.month === monthKey &&
            r.status === 'SENT',
        );

        const total = totalRaw.find(
          (r) => r.warehouseId === warehouse.id && r.month === monthKey,
        );

        return {
          month: monthKey,
          brokenCount: broken ? Number(broken.count) : 0,
          sentCount: sent ? Number(sent.count) : 0,
          totalCount: total ? Number(total.totalCount) : 0,
        };
      });

      return {
        warehouseId: warehouse.id,
        warehouseName: warehouse.name,
        monthlyCounts: monthly,
      };
    });

    return result;
  }
}
