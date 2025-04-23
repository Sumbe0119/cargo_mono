import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrgMemberService } from './org_member.service';
import { CreateOrgMemberDto, RemuveOrgMemberDto } from './dto/create-org_member.dto';
@Controller('orgMember')
export class OrgMemberController {
  constructor(private readonly serivce: OrgMemberService) {}

  @Post()
  create(@Body() createOrgMemberDto: CreateOrgMemberDto) {
    
    return this.serivce.addMember(createOrgMemberDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.serivce.remove(id);
  }
}
