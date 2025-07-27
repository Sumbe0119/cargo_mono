import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get(':orgId/summary')
  async getSummary(@Param('orgId', ParseIntPipe) orgId: number) {
    const data = await this.dashboardService.getSummary(orgId);
    return data;
  }
  @Get(':orgId/packages/monthly-count')
  async getMonthlyPackageCountByWarehouse(
    @Param('orgId', ParseIntPipe) orgId: number,
  ) {
    const data =
      await this.dashboardService.getMonthlyPackageCountByWarehouse(orgId);
    return data;
  }
}
