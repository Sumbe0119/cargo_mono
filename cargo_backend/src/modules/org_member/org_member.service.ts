import { forwardRef, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrgMemberDto, RemuveOrgMemberDto } from './dto/create-org_member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgMemberEntity } from './entities/org_member.entity';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { OrganizationService } from '../organization/organization.service';
import { UserService } from '../user/user.service';
import { CommonState, UserRole } from 'src/common/enum';

@Injectable()
export class OrgMemberService {
  constructor(
    @InjectRepository(OrgMemberEntity)private readonly repository: Repository<OrgMemberEntity>,
    @Inject(forwardRef(() => OrganizationService)) private readonly orgService: OrganizationService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
  ) {}

  async getOrgMember(where?: FindOptionsWhere<OrgMemberEntity>, relations?: FindOptionsRelations<OrgMemberEntity>) {
    return this.repository.findOne({ where, relations })
  }

  async addMember(input:CreateOrgMemberDto) {
    const { orgId, role, userId }= input
    
    const organization = await this.orgService.getOne({id: +orgId, state: CommonState.ACTIVE});

    if (!organization) throw new NotFoundException('Organization not found');

    const user = await this.userService.getUser({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const orgMember = new OrgMemberEntity();
    orgMember.userId = user?.id;
    orgMember.orgId = organization?.id;
    orgMember.role = role;
  
    await this.repository.save(orgMember);
    return orgMember;
  }

  async remove(id:number){
    
    const member = await this.getOrgMember({id: +id})

    if (!member) {
      throw new NotFoundException({
        success: false,
        message: 'Гишүүн олдсонгүй'
      });
    }
    if(member?.role === UserRole.ADMIN){
      throw new HttpException('Админ хэрэглэгч гарч болохгүй', HttpStatus.BAD_REQUEST)
    }
    
    let _member = {
      ...member,
      state: CommonState.DELETED
    }

    try {
      await this.repository.update(+id,_member );
      return {
        success: true,
        data: { message: 'Гишүүнийг хаслаа' }
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        data: {
          message: 'Гишүүн хасхад алдаа гарлаа',
          error: error.message
        }
      });
    }
  }
}

