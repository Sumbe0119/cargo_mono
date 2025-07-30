import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrgMemberService } from './org_member.service';
import { CreateOrgMemberDto } from './dto/create-org_member.dto';
import { UpdateOrgMemberDto } from './dto/update-org_member.dto';
import { Pagination } from 'src/common/pagination.dto';
import { AdminGuard } from '../auth/guard/admin.guard';

@Controller('orgMember')
export class OrgMemberController {
  constructor(private readonly serivce: OrgMemberService) {}

  @Post()
  @UseGuards(AdminGuard)
  public async create(@Body() createOrgMemberDto: CreateOrgMemberDto) {
    const data = await this.serivce.addMember(createOrgMemberDto);
    return data;
  }

  @Get('/list/:orgId')
  public async getOrgMemberList(
    @Param('orgId', ParseIntPipe) orgId: number,
    @Query() pagination: Pagination,
  ) {
    const data = await this.serivce.findAll(orgId, pagination);
    return data;
  }
  @Put(':id')
  @UseGuards(AdminGuard)
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateOrgMemberDto,
  ) {
    const data = await this.serivce.update(+id, input);
    return data;
  }
  @Delete(':id')
  @UseGuards(AdminGuard)
  public async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.serivce.remove(id);
    return data;
  }
}
