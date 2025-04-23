import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, forwardRef, BadRequestException } from '@nestjs/common';
import { PackageItemService } from './package_item.service';
import { CreatePackageItemDto } from './dto/create-package_item.dto';
import { UpdatePackageItemDto } from './dto/update-package_item.dto';
import { OrgMemberService } from '../org_member/org_member.service';

@Controller('package-item')
export class PackageItemController {
  constructor(private readonly packageItemService: PackageItemService,
  @Inject(forwardRef(() => OrgMemberService)) private readonly orgMemberService: OrgMemberService,

  ) {}

  @Post()
  async create(@Body() input: CreatePackageItemDto) {

    const orgMember = await this.orgMemberService.getOrgMember({id:input?.registeredById },{user:true})
    if (!orgMember) throw new BadRequestException('orgMember is not found');

    return this.packageItemService.create(input, orgMember);
  }

}
