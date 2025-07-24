import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class Pagination {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value || '1'))
  public page?: number = 1;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value || '20'))
  public size?: number = 10;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value || '20'))
  get offset(): number {
    const page = this.page ?? 1;
    const size = this.size ?? 10;
    return (page - 1) * size;
  }
}
