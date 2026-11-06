import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const token = request.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException('Não autenticado');
    }

    try {
      const payload = this.jwtService.verify(token);

      request.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
