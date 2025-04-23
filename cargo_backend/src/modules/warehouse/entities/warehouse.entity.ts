import { CommonState, WarehouseType } from "src/common/enum";
import { Organization } from "src/modules/organization/entities/organization.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'organization_id' ,nullable:true})
  organizationId: number;

  @ManyToOne(() => Organization, (org) => org.warehouse)
  @Index()
  organization: Organization;

  @Column()
  @Index()
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ length: 100 })
  region: string;

  @Column({ length: 20, name: 'zip_code', nullable: true })
  zipCode: string;

  @Column({ 
    type: 'enum',
    enum: WarehouseType,
    default: WarehouseType.NORMAL
  })
  type: WarehouseType;

  // Бүтээгдэхүүний тоо (динамик тоолохгүй тохиолдолд)
  @Column({ default: 0, name: 'product_count' })
  productCount: number;

  // Нийт багтаамж
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, name: 'total_capacity' })
  totalCapacity: number;

  // Ажилтны тоо
  @Column({ default: 0, name: 'staff_count' })
  staffCount: number;

  @Column('enum', { enum: CommonState, default: CommonState.ACTIVE, nullable: false })
  state: CommonState;

  @Column({ type: 'jsonb', nullable: true, name: 'contact_info' })
  contactInfo: {
    managerName: string;
    phone: string;
    email: string;
    emergencyContact?: string;
  };
  @Column({ type: 'jsonb', nullable: true, name: 'currency' })
  currency: {
    kg: number;
    m3: number;
  };

  @Column({ type: 'jsonb', nullable: true, name: 'operating_hours' })
  operatingHours: {
    weekdays: string;
    weekends?: string;
    holidays?: string;
  };

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Холбоотой бүтээгдэхүүнүүд (хэрэгтэй бол)
  // @OneToMany(() => Product, (product) => product.warehouse)
  // products: Product[];
}