import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  HttpException,
  HttpStatus,
  Logger,
  UseGuards,
  Req,
  Put,
  HttpCode,
  Param,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import {
  AuthDto,
  AuthForgetInputDto,
  AuthFrontDto,
  AuthOtpDto,
  AuthRegisterDto,
} from './dto/create-auth.dto';
import { AuthService } from './auth.service';
// import moment from 'moment-timezone';
import * as moment from 'moment-timezone';
import { UserEntity } from '../user/entities/user.entity';

import * as requestIp from 'request-ip';
import { IpInfoService } from '../integrations/ip.info.service';
// import { UserGuard } from './guard/user.guard';
import { GetUser } from './decorator/user.decorator';
import { UserGuard } from './guard/user.guard';

@Controller('/auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
    private readonly ipInfoService: IpInfoService,
  ) {}

  @Get('info')
  @UseGuards(UserGuard)
  public async info(@GetUser() user: UserEntity) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Body() input: AuthDto, @Res() res: Response) {
    // return this.authService.login(input);
    // res.send({ success: true, user });
    try {
      const { token, user } = await this.authService.login(input);

      //write to cookie
      const cookieName = this.config.get('COOKIE_LOGIN_NAME') || 'mybox_token';
      const cookieDomain = this.config.get('COOKIE_DOMAIN') || 'localhost';

      res.cookie(cookieName, token, {
        sameSite: 'none',
        path: '/',
        domain: cookieDomain,
        secure: true,
        expires: moment().add(3, 'day').toDate(),
      });
      res.send({ success: true, tokenName: 'mybox_tkn', token: token, user });
    } catch (error: any) {
      this.logger.error(
        `Login failed for phone ${input.phone}: ${error.stack}`,
      );
      throw new HttpException(
        error.message || 'System error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user/:id')
  public async user(@Param('id') id: string) {
    return this.authService.user(+id);
  }
  @Post('register')
  public async regisiter(@Body() input: AuthRegisterDto, @Res() res: Response) {
    try {
      const user = await this.authService.register(input);
      res.send({ success: true, user });
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(
        error.message || 'system.error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('forget')
  public async forget(@Body() input: AuthOtpDto, @Req() request: Request) {
    try {
      const ip = requestIp.getClientIp(request) || null;
      if (!ip) {
        throw new HttpException('Ip олдсонгүй', 400);
      }
      const success = await this.authService.otp(input, ip);

      return { success };
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(
        error.message || 'system.error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
