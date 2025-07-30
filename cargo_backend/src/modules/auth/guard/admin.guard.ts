import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Хэрэглэгчийн мэдээлэл байхгүй бол
    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    // Admin эсэхийг шалгах
    if (user.role !== 'admin') {
      throw new ForbiddenException('Only admins can access this resource');
    }

    return true;
  }
}
