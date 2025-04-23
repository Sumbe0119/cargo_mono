import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageItemDto } from './create-package_item.dto';

export class UpdatePackageItemDto extends PartialType(CreatePackageItemDto) {}
