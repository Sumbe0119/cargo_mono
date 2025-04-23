import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/common/enum';

export class AuthOtpDto {

  @IsNotEmpty({ message: "Утас оруулна уу" })
  @IsString()
  phone: string;

}

export class AuthForgetInputDto {

  @IsNotEmpty({ message: "Утас оруулна уу" })
  @IsString()
  phone: string;

  @IsNotEmpty({ message: "Код оруулна уу" })
  @IsString()
  code: string;

}

export class AuthFrontDto {

  @IsNotEmpty({ message: 'Нэвтрэх нэр эсвэл нууц үг буруу байна' })
  prefix: string;

  @IsNotEmpty({ message: 'Нэвтрэх нэр эсвэл нууц үг буруу байна' })
  phone: string;

  @IsNotEmpty({ message: 'Нэвтрэх нэр эсвэл нууц үг буруу байна' })
  password: string;
}

export class AuthDto {

  @IsNotEmpty({ message: 'Утасны дугаар буруу байна' })
  phone: string;

  @IsNotEmpty({ message: 'Нэвтрэх нэр эсвэл нууц үг буруу байна' })
  password: string;
}

export class AuthRegisterDto {

  @IsNotEmpty({ message: 'Нэвтрэх нэр эсвэл нууц үг буруу байна' })
  prefix: string;

  @IsNotEmpty({ message: "Утас оруулна уу" })
  @IsString()
  phone: string;

  @IsNotEmpty({ message: 'Овог оруулна уу' })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: 'Нэр оруулна уу' })
  @IsString()
  firstName: string;

  @IsString({ message: 'Нууц үг оруулна уу' })
  password: string;

}