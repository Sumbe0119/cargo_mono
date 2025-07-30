import { IsEnum, IsNumber } from 'class-validator';
import { UserRole } from 'src/common/enum';

export class CreateOrgMemberDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  orgId: number;

  @IsEnum(UserRole)
  role: UserRole;
}
export class RemuveOrgMemberDto {
  @IsNumber()
  id: number;
}

