import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_ROUTE_TOKEN } from '../decorators/public-route.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext) {
    const isPublicRoute = this.isPublicRoute(context);
    if (isPublicRoute) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: Request) {
    const { username, pass } = this.getBasicAuthCredentials(request);
    return this.authService.validateUser(username, pass);
  }

  private getBasicAuthCredentials(request: Request): {
    username: string;
    pass: string;
  } {
    const authHeader = request.headers.authorization;
    const base64Credentials = authHeader?.split(' ')[1];
    if (!base64Credentials) {
      throw new UnauthorizedException('Missing basic auth credentials');
    }
    const [username, pass] = Buffer.from(base64Credentials, 'base64')
      .toString()
      .split(':');
    return { username, pass };
  }

  private isPublicRoute(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ROUTE_TOKEN, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
