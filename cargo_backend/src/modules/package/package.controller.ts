import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  forwardRef,
  BadRequestException,
  Query,
  ParseIntPipe,
  Put,
  Logger,
} from '@nestjs/common';
import { PackageItemService } from './package.service';
import {
  CheckPackageInputDto,
  CreatePackageItemDto,
  PackageItemFilterDto,
} from './dto/createPackage.dto';
import { OrgMemberService } from '../org_member/org_member.service';
import { Pagination } from 'src/common/pagination.dto';
import {
  MultipleStatusUpdateDto,
  UpdatePackageItemDto,
} from './dto/updatePackage.dto';

@Controller('package')
export class PackageItemController {
  private readonly logger = new Logger(PackageItemController.name);

  constructor(
    private readonly packageItemService: PackageItemService,
    @Inject(forwardRef(() => OrgMemberService))
    private readonly orgMemberService: OrgMemberService,
  ) {}

  @Post()
  async create(@Body() input: CreatePackageItemDto) {
    const orgMember = await this.orgMemberService.getOrgMember(
      { userId: input?.registeredById },
      { user: true },
    );
    if (!orgMember) throw new BadRequestException('orgMember is not found');

    return this.packageItemService.create(input, orgMember);
  }

  @Post('/check')
  async checkPackage(@Body() input: CheckPackageInputDto) {
    return this.packageItemService.checkPackage(input);
  }
  @Put('/multiple-update-status')
  public async multipleStatusUpdate(@Body() body: MultipleStatusUpdateDto) {
    const { ids, status } = body;

    const updated = await this.packageItemService.multipleStatusUpdate(
      ids,
      status,
    );
    return updated;
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdatePackageItemDto,
  ) {
    const existing = await this.packageItemService.getOne({ id });
    if (!existing) {
      throw new Error('Package not found');
    }
    const data = await this.packageItemService.update(id, input);
    return data;
  }

  @Get()
  findAll(
    @Query() input: PackageItemFilterDto,
    @Query() pagination: Pagination,
  ) {
    return this.packageItemService.findAll(input, pagination);
  }

  @Get('/list/:warehouseId')
  public async findAllAdmin(
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
    @Query() input: PackageItemFilterDto,
    @Query() pagination: Pagination,
  ) {
    const data = await this.packageItemService.findAllAdmin(
      warehouseId,
      input,
      pagination,
    );
    return data;
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.packageItemService.getOne({ id });
  }
}
