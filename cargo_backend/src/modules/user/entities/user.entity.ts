import { Exclude, instanceToPlain } from 'class-transformer';
import {
  Entity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { CommonState } from 'src/common/enum';
import { OrgMemberEntity } from 'src/modules/org_member/entities/org_member.entity';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  username: string;

  @Column('varchar', { name: 'last_name', length: 255, nullable: true })
  lastName: string | null;

  @Column('varchar', { name: 'first_name', length: 255, nullable: true })
  firstName: string | null;

  @Column('varchar', { name: 'prefix', length: 50, nullable: false })
  prefix: string;

  @Column({ nullable: true })
  email: string;

  @Index()
  @Exclude()
  @Column('varchar', { length: 255, nullable: false })
  phone: string | null;

  @Exclude()
  @Column('varchar', { length: 255, nullable: false, select: false })
  password: string;

  @Column('enum', {
    enum: CommonState,
    default: CommonState.ACTIVE,
    nullable: false,
  })
  state: CommonState;

  @OneToMany(() => OrgMemberEntity, (orgMember) => orgMember.user)
  orgMember: OrgMemberEntity[];

  @Exclude()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  public hashPassword() {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  public hashPasswordUpdate(password: string) {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
  }

  validPassword(password: string): boolean {
    if (!this.password) {
      console.error('No password set for user');
      return false;
    }
    return bcrypt.compareSync(password, this.password);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
