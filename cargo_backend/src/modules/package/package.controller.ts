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
} from '@nestjs/common';
import { PackageItemService } from './package.service';
import {
  CheckPackageInputDto,
  CreatePackageItemDto,
  PackageItemFilterDto,
} from './dto/createPackage.dto';
import { UpdatePackageItemDto } from './dto/updatePackage.dto';
import { OrgMemberService } from '../org_member/org_member.service';
import { Pagination } from 'src/common/commonReturnTyp.dto';

@Controller('package')
export class PackageItemController {
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
  async checkPackage(
    @Body() input: CheckPackageInputDto,
  ) {
    return this.packageItemService.checkPackage(input);
  }

  @Get()
  findAll(
    @Query() input: PackageItemFilterDto,
    @Query() pagination: Pagination,
  ) {
    return this.packageItemService.findAll(input, pagination);
  }
}
