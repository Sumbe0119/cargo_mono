import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module'; // AuthModule-г import хийх
import { IpInfoService } from '../integrations/ip.info.service';
import { MessageService } from '../integrations/message.service';
import { AuthController } from '../auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule) ,
    // IpInfoModule, // ← Хэрвээ байгаа бол
    // MessageModule // ← Хэрвээ байгаа бол
  ],
  controllers: [UserController],
  providers: [
    UserService,
    IpInfoService,     // Зөв, хэрвээ эндээс л ашиглагдаж байвал
    MessageService     // "
  ],
  exports: [UserService],
})
export class UserModule {}
