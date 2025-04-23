import { forwardRef, Module } from '@nestjs/common';
import { OrgMemberService } from './org_member.service';
import { OrgMemberController } from './org_member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgMemberEntity } from './entities/org_member.entity';
import { OrganizationModule } from '../organization/organization.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrgMemberEntity]),
    OrganizationModule,
    UserModule
  ],
  controllers: [OrgMemberController],
  providers: [OrgMemberService],
  exports: [OrgMemberService], 
})
export class OrgMemberModule {}

