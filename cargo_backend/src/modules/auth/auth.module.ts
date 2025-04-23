import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MessageService } from '../integrations/message.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 👈 нэмсэн
import { UserModule } from '../user/user.module'; // 👈 UserService ашиглаж байгаа бол бас нэмэх хэрэгтэй
import { IpInfoService } from '../integrations/ip.info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
      }),
      inject: [ConfigService],
    }),
    forwardRef(()=>UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService,IpInfoService,MessageService],
  exports: [AuthService],
})
export class AuthModule {}
