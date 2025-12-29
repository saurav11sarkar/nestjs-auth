import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function AuthGuard(...roles: string[]): Type<CanActivate> {
  @Injectable()
  class RoleAuthGuard implements CanActivate {
    constructor(readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<Request>();

      const authHeader = request.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('Authorization header missing');
      }

      const [type, token] = authHeader.split(' ');
      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException('Invalid authorization format');
      }

      const decoded = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_ACCESS_SECRET as string,
      });

      request['user'] = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        throw new ForbiddenException('Insufficient role');
      }

      return true;
    }
  }

  return mixin(RoleAuthGuard);
}
