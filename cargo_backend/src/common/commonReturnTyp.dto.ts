import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class CommonReturnType {
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;

  @IsNotEmpty()
  @IsObject()
  data: object;
}

export class CommonListReturnType{
  
}


export class Pagination {

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value || "1"))
  public page?: number = 1

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value || "20"))
  public size?: number = 10

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value || "20"))
  get offset(): number {
    return ((this.page ?? 1) - 1) * (this.size ?? 10);
  }
}