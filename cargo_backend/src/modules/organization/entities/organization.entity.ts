import { CommonState } from "src/common/enum";
import { OrgMemberEntity } from "src/modules/org_member/entities/org_member.entity";
import { Warehouse } from "src/modules/warehouse/entities/warehouse.entity";
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  OneToMany, 
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index 
} from "typeorm";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @Index({ unique: true })
  name: string;

  @Column({ length: 100, nullable: true })
  phone: string;

  @Column({ length: 100, nullable: true, name: 'secondary_phone' })
  phone1: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 100, unique: true })
  @Index()
  slug: string;

  @Column({ length: 100, nullable: true })
  national: string;

  @Column({ length: 255, nullable: true })
  @Index()
  email: string;

  @Column({ type: 'text', nullable: true, name: 'working_hours' })
  timetable: string;

  @Column({ 
    type: 'jsonb', 
    nullable: true, 
    default: [],
    name: 'social_links'
  })
  links: Array<{
    name: string;
    url: string;
  }>;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true, name: 'logo_url' })
  logoUrl: string;

  @Column('enum', { enum: CommonState, default: CommonState.ACTIVE, nullable: false })
  state: CommonState;

  @OneToMany(() => OrgMemberEntity, (member) => member.organization, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  members: OrgMemberEntity[];
  
  @OneToMany(() => Warehouse, (warehouse) => warehouse.organization, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  warehouse: Warehouse[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}