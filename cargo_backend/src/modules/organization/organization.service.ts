import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto, OrgFilterDto, UpdateOrganizationDto } from './dto/organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { CommonReturnType, Pagination } from 'src/common/commonReturnTyp.dto';
import { CommonState } from 'src/common/enum';


@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  
  async getOne(where?: FindOptionsWhere<Organization>, relations?: FindOptionsRelations<Organization>) {
    where = {
      ...where,
      state: CommonState.ACTIVE,
    }

    return this.organizationRepository.findOne({ where, relations })
  }

  async create(createDto: CreateOrganizationDto): Promise<CommonReturnType> {
    const existingOrg = await this.organizationRepository.findOne({
      where: [
          { name: createDto.name },
          { slug: createDto.slug }
      ]
    });

    if (existingOrg) {
      const conflicts = {};
      if (existingOrg.name === createDto.name) {
          conflicts['name'] = 'Нэр давхцаж байна';
      }
      if (existingOrg.slug === createDto.slug) {
          conflicts['slug'] = 'Slug давхцаж байна';
      }

      throw new HttpException({
          success: false,
          message: 'Байгууллага үүсгэхэд алдаа гарлаа',
          conflicts
      }, HttpStatus.BAD_REQUEST);
    }

    try {
      const organization = this.organizationRepository.create(createDto);
      const savedOrg = await this.organizationRepository.save(organization);
      return {
        success: true,
        data: savedOrg
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        data: {
          message: 'Байгууллага үүсгэхэд алдаа гарлаа',
          error: error.message
        }
      });
    }
  }

  async findAll(filter: OrgFilterDto, pagination: Pagination) {
    try {
      
      // QueryBuilder үүсгэх
      const queryBuilder = this.organizationRepository
        .createQueryBuilder('org')
        .orderBy('org.createdAt', 'DESC');
  
      // Хайлтын нөхцөл нэмэх
      if (filter.search) {
        queryBuilder.where(
          '(organization.name LIKE :search OR organization.slug LIKE :search OR organization.email LIKE :search)',
          { search: `%${filter.search}%` }
        );
      }
    
      // Өгөгдөл авах
      const [list, total] = await queryBuilder
        .skip(pagination.offset)
        .take(pagination.size)
        .getMany();
  
      return {
        list,
        total
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        data: {
          message: 'Байгууллагын жагсаалт авахад алдаа гарлаа',
          error: error.message
        }
      });
    }
  }

  async findOne(id: number): Promise<CommonReturnType> {
    try {
      const organization = await this.organizationRepository.findOne({ 
        where: { id }
      });

      if (!organization) {
        throw new NotFoundException({
          success: false,
          message: `Байгууллага олдсонгүй`
        });
      }

      return {
        success: true,
        data: organization
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        success: false,
        data: {
          message: 'Байгууллагын мэдээлэл авахад алдаа гарлаа',
          error: error.message
        }
      });
    }
  }

  async update(id: number, updateDto: UpdateOrganizationDto): Promise<CommonReturnType> {
    
    try {
      // Эхлээд байгууллага байгаа эсэхийг шалгах
      const existingOrg = await this.organizationRepository.findOne({ where: { id } });
      if (!existingOrg) {
        throw new NotFoundException({
          success: false,
          message: 'Байгууллага олдсонгүй'
        });
      }
      
      await this.organizationRepository.update(id, updateDto);
      const updatedOrg = await this.organizationRepository.findOne({ where: { id } });

      return {
        success: true,
        data: updatedOrg || {}
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException({
        success: false,
        data: {
          message: 'Байгууллагын мэдээлэл шинэчлэхэд алдаа гарлаа',
          error: error.message
        }
      });
    }
  }

  async remove(id: number): Promise<CommonReturnType> {
    try {
      // Эхлээд байгууллага байгаа эсэхийг шалгах
      const existingOrg = await this.organizationRepository.findOne({ where: { id } });
      if (!existingOrg) {
        throw new NotFoundException({
          success: false,
          message: 'Байгууллага олдсонгүй'
        });
      }

      // Устгах
      const deleteResult = await this.organizationRepository.delete(id);

      if (deleteResult.affected === 0) {
        throw new NotFoundException({
          success: false,
          message: 'Байгууллага устгагдаагүй'
        });
      }

      return {
        success: true,
        data:{
          message: 'Байгууллага амжилттай устгагдлаа'
        }
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        success: false,
        data: {
          message: 'Байгууллагын мэдээлэл устгахад алдаа гарлаа',
          error: error.message
        }
      });
    }
  }
}