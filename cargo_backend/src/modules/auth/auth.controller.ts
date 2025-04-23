import { Body, Controller, Post, Get, Res, HttpException, HttpStatus, Logger, UseGuards, Req, Put, HttpCode } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthDto, AuthForgetInputDto, AuthFrontDto, AuthOtpDto, AuthRegisterDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import moment from 'moment-timezone';
import { UserEntity } from '../user/entities/user.entity';


import * as requestIp from 'request-ip';
import { IpInfoService } from '../integrations/ip.info.service';
// import { UserGuard } from './guard/user.guard';
import { GetUser } from './decorator/user.decorator';


@Controller('/auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
    private readonly ipInfoService: IpInfoService
  ) { }

  @Get('info')
  // @UseGuards(UserGuard)
  public async info(@GetUser() user: UserEntity) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Body() input: AuthDto) {
    return this.authService.login(input);
    // res.send({ success: true, user });
  }

  @Post('register')
  public async regisiter(@Body() input: AuthRegisterDto, @Res() res: Response) {

    try {
      const user = await this.authService.register(input);
      res.send({ success: true, user });
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.message || 'system.error', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('forget')
  public async forget(
    @Body() input: AuthOtpDto,
    @Req() request: Request
  ) {
    try {
      const ip = requestIp.getClientIp(request) || null;
      if (!ip) {
        throw new HttpException("Ip олдсонгүй", 400)
      }
      const success = await this.authService.otp(input, ip);

      return { success }
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.message || 'system.error', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}