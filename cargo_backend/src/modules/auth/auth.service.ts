import {  HttpException, HttpStatus, Injectable,
    } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { MessageService } from '../integrations/message.service';
import { AuthDto, AuthForgetInputDto, AuthOtpDto, AuthRegisterDto } from './dto/create-auth.dto';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { CommonState } from 'src/common/enum';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AuthService {
  private expiresIn: string | number
  private secret: string | Buffer

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private message: MessageService,
    private userService: UserService,
  ) {}

  // public async verifyJwt(jwt: string): Promise<any> {
  //   return this.jwtService.verifyAsync(jwt, { secret: this.secret });
  // }
  

  public async login(dto: AuthDto): Promise<any> {
    
    const user = await this.userService.getUser({
        phone: dto.phone,
        state: CommonState.ACTIVE,
      
    });
    
    if (!user) {
      throw new HttpException('Нэвтрэх нэр эсвэл нууц үг буруу байна', HttpStatus.BAD_REQUEST);
    }
    if (!user.validPassword(dto.password)) {
      throw new HttpException('Нууц үг буруу байна', 401);
    }    
    
    return user
    // const payload = { sub: user.id, username: user.username };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };

  }

  public async register(input: AuthRegisterDto): Promise<any> {
    const username = `${input.lastName} ${input.firstName}`;
  
    const exists = await this.userService.getUser({ phone: input.phone });
    if (exists) {
      throw new HttpException('Бүртгэлтэй утасны дугаар байна', HttpStatus.BAD_REQUEST);
    }
  
    try {
      const user = this.userRepository.create({
        username,
        lastName: input.lastName,
        firstName: input.firstName,
        prefix: input.prefix,
        phone: input.phone,
        password: input.password, // @BeforeInsert() decorator хаш хийнэ
      });
  
      const savedUser = await this.userRepository.save(user); 
  
      const {password, ...result}= savedUser
  
      return result
  
    } catch (e) {
      console.error('register_error:', e);
      throw new HttpException('Бүртгэл амжилтгүй боллоо', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  public async otp(input: AuthOtpDto, ip: string) {

    // const exists = await UserEntity.findOne({
    //   where: { phone: input.phone }
    // })

    // if (!exists) throw new HttpException("Системд бүртгэлгүй утас байна. Та бүртгүүлэ үү", 400)

    // const last5IpCountCheck = await OtpEntity.count({
    //   where: {
    //     ip,
    //     createdAt: Between(moment().subtract(5, "minutes").toDate(), moment().toDate())
    //   }
    // })

    // if (last5IpCountCheck > 10) {
    //   throw new HttpException(`Таны IP дээр код авах эрх хэтэрсэн байна`, 400)
    // }

    // const lastOtp = await OtpEntity.findOne({
    //   where: {
    //     mobile: input.phone,
    //     type: OtpType.SMS
    //   },
    //   order: { createdAt: "DESC" }
    // })

    // if (lastOtp && moment().diff(lastOtp.createdAt, "seconds") < Number(this.config.get("OTP_TIME"))) {
    //   throw new HttpException(`${moment().diff(moment(lastOtp.createdAt), "seconds")} секундын дараа авах боломжтой`, 400)
    // }

    // const otp = new OtpEntity()
    // otp.mobile = input.phone;
    // otp.code = this.generateRandom4Digit().toString();
    // otp.type = OtpType.SMS;
    // otp.ip = ip;

    // await this.message.sendMessage(input.phone, `Нууц үг сэргээх код: ${otp.code}`)

    // await otp.save();
    // return true
  }


  public async forgetVerify(input: AuthForgetInputDto) {
  //   const exists = await OtpEntity.findOne({
  //     where: {
  //       mobile: input.phone,
  //       code: input.code
  //     }
  //   })
  //   if (!exists) throw new HttpException("Код буруу байна.", 400);
  //   if (moment(exists.createdAt).diff(moment(), "seconds") > Number(this.config.get("OTP_TIME"))) {
  //     throw new HttpException(`Кодны хугацаа дууссан байна.`, 400)
  //   }

  //   const user = await UserEntity.findOne({ where: { phone: input.phone } });
  //   if (!user) throw new HttpException("Хэрэглэгч олдсонгүй", 404)

  //   const iv = randomBytes(16);

  // // @ts-ignore
  //   const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  //   const cipher = createCipheriv('aes-256-ctr', key, iv);

  //   const textToEncrypt = JSON.stringify({ username: user.username });
  //   const encrypted = Buffer.concat([
  //     cipher.update(textToEncrypt),
  //     cipher.final(),
  //   ]);
  }
  private generateRandom4Digit() {
    return Math.floor(1000 + Math.random() * 9000);

  }
  


}