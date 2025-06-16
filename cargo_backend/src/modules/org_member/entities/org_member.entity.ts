import { CommonState, UserRole } from "src/common/enum";
import { Organization } from "src/modules/organization/entities/organization.entity";
import { PackageItem } from "src/modules/package/entities/package.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("org_member")
export class OrgMemberEntity extends BaseEntity {
 @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id, { 
    nullable: false,
    onDelete: 'CASCADE' // Хэрэглэгч устгагдвал холбоосыг устгах
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => Organization, (org) => org.members, { 
    nullable: false,
    onDelete: 'CASCADE' // Организаци устгагдвал холбоосыг устгах
  })
  @JoinColumn({ name: 'org_id' })
  organization: Organization;

  @Column({ name: 'user_id', type: 'int', unsigned: true })
  userId: number
  
  @Column({ name: 'org_id', type: 'int', unsigned: true })
  orgId: number

  @Column('enum', { enum: UserRole, default: UserRole.MEMBER, nullable: false })
  role: UserRole;

  @Column('enum', { enum: CommonState, default: CommonState.ACTIVE, nullable: false })
  state: CommonState;

  @OneToMany(() => PackageItem, (package_item) => package_item.registeredBy)
  orgMember: PackageItem[];
}
