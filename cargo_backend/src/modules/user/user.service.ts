import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {}

  public async getUser(where: FindOptionsWhere<UserEntity>, relations?: FindOptionsRelations<UserEntity>) {
    return this.repository.findOne({ where, relations })
  }
  
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
