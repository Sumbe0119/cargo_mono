import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto, OrgFilterDto, UpdateOrganizationDto } from './dto/organization.dto';
import { Pagination } from 'src/common/commonReturnTyp.dto';

@Controller('organization')  // Removed leading slash as it's not recommended
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  findAll(@Query() input: OrgFilterDto, @Query() pagination: Pagination) {
    return this.organizationService.findAll(input, pagination);
  }

  @Put(':id')  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.update(+id, updateOrganizationDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(+id);
  }
}