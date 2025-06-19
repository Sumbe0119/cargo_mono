import {  IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCargoAddressDto {
  @IsNumber()
  warehouseId: number;

  @IsString()
  consignee: string;

  @IsString()
  phone: string;

  @IsString()
  region: string;

  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  zipcode?: string;
}

export class UpdateCargoAddressDto extends CreateCargoAddressDto {
  
}
