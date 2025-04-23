import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum OtpType {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
}

@Entity('otp')
export class OtpEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column('varchar', { name: 'code', nullable: false, length: 300 })
  code: string

  @Column({ name: 'type', type: 'enum', enum: OtpType, default: OtpType.SMS })
  type: OtpType

  @Column('varchar', { name: 'mobile', nullable: true, length: 300 })
  mobile: string

  @Column('varchar', { name: 'email', nullable: true, length: 300 })
  email: string

  @Column('varchar', { name: 'ip', nullable: true, length: 300 })
  ip: string | null

  @Column('boolean', { name: 'used', nullable: true, default: false })
  used: boolean | null

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  public updatedAt: Date;
}