import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageItemDto } from './createPackage.dto';

export class UpdatePackageItemDto extends PartialType(CreatePackageItemDto) {}
