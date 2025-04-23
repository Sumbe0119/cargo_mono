import { CommonState, WarehouseType } from "src/common/enum";
import { IsEnum, IsNotEmpty, IsString, IsNumber, IsObject, ValidateNested, IsOptional, isNumber } from 'class-validator';
import { Type } from 'class-transformer';

// Operating Hours DTO
class OperatingHoursDto {
  @IsString()
  @IsNotEmpty()
  weekdays: string;

  @IsString()
  @IsOptional()
  weekends?: string;

  @IsString()
  @IsOptional()
  holidays?: string;
}
class CurrencyDto {
  @IsNumber()
  @IsNotEmpty()
  kg: number;

  @IsNumber()
  @IsOptional()
  m3: number;
}

// Contact Info DTO
class ContactInfoDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  manager?: string;
}

// Create Warehouse DTO
export class CreateWarehouseDto {

  @IsNumber()
  @IsNotEmpty()
  organizationId: number

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsOptional()
  zipCode: string;

  @IsEnum(WarehouseType)
  type: WarehouseType.NORMAL;

  @IsNumber()
  @IsNotEmpty()
  totalCapacity: number;

  @IsObject()
  @ValidateNested()
  @Type(() => ContactInfoDto)
  contactInfo: ContactInfoDto;

  @IsObject()
  @ValidateNested()
  @Type(() => OperatingHoursDto)
  operatingHours: {
    weekdays: string;
    weekends?: string;
    holidays?: string;
  };
  @IsObject()
  @ValidateNested()
  @Type(() => CurrencyDto)
  currency: {
    kg: number;
    m3: number;
  };
}

export class UpdateWarehouseDto extends CreateWarehouseDto {
  @IsNumber()
  @IsOptional()
  staffCount: number;

}

export class WareHouseFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(CommonState)
  state?: CommonState;

}