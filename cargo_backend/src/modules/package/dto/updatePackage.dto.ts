import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageItemDto } from './createPackage.dto';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ItemStatus } from 'src/common/enum';
import { Type } from 'class-transformer';

export class UpdatePackageItemDto extends PartialType(CreatePackageItemDto) {}
export class MultipleStatusUpdateDto {
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  ids: number[];

  @IsEnum(ItemStatus)
  @IsNotEmpty()
  @IsString()
  status: ItemStatus;
}
