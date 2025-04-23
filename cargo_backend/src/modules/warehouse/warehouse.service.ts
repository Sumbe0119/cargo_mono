import { forwardRef, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateWarehouseDto, UpdateWarehouseDto, WareHouseFilterDto } from './dto/create-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { CommonReturnType, Pagination } from 'src/common/commonReturnTyp.dto';
import { OrganizationService } from '../organization/organization.service';
import { CommonState } from 'src/common/enum';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly wareHouseRepository: Repository<Warehouse>,
    @Inject(forwardRef(() => OrganizationService)) private readonly orgService: OrganizationService,
  ) {}

async getOne(where?: FindOptionsWhere<Warehouse>, relations?: FindOptionsRelations<Warehouse>) {
  where = {...where,state: CommonState.ACTIVE}
  return this.wareHouseRepository.findOne({ where, relations })
}

  async create(createDto: CreateWarehouseDto) : Promise<CommonReturnType>{
  
  const existOrg =await  this.orgService.getOne({id: createDto.organizationId, state: CommonState.ACTIVE})

  if(!existOrg){
    throw new HttpException('Байгууллага олдсонгүй', HttpStatus.BAD_REQUEST); 
  }

  const exist = await this.wareHouseRepository.findOne({where: { name: createDto.name }})
    if (exist) {
      let conflicts = '';
      if (exist.name === createDto.name) {
          conflicts = 'Агуулахын нэр давхцаж байна';
      }
      throw new HttpException({
          success: false,
          message: `Байгууллага үүсгэхэд алдаа гарлаа`,
          error: conflicts
      }, HttpStatus.BAD_REQUEST);
    }
    try {
      const _warehouse = this.wareHouseRepository.create(createDto);
      const saved = await this.wareHouseRepository.save(_warehouse);
      return {
        success: true,
        data: saved
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        data: {
          message: 'Агуулах үүсгэхэд алдаа гарлаа',
          error: error.message
        }
      });
    }
  }

  async update(id: number, updateDto: UpdateWarehouseDto): Promise<CommonReturnType> {
      
      try {
        // Эхлээд байгууллага байгаа эсэхийг шалгах
        const existing = await this.wareHouseRepository.findOne({ where: { id } });
        if (!existing) {
          throw new NotFoundException({
            success: false,
            message: 'Байгууллага олдсонгүй'
          });
        }
        
        await this.wareHouseRepository.update(id, updateDto);
        const updated = await this.wareHouseRepository.findOne({ where: { id } });
  
        return {
          success: true,
          data: updated || {}
        };
      } catch (error) {
        if (error instanceof NotFoundException || error instanceof HttpException) {
          throw error;
        }
        throw new InternalServerErrorException({
          success: false,
          data: {
            message: 'Агуулах шинэчлэхэд алдаа гарлаа',
            error: error.message
          }
        });
      }
    }

  
    async findAll(filter: WareHouseFilterDto, pagination: Pagination) {
      const queryBuilder = this.wareHouseRepository
        .createQueryBuilder('main')
        .leftJoin('main.organization', 'organization')
        .orderBy('main.createdAt', 'DESC');
    
        if (filter.search) {
          queryBuilder.where(
            '(main.name LIKE :search OR main.state LIKE :search)',
            { search: `%${filter.search}%` }
          );
        }
        if (filter.state) {
          queryBuilder.where('main.state = :state', { state: filter.state });
        }
    
      const [list, total] = await queryBuilder
        .skip(pagination.offset)
        .take(pagination.size)
        .getManyAndCount(); // илүү зөв
    
      return {
        list,
        total
      };
    }
    

  async findOne(id:number):Promise<CommonReturnType>{
    try {
      const warehouse = await this.getOne({ id });

      if (!warehouse) {
        throw new NotFoundException({
          success: false,
          message: `Агуулах олдсонгүй`
        });
      }

      return {
        success: true,
        data: warehouse
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        success: false,
        data: {
          message: 'Агуулахын мэдээлэл авахад алдаа гарлаа',
          error: error.message
        }
      });
    }
  }

  async remove(id:number):Promise<CommonReturnType>{
    
    const exist = await this.getOne({ id });
    if (!exist) {
      throw new NotFoundException({
        success: false,
        message: 'Агуулах олдсонгүй'
      });
    }
    let warehouse = {
      ...exist,
      state: CommonState.DELETED
    }
    try {
      await this.wareHouseRepository.update(id,warehouse );
      return {
        success: true,
        data: { message: 'Агуулах амжилттай устгагдлаа' }
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        data: {
          message: 'Агуулах устгахад алдаа гарлаа',
          error: error.message
        }
      });
    }
  }

}
