import { ApiProperty } from '@nestjs/swagger';
import { CommonState } from 'src/common/enum';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SocialLinkDto {

  @ApiProperty({ example: 'facebook', description: 'Сошиал хаягийн нэр' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://facebook.com/youre-social-link', description: 'Сошиал хаяг' })
  @IsUrl()
  url: string;
}

export class CreateOrganizationDto {
  @ApiProperty({  description: 'Байгууллагын нэр' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({  description: 'Байгууллагын slug' })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({ example: '99999999', description: 'Утасны дугаар', required: true })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: '99999999', description: 'Нэмэлт утас', required: false })
  @IsOptional()
  @IsString()
  phone1?: string;

  @ApiProperty({ example: 'Улаанбаатар, СХД, 11-р хороо', description: 'Хаяг', required: true })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: 'Монгол улс', description: 'Үндэсний харьяалал', required: false })
  @IsOptional()
  @IsString()
  national?: string;

  @ApiProperty({ example: 'info@gmail.com', description: 'И-мэйл', required: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: '09:00-18:00', description: 'Ажиллах цаг', required: false })
  @IsOptional()
  @IsString()
  workingHours?: string;

  @ApiProperty({ 
    example: [{ name: 'facebook', url: 'https://facebook.com/examplePage' }], 
    description: 'Сошиал хаягууд',
    type: [SocialLinkDto],
    required: false 
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkDto)
  socialLinks?: SocialLinkDto[];

  @ApiProperty({ example: 'Олон улсын ачаа тээврийн компани', description: 'Тайлбар', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://example.com/logo.png', description: 'Логоны URL', required: false })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

}

export class UpdateOrganizationDto {
  @ApiProperty({  description: 'Байгууллагын нэр' })
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkDto)
  links: SocialLinkDto[];

  @ApiProperty({ example: 'Олон улсын ачаа тээврийн компани', description: 'Тайлбар', required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: 'https://example.com/logo.png', description: 'Логоны URL', required: false })
  @IsOptional()
  @IsUrl()
  logoUrl: string;

  @ApiProperty({ example: '99999999', description: 'Утасны дугаар', required: false })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({ example: '99999999', description: 'Нэмэлт утас', required: false })
  @IsOptional()
  @IsString()
  phone1: string;

  @ApiProperty({ example: 'Улаанбаатар, СХД, 11-р хороо', description: 'Хаяг', required: false })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({ example: 'Монгол улс', description: 'Үндэсний харьяалал', required: false })
  @IsOptional()
  @IsString()
  national: string;

  @ApiProperty({ example: 'info@gmail.com', description: 'И-мэйл', required: false })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({ example: '09:00-18:00', description: 'Ажиллах цаг', required: false })
  @IsOptional()
  @IsString()
  timetable: string;


}


export class OrgFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(CommonState)
  state?: CommonState;

}