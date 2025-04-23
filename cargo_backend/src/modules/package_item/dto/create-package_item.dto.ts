import {
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ItemStatus } from 'src/common/enum';

export class CreatePackageItemDto {
  @IsNumber() height: number;
  @IsNumber() width: number;
  @IsNumber() weight: number;
  @IsNumber() length: number;

  @IsNumber() registeredById: number;
  @IsNumber() warehouseId: number;
  @IsNumber() organizationId: number;

  @IsString() trackCode: string;

  @IsOptional()
  @IsString() notes?: string;

  @IsOptional()
  @IsString() image?: string;

  @IsOptional()
  @IsEnum(ItemStatus)
  status: ItemStatus;

  @IsOptional()
  @IsBoolean() isExpress?: boolean;

  @IsOptional()
  @IsBoolean() broken?: boolean;
}
