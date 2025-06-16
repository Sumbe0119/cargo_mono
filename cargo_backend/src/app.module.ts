import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './modules/user/entities/user.entity';
import { OrgMemberEntity } from './modules/org_member/entities/org_member.entity';
import { Auth } from './modules/auth/entities/auth.entity';
import { Organization } from './modules/organization/entities/organization.entity';
import { PackageItem } from './modules/package/entities/package.entity';
import { Warehouse } from './modules/warehouse/entities/warehouse.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrgMemberModule } from './modules/org_member/org_member.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { PackageItemModule } from './modules/package/package.module';
import { MessageService } from './modules/integrations/message.service';
import { IpInfoService } from './modules/integrations/ip.info.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
const path = require('path')
 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Бүх модульд хүртээмжтэй болгох
      envFilePath: path.resolve(__dirname, '../.env'),  
    }),
    JwtModule.register({
      global: true,
      // secret: process.env.JWT_SECRET_TOKEN,
      // signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Auth, OrgMemberEntity, Organization, PackageItem, UserEntity, Warehouse],
      synchronize: true,
    }),
    AuthModule,
    OrgMemberModule,
    OrganizationModule,
    PackageItemModule,
    UserModule,
    WarehouseModule,
    
  ],
  controllers: [AppController],
  providers: [AppService,IpInfoService ], // Зөвхөн AppService-г үлдээх
})
export class AppModule {}