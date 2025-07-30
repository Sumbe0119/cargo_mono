import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class UserGuard implements CanActivate {
  private logger = new Logger(UserGuard.name);
  constructor(
    private config: ConfigService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(
    context: ExecutionContext | ExecutionContextHost,
  ): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const userToken = req?.cookies[this.config.get('COOKIE_LOGIN_NAME')];

      if (userToken) {
        const decodedToken = await this.authService.verifyJwt(userToken);

        if (decodedToken) {
          const user = await this.userService.getUser({
            username: decodedToken.username,
          });
          console.log('🚀 ~ UserGuard ~ canActivate ~ user:', user);

          req.user = user;
          return true;
        }
      }
    } catch (e) {
      this.logger.error(e);
    }
    return false;
  }
}
