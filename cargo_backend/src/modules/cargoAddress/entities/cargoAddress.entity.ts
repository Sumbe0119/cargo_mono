import { Warehouse } from 'src/modules/warehouse/entities/warehouse.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('cargo_address')
export class CargoAddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Warehouse, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @Column({ name: 'consignee', type: 'varchar', length: 255 })
  consignee: string;

  @Column({ name: 'phone', type: 'varchar', length: 20 })
  phone: string;

  @Column({ name: 'region', type: 'varchar', length: 255 })
  region: string;

  @Column({ name: 'address', type: 'varchar', length: 500 })
  address: string;

  @Column({ name: 'zipcode', type: 'varchar', length: 20, nullable: true })
  zipcode?: string;
}
