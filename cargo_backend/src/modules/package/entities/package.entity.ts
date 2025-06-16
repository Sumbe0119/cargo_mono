import { CommonState, ItemStatus } from 'src/common/enum';
import { OrgMemberEntity } from 'src/modules/org_member/entities/org_member.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { Warehouse } from 'src/modules/warehouse/entities/warehouse.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';


@Entity()
export class PackageItem {
  @PrimaryGeneratedColumn()
  id: number;

  // Хэмжээсүүд (метр, кг)
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  height: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  width: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  weight: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  length: number;

  @Column({ type: 'text', nullable: false })
  phone: string;
  
  @ManyToOne(() => OrgMemberEntity, { nullable: false })
  @JoinColumn({ name: 'registered_by_id' })
  registeredBy: OrgMemberEntity;

  @Column({ name: 'registered_by_id' })
  registeredById: number;

  @Column({ name: 'warehouse_id' })
  warehouseId: number;

  @ManyToOne(() => Warehouse,(warehouse)=>warehouse.id, { nullable: false })
  @JoinColumn({ name: 'warehouse_id' })
  @Index()
  warehouse: Warehouse;

   // Санхүүгийн мэдээлэл
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  price: number;
  
  // Тээврийн мэдээлэл
  @Column({ nullable: true, name: 'track_code', unique: true })
  @Index()
  trackCode: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Зурагнууд (JSON array хэлбэрээр хадгалах)
  @Column( { nullable: true })
  image: string;

  @Column({ name: 'organization_id' })
  organizationId: number;

  @ManyToOne(() => Organization, (org)=>(org.id), { nullable: false })
  @JoinColumn({ name: 'organization_id' })
  @Index()
  organization: Organization;

  // Төлөв байдал
  @Column({
    type: 'enum',
    enum: ItemStatus,
    default: ItemStatus.REGISTERED
  })
  @Index()
  status: ItemStatus;

  @Column({
    type: 'enum',
    enum: CommonState,
    default: CommonState.ACTIVE
  })
  state: CommonState;

  // Хугацааны тэмдэглэлүүд
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'registered_at', nullable: true })
  registeredAt: Date;

  @Column({ name: 'received_at', nullable: true })
  receivedAt: Date;

  @Column({ name: 'sent_at', nullable: true })
  sentAt: Date;

  @Column({ name: 'delivered_at', nullable: true })
  deliveredAt: Date;

  @Column({ name: 'finished_at', nullable: true })
  finishedAt: Date;

  // Нэмэлт тэмдэглэлүүд
  @Column({ default: false })
  isExpress: boolean;

  @Column({ default: false, name: 'is_broken' })
  broken: boolean;

  @Column({ default: false })
  deliveryRequested: boolean
}